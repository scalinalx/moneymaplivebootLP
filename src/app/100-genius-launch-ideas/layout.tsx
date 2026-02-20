import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "100 Genius Offers That Sell in 2026",
    description: "Skip 6 months of confusion. This is the Immediate Revenue Infrastructure you need to go from $0 to launch-ready in under 60 minutes.",
    openGraph: {
        title: "100 Genius Offers That Sell in 2026",
        description: "Skip 6 months of confusion. The immediate revenue infrastructure you need to go from $0 to launch-ready in under 60 minutes.",
        url: '/100-genius-launch-ideas',
        siteName: 'Build To Profit',
        images: [
            {
                url: '/imgs/100-genius-offers/bundle_image.png',
                width: 1200,
                height: 630,
                alt: '100 Genius Offers Bundle',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "100 Genius Offers That Sell in 2026",
        description: "Skip 6 months of confusion. The immediate revenue infrastructure you need to go from $0 to launch-ready in under 60 minutes.",
        images: ['/imgs/100-genius-offers/bundle_image.png'],
        creator: '@howwegrow',
    },
};

export default function GeniusLaunchIdeasLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
