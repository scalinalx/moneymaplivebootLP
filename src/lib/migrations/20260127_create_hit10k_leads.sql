-- Create the leads table for the Hit 10k workshop
CREATE TABLE IF NOT EXISTS public.hit10k_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    is_paid BOOLEAN DEFAULT false,
    has_order_bump BOOLEAN DEFAULT false,
    total_paid INTEGER DEFAULT 0, -- Store in cents
    stripe_payment_intent_id TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    payment_completed_at TIMESTAMPTZ
);

-- Enable Row Level Security
ALTER TABLE public.hit10k_leads ENABLE ROW LEVEL SECURITY;

-- Allow public to insert leads (for the lead capture form)
CREATE POLICY "Allow public insert" ON public.hit10k_leads
    FOR INSERT WITH CHECK (true);

-- Allow service role (admin) to read and update everything
CREATE POLICY "Allow service role full access" ON public.hit10k_leads
    USING (auth.jwt()->>'role' = 'service_role');
