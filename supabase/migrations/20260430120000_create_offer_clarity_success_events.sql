-- Telemetry table for the Offer Clarity Sprint success page.
-- Tracks: did the buyer load the page? Did the lead resolve? Which delivery
-- cards rendered? Did they reveal/copy the master password? Click any links?
-- Used to debug "I paid but couldn't see the bumps" complaints.
CREATE TABLE IF NOT EXISTS public.offer_clarity_success_events (
    id            BIGSERIAL PRIMARY KEY,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Optional FK to offer_clarity_leads.id. Nullable because some events
    -- (like "page_loaded with missing leadId") don't have a lead yet.
    lead_id       UUID REFERENCES public.offer_clarity_leads(id) ON DELETE SET NULL,

    -- Per-tab session id (UUID generated client-side on first render) so we
    -- can stitch the journey of one buyer's visit even if they refresh.
    session_id    TEXT NOT NULL,

    -- e.g. page_loaded | lead_fetch_success | lead_fetch_failed |
    -- lead_missing | render_snapshot | password_revealed | password_copied |
    -- link_clicked | coaching_card_shown | error_caught | time_on_page
    event_type    TEXT NOT NULL,

    -- Free-form structured payload (which bumps rendered, which link, error msg, etc.)
    event_data    JSONB,

    -- Diagnostics
    user_agent    TEXT,
    ip_address    TEXT,
    referrer      TEXT,
    viewport_w    INTEGER,
    viewport_h    INTEGER
);

CREATE INDEX IF NOT EXISTS idx_oc_success_events_lead_id    ON public.offer_clarity_success_events (lead_id);
CREATE INDEX IF NOT EXISTS idx_oc_success_events_session_id ON public.offer_clarity_success_events (session_id);
CREATE INDEX IF NOT EXISTS idx_oc_success_events_created_at ON public.offer_clarity_success_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_oc_success_events_event_type ON public.offer_clarity_success_events (event_type);

ALTER TABLE public.offer_clarity_success_events ENABLE ROW LEVEL SECURITY;

-- Only the service role (used by webhooks + our API endpoints) can read/write.
DROP POLICY IF EXISTS "service role full access" ON public.offer_clarity_success_events;
CREATE POLICY "service role full access" ON public.offer_clarity_success_events
    FOR ALL TO service_role USING (true) WITH CHECK (true);

COMMENT ON TABLE public.offer_clarity_success_events IS
    'Per-event telemetry for the /offer-clarity-success page. Used to debug bump-delivery complaints.';
