import React from 'react';
import { ArrowRight } from 'lucide-react';

const outcomes = [
    "Turn your existing free readers into paying subscribers — without writing more or showing up more",
    "Hit Substack Bestseller status systematically, even if your list is under 500 people",
    "Price your paid tier with confidence — at the exact number that maximises conversions",
    "Write the 3-email upgrade sequence that moves free subscribers to paid within 7 days of sending",
    "Know exactly what goes behind your paywall — and what should stay free to keep people hooked",
    "Launch your paid tier in the next 30 days with a clear, step-by-step daily action plan",
    "Handle every objection your readers throw at you — 'I can't afford it,' 'I'll wait,' 'I can get this for free' — without sounding desperate",
    "Build a paid subscriber base that sticks around, renews, and tells their friends about you",
];

export const OutcomesSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-[#1a1a2e]">
            <div className="max-w-[1000px] w-full flex flex-col items-center">

                <h2 className="font-montserrat font-extrabold text-white text-2xl md:text-4xl text-center uppercase mb-3 leading-tight">
                    By the end of this workshop, you'll know exactly how to:
                </h2>
                <p className="font-lora italic text-[#ffc300] text-center text-lg mb-12">
                    ...and you'll have the templates to start doing it the same day.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mb-12">
                    {outcomes.map((outcome, i) => (
                        <div key={i} className="flex items-start gap-4 bg-white/5 rounded-2xl p-5 border border-white/10">
                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#27AE60] flex items-center justify-center mt-0.5">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="font-lato text-white text-base md:text-lg leading-snug">
                                {outcome}
                            </span>
                        </div>
                    ))}
                </div>

                <p className="font-montserrat font-bold text-[#ffc300] text-center text-base md:text-lg mb-8 uppercase tracking-wide">
                    ...and so much more. Instant access.
                </p>

                <button
                    onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-base md:text-xl py-4 px-8 md:px-12 rounded-[5px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase flex items-center justify-center gap-2"
                >
                    <span>THAT'S FOR ME!</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </button>
                <p className="font-lato text-white/50 text-sm mt-4 text-center">Full webinar recording · All templates & bonuses · Delivered immediately</p>

            </div>
        </div>
    );
};
