import React from 'react';
import { HIT10K_PRICE } from '@/lib/stripe';

export const ObjectionHandlingSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-white">
            <div className="max-w-[700px] w-full flex flex-col items-center text-center">

                {/* Headline */}
                <h2 className="font-montserrat font-extrabold text-black text-3xl md:text-[32px] leading-tight mb-10">
                    The reason most launches stay under $10k...
                </h2>

                {/* The "No-Equipment" Answer */}
                <p className="font-lato text-[#333333] text-lg md:text-[20px] leading-relaxed w-full mb-8">
                    When sales flatline, most people cycle between two mistakes: 1. Giving up, or 2. Creating a NEW offer.
                </p>

                {/* The "Imperfect is Better" Philosophy */}
                <p className="font-lora text-[#333333] text-lg md:text-[18px] leading-relaxed w-full mb-8 italic">
                    Both are wrong. The problem is rarely the product. It's the "Launch Physics"—how you position, price, and present it.
                </p>

                {/* The "Closing Gap" Statement */}
                <p className="font-lato font-normal text-[#333333] text-lg md:text-[18px] leading-relaxed w-full mb-12">
                    In this 90-minute course, I'll show you how to fix the foundations so you can scale what you ALREADY have.
                </p>

                {/* Section Call-to-Action */}
                <button
                    onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group relative bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-lg md:text-2xl py-4 px-10 md:px-14 rounded-[5px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wide"
                >
                    GET LIFETIME ACCESS NOW — ${HIT10K_PRICE / 100}
                </button>

            </div>
        </div>
    );
};
