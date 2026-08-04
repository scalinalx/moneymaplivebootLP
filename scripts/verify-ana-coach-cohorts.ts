/**
 * Verification for the Ana AI Coach shared cohort codes feature.
 *
 * Run AFTER pasting supabase/migrations/20260804120000_create_ana_coach_cohorts.sql
 * into the Supabase SQL editor, with the dev server running (npm run dev):
 *
 *   npx tsx scripts/verify-ana-coach-cohorts.ts
 *
 * It confirms the table + column exist, then exercises the real auth flow with a
 * throwaway live cohort and a throwaway expired cohort (login spawns per-user
 * members; expired/revoked cohorts are rejected), and cleans up after itself.
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

async function authWith(code: string, name?: string): Promise<{ status: number; token?: string; memberName?: string }> {
  const res = await fetch(`${BASE_URL}/api/ana-coach/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, name }),
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, token: json.token, memberName: json.memberName };
}

async function main() {
  // --- 1. Schema ----------------------------------------------------------
  const { error: tableErr } = await supabase.from('ana_coach_cohorts').select('id').limit(1);
  assert('ana_coach_cohorts table exists', !tableErr, tableErr?.message);
  const { error: colErr } = await supabase.from('ana_coach_members').select('cohort_id').limit(1);
  assert('ana_coach_members.cohort_id column exists', !colErr, colErr?.message);
  if (tableErr || colErr) {
    console.log('\nMigration not applied yet — stopping here.');
    process.exit(1);
  }

  // --- 2. Seed throwaway cohorts -----------------------------------------
  const liveCode = 'ANA-VRFY-TEST-AAAA'; // alphabet-valid (no 0/O/1/I/L)
  const deadCode = 'ANA-VRFY-DEAD-BBBB';
  const { data: live } = await supabase
    .from('ana_coach_cohorts')
    .insert({ code_hash: hashOf(liveCode), name: '_verify live cohort', expires_at: new Date(Date.now() + 3600_000).toISOString() })
    .select('id').single();
  const { data: dead } = await supabase
    .from('ana_coach_cohorts')
    .insert({ code_hash: hashOf(deadCode), name: '_verify expired cohort', expires_at: new Date(Date.now() - 3600_000).toISOString() })
    .select('id').single();
  assert('seeded throwaway cohorts', !!live && !!dead);
  if (!live || !dead) process.exit(1);

  try {
    // --- 3. Live cohort login spawns per-user members ---------------------
    const a = await authWith(liveCode, 'Stefania');
    assert('login #1 (with first name) → 200 + token', a.status === 200 && !!a.token, `status=${a.status}`);
    assert('login #1 greeted by given name', a.memberName === 'Stefania', `memberName="${a.memberName}"`);
    const b = await authWith(liveCode);
    assert('login #2 (no name) → 200 + token', b.status === 200 && !!b.token);
    assert('login #2 greeting name empty (UI says plain "Welcome.")', b.memberName === '', `memberName="${b.memberName}"`);

    const { data: spawned } = await supabase
      .from('ana_coach_members')
      .select('id, member_name, status')
      .eq('cohort_id', live.id);
    assert('each login spawned its OWN member row', (spawned ?? []).length === 2,
      `rows=${(spawned ?? []).length}`);
    assert('named row stored with the given name', (spawned ?? []).some((m) => m.member_name === 'Stefania'));

    // --- 4. Expired cohort is rejected with the generic error -------------
    const c = await authWith(deadCode);
    assert('login with EXPIRED cohort code → 401', c.status === 401, `status=${c.status}`);

    // --- 5. Revoking the cohort kills live tokens instantly ---------------
    const start = await fetch(`${BASE_URL}/api/ana-coach/conversation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${a.token}` },
    });
    assert('spawned member can start a session pre-revoke', start.status === 200, `status=${start.status}`);

    await supabase.from('ana_coach_cohorts').update({ status: 'revoked' }).eq('id', live.id);
    const afterRevoke = await fetch(`${BASE_URL}/api/ana-coach/conversation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${a.token}` },
    });
    assert('same token → 401 after cohort revoked', afterRevoke.status === 401, `status=${afterRevoke.status}`);
  } finally {
    // --- Cleanup (members cascade-delete their conversations) -------------
    await supabase.from('ana_coach_members').delete().eq('cohort_id', live.id);
    await supabase.from('ana_coach_cohorts').delete().in('id', [live.id, dead.id]);
    console.log('🧹 cleaned up throwaway cohorts + spawned members');
  }

  console.log(failures ? `\n${failures} FAILURES` : '\nAll passed.');
  process.exit(failures ? 1 : 0);
}

main();
