# Funnel annotation spec (for analytics instrumentation)

You are adding first-party analytics annotations to ONE funnel. The tracking
client (`public/track.js`) is already live site-wide and listens for the
attributes below. Your job is ONLY to mark up the funnel so its events fire.

## Hard rules
- **ONLY add `data-track*` attributes and minimal `window.__track` calls.** Do NOT
  change any copy, prices, dollar amounts, classNames, layout, or behavior.
- **Never alter a dollar amount or price string** — some are copywriting examples,
  not the real price. Leave all text exactly as-is.
- **Only edit files inside this funnel's route dir and its components.** Do NOT
  touch `public/track.js`, `src/app/layout.tsx`, `src/lib/**`, or other funnels.
- Keep edits minimal and surgical. Match the surrounding code style.

## What to add

1. **Sections** — add `data-track-section="<name>"` to the WRAPPER element of each
   key section. Required names when the section exists:
   - `offer` — the main "what you get" / curriculum / value-stack section.
   - `price` — the pricing block (where the headline price is shown).
   - `checkout` — the wrapper around the order form / embedded checkout.
   Optional but nice: `testimonials`, `faq`, `guarantee`.
   The observer fires on ANY intersection (threshold 0), so it's fine to put the
   attribute on a large wrapper — but prefer the specific block when obvious.

2. **CTA buttons** — add `data-track="cta"` + `data-track-id="<slug>-<where>"` to
   each button/link whose purpose is to move toward buying (hero CTA, mid-page
   CTA, final CTA, "buy"/"enroll"/"get access"/"yes add this"). Naming:
   `<funnel-slug>-hero`, `<funnel-slug>-offer`, `<funnel-slug>-final`, etc. Do NOT
   tag nav links, social links, FAQ toggles, or back buttons.

3. **Checkout / lead form** — add `data-track-form="<funnel-slug>-checkout"` to the
   `<form>` element. If the checkout is multi-step with separate `<form>`s, put the
   SAME `data-track-form` value on each step's form.
   - For native inputs that lack a `name` attribute, add a clean one
     (`name="name"`, `name="email"`, etc.). These forms use React controlled state,
     not name-based submission, so adding `name` is safe — but double-check the
     submit handler doesn't read `e.target.name`/FormData before adding.
   - Stripe `<PaymentElement>` is a cross-origin iframe and is NOT field-track-able;
     that's expected. Only the native fields get tracked.

4. **Success + step hooks** — find where the purchase/lead SUCCEEDS (e.g.
   `paymentIntent.status === 'succeeded'`, an `onSuccess` callback, or right before
   a redirect to a `*-success` page) and add, just before that:
   ```js
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   (window as any).__track?.formSuccess?.('<funnel-slug>-checkout');
   ```
   For multi-step Stripe checkouts, also add when the payment step becomes visible:
   ```js
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   (window as any).__track?.checkoutStep?.('payment_step', '<funnel-slug>-checkout');
   ```
   and on a payment error:
   ```js
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   (window as any).__track?.checkoutStep?.('payment_error', '<funnel-slug>-checkout');
   ```

## Reference (already done — mirror this exactly)
- `src/app/how-to-hit-10k/page.tsx` (section wrapper on the checkout div)
- `src/components/how-to-hit-10k/HeroSection.tsx` (hero CTA)
- `src/components/how-to-hit-10k/OfferStack.tsx` (offer + price sections, offer CTA)
- `src/components/how-to-hit-10k/EmbeddedCheckout.tsx` (data-track-form, input names,
  payment_step / payment_error / formSuccess hooks)

## Only annotate RENDERED components (important)
Before annotating a component, confirm it is actually rendered on the live page —
i.e. it is imported (transitively) from the route's `page.tsx` (or `App.tsx`). Some
repos contain unused/dead components; annotating those produces attributes that
never fire. Trace the import chain from the route's page; if a "price"/"offer"
component you were about to mark isn't in that chain, find the one that IS rendered
and mark that instead.

## Interactive tools / non-checkout pages
If a route is an interactive tool or app (password gate, AI generator, etc.) rather
than a classic sales→checkout funnel, don't force it: tag the primary CTA button(s)
and any email/lead `<form>` (+ `formSuccess` on its success path), mark an `offer`
/`price` section only if one clearly exists, and say so in your report.

## Finishing
- Run `npx tsc --noEmit` and confirm YOUR funnel's files have no type errors.
- Report: each file you changed, the `data-track-id`s and form name you used, where
  you put the success hook, and anything ambiguous you skipped.
