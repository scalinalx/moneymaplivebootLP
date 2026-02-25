# Monetise Substack Ecosystem Map

This document serves as a comprehensive map of all URLs, products, price points, freebies, and backend configurations active on the `https://www.monetisesubstack.com` domain.

## Core Educational Programs & Workshops

### 1. Build to Profit Live Workshop
The flagship live workshop offering, teaching foundational monetization strategies.
*   **Main Sales Page:** `/landing`
*   **Checkout Entry (Lead Capture):** `/join`
*   **Checkout Steps:**
    *   Step 1 (Payment Info): `/checkout-step1`
    *   Upsell Page: `/upsell`
    *   Success Page: `/success`
*   **Pricing Options:**
    *   Standard Workshop: **$497** (`WORKSHOP_PRICE` in `.env.local`)

### 2. The $10k Launch Lab
A higher-tier workshop focused on consistent 10k launches.
*   **Main Sales Page / Checkout:** `/10k-launch-lab`
*   **Upsell Page:** `/10k-launch-lab-upsell`
*   **Success Page:** `/10k-launch-lab-success`
*   **Pricing Options:**
    *   Core Lab Access: **$597** (`NEXT_PUBLIC_LAUNCHLAB_PRICE`)

### 3. The Money Map
A complete strategy course covering ICP, offer, positioning, segmentation, messaging, and copy. 
*   **Main Sales Page:** `/` (Root domain)
    *   *Note: Currently, the root domain `/` is set in `src/app/page.tsx` to automatically redirect traffic to `/10k-launch-lab`.*
*   **Pricing Options:**
    *   Standalone Value: **$497**

---

## Targeted Mini-Workshops & Idea Products

### 4. How to Hit 10k Workshop
A lower barrier-to-entry challenge or mini-workshop.
*   **Main Sales Page / Waitlist / Checkout:** `/how-to-hit-10k`
*   **Success Page:** `/hit-10k-success`
*   **Pricing Options:**
    *   Core Workshop: **$97** (`NEXT_PUBLIC_HIT10K_PRICE`)

### 5. 100 Genius Launch Ideas
A digital product detailing successful launch ideas and frameworks.
*   **Main Sales Page / Checkout:** `/100-genius-launch-ideas`
*   **Success Page:** `/100-genius-launch-ideas/success`
*   **Pricing Options:**
    *   Core Ideas Book/Guide: **$27** (`NEXT_PUBLIC_GENIUS_IDEAS_PRICE`)

---

## Order Bumps (In-Checkout Add-ons)
These are lower-ticket items offered directly on the checkout pages before the user completes their initial purchase.

*   **1. "Hooks That Stop the Scroll"**
    *   **Offered On:** The $10k Launch Lab (`/10k-launch-lab`), How to Hit 10k Workshop (`/how-to-hit-10k`)
    *   **Price:** **$27** (`NEXT_PUBLIC_LAUNCHLAB_BUMP_PRICE`, `NEXT_PUBLIC_HIT10K_BUMP_PRICE`)
    *   **Details:** A vault of high-converting headline frameworks and opening loops designed to capture attention instantly.
*   **2. "The 60-Minute Launch Calendar"**
    *   **Offered On:** The $10k Launch Lab (`/10k-launch-lab`)
    *   **Price:** **$69** (`NEXT_PUBLIC_LAUNCHLAB_BUMP2_PRICE`)
    *   **Details:** The exact day-by-day Notion templates used to manage 6-figure launches without burnout.
*   **3. "CUSTOM CODED: OfferGenius™ AI Builder"**
    *   **Offered On:** 100 Genius Launch Ideas (`/100-genius-launch-ideas`)
    *   **Price:** **$37** (`NEXT_PUBLIC_GENIUS_IDEAS_BUMP_PRICE`)
    *   **Details:** A custom AI tool that automatically perfectly customizes an offer for a specific audience to eliminate checkout hesitation.
*   **4. "CUSTOM TRAINED: 'Lazy Launch' AI EMAIL WRITER" (The Launch Stack)**
    *   **Offered On:** 100 Genius Launch Ideas (`/100-genius-launch-ideas`)
    *   **Price:** **$67** (`NEXT_PUBLIC_GENIUS_IDEAS_BUMP2_PRICE`)
    *   **Details:** A custom-trained AI system pre-loaded with psychological email sequences designed to sell without sounding "salesy".

---

## Upsells & Bundles (Post-Checkout or Cross-Sells)
These are higher-ticket supplementary items offered either immediately after a core purchase or via dedicated sales prompts.

*   **1. The Money Map Bundle**
    *   **Offered On:** Build to Profit Live Workshop (`/upsell`)
    *   **Price Added:** **+$300** (`BUNDLE_PRICE` = $797 total)
    *   **Details:** Bundles the entry-level live workshop with the comprehensive 'Money Map' strategy course normally valued at $497.
*   **2. 1:1 Sales Coaching Session with Ana**
    *   **Offered On:** The $10k Launch Lab (`/10k-launch-lab-upsell`)
    *   **Price:** **$747** (`NEXT_PUBLIC_LAUNCHLAB_COACHING_PRICE`)
    *   **Details:** A direct, high-touch 1:1 strategy and group coaching add-on to maximize the impact of the launch templates.

---

## Success & Thank You Pages (Fulfillment)
These pages handle the post-purchase experience, dynamic rendering of purchased bumps, and direct access links.

