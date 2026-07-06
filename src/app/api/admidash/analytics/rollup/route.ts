import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { rollupSessions } from '@/lib/analytics/rollup';

// Triggers the analytics_sessions rollup.
//   POST { password, all? }      -> manual run (admin); all:true = full rebuild
//   GET  Authorization: Bearer <CRON_SECRET>  -> incremental run (scheduler)
//
// The dashboard data API computes its own incremental rollup inline, so this
// endpoint exists for manual full rebuilds and an optional external scheduler.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  let body: { password?: string; all?: boolean } = {};
  try { body = await req.json(); } catch { /* empty */ }

  if (!process.env.ADMIDASH_PASSWORD || body.password !== process.env.ADMIDASH_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const res = await rollupSessions(supabaseAdmin, { all: !!body.all });
    return NextResponse.json({ ok: true, ...res });
  } catch (e) {
    console.error('[rollup] failed:', e);
    return NextResponse.json({ error: 'Rollup failed' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get('authorization');
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const res = await rollupSessions(supabaseAdmin, {}); // incremental
    return NextResponse.json({ ok: true, ...res });
  } catch (e) {
    console.error('[rollup] failed:', e);
    return NextResponse.json({ error: 'Rollup failed' }, { status: 500 });
  }
}
