'use client';

import React from 'react';
import { ArrowRight, X } from 'lucide-react';

const stuckItems = [
    "\"I've changed my newsletter name 6 times and I still hate all of them\"",
    "\"I don't know if my niche is specific enough — or too specific\"",
    "\"I have 30 article ideas but I can't figure out which one to publish first\"",
    "\"I don't understand when to turn on paid or what to put behind the paywall\"",
    "\"I've been 'about to launch' for 3 months\"",
    "\"Everyone else seems to know exactly what they're doing and I feel paralyzed\"",
];

export const BridgeSection: React.FC = () => {
    return (
        <div className="flex flex-col w-full">

            {/* SECTION 1: The Problem */}
            <div className="w-full flex justify-center pt-4 pb-20 px-6 bg-white">
                <div className="max-w-[1000px] w-full flex flex-col items-center text-center">
                    <p className="font-lora text-[#333333] font-medium text-xl md:text-3xl leading-relaxed max-w-4xl mb-8">
                        You don't have a writing problem. You have a <span className="italic font-bold text-red-600">starting</span> problem.
                    </p>
                    <p className="font-lora text-[#333333] font-medium text-xl md:text-3xl leading-relaxed max-w-4xl mb-8">
                        Most people who want to start a Substack never publish their first post. Not because they can't write. Because they get trapped in <span className="italic">decision mode</span> — endlessly circling the same questions without moving forward.
                    </p>

                    {/* Stuck List */}
                    <div className="w-full max-w-3xl bg-[#fffdf5] border-l-4 border-[#ffc300] rounded-r-lg p-6 md:p-8 mb-8 text-left">
                        <p className="font-montserrat font-bold text-[#1a1a1a] text-lg mb-4">Sound familiar?</p>
                        <div className="flex flex-col gap-3">
                            {stuckItems.map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <X className="w-5 h-5 text-[#f72585] flex-shrink-0 mt-0.5" strokeWidth={3} />
                                    <span className="font-lato text-[#333333] text-base md:text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="font-lora text-[#333333] font-medium text-xl md:text-3xl leading-relaxed max-w-4xl mb-4">
                        This isn't a motivation problem. It's a structure problem. You don't need more inspiration. You need someone to sit next to you and say: <span className="font-bold">"Do this first. Then this. Then this. Now hit publish."</span>
                    </p>
                    <p className="font-lora text-[#333333] font-medium text-xl md:text-3xl leading-relaxed max-w-4xl mb-12">
                        That's exactly what this workshop does.
                    </p>

                    <button
                        onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group bg-[#ffc300] hover:bg-[#e6b000] text-[#1a1a1a] font-montserrat font-bold text-base md:text-xl py-4 px-8 md:px-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-6 uppercase flex items-center justify-center gap-2"
                    >
                        <span>I'LL BE THERE!</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                    </button>
                    <p className="font-lato text-gray-500 text-sm">Live Workshop — Sat, March 21 @ 10:00 AM EST | Replay Included | Lifetime Access</p>
                </div>
            </div>

            {/* Social Proof Insert */}
            <div className="w-full flex justify-center pb-20 px-6 bg-white">
                <div className="max-w-[800px] w-full flex flex-col sm:flex-row gap-6 justify-center">
                    <img src="/imgs/first-100-paid-subscribers/testim/11.webp" alt="Testimonial 11" className="w-full sm:w-1/2 rounded-2xl shadow-lg border border-gray-100 object-contain" />
                    <img src="/imgs/first-100-paid-subscribers/testim/12.webp" alt="Testimonial 12" className="w-full sm:w-1/2 rounded-2xl shadow-lg border border-gray-100 object-contain" />
                </div>
            </div>

            {/* SECTION 2: Requires NO */}
            <div className="w-full flex justify-center py-20 px-6 bg-[#FDF2F8]">
                <div className="max-w-[1000px] w-full flex flex-col items-center text-center">
                    <div className="text-center mb-16">
                        <p className="font-montserrat font-bold text-xl md:text-3xl uppercase text-[#333333]">
                            Getting your Substack off the ground requires <span className="text-red-600 underline decoration-red-600/30 underline-offset-4">NO</span>:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 text-left w-full max-w-[900px]">
                        {[
                            "a perfect name — you can change it later",
                            "thousands of followers on other platforms",
                            "months of planning before you publish",
                            "spending money on ads or tools",
                            "being a 'natural writer' or English major",
                            "figuring out the tech on your own",
                            "a finished content calendar",
                            "knowing everything about your niche before you start"
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
                            className="group bg-[#ffc300] hover:bg-[#e6b000] text-[#1a1a1a] font-montserrat font-bold text-base md:text-xl py-4 px-8 md:px-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase flex items-center justify-center gap-3"
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
