'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const PASSWORD_KEY = 'admidash_pw';

interface FunnelStep { key: string; label: string; count: number; pctOfLanded: number; dropFromPrev: number; }
interface DashData {
  range: { from: string; to: string };
  campaign: string | null;
  threshold: number;
  capped: boolean;
  totals: { sessions: number; withSubscriber: number };
  funnel: FunnelStep[];
  exit: Record<string, number>;
  topOutbound: { domain: string; count: number }[];
  scroll: { buckets: { label: string; count: number }[]; medianEngagedMs: number };
  cta: { cta_id: string; clicks: number; sessions: number }[];
  formDropoff: { field: string; count: number }[];
  avgMsByField: { field: string; avgMs: number; n: number }[];
  campaignComparison: { campaign: string; landed: number; converted: number; rate: number }[];
  abandoners: { sh_kit: string | null; session_id: string; last_field: string | null; reached_submit: boolean; max_scroll_pct: number | null; started_at: string | null; device: string | null; country: string | null }[];
  campaigns: string[];
}

const fmtDate = (d: Date) => d.toISOString().slice(0, 10);
const card = 'bg-neutral-900 border border-neutral-800 rounded-lg p-4';
const h2 = 'text-sm font-bold text-neutral-300 mb-3 uppercase tracking-wide';

