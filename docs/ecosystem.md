# Monetise Substack Ecosystem Map

This document serves as a comprehensive map of all URLs, products, price points, freebies, and backend configurations active on the `https://www.monetisesubstack.com` domain.

> **Note:** This file is auto-generated from `src/data/ecosystem.json`. Do not edit this markdown file directly. Instead, update the JSON file and run `npm run generate:docs`.

## 1. Core Educational Programs & Workshops

*   **Build to Profit Live Workshop**: **$497** (`WORKSHOP_PRICE` in `.env.local`)
    *   The flagship live workshop offering, teaching foundational monetization strategies.
    *   *Links:* [Sales](/landing) | [Alternate Sales](/join) | [Checkout](/checkout-step1) | [Upsell](/upsell) | [Success](/success)
*   **The $10k Launch Lab**: **$597** (`NEXT_PUBLIC_LAUNCHLAB_PRICE`)
    *   A higher-tier workshop focused on consistent 10k launches.
    *   *Links:* [Sales](/10k-launch-lab) | [Upsell](/10k-launch-lab-upsell) | [Success](/10k-launch-lab-success)
*   **The Money Map**: **$497** (Standalone Value)
    *   A complete strategy course covering ICP, offer, positioning, segmentation, messaging, and copy. Note: Currently, the root domain `/` is set in `src/app/page.tsx` to automatically redirect traffic to `/10k-launch-lab`.
    *   *Links:* [Sales](/)
    *   **Note:** Sold as $300 Bump on Build to Profit

---

## 2. Targeted Mini-Workshops & Idea Products

*   **How to Hit 10k Workshop**: **$97** (`NEXT_PUBLIC_HIT10K_PRICE`)
    *   A lower barrier-to-entry challenge or mini-workshop.
    *   *Links:* [Checkout](/how-to-hit-10k) | [Success](/hit-10k-success)
*   **100 Genius Launch Ideas**: **$27** (`NEXT_PUBLIC_GENIUS_IDEAS_PRICE`)
    *   A digital product detailing successful launch ideas and frameworks.
    *   *Links:* [Checkout](/100-genius-launch-ideas) | [Success](/100-genius-launch-ideas/success)
*   **First 100 Paid Subscribers**: **$97** (`NEXT_PUBLIC_FIRST100_PRICE`)
    *   A comprehensive framework to convert free readers into paying customers and achieve bestseller status.
    *   *Links:* [Sales & Checkout](/first-100-paid-subscribers) | [Success](/first-100-paid-subscribers-success)
*   **Unstuck to Published**: **$97** (`UNSTUCK_PRICE`)
    *   A 60-minute live workshop (with Jessica Best) for Substack creators who are stuck overthinking — walk out with a positioned publication, a structured first article, and a paywall strategy that converts.
    *   *Links:* [Sales & Checkout](/unstuck-to-published) | [Success](/unstuck-to-published-success)
*   **Build Your Substack**: **$97** (`UNSTUCK_PRICE` — shared constant)
    *   A workshop helping creators build and launch their Substack publication from scratch. Reuses the same checkout architecture and order bump structure as Unstuck to Published.
    *   *Links:* [Sales & Checkout](/build-your-substack) | [Success](/build-your-substack-success)
*   **Creator Bundle**: **$69** (`CREATOR_BUNDLE_PRICE`)
    *   A bundled product offering with a Launch Stack order bump. Standalone checkout with its own lead table.
    *   *Links:* [Sales & Checkout](/creator-bundle) | [Success](/creator-bundle-success)
*   **The Offer Clarity Sprint**: **$97** (`NEXT_PUBLIC_OFFER_CLARITY_PRICE`)
    *   A self-paced course that teaches creators how to package expertise into a clear, one-sentence offer that subscribers buy from a single email. Embedded Stripe Elements checkout with 3 individual order bumps + a discounted bundle, followed by a 1:1 coaching upsell.
    *   *Links:* [Sales & Checkout](/offer-clarity) | [Coaching Upsell](/offer-clarity-coaching-upsell) | [Success](/offer-clarity-success)
