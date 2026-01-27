import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hit Your First $10,000 Month - 60-Minute Live Intensive",
    description: "Join Ana Calin's 60-minute live intensive and discover the exact positioning, pricing, and launch framework to scale your existing offer to $10,000 months.",
    openGraph: {
        title: "Hit Your First $10,000 Month - 60-Minute Live Intensive",
        description: "Join Ana Calin's 60-minute live intensive and discover the exact positioning, pricing, and launch framework to scale your existing offer to $10,000 months.",
        url: '/how-to-hit-10k',
        siteName: 'Build To Profit',
        images: [
            {
                url: '/imgs/how-to-hit-10k/hit10k.webp',
                width: 1200,
                height: 630,
                alt: 'Hit Your First $10,000 Month Workshop',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Hit Your First $10,000 Month - 60-Minute Live Intensive",
        description: "Join Ana Calin's 60-minute live intensive and discover the exact positioning, pricing, and launch framework to scale your existing offer to $10,000 months.",
        images: ['/imgs/how-to-hit-10k/hit10k.webp'],
        creator: '@howwegrow',
    },
};

export default function WorkshopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
