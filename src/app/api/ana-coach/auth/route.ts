import { NextResponse, type NextRequest } from 'next/server';
import { hashCode, isPlausibleCode } from '@/lib/ana-coach/accessCodes';
import {
  cohortIsLive,
  createCohortMember,
  getCohortByCodeHash,
  getMemberByCodeHash,
  touchMemberLastUsed,
} from '@/lib/ana-coach/store';
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

  let body: { code?: unknown; name?: unknown };
  try {
    const text = await req.text();
    if (text.length > 512) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const code = typeof body.code === 'string' ? body.code : '';
  // Optional first name — display/admin only (never reaches prompts). Strip
  // control characters, cap length.
  const givenName = typeof body.name === 'string'
    ? body.name.replace(/\p{C}/gu, '').trim().slice(0, 60)
    : '';
  if (!isPlausibleCode(code)) {
    return NextResponse.json({ error: 'Invalid access code' }, { status: 401 });
  }

  try {
    const codeHash = hashCode(code);

    // 1) Individual (VIP) code → the member's own row.
    // 2) Shared cohort code → spawn a personal member row for this login, so
    //    sessions/quotas/cost stay per-person. Expired or revoked cohorts get
    //    the same generic error as a wrong code.
    let member = await getMemberByCodeHash(codeHash);
    let cohortExpiresAtMs: number | undefined;
    let spawnedWithoutName = false;
    if (!member) {
      const cohort = await getCohortByCodeHash(codeHash);
      if (!cohort || !cohortIsLive(cohort)) {
        return NextResponse.json({ error: 'Invalid access code' }, { status: 401 });
      }
      member = await createCohortMember(cohort, givenName || undefined);
      spawnedWithoutName = !givenName;
      if (cohort.expires_at) cohortExpiresAtMs = new Date(cohort.expires_at).getTime();
    }
    if (member.status !== 'active') {
      return NextResponse.json({ error: 'Invalid access code' }, { status: 401 });
    }

    await touchMemberLastUsed(member.id);
    // Cohort tokens are capped at the cohort's expiry — they can't outlive it.
    const token = signSessionToken(member.id, Date.now(), cohortExpiresAtMs);

    return NextResponse.json({
      token,
      // A nameless cohort row is called "<cohort> member" for the admin panel —
      // don't greet with that; the UI falls back to a plain "Welcome."
      memberName: spawnedWithoutName ? '' : member.member_name,
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
