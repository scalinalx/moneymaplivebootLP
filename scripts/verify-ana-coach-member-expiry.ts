/**
 * Verification for Ana AI Coach per-member (VIP code) expiry.
 *
 * Run AFTER pasting supabase/migrations/20260902120000_ana_coach_member_expiry.sql
 * into the Supabase SQL editor, with the dev server running (npm run dev):
 *
 *   npx tsx scripts/verify-ana-coach-member-expiry.ts
 *
 * It confirms the column exists, prints the real VIP roster's expiry dates
 * (the migration backfills active VIP codes to 30 Sep 2026 23:59:59 UTC), then
 * exercises the real auth flow with a throwaway live VIP member and a throwaway
 * expired one, checks that expiring a member kills their live token, and cleans
 * up after itself.
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { createHash } from 'node:crypto';

config({ path: '.env.local' });

const BASE_URL = process.env.COACH_BASE_URL || 'http://localhost:3000';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

let failures = 0;
function assert(label: string, cond: boolean, detail = '') {
  console.log(`${cond ? '✅' : '❌'} ${label}${detail ? ` — ${detail}` : ''}`);
  if (!cond) failures++;
}

// Mirrors src/lib/ana-coach/accessCodes.ts exactly: strip ANA-, keep only the
// 32-symbol alphabet (no 0/O/1/I/L). Test codes must use only these symbols.
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
function hashOf(code: string): string {
  const normalized = code.toUpperCase().replace(/^ANA-?/, '')
    .split('').filter((ch) => ALPHABET.includes(ch)).join('');
  return createHash('sha256').update(normalized).digest('hex');
}

async function authWith(code: string): Promise<{ status: number; token?: string }> {
  const res = await fetch(`${BASE_URL}/api/ana-coach/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, token: json.token };
}

async function startConversation(token: string): Promise<number> {
  const res = await fetch(`${BASE_URL}/api/ana-coach/conversation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  });
  return res.status;
}

async function main() {
  // --- 1. Schema ----------------------------------------------------------
  const { error: colErr } = await supabase.from('ana_coach_members').select('expires_at').limit(1);
  assert('ana_coach_members.expires_at column exists', !colErr, colErr?.message);
  if (colErr) {
    console.log('\nMigration not applied yet — stopping here.');
    process.exit(1);
  }

  // --- 2. Real VIP roster: what the backfill did --------------------------
  const { data: vips } = await supabase
    .from('ana_coach_members')
    .select('member_name, status, expires_at')
    .is('cohort_id', null)
    .order('created_at');
  console.log('\nVIP roster (cohort_id IS NULL):');
  console.table(vips ?? []);
  const activeVips = (vips ?? []).filter((m) => m.status === 'active');
  assert('every ACTIVE VIP code has an expiry set', activeVips.every((m) => !!m.expires_at),
    `${activeVips.filter((m) => !m.expires_at).length} without`);

  // --- 3. Seed throwaway VIP members -------------------------------------
  const liveCode = 'ANA-VRFY-MEXP-AAAA'; // alphabet-valid (no 0/O/1/I/L)
  const deadCode = 'ANA-VRFY-MEXP-BBBB';
  const { data: live } = await supabase
    .from('ana_coach_members')
    .insert({ code_hash: hashOf(liveCode), member_name: '_verify live vip', expires_at: new Date(Date.now() + 3600_000).toISOString() })
    .select('id').single();
  const { data: dead } = await supabase
    .from('ana_coach_members')
    .insert({ code_hash: hashOf(deadCode), member_name: '_verify expired vip', expires_at: new Date(Date.now() - 3600_000).toISOString() })
    .select('id').single();
  assert('seeded throwaway VIP members', !!live && !!dead);
  if (!live || !dead) process.exit(1);

  try {
    // --- 4. Live VIP code logs in; expired VIP code is rejected ----------
    const a = await authWith(liveCode);
    assert('login with live VIP code (expires in 1h) → 200 + token', a.status === 200 && !!a.token, `status=${a.status}`);
    const c = await authWith(deadCode);
    assert('login with EXPIRED VIP code → 401', c.status === 401, `status=${c.status}`);

    // --- 5. Token is capped at the member's expiry ------------------------
    const payload = JSON.parse(Buffer.from(a.token!.split('.')[0], 'base64url').toString());
    const capOk = Math.abs(payload.exp * 1000 - (Date.now() + 3600_000)) < 60_000;
    assert('session token exp capped at the member expiry (~1h)', capOk, `exp in ${Math.round((payload.exp * 1000 - Date.now()) / 60000)} min`);

    // --- 6. Expiring the member kills a live token instantly -------------
    assert('live member can start a session pre-expiry', (await startConversation(a.token!)) === 200);
    await supabase.from('ana_coach_members').update({ expires_at: new Date(Date.now() - 1000).toISOString() }).eq('id', live.id);
    assert('same token → 401 once expires_at is in the past', (await startConversation(a.token!)) === 401);
  } finally {
    // --- Cleanup (members cascade-delete their conversations) -------------
    await supabase.from('ana_coach_members').delete().in('id', [live.id, dead.id]);
    console.log('🧹 cleaned up throwaway VIP members');
  }

  console.log(failures ? `\n${failures} FAILURES` : '\nAll passed.');
  process.exit(failures ? 1 : 0);
}

main();
