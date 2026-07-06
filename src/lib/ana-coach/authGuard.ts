// Ana AI Coach — request authentication guard.
//
// Parses the Bearer session token, verifies its HMAC + expiry, then re-loads the
// member row to confirm they are still active (instant revocation). Returns the
// member, or a ready-to-return 401 NextResponse.

import { NextResponse, type NextRequest } from 'next/server';
import { verifySessionToken } from './session';
import { getMemberById } from './store';
import type { CoachMember } from './types';

export type GuardResult =
  | { ok: true; member: CoachMember }
  | { ok: false; response: NextResponse };

function unauthorized(): NextResponse {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export async function requireMember(req: NextRequest): Promise<GuardResult> {
  const auth = req.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
  if (!token) return { ok: false, response: unauthorized() };

  const memberId = verifySessionToken(token);
  if (!memberId) return { ok: false, response: unauthorized() };

  const member = await getMemberById(memberId);
  if (!member || member.status !== 'active') {
    return { ok: false, response: unauthorized() };
  }
  return { ok: true, member };
}

// Admin auth reuses the existing admidash Bearer-password convention.
export function verifyAdmin(req: NextRequest): boolean {
  const auth = req.headers.get('authorization') || '';
  const token = auth.replace('Bearer ', '');
  return !!process.env.ADMIDASH_PASSWORD && token === process.env.ADMIDASH_PASSWORD;
}