*   **Your First $1K After Corporate**: **$250** (Hardcoded — direct Stripe Payment Link)
    *   A 60-minute live workshop teaching corporate professionals the exact 90-day system to make their first $1,000 online. Uses a direct Stripe Payment Link (no embedded checkout). Scheduled for March 31st.
    *   *Links:* [Sales Page](/your-first-1k-after-corporate)
    *   **Note:** Checkout via Stripe Payment Link — no backend API routes or database table

---

## 3. AI Software & Custom Tools (Freebies & Paid Add-ons)

### Show Don't Tell - Viral Thumbnail Generator

A custom-coded AI agent connecting to Nano Banana (Gemini 2.5 Flash Image) to dynamically generate scroll-stopping brand thumbnails. Protected by a `TokenID` access model.
*   **Access/Type:** Token Model
*   **Pricing Packages:**
    *   **Starter Package:** **$24.00** (Grants 200 Image Credits / ~100 Generations)
    *   **Pro Creator Package ("Best Value"):** **$247.00** (Grants 2,500 Image Credits / ~1250 Generations)
*   **App Home Page:** `/show-dont-tell`
*   **Purchase Page:** `/show-dont-tell/purchase`
*   **Success Page:** `/show-dont-tell/success`

### Ana Ai Offer Flow

An interactive AI tool designed to clarify and flow out product offerings.
*   **Access/Type:** Open / Freebie tool
*   **App URL:** `/ana-ai-offer-flow`

### Ana Offer Genius

An AI-powered builder that helps users craft high-converting offers.
*   **Access/Type:** Initially internal/gated; sold as an Order Bump on various funnels (usually **$27 - $37** value).
*   **App URL:** `/ana-offer-genius`

### Viral Digital Product Builder (VDPB)

An interactive builder for creating high-converting viral digital product ideas, names, and copy briefs.
*   **Access/Type:** Password Protected (Requires `VDPB_PASSWORD`).
*   **App URL:** `/vdpb`

### The Launch Stack

A comprehensive launch project management tool or dashboard.
*   **Access/Type:** Password Protected (Requires the master password `mellon_hwg`, defined in `.env.local`). Also sold as an Order Bump (usually **$67 - $69** value).
*   **App URL:** `/launch-stack`

### Ana's Viral Digital Product Finder

A free AI-powered tool (Gemini 3 Flash with thinking) that generates hyper-specific viral digital product ideas based on the user's accomplishments, passions, and profession. Includes tabbed route selection, concept cards with pricing and title ideas, and an upsell flow to the 10K Launch Lab.
*   **Access/Type:** Open / Free AI tool.
*   **App URL:** `/viral-digital-product-finder`

### Will It Sell? - AI Product Scoring Tool

A free AI-powered tool (Gemini 3 Flash with thinking) that scores digital product ideas against Ana Calin's Viral Product Formula. Returns a weighted scorecard with 9 per-criterion scores, overall score, verdict, and actionable improvements. Funnels into the 10K Launch Lab.
*   **Access/Type:** Open / Free AI tool.
*   **App URL:** `/will-it-sell`

---

## 4. Internal Operations & Command Centre

*   **HWG Command Centre (Admin Dashboard)**
    *   Central command center for real-time revenue tracking, multi-table lead management, abandoned cart recovery, and Kit synchronization.

---

## 5. Bumps & Upsells

_Order Bumps (In-Checkout Add-ons) & Upsells (Post-Checkout Cross-Sells)_

