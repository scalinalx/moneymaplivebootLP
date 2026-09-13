import React from 'react';
import type { Metadata } from 'next';
import ChallengeLanding from './ChallengeLanding';

// Absolute URLs on purpose — see src/app/bootcamp/page.tsx for why metadataBase
// can't be trusted for link-preview images.
const SITE = 'https://www.monetisesubstack.com';
const TITLE = 'The 30-Day Substack Challenge: One Reader, One Offer, Your First Paying Subscribers';
const DESCRIPTION =
  'Still under 500 subscribers? Thirty days with Ana Calin. A daily lesson, a weekly hot seat, her AI coach in between. You leave with one reader, one priced offer, and your first paying subscribers.';
const OG_IMAGE = `${SITE}/imgs/30-day-substack-challenge/og.jpg`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Substack challenge',
    '30-day challenge',
    'monetize your Substack',
    'first paid subscribers',
    'Substack monetization',
    'newsletter challenge',
    'Ana Calin',
    'How We Grow',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE}/30-day-substack-challenge`,
    siteName: 'How We Grow',
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'The 30-Day Substack Challenge with Ana Calin' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
    creator: '@howwegrow',
  },
};

export default function ThirtyDaySubstackChallengePage() {
  return <ChallengeLanding />;
}
