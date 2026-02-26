import React from 'react';
import { Button } from './Button';

export const Hero: React.FC = () => {
    const scrollToCheckout = () => {
        const element = document.getElementById('checkout');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative w-full min-h-screen bg-white overflow-hidden pt-4 pb-12 px-4 md:px-8 flex flex-col items-center">

            {/* Top Nav (Minimal per screenshot) */}
            <nav className="w-full max-w-6xl mx-auto flex justify-center items-center z-50 mb-8 md:mb-12">
                <div className="inline-flex items-center justify-center bg-gray-100 text-gray-500 rounded-full px-4 py-1.5 font-montserrat font-bold text-xs uppercase tracking-[0.2em]">
                    How We Grow
                </div>
            </nav>

            {/* Main Content Stack */}
            <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center z-10">

                {/* 1. Pre-headline */}
                <p className="font-montserrat font-bold text-sm md:text-base text-gray-500 mb-4 uppercase tracking-[0.2em]">
                    30-Day Implementation Program | Enrollment Open Now
                </p>

                {/* 2. Main Headline */}
                <h1 className="font-anton text-[#06b6d4] text-5xl md:text-6xl lg:text-7xl uppercase leading-[1.1] md:leading-[1.05] tracking-wide text-center mb-6 w-full flex flex-col items-center">
                    <span className="block mb-2 md:mb-4 w-full">LAUNCH YOUR OFFER IN 30 DAYS</span>
                    <span className="text-[#ffc300] block mt-2">AND HIT YOUR FIRST $10K MONTH</span>
                </h1>

                {/* 3. Subtitle */}
                <h2 className="font-display text-[#333333] font-bold italic text-xl md:text-3xl max-w-4xl tracking-tight leading-tight mb-8">
                    Doors are OPEN — but not for long. Grab your spot at today's price before this cohort closes and the price goes back to $1,997.
                </h2>

                {/* 4. Hero Image Replace Mockup */}
                <div className="mb-8 md:mb-12 w-full max-w-5xl flex justify-center px-4">
                    <img
                        src="/imgs/10k-launch-lab/hero-1.jpeg"
                        alt="10k Launch Lab Program"
                        className="w-full h-auto rounded-2xl shadow-2xl border border-gray-100"
                    />
                </div>

                {/* 5. CTA Button Section */}
                <div className="flex flex-col items-center gap-8 relative z-40 mt-4">
                    <button
                        onClick={scrollToCheckout}
                        className="bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-lg md:text-2xl py-4 md:py-5 px-10 md:px-14 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wider"
                    >
                        <span>I WANT MY FIRST 10K MONTH</span>
                    </button>

                    {/* 6. Social Proof Phrase */}
                    <p className="font-lora text-lg md:text-xl italic text-center text-gray-600 leading-relaxed max-w-2xl px-4">
                        "830+ success stories so far from the $10k Launch Lab and How We Grow programs. The internet can't shut up about it."
                    </p>
                </div>

            </div>

            {/* Decorative Background Patterns */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-cyan-100/50 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-pink-100/50 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
                <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-yellow-100/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-30"></div>
            </div>

        </section>
    );
};
