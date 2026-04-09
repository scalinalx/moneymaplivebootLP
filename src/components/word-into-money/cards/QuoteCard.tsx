'use client';

import React from 'react';
import { FeedCard } from '../FeedCard';

interface QuoteCardProps {
    quote: string;
    attribution?: string;
    animation?: string;
    variant?: 'default' | 'highlight' | 'dark' | 'glass' | 'fullBleed';
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, attribution, animation = 'fade', variant }) => {
    // Quote cards default to glass if no variant specified, for visual variety
    const cardVariant = variant || 'glass';

    return (
        <FeedCard animation={animation as any} variant={cardVariant} className="border-l-4 border-l-brand-lime">
            <p className="font-playfair text-2xl md:text-3xl text-brand-white leading-snug italic py-3">
                &ldquo;{quote}&rdquo;
            </p>
            {attribution && (
                <p className="text-brand-grey text-sm mt-4 font-lora">— {attribution}</p>
            )}
        </FeedCard>
    );
};
