'use client';

import React from 'react';
import { FeedCard } from '../FeedCard';

interface ProblemCardProps {
    text: string;
    animation?: string;
    variant?: 'default' | 'highlight' | 'dark' | 'glass' | 'fullBleed';
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ text, animation = 'slide-up', variant = 'default' }) => {
    return (
        <FeedCard animation={animation as any} variant={variant}>
            <div className="font-lora text-brand-white text-lg leading-relaxed whitespace-pre-line">
                {text}
            </div>
        </FeedCard>
    );
};
