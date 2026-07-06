import { NextResponse, type NextRequest } from 'next/server';
import { hashCode, isPlausibleCode } from '@/lib/ana-coach/accessCodes';
import { getMemberByCodeHash, touchMemberLastUsed } from '@/lib/ana-coach/store';
import { signSessionToken } from '@/lib/ana-coach/session';
import { makeLimiter, clientIp } from '@/lib/ana-coach/rateLimit';
import {
  MESSAGE_LIMIT,
  MAX_MESSAGES_PER_DAY,
  MAX_CONVERSATIONS_PER_DAY,
  RATE_AUTH_PER_MIN,
} from '@/lib/ana-coach/config';

// Access-code → session-token exchange. The code travels exactly once (here);
// thereafter the member holds a short-lived HMAC token. Generic errors only.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const authLimiter = makeLimiter(60_000, RATE_AUTH_PER_MIN);

export async function POST(req: NextRequest) {
  if (authLimiter(clientIp(req))) {
    return NextResponse.json({ error: 'Too many attempts. Try again shortly.' }, { status: 429 });
  }

  let body: { code?: unknown };
  try {
    const text = await req.text();
    if (text.length > 512) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const code = typeof body.code === 'string' ? body.code : '';
  if (!isPlausibleCode(code)) {
    return NextResponse.json({ error: 'Invalid access code' }, { status: 401 });
  }

  try {
    const member = await getMemberByCodeHash(hashCode(code));
    if (!member || member.status !== 'active') {
      return NextResponse.json({ error: 'Invalid access code' }, { status: 401 });
    }

    await touchMemberLastUsed(member.id);
    const token = signSessionToken(member.id);

    return NextResponse.json({
      token,
      memberName: member.member_name,
      quotas: {
        messageLimit: MESSAGE_LIMIT,
        messagesPerDay: MAX_MESSAGES_PER_DAY,
        conversationsPerDay: MAX_CONVERSATIONS_PER_DAY,
      },
    });
  } catch (err) {
    console.error('[ana-coach] auth error:', err);
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
}
