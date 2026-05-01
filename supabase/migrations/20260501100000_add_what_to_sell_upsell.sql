-- Add the "What Do I Even Sell?" workshop-recording upsell to offer_clarity_leads.
-- This is a one-click off-session upsell that sits BEFORE the 1:1 coaching upsell
-- in the funnel: Course → What-To-Sell → Coaching → Success.
ALTER TABLE public.offer_clarity_leads
    ADD COLUMN IF NOT EXISTS has_what_to_sell_upsell           BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS what_to_sell_payment_intent_id    TEXT,
    ADD COLUMN IF NOT EXISTS what_to_sell_paid_at              TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS what_to_sell_price_cents          INTEGER DEFAULT 0;

COMMENT ON COLUMN public.offer_clarity_leads.has_what_to_sell_upsell IS
    'TRUE once buyer accepts the "What Do I Even Sell?" workshop-recording upsell ($147).';
