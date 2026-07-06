-- First-party behavioral analytics for monetisesubstack.com.
--
-- Purpose: diagnose exactly where Kit-email traffic falls off between landing
-- and purchase (offer / price / copy / form-UX), per campaign and (when the Kit
-- hashed-link toggle is on) per subscriber.
--
-- Two tables:
--   1. analytics_events   — raw, append-only event stream (source of truth)
--   2. analytics_sessions — wide per-session rollup, rebuildable from events
--
-- Privacy posture (deliberately stricter than the older *_leads / *_success_events
-- tables in this project): NO raw IP and NO raw user-agent are ever stored here.
-- The ingestion endpoint derives country + device/browser/os server-side and
-- discards the raw IP/UA. Field VALUES from forms are never captured anywhere —
-- only field identity (name/id/label).

-- =====================================================================
-- Table 1: analytics_events (raw, append-only)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id                BIGSERIAL PRIMARY KEY,

    -- Identity / correlation (all anonymous first-party, or hashed subscriber)
    visitor_id        TEXT NOT NULL,           -- persisted in localStorage, anonymous
    session_id        TEXT NOT NULL,           -- per-visit id

    -- What happened
    event_type        TEXT NOT NULL,           -- page_view | scroll_milestone | cta_click | ...
    event_name        TEXT,                    -- optional sub-label
    path              TEXT,                    -- pathname at time of event

    -- Timing: occurred_at = client event time; received_at = server arrival time.
    occurred_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    received_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Attribution (captured on landing, attached to every event in the session)
    utm_source        TEXT,
    utm_medium        TEXT,
    utm_campaign      TEXT,
    utm_content       TEXT,
    utm_term          TEXT,
    referrer          TEXT,

    -- Kit subscriber stitching. This project uses sh_kit (SHA-256 of the
    -- subscriber's email, computed by Kit) only; ck_subscriber_id is kept as a
    -- nullable column for forward-compatibility if the plain-id toggle is ever used.
    ck_subscriber_id  TEXT,
    sh_kit            TEXT,

    -- Server-derived environment (raw IP + raw UA are discarded after this)
    device            TEXT,                    -- mobile | tablet | desktop | bot
    browser           TEXT,
    os                TEXT,
    country           TEXT,                    -- 2-letter ISO, derived from IP then IP discarded

    -- Event-specific payload columns (kept as first-class columns for fast funnels)
    scroll_pct        INTEGER,                 -- 0..100
    engaged_ms        INTEGER,                 -- active (not wall-clock) time
    cta_id            TEXT,                    -- data-track-id of the clicked CTA
    section_id        TEXT,                    -- data-track-section that entered viewport
    outbound_domain   TEXT,                    -- destination host for outbound_click
    form_id           TEXT,                    -- data-track-form name
    field_name        TEXT,                    -- field identity ONLY — never the value

    -- Anything else, structured
    meta              JSONB
);

-- Indexes for the funnel queries + retention purge.
CREATE INDEX IF NOT EXISTS idx_analytics_events_campaign_time ON public.analytics_events (utm_campaign, occurred_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session      ON public.analytics_events (session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type         ON public.analytics_events (event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_sh_kit       ON public.analytics_events (sh_kit) WHERE sh_kit IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_analytics_events_visitor      ON public.analytics_events (visitor_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_received     ON public.analytics_events (received_at);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Only the service role (the /api/collect endpoint + rollup/admin jobs) may touch it.
DROP POLICY IF EXISTS "analytics_events_service_role_all" ON public.analytics_events;
CREATE POLICY "analytics_events_service_role_all" ON public.analytics_events
    FOR ALL TO service_role USING (true) WITH CHECK (true);

COMMENT ON TABLE public.analytics_events IS
    'Raw append-only first-party behavioral events. Source of truth; analytics_sessions is rebuilt from this. No raw IP/UA, no form field values — ever.';

-- =====================================================================
-- Table 2: analytics_sessions (derived wide rollup, one row per session)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.analytics_sessions (
    session_id        TEXT PRIMARY KEY,
    visitor_id        TEXT NOT NULL,

    -- Subscriber stitching
    ck_subscriber_id  TEXT,
    sh_kit            TEXT,

    -- Lifecycle
    started_at        TIMESTAMPTZ,
    ended_at          TIMESTAMPTZ,

    -- Entry / attribution
    entry_page        TEXT,
    entry_source      TEXT,                    -- derived: kit campaign | direct | referral | other
    utm_source        TEXT,
    utm_medium        TEXT,
    utm_campaign      TEXT,
    utm_content       TEXT,
    utm_term          TEXT,

    -- Exit classification (exactly one of internal | outbound | ended)
    exit_type         TEXT CHECK (exit_type IN ('internal', 'outbound', 'ended')),
    exit_detail       TEXT,                    -- next internal page, or outbound domain

    -- Engagement
    engaged_ms        INTEGER DEFAULT 0,       -- total active time across the session
    max_scroll_pct    INTEGER DEFAULT 0,
    cta_clicks        JSONB,                   -- { "<cta_id>": <count>, ... }
    reached_offer     BOOLEAN DEFAULT FALSE,   -- did the offer/price section enter the viewport

    -- Environment
    device            TEXT,
    browser           TEXT,
    os                TEXT,
    country           TEXT,

    -- Form / checkout funnel
    form_started      BOOLEAN DEFAULT FALSE,
    form_submitted    BOOLEAN DEFAULT FALSE,   -- submit attempt fired
    form_succeeded    BOOLEAN DEFAULT FALSE,   -- success fired
    form_last_field   TEXT,                    -- last field touched if abandoned

    converted         BOOLEAN DEFAULT FALSE,

    -- Rollup bookkeeping
    event_count       INTEGER DEFAULT 0,
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_sessions_campaign ON public.analytics_sessions (utm_campaign);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_sh_kit   ON public.analytics_sessions (sh_kit) WHERE sh_kit IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_started  ON public.analytics_sessions (started_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_visitor  ON public.analytics_sessions (visitor_id);

ALTER TABLE public.analytics_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "analytics_sessions_service_role_all" ON public.analytics_sessions;
CREATE POLICY "analytics_sessions_service_role_all" ON public.analytics_sessions
    FOR ALL TO service_role USING (true) WITH CHECK (true);

COMMENT ON TABLE public.analytics_sessions IS
    'Wide per-session rollup derived from analytics_events. Rebuildable at any time. Drives the per-campaign funnel + supporting dashboard views.';
