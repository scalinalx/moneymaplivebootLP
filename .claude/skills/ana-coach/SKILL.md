---
name: ana-coach
description: >
  Reference for the Ana AI Coach subsystem (src/lib/ana-coach/, /vip/coach, and its
  admidash tab). Use this whenever a task touches the coach: its multi-agent
  pipeline, RAG/retrieval, prompts, session state, access codes, URL/file handling,
  token/cost tracking, or its admin panel. Read it BEFORE editing anything under
  src/lib/ana-coach/ so you don't break a security invariant or the turn pipeline.
---

# Ana AI Coach — architecture & how to work on it

A members-only, multi-agent coaching system for the $3k VIP Accelerator. It is NOT
a chatbot: it runs a structured coaching session backed by a panel of specialist
agents, grounded in Ana's real material via embeddings retrieval. Route:
`/vip/coach`. Admin: `/admidash` → "Ana Coach" tab.

## The turn pipeline (src/lib/ana-coach/orchestrator/)

Every member message runs `runTurn()` (an async generator that yields SSE events):

1. **TRIAGE + retrieval (parallel)** — `triage.ts` (a fast JSON call on
   `gemini-3.1-flash-lite`) extracts profile facts, proposes phase changes, and
   routes to specialists. Simultaneously the member message is embedded ONCE
   (`embedQuery`) and reused all turn.
