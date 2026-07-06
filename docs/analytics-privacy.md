# First-party analytics — what we collect & how to run it

Self-hosted behavioral analytics for monetisesubstack.com. Answers one question:
when someone clicks a Kit email and lands on a product page, **where do they drop
off** — offer, price, copy, or form/checkout UX. Raw events → wide per-session
rollup → per-campaign funnel dashboard.

## What we collect (plain language)

- An anonymous **visitor id** (random, stored in the browser's localStorage) and a
  per-visit **session id**. Not linked to any third-party identity.
- **Pages viewed** and the path of each.
- **Active engagement time** (paused when the tab is hidden or unfocused — not
  wall-clock).
- **Scroll depth** (25/50/75/100%) and which **marked page sections** entered the
  viewport (e.g. the offer/price/CTA blocks).
- **CTA clicks** (which button) and **outbound clicks** (which external domain).
- **Form interaction** — which fields were focused/blurred, time on each field,
  validation errors, submit attempts, successes, and abandonment (the last field
  touched). **Field identity only** — see below.
- **Marketing attribution** from the URL: UTM parameters + referrer (which Kit
  campaign sent the visit).
- **Country** (derived server-side from IP, then the IP is discarded), and coarse
  **device / browser / OS** (parsed from the user-agent, which is then discarded).
- When the Kit hashed-link toggle is on: a **hashed subscriber identifier**
  (`sh_kit`, a SHA-256 of the subscriber's email — never the raw email).

## What we never collect

- **No form input values.** Fields are identified by `name` / `id` / `<label>` /
  `aria-label` / type only. The `value` of any input is never read, transmitted,
  or stored — enforced in the client *and* re-stripped server-side as defense in
  depth.
- **No raw IP address.** Country is derived at ingestion, then the IP is dropped.
- **No raw user-agent string** is stored (parsed to device/browser/os, then dropped).
- **No raw email.** Subscriber stitching uses Kit's SHA-256 hash only.
- No session replay / DOM recording (out of scope by design — use Microsoft Clarity
  or rrweb separately if a visual layer is ever wanted).

## Consent posture

Per project decision, this runs by default — matching the site's existing Meta
Pixel + Google Analytics, which already load without a banner. An opt-out is still
available and persisted:

```js
window.__track.optOut();   // stop tracking on this browser (alias: revokeConsent)
window.__track.optIn();    // resume (alias: grantConsent)
```

To honor Global Privacy Control / Do Not Track as well, flip `RESPECT_GPC_DNT` to
`true` at the top of `public/track.js`. To add a real consent gate later, wire a
banner's accept/reject to `optIn()` / `optOut()` — no other change needed.

## Subscriber stitching — enabling the Kit toggle (Ana's action)

In Kit: **Account Settings → Email → Advanced Tracking**, enable the **hashed**
subscriber-id link option (appends `sh_kit=<sha256 of email>` to links in
broadcasts and sequences). The client reads it on landing and attaches it to the
session. Notes:

- Kit only appends the parameter on **real finalized sends**, not on test/preview
  sends — a bare URL while testing is expected, not a bug.
- Confirm the toggle exists on the current Kit plan (the deeper Kit Insights
  dashboard is Creator Pro; the link parameter itself is what this build needs).

## Retention & purge

- Raw `analytics_events`: **90 days** (`ANALYTICS_EVENT_RETENTION_DAYS`).
- `analytics_sessions` rollup: **365 days** (`ANALYTICS_SESSION_RETENTION_DAYS`).
- A Vercel cron (`vercel.json`) calls `GET /api/admidash/analytics/purge` daily at
  04:00 UTC. **Set `CRON_SECRET` in the Vercel project env** so the cron authorizes
  (Vercel sends it as `Authorization: Bearer <CRON_SECRET>`).
- Manual run: `POST /api/admidash/analytics/purge` with `{ "password": "<ADMIDASH_PASSWORD>" }`
  (optional `eventDays` / `sessionDays` overrides).

## GDPR subject deletion

`POST /api/admidash/analytics/delete-subscriber` with the admin password and one of:

```json
{ "password": "…", "email": "subscriber@example.com" }   // hashed server-side to match sh_kit
{ "password": "…", "sh_kit": "<exact hash from a link>" } // exact match
```

Deletes every matching row from both `analytics_events` and `analytics_sessions`.

## Setup checklist

- [x] Tables: `supabase/migrations/20260628090000_create_analytics_tables.sql` (applied)
- [x] `track.js` mounted site-wide via `src/app/layout.tsx`
- [x] Annotated `/how-to-hit-10k` (offer/price/checkout sections, hero + offer CTAs,
      checkout-10k form with payment-step / payment-error / success hooks)
- [ ] Kit: enable the hashed subscriber-id link toggle
- [ ] Vercel: set `CRON_SECRET` env var (enables the daily purge cron)
- [ ] Annotate remaining funnels (e.g. `/10k-launch-lab`, `/offer-clarity`) — same
      pattern: `data-track-section`, `data-track="cta"` + `data-track-id`,
      `data-track-form`, and `window.__track.formSuccess(name)` on the success path
- [ ] Update the public privacy policy to reflect the "what we collect" list above
```
