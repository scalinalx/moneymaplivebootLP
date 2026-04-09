'use client';

import React from 'react';
import { FeedCard } from '../FeedCard';

interface BenefitCardProps {
    number: number;
    total: number;
    headline: string;
    detail: string;
    animation?: string;
    variant?: string;
}

export const BenefitCard: React.FC<BenefitCardProps> = ({
    number,
    total,
    headline,
    detail,
    animation = 'slide-left',
    variant,
}) => {
    return (
        <FeedCard animation={animation as any} variant={variant as any}>
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-brand-800 text-brand-lime text-xs font-bold px-3 py-1.5 rounded-full">
                    {number}/{total}
                </div>
                <div>
                    <h3 className="font-anton text-xl text-brand-white uppercase mb-2">{headline}</h3>
                    <p className="font-lora text-brand-grey leading-relaxed">{detail}</p>
                </div>
            </div>
        </FeedCard>
    );
};
