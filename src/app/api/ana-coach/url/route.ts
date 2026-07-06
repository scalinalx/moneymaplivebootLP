import { NextResponse, type NextRequest } from 'next/server';
import { requireMember } from '@/lib/ana-coach/authGuard';
import { makeLimiter, clientIp } from '@/lib/ana-coach/rateLimit';
import { fetchUserSubmittedUrl } from '@/lib/ana-coach/urlFetcher';
import { fetchUrlViaContext } from '@/lib/ana-coach/urlContext';
import { USE_URL_CONTEXT } from '@/lib/ana-coach/config';
import {
  getConversation,
  getPendingAttachments,
  bumpDaily,
  insertAttachment,
} from '@/lib/ana-coach/store';
import { MAX_URLS_PER_DAY, MAX_URLS_PER_MESSAGE, RATE_CHAT_PER_MIN } from '@/lib/ana-coach/config';

// Fetch + extract a member-submitted URL (SSRF-hardened). Stores the readable
// text as a pending attachment. ONLY user-submitted URLs are ever fetched.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const limiter = makeLimiter(60_000, RATE_CHAT_PER_MIN);

export async function POST(req: NextRequest) {
  if (limiter(clientIp(req))) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  const guard = await requireMember(req);
  if (!guard.ok) return guard.response;
  const member = guard.member;

  let body: { conversationId?: unknown; url?: unknown };
  try {
    const text = await req.text();
    if (text.length > 4000) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  const conversationId = typeof body.conversationId === 'string' ? body.conversationId : '';
  const url = typeof body.url === 'string' ? body.url.trim() : '';
  if (!conversationId || !url) return NextResponse.json({ error: 'Missing url or conversation' }, { status: 400 });

  try {
    const conv = await getConversation(conversationId, member.id);
    if (!conv || conv.status !== 'active') {
      return NextResponse.json({ error: 'No active session' }, { status: 404 });
    }

    const pending = await getPendingAttachments(conversationId);
    if (pending.filter((a) => a.kind === 'url').length >= MAX_URLS_PER_MESSAGE) {
      return NextResponse.json({ error: `You can add up to ${MAX_URLS_PER_MESSAGE} links per message` }, { status: 429 });
    }

    if (!(await bumpDaily(member.id, 'url_fetches', MAX_URLS_PER_DAY))) {
      return NextResponse.json({ error: "You've reached today's link limit" }, { status: 429 });
    }

    // Primary: Gemini url_context (isolated, secrets-free extraction). Falls back
    // to our SSRF-safe server fetcher if disabled or if the tool returns nothing.
    let result = USE_URL_CONTEXT ? await fetchUrlViaContext(url) : { ok: false as boolean, text: '', finalUrl: undefined as string | undefined, truncated: false, error: '' };
    if (!result.ok || !result.text?.trim()) {
      result = await fetchUserSubmittedUrl(url);
    }
    if (!result.ok || !result.text?.trim()) {
      return NextResponse.json({ error: result.error || 'Could not read that link' }, { status: 400 });
    }

    const displayName = result.finalUrl || url;
    const id = await insertAttachment(conversationId, {
      kind: 'url',
      name: displayName.slice(0, 200),
      mime: 'text/html',
      char_count: result.text.length,
      truncated: !!result.truncated,
      extracted_text: result.text,
    });

    return NextResponse.json({
      attachmentId: id,
      name: displayName,
      kind: 'url',
      charCount: result.text.length,
      truncated: !!result.truncated,
    });
  } catch (err) {
    console.error('[ana-coach] url error:', err);
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
}
