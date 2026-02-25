# Monetise Substack Ecosystem Map

This document serves as a comprehensive map of all URLs, products, price points, freebies, and backend configurations active on the `https://www.monetisesubstack.com` domain.

> **Note:** This file is auto-generated from `src/data/ecosystem.json`. Do not edit this markdown file directly. Instead, update the JSON file and run `npm run generate:docs`.

## 1. Core Educational Programs & Workshops

*   **Build to Profit Live Workshop**: **$497** (`WORKSHOP_PRICE` in `.env.local`)
    *   The flagship live workshop offering, teaching foundational monetization strategies.
    *   *Links:* [Sales](/landing) | [Checkout](/checkout-step1) | [Upsell](/upsell) | [Success](/success)
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

### The Launch Stack

A comprehensive launch project management tool or dashboard.
*   **Access/Type:** Password Protected (Requires the master password `mellon_hwg`, defined in `.env.local`). Also sold as an Order Bump (usually **$67 - $69** value).
*   **App URL:** `/launch-stack`

---

## 4. Bumps & Upsells

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

---

## 5. Success & Thank You Pages (Fulfillment)

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

---

## 6. Additional Legal & Utility Pages

*   **Lead Magnet / General Email Capture:** `/lead-collection`
*   **Scarcity Redirect (When time-limited offers expire):** `/offer-expired`
*   **General Post-Lead Action:** `/thankyou`
*   **Terms of Service:** `/terms`
*   **Privacy Policy:** `/privacy`

---

## 7. Backend Infrastructure Overview (API Ecosystem)

These APIs run silently in the background routing traffic and managing state:

### Active Server Routes

*   **`/api/leads`**: Manages lead collection for `/join` funnel.
*   **`/api/webhooks/stripe`**: Listens for successful Stripe `checkout.session.completed` events to fulfill leads, unlock Token IDs, setup credits, and log amounts paid across all tables.
*   **`/api/create-checkout-session`**: Creates Stripe checkout sessions for the Build to Profit funnel.
*   **`/api/show-dont-tell/create-checkout`**: Creates Stripe checkout sessions for the Thumbnail Generator credit packages.
*   **`/api/show-dont-tell/auth`**: Validates Token IDs and returns credit usage.
*   **`/api/show-dont-tell/generate`**: Manages credit deduction and invokes Google's Gemini SDK for thumbnail building.
*   **`/api/[product]/create-payment-intent`**: Routes `launch-lab`, `hit10k`, and `genius-ideas` native Stripe Elements form transactions.

### Supabase Tables

*   **leads_bootcamp_brands:** Stores data for the Build to profit workshop.
*   **launch_lab_leads:** Stores data and order bumps for the 10k Launch Lab.
*   **hit10k_leads:** Stores data for the How to Hit 10k Challenge.
*   **genius_ideas_leads:** Stores data for the 100 Genius Ideas funnel.
*   **show_dont_tell_users:** Manages tokens, expiration dates, and credits for the Thumbnail Generator.
*   **ana_ai_leads:** Stores leads and usage data for the free Ana AI Offer Flow tool.

---

## 8. Third-Party Integrations & Tracking

*   **Facebook (Meta) Pixel**
    *   Tracks page views and triggers 'Lead' or 'Purchase' events across all active funnels.
    *   (`ID: 925153509944098`)
*   **Google Analytics**
    *   Global traffic and behavior tracking.
    *   (`ID: G-CC592MQH07`)
*   **Rewardful Affiliate Tracking**
    *   Tracks affiliate referrals and confirms conversions on the `/success` page.
    *   (`ID: 68083c`)
*   **UseProof**
    *   Provides social proof popups across the site (dynamically injected via `cdn.useproof.com`).

---

## 9. Environment Variables & Core Services

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

### Global Configurations

*   **`NEXT_PUBLIC_APP_URL`**: Used for redirect URLs, webhooks, and SEO metadata.
*   **`NEXT_PUBLIC_LAUNCH_STACK_PASSWORD / LAUNCH_STACK_PASSWORD`**: The master password protecting the `/launch-stack` dashboard (Defaults to `mellon_hwg`).

---
