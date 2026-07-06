// Sessions rollup: derive the wide analytics_sessions row from the raw
// analytics_events stream. Events stay the source of truth; sessions are fully
// rebuildable from them at any time.
//
// buildSessionRow() is pure (events in -> row out) so it can be unit-tested
// without a database. rollupSessions() is the orchestrator that picks which
// sessions to (re)compute and upserts them.

import type { SupabaseClient } from '@supabase/supabase-js';

// Which marked sections count as "reached the offer" for the funnel.
const REACHED_OFFER_SECTIONS = new Set(['offer', 'price']);

// Minimal shape of an analytics_events row as we read it back.
export interface EventRow {
  id: number;
  visitor_id: string;
  session_id: string;
  event_type: string;
  path: string | null;
  occurred_at: string;
  received_at: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  referrer: string | null;
  ck_subscriber_id: string | null;
  sh_kit: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
  country: string | null;
  scroll_pct: number | null;
  engaged_ms: number | null;
  cta_id: string | null;
  section_id: string | null;
  outbound_domain: string | null;
  form_id: string | null;
  field_name: string | null;
  meta: Record<string, unknown> | null;
}

export interface SessionRow {
  session_id: string;
  visitor_id: string;
  ck_subscriber_id: string | null;
  sh_kit: string | null;
  started_at: string | null;
  ended_at: string | null;
  entry_page: string | null;
  entry_source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  exit_type: 'internal' | 'outbound' | 'ended';
  exit_detail: string | null;
  engaged_ms: number;
  max_scroll_pct: number;
  cta_clicks: Record<string, number> | null;
  reached_offer: boolean;
  device: string | null;
  browser: string | null;
  os: string | null;
  country: string | null;
  form_started: boolean;
  form_submitted: boolean;
  form_succeeded: boolean;
  form_last_field: string | null;
  converted: boolean;
  event_count: number;
}

// referrer + utm -> a human-readable entry source for the dashboard.
function deriveEntrySource(first: EventRow): string | null {
  if (first.utm_source) return first.utm_source; // e.g. "kit"
  const ref = first.referrer;
  if (!ref) return 'direct';
  try {
    const host = new URL(ref).host;
    // A referrer from our own site shouldn't happen on the entry event, but guard.
    if (host && /monetisesubstack/i.test(host)) return 'direct';
    return `referral:${host}`;
  } catch {
    return 'referral';
  }
}

function firstNonNull<K extends keyof EventRow>(events: EventRow[], key: K): EventRow[K] | null {
  for (const e of events) if (e[key] != null) return e[key];
  return null;
}

/**
 * Pure: build the wide session row from one session's events.
 * Exit-type precedence (documented): outbound (clicked off-site) > internal
 * (navigated to another page on the site, i.e. >=2 page_views) > ended (the
 * residual — left with no exit signal we could capture; NOT necessarily a tab
 * close, see the brief's honest-limitation note).
 */
export function buildSessionRow(eventsIn: EventRow[]): SessionRow | null {
  if (!eventsIn.length) return null;

  // Stable chronological order.
  const events = [...eventsIn].sort((a, b) => {
    const t = a.occurred_at.localeCompare(b.occurred_at);
    return t !== 0 ? t : a.id - b.id;
  });

  const first = events[0];
  const last = events[events.length - 1];
  const pageViews = events.filter((e) => e.event_type === 'page_view');
  const firstPageView = pageViews[0] ?? first;

  // Engagement: sum of heartbeat deltas (the per-page page_exit total overlaps
  // with the heartbeats for that page, so we deliberately do NOT add it here).
  let engaged_ms = 0;
  let max_scroll_pct = 0;
  const cta_clicks: Record<string, number> = {};
  const seenSections = new Set<string>();
  let outboundDomain: string | null = null;

  let form_started = false;
  let form_submitted = false;
  let form_succeeded = false;
  let form_last_field: string | null = null;

  for (const e of events) {
    switch (e.event_type) {
      case 'engagement_heartbeat':
        if (e.engaged_ms) engaged_ms += e.engaged_ms;
        break;
      case 'scroll_milestone':
      case 'page_exit':
        if (e.scroll_pct != null && e.scroll_pct > max_scroll_pct) max_scroll_pct = e.scroll_pct;
        break;
      case 'section_view':
        if (e.section_id) seenSections.add(e.section_id);
        break;
      case 'cta_click':
        if (e.cta_id) cta_clicks[e.cta_id] = (cta_clicks[e.cta_id] || 0) + 1;
        break;
      case 'outbound_click':
        if (e.outbound_domain) outboundDomain = e.outbound_domain;
        break;
      case 'form_start':
        form_started = true;
        if (e.field_name) form_last_field = e.field_name;
        break;
      case 'form_field_focus':
      case 'form_field_blur':
      case 'form_field_error':
        if (e.field_name) form_last_field = e.field_name;
        break;
      case 'form_submit_attempt':
        form_submitted = true;
        break;
      case 'form_submit_success':
        form_succeeded = true;
        break;
      case 'form_abandon':
        // last_field arrives in meta for abandon; fall back to field_name.
        if (e.meta && typeof e.meta.last_field === 'string') form_last_field = e.meta.last_field as string;
        else if (e.field_name) form_last_field = e.field_name;
        break;
    }
  }

  const reached_offer = [...seenSections].some((s) => REACHED_OFFER_SECTIONS.has(s));

  let exit_type: SessionRow['exit_type'];
  let exit_detail: string | null = null;
  if (outboundDomain) {
    exit_type = 'outbound';
    exit_detail = outboundDomain;
  } else if (pageViews.length >= 2) {
    exit_type = 'internal';
    exit_detail = last.path; // the page they were last on
  } else {
    exit_type = 'ended';
  }

  return {
    session_id: first.session_id,
    visitor_id: first.visitor_id,
    ck_subscriber_id: firstNonNull(events, 'ck_subscriber_id'),
    sh_kit: firstNonNull(events, 'sh_kit'),
    started_at: first.occurred_at,
    ended_at: last.occurred_at,
    entry_page: firstPageView.path,
    entry_source: deriveEntrySource(firstPageView),
    utm_source: firstPageView.utm_source,
    utm_medium: firstPageView.utm_medium,
    utm_campaign: firstPageView.utm_campaign,
    utm_content: firstPageView.utm_content,
    utm_term: firstPageView.utm_term,
    exit_type,
    exit_detail,
    engaged_ms,
    max_scroll_pct,
    cta_clicks: Object.keys(cta_clicks).length ? cta_clicks : null,
    reached_offer,
    device: firstNonNull(events, 'device'),
    browser: firstNonNull(events, 'browser'),
    os: firstNonNull(events, 'os'),
    country: firstNonNull(events, 'country'),
    form_started,
    form_submitted,
    form_succeeded,
    form_last_field,
    converted: form_succeeded, // server-side purchase signals can override later
    event_count: events.length,
  };
}

