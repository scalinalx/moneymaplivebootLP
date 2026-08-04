import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdmin } from '@/lib/ana-coach/authGuard';
import { generateCode, hashCode } from '@/lib/ana-coach/accessCodes';

// Revoke / reactivate / edit / regenerate-code for a cohort. Bearer
// ADMIDASH_PASSWORD. Revoking (or expiry passing) cuts off every member spawned
// by the cohort's code on their next request.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;

  let body: { status?: unknown; name?: unknown; expiresAt?: unknown; notes?: unknown; regenerateCode?: unknown };
  try {
    body = JSON.parse(await req.text());
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const update: Record<string, unknown> = {};
  if (body.status === 'active' || body.status === 'revoked') update.status = body.status;
  if (typeof body.name === 'string' && body.name.trim()) update.name = body.name.trim();
  if (typeof body.notes === 'string') update.notes = body.notes.trim() || null;
  if (typeof body.expiresAt === 'string') {
    if (!body.expiresAt.trim()) {
      update.expires_at = null;
    } else {
      const parsed = new Date(body.expiresAt.trim());
      if (Number.isNaN(parsed.getTime())) {
        return NextResponse.json({ error: 'expiresAt is not a valid date' }, { status: 400 });
      }
      update.expires_at = parsed.toISOString();
    }
  }

  // Regenerate: issue a fresh shared code (new hash), invalidating the old one
  // for future logins. Already-spawned members keep working via their tokens.
  let newCode: string | null = null;
  if (body.regenerateCode === true) {
    newCode = generateCode();
    update.code_hash = hashCode(newCode);
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('ana_coach_cohorts')
    .update(update)
    .eq('id', id)
    .select('id, name, status, expires_at, notes')
    .maybeSingle();

  if (error) {
    console.error('[ana-coach] cohort update error:', error);
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  // newCode included only on regeneration — shown once, never stored in plaintext.
  return NextResponse.json(newCode ? { cohort: data, code: newCode } : { cohort: data });
}
