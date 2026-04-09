'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FeedCard } from '../FeedCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface StatCardProps {
    number: string;
    context: string;
    animation?: string;
    variant?: 'default' | 'highlight' | 'dark' | 'glass' | 'fullBleed';
}

function parseStatNumber(str: string): { prefix: string; value: number; suffix: string; hasDecimals: boolean } {
    // Extract prefix (like $), numeric value, and suffix (like %, +, K, M)
    const match = str.match(/^([^0-9]*)([0-9,.]+)(.*)$/);
    if (!match) return { prefix: '', value: 0, suffix: str, hasDecimals: false };
    const prefix = match[1];
    const numStr = match[2].replace(/,/g, '');
    const value = parseFloat(numStr);
    const suffix = match[3];
    const hasDecimals = numStr.includes('.');
    return { prefix, value, suffix, hasDecimals };
}

export const StatCard: React.FC<StatCardProps> = ({ number, context, animation = 'scale', variant = 'default' }) => {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });
    const [displayNumber, setDisplayNumber] = useState(number);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isVisible || hasAnimated.current) return;
        hasAnimated.current = true;

        const { prefix, value, suffix, hasDecimals } = parseStatNumber(number);
        if (value === 0) {
            setDisplayNumber(number);
            return;
        }

        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = eased * value;

            if (hasDecimals) {
                setDisplayNumber(`${prefix}${current.toFixed(1)}${suffix}`);
            } else {
                setDisplayNumber(`${prefix}${Math.round(current).toLocaleString()}${suffix}`);
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                setDisplayNumber(number);
            }
        }

        requestAnimationFrame(update);
    }, [isVisible, number]);

    return (
        <div
            ref={ref}
            className={`
                ${variant === 'dark' ? 'bg-brand-950 border border-transparent' : variant === 'highlight' ? 'bg-brand-lime/5 border border-brand-lime/20' : 'bg-brand-900 border border-brand-800'}
                rounded-2xl text-center py-10 p-5 md:p-7
                ${isVisible ? (animation === 'scale' ? 'feed-animate-scale-in' : 'feed-animate-slide-up') : 'opacity-0'}
                will-change-[transform,opacity]
            `}
        >
            <p className="font-anton text-5xl md:text-7xl text-brand-lime mb-3">{displayNumber}</p>
            <p className="text-brand-grey font-lora text-lg">{context}</p>
        </div>
    );
};
