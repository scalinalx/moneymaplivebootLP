import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Offer Clarity Sprint — Get Way More Money Working Less | Ana Calin",
    description: "How I package expertise into clear offers that subscribers buy from a single email — no calls, no funnels, no ads. Just one clear offer. 198 subscribers became $2,400 in 48 hours. 547 became $3,200 on a first launch. Get the framework, the price architect, the 3-email launch template, and the AI Offer Flow tool — for $97.",
    icons: {
        icon: '/imgs/hwg-icon.webp',
        shortcut: '/imgs/hwg-icon.webp',
        apple: '/imgs/hwg-icon.webp',
    },
    openGraph: {
        title: "The Offer Clarity Sprint — Get Way More Money Working Less",
        description: "Package your expertise into a clear offer subscribers buy from a single email. 5 years of figuring out offers that sell — distilled into one self-paced sprint. Includes the One-Sentence Offer formula, Will-It-Sell stress test, Price Architect, 3-email launch template, and AI Offer Flow tool. $97.",
        siteName: 'How We Grow',
        type: 'website',
        url: '/offer-clarity',
        locale: 'en_US',
        images: [
            {
                url: '/imgs/offer-clarity/hero1.jpeg',
                width: 1376,
                height: 768,
                alt: 'The Offer Clarity Sprint — Ana Calin',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "The Offer Clarity Sprint — Get Way More Money Working Less",
        description: "How to package your expertise into one clear offer subscribers buy from a single email. 198 subs → $2,400. 547 subs → $3,200. Frameworks, price architect, 3-email launch template, AI Offer Flow tool. $97.",
        images: ['/imgs/offer-clarity/hero1.jpeg'],
        site: '@howwegrow',
        creator: '@howwegrow',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function OfferClarityLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
