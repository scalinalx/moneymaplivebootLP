import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn('STRIPE_SECRET_KEY is not set. Using placeholder for build.');
}

export const stripe = new Stripe(stripeSecretKey || 'sk_test_placeholder', {
  apiVersion: '2025-05-28.basil',
  typescript: true,
});

// Prices in cents. Prefer env vars; fall back to sane defaults.
const parsedWorkshop = Number.parseInt(process.env.WORKSHOP_PRICE || '', 10);
export const WORKSHOP_PRICE = Number.isFinite(parsedWorkshop) ? parsedWorkshop : 59700; // $597

const parsedBundle = Number.parseInt(process.env.BUNDLE_PRICE || '', 10);
export const BUNDLE_PRICE = Number.isFinite(parsedBundle) ? parsedBundle : 79700; // $797 default

// Hit 10k Workshop Prices
const parsedHit10k = Number.parseInt(process.env.NEXT_PUBLIC_HIT10K_PRICE || '', 10);
export const HIT10K_PRICE = Number.isFinite(parsedHit10k) ? parsedHit10k : 9700; // $97

const parsedHit10kBump = Number.parseInt(process.env.NEXT_PUBLIC_HIT10K_BUMP_PRICE || '', 10);
export const HIT10K_BUMP_PRICE = Number.isFinite(parsedHit10kBump) ? parsedHit10kBump : 2700; // $27

// 10k Launch Lab Prices
const parsedLaunchLab = Number.parseInt(process.env.NEXT_PUBLIC_LAUNCHLAB_PRICE || '', 10);
export const LAUNCHLAB_PRICE = Number.isFinite(parsedLaunchLab) ? parsedLaunchLab : 59700; // $597

const parsedLaunchLabBump = Number.parseInt(process.env.NEXT_PUBLIC_LAUNCHLAB_BUMP_PRICE || '', 10);
export const LAUNCHLAB_BUMP_PRICE = Number.isFinite(parsedLaunchLabBump) ? parsedLaunchLabBump : 4700; // $47

const parsedLaunchLabBump2 = Number.parseInt(process.env.NEXT_PUBLIC_LAUNCHLAB_BUMP2_PRICE || '', 10);
export const LAUNCHLAB_BUMP2_PRICE = Number.isFinite(parsedLaunchLabBump2) ? parsedLaunchLabBump2 : 9700; // $97

// 10k Launch Lab (1:1 Coaching) Upsell Price
const parsedLaunchLabCoaching = Number.parseInt(process.env.NEXT_PUBLIC_LAUNCHLAB_COACHING_PRICE || '', 10);
export const LAUNCHLAB_COACHING_PRICE = Number.isFinite(parsedLaunchLabCoaching) ? parsedLaunchLabCoaching : 74700; // $747
