'use client';

import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface BridgeCardProps {
    text: string;
    animation?: string;
}

export const BridgeCard: React.FC<BridgeCardProps> = ({ text, animation = 'fade' }) => {
    const { ref, isVisible } = useScrollReveal();

    return (
        <div
            ref={ref}
            className={`py-6 px-2 text-center ${isVisible ? 'feed-animate-fade-in' : 'opacity-0'} will-change-[transform,opacity]`}
        >
            <p className="font-lora text-brand-grey text-base italic">
                {text}
            </p>
        </div>
    );
};
