import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { rollupSessions } from '@/lib/analytics/rollup';

// Data API for the analytics dashboard. Refreshes the rollup incrementally, then
// computes the per-campaign funnel + supporting views from analytics_sessions.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function verifyAuth(req: NextRequest): boolean {
  const token = (req.headers.get('authorization') || '').replace('Bearer ', '');
  return !!process.env.ADMIDASH_PASSWORD && token === process.env.ADMIDASH_PASSWORD;
}

interface SessionLite {
  session_id: string;
  sh_kit: string | null;
  utm_campaign: string | null;
  entry_source: string | null;
  started_at: string | null;
  engaged_ms: number | null;
  max_scroll_pct: number | null;
  reached_offer: boolean | null;
  cta_clicks: Record<string, number> | null;
  form_started: boolean | null;
  form_submitted: boolean | null;
  form_succeeded: boolean | null;
  form_last_field: string | null;
  converted: boolean | null;
  exit_type: string | null;
  exit_detail: string | null;
  device: string | null;
  country: string | null;
}

const SESSION_COLS =
  'session_id,sh_kit,utm_campaign,entry_source,started_at,engaged_ms,max_scroll_pct,reached_offer,cta_clicks,form_started,form_submitted,form_succeeded,form_last_field,converted,exit_type,exit_detail,device,country';

const MAX_SESSIONS = 5000; // cap on rows pulled into memory per load

// Paginate past Supabase's 1000-row cap, up to MAX_SESSIONS.
async function fetchSessions(fromIso: string, toIso: string): Promise<SessionLite[]> {
  const out: SessionLite[] = [];
  const PAGE = 1000;
  for (let start = 0; start < MAX_SESSIONS; start += PAGE) {
    const { data, error } = await supabaseAdmin
      .from('analytics_sessions')
      .select(SESSION_COLS)
      .gte('started_at', fromIso)
      .lte('started_at', toIso)
      .order('started_at', { ascending: false })
      .range(start, start + PAGE - 1);
    if (error) throw error;
    const rows = (data ?? []) as SessionLite[];
    out.push(...rows);
    if (rows.length < PAGE) break;
  }
  return out;
}

function median(nums: number[]): number {
  if (!nums.length) return 0;
  const s = [...nums].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2);
}

