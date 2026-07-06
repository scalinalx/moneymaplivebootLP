// Ana AI Coach — best-effort per-IP rate limiter.
//
// Generalized from the in-memory limiter in /api/collect. Serverless instances
// are ephemeral and not shared, so this is a per-instance burst shield, not a
// global limiter — the authoritative caps live in Supabase (daily quotas).

import type { NextRequest } from 'next/server';

type Limiter = (key: string) => boolean;

export function makeLimiter(windowMs: number, max: number): Limiter {
  const hits = new Map<string, number[]>();
  return (key: string): boolean => {
    const now = Date.now();
    const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    arr.push(now);
    hits.set(key, arr);
    if (hits.size > 5000) {
      for (const [k, v] of hits) {
        if (v.every((t) => now - t >= windowMs)) hits.delete(k);
      }
    }
    return arr.length > max;
  };
}

export function clientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}
