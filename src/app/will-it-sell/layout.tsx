import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Will It Sell? | Free AI Product Scoring Tool",
    description: "Get a brutally honest virality score for your digital product idea and a step-by-step fix list to turn it into a no-brainer buy. Free AI-powered tool by Ana Calin.",
    openGraph: {
        title: "Will It Sell? | Free AI Product Scoring Tool",
        description: "Get a brutally honest virality score for your digital product idea and a step-by-step fix list to turn it into a no-brainer buy.",
        url: '/will-it-sell',
        siteName: 'Build To Profit',
        images: [
            {
                url: '/imgs/will-it-sell/og-will-it-sell.png',
                width: 1200,
                height: 630,
                alt: "Will It Sell? - AI Product Scoring Tool",
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Will It Sell? | Free AI Product Scoring Tool",
        description: "Get a brutally honest virality score for your digital product idea and a step-by-step fix list to turn it into a no-brainer buy.",
        images: ['/imgs/will-it-sell/og-will-it-sell.png'],
        creator: '@howwegrow',
    },
};

export default function WillItSellLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
