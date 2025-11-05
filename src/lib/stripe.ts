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
