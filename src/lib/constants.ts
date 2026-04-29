// Application Pricing
export const WORKSHOP_PRICE = Number.parseInt(process.env.WORKSHOP_PRICE || '59700', 10);
export const BUNDLE_PRICE = Number.parseInt(process.env.BUNDLE_PRICE || '79700', 10);

// 100 Genius Ideas Pricing
export const GENIUS_IDEAS_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_GENIUS_IDEAS_PRICE || '2700', 10); // Default to $27
export const GENIUS_IDEAS_BUMP_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_GENIUS_IDEAS_BUMP_PRICE || '1700', 10);
export const GENIUS_IDEAS_BUMP2_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_GENIUS_IDEAS_BUMP2_PRICE || '8700', 10);

// Offer Clarity Sprint Pricing
export const OFFER_CLARITY_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_OFFER_CLARITY_PRICE || '9700', 10);

// Order bumps — sale prices
export const OFFER_CLARITY_BUMP_LAUNCH_STACK_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_OFFER_CLARITY_BUMP_LAUNCH_STACK_PRICE || '6700', 10);  // Launch Stack — $67
export const OFFER_CLARITY_BUMP_HOOKS_PRICE         = Number.parseInt(process.env.NEXT_PUBLIC_OFFER_CLARITY_BUMP_HOOKS_PRICE || '4700', 10);         // Hooks That Stop The Scroll — $47
export const OFFER_CLARITY_BUMP_OFFER_GENIUS_PRICE  = Number.parseInt(process.env.NEXT_PUBLIC_OFFER_CLARITY_BUMP_OFFER_GENIUS_PRICE || '3700', 10);  // Offer Genius — $37

// Order bumps — retail prices (used for strikethrough "save $X" UI)
export const OFFER_CLARITY_BUMP_LAUNCH_STACK_RETAIL_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_OFFER_CLARITY_BUMP_LAUNCH_STACK_RETAIL_PRICE || '9700', 10);  // $97
export const OFFER_CLARITY_BUMP_HOOKS_RETAIL_PRICE         = Number.parseInt(process.env.NEXT_PUBLIC_OFFER_CLARITY_BUMP_HOOKS_RETAIL_PRICE || '6700', 10);         // $67
export const OFFER_CLARITY_BUMP_OFFER_GENIUS_RETAIL_PRICE  = Number.parseInt(process.env.NEXT_PUBLIC_OFFER_CLARITY_BUMP_OFFER_GENIUS_RETAIL_PRICE || '5700', 10);  // $57

// Bundle = explicit env override if set, otherwise sum of individual bump prices × (1 − discount %).
// This way, when you change individual bump prices via env vars,
// the bundle auto-recomputes — no need to also update the bundle price.
const _BUMP_BUNDLE_DISCOUNT_PCT = Number.parseFloat(process.env.NEXT_PUBLIC_OFFER_CLARITY_BUMP_BUNDLE_DISCOUNT_PCT || '0.20'); // 20% off by default
const _BUMP_SUM =
  OFFER_CLARITY_BUMP_LAUNCH_STACK_PRICE +
  OFFER_CLARITY_BUMP_HOOKS_PRICE +
  OFFER_CLARITY_BUMP_OFFER_GENIUS_PRICE;
const _BUMP_BUNDLE_COMPUTED = Math.max(
  0,
  Math.round(_BUMP_SUM * (1 - _BUMP_BUNDLE_DISCOUNT_PCT)),
);
export const OFFER_CLARITY_BUMP_BUNDLE_PRICE = process.env.NEXT_PUBLIC_OFFER_CLARITY_BUMP_BUNDLE_PRICE
  ? Number.parseInt(process.env.NEXT_PUBLIC_OFFER_CLARITY_BUMP_BUNDLE_PRICE, 10)
  : _BUMP_BUNDLE_COMPUTED;
// Bundle retail (the "was" / strikethrough) = sum of individual sale prices.
export const OFFER_CLARITY_BUMP_BUNDLE_RETAIL_PRICE = _BUMP_SUM;
// Post-purchase upsell — 1:1 Coaching with Ana ($797 reduced from $997)
export const OFFER_CLARITY_COACHING_PRICE        = Number.parseInt(process.env.NEXT_PUBLIC_OFFER_CLARITY_COACHING_PRICE || '79700', 10);         // $797
export const OFFER_CLARITY_COACHING_RETAIL_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_OFFER_CLARITY_COACHING_RETAIL_PRICE || '99700', 10);  // $997 retail

