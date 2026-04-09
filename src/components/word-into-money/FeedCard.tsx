'use client';

import React from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';

type CardVariant = 'default' | 'highlight' | 'dark' | 'glass' | 'fullBleed';

const variantStyles: Record<CardVariant, string> = {
    default: 'bg-brand-900 border border-brand-800 rounded-2xl',
    highlight: 'bg-brand-lime/5 border border-brand-lime/20 rounded-2xl',
    dark: 'bg-brand-950 border border-transparent rounded-2xl',
    glass: 'bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl',
    fullBleed: 'bg-brand-900 border-none rounded-none',
};

interface FeedCardProps {
    animation?: 'slide-up' | 'fade' | 'scale' | 'slide-left' | 'none';
    variant?: CardVariant;
    className?: string;
    accentBorder?: boolean;
    noPadding?: boolean;
    children: React.ReactNode;
}

export const FeedCard: React.FC<FeedCardProps> = ({
    animation = 'slide-up',
    variant = 'default',
    className = '',
    accentBorder = false,
    noPadding = false,
    children,
}) => {
    const { ref, isVisible } = useScrollReveal();

    const animationClass = animation === 'none'
        ? ''
        : isVisible
            ? `feed-animate-${animation === 'slide-up' ? 'slide-up' : animation === 'fade' ? 'fade-in' : animation === 'scale' ? 'scale-in' : 'slide-left'}`
            : 'opacity-0';

    return (
        <div
            ref={ref}
            className={`
                ${variantStyles[variant]}
                ${noPadding ? '' : 'p-5 md:p-7'}
                ${accentBorder ? 'border-l-4 border-l-brand-lime' : ''}
                ${animationClass}
                will-change-[transform,opacity]
                ${className}
            `}
        >
            {children}
        </div>
    );
};
