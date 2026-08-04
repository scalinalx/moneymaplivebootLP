import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdmin } from '@/lib/ana-coach/authGuard';
import { generateCode, hashCode } from '@/lib/ana-coach/accessCodes';
import { PRICE_IN_PER_1M, PRICE_OUT_PER_1M } from '@/lib/ana-coach/config';

// Admin CRUD for shared cohort codes (e.g. the $197 challenge). Bearer
// ADMIDASH_PASSWORD, same as all other /api/admidash routes. The plaintext
// shared code is shown ONCE on creation and never stored or returned again.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Never select code_hash. If the cohorts migration hasn't been applied yet,
  // report that instead of failing so the panel can show a hint.
  const { data: cohorts, error } = await supabaseAdmin
    .from('ana_coach_cohorts')
    .select('id, name, status, expires_at, notes, created_at')
    .order('created_at', { ascending: false });
  if (error) {
    return NextResponse.json({ cohorts: [], migrationRequired: true });
  }

  // Aggregate spawned-member usage per cohort. Token columns are optional
  // (pre-token-migration) — retry without them, tokens = 0.
  let membersRes: { data: Record<string, unknown>[] | null; error: { message: string } | null } =
    await supabaseAdmin
      .from('ana_coach_members')
      .select('cohort_id, total_messages, total_conversations, total_tokens_in, total_tokens_out')
      .not('cohort_id', 'is', null);
  if (membersRes.error) {
    membersRes = await supabaseAdmin
      .from('ana_coach_members')
      .select('cohort_id, total_messages, total_conversations')
      .not('cohort_id', 'is', null);
  }

  const byCohort = new Map<string, { members: number; messages: number; conversations: number; tin: number; tout: number }>();
  for (const m of membersRes.data ?? []) {
    const id = String(m.cohort_id);
    const agg = byCohort.get(id) ?? { members: 0, messages: 0, conversations: 0, tin: 0, tout: 0 };
    agg.members += 1;
    agg.messages += Number(m.total_messages ?? 0);
    agg.conversations += Number(m.total_conversations ?? 0);
    agg.tin += Number(m.total_tokens_in ?? 0);
    agg.tout += Number(m.total_tokens_out ?? 0);
    byCohort.set(id, agg);
  }

  const rows = (cohorts ?? []).map((c) => {
    const agg = byCohort.get(c.id) ?? { members: 0, messages: 0, conversations: 0, tin: 0, tout: 0 };
    const costIn = (agg.tin / 1_000_000) * PRICE_IN_PER_1M;
    const costOut = (agg.tout / 1_000_000) * PRICE_OUT_PER_1M;
    return {
      ...c,
      member_count: agg.members,
      total_messages: agg.messages,
      total_conversations: agg.conversations,
      tokens_in: agg.tin,
      tokens_out: agg.tout,
      tokens_total: agg.tin + agg.tout,
      cost_total: costIn + costOut,
    };
  });

  return NextResponse.json({ cohorts: rows });
}

export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: { name?: unknown; expiresAt?: unknown; notes?: unknown };
  try {
    body = JSON.parse(await req.text());
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!name) return NextResponse.json({ error: 'name is required' }, { status: 400 });
  const notes = typeof body.notes === 'string' ? body.notes.trim() || null : null;

  let expires_at: string | null = null;
  if (typeof body.expiresAt === 'string' && body.expiresAt.trim()) {
    const parsed = new Date(body.expiresAt.trim());
    if (Number.isNaN(parsed.getTime())) {
      return NextResponse.json({ error: 'expiresAt is not a valid date' }, { status: 400 });
    }
    expires_at = parsed.toISOString();
  }

  // Generate a unique shared code (retry on the astronomically unlikely
  // hash collision, same as member creation).
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCode();
    const code_hash = hashCode(code);
    const { data, error } = await supabaseAdmin
      .from('ana_coach_cohorts')
      .insert({ code_hash, name, expires_at, notes })
      .select('id, name, status, expires_at, notes, created_at')
      .single();

    if (!error && data) {
      // The ONLY time the plaintext shared code is ever returned.
      return NextResponse.json({ cohort: data, code }, { status: 201 });
    }
    if (error && error.code !== '23505') {
      console.error('[ana-coach] cohort create error:', error);
      return NextResponse.json({ error: 'Request failed (is the cohorts migration applied?)' }, { status: 500 });
    }
  }
  return NextResponse.json({ error: 'Could not generate a unique code' }, { status: 500 });
}
