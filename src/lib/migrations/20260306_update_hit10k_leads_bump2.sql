-- Migration: Add second order bump to hit10k_leads
ALTER TABLE public.hit10k_leads 
ADD COLUMN IF NOT EXISTS has_order_bump2 BOOLEAN DEFAULT false;

-- Note: The admin dashboard uses this to track multi-bump performance.
COMMENT ON COLUMN public.hit10k_leads.has_order_bump2 IS 'Tracks if the 60-Minute Launch Calendar bump was purchased';
