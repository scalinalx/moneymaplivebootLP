-- Waitlist leads for the Get Featured course (/get-featured). Lead-collection
-- only: no payment, no Stripe. A row per form submission (the page has two
-- forms; `placement` records which one). RLS service-role-only; the app only
-- ever touches it via supabaseAdmin.

CREATE TABLE IF NOT EXISTS public.get_featured_leads (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT,
    email       TEXT NOT NULL,
    wants       TEXT,           -- "Where do you most want to be featured?" answer (free choice, may be null)
    placement   TEXT,           -- 'top' | 'bottom' (which form on the page)
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_get_featured_leads_email ON public.get_featured_leads (email);

ALTER TABLE public.get_featured_leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "get_featured_leads_service_role_all" ON public.get_featured_leads;
CREATE POLICY "get_featured_leads_service_role_all" ON public.get_featured_leads
    FOR ALL TO service_role USING (true) WITH CHECK (true);

NOTIFY pgrst, 'reload schema';