| Name | Price | Type | Offered On | Variables |
| :--- | :--- | :--- | :--- | :--- |
| **Hooks That Stop the Scroll** | $27 | Order Bump | 10k Lab, How to Hit 10k | `NEXT_PUBLIC_LAUNCHLAB_BUMP_PRICE`<br>`NEXT_PUBLIC_HIT10K_BUMP_PRICE` |
| ↳ _Details_ | <td colspan="4">_A vault of high-converting headline frameworks and opening loops designed to capture attention instantly._</td> |
| **The 60-Minute Launch Calendar** | $69 | Order Bump | 10k Launch Lab | `NEXT_PUBLIC_LAUNCHLAB_BUMP2_PRICE` |
| ↳ _Details_ | <td colspan="4">_The exact day-by-day Notion templates used to manage 6-figure launches without burnout._</td> |
| **CUSTOM CODED: OfferGenius™ AI Builder** | $37 | Order Bump | 100 Genius Ideas | `NEXT_PUBLIC_GENIUS_IDEAS_BUMP_PRICE` |
| ↳ _Details_ | <td colspan="4">_A custom AI tool that automatically perfectly customizes an offer for a specific audience to eliminate checkout hesitation._</td> |
| **CUSTOM TRAINED: 'Lazy Launch' AI EMAIL WRITER** | $67 | Order Bump | 100 Genius Ideas | `NEXT_PUBLIC_GENIUS_IDEAS_BUMP2_PRICE` |
| ↳ _Details_ | <td colspan="4">_A custom-trained AI system pre-loaded with psychological email sequences designed to sell without sounding "salesy"._</td> |
| **The Money Map Bundle** | +$300 | Upsell | Workshop Checkout | `BUNDLE_PRICE` = $797 total |
| ↳ _Details_ | <td colspan="4">_Bundles the entry-level live workshop with the comprehensive 'Money Map' strategy course normally valued at $497._</td> |
| **1:1 Sales Coaching Session** | $747 | Upsell (Dedicated) | /10k-launch-lab-upsell | `NEXT_PUBLIC_LAUNCHLAB_COACHING_PRICE` |
| ↳ _Details_ | <td colspan="4">_A direct, high-touch 1:1 strategy and group coaching add-on to maximize the impact of the launch templates._</td> |
| **Show Don't Tell Thumbnail Generator (400 Credits)** | $47 | Order Bump | Unstuck to Published, Build Your Substack | `UNSTUCK_SDT_BUMP_PRICE` |
| ↳ _Details_ | <td colspan="4">_Adds 400 image credits (~200 generations) to the Show Don't Tell AI Thumbnail Generator. 19 style presets, 1 year access. Credits are provisioned into the `show_dont_tell_users` table on payment confirmation._</td> |
| **100 Genius Launch Ideas PDF** | $27 | Order Bump | Unstuck to Published, Build Your Substack | `UNSTUCK_GENIUS_BUMP_PRICE` |
| ↳ _Details_ | <td colspan="4">_100 vetted, high-converting launch ideas sorted by difficulty and revenue potential. Instant PDF download with lifetime access._</td> |
| **Hooks That Stop the Scroll** | $27 | Order Bump | Unstuck to Published, Build Your Substack | `UNSTUCK_HOOKS_BUMP_PRICE` |
| ↳ _Details_ | <td colspan="4">_Vault of high-converting headline frameworks and opening loops that force readers to stop scrolling and click._</td> |
| **The Creator Launch Kit (Bundle)** | $69 | Order Bump (Bundle) | Unstuck to Published, Build Your Substack | `UNSTUCK_BUNDLE_PRICE` |
| ↳ _Details_ | <td colspan="4">_All 3 add-ons bundled: Show Don't Tell (400 credits) + 100 Genius Launch Ideas PDF + Hooks That Stop the Scroll. Individual total $101, bundle price $69 (save $32)._</td> |
| **The Launch Stack** | $67 | Order Bump | Creator Bundle | `CREATOR_BUNDLE_BUMP_PRICE` |
| ↳ _Details_ | <td colspan="4">_The comprehensive launch project management tool added as an order bump on the Creator Bundle checkout._</td> |
| **The Launch Stack** | $67 | Order Bump | Offer Clarity Sprint | `NEXT_PUBLIC_OFFER_CLARITY_BUMP_LAUNCH_STACK_PRICE` |
| ↳ _Details_ | <td colspan="4">_Password-gated launch project management tool. Password (`mellon_hwg`) revealed on success page after purchase._</td> |
| **Hooks That Stop the Scroll** | $47 | Order Bump | Offer Clarity Sprint | `NEXT_PUBLIC_OFFER_CLARITY_BUMP_HOOKS_PRICE` |
| ↳ _Details_ | <td colspan="4">_Vault of high-converting headline frameworks and opening loops._</td> |
| **Offer Genius** | $37 | Order Bump | Offer Clarity Sprint | `NEXT_PUBLIC_OFFER_CLARITY_BUMP_OFFER_GENIUS_PRICE` |
| ↳ _Details_ | <td colspan="4">_AI-powered offer builder. Password-gated tool unlocked on success page (uses same `mellon_hwg` master password as Launch Stack)._</td> |
| **Offer Clarity Bump Bundle (All 3)** | Auto-computed (~20% off) | Order Bump (Bundle) | Offer Clarity Sprint | `NEXT_PUBLIC_OFFER_CLARITY_BUMP_BUNDLE_DISCOUNT_PCT` (default 0.20)<br>`NEXT_PUBLIC_OFFER_CLARITY_BUMP_BUNDLE_PRICE` (optional override) |
| ↳ _Details_ | <td colspan="4">_Auto-calculated bundle: sum of Launch Stack + Hooks + Offer Genius minus a configurable discount percentage. When selected, individual bumps are disabled. Optional explicit override available._</td> |
| **1:1 Coaching with Ana** | $797 | Upsell (Dedicated) | /offer-clarity-coaching-upsell | `NEXT_PUBLIC_OFFER_CLARITY_COACHING_PRICE` ($797)<br>`NEXT_PUBLIC_OFFER_CLARITY_COACHING_RETAIL_PRICE` ($997) |
| ↳ _Details_ | <td colspan="4">_Post-purchase one-click upsell using saved card (off-session charge via `setup_future_usage: off_session`). Reduced from $997 retail. Falls back to Stripe Elements form if no saved payment method._</td> |

