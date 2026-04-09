'use client';

import React from 'react';

interface HeroCardProps {
    headline: string;
    subheadline: string;
}

export const HeroCard: React.FC<HeroCardProps> = ({ headline, subheadline }) => {
    return (
        <div className="bg-brand-900 border border-brand-800 rounded-2xl p-8 md:p-12 text-center">
            <div className="inline-block bg-brand-lime/10 border border-brand-lime/30 text-brand-lime text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                Live Workshop
            </div>
            <h1 className="font-anton text-4xl md:text-6xl text-brand-white uppercase leading-[1.1] mb-6">
                {headline}
            </h1>
            <p className="font-lora text-lg md:text-xl text-brand-grey max-w-md mx-auto leading-relaxed">
                {subheadline}
            </p>
            <button
                onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-8 bg-brand-lime hover:bg-brand-limeDim text-brand-950 font-anton text-xl py-4 px-10 rounded-xl transition-all hover:scale-[1.02] uppercase tracking-wide"
            >
                I WANT IN — $97
            </button>
        </div>
    );
};
