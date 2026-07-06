/**
 * Step 3 verification: insert synthetic events for 3 sessions covering all three
 * exit types, run the rollup, and assert the derived analytics_sessions rows.
 * Self-contained — needs only the tables to exist. Cleans up after itself.
 *
 *   npx tsx scripts/verify-analytics-step3.ts
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { rollupSessions } from '../src/lib/analytics/rollup';

config({ path: '.env.local' });

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const STAMP = Date.now();
const A = `s3-ended-${STAMP}`;     // single page, saw offer -> ended, reached_offer
const B = `s3-internal-${STAMP}`;  // two page_views -> internal
const C = `s3-outbound-${STAMP}`;  // outbound_click -> outbound
const IDS = [A, B, C];

let t = STAMP - 5 * 60 * 1000; // start 5 min ago
const at = () => new Date((t += 1000)).toISOString();
const base = (sid: string, type: string, extra: Record<string, unknown> = {}) => ({
  visitor_id: `v-${sid}`, session_id: sid, event_type: type, path: '/offer-clarity',
  occurred_at: at(), utm_source: 'kit', utm_campaign: 's3-camp', sh_kit: `hash-${sid}`,
  device: 'desktop', browser: 'Chrome', os: 'macOS', country: 'US', ...extra,
});

function ok(label: string, pass: boolean, detail = '') {
  console.log(`${pass ? '✅' : '❌'} ${label}${detail ? ` — ${detail}` : ''}`);
  if (!pass) process.exitCode = 1;
}

async function main() {
  // Clean any prior run for these ids.
  await db.from('analytics_events').delete().in('session_id', IDS);
  await db.from('analytics_sessions').delete().in('session_id', IDS);

  const events = [
    // A: ended — one page_view, scrolls, sees offer + price, 2 heartbeats, a CTA click
    base(A, 'page_view'),
    base(A, 'section_view', { section_id: 'offer' }),
    base(A, 'section_view', { section_id: 'price' }),
    base(A, 'scroll_milestone', { scroll_pct: 50 }),
    base(A, 'engagement_heartbeat', { engaged_ms: 10000 }),
    base(A, 'engagement_heartbeat', { engaged_ms: 7000 }),
    base(A, 'cta_click', { cta_id: 'buy-hero' }),
    base(A, 'cta_click', { cta_id: 'buy-hero' }),
    base(A, 'page_exit', { scroll_pct: 62, engaged_ms: 17000 }),

    // B: internal — two page_views on different paths
    base(B, 'page_view'),
    base(B, 'engagement_heartbeat', { engaged_ms: 10000 }),
    base(B, 'page_view', { path: '/offer-clarity-success' }),
    base(B, 'engagement_heartbeat', { engaged_ms: 5000 }),
    base(B, 'page_exit', { path: '/offer-clarity-success', scroll_pct: 80, engaged_ms: 5000 }),

    // C: outbound — page_view then an outbound click
    base(C, 'page_view'),
    base(C, 'scroll_milestone', { scroll_pct: 25 }),
    base(C, 'outbound_click', { outbound_domain: 'example.com' }),
    base(C, 'engagement_heartbeat', { engaged_ms: 3000 }),
  ];
  const { error: insErr } = await db.from('analytics_events').insert(events);
  if (insErr) { console.error(insErr); process.exit(1); }

  // Run the rollup for exactly these sessions.
  const res = await rollupSessions(db, { sessionIds: IDS });
  ok('rollup processed 3 sessions', res.sessionsProcessed === 3, `processed ${res.sessionsProcessed}`);

  const { data: rows } = await db.from('analytics_sessions').select('*').in('session_id', IDS);
  const get = (id: string) => rows?.find((r) => r.session_id === id);
  const a = get(A), b = get(B), c = get(C);

  // A — ended
  ok('A exit_type = ended', a?.exit_type === 'ended', a?.exit_type);
  ok('A reached_offer = true (saw offer/price)', a?.reached_offer === true);
  ok('A engaged_ms = 17000 (sum of heartbeats, not double-counting page_exit)',
    a?.engaged_ms === 17000, `${a?.engaged_ms}`);
  ok('A max_scroll_pct = 62 (page_exit beats milestone 50)', a?.max_scroll_pct === 62, `${a?.max_scroll_pct}`);
  ok('A cta_clicks = {buy-hero: 2}', JSON.stringify(a?.cta_clicks) === '{"buy-hero":2}', JSON.stringify(a?.cta_clicks));
  ok('A entry_source = kit (from utm_source)', a?.entry_source === 'kit', a?.entry_source);
  ok('A sh_kit stitched', a?.sh_kit === `hash-${A}`, a?.sh_kit);
  ok('A event_count = 9', a?.event_count === 9, `${a?.event_count}`);

  // B — internal
  ok('B exit_type = internal (2 page_views)', b?.exit_type === 'internal', b?.exit_type);
  ok('B exit_detail = last page path', b?.exit_detail === '/offer-clarity-success', b?.exit_detail);
  ok('B engaged_ms = 15000', b?.engaged_ms === 15000, `${b?.engaged_ms}`);
  ok('B reached_offer = false', b?.reached_offer === false);

  // C — outbound
  ok('C exit_type = outbound', c?.exit_type === 'outbound', c?.exit_type);
  ok('C exit_detail = example.com', c?.exit_detail === 'example.com', c?.exit_detail);

  // Cleanup.
  await db.from('analytics_events').delete().in('session_id', IDS);
  await db.from('analytics_sessions').delete().in('session_id', IDS);
  console.log('\n🧹 Step 3 test data cleaned up.\n');
}

main();
