import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Retention purge for the analytics tables.
//   POST { password, eventDays?, sessionDays? }  -> manual admin run
//   GET  Authorization: Bearer <CRON_SECRET>     -> scheduled run (Vercel cron)
//
// Defaults: raw events kept 90 days (they're the bulk + the most sensitive raw
// stream); session rollups kept 365 days (smaller, and useful for long-range
// campaign comparison). Per-subscriber deletion (delete-subscriber) handles
// GDPR requests independently of this age-based purge.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DEFAULT_EVENT_DAYS = Number(process.env.ANALYTICS_EVENT_RETENTION_DAYS ?? 90);
const DEFAULT_SESSION_DAYS = Number(process.env.ANALYTICS_SESSION_RETENTION_DAYS ?? 365);

async function purge(eventDays: number, sessionDays: number) {
  const eventCutoff = new Date(Date.now() - eventDays * 86_400_000).toISOString();
  const sessionCutoff = new Date(Date.now() - sessionDays * 86_400_000).toISOString();

  const { count: eventsToDelete } = await supabaseAdmin
    .from('analytics_events').select('*', { count: 'exact', head: true }).lt('received_at', eventCutoff);
  const { error: e1 } = await supabaseAdmin.from('analytics_events').delete().lt('received_at', eventCutoff);
  if (e1) throw e1;

  const { count: sessionsToDelete } = await supabaseAdmin
    .from('analytics_sessions').select('*', { count: 'exact', head: true }).lt('started_at', sessionCutoff);
  const { error: e2 } = await supabaseAdmin.from('analytics_sessions').delete().lt('started_at', sessionCutoff);
  if (e2) throw e2;

  return {
    event_cutoff: eventCutoff,
    session_cutoff: sessionCutoff,
    events_deleted: eventsToDelete ?? 0,
    sessions_deleted: sessionsToDelete ?? 0,
  };
}

export async function POST(req: NextRequest) {
  let body: { password?: string; eventDays?: number; sessionDays?: number } = {};
  try { body = await req.json(); } catch { /* empty */ }
  if (!process.env.ADMIDASH_PASSWORD || body.password !== process.env.ADMIDASH_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const res = await purge(body.eventDays ?? DEFAULT_EVENT_DAYS, body.sessionDays ?? DEFAULT_SESSION_DAYS);
    return NextResponse.json({ ok: true, ...res });
  } catch (e) {
    console.error('[purge] failed:', e);
    return NextResponse.json({ error: 'Purge failed' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const res = await purge(DEFAULT_EVENT_DAYS, DEFAULT_SESSION_DAYS);
    return NextResponse.json({ ok: true, ...res });
  } catch (e) {
    console.error('[purge] failed:', e);
    return NextResponse.json({ error: 'Purge failed' }, { status: 500 });
  }
}