2. **PANEL** — `panel.ts` selects ≤3 specialists (`selectPanel`) and runs them in
   parallel (`Promise.allSettled`). Specialists: `strategy_coach`, `copy_critic`,
   `growth_auditor`, `product_matcher`. Each is an *analyst* writing internal notes
   (NOT Ana's voice). Each retrieves its own domain-scoped chunks using ITS
   diagnostic question.
3. **SYNTHESIS** — `synthesis.ts` (streaming, `gemini-3.5-flash`) is the ONLY call
   in Ana's voice. It turns the analyst notes into her reply.

`index.ts` is the pipeline; the message route (`src/app/api/ana-coach/message/`)
streams it as SSE, enforces quotas, persists, and records token usage.

## Security invariants — DO NOT VIOLATE

These are the point of the whole design. Breaking one is a security regression.

- **The main pipeline is 100% tool-free.** `orchestrator/gemini.ts` never passes
  `tools`. The model cannot fetch, browse, or call anything. This is what makes
  prompt-injection → exfiltration impossible in triage/specialists/synthesis.
- **The ONLY model tool is `url_context`, and it's isolated.** `urlContext.ts` runs
  a separate, secrets-free extraction call (no persona, no history, no profile) so
  an injected page has nothing to steal. Its output is wrapped as untrusted. Never
  add tools to the main pipeline; never give `urlContext.ts` conversation context.
- **All untrusted content is wrapped and routed.** Uploaded files / fetched pages go
  through `wrapUntrusted()` and reach ONLY the specialists that need them
  (copy_critic gets files, growth_auditor gets URLs). Synthesis NEVER sees raw
  untrusted text — only analyst notes about it. product_matcher NEVER sees untrusted
  content (it makes purchase-adjacent claims).
- **SSRF:** user-submitted URLs are validated (`ssrf.ts`: scheme/port/credentials +
  private-range blocklist) before any fetch. `urlFetcher.ts` (the fallback) uses an
  undici agent with a connect-time `lookup` that re-checks every resolved IP
  (defeats DNS rebinding). Keep both checks.
- **`[[product:slug]]` recommendations** are validated against `PRODUCT_SLUGS` in
  productMatcher.ts AND sanitised again at synthesis. The model can't invent a link.
- **Output rendering** (`CoachMessage.tsx`): react-markdown, NO rehype-raw (HTML
  stays escaped), images never rendered, external links get a click-confirm.

## RAG / retrieval

- **Corpus:** `src/data/ana-coach/knowledge-chunks.json` (~293 chunks, 768-dim
  gemini-embedding-001 vectors). Sources: Ana's Kit emails, posts, notes, Q&A,
  frameworks, workshops, 100 offer templates, feed-algorithm research.
- **Build:** `npm run rag:build` (`scripts/build-ana-coach-rag.ts`) reads the
  sources (Kit emails from `src/data/ana-coach/kit-emails.json`; the rest from the
  gitignored `claude chat files/` folder) → embeds → writes the index. **Commit the
  regenerated `knowledge-chunks.json`** — it's the runtime dependency. `claude chat
  files/` is gitignored (build input only); the runtime never needs it.
- **Retrieval** (`retrieval.ts`): embed the query, cosine top-K. Each specialist
  retrieves from its OWN source types (`SPECIALIST_SOURCES`) so its core material
  surfaces (a global top-K would let practical Notes outrank the research doc).
  Degrades to `[]` on embedding failure — never breaks the turn.
- **Adding knowledge:** drop files in `claude chat files/` (or extend the ingest
  script), run `npm run rag:build`, commit the new index. To add a whole new source
  type, add it in `build-ana-coach-rag.ts` and (if a specialist should prefer it)
  `SPECIALIST_SOURCES`.

## Static knowledge (not retrieved)

`npm run generate:coach` (`scripts/generate-ana-coach-knowledge.ts`) builds
`knowledge.generated.ts` (persona, style guide, ecosystem catalog, testimonials,
etc.) from repo sources, filtering out internal-ops sections. STYLE_GUIDE (Ana's
voice rules) is always-on in synthesis; the catalog + testimonials are static in
product_matcher.

## Session model

- Phases: `INTAKE → DIAGNOSIS → COACHING → WRAP_UP → CLOSED` (monotonic; count-based
  floor forces WRAP_UP before the cap so a plan is always delivered).
  `sessionState.ts` is PURE — unit-tested in `scripts/test-ana-coach-session.ts`.
- **Coaching philosophy** (in synthesis): move the member from current state → ideal
  state (goal) along the optimal pathway. INTAKE must establish the diagnostic
  foundation with SPECIFIC, data-seeking questions before prescribing — never a
  vague form, never demand the Substack URL by default.
- **Sessions are a TRUE clean slate.** Starting a new conversation resets ALL context
  — no cross-session profile carryover (that was tried and removed; it leaked stale
  data and bloated `blockers`). `startConversation` seeds an empty profile.

## Access / quotas / cost

- Per-member access codes (`ANA-XXXX-XXXX-XXXX`, sha256-hashed) managed in the
  admidash panel; codes are shown ONCE (hash-only storage — you cannot retrieve a
  lost code, only reissue via "New code"). Auth → HMAC session token
  (`ANA_COACH_SESSION_SECRET`), re-checked each request for instant revocation.
- All quotas are atomic Supabase RPCs (no read-then-write races). Token/cost per
  member: `total_tokens_in/out` on the member row, incremented via
  `ana_coach_add_tokens` each turn; cost estimated at env-set rates.

## Models & config

Everything is env-overridable in `config.ts`. Defaults: triage
`gemini-3.1-flash-lite`, specialists + synthesis `gemini-3.5-flash`, url_context on
lite. Env: `GEMINI_API_KEY` (server-only), `ANA_COACH_SESSION_SECRET`,
`ANA_COACH_*` overrides, `ANA_COACH_PRICE_*` for the cost estimate.

## How to test a change here

- **Logic** (phase machine, parsers): `npx tsx scripts/test-ana-coach-session.ts`.
- **Prompts / coaching quality:** write a throwaway tsx that calls `runTurn(...)`
  directly with a mock context (no DB/HTTP needed — it hits real Gemini) and READ
  the streamed reply. This is how you verify voice, intake behaviour, and grounding.
- **Retrieval:** call `retrieve()` / `retrieveWithVector()` and print the hits +
  scores.
- **SSRF:** `npx tsx scripts/test-ana-coach-ssrf.ts` (probe checklist must all fail).
- **Full HTTP path:** create a member via the admin API, exchange the code, POST a
  message, read the SSE stream. Always `tsc` clean + `npm run build` before pushing.
- **DB shape:** `npx tsx scripts/verify-ana-coach-db.ts`.

## Migrations here

Two applied: `20260705120000_create_ana_coach_tables.sql` and
`20260706120000_ana_coach_token_counters.sql`. Any new migration is Studio-applied
by Ana — write new code to degrade gracefully until it's applied (see CLAUDE.md
rule #2; the token-counter feature does this: the members route retries without the
new columns, `addTokenUsage` swallows a missing-RPC error).
