-- Table to store users who purchased access to the Show Don't Tell Image Generator
CREATE TABLE IF NOT EXISTS public.show_dont_tell_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    email TEXT,
    token_id TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ DEFAULT (now() + interval '365 days'),
    usage INTEGER DEFAULT 0,
    credits INTEGER DEFAULT 5000,
    history JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- In case the table already exists, safely add the new credits column
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='show_dont_tell_users' AND column_name='credits') THEN
        ALTER TABLE public.show_dont_tell_users ADD COLUMN credits INTEGER DEFAULT 5000;
    END IF;
END
$$;

-- Index for fast token lookups
CREATE INDEX IF NOT EXISTS idx_show_dont_tell_users_token_id ON public.show_dont_tell_users(token_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.show_dont_tell_users ENABLE ROW LEVEL SECURITY;

-- Allow read access from the API routes using service role key (or anon if needed)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'show_dont_tell_users' AND policyname = 'Enable read access for all users') THEN
        CREATE POLICY "Enable read access for all users" ON public.show_dont_tell_users FOR SELECT USING (true);
    END IF;
END
$$;
