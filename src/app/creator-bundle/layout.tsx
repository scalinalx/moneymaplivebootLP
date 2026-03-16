import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Creator Launch Kit — 4 Tools That Replace $1,000+ in Courses | How We Grow",
    description: "AI thumbnails, 100 proven launch ideas, scroll-stopping headlines, and an email sequence writer — everything you need to launch and sell on Substack. Used by 10,000+ creators. Just $107.",
    icons: {
        icon: '/imgs/hwg-icon.webp',
        shortcut: '/imgs/hwg-icon.webp',
        apple: '/imgs/hwg-icon.webp',
    },
    openGraph: {
        title: "The Creator Launch Kit — 4 Tools That Replace $1,000+ in Courses",
        description: "AI-powered thumbnails, 100 battle-tested launch ideas, headline frameworks that force clicks, and a launch email writer — bundled at 90% off. Used by 10,000+ Substack creators.",
        siteName: 'How We Grow',
        type: 'website',
        url: '/creator-bundle',
        locale: 'en_US',
        images: [
            {
                url: '/imgs/unstuck-to-published/creatorbundle-hero2.jpeg',
                width: 1200,
                height: 630,
                alt: 'The Creator Launch Kit — 4 Essential Tools for Substack Creators',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "The Creator Launch Kit — 4 Tools That Replace $1,000+ in Courses",
        description: "AI thumbnails + 100 launch ideas + headline swipe file + email sequence writer. Everything to launch on Substack. $107 (89% off).",
        images: ['/imgs/unstuck-to-published/creatorbundle-hero2.jpeg'],
        site: '@howwegrow',
        creator: '@howwegrow',
    },
    robots: { index: true, follow: true },
};

export default function CreatorBundleLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