export async function GET(req: NextRequest) {
  if (!verifyAuth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const campaign = searchParams.get('campaign');
    const threshold = Number(searchParams.get('threshold') || '10000'); // engaged-ms
    const to = searchParams.get('to') ? new Date(searchParams.get('to')!) : new Date();
    const from = searchParams.get('from')
      ? new Date(searchParams.get('from')!)
      : new Date(to.getTime() - 30 * 86_400_000); // default: last 30 days
    const fromIso = from.toISOString();
    const toIso = to.toISOString();

    // Keep the rollup fresh before reading.
    await rollupSessions(supabaseAdmin, {});

    const all = await fetchSessions(fromIso, toIso);
    const scoped = campaign ? all.filter((s) => s.utm_campaign === campaign) : all;

    // ---- Primary funnel ----
    const count = (pred: (s: SessionLite) => boolean) => scoped.filter(pred).length;
    const landed = scoped.length;
    const steps = [
      { key: 'landed', label: 'Landed', count: landed },
      { key: 'engaged', label: `Engaged (≥${Math.round(threshold / 1000)}s)`, count: count((s) => (s.engaged_ms ?? 0) >= threshold) },
      { key: 'reached_offer', label: 'Reached offer', count: count((s) => !!s.reached_offer) },
      { key: 'cta', label: 'Clicked CTA', count: count((s) => !!s.cta_clicks && Object.keys(s.cta_clicks).length > 0) },
      { key: 'form_started', label: 'Started form', count: count((s) => !!s.form_started) },
      { key: 'submit', label: 'Submit attempt', count: count((s) => !!s.form_submitted) },
      { key: 'converted', label: 'Converted', count: count((s) => !!s.converted) },
    ];
    const funnel = steps.map((s, i) => ({
      ...s,
      pctOfLanded: landed ? Math.round((s.count / landed) * 1000) / 10 : 0,
      dropFromPrev: i === 0 || steps[i - 1].count === 0
        ? 0
        : Math.round(((steps[i - 1].count - s.count) / steps[i - 1].count) * 1000) / 10,
    }));

    // ---- Exit breakdown ----
    const exit = { internal: 0, outbound: 0, ended: 0 } as Record<string, number>;
    const outboundDomains: Record<string, number> = {};
    for (const s of scoped) {
      if (s.exit_type) exit[s.exit_type] = (exit[s.exit_type] || 0) + 1;
      if (s.exit_type === 'outbound' && s.exit_detail) outboundDomains[s.exit_detail] = (outboundDomains[s.exit_detail] || 0) + 1;
    }
    const topOutbound = Object.entries(outboundDomains).map(([domain, c]) => ({ domain, count: c })).sort((a, b) => b.count - a.count).slice(0, 10);

    // ---- Scroll / engagement ----
    const buckets = [
      { label: '0–25%', count: 0 }, { label: '25–50%', count: 0 },
      { label: '50–75%', count: 0 }, { label: '75–99%', count: 0 }, { label: '100%', count: 0 },
    ];
    for (const s of scoped) {
      const p = s.max_scroll_pct ?? 0;
      const idx = p >= 100 ? 4 : p >= 75 ? 3 : p >= 50 ? 2 : p >= 25 ? 1 : 0;
      buckets[idx].count++;
    }
    const medianEngagedMs = median(scoped.map((s) => s.engaged_ms ?? 0));

    // ---- CTA performance ----
    const ctaAgg: Record<string, { clicks: number; sessions: number }> = {};
    for (const s of scoped) {
      if (!s.cta_clicks) continue;
      for (const [id, c] of Object.entries(s.cta_clicks)) {
        if (!ctaAgg[id]) ctaAgg[id] = { clicks: 0, sessions: 0 };
        ctaAgg[id].clicks += c;
        ctaAgg[id].sessions += 1;
      }
    }
    const cta = Object.entries(ctaAgg).map(([cta_id, v]) => ({ cta_id, ...v })).sort((a, b) => b.clicks - a.clicks);

    // ---- Form drop-off by last field (started but not converted) ----
    const byLastField: Record<string, number> = {};
    for (const s of scoped) {
      if (s.form_started && !s.converted) {
        const f = s.form_last_field || '(none)';
        byLastField[f] = (byLastField[f] || 0) + 1;
      }
    }
    const formDropoff = Object.entries(byLastField).map(([field, c]) => ({ field, count: c })).sort((a, b) => b.count - a.count);

    // Average time per field, from raw form_field_blur events (campaign + range scoped).
    let blurQ = supabaseAdmin
      .from('analytics_events')
      .select('field_name,meta')
      .eq('event_type', 'form_field_blur')
      .gte('occurred_at', fromIso)
      .lte('occurred_at', toIso)
      .limit(5000);
    if (campaign) blurQ = blurQ.eq('utm_campaign', campaign);
    const { data: blurs } = await blurQ;
    const fieldTimes: Record<string, { total: number; n: number }> = {};
    for (const b of (blurs ?? []) as { field_name: string | null; meta: { ms?: number } | null }[]) {
      const ms = b.meta?.ms;
      if (b.field_name && typeof ms === 'number') {
        if (!fieldTimes[b.field_name]) fieldTimes[b.field_name] = { total: 0, n: 0 };
        fieldTimes[b.field_name].total += ms;
        fieldTimes[b.field_name].n += 1;
      }
    }
    const avgMsByField = Object.entries(fieldTimes)
      .map(([field, v]) => ({ field, avgMs: Math.round(v.total / v.n), n: v.n }))
      .sort((a, b) => b.avgMs - a.avgMs);

    // ---- Campaign comparison (all campaigns in range) ----
    const byCampaign: Record<string, { landed: number; converted: number }> = {};
    for (const s of all) {
      const c = s.utm_campaign || '(none)';
      if (!byCampaign[c]) byCampaign[c] = { landed: 0, converted: 0 };
      byCampaign[c].landed++;
      if (s.converted) byCampaign[c].converted++;
    }
    const campaignComparison = Object.entries(byCampaign)
      .map(([c, v]) => ({ campaign: c, landed: v.landed, converted: v.converted, rate: v.landed ? Math.round((v.converted / v.landed) * 1000) / 10 : 0 }))
      .sort((a, b) => b.landed - a.landed);

    // ---- Abandoner drill-down (started form / reached submit, didn't convert) ----
    const abandoners = scoped
      .filter((s) => (s.form_started || s.form_submitted) && !s.converted)
      .sort((a, b) => (b.started_at || '').localeCompare(a.started_at || ''))
      .slice(0, 250)
      .map((s) => ({
        sh_kit: s.sh_kit,
        session_id: s.session_id,
        last_field: s.form_last_field,
        reached_submit: !!s.form_submitted,
        max_scroll_pct: s.max_scroll_pct,
        started_at: s.started_at,
        device: s.device,
        country: s.country,
      }));

    // ---- Campaign dropdown (distinct, broader than the range) ----
    const { data: campRows } = await supabaseAdmin
      .from('analytics_sessions').select('utm_campaign').not('utm_campaign', 'is', null).limit(5000);
    const campaigns = [...new Set((campRows ?? []).map((r) => r.utm_campaign as string))].sort();

    return NextResponse.json({
      ok: true,
      range: { from: fromIso, to: toIso },
      campaign: campaign || null,
      threshold,
      capped: all.length >= MAX_SESSIONS,
      totals: { sessions: scoped.length, withSubscriber: scoped.filter((s) => s.sh_kit).length },
      funnel,
      exit,
      topOutbound,
      scroll: { buckets, medianEngagedMs },
      cta,
      formDropoff,
      avgMsByField,
      campaignComparison,
      abandoners,
      campaigns,
    });
  } catch (e) {
    console.error('[dashboard] failed:', e);
    return NextResponse.json({ error: e instanceof Error ? e.message : 'unknown' }, { status: 500 });
  }
}
