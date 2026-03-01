import React from 'react';
import VDPBApp from '@/components/vdpb/VDPBApp';
import './vdpb_styles.css';

export const metadata = {
    title: 'Viral Digital Product Builder | Monetise Substack',
    description: 'Discover your perfect digital product in 5 steps. Choose your niche, define the problem, and launch with confidence.',
};

export default function VDPBPage() {
    return (
        <>
            {/* Load Poppins + Playfair Display for the VDPB design system */}
            {/* eslint-disable-next-line @next/next/no-head-element */}
            <link
                rel="preconnect"
                href="https://fonts.googleapis.com"
            />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
            />
            {/* @ts-ignore */}
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <main>
                <VDPBApp />
            </main>
        </>
    );
}
