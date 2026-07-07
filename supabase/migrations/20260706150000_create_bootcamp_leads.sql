-- Leads for the 6-Figures Newsletter Bootcamp (/bootcamp). Follows the existing
-- *_leads pattern: a row is created (is_paid=false) when a PaymentIntent is
-- opened, then flipped to paid by the client confirm-payment call and/or the
-- Stripe webhook (product = 'bootcamp'). RLS service-role-only; the app only
-- ever touches it via supabaseAdmin.

CREATE TABLE IF NOT EXISTS public.bootcamp_leads (
    id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name                     TEXT,
    email                    TEXT NOT NULL,
    tier                     TEXT,           -- 'founding' | 'standard'
    total_paid               INTEGER,        -- cents
    is_paid                  BOOLEAN NOT NULL DEFAULT FALSE,
    stripe_customer_id       TEXT,
    stripe_payment_intent_id TEXT,
    payment_completed_at     TIMESTAMPTZ,
    created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bootcamp_leads_email ON public.bootcamp_leads (email);
CREATE INDEX IF NOT EXISTS idx_bootcamp_leads_pi   ON public.bootcamp_leads (stripe_payment_intent_id);

ALTER TABLE public.bootcamp_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "bootcamp_leads_service_role_all" ON public.bootcamp_leads;
CREATE POLICY "bootcamp_leads_service_role_all" ON public.bootcamp_leads
    FOR ALL TO service_role USING (true) WITH CHECK (true);

NOTIFY pgrst, 'reload schema';
