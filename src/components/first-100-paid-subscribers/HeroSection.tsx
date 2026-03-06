import React from 'react';
import { Star } from 'lucide-react';
import { FIRST100_PRICE } from '@/lib/stripe';

export const HeroSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center pt-2 pb-2 px-6">
            <div className="max-w-[1100px] w-full flex flex-col items-center text-center">

                {/* Main Headline Container */}
                <div className="relative w-full max-w-[1100px] flex flex-col items-center">
                    {/* Live Workshop Pill — floating top right */}
                    <div className="absolute top-0 right-0 xl:-right-4 mt-2 hidden md:inline-flex items-center gap-1.5 bg-[#333333] text-white px-3 py-1 rounded-full text-[10px] md:text-xs font-montserrat font-bold uppercase tracking-widest z-10">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffc300] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ffc300]"></span>
                        </span>
                        Live — March 12th
                    </div>

                    <h1 className="font-anton text-[#06b6d4] leading-[1.1] md:leading-[1.05] uppercase mb-6 tracking-wide w-full max-w-[1400px] flex flex-col items-center">
                        <span className="text-[#ffc300] text-xl md:text-2xl lg:text-4xl mb-1">Get Your</span>
                        <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl py-1 px-2">First 100 Paid Subscribers</span>
                        <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl py-1 px-2">And Hit Bestseller Status</span>
                        <span className="text-base md:text-xl lg:text-2xl mt-1 opacity-80 px-4">Without going viral. Without a huge audience. Without guessing.</span>
                    </h1>
                </div>

                <p className="text-gray-400 italic text-sm font-lora mb-6">*limited time offer*</p>

                {/* Hero Mockup Image */}
                <div className="w-full max-w-[1100px] mb-6 rounded-2xl overflow-hidden">
                    <img
                        src="/imgs/first-100-paid-subscribers/hero1_cropped.webp"
                        alt="First 100 Paid Subscribers — Live Workshop"
                        className="w-full h-auto"
                    />
                </div>

                {/* CTA Button — immediately after image */}
                <div className="flex flex-col items-center mb-10">
                    <button
                        onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-xl md:text-2xl py-5 px-10 md:px-16 rounded shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wider"
                    >
                        THAT'S FOR ME! — ${FIRST100_PRICE / 100}
                    </button>
                    <p className="font-lora italic text-gray-500 mt-4 text-sm">
                        *Live on March 12th + replay + templates & bonuses sent immediately after
                    </p>
                </div>

                {/* Sub-Headline — moved below image + CTA */}
                <h2 className="font-display text-[#333333] text-lg md:text-3xl leading-tight max-w-4xl mb-10 font-bold uppercase italic tracking-tight">
                    A 90-minute live workshop for Substack writers who are done watching others hit Bestseller status while their paid tier sits at zero
                </h2>

                {/* Ana's Credibility Bar */}
                <div className="w-full max-w-[850px] grid grid-cols-3 gap-4 mb-10">
                    {[
                        { stat: "$119K+", label: "Monthly Revenue" },
                        { stat: "6,200+", label: "Paid Subscribers Converted" },
                        { stat: "600+", label: "Writers Coached" },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center bg-gray-50 rounded-2xl py-5 px-3 border border-gray-100">
                            <span className="font-anton text-[#d81159] text-2xl md:text-4xl leading-none mb-1">{item.stat}</span>
                            <span className="font-lato text-gray-500 text-xs md:text-sm text-center uppercase tracking-wide font-bold">{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* Social Proof Stars */}
                <div className="flex flex-col items-center mb-8">
                    <div className="flex gap-1 mb-2 text-[#F59E0B]">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} fill="currentColor" size={20} />
                        ))}
                    </div>
                    <p className="font-lato text-[#333333] text-lg md:text-[19px] italic max-w-2xl leading-relaxed">
                        "I went from 4 paid subscribers to 118 in 27 days. I didn't change my writing — I changed my conversion system. Ana's framework is the only thing that actually moved the needle."
                    </p>
                </div>

            </div>
        </div>
    );
};
