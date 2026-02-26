import React from 'react';
import { Button } from './Button';

export const MagnetismSection: React.FC = () => {
    const scrollToCheckout = () => {
        const element = document.getElementById('checkout');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full bg-black text-white py-20 px-4 md:px-8 flex flex-col items-center border-t border-gray-800">

            <div className="max-w-4xl w-full mx-auto">

                {/* 1. The Struggle */}
                <div className="space-y-6 font-poppins text-base md:text-lg text-gray-200 leading-relaxed mb-12">
                    <h2 className="font-display font-black text-3xl md:text-5xl uppercase mb-8">
                        Here's What Happened to Marcus:
                    </h2>

                    <p>
                        Marcus attended my workshop in November. He learned the framework. Took 11 pages of notes. Downloaded everything.
                    </p>

                    <p className="font-bold text-xl">
                        Then he tried to implement... and got stuck.
                    </p>

                    <div className="pl-6 border-l-4 border-brand-neon italic text-gray-400 space-y-2 my-6">
                        <p>"Where do I start?"</p>
                        <p>"Should I write the sales page first or the emails?"</p>
                        <p>"How do I set up Stripe again?"</p>
                        <p>"What if I'm doing this wrong?"</p>
                    </div>

                    <p className="font-bold text-red-500 text-xl">
                        He spent 3 months "figuring it out." Made $0.
                    </p>
                </div>

                {/* 2. The Solution Quote / Shift */}
                <div className="w-full py-8 md:py-12 my-8 border-y-2 border-white/20 bg-gray-900 p-6 md:p-10 rounded-2xl overflow-hidden relative">
                    <h3 className="font-display font-bold text-2xl md:text-3xl uppercase mb-6 z-10 relative">
                        Then Marcus joined the 10K Launch Lab.
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4 font-mono text-sm md:text-base z-10 relative">
                            <p><span className="font-bold text-[#d81159] text-black">Day 1:</span> Open module → "Complete Offer Validation Worksheet" → 30 minutes → Done</p>
                            <p><span className="font-bold text-[#d81159] text-black">Day 7:</span> Sales page complete (used fill-in-the-blank template)</p>
                            <p><span className="font-bold text-[#d81159] text-black">Day 14:</span> 5-email sequence scheduled (used templates)</p>
                            <p><span className="font-bold text-[#d81159] text-black">Day 22:</span> Launched</p>
                            <p><span className="font-bold text-[#d81159] text-black">Day 27:</span> $5,200 in revenue</p>
                        </div>

                        {/* ICPs Image - Added as requested */}
                        <div className="relative transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="absolute inset-0 bg-rose-50 transform translate-x-1 translate-y-1 rounded-2xl -z-10"></div>
                            <img
                                src="/imgs/10k-launch-lab/offer-ICPs.jpeg"
                                alt="10k Launch Lab Offer ICPs"
                                className="w-full rounded-2xl border-2 border-white/20 grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </div>
                    </div>
                </div>

                {/* 3. The Realization */}
                <div className="w-full max-w-2xl mx-auto mb-16 text-center">
                    <div className="font-poppins text-lg md:text-xl text-white space-y-2 mb-8">
                        <p className="font-bold">Same Marcus.</p>
                        <p className="font-bold">Same offer.</p>
                        <p className="font-bold">Same audience.</p>
                    </div>

                    <h3 className="font-display font-black text-2xl md:text-4xl uppercase leading-tight">
                        The only difference?<br />
                        <span className="text-black text-[#d81159] text-xl py-2 inline-block mt-2">He had a paint-by-numbers system</span><br />
                        that made it impossible to get lost.
                    </h3>
                </div>

                {/* 4. CTA */}
                <div className="w-full flex justify-center">
                    <Button
                        onClick={scrollToCheckout}
                        className="mx-auto px-10 py-3.5 bg-[#d81159] hover:bg-[#b30e4a] text-white border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                    >
                        <div className="flex flex-col items-center leading-tight">
                            <span className="font-normal text-lg md:text-xl tracking-wide uppercase">GIVE ME THE 10K REVENUE ENGINE</span>
                        </div>
                    </Button>
                </div>

            </div>
        </section>
    );
};