---

## 6. Success & Thank You Pages (Fulfillment)

These pages handle the post-purchase experience, dynamic rendering of purchased bumps, and direct access links.

*   **General Build to Profit Success**
    *   **Redirect:** Displays a 3-second countdown before automatically redirecting the user to a Google Doc containing instructions to join a private Substack community.
    *   **Content:** Confirms the order, details next steps (check email, calendar reminders), and lists bonuses (Resource Pack, Recordings).
*   **10k Launch Lab Success**
    *   **Content:** Welcomes users to the 10k Launch Lab. Instructs them to check email and start Day 1 immediately.
    *   **Dynamic Bump/Upsell Rendering:**
        *   If Upsell bought: Displays a block to book the 1:1 Coaching session via a `calendly.com/anacalin/30min` link.
        *   If Bump 1 bought: Instructs the user to access "Hooks That Stop the Scroll" in their dashboard.
        *   If Bump 2 bought: Instructs the user to view their Notion "60-Minute Launch Calendar" templates.
*   **How to Hit 10k Success**
    *   **Content:** Welcomes users to the "Hit Your First $10,000 Month" course. Gives a direct link to a YouTube video.
    *   **Dynamic Bump/Upsell Rendering:**
        *   If Bump bought: Unlocks a high-visibility block for "Hooks That Stop the Scroll!" linking directly to a public Notion page (`anabubolea.notion.site/Hooks-That-Stop...`).
