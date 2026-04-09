'use client';

import React from 'react';
import { FeedCard } from '../FeedCard';

interface ComparisonCardProps {
    before: string[];
    after: string[];
    animation?: string;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({ before, after, animation = 'slide-up' }) => {
    return (
        <FeedCard animation={animation as any}>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <p className="font-anton text-lg text-red-400 uppercase mb-3">Before</p>
                    <ul className="space-y-2">
                        {before.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-brand-grey text-sm font-lora">
                                <span className="text-red-400 mt-0.5">✕</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="font-anton text-lg text-brand-lime uppercase mb-3">After</p>
                    <ul className="space-y-2">
                        {after.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-brand-white text-sm font-lora">
                                <span className="text-brand-lime mt-0.5">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </FeedCard>
    );
};
