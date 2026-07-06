import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import {
  sanitizeEvent,
  parseUserAgent,
  MAX_EVENTS_PER_BATCH,
  MAX_BODY_BYTES,
  type CleanEvent,
} from '@/lib/analytics/events';

// First-party analytics ingestion. Receives batches from the track.js client,
// validates + sanitizes them, enriches with server-side context (country from
// IP then IP discarded; device/browser/os from UA then UA discarded), and writes
// the raw rows to analytics_events. Same-origin, so no CORS needed.
//
// Node runtime (not edge): we use the supabase service-role client here.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// --- Best-effort in-memory rate limit -------------------------------------
// Serverless instances are ephemeral and not shared, so this is a per-instance
// guard against a single abusive client, not a global limiter. Combined with the
// payload/event-count caps below it's enough abuse protection for this scale.
const WINDOW_MS = 60_000;
const MAX_REQ_PER_WINDOW = 120;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(key, arr);
  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return arr.length > MAX_REQ_PER_WINDOW;
}

function clientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

// Country from the edge/CDN header. Vercel sets x-vercel-ip-country; Cloudflare
// sets cf-ipcountry. Locally these are absent -> null. We never read the raw IP
// for geo and never store it.
function countryFromHeaders(req: NextRequest): string | null {
  const c =
    req.headers.get('x-vercel-ip-country') ??
    req.headers.get('cf-ipcountry') ??
    null;
  if (!c || c === 'XX' || c.length !== 2) return null;
  return c.toUpperCase();
}

export async function POST(req: NextRequest) {
  // 1. Size guard — read as text so we can measure before parsing.
  const body = await req.text();
  if (body.length > MAX_BODY_BYTES) {
    return new NextResponse(null, { status: 413 });
  }

  // 2. Rate limit (best-effort, per instance).
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return new NextResponse(null, { status: 429 });
  }

  // 3. Parse. Accept a bare array or { events: [...] }.
  let parsed: unknown;
  try {
    parsed = JSON.parse(body);
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const rawEvents: unknown[] = Array.isArray(parsed)
    ? parsed
    : Array.isArray((parsed as { events?: unknown }).events)
      ? ((parsed as { events: unknown[] }).events)
      : [];
  if (rawEvents.length === 0) {
    return new NextResponse(null, { status: 400 });
  }

  // 4. Server-derived enrichment (computed once per batch).
  const country = countryFromHeaders(req);
  const { device, browser, os } = parseUserAgent(req.headers.get('user-agent'));

  // 5. Validate + sanitize, capped at the per-batch limit.
  const clean: CleanEvent[] = [];
  for (const raw of rawEvents.slice(0, MAX_EVENTS_PER_BATCH)) {
    const ev = sanitizeEvent(raw);
    if (ev) clean.push(ev);
  }
  if (clean.length === 0) {
    return new NextResponse(null, { status: 400 });
  }

  // 6. Build DB rows. Omit occurred_at when null so the column default applies.
  const rows = clean.map((e) => {
    const row: Record<string, unknown> = { ...e, device, browser, os, country };
    if (!row.occurred_at) delete row.occurred_at;
    return row;
  });

  // 7. Write. Failure is logged but the client ignores the response either way.
  const { error } = await supabaseAdmin.from('analytics_events').insert(rows);
  if (error) {
    console.error('[collect] insert failed:', error.message);
    return new NextResponse(null, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
