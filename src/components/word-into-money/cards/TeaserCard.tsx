'use client';

import React from 'react';
import { FeedCard } from '../FeedCard';
import { ArrowDown } from 'lucide-react';

interface TeaserCardProps {
    text: string;
    animation?: string;
}

export const TeaserCard: React.FC<TeaserCardProps> = ({ text, animation = 'fade' }) => {
    return (
        <FeedCard animation={animation as any} variant="highlight" className="feed-glow">
            <div className="flex items-start gap-3">
                <ArrowDown size={16} className="text-brand-lime flex-shrink-0 mt-1 animate-pulse-subtle" />
                <p className="font-lora text-brand-lime/90 text-base italic leading-relaxed">
                    {text}
                </p>
            </div>
        </FeedCard>
    );
};
