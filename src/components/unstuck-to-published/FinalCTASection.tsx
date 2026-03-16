import React from 'react';
import { ArrowRight } from 'lucide-react';

const included = [
    "60-minute live workshop (40 min training + 20 min Q&A)",
    "Full replay — yours to keep forever",
    "The Get Unstuck Framework (Jessica's signature system)",
    "Publication Positioning Worksheet (from Ana's $119K/month system)",
    "First Article Template — Story \u2192 Lesson \u2192 Framework",
    "Paywall Placement Guide — where to put it, what goes behind it",
    "Live Q&A — bring your Substack, get direct feedback",
];

export const FinalCTASection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-16 md:py-20 px-6 bg-[#faf9f5]">
            <div className="max-w-[700px] w-full flex flex-col items-center text-center">

                {/* Price Box */}
                <div className="w-full bg-[#1a1a1a] rounded-xl p-8 md:p-10 relative overflow-hidden">
                    {/* Top gradient line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ffc300] to-[#f72585]" />

                    <p className="text-[#ffc300] text-sm font-bold tracking-[2px] uppercase mb-4">
                        Workshop Investment
                    </p>
                    <div className="font-anton text-[#ffc300] text-6xl md:text-7xl mb-1">
                        $97
                    </div>
                    <p className="font-lato text-gray-500 text-base mb-8">
                        One session. Two experts. Everything you need to launch.
                    </p>

                    {/* Includes List */}
                    <div className="text-left mb-8">
                        {included.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 mb-3">
                                <div className="flex-shrink-0 w-5 h-5 bg-[#ffc300] rounded-full flex items-center justify-center mt-0.5">
                                    <svg className="w-3 h-3 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="font-lato text-gray-300 text-sm md:text-base">{item}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group w-full bg-[#ffc300] hover:bg-[#e6b000] text-[#1a1a1a] font-montserrat font-bold text-lg md:text-xl py-5 px-8 rounded-lg shadow-[0_4px_20px_rgba(255,195,0,0.25)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                        <span>Book Your Seat — $97</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                    </button>

                    <p className="font-lato text-gray-500 text-sm mt-5 leading-relaxed">
                        Replay included for all attendees. If you attend and don't feel it was worth every penny, email us within 24 hours for a full refund. No questions asked.
                    </p>
                </div>

            </div>
        </div>
    );
};