*   **100 Genius Ideas Success**
    *   **Content:** Highlights an urgent "Do Not Close This Page" banner. Provides a direct local download link to the `100-Genius-Offers-Sell-2026.pdf` file.
    *   **Dynamic Bump/Upsell Rendering:**
        *   If Bump 1 bought: Shows the OfferGenius block with a direct link to the `/ana-offer-genius` protected app.
        *   If Bump 2 bought: Shows the Launch Stack block, revealing the password (`mellon_hwg`) required to access `/launch-stack` and links directly to it.
*   **Show Don't Tell Success**
    *   **Content:** A secure page that extracts the newly created programmatic `token_id` from the Stripe redirect URL (e.g. `SDT-XXXXXXXXXXXX`) and displays it in large text.
    *   **Features:** Provides a one-click "Copy to Clipboard" button and directs the user to immediately go to `/show-dont-tell` to login with their token.
*   **First 100 Subscribers Success**
    *   **Content:** Confirms the order, verifies the purchase, and instructs the user to check their email for immediate access to the workshop and bonuses.
*   **Unstuck to Published Success**
    *   **Content:** Confirms the Unstuck to Published purchase and provides next steps including email confirmation and workshop access.
    *   **Dynamic Bump/Upsell Rendering:**
        *   If SDT Bump bought: Provisions 400 credits into Show Don't Tell and displays token/access info.
        *   If Genius Ideas Bump bought: Provides download link for 100 Genius Launch Ideas PDF.
        *   If Hooks Bump bought: Provides access to Hooks That Stop the Scroll vault.
        *   If Bundle bought: Shows all three bonus access blocks.
*   **Build Your Substack Success**
    *   **Content:** Confirms the Build Your Substack purchase and provides next steps. Uses same bump rendering logic as Unstuck to Published.
    *   **Dynamic Bump/Upsell Rendering:**
        *   If SDT Bump bought: Provisions 400 credits into Show Don't Tell and displays token/access info.
        *   If Genius Ideas Bump bought: Provides download link for 100 Genius Launch Ideas PDF.
        *   If Hooks Bump bought: Provides access to Hooks That Stop the Scroll vault.
        *   If Bundle bought: Shows all three bonus access blocks.
*   **Creator Bundle Success**
    *   **Content:** Confirms the Creator Bundle purchase and provides access to all bundled resources.
    *   **Dynamic Bump/Upsell Rendering:**
        *   If Launch Stack Bump bought: Reveals the Launch Stack password and direct link to `/launch-stack`.
*   **Offer Clarity Sprint Success**
    *   **Content:** Welcomes the buyer with a green-accented heading. Renders one DeliveryCard per product purchased and fires Facebook Pixel `Purchase` + GA `purchase` events.
    *   **Dynamic Bump/Upsell Rendering:**
        *   Always: Course access card for the Offer Clarity Sprint.
        *   If Launch Stack Bump bought: PasswordReveal card showing `mellon_hwg` (from `NEXT_PUBLIC_LAUNCH_STACK_PASSWORD`) with copy-to-clipboard, plus link to `/launch-stack`.
        *   If Hooks Bump bought: Access link to the Hooks That Stop the Scroll vault.
        *   If Offer Genius Bump bought: PasswordReveal card with `mellon_hwg` and link to `/ana-offer-genius`.
        *   If Bundle bought: All three bump cards above are rendered.
        *   If 1:1 Coaching upsell accepted: Calendly booking card.
*   **Offer Clarity Coaching Upsell**
    *   **Redirect:** On success or skip, forwards to `/offer-clarity-success?leadId=...`.
    *   **Content:** Post-checkout one-click upsell page for 1:1 coaching with Ana at $797 (struck-through retail $997, with emerald 'Save $200' badge). Heading uses the same emerald green as the announcement bar. Uses saved card off-session charge; falls back to embedded Stripe Elements if no payment method on file.

---

## 7. Additional Legal & Utility Pages

