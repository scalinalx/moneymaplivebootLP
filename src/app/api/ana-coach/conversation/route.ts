import { NextResponse, type NextRequest } from 'next/server';
import { requireMember } from '@/lib/ana-coach/authGuard';
import { makeLimiter, clientIp } from '@/lib/ana-coach/rateLimit';
import { bumpDaily, startConversation } from '@/lib/ana-coach/store';
import { MAX_CONVERSATIONS_PER_DAY, MESSAGE_LIMIT, RATE_CHAT_PER_MIN } from '@/lib/ana-coach/config';

// Start (or reset) a coaching session. Ends any active conversation and opens a
// fresh one seeded with the member's carried-over profile.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const limiter = makeLimiter(60_000, RATE_CHAT_PER_MIN);

export async function POST(req: NextRequest) {
  if (limiter(clientIp(req))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  const guard = await requireMember(req);
  if (!guard.ok) return guard.response;
  const member = guard.member;

  try {
    const allowed = await bumpDaily(member.id, 'conversations', MAX_CONVERSATIONS_PER_DAY);
    if (!allowed) {
      return NextResponse.json(
        { error: "You've started the maximum number of sessions today. Come back tomorrow.", code: 'daily_cap' },
        { status: 429 },
      );
    }

    const conv = await startConversation(member.id);
    return NextResponse.json({
      conversationId: conv.id,
      messageLimit: conv.message_limit ?? MESSAGE_LIMIT,
      messagesUsed: 0,
      sessionPhase: conv.session_phase,
    });
  } catch (err) {
    console.error('[ana-coach] conversation start error:', err);
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
}
