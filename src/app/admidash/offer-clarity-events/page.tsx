'use client';

import React, { useEffect, useMemo, useState } from 'react';

interface SuccessEvent {
  id: number;
  created_at: string;
  lead_id: string | null;
  session_id: string;
  event_type: string;
  event_data: Record<string, unknown> | null;
  user_agent: string | null;
  ip_address: string | null;
  referrer: string | null;
  viewport_w: number | null;
  viewport_h: number | null;
}

interface SessionGroup {
  sessionId: string;
  leadId: string | null;
  events: SuccessEvent[];
}

interface LeadInfo {
  id: string;
  email: string;
  name: string | null;
  has_bump_launch_stack: boolean | null;
  has_bump_hooks: boolean | null;
  has_bump_offer_genius: boolean | null;
  has_bump_bundle: boolean | null;
  has_coaching_upsell: boolean | null;
  is_paid: boolean | null;
  total_paid_cents: number | null;
}

const PASSWORD_KEY = 'admidash_pw';

function eventColor(t: string) {
  if (t.includes('failed') || t.includes('error') || t === 'lead_missing') return 'text-rose-400';
  if (t === 'lead_fetch_success' || t === 'render_snapshot') return 'text-emerald-400';
  if (t === 'password_copied' || t === 'link_clicked') return 'text-amber-300';
  return 'text-sky-300';
}

function dbBumpsFromLead(l: LeadInfo | undefined) {
  if (!l) return null;
  const flags = [
    l.has_bump_launch_stack && 'LS',
    l.has_bump_hooks && 'Hooks',
    l.has_bump_offer_genius && 'Genius',
    l.has_bump_bundle && 'BUNDLE',
    l.has_coaching_upsell && 'Coaching',
  ].filter(Boolean);
  return flags.length ? flags.join(' + ') : 'course only';
}

