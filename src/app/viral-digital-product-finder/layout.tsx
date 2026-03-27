import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Ana's Viral Digital Product Finder | Free AI Tool",
    description: "Tell me about yourself and I'll give you hyper-specific product ideas that will go viral and actually get sales. Free AI-powered tool by Ana Calin.",
    openGraph: {
        title: "Ana's Viral Digital Product Finder",
        description: "Tell me about yourself and I'll give you hyper-specific product ideas that will go viral and actually get sales. Free AI-powered tool.",
        url: '/viral-digital-product-finder',
        siteName: 'Build To Profit',
        images: [
            {
                url: '/imgs/viral-digital-product-finder/og-viral-product-finder.png',
                width: 1200,
                height: 630,
                alt: "Ana's Viral Digital Product Finder",
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Ana's Viral Digital Product Finder",
        description: "Tell me about yourself and I'll give you hyper-specific product ideas that will go viral and actually get sales. Free AI-powered tool.",
        images: ['/imgs/viral-digital-product-finder/og-viral-product-finder.png'],
        creator: '@howwegrow',
    },
};

export default function ViralDigitalProductFinderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
