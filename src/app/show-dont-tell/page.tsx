import React from 'react';
import App from '@/components/show-dont-tell/App';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "SHOW DON'T TELL | Convert Boring Text to Engaging Stories",
    description: "Transform your bland, tell-heavy copy into vivid, show-driven stories that captivate your audience.",
    openGraph: {
        title: "SHOW DON'T TELL | Convert Boring Text to Engaging Stories",
        description: "Transform your bland, tell-heavy copy into vivid, show-driven stories that captivate your audience.",
    },
    twitter: {
        card: "summary_large_image",
        title: "SHOW DON'T TELL | Convert Boring Text to Engaging Stories",
        description: "Transform your bland, tell-heavy copy into vivid, show-driven stories that captivate your audience.",
    },
};

export default function ShowDontTellPage() {
    return (
        <App />
    );
}