export interface RollupOptions {
  /** Recompute every session (full rebuild). */
  all?: boolean;
  /** Only sessions with events at/after this time. Ignored when `all`. */
  since?: Date;
  /** Explicit session ids to recompute. */
  sessionIds?: string[];
  /** Safety overlap when deriving the incremental watermark (default 2 min). */
  overlapMinutes?: number;
}

/**
 * Recompute and upsert session rows. Default (no options) is incremental:
 * it processes sessions that have events newer than the latest rollup watermark
 * (max updated_at in analytics_sessions), minus a small overlap.
 */
export async function rollupSessions(
  db: SupabaseClient,
  opts: RollupOptions = {},
): Promise<{ sessionsProcessed: number; watermark: string | null }> {
  // 1. Decide which session ids to (re)compute.
  let sessionIds: string[];
  if (opts.sessionIds?.length) {
    sessionIds = [...new Set(opts.sessionIds)];
  } else {
    let since: Date | null = null;
    if (!opts.all) {
      if (opts.since) {
        since = opts.since;
      } else {
        const { data: wm } = await db
          .from('analytics_sessions')
          .select('updated_at')
          .order('updated_at', { ascending: false })
          .limit(1);
        if (wm?.[0]?.updated_at) {
          const overlap = (opts.overlapMinutes ?? 2) * 60 * 1000;
          since = new Date(new Date(wm[0].updated_at).getTime() - overlap);
        }
      }
    }
    let q = db.from('analytics_events').select('session_id');
    if (since) q = q.gte('received_at', since.toISOString());
    const { data, error } = await q;
    if (error) throw error;
    sessionIds = [...new Set((data ?? []).map((r) => r.session_id as string))];
  }

  if (!sessionIds.length) return { sessionsProcessed: 0, watermark: null };

  // 2. Build rows. Process in chunks to keep each IN() query sane.
  const rows: SessionRow[] = [];
  const CHUNK = 200;
  for (let i = 0; i < sessionIds.length; i += CHUNK) {
    const ids = sessionIds.slice(i, i + CHUNK);
    const { data: evs, error } = await db
      .from('analytics_events')
      .select('*')
      .in('session_id', ids)
      .order('occurred_at', { ascending: true });
    if (error) throw error;

    const bySession = new Map<string, EventRow[]>();
    for (const e of (evs ?? []) as EventRow[]) {
      const arr = bySession.get(e.session_id) ?? [];
      arr.push(e);
      bySession.set(e.session_id, arr);
    }
    for (const arr of bySession.values()) {
      const row = buildSessionRow(arr);
      if (row) rows.push(row);
    }
  }

  // 3. Upsert (updated_at set server-side via the column default on conflict?).
  // Supabase upsert replaces the row, so set updated_at explicitly here.
  let watermark: string | null = null;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const batch = rows.slice(i, i + CHUNK).map((r) => ({ ...r, updated_at: nowIso() }));
    const { error } = await db.from('analytics_sessions').upsert(batch, { onConflict: 'session_id' });
    if (error) throw error;
    watermark = batch[batch.length - 1]?.updated_at ?? watermark;
  }

  return { sessionsProcessed: rows.length, watermark };
}

function nowIso(): string {
  return new Date().toISOString();
}
