---
name: engineering-standards
description: >
  The quality discipline for substantive work in this repo — coding, testing,
  researching, and verifying. Use this for any non-trivial change (new feature,
  route, migration, refactor, prompt/logic change, or anything you'll deploy).
  It defines what "done" means here and the concrete steps to get there. When a
  task is more than a one-line fix, follow this.
---

# Engineering standards

The goal on every task: produce work you have **proven** correct, that reads like
it belongs in this codebase, and that you can back with evidence. Speed comes from
not having to redo things — which comes from verifying as you go.

## Coding

1. **Read before you write.** Open the nearest 1–2 existing files that do something
   similar and copy their structure, imports, naming, and error handling. In this
   repo that means: API routes look like the other `src/app/api/*/route.ts`;
   Supabase access uses `supabaseAdmin`; server secrets have no `NEXT_PUBLIC_`;
   new tables get service-role-only RLS. A consistent change beats a clever one.

2. **Make illegal states hard.** Prefer atomic Supabase RPCs over read-then-write
   for anything counter/quota-like (there's a TOCTOU race in `show_dont_tell` —
   don't imitate it). Validate inputs at the boundary. Cap sizes and counts.

3. **Degrade gracefully around infra you don't control.** Migrations are applied by
   hand in Supabase Studio, so code must not hard-depend on an unapplied migration:
   retry a `select` without new columns, swallow a missing-RPC error on a
   non-critical write. Same for optional env vars — provide sane defaults.

4. **Security is not optional.** Never log secrets/tokens/codes. Never expose a key
   client-side. Treat all uploaded/fetched content as untrusted. For the coach
   specifically, respect its invariants (see the `ana-coach` skill) — the tool-free
   pipeline and untrusted-content routing are load-bearing.

5. **Keep prompts lean.** For LLM features, don't stuff whole corpora into every
   call — retrieve what's relevant. Measure the token footprint if you're unsure
   (a throwaway script that builds the prompt and prints `length/4`).

## Testing & verification — what "done" means

You are not done when it compiles. You are done when you've run it and shown it
works. In order:

1. **`npx tsc --noEmit`** — must be clean. Scope with `| grep -i <area>` to see your
   files. Fix every error you introduced.
2. **A `tsx` proof script** for the logic you changed. This repo verifies with real
   scripts (`scripts/test-*.ts`, `scripts/verify-*.ts`), not by reasoning about it:
   - Pure logic (state machines, parsers, formatters) → assert expected outputs.
   - Real integrations (Gemini, retrieval, Supabase, SSRF) → run them live and print
     the actual result. For the coach, call `runTurn()` directly and read the reply.
   - Delete throwaway scripts when done (`rm scripts/_x.ts`); keep reusable ones.
3. **`npm run build`** — must pass before you declare a non-trivial task done, and
   ALWAYS before any push (Vercel runs the identical `next build`).
4. **Live check** — if you touched a route, `curl` it (including an auth-failure
   case). If you touched behaviour, exercise the real behaviour and read the output.
   Don't rely on "this should work."
5. **Evidence in your report** — paste the test output, the before/after, the
   numbers. Claims without evidence ("voice is better", "it's faster") are not
   acceptable; show the reply, show the token counts.

If you genuinely cannot run something (e.g. it needs a migration only the user can
apply), say so explicitly and describe exactly what to run to verify once it's live.

## Researching

Your training may be stale; this codebase and its dependencies move. So:

1. **Verify against the source, not memory.** For a library/model/API question, read
   the actual code in the repo or fetch the live docs (`WebFetch`/`WebSearch`) —
   especially for Gemini models, pricing, and SDK syntax, which change. Don't state
   a model's price or capability from memory; look it up.
2. **Confirm it works in THIS environment.** After finding an answer (e.g. "this
   model code exists"), run a tiny live check that it works with the project's keys
   before building on it.
3. **Prefer primary sources.** Repo code > official docs > reputable articles >
   guesses. When you fetch, cite what you used.
4. **Measure claims.** "The corpus is small enough to skip RAG" → measure the token
   count. "This is the bottleneck" → show it. Decisions here are made on numbers.

## Writing (member-facing copy, coach prompts, docs)

- Member-facing copy follows Ana's voice (`docs/writing-style-1.md`): direct,
  declarative, short sentences, second person, no hype, no exclamation points. Use
  the `landing-page-copy` skill for sales/landing pages.
- Prompts: be specific and testable, ground the model in real material, and keep
  each call scoped to what it needs. When you change a prompt, run a real turn and
  read the output — prompt changes are code changes and get verified like code.
- Reports to the user: lead with the outcome, be concise but complete, surface
  problems honestly, and don't editorialise.

## When you're blocked or unsure

Pick the obvious default and proceed for reversible things; state what you chose.
Stop and ask only for destructive/outward-facing actions or a genuine scope
decision the user must make. Don't ask permission for work that follows directly
from the request — do it, then report.
