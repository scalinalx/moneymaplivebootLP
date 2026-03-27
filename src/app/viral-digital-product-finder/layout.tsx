import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Ana's Viral Digital Product Finder | Free AI Tool",
    description: "Tell me about yourself and I'll give you hyper-specific product ideas that will go viral and actually get sales. Free AI-powered tool by Ana Calin.",
    openGraph: {
        title: "Ana's Viral Digital Product Finder",
        description: "Tell me about yourself and I'll give you hyper-specific product ideas that will go viral and actually get sales. Free AI-powered tool.",
        url: '/viral-digital-product-finder',
        siteName: 'Build To Profit',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Ana's Viral Digital Product Finder",
        description: "Tell me about yourself and I'll give you hyper-specific product ideas that will go viral and actually get sales. Free AI-powered tool.",
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
