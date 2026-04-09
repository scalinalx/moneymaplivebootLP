'use client';

import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ImageCardProps {
    src: string;
    alt: string;
    caption?: string;
    animation?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({ src, alt, caption, animation = 'scale' }) => {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });

    const animationClass = isVisible
        ? animation === 'fade'
            ? 'feed-animate-fade-in'
            : animation === 'slide-up'
                ? 'feed-animate-slide-up'
                : 'feed-animate-scale-in'
        : 'opacity-0';

    return (
        <div
            ref={ref}
            className={`w-full overflow-hidden rounded-2xl ${animationClass} will-change-[transform,opacity]`}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={alt}
                className="w-full h-auto block"
            />
            {caption && (
                <div className="bg-brand-900 border-t border-brand-800 px-5 py-3">
                    <p className="text-brand-grey text-sm font-lora italic">{caption}</p>
                </div>
            )}
        </div>
    );
};
