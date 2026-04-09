'use client';

import React from 'react';
import { FeedCard } from '../FeedCard';

interface ValueItem {
    label: string;
    value: string;
}

interface PriceRevealCardProps {
    items: ValueItem[];
    totalValue: string;
    price: string;
    animation?: string;
}

export const PriceRevealCard: React.FC<PriceRevealCardProps> = ({
    items,
    totalValue,
    price,
    animation = 'scale',
}) => {
    return (
        <FeedCard animation={animation as any} className="text-center">
            <h3 className="font-anton text-2xl text-brand-white uppercase mb-6">Everything You Get</h3>
            <div className="space-y-3 mb-6">
                {items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-brand-800 pb-2">
                        <span className="text-brand-white text-sm font-lora">{item.label}</span>
                        <span className="text-brand-grey text-sm line-through">{item.value}</span>
                    </div>
                ))}
            </div>
            <p className="text-brand-grey text-lg line-through mb-2">Total Value: {totalValue}</p>
            <p className="font-anton text-5xl md:text-6xl text-brand-lime mb-2">{price}</p>
            <p className="text-brand-grey text-sm font-lora">One-time payment. Lifetime access.</p>
        </FeedCard>
    );
};