// Hit 10k Workshop Prices
export const HIT10K_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_HIT10K_PRICE || '9700', 10);
export const HIT10K_BUMP_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_HIT10K_BUMP_PRICE || '2700', 10);
export const HIT10K_BUMP2_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_HIT10K_BUMP2_PRICE || '6900', 10);

// First 100 Paid Subscribers Pricing (server-only — no NEXT_PUBLIC_ to prevent client exposure)
export const FIRST100_PRICE = Number.parseInt(process.env.FIRST100_PRICE || '9700', 10);
export const FIRST100_BUMP_PRICE = Number.parseInt(process.env.FIRST100_BUMP_PRICE || '2700', 10); // Genius Offers
export const FIRST100_BUMP2_PRICE = Number.parseInt(process.env.FIRST100_BUMP2_PRICE || '2700', 10); // Hooks
export const FIRST100_BUMP3_PRICE = Number.parseInt(process.env.FIRST100_BUMP3_PRICE || '6700', 10); // Launch Stack
export const FIRST100_BUNDLE_PRICE = Number.parseInt(process.env.FIRST100_BUNDLE_PRICE || '9700', 10); // Bundle

// Unstuck to Published Pricing (server-only — no NEXT_PUBLIC_ to prevent client exposure)
export const UNSTUCK_PRICE = Number.parseInt(process.env.UNSTUCK_PRICE || '9700', 10); // $97
export const UNSTUCK_SDT_BUMP_PRICE = Number.parseInt(process.env.UNSTUCK_SDT_BUMP_PRICE || '4700', 10); // $47 Show Don't Tell bump
export const UNSTUCK_SDT_BUMP_CREDITS = 400; // 400 SDT credits for the $47 bump
export const UNSTUCK_GENIUS_BUMP_PRICE = Number.parseInt(process.env.UNSTUCK_GENIUS_BUMP_PRICE || '2700', 10); // $27 100 Genius Launch Ideas PDF
export const UNSTUCK_HOOKS_BUMP_PRICE = Number.parseInt(process.env.UNSTUCK_HOOKS_BUMP_PRICE || '2700', 10); // $27 Hooks That Stop the Scroll
export const UNSTUCK_BUNDLE_PRICE = Number.parseInt(process.env.UNSTUCK_BUNDLE_PRICE || '6900', 10); // $69 All 3 bumps bundle (save $32)

// Creator Bundle Pricing (standalone bundle page — server-only)
export const CREATOR_BUNDLE_PRICE = Number.parseInt(process.env.CREATOR_BUNDLE_PRICE || '6900', 10); // $69
export const CREATOR_BUNDLE_BUMP_PRICE = Number.parseInt(process.env.CREATOR_BUNDLE_BUMP_PRICE || '6700', 10); // $67 Launch Stack bump

// Word Into Money Pricing
export const WIM_PRICE = Number.parseInt(process.env.WIM_PRICE || '9700', 10);
export const WIM_BUMP1_PRICE = Number.parseInt(process.env.WIM_BUMP1_PRICE || '2700', 10); // Hooks That Stop the Scroll
export const WIM_BUMP2_PRICE = Number.parseInt(process.env.WIM_BUMP2_PRICE || '2700', 10); // 100 Genius Launch Ideas
export const WIM_BUMP3_PRICE = Number.parseInt(process.env.WIM_BUMP3_PRICE || '6700', 10); // Launch Stack
export const WIM_BUNDLE_PRICE = Number.parseInt(process.env.WIM_BUNDLE_PRICE || '6900', 10); // All 3 bundled
export const WIM_UPSELL1_PRICE = Number.parseInt(process.env.WIM_UPSELL1_PRICE || '9700', 10); // First 100 Paid Subscribers
export const WIM_UPSELL2_PRICE = Number.parseInt(process.env.WIM_UPSELL2_PRICE || '59700', 10); // 10K Launch Lab
export const WIM_UPSELL3_PRICE = Number.parseInt(process.env.WIM_UPSELL3_PRICE || '99700', 10); // 1:1 Coaching

// Launch Lab Pricing
export const LAUNCHLAB_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_LAUNCHLAB_PRICE || '59700', 10);
export const LAUNCHLAB_BUMP_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_LAUNCHLAB_BUMP_PRICE || '4700', 10);
export const LAUNCHLAB_BUMP2_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_LAUNCHLAB_BUMP2_PRICE || '9700', 10);
export const LAUNCHLAB_COACHING_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_LAUNCHLAB_COACHING_PRICE || '74700', 10);