*   **Lead Magnet / General Email Capture:** `/lead-collection`
*   **Scarcity Redirect (When time-limited offers expire):** `/offer-expired`
*   **General Post-Lead Action:** `/thankyou`
*   **Terms of Service:** `/terms`
*   **Privacy Policy:** `/privacy`

---

## 8. Backend Infrastructure Overview (API Ecosystem)

These APIs run silently in the background routing traffic and managing state:

### Active Server Routes

*   **`/api/leads`**: Manages lead collection for `/join` funnel.
*   **`/api/webhooks/stripe`**: Listens for successful Stripe `checkout.session.completed` AND `payment_intent.succeeded` events. The `payment_intent.succeeded` branch routes by `metadata.product` / `metadata.funnel` across 7 product keys (`offer_clarity_sprint`, `offer_clarity_coaching_upsell`, `hit10k_workshop`, `10k_launch_lab`, `first100_workshop`, `first100_from_wim_upsell`, `100_genius_ideas`) as a safety net in case the client-side confirm-payment call drops. Idempotent.
*   **`/api/create-checkout-session`**: Creates Stripe checkout sessions for the Build to Profit funnel.
*   **`/api/show-dont-tell/create-checkout`**: Creates Stripe checkout sessions for the Thumbnail Generator credit packages.
*   **`/api/show-dont-tell/auth`**: Validates Token IDs and returns credit usage.
*   **`/api/show-dont-tell/generate`**: Manages credit deduction and invokes Google's Gemini SDK for thumbnail building.
*   **`/api/[product]/create-payment-intent`**: Routes `launch-lab`, `hit10k`, `genius-ideas`, `first100`, `unstuck`, `build-your-substack`, and `creator-bundle` native Stripe Elements form transactions.
*   **`/api/[product]/confirm-payment`**: Confirms Stripe payments and fulfills orders for all embedded checkout products. Updates lead status and provisions bump purchases.
*   **`/api/[product]/get-lead-status`**: Checks payment and lead status for `launch-lab`, `hit10k`, `genius-ideas`, `unstuck`, `build-your-substack`, and `creator-bundle`.
*   **`/api/launch-lab/waitlist`**: Manages waitlist signups for the 10k Launch Lab.
*   **`/api/launch-lab/accept-upsell`**: Handles acceptance of 1:1 coaching upsell after Launch Lab purchase.
*   **`/api/launch-lab/confirm-upsell`**: Confirms the upsell payment for 1:1 coaching.
*   **`/api/hit10k/waitlist`**: Manages waitlist signups for How to Hit 10k.
*   **`/api/admidash/auth`**: Password verification for the Admin Command Centre dashboard.
*   **`/api/vdpb/auth`**: Password verification for the Viral Digital Product Builder.
*   **`/api/ana-offer-genius/match`**: AI-powered offer matching endpoint for the Ana Offer Genius tool.
*   **`/api/admidash/metrics`**: Aggregates complex sales, lead, and abandonment data across all funnels for real-time reporting.
*   **`/api/admidash/tables`**: A dynamic explorer providing live row counts and definitions for the Supabase schema.
*   **`/api/admidash/kit/sync`**: Synchronizes filtered user segments directly into the Kit (ConvertKit) mailing infrastructure with tagging.
*   **`/api/admidash/kit/tags`**: Manages and creates Kit tags directly from the Command Centre.
*   **`/api/first100/create-payment-intent`**: Creates Stripe PaymentIntents and pending leads for the First 100 Subscribers native checkout.
*   **`/api/first100/ confirm-payment`**: Confirms Stripe payments and fulfills the First 100 Subscribers checkout process.
*   **`/api/unstuck/create-payment-intent`**: Creates Stripe PaymentIntents and pending leads for the Unstuck to Published checkout. Supports optional SDT order bump (+$47).
*   **`/api/unstuck/confirm-payment`**: Confirms Stripe payments for Unstuck to Published. If SDT bump purchased, provisions 400 credits into `show_dont_tell_users` (tops up existing accounts or creates new token).
*   **`/api/viral-digital-product-finder`**: Accepts accomplishments, passions, and profession via POST. Uses Gemini 3 Flash (with thinking, budget 8192) to generate viral digital product ideas organized into route buckets with concepts, pricing, titles, and market research.
*   **`/api/will-it-sell`**: Accepts a product idea, optional price, and optional niche via POST. Uses Gemini 3 Flash (with thinking, budget 8192) to score the idea against Ana's Viral Product Formula across 9 weighted criteria. Returns overall score, verdict, per-criterion breakdown, and actionable improvements.
*   **`/api/offer-clarity/create-payment-intent`**: Creates a Stripe PaymentIntent (with `setup_future_usage: 'off_session'` so the card is reusable for the coaching upsell), get-or-creates the Stripe customer, computes total with bundle short-circuit (bundle covers all 3 individual bumps), and inserts a pending lead row into `offer_clarity_leads`.
*   **`/api/offer-clarity/confirm-payment`**: Confirms the Offer Clarity payment, marks the lead `is_paid: true`, and persists which bumps were purchased (Launch Stack, Hooks, Offer Genius, or Bundle).
*   **`/api/offer-clarity/get-lead-status`**: Returns lead and payment status for the Offer Clarity Sprint (used by the success page to render the right delivery cards).
*   **`/api/offer-clarity/coaching-upsell/create-payment-intent`**: One-click off-session charge against the saved card for the $797 coaching upsell. Falls back to a fresh Elements collection if no card is on file. Updates the existing `offer_clarity_leads` row with the upsell amount.

