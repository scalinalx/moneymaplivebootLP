import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { RETENTION_DAYS } from '@/lib/ana-coach/config';

// Retention purge for Ana AI Coach transcripts + panel traces.
//   GET  Authorization: Bearer <CRON_SECRET>  -> scheduled run (Vercel cron)
//
// Deleting old conversations cascades to messages, attachments, and turn traces
// (ON DELETE CASCADE). Member rows + their carried-over profile survive (they're
// coaching context, not transcript). Aligns with the analytics 30-day posture.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const cutoff = new Date(Date.now() - RETENTION_DAYS * 86_400_000).toISOString();
  try {
    const { count } = await supabaseAdmin
      .from('ana_coach_conversations')
      .select('*', { count: 'exact', head: true })
      .lt('created_at', cutoff);
    const { error } = await supabaseAdmin
      .from('ana_coach_conversations')
      .delete()
      .lt('created_at', cutoff);
    if (error) throw error;
    return NextResponse.json({ ok: true, cutoff, conversations_deleted: count ?? 0 });
  } catch (e) {
    console.error('[ana-coach] purge failed:', e);
    return NextResponse.json({ error: 'Purge failed' }, { status: 500 });
  }
}
