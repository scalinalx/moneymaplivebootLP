-- 30-Day Substack Challenge: record Circle payments on the lead row, and
-- schedule the Circle → Kit sync from Postgres (Vercel Hobby crons are daily
-- only; pg_cron + pg_net can call the site every 15 minutes for free).
--
-- Written by /api/substack-challenge/circle-sync (see
-- src/lib/substack-challenge/circle-sync.ts). The route tolerates these
-- columns being absent (it still tags Kit), so apply whenever convenient.

-- ---------- 1. Paid columns ----------
ALTER TABLE public.substack_challenge_leads
    ADD COLUMN IF NOT EXISTS is_paid          BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS paid_at          TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS circle_charge_id TEXT,      -- Circle community_member_charges.id
    ADD COLUMN IF NOT EXISTS amount_paid      INTEGER,   -- cents
    ADD COLUMN IF NOT EXISTS currency         TEXT,
    ADD COLUMN IF NOT EXISTS paywall_name     TEXT,
    ADD COLUMN IF NOT EXISTS source           TEXT NOT NULL DEFAULT 'page';  -- 'page' (modal) | 'circle' (buyer skipped the modal)

CREATE UNIQUE INDEX IF NOT EXISTS idx_substack_challenge_leads_circle_charge
    ON public.substack_challenge_leads (circle_charge_id) WHERE circle_charge_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_substack_challenge_leads_paid_at
    ON public.substack_challenge_leads (paid_at DESC) WHERE paid_at IS NOT NULL;

NOTIFY pgrst, 'reload schema';

-- ---------- 2. Schedule the sync every 15 minutes ----------
-- The CRON_SECRET is NOT in this file. Before running this section, store it
-- once in Supabase Vault (Studio → SQL editor), using the same value as the
-- CRON_SECRET env var in Vercel:
--
--   select vault.create_secret('<paste CRON_SECRET here>', 'cron_secret');
--
-- Then run the rest. pg_net makes the HTTP call; pg_cron schedules it.
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

SELECT cron.unschedule('substack-challenge-circle-sync')
 WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'substack-challenge-circle-sync');

SELECT cron.schedule(
    'substack-challenge-circle-sync',
    '*/15 * * * *',
    $$
    SELECT net.http_get(
        url     := 'https://www.monetisesubstack.com/api/substack-challenge/circle-sync',
        headers := jsonb_build_object(
            'Authorization',
            'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'cron_secret' LIMIT 1)
        ),
        timeout_milliseconds := 30000
    );
    $$
);

-- To check it's running:   select * from cron.job;  select * from cron.job_run_details order by start_time desc limit 10;
-- To stop it:              select cron.unschedule('substack-challenge-circle-sync');