export default function OfferClarityEventsPage() {
  const [pw, setPw] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [sessions, setSessions] = useState<SessionGroup[]>([]);
  const [leads, setLeads] = useState<Record<string, LeadInfo>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem(PASSWORD_KEY);
    if (stored) {
      setPw(stored);
      setAuthorized(true);
    }
  }, []);

  const fetchEvents = async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/offer-clarity/success-events-list?limit=1000', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        setError('Wrong password');
        setAuthorized(false);
        sessionStorage.removeItem(PASSWORD_KEY);
        return;
      }
      const json = await res.json();
      if (json.success) {
        setSessions(json.sessions || []);
        setLeads(json.leads || {});
        sessionStorage.setItem(PASSWORD_KEY, token);
        setAuthorized(true);
      } else {
        setError(json.error || 'Unknown error');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'fetch failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authorized && pw) fetchEvents(pw);
  }, [authorized, pw]);

  const filtered = useMemo(() => {
    if (!filter.trim()) return sessions;
    const q = filter.toLowerCase();
    return sessions.filter((s) => {
      const lead = s.leadId ? leads[s.leadId] : undefined;
      return (
        s.sessionId.toLowerCase().includes(q) ||
        (s.leadId || '').toLowerCase().includes(q) ||
        (lead?.email?.toLowerCase().includes(q) ?? false) ||
        s.events.some((e) => e.event_type.toLowerCase().includes(q))
      );
    });
  }, [sessions, leads, filter]);

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (!authorized) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
        <form
          className="bg-neutral-900 rounded-lg p-6 max-w-sm w-full border border-neutral-800"
          onSubmit={(e) => {
            e.preventDefault();
            fetchEvents(pw);
          }}
        >
          <h1 className="text-xl font-bold mb-4">Offer Clarity Success Events</h1>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="ADMIDASH_PASSWORD"
            className="w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-700 text-sm mb-3"
            autoFocus
          />
          {error && <p className="text-rose-400 text-sm mb-3">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-sm py-2 rounded font-bold"
          >
            {loading ? 'Checking…' : 'Unlock'}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex items-baseline justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold">🛰️ Offer Clarity — Success Page Events</h1>
            <p className="text-sm text-neutral-400 mt-1">
              Live telemetry from <code>/offer-clarity-success</code>. Use this to
              verify a buyer actually loaded the page, what bumps rendered, and
              whether they revealed/copied passwords or clicked links.
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="filter by email / leadId / event_type"
              className="bg-neutral-900 border border-neutral-700 rounded px-3 py-1.5 text-sm w-72"
            />
            <button
              onClick={() => fetchEvents(pw)}
              disabled={loading}
              className="bg-neutral-800 hover:bg-neutral-700 text-sm px-4 py-1.5 rounded"
            >
              {loading ? '…' : 'Refresh'}
            </button>
          </div>
        </header>

        <p className="text-xs text-neutral-500 mb-4">
          {filtered.length} session{filtered.length === 1 ? '' : 's'} · most recent first
        </p>

        <div className="space-y-3">
          {filtered.map((s) => {
            const lead = s.leadId ? leads[s.leadId] : undefined;
            const last = s.events[0];
            const first = s.events[s.events.length - 1];
            const isOpen = expanded.has(s.sessionId);
            const renderedSnap = s.events.find((e) => e.event_type === 'render_snapshot');
            const bumpsRendered = renderedSnap?.event_data?.bumpsShown as
              | Record<string, boolean>
              | undefined;

            return (
              <div
                key={s.sessionId}
                className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggle(s.sessionId)}
                  className="w-full text-left px-4 py-3 hover:bg-neutral-800/60 transition-colors flex items-baseline justify-between gap-4 flex-wrap"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs text-neutral-500">
                      {new Date(first.created_at).toLocaleString()} →{' '}
                      {new Date(last.created_at).toLocaleString()}
                    </div>
                    <div className="font-bold text-base mt-0.5">
                      {lead ? (
                        <>
                          <span className="text-emerald-400">{lead.email}</span>
                          {lead.name && (
                            <span className="text-neutral-400 text-sm ml-2">({lead.name})</span>
                          )}
                        </>
                      ) : s.leadId ? (
                        <span className="text-amber-400">lead missing in DB · {s.leadId.slice(0, 8)}</span>
                      ) : (
                        <span className="text-rose-400">no leadId</span>
                      )}
                    </div>
                    <div className="text-xs text-neutral-400 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                      <span>
                        <span className="text-neutral-500">DB bumps:</span>{' '}
                        <span className="text-amber-300">{dbBumpsFromLead(lead) || '—'}</span>
                      </span>
                      {bumpsRendered && (
                        <span>
                          <span className="text-neutral-500">Rendered:</span>{' '}
                          <span className="text-sky-300">
                            {Object.entries(bumpsRendered)
                              .filter(([, v]) => v)
                              .map(([k]) => k)
                              .join(', ') || 'none'}
                          </span>
                        </span>
                      )}
                      {lead && lead.total_paid_cents != null && (
                        <span>
                          <span className="text-neutral-500">Paid:</span> $
                          {(lead.total_paid_cents / 100).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs font-mono text-neutral-500">
                    {s.events.length} event{s.events.length === 1 ? '' : 's'}{' '}
                    {isOpen ? '▾' : '▸'}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-neutral-800 px-4 py-3 bg-neutral-950">
                    <div className="text-xs text-neutral-500 mb-2 font-mono break-all">
                      session: {s.sessionId} {s.leadId && <>· lead: {s.leadId}</>}
                    </div>
                    <ul className="space-y-2">
                      {[...s.events].reverse().map((e) => (
                        <li
                          key={e.id}
                          className="font-mono text-xs flex flex-col gap-1 border-l-2 border-neutral-800 pl-3 py-1"
                        >
                          <div className="flex items-baseline gap-3">
                            <span className="text-neutral-500">
                              {new Date(e.created_at).toLocaleTimeString()}
                            </span>
                            <span className={`font-bold ${eventColor(e.event_type)}`}>
                              {e.event_type}
                            </span>
                          </div>
                          {e.event_data && (
                            <pre className="text-neutral-400 text-[11px] whitespace-pre-wrap break-all bg-black/40 rounded px-2 py-1">
                              {JSON.stringify(e.event_data, null, 2)}
                            </pre>
                          )}
                          {(e.viewport_w || e.user_agent) && (
                            <div className="text-neutral-600 text-[10px]">
                              {e.viewport_w && (
                                <>
                                  {e.viewport_w}×{e.viewport_h} ·{' '}
                                </>
                              )}
                              {e.user_agent}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!loading && filtered.length === 0 && (
          <p className="text-neutral-500 text-center py-12">
            No events yet. Trigger one by visiting{' '}
            <code className="text-amber-300">/offer-clarity-success?leadId=&lt;real-id&gt;</code>.
          </p>
        )}
      </div>
    </main>
  );
}
