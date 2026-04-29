-- Lead + payment tracking for the Offer Clarity Sprint sales funnel.
-- Captures: lead capture → primary payment → order bumps → post-purchase upsells.
CREATE TABLE IF NOT EXISTS public.offer_clarity_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Lead identity
    name                          TEXT,
    email                         TEXT NOT NULL,

    -- Stripe customer linkage
    stripe_customer_id            TEXT,
    stripe_payment_intent_id      TEXT,

    -- Order bump selections (set at checkout time)
    has_bump_launch_stack         BOOLEAN DEFAULT FALSE,
    has_bump_hooks                BOOLEAN DEFAULT FALSE,
    has_bump_offer_genius         BOOLEAN DEFAULT FALSE,
    has_bump_bundle               BOOLEAN DEFAULT FALSE,  -- "All 3 — save $24"

    -- Post-purchase upsell: 1:1 coaching with Ana
    has_coaching_upsell           BOOLEAN DEFAULT FALSE,
    coaching_payment_intent_id    TEXT,
    coaching_paid_at              TIMESTAMPTZ,

    -- Pricing snapshot (cents) — preserves the price the user paid
    -- even if env-driven prices change later.
    base_price_cents              INTEGER NOT NULL,
    bumps_price_cents             INTEGER NOT NULL DEFAULT 0,
    coaching_price_cents          INTEGER DEFAULT 0,
    total_paid_cents              INTEGER NOT NULL,

    -- Payment lifecycle
    is_paid                       BOOLEAN DEFAULT FALSE,
    payment_completed_at          TIMESTAMPTZ,
    refunded                      BOOLEAN DEFAULT FALSE,
    refunded_at                   TIMESTAMPTZ,

    -- Marketing attribution / debugging
    utm_source                    TEXT,
    utm_medium                    TEXT,
    utm_campaign                  TEXT,
    referrer_url                  TEXT,
    user_agent                    TEXT,
    ip_address                    TEXT,

    -- Timestamps
    created_at                    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at                    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common lookups
CREATE INDEX IF NOT EXISTS idx_offer_clarity_leads_email ON public.offer_clarity_leads(email);
CREATE INDEX IF NOT EXISTS idx_offer_clarity_leads_payment_intent ON public.offer_clarity_leads(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_offer_clarity_leads_created_at ON public.offer_clarity_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_offer_clarity_leads_is_paid ON public.offer_clarity_leads(is_paid) WHERE is_paid = TRUE;

-- updated_at auto-touch trigger
CREATE OR REPLACE FUNCTION public.touch_offer_clarity_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_offer_clarity_leads_touch ON public.offer_clarity_leads;
CREATE TRIGGER trg_offer_clarity_leads_touch
    BEFORE UPDATE ON public.offer_clarity_leads
    FOR EACH ROW EXECUTE FUNCTION public.touch_offer_clarity_leads_updated_at();

-- Row Level Security: writes via service role only.
ALTER TABLE public.offer_clarity_leads ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'offer_clarity_leads'
          AND policyname = 'offer_clarity_leads_service_role_all'
    ) THEN
        CREATE POLICY "offer_clarity_leads_service_role_all"
            ON public.offer_clarity_leads
            FOR ALL
            TO service_role
            USING (true)
            WITH CHECK (true);
    END IF;
END
$$;
