import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdmin } from '@/lib/ana-coach/authGuard';
import { generateCode, hashCode } from '@/lib/ana-coach/accessCodes';

// Revoke / reactivate / edit / regenerate-code for a member. Bearer ADMIDASH_PASSWORD.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;

  let body: { status?: unknown; memberName?: unknown; memberEmail?: unknown; notes?: unknown; expiresAt?: unknown; regenerateCode?: unknown };
  try {
    body = JSON.parse(await req.text());
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const update: Record<string, unknown> = {};
  if (body.status === 'active' || body.status === 'revoked') {
    update.status = body.status;
    update.revoked_at = body.status === 'revoked' ? new Date().toISOString() : null;
  }
  if (typeof body.memberName === 'string' && body.memberName.trim()) update.member_name = body.memberName.trim();
  if (typeof body.memberEmail === 'string') update.member_email = body.memberEmail.trim() || null;
  if (typeof body.notes === 'string') update.notes = body.notes.trim() || null;
  // Expiry: empty string clears it (never expires); otherwise any parseable date.
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

  // Regenerate: issue a fresh code (new hash), invalidating the old one. The
  // plaintext is returned ONCE, exactly like member creation. The member row —
  // and their carried-over profile + usage history — is preserved.
  let newCode: string | null = null;
  if (body.regenerateCode === true) {
    newCode = generateCode();
    update.code_hash = hashCode(newCode);
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('ana_coach_members')
    .update(update)
    .eq('id', id)
    .select('id, member_name, member_email, status, notes, revoked_at, expires_at')
    .maybeSingle();

  if (error) {
    console.error('[ana-coach] member update error:', error);
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  // newCode included only on regeneration — shown once, never stored in plaintext.
  return NextResponse.json(newCode ? { member: data, code: newCode } : { member: data });
}
