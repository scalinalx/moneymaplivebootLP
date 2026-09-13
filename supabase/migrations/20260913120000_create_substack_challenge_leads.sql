-- Leads for the 30-Day Substack Challenge (/30-day-substack-challenge).
-- Differs from the other *_leads tables: payment happens on Circle, not Stripe,
-- so there is no PaymentIntent and no is_paid flip. A row is written when the
-- visitor submits name + email on the page, right before we redirect them to the
-- Circle checkout. `tier` records which pricing card they clicked.
-- RLS service-role-only; the app only ever touches it via supabaseAdmin.

CREATE TABLE IF NOT EXISTS public.substack_challenge_leads (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT,
    email       TEXT NOT NULL,
    tier        TEXT,           -- 'challenge' | 'challenge_1on1'
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_substack_challenge_leads_email ON public.substack_challenge_leads (email);

ALTER TABLE public.substack_challenge_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "substack_challenge_leads_service_role_all" ON public.substack_challenge_leads;
CREATE POLICY "substack_challenge_leads_service_role_all" ON public.substack_challenge_leads
    FOR ALL TO service_role USING (true) WITH CHECK (true);

NOTIFY pgrst, 'reload schema';
