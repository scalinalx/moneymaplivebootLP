'use client';

import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const GeniusOfferStack = ({ onScrollToCheckout }: { onScrollToCheckout: () => void }) => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-white overflow-hidden">
            <div className="max-w-[900px] w-full flex flex-col items-center">

                {/* Section Headline */}
                <h2 className="font-display font-bold text-4xl md:text-6xl text-center mb-16 text-slate-900 leading-tight">
                    EVERYTHING YOU GET<br />
                    <span className="text-rose-500 text-2xl md:text-3xl font-medium tracking-widest uppercase mt-4 block">
                        Inside The Bundle
                    </span>
                </h2>

                {/* The Stack */}
                <div className="flex flex-col gap-6 w-full mb-16">
                    {[
                        {
                            bold: "100 Battle-Tested Offer Architectures",
                            italic: "Complete 8-part viral frameworks that turn 'interest' into 'immediate sales'."
                        },
                        {
                            bold: "The 3-Tier Rapid Revenue Matrix",
                            italic: "From $1k weekend 'Springboards' to $30k 'Empire-Builder' high-ticket cohorts."
                        },
                        {
                            bold: "Niche Dominance Index",
                            italic: "Health, Wealth, Relationships, and Growth—10 categories covering every human desire."
                        },
                        {
                            bold: "Proprietary Monetization Psychology",
                            italic: "Proven frameworks from elite Accelerators that force buyers to say 'YES'."
                        },
                        {
                            bold: "The 'Unfair Advantage' Hooks",
                            italic: "Messaging that makes your competitors look like amateurs instantly.",
                            isBonus: true
                        },
                        {
                            bold: "Passive-Income Money Funnels",
                            italic: "The exact 'Entry → Upsell → Continuity' architecture for true time freedom.",
                            isBonus: true
                        },
                        {
                            bold: "184-Page Wealth Repository",
                            italic: "A business-in-a-box vault designed for the next decade of digital prosperity.",
                            isBonus: true
                        }
                    ].map((item, index) => (
                        <div key={index} className="flex items-start gap-5 p-4 rounded-2xl hover:bg-slate-50 transition-colors duration-300">
                            <div className="flex-shrink-0 mt-1">
                                <CheckCircle2 className="w-8 h-8 text-rose-500 fill-rose-50" />
                            </div>
                            <div className="font-light text-lg md:text-xl text-slate-700 leading-relaxed">
                                {item.isBonus && (
                                    <span className="inline-block bg-amber-400 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mr-3 align-middle shadow-sm transform -rotate-2">
                                        Bonus
                                    </span>
                                )}
                                <span className="font-bold text-slate-900">{item.bold}</span>{" "}
                                <span className="italic text-slate-500">{item.italic}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Price and CTA */}
                <div className="w-full bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-slate-900/20">
                    {/* Background Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-slate-800 to-slate-900 -z-10"></div>
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <p className="text-slate-400 uppercase tracking-widest font-bold mb-6 text-sm">
                            Total Value: <span className="line-through decoration-rose-500 decoration-2 text-slate-500">$197</span>
                        </p>

                        <div className="flex items-center justify-center gap-4 mb-10">
                            <span className="font-display font-bold text-6xl md:text-8xl text-white tracking-tight">
                                $9.97
                            </span>
                            <span className="text-left leading-tight text-slate-400 text-sm md:text-base font-light">
                                One-time<br />payment
                            </span>
                        </div>

                        <button
                            onClick={onScrollToCheckout}
                            className="w-full md:w-auto bg-white hover:bg-slate-50 text-slate-900 font-bold text-lg md:text-xl py-5 px-12 rounded-full shadow-xl shadow-white/10 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 mx-auto"
                        >
                            <span>Download The Bundle Now</span>
                            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                        </button>

                        <p className="text-slate-500 mt-6 text-sm font-light">
                            Instant Access • 30-Day Money Back Guarantee
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};
