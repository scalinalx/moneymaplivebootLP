'use client';

import React from 'react';
import { FeedCard } from '../FeedCard';

interface CTACardProps {
    headline: string;
    buttonText?: string;
    animation?: string;
}

export const CTACard: React.FC<CTACardProps> = ({
    headline,
    buttonText = 'GET INSTANT ACCESS — $97',
    animation = 'scale',
}) => {
    return (
        <FeedCard animation={animation as any} accentBorder>
            <p className="font-bold text-brand-white text-lg mb-4">{headline}</p>
            <button
                onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-brand-lime hover:bg-brand-limeDim text-brand-950 font-anton text-lg py-4 rounded-xl transition-all hover:scale-[1.02] uppercase tracking-wide"
            >
                {buttonText}
            </button>
        </FeedCard>
    );
};
