import React from 'react';
import type { Metadata } from 'next';
import BootcampLanding from './BootcampLanding';

// Social/share copy is bootcamp-specific (not the generic site card). The image
// is a 1200×630 JPEG cut from the hero for link-preview crawlers; absolute URLs
// come from metadataBase (NEXT_PUBLIC_APP_URL) in the root layout.
const TITLE = 'The 6-Figures Newsletter Bootcamp: Turn What You Know Into Six Figures';
const DESCRIPTION =
  'Seven weeks, live, with Ana. Turn your existing expertise into a six-figure business using email and your newsletter — no audience needed, two hours a day. 30 seats, a real launch done before September 1. Doors close July 14.';
const OG_IMAGE = '/imgs/bootcamp/og.jpg';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'newsletter bootcamp',
    'monetize your newsletter',
    'Substack monetization',
    'six-figure newsletter',
    'sell digital products',
    'launch to a small list',
    'email marketing coaching',
    'Ana Calin',
    'How We Grow',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/bootcamp',
    siteName: 'How We Grow',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'The 6-Figures Newsletter Bootcamp — weekly live hot seats, 50+ hours of workshops, private AI coach, real student results.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description:
      'Seven weeks, live, with Ana. Turn your expertise into a six-figure business using email and your newsletter. 30 seats. Doors close July 14.',
    images: [OG_IMAGE],
    creator: '@howwegrow',
  },
};

export default function BootcampPage() {
  return <BootcampLanding />;
}
