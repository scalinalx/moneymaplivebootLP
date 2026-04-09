'use client';

import React from 'react';
import { FeedCard } from '../FeedCard';
import { Shield } from 'lucide-react';

interface GuaranteeCardProps {
    animation?: string;
}

export const GuaranteeCard: React.FC<GuaranteeCardProps> = ({ animation = 'fade' }) => {
    return (
        <FeedCard animation={animation as any} className="border-brand-lime">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-brand-lime/10 p-3 rounded-full">
                    <Shield className="text-brand-lime" size={28} />
                </div>
                <div>
                    <h3 className="font-anton text-xl text-brand-white uppercase mb-2">30-Day Money-Back Guarantee</h3>
                    <p className="font-lora text-brand-grey leading-relaxed">
                        If you go through the workshop and don&apos;t feel it was worth every penny, email me within 30 days and I&apos;ll refund you in full. No questions, no hoops. Your satisfaction is the only thing that matters.
                    </p>
                </div>
            </div>
        </FeedCard>
    );
};
