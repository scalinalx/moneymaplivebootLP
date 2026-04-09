'use client';

import React from 'react';
import { FeedCard } from '../FeedCard';

interface TestimonialCardProps {
    name: string;
    text: string;
    avatarUrl?: string;
    detail?: string;
    animation?: string;
    variant?: 'default' | 'highlight' | 'dark' | 'glass' | 'fullBleed';
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
    name,
    text,
    avatarUrl,
    detail,
    animation = 'slide-up',
    variant = 'default',
}) => {
    return (
        <FeedCard animation={animation as any} variant={variant}>
            <div className="flex items-center gap-3 mb-4">
                {avatarUrl ? (
                    <img src={avatarUrl} alt={name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-brand-800 flex items-center justify-center text-brand-lime font-bold text-sm">
                        {name.charAt(0)}
                    </div>
                )}
                <div>
                    <p className="font-bold text-brand-white text-sm">{name}</p>
                    {detail && <p className="text-brand-grey text-xs">{detail}</p>}
                </div>
            </div>
            <p className="font-lora text-brand-white/90 leading-relaxed">{text}</p>
        </FeedCard>
    );
};
