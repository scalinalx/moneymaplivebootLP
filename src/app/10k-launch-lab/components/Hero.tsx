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
            {/* Top Nav (Minimal per screenshot) */}
            <nav className="w-full max-w-6xl mx-auto flex justify-center items-center z-50 mb-4 md:mb-8">
                <div className="relative inline-block transform -rotate-1">
                    <span className="absolute inset-0 bg-brand-neon transform skew-x-[-10deg] scale-105 -z-10 shadow-sm rounded-sm origin-center"></span>
                    <span className="font-poppins font-black text-sm tracking-[0.1em] uppercase px-2 z-10 relative">
                        How We Grow
                    </span>
                </div>
            </nav>

            {/* Main Content Stack - Increased max-width to 7xl for wider headline */}
            <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center z-10">

                {/* 1. Pre-headline */}
                <p className="font-poppins italic font-semibold text-lg md:text-xl text-gray-800 mb-2">
                    30-Day Implementation Program | Next Cohort TBA
                </p>

                {/* 2. Main Headline - Size reduced by 50% */}
                <h1 className="font-display font-bold text-xl md:text-2xl lg:text-3xl uppercase leading-[0.9] tracking-tight text-black mb-4 flex flex-col items-center w-full">
                    <span className="block mb-2 md:mb-4 w-full">LAUNCH YOUR OFFER IN 30 DAYS</span>
                    <span className="relative inline-block transform -rotate-1">
                        {/* Neon Highlighter Background */}
                        <span className="absolute inset-0 bg-brand-neon transform skew-x-[-10deg] scale-105 md:scale-110 -z-10 shadow-sm rounded-sm origin-center"></span>
                        <span className="relative px-2 md:px-4 z-10 block">AND HIT YOUR FIRST $10K MONTH</span>
                    </span>
                </h1>

                {/* 3. Subtitle */}
                <p className="font-poppins font-medium text-base md:text-xl text-black mb-4 md:mb-8 max-w-3xl">
                    <span className="font-bold">ENROLLMENT IS CLOSED.</span> Join the waitlist to secure your spot in the next cohort—plus get exclusive early-bird pricing.
                </p>

                {/* 4. Hero Image Replace Mockup */}
                <div className="-mt-4 md:-mt-8 mb-8 md:mb-12 w-full max-w-5xl flex justify-center px-4">
                    <img
                        src="/imgs/10k-launch-lab/hero-1.jpeg"
                        alt="10k Launch Lab Program"
                        className="w-full h-auto rounded-xl shadow-hard border-2 border-black"
                    />
                </div>

                {/* 5. CTA Button Section */}
                <div className="flex flex-col items-center gap-8 relative z-40 mt-4">
                    <Button
                        onClick={scrollToCheckout}
                        className="px-10 py-3 md:px-14 md:py-4 text-sm md:text-lg group shadow-[4px_4px_0px_#000000] hover:shadow-[2px_2px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-brand-neon hover:bg-[#e6e200] border-2 border-black"
                    >
                        <span className="flex flex-col items-center leading-none gap-1">
                            <span className="font-normal text-lg md:text-xl tracking-wide uppercase">JOIN THE WAITLIST</span>
                            <span className="font-medium text-xs md:text-sm normal-case tracking-normal opacity-90">Be first in line for the next cohort</span>
                        </span>
                    </Button>

                    {/* 6. Social Proof Phrase */}
                    <p className="font-poppins text-lg md:text-2xl font-bold italic text-center text-black leading-relaxed max-w-xl">
                        830+ success stories so far from the $10k Launch Lab and How We Grow programs. Kinda speaks for itself.<br />
                        Really. The internet can't shut up about it.
                    </p>
                </div>

            </div>

            {/* Decorative Background Patterns */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-brand-neon rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-pink-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-30"></div>
            </div>

        </section>
    );
};
