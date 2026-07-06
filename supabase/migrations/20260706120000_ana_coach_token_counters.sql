-- Ana AI Coach — per-member lifetime token counters (for the admidash usage/cost
-- panel). Kept on the member row so they survive the 30-day trace purge and are
-- cheap to read. Incremented atomically after each completed turn.

ALTER TABLE public.ana_coach_members
  ADD COLUMN IF NOT EXISTS total_tokens_in  BIGINT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_tokens_out BIGINT NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION public.ana_coach_add_tokens(
  p_member UUID,
  p_in     BIGINT,
  p_out    BIGINT
) RETURNS VOID LANGUAGE sql AS $$
  UPDATE public.ana_coach_members
    SET total_tokens_in  = total_tokens_in  + GREATEST(0, p_in),
        total_tokens_out = total_tokens_out + GREATEST(0, p_out)
    WHERE id = p_member;
$$;
