-- Ana AI Coach — per-member (VIP code) expiry.
--
-- Cohorts already expire via ana_coach_cohorts.expires_at. Individual VIP codes
-- had no expiry at all. This adds an optional expires_at to ana_coach_members,
-- enforced exactly like the cohort one: at login, on every authenticated
-- request, and as a cap on the session-token exp. NULL = never expires.
--
-- Applied by hand in Supabase Studio (SQL editor). The app degrades gracefully
-- before this lands: member selects retry without the column, and members are
-- treated as never-expiring.

ALTER TABLE public.ana_coach_members
    ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;

COMMENT ON COLUMN public.ana_coach_members.expires_at IS
    'Optional. Past this instant the member''s code and any live session token are rejected. NULL = never expires. Cohort-spawned members are governed by their cohort''s expires_at instead.';

-- =====================================================================
-- Backfill: every currently-active individual VIP code expires at the end of
-- 30 Sep 2026 (UTC), matching the "Grow Substack Challenge - Aug 2026" cohort.
-- Cohort-spawned members (cohort_id set) are left NULL — the cohort governs them.
-- =====================================================================
UPDATE public.ana_coach_members
   SET expires_at = '2026-09-30T23:59:59Z'
 WHERE cohort_id IS NULL
   AND status = 'active'
   AND expires_at IS NULL;