### Supabase Tables

*   **leads:** Primary lead capture table for general site traffic.
*   **leads_bootcamp_brands:** Stores data for the Build to profit workshop.
*   **launch_lab_leads:** Stores data and order bumps for the 10k Launch Lab.
*   **hit10k_leads:** Stores data for the How to Hit 10k Challenge.
*   **genius_ideas_leads:** Stores data for the 100 Genius Ideas funnel.
*   **show_dont_tell_users:** Manages tokens, expiration dates, and credits for the Thumbnail Generator.
*   **ana_ai_leads:** Stores leads and usage data for the free Ana AI Offer Flow tool.
*   **first100_leads:** Stores data and payment status for the First 100 Paid Subscribers funnel.
*   **unstuck_leads:** Stores leads, payment data, and order bump selections for Unstuck to Published.
*   **build_your_substack_leads:** Stores leads, payment data, and order bump selections for Build Your Substack. Mirrors the unstuck_leads structure.
*   **creator_bundle_leads:** Stores leads, payment data, and Launch Stack bump selection for the Creator Bundle.
*   **offer_clarity_leads:** Stores leads, all 3 bump flags (Launch Stack, Hooks, Offer Genius) + bundle flag, coaching upsell flag, payment lifecycle, pricing snapshot in cents (`base_price_cents`, `bumps_price_cents`, `coaching_price_cents`, `total_paid_cents`), and marketing attribution (utm_*, referrer_url, user_agent, ip_address) for the Offer Clarity Sprint funnel.

---

## 9. Third-Party Integrations & Tracking

*   **Facebook (Meta) Pixel**
    *   Tracks page views and triggers 'Lead' or 'Purchase' events across all active funnels.
    *   (`ID: 925153509944098`)
*   **Google Analytics**
    *   Global traffic and behavior tracking.
    *   (`ID: G-CC592MQH07`)
*   **PurchaseNotification (in-house Proof clone)**
    *   In-house React component (`src/components/PurchaseNotification.tsx`) that simulates social-proof popups in the bottom-left corner with a cosmetic 'verified by Proof' link. Mounted per-page on funnels that want it (Offer Clarity, Build Your Substack, etc.). Replaces the previous `cdn.useproof.com` integration.

---

## 10. Funnel Architecture & Pricing Map

