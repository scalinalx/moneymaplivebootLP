import React from 'react';
import App from '@/components/launch-stack/App';
import { PasswordGate } from '@/components/launch-stack/PasswordGate';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "LaunchStack | High-Converting Email Sequence Generator",
    description: "Generate creative, psychology-backed launch email sequences in seconds. AI-powered tool for marketers and creators.",
    openGraph: {
        title: "LaunchStack | High-Converting Email Sequence Generator",
        description: "Generate creative, psychology-backed launch email sequences in seconds. AI-powered tool for marketers and creators.",
        images: ["/imgs/ana-ai/revdash_Screenshot2.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "LaunchStack | High-Converting Email Sequence Generator",
        description: "Generate creative, psychology-backed launch email sequences in seconds. AI-powered tool for marketers and creators.",
        images: ["/imgs/ana-ai/revdash_Screenshot2.png"],
    },
};

export default function LaunchStackPage() {
    return (
        <PasswordGate>
            <App />
        </PasswordGate>
    );
}
