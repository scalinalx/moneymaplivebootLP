'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface GeniusOutcomesSectionProps {
    onScrollToCheckout: () => void;
}

export const GeniusOutcomesSection = ({ onScrollToCheckout }: GeniusOutcomesSectionProps) => {
    return (
        <section className="mt-20 mb-10 w-full rounded-[3rem] p-10 md:p-14 bg-[#F5F2F3] border border-rose-100/50 shadow-sm relative overflow-hidden text-center mx-auto">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/30 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-200/30 rounded-full blur-3xl -ml-32 -mb-32"></div>

            <div className="relative z-10">
                <h2 className="font-display font-bold text-3xl md:text-5xl text-slate-900 mb-12">
                    You'll learn to...
                </h2>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 max-w-[900px] mx-auto mb-16 text-left">
                    {[
                        "Make a quick cash injection this week",
                        "Prove your idea works before going all-in",
                        "Have your first (or next) $10k+ launch",
                        "Scale your revenue without launching every month",
                        "Quit your 9-5 and go full-time in your biz",
                        "Get paid for what you already know",
                        "Build a sellable asset that pays you while you sleep",
                        "Finally see those Stripe notifications on repeat"
                    ].map((item, i) => (
                        <div key={i} className={`flex items-center gap-4 group transition-transform hover:translate-x-1 p-4 rounded-xl ${i % 2 === 0 ? 'bg-white/80' : 'bg-rose-50/50'}`}>
                            <div className="bg-emerald-500 rounded-full p-1.5 flex-shrink-0 shadow-lg shadow-emerald-500/20">
                                <CheckCircle2 size={20} className="text-white" strokeWidth={3} />
                            </div>
                            <span className="text-xl md:text-2xl font-bold text-slate-700 leading-tight tracking-tight">
                                {item}
                            </span>
                        </div>
                    ))}
                </div>

                <p className="font-display font-bold text-3xl md:text-5xl text-slate-900 mb-12">
                    ... and so much more
                </p>

                <div className="mb-12 w-full max-w-[800px] mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    <img
                        src="/imgs/100-genius-offers/232_Discord___pdf-documents___HowWeGrow-Internal_-_24_February_2026.gif"
                        alt="100 Genius Offers Preview"
                        className="w-full h-auto"
                    />
                </div>

                <div className="flex flex-col items-center gap-8">
                    <button
                        onClick={onScrollToCheckout}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-black px-12 py-6 rounded-2xl shadow-2xl shadow-rose-500/30 transition-all hover:-translate-y-1 text-xl uppercase tracking-tight"
                    >
                        Unlock The 100 Genius Offers!
                    </button>

                    <p className="font-display font-bold text-xl md:text-2xl text-slate-400">
                        + Keep scrolling to see details of everything that's included!
                    </p>
                </div>
            </div>
        </section>
    );
};
