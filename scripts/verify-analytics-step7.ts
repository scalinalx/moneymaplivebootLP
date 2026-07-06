/**
 * Step 7 verification: seed a campaign worth of events with a KNOWN funnel shape,
 * call the dashboard data API, and assert every computed number. Cleans up.
 *
 *   npx tsx scripts/verify-analytics-step7.ts
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const STAMP = Date.now();
const CAMPAIGN = `dash-demo-${STAMP}`;
const sid = (i: number) => `dashdemo-${i}-${STAMP}`;
let clock = STAMP - 2 * 86_400_000; // 2 days ago
const at = () => new Date((clock += 1000)).toISOString();

function ok(label: string, pass: boolean, detail = '') {
  console.log(`${pass ? '✅' : '❌'} ${label}${detail ? ` — ${detail}` : ''}`);
  if (!pass) process.exitCode = 1;
}

async function main() {
  const ev = (i: number, type: string, extra: Record<string, unknown> = {}) => ({
    visitor_id: `v-${i}`, session_id: sid(i), event_type: type, path: '/offer-clarity',
    occurred_at: at(), utm_source: 'kit', utm_campaign: CAMPAIGN,
    sh_kit: i < 20 ? `subhash-${i}` : null, device: 'desktop', country: 'US', ...extra,
  });

  const events: Record<string, unknown>[] = [];
  for (let i = 0; i < 40; i++) {
    events.push(ev(i, 'page_view'));
    events.push(ev(i, 'engagement_heartbeat', { engaged_ms: i < 30 ? 12000 : 3000 })); // 30 engaged ≥10s
    if (i < 24) events.push(ev(i, 'section_view', { section_id: 'offer' }));            // 24 reached offer
    if (i < 16) events.push(ev(i, 'cta_click', { cta_id: 'buy' }));                     // 16 clicked CTA
    if (i < 10) {                                                                       // 10 started form
      events.push(ev(i, 'form_start', { form_id: 'checkout', field_name: 'name' }));
      events.push(ev(i, 'form_field_blur', { form_id: 'checkout', field_name: 'email', meta: { ms: 500 } }));
    }
    if (i < 6) events.push(ev(i, 'form_submit_attempt', { form_id: 'checkout' }));      // 6 submit attempt
    if (i < 4) events.push(ev(i, 'form_submit_success', { form_id: 'checkout' }));      // 4 converted
    if (i >= 30 && i < 35) events.push(ev(i, 'outbound_click', { outbound_domain: 'example.com' })); // 5 outbound
    if (i >= 35) events.push(ev(i, 'page_view', { path: '/other' }));                   // 5 internal (2 pageviews)
    events.push(ev(i, 'page_exit', { scroll_pct: 40 + (i % 50), engaged_ms: i < 30 ? 12000 : 3000 }));
  }

  await db.from('analytics_events').insert(events);

  const res = await fetch(`http://localhost:3000/api/admidash/analytics/dashboard?campaign=${CAMPAIGN}`, {
    headers: { Authorization: `Bearer ${process.env.ADMIDASH_PASSWORD}` },
  });
  ok('dashboard API returns 200', res.status === 200, `got ${res.status}`);
  const d = await res.json();

  const step = (k: string) => d.funnel?.find((s: { key: string }) => s.key === k)?.count;
  console.log('\nFunnel:', d.funnel?.map((s: { label: string; count: number }) => `${s.label}=${s.count}`).join('  '));
  ok('Landed = 40', step('landed') === 40, step('landed'));
  ok('Engaged ≥10s = 30', step('engaged') === 30, step('engaged'));
  ok('Reached offer = 24', step('reached_offer') === 24, step('reached_offer'));
  ok('Clicked CTA = 16', step('cta') === 16, step('cta'));
  ok('Started form = 10', step('form_started') === 10, step('form_started'));
  ok('Submit attempt = 6', step('submit') === 6, step('submit'));
  ok('Converted = 4', step('converted') === 4, step('converted'));

  console.log('Exit:', JSON.stringify(d.exit));
  ok('Exit ended = 30', d.exit?.ended === 30, d.exit?.ended);
  ok('Exit outbound = 5', d.exit?.outbound === 5, d.exit?.outbound);
  ok('Exit internal = 5', d.exit?.internal === 5, d.exit?.internal);
  ok('Top outbound = example.com (5)', d.topOutbound?.[0]?.domain === 'example.com' && d.topOutbound?.[0]?.count === 5);

  ok('CTA perf: buy clicked by 16 sessions', d.cta?.find((c: { cta_id: string }) => c.cta_id === 'buy')?.sessions === 16);
  ok('Abandoners = 6 (started, not converted)', d.abandoners?.length === 6, d.abandoners?.length);
  ok('Abandoner last_field = email', d.abandoners?.every((a: { last_field: string }) => a.last_field === 'email'));
  ok('Subscribers in scope = 20', d.totals?.withSubscriber === 20, d.totals?.withSubscriber);
  ok('Avg time on email field ≈ 500ms', d.avgMsByField?.find((f: { field: string }) => f.field === 'email')?.avgMs === 500);
  ok('Campaign appears in comparison', d.campaignComparison?.some((c: { campaign: string }) => c.campaign === CAMPAIGN));

  // Cleanup.
  await db.from('analytics_events').delete().like('session_id', `dashdemo-%-${STAMP}`);
  await db.from('analytics_sessions').delete().like('session_id', `dashdemo-%-${STAMP}`);
  console.log('\n🧹 Step 7 test data cleaned up.\n');
}

main();
