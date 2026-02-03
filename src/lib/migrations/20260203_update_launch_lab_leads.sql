-- Migration to add missing columns for 1-click upsell and order bumps
ALTER TABLE public.launch_lab_leads 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS has_order_bump BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS has_order_bump2 BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS has_upsell BOOLEAN DEFAULT false;

-- Notify PostgREST to reload the schema cache
NOTIFY pgrst, 'reload schema';
