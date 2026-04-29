// Application Pricing
export const WORKSHOP_PRICE = Number.parseInt(process.env.WORKSHOP_PRICE || '59700', 10);
export const BUNDLE_PRICE = Number.parseInt(process.env.BUNDLE_PRICE || '79700', 10);

// 100 Genius Ideas Pricing
export const GENIUS_IDEAS_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_GENIUS_IDEAS_PRICE || '2700', 10); // Default to $27
export const GENIUS_IDEAS_BUMP_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_GENIUS_IDEAS_BUMP_PRICE || '1700', 10);
export const GENIUS_IDEAS_BUMP2_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_GENIUS_IDEAS_BUMP2_PRICE || '8700', 10);

// Offer Clarity Sprint Pricing
export const OFFER_CLARITY_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_OFFER_CLARITY_PRICE || '9700', 10);
// Order bumps (single-pick OR bundle)
export const OFFER_CLARITY_BUMP_LAUNCH_STACK_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_OFFER_CLARITY_BUMP_LAUNCH_STACK_PRICE || '6700', 10);  // Launch Stack — $67
export const OFFER_CLARITY_BUMP_HOOKS_PRICE         = Number.parseInt(process.env.NEXT_PUBLIC_OFFER_CLARITY_BUMP_HOOKS_PRICE || '2700', 10);         // Hooks That Stop The Scroll — $27
export const OFFER_CLARITY_BUMP_OFFER_GENIUS_PRICE  = Number.parseInt(process.env.NEXT_PUBLIC_OFFER_CLARITY_BUMP_OFFER_GENIUS_PRICE || '2700', 10);  // Offer Genius — $27
export const OFFER_CLARITY_BUMP_BUNDLE_PRICE        = Number.parseInt(process.env.NEXT_PUBLIC_OFFER_CLARITY_BUMP_BUNDLE_PRICE || '9700', 10);        // All 3 bundle — $97 (saves $24)
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
