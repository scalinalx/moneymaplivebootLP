import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn('STRIPE_SECRET_KEY is not set. Using placeholder for build.');
}

export const stripe = new Stripe(stripeSecretKey || 'sk_test_placeholder', {
  apiVersion: '2025-05-28.basil',
  typescript: true,
});

// Price in cents. Prefer .env WORKSHOP_PRICE; fallback to 59700 ($597)
const parsedPrice = Number.parseInt(process.env.WORKSHOP_PRICE || '', 10);
export const WORKSHOP_PRICE = Number.isFinite(parsedPrice) ? parsedPrice : 59700;
