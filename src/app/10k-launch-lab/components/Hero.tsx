import React from 'react';
import { MockupGroup } from './MockupGroup';
import { Button } from './Button';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
    return (
        <section className="relative w-full min-h-screen bg-white overflow-hidden pt-10 pb-20 px-4 md:px-8 flex flex-col items-center">

            {/* Top Nav (Minimal per screenshot) */}
            <nav className="w-full max-w-6xl mx-auto flex justify-center items-center z-50 mb-12">
                <div className="font-poppins font-medium text-sm tracking-[0.1em] uppercase">
                    How We Grow
                </div>
            </nav>

            {/* Main Content Stack - Increased max-width to 7xl for wider headline */}
            <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center z-10">

                {/* 1. Pre-headline */}
                <p className="font-poppins italic font-semibold text-lg md:text-xl text-gray-800 mb-2">
                    Learn how to...
                </p>

                {/* 2. Main Headline - Size reduced by ~20% */}
                <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-[5rem] uppercase leading-[0.9] tracking-tight text-black mb-6 flex flex-col items-center w-full">
                    <span className="block mb-2 md:mb-4 w-full">BUILD A 'TAKE MY MONEY' SUBSTACK</span>
                    <span className="relative inline-block transform -rotate-1">
                        {/* Neon Highlighter Background */}
                        <span className="absolute inset-0 bg-brand-neon transform skew-x-[-10deg] scale-105 md:scale-110 -z-10 shadow-sm rounded-sm origin-center"></span>
                        <span className="relative px-2 md:px-4 z-10 block">THAT STOPS THE SCROLL & SELLS FOR YOU</span>
                    </span>
                </h1>

                {/* 3. Subtitle */}
                <p className="font-poppins italic font-light text-base md:text-2xl text-black mb-4 md:mb-8 max-w-3xl">
                    in one weekend, without the agency price tag.
                </p>

                {/* 4. Mockup */}
                <div className="-mt-4 md:-mt-8 mb-8 md:mb-12 w-full flex justify-center">
                    <MockupGroup />
                </div>

                {/* 5. CTA Button Section */}
                <div className="flex flex-col items-center gap-8 relative z-40 mt-4">
                    <Button className="px-10 py-4 md:px-14 md:py-6 text-sm md:text-lg group shadow-[4px_4px_0px_#000000] hover:shadow-[2px_2px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-brand-neon hover:bg-[#e6e200] border-2 border-black">
                        <span className="flex flex-col items-center leading-none gap-1">
                            <span className="font-normal text-lg md:text-xl tracking-wide">LET'S GO, I'M READY!</span>
                            <span className="font-medium text-xs md:text-sm normal-case tracking-normal opacity-90">$597 - The <span className="italic">$10k</span> Launch Lab</span>
                        </span>
                    </Button>

                    {/* 6. Social Proof Phrase */}
                    <p className="font-poppins text-lg md:text-2xl font-bold italic text-center text-black leading-relaxed max-w-xl">
                        5600+ copies of The <span className="italic">$10k</span> Launch Lab sold. Kinda speaks for itself.<br />
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
