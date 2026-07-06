/**
 * Step 1 end-to-end verification for the first-party analytics build.
 *
 * Run AFTER applying supabase/migrations/20260628090000_create_analytics_tables.sql
 * in the Supabase SQL editor, and with the dev server running (npm run dev).
 *
 *   npx tsx scripts/verify-analytics-step1.ts
 *
 * It:
 *   1. confirms analytics_events + analytics_sessions exist,
 *   2. POSTs a realistic batch (incl. a disallowed type + a meta.value to scrub)
 *      to /api/collect on the local dev server,
 *   3. reads the rows back and asserts validation, scrubbing, and enrichment,
 *   4. cleans up its own test rows.
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const BASE = process.argv[2] || 'http://localhost:3000';

const db = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const SID = `verify-${Date.now()}`;
const VID = `visitor-${Date.now()}`;

function ok(label: string, pass: boolean, detail = '') {
  console.log(`${pass ? '✅' : '❌'} ${label}${detail ? ` — ${detail}` : ''}`);
  if (!pass) process.exitCode = 1;
}

async function main() {
  console.log(`\nVerifying Step 1 against ${BASE}\n`);

  // 1. Tables exist?
  for (const t of ['analytics_events', 'analytics_sessions']) {
    const { error } = await db.from(t).select('*').limit(1);
    if (error) {
      console.error(
        `\n❌ Table "${t}" not reachable: ${error.message}\n` +
          `   → Apply supabase/migrations/20260628090000_create_analytics_tables.sql in the Supabase SQL editor first.\n`,
      );
      process.exit(1);
    }
  }
  ok('Both tables exist and are reachable', true);

  // 2. POST a batch: 4 valid events + 1 disallowed type + a meta.value to scrub.
  const batch = {
    events: [
      { type: 'page_view', vid: VID, sid: SID, path: '/offer-clarity', ts: Date.now(),
        utm_source: 'kit', utm_campaign: 'verify-campaign', sh_kit: 'abc123hash',
        referrer: 'https://email.kit.com/' },
      { type: 'scroll_milestone', vid: VID, sid: SID, path: '/offer-clarity', ts: Date.now(), scroll_pct: 75 },
      { type: 'section_view', vid: VID, sid: SID, path: '/offer-clarity', ts: Date.now(), section_id: 'price' },
      { type: 'cta_click', vid: VID, sid: SID, path: '/offer-clarity', ts: Date.now(), cta_id: 'buy-button-hero',
        meta: { label: 'Buy now', value: 'SHOULD_BE_SCRUBBED', nested: { value: 'ALSO_SCRUBBED', keep: 'ok' } } },
      { type: 'totally_made_up_event', vid: VID, sid: SID, path: '/offer-clarity', ts: Date.now() },
    ],
  };

  let status = 0;
  try {
    const res = await fetch(`${BASE}/api/collect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'user-agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile Safari/604.1' },
      body: JSON.stringify(batch),
    });
    status = res.status;
  } catch (e) {
    console.error(`\n❌ Could not reach ${BASE}/api/collect — is the dev server running? (npm run dev)\n`, e);
    process.exit(1);
  }
  ok('POST /api/collect returned 204', status === 204, `got ${status}`);

  // 3. Read back.
  await new Promise((r) => setTimeout(r, 600));
  const { data: rows, error } = await db
    .from('analytics_events')
    .select('*')
    .eq('session_id', SID)
    .order('id', { ascending: true });
  if (error) { console.error(error); process.exit(1); }

  ok('Exactly 4 valid events stored (made-up type rejected)', rows?.length === 4, `stored ${rows?.length}`);

  const cta = rows?.find((r) => r.event_type === 'cta_click');
  const metaStr = JSON.stringify(cta?.meta ?? {});
  ok('meta.value scrubbed (no input values stored)',
    !metaStr.includes('SHOULD_BE_SCRUBBED') && !metaStr.includes('ALSO_SCRUBBED'));
  ok('meta non-value keys preserved', metaStr.includes('Buy now') && metaStr.includes('ok'));

  const pv = rows?.find((r) => r.event_type === 'page_view');
  ok('UTM + sh_kit attribution stored', pv?.utm_campaign === 'verify-campaign' && pv?.sh_kit === 'abc123hash');
  ok('UA parsed server-side → device=mobile / os=iOS', pv?.device === 'mobile' && pv?.os === 'iOS',
    `device=${pv?.device} os=${pv?.os} browser=${pv?.browser}`);
  ok('received_at enrichment present', !!pv?.received_at);
  console.log(`   (country header absent locally → country=${pv?.country ?? 'null'}, expected on Vercel)`);

  // 4. Cleanup.
  await db.from('analytics_events').delete().eq('session_id', SID);
  console.log('\n🧹 Test rows cleaned up.\n');
}

main();
