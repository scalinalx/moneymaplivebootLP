import React from 'react';
import type { Metadata } from 'next';
import GetFeaturedLanding from './GetFeaturedLanding';

// Absolute URLs on purpose — see src/app/bootcamp/page.tsx for why metadataBase
// can't be trusted for link-preview images.
const SITE = 'https://www.monetisesubstack.com';
const TITLE = 'Get Featured: Forbes, Trade Press and Podcasts, Without Paying For It';
const DESCRIPTION =
  'A short, free course from Ana Calin on getting your name into Forbes, trade press and podcasts, and turning each feature into readers you can actually reach. Join the waitlist for a 48-hour head start.';
const OG_IMAGE = `${SITE}/imgs/get-featured/og.jpg`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['get featured', 'Forbes', 'PR for creators', 'media features', 'podcast guest', 'Ana Calin', 'How We Grow'],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE}/get-featured`,
    siteName: 'How We Grow',
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Get Featured, with Ana Calin' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
    creator: '@howwegrow',
  },
};

export default function GetFeaturedPage() {
  return <GetFeaturedLanding />;
}
