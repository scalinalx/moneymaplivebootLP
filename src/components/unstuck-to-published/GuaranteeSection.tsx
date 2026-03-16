'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export const GuaranteeSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-16 md:py-20 px-6 bg-[#1a1a1a] relative">
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#ffc300] to-[#f72585]" />

            <div className="max-w-[800px] w-full flex flex-col items-center text-center">

                <h2 className="font-anton text-3xl md:text-4xl text-[#ffc300] mb-4 leading-tight">
                    You've been "about to start" long enough.
                </h2>

                <p className="font-lato text-gray-300 text-lg md:text-xl leading-relaxed mb-4 max-w-2xl">
                    Every week you spend thinking about your Substack is a week you could've been building it. The name doesn't have to be perfect. The niche doesn't have to be final. The first post doesn't have to be your masterpiece.
                </p>

                <p className="font-lato text-gray-300 text-lg md:text-xl leading-relaxed mb-6 max-w-2xl">
                    It just has to exist.
                </p>

                <p className="font-montserrat font-bold text-white text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                    Saturday, March 21 @ 10:00 AM EST. 60 minutes. Two creators who've done it.<br />
                    You'll walk in with an idea and walk out with a publication.
                </p>

                <button
                    onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group bg-[#ffc300] hover:bg-[#e6b000] text-[#1a1a1a] font-montserrat font-bold text-lg md:text-xl py-5 px-10 md:px-12 rounded-lg shadow-[0_4px_20px_rgba(255,195,0,0.25)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 mb-6"
                >
                    <span>Book Your Seat — $97</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </button>

                <p className="font-lato text-gray-500 text-sm max-w-md leading-relaxed mb-6">
                    Due to the live, interactive nature of this workshop and the instant delivery of all digital resources, templates, and replay access, we are unable to offer refunds. When you purchase your seat, you receive immediate access to all workshop materials — making every sale final. We're confident you'll love every minute.
                </p>

                <p className="font-lato text-gray-500 text-sm">
                    See you in the room.<br />
                    — Ana & Jessica
                </p>

            </div>
        </div>
    );
};
