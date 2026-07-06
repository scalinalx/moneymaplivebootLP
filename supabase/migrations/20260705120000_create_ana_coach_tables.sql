-- Ana AI Coach — VIP multi-agent coaching system.
--
-- A proactive AI coaching tool for $3k VIP Accelerator members. Members
-- authenticate with per-member access codes, run ONE non-persistent coaching
-- "session" at a time (message-capped), and can attach files / URLs the panel
-- analyses. Transcripts + panel traces are retained 30 days for Ana's review,
-- then purged by cron.
--
-- Privacy / security posture (follows analytics_events, NOT the older *_leads
-- tables): RLS on every table, service-role-only policies. Access codes are
-- stored as SHA-256 hashes ONLY — plaintext is shown once at creation and never
-- persisted. All quota enforcement runs through atomic single-statement RPCs so
-- there is no read-then-write TOCTOU race (unlike show_dont_tell_users credits).

-- =====================================================================
-- Table 1: ana_coach_members — the VIP roster (one row per access code)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.ana_coach_members (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code_hash           TEXT UNIQUE NOT NULL,        -- sha256 hex of normalized code; plaintext never stored
    member_name         TEXT NOT NULL,
    member_email        TEXT,
    status              TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked')),
    notes               TEXT,
    profile             JSONB NOT NULL DEFAULT '{}'::jsonb,  -- last session's profile → returning-member continuity
    total_messages      INTEGER NOT NULL DEFAULT 0,
    total_conversations INTEGER NOT NULL DEFAULT 0,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at          TIMESTAMPTZ,
    last_used_at        TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_ana_coach_members_status ON public.ana_coach_members (status);

ALTER TABLE public.ana_coach_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "ana_coach_members_service_role_all" ON public.ana_coach_members;
CREATE POLICY "ana_coach_members_service_role_all" ON public.ana_coach_members
    FOR ALL TO service_role USING (true) WITH CHECK (true);

COMMENT ON TABLE public.ana_coach_members IS
    'VIP Accelerator roster for Ana AI Coach. code_hash = sha256 of the access code; plaintext is shown once at creation and never stored. profile carries coaching context across sessions.';

-- =====================================================================
-- Table 2: ana_coach_conversations — one coaching "session"
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.ana_coach_conversations (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id        UUID NOT NULL REFERENCES public.ana_coach_members(id) ON DELETE CASCADE,
    status           TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'ended')),
    session_phase    TEXT NOT NULL DEFAULT 'INTAKE'
                       CHECK (session_phase IN ('INTAKE', 'DIAGNOSIS', 'COACHING', 'WRAP_UP', 'CLOSED')),
    member_profile   JSONB NOT NULL DEFAULT '{}'::jsonb,
    message_count    INTEGER NOT NULL DEFAULT 0,       -- counts both roles
    message_limit    INTEGER NOT NULL DEFAULT 30,
    in_flight_since  TIMESTAMPTZ,                      -- concurrency lock; stale after N seconds
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_message_at  TIMESTAMPTZ,
    ended_at         TIMESTAMPTZ
);

-- Exactly one active conversation per member at a time.
CREATE UNIQUE INDEX IF NOT EXISTS idx_ana_coach_conversations_one_active
    ON public.ana_coach_conversations (member_id) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_ana_coach_conversations_created ON public.ana_coach_conversations (created_at);

