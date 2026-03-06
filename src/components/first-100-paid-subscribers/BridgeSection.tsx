'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, X } from 'lucide-react';

const AnimatedCounter = ({ end }: { end: number }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                }
            },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [hasAnimated]);

    useEffect(() => {
        if (!hasAnimated) return;

        let startTime: number | null = null;
        const duration = 2500;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeValue = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeValue * end));
            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [end, hasAnimated]);

    return <span ref={ref}>{count.toLocaleString()}</span>;
};

export const BridgeSection: React.FC = () => {
    return (
        <div className="flex flex-col w-full">

            {/* SECTION 1: Story Opening */}
            <div className="w-full flex justify-center pt-4 pb-20 px-6 bg-white">
                <div className="max-w-[1000px] w-full flex flex-col items-center text-center">
                    <p className="font-lora text-[#333333] font-medium text-xl md:text-3xl leading-relaxed max-w-4xl mb-8">
                        You're showing up. You're writing consistently. Your free subscribers are growing and people are telling you they love your work.
                    </p>
                    <p className="font-lora text-[#333333] font-medium text-xl md:text-3xl leading-relaxed max-w-4xl mb-8">
                        But the paid tier? <span className="italic font-bold text-red-600">Silence.</span>
                    </p>
                    <p className="font-lora text-[#333333] font-medium text-xl md:text-3xl leading-relaxed max-w-4xl mb-12">
                        And every time you see another writer announce their 100th paid subscriber or flash that Substack Bestseller badge — you wonder: <span className="italic">what do they know that I don't?</span>
                    </p>

                    <button
                        onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group relative bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-base md:text-xl py-4 px-8 md:px-12 rounded-[5px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-6 uppercase flex items-center justify-center gap-2"
                    >
                        <span>I WANT IN, ANA!</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                    </button>
                    <p className="font-lato text-gray-500 text-sm">Live Workshop — March 12th | Replay Included | Lifetime Access</p>
                </div>
            </div>

            {/* SECTION 2: Authority & Stats */}
            <div className="w-full flex justify-center py-24 px-6 bg-[#E0F7FA]">
                <div className="max-w-[1000px] w-full flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex-1 text-center md:text-left flex justify-center md:justify-start">
                        <h3 className="font-montserrat font-bold text-black text-2xl md:text-4xl leading-tight max-w-lg">
                            My students apply this system and flip the switch — from writing for free to earning consistently — in under 30 days.
                        </h3>
                    </div>
                    <div className="flex-shrink-0">
                        <div className="bg-[#d81159] text-white rounded-[20px] py-10 px-12 shadow-2xl flex flex-col items-center justify-center text-center border-4 border-white/30 transform transition-transform hover:scale-105">
                            <span className="font-anton text-4xl md:text-6xl mb-2 leading-none">
                                <AnimatedCounter end={6200} />+
                            </span>
                            <span className="font-lato font-bold uppercase tracking-widest text-sm md:text-base">Paid Subscribers Converted</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 3: The Real Problem */}
            <div className="w-full flex justify-center pt-24 pb-12 px-6 bg-white">
                <div className="max-w-[1000px] w-full flex flex-col items-center text-center">
                    <h2 className="font-montserrat font-extrabold text-[#000000] text-3xl md:text-[42px] leading-tight uppercase mb-6">
                        The writers hitting Bestseller status aren't better writers than you.
                    </h2>
                    <p className="font-lora italic text-[#333333] text-xl md:text-2xl max-w-3xl mb-6">
                        They just have a conversion system. A way of asking for the upgrade that feels natural, inevitable, and irresistible — not desperate.
                    </p>
                    <p className="font-lora text-[#333333] text-xl md:text-2xl max-w-3xl">
                        That's exactly what I'm going to give you inside this 90-minute workshop.
                    </p>
                </div>
            </div>

            {/* SECTION 4: Requires NO */}
            <div className="w-full flex justify-center py-20 px-6 bg-[#FDF2F8]">
                <div className="max-w-[1000px] w-full flex flex-col items-center text-center">
                    <div className="text-center mb-16">
                        <p className="font-montserrat font-bold text-xl md:text-3xl uppercase text-[#333333]">
                            Hitting 100 paid subscribers requires <span className="text-red-600 underline decoration-red-600/30 underline-offset-4">NO</span>:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 text-left w-full max-w-[900px]">
                        {[
                            "going viral or gaming the algorithm",
                            "thousands of free subscribers first",
                            "posting every single day until you burn out",
                            "spending a cent on paid ads",
                            "complicated funnels or overwhelming tech",
                            "being a natural 'salesperson'",
                            "a massive social media following",
                            "months of waiting before you earn a single dollar"
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-5">
                                <div className="mt-1 flex-shrink-0">
                                    <X className="w-8 h-8 text-red-600" strokeWidth={3} />
                                </div>
                                <span className="font-lora italic text-[#333333] text-2xl leading-snug">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-24">
                        <button
                            onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-base md:text-xl py-4 px-8 md:px-12 rounded-[5px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase flex items-center justify-center gap-3"
                        >
                            <span>SOUNDS LIKE A GREAT FIT!</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};
