// Application Pricing
export const WORKSHOP_PRICE = Number.parseInt(process.env.WORKSHOP_PRICE || '59700', 10);
export const BUNDLE_PRICE = Number.parseInt(process.env.BUNDLE_PRICE || '79700', 10);

// 100 Genius Ideas Pricing
export const GENIUS_IDEAS_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_GENIUS_IDEAS_PRICE || '2700', 10); // Default to $27
export const GENIUS_IDEAS_BUMP_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_GENIUS_IDEAS_BUMP_PRICE || '1700', 10);
export const GENIUS_IDEAS_BUMP2_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_GENIUS_IDEAS_BUMP2_PRICE || '8700', 10);

// Hit 10k Workshop Prices
export const HIT10K_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_HIT10K_PRICE || '9700', 10);
export const HIT10K_BUMP_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_HIT10K_BUMP_PRICE || '2700', 10);

// Launch Lab Pricing
export const LAUNCHLAB_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_LAUNCHLAB_PRICE || '59700', 10);
export const LAUNCHLAB_BUMP_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_LAUNCHLAB_BUMP_PRICE || '4700', 10);
export const LAUNCHLAB_BUMP2_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_LAUNCHLAB_BUMP2_PRICE || '9700', 10);
export const LAUNCHLAB_COACHING_PRICE = Number.parseInt(process.env.NEXT_PUBLIC_LAUNCHLAB_COACHING_PRICE || '74700', 10);
