import { NextResponse, type NextRequest } from 'next/server';
import { requireMember } from '@/lib/ana-coach/authGuard';
import { makeLimiter, clientIp } from '@/lib/ana-coach/rateLimit';
import { consumeReasonToError } from '@/lib/ana-coach/quota';
import { sseLine, SSE_PING } from '@/lib/ana-coach/events';
import { runTurn } from '@/lib/ana-coach/orchestrator';
import {
  getConversation,
  consumeMessage,
  releaseLock,
  refundMessage,
  loadHistory,
  insertMessage,
  deleteMessage,
  getPendingAttachments,
  markAttachmentsConsumed,
  updateConversationState,
  insertTurnTrace,
  addTokenUsage,
} from '@/lib/ana-coach/store';
import { COACH_MODEL, MAX_MESSAGE_CHARS, RATE_CHAT_PER_MIN } from '@/lib/ana-coach/config';
import type { GeminiContent } from '@/lib/ana-coach/orchestrator/gemini';

// The coaching turn. Streams SSE. Quota is reserved (atomically) BEFORE any LLM
// call; pre-stream failures are plain JSON so the client can branch on them.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const limiter = makeLimiter(60_000, RATE_CHAT_PER_MIN);

export async function POST(req: NextRequest) {
  if (limiter(clientIp(req))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  const guard = await requireMember(req);
  if (!guard.ok) return guard.response;
  const member = guard.member;

  // Parse + validate (measure body before parsing).
  let body: { conversationId?: unknown; message?: unknown };
  const text = await req.text();
  if (text.length > MAX_MESSAGE_CHARS + 2000) {
    return NextResponse.json({ error: 'Message too long' }, { status: 413 });
  }
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  const conversationId = typeof body.conversationId === 'string' ? body.conversationId : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!conversationId) return NextResponse.json({ error: 'Missing conversationId' }, { status: 400 });
  if (!message) return NextResponse.json({ error: 'Empty message' }, { status: 400 });
  if (message.length > MAX_MESSAGE_CHARS) {
    return NextResponse.json({ error: 'Message too long' }, { status: 413 });
  }

  // Load + validate conversation.
  const conv = await getConversation(conversationId, member.id);
  if (!conv || conv.status !== 'active') {
    return NextResponse.json({ error: 'No active session', code: 'not_active' }, { status: 404 });
  }
  if (conv.session_phase === 'CLOSED') {
    return NextResponse.json({ error: 'Session closed', code: 'conversation_cap' }, { status: 409 });
  }

  // Reserve quota atomically BEFORE any expensive work.
  let consumed;
  try {
    consumed = await consumeMessage(conversationId, member.id);
  } catch (err) {
    console.error('[ana-coach] consume error:', err);
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
  if (!consumed.ok) {
    const e = consumeReasonToError(consumed.reason);
    return NextResponse.json({ error: e.message, code: e.code }, { status: e.status });
  }

  // From here we are committed: build context, insert the user turn, then stream.
  // Any failure past this point must refund the reserved quota + release the lock.
  let pending, priorHistory, userMsgId: number;
  try {
    [pending, priorHistory] = await Promise.all([
      getPendingAttachments(conversationId),
      loadHistory(conversationId),
    ]);
    userMsgId = await insertMessage(conversationId, 'user', message);
  } catch (err) {
    console.error('[ana-coach] pre-stream setup error:', err);
    await refundMessage(conversationId, member.id).catch(() => {});
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }

  const history: GeminiContent[] = [
    ...priorHistory.map((m) => ({ role: m.role, parts: [{ text: m.content }] })),
    { role: 'user' as const, parts: [{ text: message }] },
  ];

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (line: string) => controller.enqueue(encoder.encode(line));
      // Keepalive during the non-streaming stages.
      const ping = setInterval(() => {
        try { send(SSE_PING); } catch { /* closed */ }
      }, 10_000);

      try {
        const it = runTurn({
          phase: conv.session_phase,
          profile: conv.member_profile ?? {},
          history,
          memberMessage: message,
          pending,
          messageCountAfter: consumed.new_count,
        });

        let result;
        while (true) {
          const { value, done } = await it.next();
          if (done) { result = value; break; }
          send(sseLine(value));
        }

        // Persist the completed turn.
        const modelMsgId = await insertMessage(conversationId, 'model', result.fullText);
        if (pending.length > 0) {
          await markAttachmentsConsumed(pending.map((a) => a.id), userMsgId);
        }
        await updateConversationState(conversationId, result.phaseAfter, result.profile);
        await addTokenUsage(member.id, result.usage.tokens_in, result.usage.tokens_out);
        await insertTurnTrace({
          conversation_id: conversationId,
          message_id: modelMsgId,
          turn_index: Math.floor(consumed.new_count / 2),
          phase_before: result.phaseBefore,
          phase_after: result.phaseAfter,
          triage: result.trace.triage,
          specialists: result.trace.specialists,
          synthesis: result.trace.synthesis,
          total_ms: result.trace.total_ms,
          model: COACH_MODEL,
        });
        await releaseLock(conversationId);

        send(sseLine({
          type: 'done',
          message_count: consumed.new_count,
          message_limit: conv.message_limit,
          session_phase: result.phaseAfter,
        }));
      } catch (err) {
        console.error('[ana-coach] turn error:', err);
        // No model message was inserted; roll back the user turn + quota.
        await deleteMessage(userMsgId).catch(() => {});
        await refundMessage(conversationId, member.id).catch(() => {});
        try { send(sseLine({ type: 'error', code: 'stream_failed' })); } catch { /* closed */ }
      } finally {
        clearInterval(ping);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
