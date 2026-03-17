import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Build Your Substack The Right Way From Day One | Live Workshop",
    description: "Stop overthinking, start publishing. In 60 minutes, walk away with a positioned Substack, a structured first article, and a paywall strategy that converts — built live with two Bestseller creators who've grown 87,000+ subscribers.",
    icons: {
        icon: '/imgs/hwg-icon.webp',
        shortcut: '/imgs/hwg-icon.webp',
        apple: '/imgs/hwg-icon.webp',
    },
    openGraph: {
        title: "Build Your Substack The Right Way From Day One",
        description: "60-minute live workshop: walk in with an idea, walk out with a positioned publication, a structured first article, and a monetization strategy. Led by two Bestseller Substack creators (87,000+ subscribers combined).",
        siteName: 'How We Grow',
        type: 'website',
        url: '/build-your-substack',
        locale: 'en_US',
        images: [
            {
                url: '/imgs/unstuck-to-published/hero1.webp',
                width: 1200,
                height: 630,
                alt: 'Build Your Substack — Live Workshop with Ana & Jessica',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Build Your Substack The Right Way From Day One",
        description: "Stop overthinking. In 60 min, get a positioned publication, first article structure, and paywall strategy — built live with 2 Bestseller creators (87K+ subs). Only 100 seats.",
        images: ['/imgs/unstuck-to-published/hero1.webp'],
        site: '@howwegrow',
        creator: '@howwegrow',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function BuildYourSubstackLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