ALTER TABLE public.ana_coach_conversations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "ana_coach_conversations_service_role_all" ON public.ana_coach_conversations;
CREATE POLICY "ana_coach_conversations_service_role_all" ON public.ana_coach_conversations
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- =====================================================================
-- Table 3: ana_coach_messages — transcript (both roles)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.ana_coach_messages (
    id               BIGSERIAL PRIMARY KEY,
    conversation_id  UUID NOT NULL REFERENCES public.ana_coach_conversations(id) ON DELETE CASCADE,
    role             TEXT NOT NULL CHECK (role IN ('user', 'model')),
    content          TEXT NOT NULL,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ana_coach_messages_convo ON public.ana_coach_messages (conversation_id, id);

ALTER TABLE public.ana_coach_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "ana_coach_messages_service_role_all" ON public.ana_coach_messages;
CREATE POLICY "ana_coach_messages_service_role_all" ON public.ana_coach_messages
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- =====================================================================
-- Table 4: ana_coach_attachments — uploaded files / fetched URLs (extracted text)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.ana_coach_attachments (
    id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id        UUID NOT NULL REFERENCES public.ana_coach_conversations(id) ON DELETE CASCADE,
    kind                   TEXT NOT NULL CHECK (kind IN ('file', 'url')),
    name                   TEXT NOT NULL,               -- filename or URL
    mime                   TEXT,
    char_count             INTEGER NOT NULL DEFAULT 0,
    truncated              BOOLEAN NOT NULL DEFAULT FALSE,
    extracted_text         TEXT NOT NULL,
    consumed_by_message_id BIGINT REFERENCES public.ana_coach_messages(id) ON DELETE SET NULL,
    created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ana_coach_attachments_convo ON public.ana_coach_attachments (conversation_id);
-- Fast lookup of pending (unconsumed) attachments for the next turn.
CREATE INDEX IF NOT EXISTS idx_ana_coach_attachments_pending
    ON public.ana_coach_attachments (conversation_id) WHERE consumed_by_message_id IS NULL;

ALTER TABLE public.ana_coach_attachments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "ana_coach_attachments_service_role_all" ON public.ana_coach_attachments;
CREATE POLICY "ana_coach_attachments_service_role_all" ON public.ana_coach_attachments
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- =====================================================================
-- Table 5: ana_coach_daily_usage — per-member per-day counters (token-abuse cap)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.ana_coach_daily_usage (
    member_id     UUID NOT NULL REFERENCES public.ana_coach_members(id) ON DELETE CASCADE,
    day           DATE NOT NULL,
    messages      INTEGER NOT NULL DEFAULT 0,
    conversations INTEGER NOT NULL DEFAULT 0,
    file_uploads  INTEGER NOT NULL DEFAULT 0,
    url_fetches   INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (member_id, day)
);

ALTER TABLE public.ana_coach_daily_usage ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "ana_coach_daily_usage_service_role_all" ON public.ana_coach_daily_usage;
CREATE POLICY "ana_coach_daily_usage_service_role_all" ON public.ana_coach_daily_usage
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- =====================================================================
-- Table 6: ana_coach_turn_traces — per-turn panel observability (Ana's review)
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.ana_coach_turn_traces (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id  UUID NOT NULL REFERENCES public.ana_coach_conversations(id) ON DELETE CASCADE,
    message_id       BIGINT REFERENCES public.ana_coach_messages(id) ON DELETE SET NULL,
    turn_index       INTEGER NOT NULL,
    phase_before     TEXT NOT NULL,
    phase_after      TEXT NOT NULL,
    triage           JSONB,        -- raw triage output + {ms, tokens_in, tokens_out, retried}
    specialists      JSONB,        -- [{id, status, ms, tokens_in, tokens_out, notes}]
    synthesis        JSONB,        -- {ms, tokens_in, tokens_out, aborted}
    total_ms         INTEGER,
    model            TEXT NOT NULL DEFAULT 'gemini-3-flash-preview',
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ana_coach_turn_traces_convo
    ON public.ana_coach_turn_traces (conversation_id, turn_index);

ALTER TABLE public.ana_coach_turn_traces ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "ana_coach_turn_traces_service_role_all" ON public.ana_coach_turn_traces;
CREATE POLICY "ana_coach_turn_traces_service_role_all" ON public.ana_coach_turn_traces
    FOR ALL TO service_role USING (true) WITH CHECK (true);

COMMENT ON TABLE public.ana_coach_turn_traces IS
    'Per-turn panel trace (triage decision, specialist notes, timings, token counts) for Ana to audit what her AI panel told members. Purged with the 30-day transcript cron.';

-- =====================================================================
-- Atomic RPC 1: consume a message turn
-- Acquires the in-flight lock, enforces per-conversation + per-day message caps,
-- and increments counters — all in one statement path. Returns (ok, reason,
-- new_count). reason ∈ 'ok' | 'not_active' | 'busy' | 'conversation_cap' | 'daily_cap'.
-- =====================================================================
CREATE OR REPLACE FUNCTION public.ana_coach_consume_message(
    p_conversation        UUID,
    p_member              UUID,
    p_max_messages_per_day INTEGER,
    p_lock_stale_secs      INTEGER
) RETURNS TABLE (ok BOOLEAN, reason TEXT, new_count INTEGER)
LANGUAGE plpgsql AS $$
DECLARE
    v_conv     public.ana_coach_conversations%ROWTYPE;
    v_today    DATE := (NOW() AT TIME ZONE 'UTC')::date;
    v_day_msgs INTEGER;
BEGIN
    -- Lock the conversation row for the duration of this transaction.
    SELECT * INTO v_conv FROM public.ana_coach_conversations
        WHERE id = p_conversation AND member_id = p_member
        FOR UPDATE;

    IF NOT FOUND OR v_conv.status <> 'active' THEN
        RETURN QUERY SELECT false, 'not_active', COALESCE(v_conv.message_count, 0);
        RETURN;
    END IF;

    -- Concurrency: reject if a request is already in flight (and the lock is fresh).
    IF v_conv.in_flight_since IS NOT NULL
       AND v_conv.in_flight_since > NOW() - make_interval(secs => p_lock_stale_secs) THEN
        RETURN QUERY SELECT false, 'busy', v_conv.message_count;
        RETURN;
    END IF;

    -- Per-conversation cap (+2 accounts for this user turn and the coming model turn).
    IF v_conv.message_count + 2 > v_conv.message_limit THEN
        RETURN QUERY SELECT false, 'conversation_cap', v_conv.message_count;
        RETURN;
    END IF;

    -- Per-day message cap (count user turns; each turn = 1 user + 1 model = 2 rows,
    -- so we enforce against the daily row's messages counter directly).
    SELECT messages INTO v_day_msgs FROM public.ana_coach_daily_usage
        WHERE member_id = p_member AND day = v_today;
    v_day_msgs := COALESCE(v_day_msgs, 0);
    IF v_day_msgs + 1 > p_max_messages_per_day THEN
        RETURN QUERY SELECT false, 'daily_cap', v_conv.message_count;
        RETURN;
    END IF;

    -- Reserve: bump conversation count by 2 (user + model), set lock, stamp activity.
    UPDATE public.ana_coach_conversations
        SET message_count   = message_count + 2,
            in_flight_since = NOW(),
            last_message_at = NOW()
        WHERE id = p_conversation;

    -- Bump daily + lifetime message counters (one user message this turn).
    INSERT INTO public.ana_coach_daily_usage (member_id, day, messages)
        VALUES (p_member, v_today, 1)
        ON CONFLICT (member_id, day) DO UPDATE SET messages = ana_coach_daily_usage.messages + 1;
    UPDATE public.ana_coach_members
        SET total_messages = total_messages + 1, last_used_at = NOW()
        WHERE id = p_member;

    RETURN QUERY SELECT true, 'ok', v_conv.message_count + 2;
END;
$$;

-- =====================================================================
-- Atomic RPC 2: release the in-flight lock (called in finally)
-- =====================================================================
CREATE OR REPLACE FUNCTION public.ana_coach_release_lock(p_conversation UUID)
RETURNS VOID LANGUAGE sql AS $$
    UPDATE public.ana_coach_conversations SET in_flight_since = NULL WHERE id = p_conversation;
$$;

-- =====================================================================
-- Atomic RPC 3: refund a reserved turn (synthesis failed before completion)
-- Rolls back the reservation from ana_coach_consume_message and releases the lock.
-- =====================================================================
CREATE OR REPLACE FUNCTION public.ana_coach_refund_message(p_conversation UUID, p_member UUID)
RETURNS VOID LANGUAGE plpgsql AS $$
DECLARE
    v_today DATE := (NOW() AT TIME ZONE 'UTC')::date;
BEGIN
    UPDATE public.ana_coach_conversations
        SET message_count   = GREATEST(0, message_count - 2),
            in_flight_since = NULL
        WHERE id = p_conversation;
    UPDATE public.ana_coach_daily_usage
        SET messages = GREATEST(0, messages - 1)
        WHERE member_id = p_member AND day = v_today;
    UPDATE public.ana_coach_members
        SET total_messages = GREATEST(0, total_messages - 1)
        WHERE id = p_member;
END;
$$;

-- =====================================================================
-- Atomic RPC 4: bump a per-day resource counter with a cap
-- kind ∈ 'conversations' | 'file_uploads' | 'url_fetches'. Returns TRUE if the
-- bump succeeded (under cap), FALSE if the cap is reached.
-- =====================================================================
CREATE OR REPLACE FUNCTION public.ana_coach_bump_daily(
    p_member UUID,
    p_kind   TEXT,
    p_max    INTEGER
) RETURNS BOOLEAN LANGUAGE plpgsql AS $$
DECLARE
    v_today   DATE := (NOW() AT TIME ZONE 'UTC')::date;
    v_current INTEGER;
BEGIN
    INSERT INTO public.ana_coach_daily_usage (member_id, day) VALUES (p_member, v_today)
        ON CONFLICT (member_id, day) DO NOTHING;

    EXECUTE format(
        'SELECT %I FROM public.ana_coach_daily_usage WHERE member_id = $1 AND day = $2 FOR UPDATE',
        p_kind
    ) INTO v_current USING p_member, v_today;

    IF COALESCE(v_current, 0) >= p_max THEN
        RETURN false;
    END IF;

    EXECUTE format(
        'UPDATE public.ana_coach_daily_usage SET %I = %I + 1 WHERE member_id = $1 AND day = $2',
        p_kind, p_kind
    ) USING p_member, v_today;

    IF p_kind = 'conversations' THEN
        UPDATE public.ana_coach_members SET total_conversations = total_conversations + 1 WHERE id = p_member;
    END IF;

    RETURN true;
END;
$$;
