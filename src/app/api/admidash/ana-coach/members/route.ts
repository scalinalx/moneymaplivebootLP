import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdmin } from '@/lib/ana-coach/authGuard';
import { generateCode, hashCode } from '@/lib/ana-coach/accessCodes';
import { PRICE_IN_PER_1M, PRICE_OUT_PER_1M } from '@/lib/ana-coach/config';

// Admin CRUD for VIP coach members. Bearer ADMIDASH_PASSWORD, same as all other
// /api/admidash routes. Plaintext codes are shown ONCE on creation and never
// stored or returned again.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Never select code_hash. Token columns are optional — if the counter migration
  // hasn't been applied yet, fall back to a select without them (tokens = 0).
  const BASE_COLS = 'id, member_name, member_email, status, notes, total_messages, total_conversations, created_at, revoked_at, last_used_at';
  const TOKEN_COLS = 'total_tokens_in, total_tokens_out';

  let res: { data: Record<string, unknown>[] | null; error: { message: string } | null } =
    await supabaseAdmin
      .from('ana_coach_members')
      .select(`${BASE_COLS}, ${TOKEN_COLS}`)
      .order('created_at', { ascending: false });
  if (res.error) {
    // Retry without the token columns so the panel still works pre-migration.
    res = await supabaseAdmin.from('ana_coach_members').select(BASE_COLS).order('created_at', { ascending: false });
  }
  if (res.error) {
    console.error('[ana-coach] members list error:', res.error);
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
  const data = res.data;

  // Attach a computed cost estimate (input/output/total, USD) per member.
  const members = (data ?? []).map((m) => {
    const tin = Number(m.total_tokens_in ?? 0);
    const tout = Number(m.total_tokens_out ?? 0);
    const costIn = (tin / 1_000_000) * PRICE_IN_PER_1M;
    const costOut = (tout / 1_000_000) * PRICE_OUT_PER_1M;
    return {
      ...m,
      tokens_in: tin,
      tokens_out: tout,
      tokens_total: tin + tout,
      cost_in: costIn,
      cost_out: costOut,
      cost_total: costIn + costOut,
    };
  });

  return NextResponse.json({
    members,
    pricing: { in_per_1m: PRICE_IN_PER_1M, out_per_1m: PRICE_OUT_PER_1M },
  });
}

export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: { memberName?: unknown; memberEmail?: unknown; notes?: unknown };
  try {
    body = JSON.parse(await req.text());
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const memberName = typeof body.memberName === 'string' ? body.memberName.trim() : '';
  if (!memberName) return NextResponse.json({ error: 'memberName is required' }, { status: 400 });
  const memberEmail = typeof body.memberEmail === 'string' ? body.memberEmail.trim() || null : null;
  const notes = typeof body.notes === 'string' ? body.notes.trim() || null : null;

  // Generate a unique code (retry on the astronomically unlikely hash collision).
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCode();
    const code_hash = hashCode(code);
    const { data, error } = await supabaseAdmin
      .from('ana_coach_members')
      .insert({ code_hash, member_name: memberName, member_email: memberEmail, notes })
      .select('id, member_name, member_email, status, created_at')
      .single();

    if (!error && data) {
      // The ONLY time the plaintext code is ever returned.
      return NextResponse.json({ member: data, code }, { status: 201 });
    }
    if (error && error.code !== '23505') {
      console.error('[ana-coach] member create error:', error);
      return NextResponse.json({ error: 'Request failed' }, { status: 500 });
    }
  }
  return NextResponse.json({ error: 'Could not generate a unique code' }, { status: 500 });
}
