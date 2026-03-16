'use client';

import React from 'react';
import { ArrowRight, Calendar, Clock, Monitor, RotateCcw } from 'lucide-react';

export const HeroSection: React.FC = () => {
    return (
        <div className="w-full flex flex-col">
            {/* Dark hero area */}
            <div className="w-full bg-[#1a1a1a] relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#ffc300] opacity-[0.07] rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#f72585] opacity-[0.05] rounded-full" />

                <div className="w-full flex justify-center px-6 pt-3 md:pt-4 relative z-10">
                    <div className="max-w-[1100px] w-full flex flex-col items-center text-center">

                        {/* Urgency pill */}
                        <div className="mb-5">
                            <span className="inline-block bg-[#f72585] text-white text-[11px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full animate-pulse">
                                Only 100 Seats Available
                            </span>
                        </div>

                        {/* Headline — exactly 2 rows */}
                        <h1 className="font-anton leading-[1.08] uppercase mb-4 tracking-wide w-full">
                            <span className="block text-[#ffc300] text-3xl sm:text-4xl md:text-5xl lg:text-[64px]">From Unstuck to Published:</span>
                            <span className="block text-white text-xl sm:text-2xl md:text-3xl lg:text-[40px] xl:text-[44px] mt-1 whitespace-nowrap">Build Your Substack the Right Way From Day One</span>
                        </h1>

                        <p className="text-gray-400 italic text-sm font-lora mb-6">*limited time offer*</p>

                        {/* Hero Image */}
                        <div className="w-full max-w-[1100px] mb-6 rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="/imgs/unstuck-to-published/hero1.webp"
                                alt="Unstuck to Published — Live Workshop with Ana & Jessica"
                                className="w-full h-auto"
                            />
                        </div>

                        {/* Sub-copy */}
                        <p className="font-montserrat font-bold text-white/90 text-sm md:text-lg max-w-3xl mb-5 leading-snug">
                            Walk in with an idea. Walk out with a positioned publication, a structured first article, and a paywall strategy that converts — in 60 minutes flat.
                        </p>

                        {/* Details row */}
                        <div className="flex flex-wrap gap-3 md:gap-5 justify-center mb-8">
                            {[
                                { icon: Calendar, text: "Sat, March 21" },
                                { icon: Clock, text: "10:00 AM EST" },
                                { icon: Monitor, text: "Live on Zoom" },
                                { icon: RotateCcw, text: "Replay included" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-gray-400 text-xs md:text-sm font-semibold">
                                    <div className="w-6 h-6 bg-[#ffc300]/15 rounded-full flex items-center justify-center">
                                        <item.icon size={12} className="text-[#ffc300]" />
                                    </div>
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA — below image */}
                        <div className="flex flex-col items-center mb-8">
                            <button
                                onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group bg-[#ffc300] hover:bg-[#e6b000] text-[#1a1a1a] font-montserrat font-black text-xl md:text-2xl py-5 px-10 md:px-16 rounded-lg shadow-[0_4px_30px_rgba(255,195,0,0.35)] hover:shadow-[0_8px_40px_rgba(255,195,0,0.5)] transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wider flex items-center gap-3"
                            >
                                <span>BOOK YOUR SEAT — $97</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                            </button>
                            <p className="text-[#f72585] font-semibold mt-3 text-sm tracking-wide">
                                Only 50 seats. Replay included for all attendees.
                            </p>
                        </div>

                        {/* Emotional copy — below CTA */}
                        <p className="font-lato text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mb-4">
                            You've been thinking about starting a Substack for weeks. Maybe months. You know you have something worth sharing. But every time you sit down to do it, you get stuck on <span className="text-white font-semibold">the name, the niche, the first post, the paywall, the tech</span> — and nothing gets published.
                        </p>
                        <p className="font-lato text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mb-10">
                            This workshop fixes that in 60 minutes. You'll walk in with an idea and walk out with <span className="text-white font-semibold">a positioned publication, a structured first article, and a monetization strategy</span> — built live, with two creators who've done it.
                        </p>

                        {/* Sub-Headline */}
                        <h2 className="font-display text-white text-[15px] md:text-[22px] leading-tight max-w-[1100px] mb-10 font-bold uppercase italic tracking-tight">
                            A 60-minute live workshop for Substack creators who are done overthinking and ready to publish — with two experts who've built Bestseller publications from scratch
                        </h2>
                    </div>
                </div>
            </div>

            {/* Light section: Credibility Boxes */}
            <div className="w-full flex justify-center px-6 py-12 bg-white">
                <div className="max-w-[1100px] w-full flex flex-col items-center">
                    <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            { title: "From Zero to Bestseller Fast", desc: "Ana started with no audience and hit 100K in subscription revenue in just 15 months on Substack — all from paid subscribers who love her content." },
                            { title: "Trusted by 79,000+ Readers", desc: "How We Grow now has over 79,000 subscribers and a passionate community that keeps coming back for more." },
                            { title: "Real Strategies, Real Results", desc: "Everything we'll share in this workshop are actionable methods you can start right away — no fluff, no hacks, just honest steps to real growth." },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col bg-gray-50 rounded-2xl py-6 px-6 border border-gray-100 text-left h-full">
                                <span className="font-montserrat font-bold text-[#f72585] text-lg md:text-xl leading-snug mb-3 uppercase">{item.title}</span>
                                <span className="font-lato text-[#333333] text-sm md:text-base leading-relaxed">{item.desc}</span>
                            </div>
                        ))}
                    </div>

                    {/* Social Proof Images */}
                    <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mb-4 justify-center">
                        <img src="/imgs/first-100-paid-subscribers/testim/9.webp" alt="Testimonial 9" className="w-full md:w-1/2 rounded-2xl shadow-md border border-gray-100 object-contain" />
                        <img src="/imgs/first-100-paid-subscribers/testim/10.webp" alt="Testimonial 10" className="w-full md:w-1/2 rounded-2xl shadow-md border border-gray-100 object-contain" />
                    </div>
                </div>
            </div>
        </div>
    );
};
