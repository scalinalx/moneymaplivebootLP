/**
 * One-time backfill of per-member lifetime token counters from existing turn
 * traces. Run AFTER applying the 20260706120000 migration:
 *   npx tsx scripts/backfill-ana-coach-tokens.ts
 *
 * Sums tokens across triage + specialists + synthesis for every trace, rolls up
 * to the member (via conversation), and writes total_tokens_in/out. Idempotent —
 * it SETS the totals from the retained traces (note: traces older than the 30-day
 * retention are gone, so this reflects the retained window; going forward the
 * live per-turn increment keeps the true lifetime total).
 */
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } },
);

function usageOf(blob: any): { in: number; out: number } {
  const u = blob?.usage ?? blob ?? {};
  return { in: Number(u.tokens_in ?? 0), out: Number(u.tokens_out ?? 0) };
}

async function main() {
  // conversation_id → member_id
  const { data: convs } = await db.from('ana_coach_conversations').select('id, member_id');
  const convMember = new Map<string, string>();
  for (const c of convs ?? []) convMember.set(c.id, c.member_id);

  const { data: traces } = await db
    .from('ana_coach_turn_traces')
    .select('conversation_id, triage, specialists, synthesis');

  const totals = new Map<string, { in: number; out: number }>();
  for (const t of traces ?? []) {
    const member = convMember.get(t.conversation_id);
    if (!member) continue;
    let tin = 0;
    let tout = 0;
    const tri = usageOf(t.triage); tin += tri.in; tout += tri.out;
    const syn = usageOf(t.synthesis); tin += syn.in; tout += syn.out;
    for (const s of (t.specialists as any[]) ?? []) { const u = usageOf(s); tin += u.in; tout += u.out; }
    const acc = totals.get(member) ?? { in: 0, out: 0 };
    acc.in += tin; acc.out += tout;
    totals.set(member, acc);
  }

  let updated = 0;
  for (const [member, { in: tin, out: tout }] of totals) {
    await db.from('ana_coach_members').update({ total_tokens_in: tin, total_tokens_out: tout }).eq('id', member);
    updated++;
    console.log(`  ${member}: in=${tin} out=${tout}`);
  }
  console.log(`\n✅ Backfilled ${updated} member(s) from ${traces?.length ?? 0} traces.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
