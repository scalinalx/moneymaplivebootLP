# Working in this repository

This file is loaded into context every session. It defines how to work in this
codebase to a high standard. Read it fully before making changes. When in doubt,
the two governing principles are: **match what's already here**, and **prove it
works before claiming it does.**

---

## What this project is

A Next.js marketing + product platform for **Ana Calin's** Substack-monetisation
business. It's three things in one repo:

1. **Info-product funnels** — dozens of landing → checkout → upsell pages for
   workshops, courses, and PDF products (Stripe PaymentIntents, per-funnel
   `*_leads` Supabase tables).
2. **AI tools** — Gemini-powered lead-gen and paid tools (Will It Sell, Show Don't
   Tell, Offer Genius, Viral Product Finder, etc.).
3. **Ana AI Coach** (`/vip/coach`) — a members-only multi-agent coaching system for
   the $3k VIP Accelerator. The most complex subsystem. See the `ana-coach` skill
   before touching it.

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4 (CSS-first,
no config file), Supabase (Postgres), Stripe, Google Gemini (`@google/genai`),
deployed on Vercel. Path alias `@/*` → `./src/*`.

---

## Non-negotiable rules (these have all burned someone before)

1. **Match existing patterns.** Before writing anything, read 1–2 neighbouring
   files and copy their structure, naming, error handling, and imports. A change
   that reads like the surrounding code is worth more than a "better" one that
   doesn't. New API routes follow the shape in `src/app/api/*/route.ts`
   (`NextResponse.json`, try/catch, `supabaseAdmin`, no shared wrapper).

2. **Migrations are applied by hand in the Supabase SQL editor.** There is NO
   Supabase CLI, NO connection string, NO `config.toml`. Migration files in
   `supabase/migrations/` are a written record; a human pastes them into Studio.
   Therefore: **never ship code that hard-depends on an unapplied migration.**
   Reference a new column/RPC defensively so the app still runs before the
   migration lands (retry a select without the new columns; swallow a missing-RPC
   error on a non-critical write). Shipping a route that `SELECT`s a not-yet-created
   column will 500 the whole feature. This has happened — don't repeat it.

3. **Secrets are server-only.** A key used server-side must NOT have a
   `NEXT_PUBLIC_` prefix (that ships it to the browser). The repo has a legacy
   mistake (`NEXT_PUBLIC_GEMINI_API_KEY`); new code uses `GEMINI_API_KEY`. Read
   secrets only in server code, and never log a key, token, or access code.

4. **New Supabase tables get RLS with a service-role-only policy.** Copy the
   pattern from `supabase/migrations/20260628090000_create_analytics_tables.sql`.
   Do NOT copy `show_dont_tell_users` (it has a `USING(true)` read policy and a
   read-then-write credit race — both anti-patterns). Use atomic RPCs for anything
   quota- or counter-like.

5. **Never change a dollar amount that's used as copywriting/strategy, only as a
   real price.** Prices live in `src/lib/constants.ts` (cents, env-overridable).
   Example amounts in sales copy ("make your first $10k") are content — leave them.
   See the `price-vs-pricing-psychology` memory.

6. **Confirm before destructive or outward-facing actions.** Commit/push only when
   asked. On the default branch (`main`, which auto-deploys to Vercel), that means
   a push is a production deploy — treat it as one.

---

## The quality bar (this is what separates good work here from mediocre work)

Work is not done when the code is written. It's done when you've **run it and shown
it works.** For substantive work, invoke the `engineering-standards` skill. The
short version:

- **`npx tsc --noEmit` must be clean** for any code change. Filter to the files you
  touched: `npx tsc --noEmit 2>&1 | grep -i <area>`.
- **`npm run build` must pass** before you say "done" on anything non-trivial, and
  ALWAYS before a push (Vercel runs the same `next build`).
- **Write a throwaway `tsx` script to prove logic works.** This repo verifies with
  real scripts, not assertions — see `scripts/test-ana-coach-*.ts`,
  `scripts/verify-*.ts`. Run pure logic (phase machines, parsers) as unit tests;
  run real API calls (Gemini, retrieval, SSRF probes) live against the dev server
  or directly. Clean up throwaway scripts (`rm` them) unless they're reusable.
- **Verify live behaviour, not "it should work."** If you changed a prompt, run a
  real turn and read the output. If you changed a route, `curl` it. If you changed
  retrieval, print what it retrieves. Show the evidence in your reply.
- **Prove claims with numbers/output.** "The voice improved" is worthless; paste the
  before/after reply. "It's cheaper" → show the token counts. Don't assert; measure.
- **Never claim something is fixed/working/verified without having run it.** If you
  couldn't run it, say so explicitly.

---

## Communication

- Lead with the outcome. First sentence = what happened or what you found.
- Be concise but complete: every fact the user needs goes in the final message, in
  plain sentences (not fragments or arrow-chains). Drop detail that doesn't change
  what they'd do next; keep the detail that does.
- Surface problems honestly. If tests fail, say so with the output. If you skipped a
  step, say that. Don't paper over a partial result.
- Don't editorialise about models, tools, or the framing of a request — just do the
  useful work well.

---

## Where things live

- `src/app/<funnel>/` — funnel pages; `src/app/api/<funnel>/` — their routes.
- `src/lib/constants.ts` — all prices (cents). `src/lib/supabase.ts` — `supabase`
  (anon) + `supabaseAdmin` (service role, used by every server route).
- `src/lib/ana-coach/` — the Ana AI Coach (see the `ana-coach` skill).
- `src/lib/analytics/` + `public/track.js` + `/api/collect` — first-party analytics.
- `src/data/ecosystem.json` — source-of-truth product catalog (→ `docs/ecosystem.md`
  via `npm run generate:docs`). `docs/writing-style-1.md` — Ana's voice guide.
- `middleware.ts` — route allowlist; new public page prefixes must be added here.
- `supabase/migrations/` — SQL records (Studio-applied). `vercel.json` — crons.

## Commands

- `npm run dev` — dev server (Turbopack). `npm run build` — production build.
- `npm run generate:coach` — rebuild the coach's static knowledge from sources.
- `npm run ingest:kit` — pull Ana's Kit broadcasts. `npm run rag:build` — rebuild
  the coach's embeddings index (commit the output `knowledge-chunks.json`).
- `npx tsx scripts/<x>.ts` — run a verification/test script.

## Ana's voice (for any member-facing copy or coach prompts)

Direct, declarative, short sentences, intentional fragments, second person, no
exclamation points, authority without hype. The full guide is
`docs/writing-style-1.md`. For sales/landing copy, use the `landing-page-copy`
skill. For the coach, voice lives in the synthesis prompt only.

## Deploying

`main` auto-deploys to Vercel on push. Before pushing: `npm run build` passes, and
required env vars are set in the Vercel dashboard (server-only, scoped to
Production). Migrations must be applied in Supabase Studio (same project as
`.env.local` points to). Confirm crons registered under Vercel → Settings → Cron
Jobs. Verify the live feature with a real request before telling the user it's up.