Complete mapping of every sales funnel with core products, order bumps, bundle options, and upsells. Use this to design new funnels that follow proven patterns.

---

## 11. Environment Variables & Core Services

Every production deployment relies on the following backend services and environment variables (defined in `.env.local`):

### Supabase (Database & Auth)

*   **`NEXT_PUBLIC_SUPABASE_URL`**: Base API route.
*   **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**: Client-side query key.
*   **`SUPABASE_SERVICE_ROLE_KEY`**: Server-side admin key for backend webhooks.

### Stripe (Payments)

*   **`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`**: Mounts Stripe Elements on frontend checkouts.
*   **`STRIPE_SECRET_KEY`**: Server-side key for creating PaymentIntents and Sessions.
*   **`STRIPE_WEBHOOK_SECRET`**: Validates webhook authenticity to fulfill products safely.

### Google Gemini (AI Engine)

*   **`NEXT_PUBLIC_GEMINI_API_KEY`**: Invokes the `gemini-2.5-flash` environment for the "Show Don't Tell" thumbnail generator.

### Kit Integration

*   **`KIT_API_KEY`**: Secret key for authenticating with the Kit (ConvertKit) V4 API.
*   **`KIT_BASE_URL`**: Base endpoint for Kit API services (Defaults to `api.kit.com/v4/`).

### Application Passwords

*   **`ADMIDASH_PASSWORD`**: Protects the central Command Centre dashboard.
*   **`VDPB_PASSWORD`**: Protects the Viral Digital Product Builder tool.
*   **`LAUNCH_STACK_PASSWORD`**: Protects the legacy Launch Stack dashboard.

### Offer Clarity Sprint Pricing

*   **`NEXT_PUBLIC_OFFER_CLARITY_PRICE`**: Base price for the Offer Clarity Sprint course (cents). Default 9700 = $97.
*   **`NEXT_PUBLIC_OFFER_CLARITY_BUMP_LAUNCH_STACK_PRICE`**: Launch Stack order bump price (cents). Default 6700 = $67.
*   **`NEXT_PUBLIC_OFFER_CLARITY_BUMP_HOOKS_PRICE`**: Hooks That Stop the Scroll order bump price (cents). Default 4700 = $47.
*   **`NEXT_PUBLIC_OFFER_CLARITY_BUMP_OFFER_GENIUS_PRICE`**: Offer Genius order bump price (cents). Default 3700 = $37.
*   **`NEXT_PUBLIC_OFFER_CLARITY_BUMP_BUNDLE_DISCOUNT_PCT`**: Discount percentage for the all-3 bundle (0–1). Default 0.20 (20% off).
*   **`NEXT_PUBLIC_OFFER_CLARITY_BUMP_BUNDLE_PRICE`**: Optional explicit override for the bundle price (cents). When unset, computed as sum × (1 − discount_pct).
*   **`NEXT_PUBLIC_OFFER_CLARITY_COACHING_PRICE`**: 1:1 coaching upsell price (cents). Default 79700 = $797.
*   **`NEXT_PUBLIC_OFFER_CLARITY_COACHING_RETAIL_PRICE`**: Strikethrough retail price for the coaching upsell (cents). Default 99700 = $997.
*   **`NEXT_PUBLIC_LAUNCH_STACK_PASSWORD`**: Master password (`mellon_hwg`) revealed on the Offer Clarity success page for Launch Stack and Offer Genius access.
*   **`NEXT_PUBLIC_OFFER_CLARITY_COURSE_URL`**: Teachable (or equivalent) course access URL surfaced on the success page.
*   **`NEXT_PUBLIC_OFFER_CLARITY_COACHING_BOOKING_URL`**: Calendly URL for booking the 1:1 coaching session after the upsell is accepted.

### Global Configurations

*   **`NEXT_PUBLIC_APP_URL`**: Used for redirect URLs, webhooks, and SEO metadata.

---
