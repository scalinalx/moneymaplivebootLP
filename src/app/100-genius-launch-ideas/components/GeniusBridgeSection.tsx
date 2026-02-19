'use client';

import React from 'react';
import { X, ArrowRight } from 'lucide-react';

export const GeniusBridgeSection = ({ onScrollToCheckout }: { onScrollToCheckout: () => void }) => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-rose-50/50">
            <div className="max-w-[900px] w-full flex flex-col items-center">

                {/* Headline */}
                <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-5xl text-center mb-16 text-slate-900 leading-tight">
                    Finding your $10k idea requires <span className="text-rose-500 underline decoration-rose-500/30 underline-offset-4">NO</span>:
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-left w-full max-w-[800px] mb-16">
                    {[
                        "Expert status or 'guru' credentials",
                        "Huge social media audience",
                        "Complex tech or funnels",
                        "Months of market research",
                        "Hiring expensive copywriters",
                        "Being 'original' (proven > new)",
                        "Showing your face on camera",
                        "Spending money on ads"
                    ].map((item, index) => (
                        <div key={index} className="flex items-start gap-4 group hover:-translate-y-1 transition-transform duration-300">
                            <div className="mt-1 flex-shrink-0 bg-white rounded-full p-1 shadow-sm">
                                <X className="w-6 h-6 text-rose-500" strokeWidth={3} />
                            </div>
                            <span className="font-display text-slate-700 text-xl md:text-2xl leading-snug">
                                {item}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Paradigm Shift Box */}
                <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-rose-200/50 border border-rose-100 text-center max-w-4xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500"></div>
                    <p className="font-display font-bold text-2xl md:text-3xl text-slate-900 mb-6 tracking-tight">
                        Ideas are cheap. <span className="text-rose-600">Execution is everything.</span>
                    </p>
                    <p className="font-light text-slate-700 text-xl md:text-2xl leading-relaxed italic">
                        The single biggest killer of wealth, health, and fulfillment is <span className="font-bold text-rose-600 uppercase tracking-wide not-italic">Selection Paralysis</span>.
                        Most creators spend a lifetime "wondering" while others are "winning." This repository ends the guessing game forever.
                    </p>
                </div>

                {/* CTA */}
                <div className="mt-16">
                    <button
                        onClick={onScrollToCheckout}
                        className="group relative bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold text-lg md:text-xl py-4 px-10 rounded-full shadow-lg shadow-pink-500/30 hover:shadow-pink-500/40 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3"
                    >
                        <span>Find My $10k Idea Now</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

            </div>
        </div>
    );
};
