import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';

// GDPR / subject-deletion path. Removes all analytics rows tied to one Kit
// subscriber, by:
//   - email     -> hashed server-side to match Kit's sh_kit (several
//                  normalizations tried, since Kit's exact casing/trim isn't
//                  guaranteed), then matched against stored sh_kit values, or
//   - sh_kit    -> exact match (use the value straight from an email link), or
//   - ck_subscriber_id -> exact match (forward-compat).
//
// Deletes from both analytics_events and analytics_sessions.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function sha256(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

// Candidate hashes for an email. Kit hashes the subscriber email with SHA-256;
// we try the common normalizations so a deletion request never silently misses.
function emailHashCandidates(email: string): string[] {
  const variants = new Set<string>([
    email,
    email.trim(),
    email.toLowerCase(),
    email.trim().toLowerCase(),
  ]);
  return [...new Set([...variants].map(sha256))];
}

export async function POST(req: NextRequest) {
  let body: { password?: string; email?: string; sh_kit?: string; ck_subscriber_id?: string } = {};
  try { body = await req.json(); } catch { /* empty */ }

  if (!process.env.ADMIDASH_PASSWORD || body.password !== process.env.ADMIDASH_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const shKitValues = new Set<string>();
  if (body.sh_kit) shKitValues.add(body.sh_kit.trim());
  if (body.email) for (const h of emailHashCandidates(body.email)) shKitValues.add(h);
  const ck = body.ck_subscriber_id?.trim();

  if (shKitValues.size === 0 && !ck) {
    return NextResponse.json({ error: 'Provide email, sh_kit, or ck_subscriber_id' }, { status: 400 });
  }

  const shList = [...shKitValues];
  let eventsDeleted = 0;
  let sessionsDeleted = 0;

  try {
    for (const table of ['analytics_events', 'analytics_sessions'] as const) {
      let total = 0;
      if (shList.length) {
        const { data, error } = await supabaseAdmin.from(table).delete().in('sh_kit', shList).select('session_id');
        if (error) throw error;
        total += data?.length ?? 0;
      }
      if (ck) {
        const { data, error } = await supabaseAdmin.from(table).delete().eq('ck_subscriber_id', ck).select('session_id');
        if (error) throw error;
        total += data?.length ?? 0;
      }
      if (table === 'analytics_events') eventsDeleted = total;
      else sessionsDeleted = total;
    }
  } catch (e) {
    console.error('[delete-subscriber] failed:', e);
    return NextResponse.json({ error: 'Deletion failed' }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    matched_sh_kit: shList,
    matched_ck_subscriber_id: ck ?? null,
    events_deleted: eventsDeleted,
    sessions_deleted: sessionsDeleted,
  });
}
