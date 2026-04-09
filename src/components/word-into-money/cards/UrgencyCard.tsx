'use client';

import React from 'react';
import { FeedCard } from '../FeedCard';
import { Clock } from 'lucide-react';

interface UrgencyCardProps {
    text: string;
    animation?: string;
}

export const UrgencyCard: React.FC<UrgencyCardProps> = ({ text, animation = 'slide-up' }) => {
    return (
        <FeedCard animation={animation as any} className="bg-brand-lime/10 border-brand-lime">
            <div className="flex items-center gap-3">
                <Clock className="text-brand-lime flex-shrink-0" size={20} />
                <p className="font-bold text-brand-lime text-sm">{text}</p>
            </div>
        </FeedCard>
    );
};
