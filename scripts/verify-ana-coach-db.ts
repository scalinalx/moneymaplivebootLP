/**
 * DB verification for the Ana AI Coach foundation.
 *
 * Run AFTER pasting supabase/migrations/20260705120000_create_ana_coach_tables.sql
 * into the Supabase SQL editor:
 *
 *   npx tsx scripts/verify-ana-coach-db.ts
 *
 * It confirms all six tables exist, exercises the atomic quota RPCs against a
 * throwaway member/conversation, and cleans up after itself.
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { createHash } from 'node:crypto';

config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const db = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function ok(label: string, pass: boolean, detail = '') {
  console.log(`${pass ? '✅' : '❌'} ${label}${detail ? ` — ${detail}` : ''}`);
  if (!pass) process.exitCode = 1;
}

const TABLES = [
  'ana_coach_members',
  'ana_coach_conversations',
  'ana_coach_messages',
  'ana_coach_attachments',
  'ana_coach_daily_usage',
  'ana_coach_turn_traces',
];

async function main() {
  console.log('\nVerifying Ana AI Coach DB foundation\n');

  for (const t of TABLES) {
    const { error } = await db.from(t).select('*').limit(1);
    if (error) {
      console.error(
        `\n❌ Table "${t}" not reachable: ${error.message}\n` +
          `   → Paste supabase/migrations/20260705120000_create_ana_coach_tables.sql into the Supabase SQL editor first.\n`,
      );
      process.exit(1);
    }
  }
  ok('All six tables exist and are reachable', true);

  // Throwaway member.
  const codeHash = createHash('sha256').update(`verify-${Date.now()}`).digest('hex');
  const { data: member, error: mErr } = await db
    .from('ana_coach_members')
    .insert({ code_hash: codeHash, member_name: 'Verify Bot' })
    .select('id')
    .single();
  if (mErr || !member) { console.error(mErr); process.exit(1); }
  const memberId = member.id as string;

  // bump_daily: conversations cap of 2 → true, true, false.
  const b1 = await db.rpc('ana_coach_bump_daily', { p_member: memberId, p_kind: 'conversations', p_max: 2 });
  const b2 = await db.rpc('ana_coach_bump_daily', { p_member: memberId, p_kind: 'conversations', p_max: 2 });
  const b3 = await db.rpc('ana_coach_bump_daily', { p_member: memberId, p_kind: 'conversations', p_max: 2 });
  ok('bump_daily enforces cap (true,true,false)', b1.data === true && b2.data === true && b3.data === false,
    `${b1.data},${b2.data},${b3.data}`);

  // Conversation for consume tests.
  const { data: conv } = await db
    .from('ana_coach_conversations')
    .insert({ member_id: memberId, message_limit: 6 })
    .select('id')
    .single();
  const convId = conv!.id as string;

  // consume_message: limit 6 means +2 each turn → ok at 0, ok at 2, ok at 4, then cap.
  const results: boolean[] = [];
  for (let i = 0; i < 4; i++) {
    // release lock between turns to simulate sequential turns
    const r = await db.rpc('ana_coach_consume_message', {
      p_conversation: convId, p_member: memberId, p_max_messages_per_day: 100, p_lock_stale_secs: 120,
    });
    const row = Array.isArray(r.data) ? r.data[0] : r.data;
    results.push(!!row?.ok);
    await db.rpc('ana_coach_release_lock', { p_conversation: convId });
  }
  ok('consume_message enforces conversation cap (3 ok, then blocked)',
    results[0] && results[1] && results[2] && !results[3], JSON.stringify(results));

  // busy lock: consume without releasing → second call 'busy'.
  const c1 = await db.rpc('ana_coach_consume_message', {
    p_conversation: convId, p_member: memberId, p_max_messages_per_day: 100, p_lock_stale_secs: 120,
  });
  const c1row = Array.isArray(c1.data) ? c1.data[0] : c1.data;
  // c1 should be conversation_cap (already at limit); reset limit high to test busy instead
  await db.from('ana_coach_conversations').update({ message_limit: 100, in_flight_since: null, message_count: 0 }).eq('id', convId);
  const d1 = await db.rpc('ana_coach_consume_message', {
    p_conversation: convId, p_member: memberId, p_max_messages_per_day: 100, p_lock_stale_secs: 120,
  });
  const d2 = await db.rpc('ana_coach_consume_message', {
    p_conversation: convId, p_member: memberId, p_max_messages_per_day: 100, p_lock_stale_secs: 120,
  });
  const d1row = Array.isArray(d1.data) ? d1.data[0] : d1.data;
  const d2row = Array.isArray(d2.data) ? d2.data[0] : d2.data;
  ok('consume_message concurrency lock (ok then busy)', d1row?.ok === true && d2row?.reason === 'busy',
    `${d1row?.reason},${d2row?.reason}`);
  void c1row;

  // refund restores count + releases lock.
  await db.rpc('ana_coach_refund_message', { p_conversation: convId, p_member: memberId });
  const { data: after } = await db
    .from('ana_coach_conversations')
    .select('message_count, in_flight_since')
    .eq('id', convId)
    .single();
  ok('refund_message rolls back count + releases lock',
    after?.message_count === 0 && after?.in_flight_since === null,
    `count=${after?.message_count} lock=${after?.in_flight_since}`);

  // Cleanup (cascade from member).
  await db.from('ana_coach_members').delete().eq('id', memberId);
  console.log('\n🧹 Test rows cleaned up.\n');
}

main();
