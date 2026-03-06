import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Your First 100 Paid Subscribers — Without Going Viral",
    description: "The exact conversion framework to turn free readers into paying subscribers — even with a tiny list. 90-minute workshop, instant access.",
    openGraph: {
        title: "Your First 100 Paid Subscribers — Without Going Viral",
        description: "The exact conversion framework to turn free readers into paying subscribers — even with a tiny list.",
        url: '/first-100-paid-subscribers',
        siteName: 'How We Grow',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Your First 100 Paid Subscribers — Without Going Viral",
        description: "The exact conversion framework to turn free readers into paying subscribers — even with a tiny list.",
        creator: '@howwegrow',
    },
};

export default function First100Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