*   **1. General Build to Profit Success (`/success`)**
    *   **Redirect:** Displays a 3-second countdown before automatically redirecting the user to a Google Doc containing instructions to join a private Substack community.
    *   **Content:** Confirms the order, details next steps (check email, calendar reminders), and lists bonuses (Resource Pack, Recordings).
*   **2. 10k Launch Lab Success (`/10k-launch-lab-success`)**
    *   **Content:** Welcomes users to the 10k Launch Lab. Instructs them to check email and start Day 1 immediately.
    *   **Dynamic Bump/Upsell Rendering:**
        *   If Upsell bought: Displays a block to book the 1:1 Coaching session via a `calendly.com/anacalin/30min` link.
        *   If Bump 1 bought: Instructs the user to access "Hooks That Stop the Scroll" in their dashboard.
        *   If Bump 2 bought: Instructs the user to view their Notion "60-Minute Launch Calendar" templates.
*   **3. How to Hit 10k Success (`/hit-10k-success`)**
    *   **Content:** Welcomes users to the "Hit Your First $10,000 Month" course. Gives a direct link to a YouTube video.
    *   **Dynamic Bump Rendering:**
        *   If Bump bought: Unlocks a high-visibility block for "Hooks That Stop the Scroll!" linking directly to a public Notion page (`anabubolea.notion.site/Hooks-That-Stop...`).
*   **4. 100 Genius Ideas Success (`/100-genius-launch-ideas/success`)**
    *   **Content:** Highlights an urgent "Do Not Close This Page" banner. Provides a direct local download link to the `100-Genius-Offers-Sell-2026.pdf` file.
    *   **Dynamic Bump Rendering:**
        *   If Bump 1 bought: Shows the OfferGenius block with a direct link to the `/ana-offer-genius` protected app.
        *   If Bump 2 bought: Shows the Launch Stack block, revealing the password (`mellon_hwg`) required to access `/launch-stack` and links directly to it.
*   **5. Show Don't Tell Success (`/show-dont-tell/success`)**
    *   **Content:** A secure page that extracts the newly created programmatic `token_id` from the Stripe redirect URL (e.g. `SDT-XXXXXXXXXXXX`) and displays it in large text.
    *   **Features:** Provides a one-click "Copy to Clipboard" button and directs the user to immediately go to `/show-dont-tell` to login with their token.

---

## AI Software & Custom Tools (Freebies & Paid Add-ons)

### 6. Show Don't Tell - Viral Thumbnail Generator
A custom-coded AI agent connecting to Nano Banana (Gemini 2.5 Flash Image) to dynamically generate scroll-stopping brand thumbnails. Protected by a `TokenID` access model.
*   **Main App URL (Login/Generator):** `/show-dont-tell`
*   **Purchase Packages Page:** `/show-dont-tell/purchase`
*   **Success & Access Key Page:** `/show-dont-tell/success`
*   **Pricing Packages:**
    *   **Starter Package:** **$19.97** (Grants 200 Image Credits / ~100 Generations)
    *   **Pro Creator Package (“Best Value”):** **$247.00** (Grants 2,500 Image Credits / ~1250 Generations)

### 7. Ana Ai Offer Flow
An interactive AI tool designed to clarify and flow out product offerings.
*   **App URL:** `/ana-ai-offer-flow`
*   **Access:** Open / Freebie tool

### 8. Ana Offer Genius
An AI-powered builder that helps users craft high-converting offers.
*   **App URL:** `/ana-offer-genius`
*   **Access:** Initially internal/gated; sold as an Order Bump on various funnels (usually **$27 - $37** value).

### 9. The Launch Stack
A comprehensive launch project management tool or dashboard.
*   **App URL:** `/launch-stack`
*   **Access Requirements:** Password Protected (Requires the master password `mellon_hwg`, defined in `.env.local`). Also sold as an Order Bump (usually **$67 - $69** value).

---

## Additional Legal & Utility Pages

*   **Lead Magnet / General Email Capture:** `/lead-collection`
*   **Scarcity Redirect (When time-limited offers expire):** `/offer-expired`
*   **General Post-Lead Action:** `/thankyou`
*   **Terms of Service:** `/terms`
*   **Privacy Policy:** `/privacy`

---

## Backend Infrastructure Overview (API Ecosystem)

These APIs run silently in the background routing traffic and managing state:
*   **/api/leads**: Manages lead collection for `/join` funnel.
*   **/api/webhooks/stripe**: Listens for successful Stripe `checkout.session.completed` events to fulfill leads, unlock Token IDs, setup credits, and log amounts paid across all tables.
*   **/api/create-checkout-session**: Creates Stripe checkout sessions for the Build to Profit funnel.
*   **/api/show-dont-tell/create-checkout**: Creates Stripe checkout sessions for the Thumbnail Generator credit packages.
*   **/api/show-dont-tell/auth**: Validates Token IDs and returns credit usage.
*   **/api/show-dont-tell/generate**: Manages credit deduction and invokes Google's Gemini SDK for thumbnail building.
*   **/api/[product]/create-payment-intent**: Routes `launch-lab`, `hit10k`, and `genius-ideas` native Stripe Elements form transactions.

### Underlying Database Tables (Supabase)
*   **leads_bootcamp_brands:** Stores data for the Build to profit workshop.
*   **launch_lab_leads:** Stores data and order bumps for the 10k Launch Lab.
*   **hit10k_leads:** Stores data for the How to Hit 10k Challenge.
*   **genius_ideas_leads:** Stores data for the 100 Genius Ideas funnel.
*   **show_dont_tell_users:** Manages tokens, expiration dates, and credits for the Thumbnail Generator.
