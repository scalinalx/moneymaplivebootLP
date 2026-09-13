import { NextRequest, NextResponse } from 'next/server';
import { circleConfigured } from '@/lib/circle';
import { syncCirclePaid } from '@/lib/substack-challenge/circle-sync';

// Polls Circle for paid 30-Day Substack Challenge charges → marks leads paid,
// tags buyers in Kit (see src/lib/substack-challenge/circle-sync.ts).
//   GET  Authorization: Bearer <CRON_SECRET>  -> scheduled run. Vercel Hobby
//        only allows daily crons, so the schedule lives in Supabase pg_cron
//        (migration 20260913130000) and calls this URL every 15 minutes.
//   POST { password }                         -> manual admin run.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function run() {
  if (!circleConfigured()) {
    return NextResponse.json({ ok: false, error: 'CIRCLE_ADMIN_TOKEN not configured' }, { status: 503 });
  }
  try {
    const summary = await syncCirclePaid();
    if (summary.errors.length) console.warn('[circle-sync] finished with errors:', summary.errors);
    console.log('[circle-sync]', JSON.stringify({ ...summary, errors: summary.errors.length }));
    return NextResponse.json({ ok: true, ...summary });
  } catch (e) {
    console.error('[circle-sync] failed:', e);
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : 'Sync failed' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return run();
}

export async function POST(req: NextRequest) {
  let body: { password?: string } = {};
  try { body = await req.json(); } catch { /* empty */ }
  if (!process.env.ADMIDASH_PASSWORD || body.password !== process.env.ADMIDASH_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return run();
}
