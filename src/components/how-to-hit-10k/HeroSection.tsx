import React from 'react';
import { Star } from 'lucide-react';
import { HIT10K_PRICE } from '@/lib/stripe';

export const HeroSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center pt-[60px] pb-2 px-6">
            <div className="max-w-[1100px] w-full flex flex-col items-center text-center">

                {/* Main Headline */}
                <h1 className="font-anton text-[#06b6d4] leading-[1.1] md:leading-[1.05] uppercase mb-10 tracking-wide w-full max-w-[1400px] flex flex-col items-center">
                    <span className="text-[#ffc300] text-xl md:text-2xl lg:text-4xl mb-1">How To</span>
                    <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl py-1 px-2">Hit Your First $10,000 Month</span>
                    <span className="text-base md:text-xl lg:text-2xl mt-1 opacity-80 px-4">... Without Changing Your Offer??</span>
                </h1>

                {/* Sub-Headline */}
                <h2 className="font-lora text-[#333333] text-lg md:text-2xl leading-[1.6] max-w-4xl mb-12 font-normal">
                    Join me live on February 3rd for a 60-minute intensive revealing the exact positioning, pricing, and launch framework to scale your existing offers to 5-figure months.
                </h2>

                {/* Proof Image */}
                <div className="w-full max-w-[850px] mt-2 mb-8">
                    <img
                        src="/imgs/how-to-hit-10k/hit10k.webp"
                        alt="Sales Proof Dashboard"
                        className="w-full h-auto rounded-lg shadow-2xl border border-gray-100"
                    />
                </div>

                {/* Social Proof / Credibility Statement (Moved Below Image) */}
                <div className="flex flex-col items-center mb-4 mt-4">
                    <div className="flex gap-1 mb-2 text-[#F59E0B]">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} fill="currentColor" size={20} />
                        ))}
                    </div>
                    <p className="font-lato text-[#333333] text-lg md:text-[19px] italic max-w-2xl leading-relaxed">
                        "Using the exact framework I'll be teaching you in this workshop, I was able to scale my revenue to $119,000+ per month."
                    </p>
                </div>

                {/* CTA Button */}
                <div className="mt-8 flex flex-col items-center">
                    <button
                        onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-xl md:text-2xl py-5 px-10 md:px-16 rounded shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wider"
                    >
                        YES! RESERVE MY SPOT — ${HIT10K_PRICE / 100}
                    </button>
                    <p className="font-lora italic text-gray-500 mt-4 text-sm">
                        *Instant access to bonuses granted upon registration
                    </p>
                </div>

            </div>
        </div>
    );
};