export default function AnalyticsDashboard() {
  const [pw, setPw] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [data, setData] = useState<DashData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [campaign, setCampaign] = useState('');
  const [from, setFrom] = useState(fmtDate(new Date(Date.now() - 30 * 86_400_000)));
  const [to, setTo] = useState(fmtDate(new Date()));

  useEffect(() => {
    const stored = sessionStorage.getItem(PASSWORD_KEY);
    if (stored) { setPw(stored); setAuthorized(true); }
  }, []);

  const fetchData = useCallback(async (token: string) => {
    setLoading(true); setError(null);
    try {
      const q = new URLSearchParams();
      if (campaign) q.set('campaign', campaign);
      if (from) q.set('from', `${from}T00:00:00Z`);
      if (to) q.set('to', `${to}T23:59:59Z`);
      const res = await fetch(`/api/admidash/analytics/dashboard?${q}`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 401) { setError('Wrong password'); setAuthorized(false); sessionStorage.removeItem(PASSWORD_KEY); return; }
      const json = await res.json();
      if (json.ok) { setData(json); sessionStorage.setItem(PASSWORD_KEY, token); setAuthorized(true); }
      else setError(json.error || 'Unknown error');
    } catch (e) { setError(e instanceof Error ? e.message : 'fetch failed'); }
    finally { setLoading(false); }
  }, [campaign, from, to]);

  useEffect(() => { if (authorized && pw) fetchData(pw); }, [authorized, pw, fetchData]);

  if (!authorized) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
        <form className="bg-neutral-900 rounded-lg p-6 max-w-sm w-full border border-neutral-800"
          onSubmit={(e) => { e.preventDefault(); fetchData(pw); }}>
          <h1 className="text-xl font-bold mb-4">📊 Conversion Analytics</h1>
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="ADMIDASH_PASSWORD"
            className="w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-700 text-sm mb-3" autoFocus />
          {error && <p className="text-rose-400 text-sm mb-3">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 text-sm py-2 rounded font-bold">
            {loading ? 'Checking…' : 'Unlock'}
          </button>
        </form>
      </main>
    );
  }

  const landed = data?.funnel?.[0]?.count ?? 0;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">📊 Conversion Analytics</h1>
          <p className="text-sm text-neutral-400 mt-1">Where Kit-email traffic falls off between landing and purchase.</p>
          <div className="flex flex-wrap gap-2 mt-4 items-end">
            <label className="text-xs text-neutral-400">Campaign
              <select value={campaign} onChange={(e) => setCampaign(e.target.value)}
                className="block bg-neutral-900 border border-neutral-700 rounded px-3 py-1.5 text-sm mt-1 min-w-56">
                <option value="">All campaigns</option>
                {data?.campaigns?.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label className="text-xs text-neutral-400">From
              <input type="date" value={from} onChange={(e) => setFrom(e.target.value)}
                className="block bg-neutral-900 border border-neutral-700 rounded px-3 py-1.5 text-sm mt-1" />
            </label>
            <label className="text-xs text-neutral-400">To
              <input type="date" value={to} onChange={(e) => setTo(e.target.value)}
                className="block bg-neutral-900 border border-neutral-700 rounded px-3 py-1.5 text-sm mt-1" />
            </label>
            <button onClick={() => fetchData(pw)} disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-500 text-sm px-4 py-1.5 rounded font-bold">
              {loading ? '…' : 'Apply'}
            </button>
          </div>
          {data && (
            <p className="text-xs text-neutral-500 mt-2">
              {data.totals.sessions} sessions · {data.totals.withSubscriber} stitched to a subscriber
              {data.capped && <span className="text-amber-400"> · capped at 5000, narrow the range</span>}
            </p>
          )}
        </header>

        {error && <p className="text-rose-400 text-sm mb-4">{error}</p>}
        {!data && loading && <p className="text-neutral-500">Loading…</p>}

        {data && (
          <div className="space-y-5">
            {/* PRIMARY FUNNEL */}
            <section className={card}>
              <h2 className={h2}>Per-campaign funnel {data.campaign ? `· ${data.campaign}` : '· all campaigns'}</h2>
              {landed === 0 ? (
                <p className="text-neutral-500 text-sm">No sessions in this range.</p>
              ) : (
                <div className="space-y-2">
                  {data.funnel.map((s) => (
                    <div key={s.key} className="flex items-center gap-3">
                      <div className="w-40 text-sm text-neutral-300 shrink-0">{s.label}</div>
                      <div className="flex-1 bg-neutral-800 rounded h-7 relative overflow-hidden">
                        <div className="bg-emerald-600/80 h-full rounded flex items-center px-2"
                          style={{ width: `${landed ? Math.max((s.count / landed) * 100, 2) : 0}%` }}>
                          <span className="text-xs font-bold text-white whitespace-nowrap">{s.count}</span>
                        </div>
                      </div>
                      <div className="w-16 text-right text-xs text-neutral-400">{s.pctOfLanded}%</div>
                      <div className="w-20 text-right text-xs">
                        {s.dropFromPrev > 0 ? <span className="text-rose-400">▼ {s.dropFromPrev}%</span> : <span className="text-neutral-600">—</span>}
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-neutral-500 mt-2">The biggest single ▼ drop is the leak.</p>
                </div>
              )}
            </section>

            <div className="grid md:grid-cols-2 gap-5">
              {/* SCROLL / ENGAGEMENT */}
              <section className={card}>
                <h2 className={h2}>Scroll depth · median active {Math.round(data.scroll.medianEngagedMs / 1000)}s</h2>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={data.scroll.buckets}>
                    <XAxis dataKey="label" tick={{ fill: '#a3a3a3', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#a3a3a3', fontSize: 11 }} allowDecimals={false} />
                    <Tooltip contentStyle={{ background: '#171717', border: '1px solid #404040', fontSize: 12 }} />
                    <Bar dataKey="count" fill="#0ea5e9" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </section>

              {/* EXIT BREAKDOWN */}
              <section className={card}>
                <h2 className={h2}>Exit type</h2>
                <div className="space-y-1.5 text-sm">
                  {(['internal', 'outbound', 'ended'] as const).map((k) => (
                    <div key={k} className="flex justify-between"><span className="capitalize text-neutral-400">{k}</span><span className="font-mono">{data.exit[k] ?? 0}</span></div>
                  ))}
                </div>
                {data.topOutbound.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-neutral-800">
                    <div className="text-xs text-neutral-500 mb-1">Top outbound destinations</div>
                    {data.topOutbound.map((o) => (
                      <div key={o.domain} className="flex justify-between text-xs"><span className="text-amber-300">{o.domain}</span><span className="font-mono text-neutral-400">{o.count}</span></div>
                    ))}
                  </div>
                )}
                <p className="text-[11px] text-neutral-600 mt-3">“ended” = left with no signal we could capture (not necessarily a tab close).</p>
              </section>

              {/* CTA PERFORMANCE */}
              <section className={card}>
                <h2 className={h2}>CTA performance</h2>
                {data.cta.length === 0 ? <p className="text-neutral-500 text-sm">No CTA clicks (annotate pages with data-track).</p> : (
                  <table className="w-full text-sm">
                    <thead><tr className="text-neutral-500 text-xs text-left"><th>CTA</th><th className="text-right">Clicks</th><th className="text-right">Sessions</th></tr></thead>
                    <tbody>
                      {data.cta.map((c) => (
                        <tr key={c.cta_id} className="border-t border-neutral-800"><td className="py-1 text-sky-300">{c.cta_id}</td><td className="text-right font-mono">{c.clicks}</td><td className="text-right font-mono text-neutral-400">{c.sessions}</td></tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </section>

              {/* FORM DROP-OFF */}
              <section className={card}>
                <h2 className={h2}>Form drop-off — which field kills it</h2>
                {data.formDropoff.length === 0 ? <p className="text-neutral-500 text-sm">No form abandons in range.</p> : (
                  <table className="w-full text-sm">
                    <thead><tr className="text-neutral-500 text-xs text-left"><th>Last field touched</th><th className="text-right">Abandons</th><th className="text-right">Avg time</th></tr></thead>
                    <tbody>
                      {data.formDropoff.map((f) => {
                        const avg = data.avgMsByField.find((a) => a.field === f.field);
                        return <tr key={f.field} className="border-t border-neutral-800"><td className="py-1 text-rose-300">{f.field}</td><td className="text-right font-mono">{f.count}</td><td className="text-right font-mono text-neutral-400">{avg ? `${(avg.avgMs / 1000).toFixed(1)}s` : '—'}</td></tr>;
                      })}
                    </tbody>
                  </table>
                )}
              </section>
            </div>

            {/* CAMPAIGN COMPARISON */}
            <section className={card}>
              <h2 className={h2}>Campaign comparison · conversion rate</h2>
              <ResponsiveContainer width="100%" height={Math.max(120, data.campaignComparison.length * 34)}>
                <BarChart data={data.campaignComparison.slice(0, 12)} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" tick={{ fill: '#a3a3a3', fontSize: 11 }} unit="%" />
                  <YAxis type="category" dataKey="campaign" width={160} tick={{ fill: '#a3a3a3', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: '#171717', border: '1px solid #404040', fontSize: 12 }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any, _name: any, item: any) => `${value}%  (${item?.payload?.converted}/${item?.payload?.landed} converted)`} />
                  <Bar dataKey="rate" radius={[0, 3, 3, 0]}>
                    {data.campaignComparison.slice(0, 12).map((c, i) => <Cell key={i} fill={c.campaign === data.campaign ? '#10b981' : '#6366f1'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </section>

            {/* ABANDONER DRILL-DOWN */}
            <section className={card}>
              <h2 className={h2}>Abandoner list — started/reached submit, didn’t convert ({data.abandoners.length})</h2>
              <p className="text-xs text-neutral-500 mb-2">A retargeting list. Subscriber column is the Kit hashed id (sh_kit) when stitched.</p>
              {data.abandoners.length === 0 ? <p className="text-neutral-500 text-sm">None — nobody started the form without converting.</p> : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead><tr className="text-neutral-500 text-left"><th className="pr-3">Subscriber (sh_kit)</th><th className="pr-3">Last field</th><th className="pr-3">Reached submit</th><th className="pr-3">Scroll</th><th className="pr-3">Device/Country</th><th>When</th></tr></thead>
                    <tbody>
                      {data.abandoners.map((a) => (
                        <tr key={a.session_id} className="border-t border-neutral-800">
                          <td className="pr-3 py-1 font-mono text-emerald-300">{a.sh_kit ? a.sh_kit.slice(0, 16) + '…' : <span className="text-neutral-600">anonymous</span>}</td>
                          <td className="pr-3 text-rose-300">{a.last_field || '—'}</td>
                          <td className="pr-3">{a.reached_submit ? <span className="text-amber-300">yes</span> : 'no'}</td>
                          <td className="pr-3 font-mono text-neutral-400">{a.max_scroll_pct ?? 0}%</td>
                          <td className="pr-3 text-neutral-400">{[a.device, a.country].filter(Boolean).join(' / ') || '—'}</td>
                          <td className="text-neutral-500">{a.started_at ? new Date(a.started_at).toLocaleString() : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
