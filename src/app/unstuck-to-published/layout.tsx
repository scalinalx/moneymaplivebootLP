import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Unstuck to Published: Build Your Substack the Right Way From Day One",
    description: "You'll walk in with an idea and walk out with a positioned publication, a structured first article, and a monetization strategy — built live, with two creators who've done it.",
    openGraph: {
        title: "Unstuck to Published: Build Your Substack the Right Way From Day One",
        description: "You'll walk in with an idea and walk out with a positioned publication, a structured first article, and a monetization strategy.",
        url: '/unstuck-to-published',
        siteName: 'How We Grow',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Unstuck to Published: Build Your Substack the Right Way From Day One",
        description: "You'll walk in with an idea and walk out with a positioned publication, a structured first article, and a monetization strategy.",
        creator: '@howwegrow',
    },
};

export default function UnstuckToPublishedLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
