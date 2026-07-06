/**
 * Seed (or clean) a demo campaign so the analytics dashboard has something to
 * show. Demo rows use campaign "browser-demo" and session ids "demo-*".
 *
 *   npx tsx scripts/seed-analytics-demo.ts          # seed
 *   npx tsx scripts/seed-analytics-demo.ts --clean  # remove the demo data
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const CAMPAIGN = 'browser-demo';

async function clean() {
  await db.from('analytics_events').delete().like('session_id', 'demo-%');
  await db.from('analytics_sessions').delete().like('session_id', 'demo-%');
  console.log('Removed demo data.');
}

async function seed() {
  await clean();
  let clock = Date.now() - 2 * 86_400_000;
  const at = () => new Date((clock += 1000)).toISOString();
  const ev = (i: number, type: string, extra: Record<string, unknown> = {}) => ({
    visitor_id: `dv-${i}`, session_id: `demo-${i}`, event_type: type, path: '/offer-clarity',
    occurred_at: at(), utm_source: 'kit', utm_campaign: CAMPAIGN,
    sh_kit: i < 22 ? `demohash${i}` : null, device: i % 3 === 0 ? 'mobile' : 'desktop', country: 'US', ...extra,
  });
  const events: Record<string, unknown>[] = [];
  for (let i = 0; i < 50; i++) {
    events.push(ev(i, 'page_view'));
    events.push(ev(i, 'engagement_heartbeat', { engaged_ms: i < 38 ? 14000 : 4000 }));
    if (i < 30) events.push(ev(i, 'section_view', { section_id: 'offer' }));
    if (i < 18) events.push(ev(i, 'cta_click', { cta_id: i % 2 ? 'buy-hero' : 'buy-footer' }));
    if (i < 12) { events.push(ev(i, 'form_start', { form_id: 'checkout', field_name: 'name' }));
      events.push(ev(i, 'form_field_blur', { form_id: 'checkout', field_name: 'email', meta: { ms: 1200 + i * 100 } })); }
    if (i < 7) events.push(ev(i, 'form_submit_attempt', { form_id: 'checkout' }));
    if (i < 5) events.push(ev(i, 'form_submit_success', { form_id: 'checkout' }));
    if (i >= 38 && i < 44) events.push(ev(i, 'outbound_click', { outbound_domain: i % 2 ? 'twitter.com' : 'youtube.com' }));
    if (i >= 44) events.push(ev(i, 'page_view', { path: '/pricing' }));
    events.push(ev(i, 'page_exit', { scroll_pct: 30 + (i % 60), engaged_ms: i < 38 ? 14000 : 4000 }));
  }
  await db.from('analytics_events').insert(events);
  console.log(`Seeded ${events.length} events across 50 sessions for campaign "${CAMPAIGN}".`);
}

(process.argv.includes('--clean') ? clean() : seed());
