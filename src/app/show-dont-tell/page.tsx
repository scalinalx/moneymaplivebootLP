import React from 'react';
import App from '@/components/show-dont-tell/App';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "SHOW DON'T TELL | Viral Thumbnail Generator",
    description: "Connect to Nano-Banana (Gemini 2.5 Flash) and generate highly engaging, scroll-stopping visual content and thumbnails for your brand in seconds.",
    openGraph: {
        title: "SHOW DON'T TELL | Viral Thumbnail Generator",
        description: "Generate highly engaging, scroll-stopping visual content and thumbnails for your brand in seconds.",
        images: ['/imgs/heroimgs/sdt-og.jpg'], // Using a general og image format placeholder
    },
    twitter: {
        card: "summary_large_image",
        title: "SHOW DON'T TELL | Viral Thumbnail Generator",
        description: "Generate highly engaging, scroll-stopping visual content and thumbnails for your brand in seconds.",
        images: ['/imgs/heroimgs/sdt-og.jpg'],
    },
};

export default function ShowDontTellPage() {
    return (
        <App />
    );
}
