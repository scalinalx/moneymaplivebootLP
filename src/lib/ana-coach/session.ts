// Ana AI Coach — stateless HMAC session tokens.
//
// After a member exchanges their access code once, they hold a short-lived
// signed token (base64url payload + "." + base64url HMAC-SHA256). No JWT library:
// ~30 lines of node:crypto. Every request still re-checks the member row is
// active, so revocation is instant despite the stateless token.

import { createHmac, timingSafeEqual } from 'node:crypto';
import { getSessionSecret, SESSION_TTL_HOURS } from './config';

interface SessionPayload {
  mid: string; // member id
  iat: number; // issued-at (unix seconds)
  exp: number; // expiry (unix seconds)
  v: 1;
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString('base64url');
}

function sign(payloadB64: string): string {
  return createHmac('sha256', getSessionSecret()).update(payloadB64).digest('base64url');
}

// maxExpMs (optional) caps the expiry below the standard TTL — used so a
// cohort member's token can never outlive the cohort's expires_at.
export function signSessionToken(memberId: string, nowMs: number = Date.now(), maxExpMs?: number): string {
  const nowSec = Math.floor(nowMs / 1000);
  let exp = nowSec + SESSION_TTL_HOURS * 3600;
  if (typeof maxExpMs === 'number') exp = Math.min(exp, Math.floor(maxExpMs / 1000));
  const payload: SessionPayload = {
    mid: memberId,
    iat: nowSec,
    exp,
    v: 1,
  };
  const payloadB64 = b64url(JSON.stringify(payload));
  return `${payloadB64}.${sign(payloadB64)}`;
}

// Returns the member id if the token is valid and unexpired, else null.
export function verifySessionToken(token: string, nowMs: number = Date.now()): string | null {
  if (typeof token !== 'string' || !token.includes('.')) return null;
  const [payloadB64, sig] = token.split('.', 2);
  if (!payloadB64 || !sig) return null;

  const expected = sign(payloadB64);
  // timingSafeEqual requires equal-length buffers.
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return null;

  let payload: SessionPayload;
  try {
    payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
  } catch {
    return null;
  }
  if (payload.v !== 1 || typeof payload.mid !== 'string') return null;
  if (typeof payload.exp !== 'number' || payload.exp * 1000 < nowMs) return null;
  return payload.mid;
}
