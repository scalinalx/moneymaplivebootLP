import React from 'react';

export const RequirementsSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-white">
            <div className="max-w-[900px] w-full flex flex-col items-center text-center">

                {/* Headline */}
                <h2 className="font-anton text-[rgb(56,170,185)] text-4xl md:text-5xl lg:text-6xl uppercase leading-tight mb-10 tracking-wide">
                    Ana, what do I need to hit my first $10k month?
                </h2>

                {/* Body Paragraphs */}
                <div className="font-lora text-[#333333] text-xl md:text-[24px] leading-relaxed max-w-4xl space-y-8 mb-12">
                    <p>
                        If you have access to the internet and whatever device you are reading this on right now, you <span className="border-b-2 border-black/80 font-bold">already have</span> everything you need to hit your first 5-figure month.
                    </p>
                    <p>
                        Most people think they need a massive audience or a complicated funnel. They're wrong. You just need to fix your <span className="italic">positioning</span> and your <span className="italic">launch physics</span>.
                    </p>
                </div>

                {/* Impact Statement */}
                <h3 className="font-montserrat font-extrabold text-black text-2xl md:text-3xl lg:text-[34px] leading-tight max-w-4xl mb-12">
                    I'll give you the exact frameworks I used to go from "Offer Confusion" to $119,000+ months when you join this business course.
                </h3>

                {/* CTA Button */}
                <button
                    onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group relative bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-lg md:text-2xl py-5 px-10 md:px-14 rounded-[5px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wide"
                >
                    GET LIFETIME ACCESS NOW!
                </button>

            </div>
        </div>
    );
};
