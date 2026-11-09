-- Lock down ana_ai_leads: service role only.
-- Run AFTER the code that writes via /api/ana-ai-offer-flow/lead is deployed.

ALTER TABLE public.ana_ai_leads ENABLE ROW LEVEL SECURITY;

-- Drop every existing policy (the table was set up in Studio, so we don't know
-- their names; any of them could be what lets the public key read it).
DO $$
DECLARE pol record;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'ana_ai_leads'
  LOOP
    EXECUTE format('DROP POLICY %I ON public.ana_ai_leads', pol.policyname);
  END LOOP;
END $$;

-- Only the service role (server routes + admin dashboard) may touch it.
CREATE POLICY "ana_ai_leads_service_role_all" ON public.ana_ai_leads
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Check: should list exactly one policy, ana_ai_leads_service_role_all.
SELECT policyname, roles, cmd FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'ana_ai_leads';
