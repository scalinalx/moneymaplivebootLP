-- Ana AI Coach — shared cohort access codes.
--
-- A cohort is a group product (e.g. the $197 two-week challenge) whose members
-- all share ONE access code. Logging in with a cohort code auto-creates a
-- personal ana_coach_members row (cohort_id set), so sessions, quotas, and
-- token/cost tracking stay per-person. VIP members keep cohort_id = NULL.
--
-- Same privacy posture as ana_coach_members: the shared code is stored as a
-- SHA-256 hash only (plaintext shown once at creation), RLS with a
-- service-role-only policy. Expiry (expires_at) is enforced at login AND on
-- every authenticated request, so revocation/expiry is instant for the whole
-- cohort.

-- =====================================================================
-- Table: ana_coach_cohorts — one row per shared-code group
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.ana_coach_cohorts (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code_hash   TEXT UNIQUE NOT NULL,        -- sha256 hex of normalized shared code; plaintext never stored
    name        TEXT NOT NULL,               -- e.g. '197 Challenge — Aug 2026'
    status      TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked')),
    expires_at  TIMESTAMPTZ,                 -- NULL = never expires; past = logins + requests rejected
    notes       TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.ana_coach_cohorts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "ana_coach_cohorts_service_role_all" ON public.ana_coach_cohorts;
CREATE POLICY "ana_coach_cohorts_service_role_all" ON public.ana_coach_cohorts
    FOR ALL TO service_role USING (true) WITH CHECK (true);

COMMENT ON TABLE public.ana_coach_cohorts IS
    'Shared access codes for group products (e.g. $197 challenge). code_hash = sha256 of the shared code, shown once at creation. Each login with the code spawns a personal ana_coach_members row linked via cohort_id.';

-- =====================================================================
-- Link members to their cohort (NULL = individual $3k VIP member)
-- =====================================================================
ALTER TABLE public.ana_coach_members
    ADD COLUMN IF NOT EXISTS cohort_id UUID REFERENCES public.ana_coach_cohorts(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_ana_coach_members_cohort ON public.ana_coach_members (cohort_id);

COMMENT ON COLUMN public.ana_coach_members.cohort_id IS
    'Set when this member row was spawned by a shared cohort code. NULL = individual VIP member with their own code.';
