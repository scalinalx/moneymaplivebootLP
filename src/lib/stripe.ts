import Stripe from 'stripe';
import {
  WORKSHOP_PRICE,
  BUNDLE_PRICE,
  HIT10K_PRICE,
  HIT10K_BUMP_PRICE,
  LAUNCHLAB_PRICE,
  LAUNCHLAB_BUMP_PRICE,
  LAUNCHLAB_BUMP2_PRICE,
  LAUNCHLAB_COACHING_PRICE,
  GENIUS_IDEAS_PRICE,
  GENIUS_IDEAS_BUMP_PRICE,
  GENIUS_IDEAS_BUMP2_PRICE
} from './constants';

export {
  WORKSHOP_PRICE,
  BUNDLE_PRICE,
  HIT10K_PRICE,
  HIT10K_BUMP_PRICE,
  LAUNCHLAB_PRICE,
  LAUNCHLAB_BUMP_PRICE,
  LAUNCHLAB_BUMP2_PRICE,
  LAUNCHLAB_COACHING_PRICE,
  GENIUS_IDEAS_PRICE,
  GENIUS_IDEAS_BUMP_PRICE,
  GENIUS_IDEAS_BUMP2_PRICE
};

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn('STRIPE_SECRET_KEY is not set. Using placeholder for build.');
}

export const stripe = new Stripe(stripeSecretKey || 'sk_test_placeholder', {
  apiVersion: '2025-05-28.basil',
  typescript: true,
});
