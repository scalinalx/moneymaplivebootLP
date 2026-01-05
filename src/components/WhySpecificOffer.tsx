'use client';

import React from 'react';
import { Target, Zap, TrendingUp, XCircle, CheckCircle2 } from 'lucide-react';

const WhySpecificOffer: React.FC = () => {
    const comparisons = [
        {
            title: "Focus",
            common: "Writing better 'threads' or hooks to game an algorithm that doesn't care about you.",
            btp: "Building a high-ticket offer that converts your existing readers into $1k+ clients.",
            icon: <Target className="w-6 h-6" />
        },
        {
            title: "Metric",
            common: "Vanity metrics like open rates, likes, and followers that don't pay the rent.",
            btp: "Stripe notifications and high-intent sales calls. We optimize for profit, not popularity.",
            icon: <TrendingUp className="w-6 h-6" />
        },
        {
            title: "Speed",
            common: "12-week marathons of 'homework' and theory that usually ends in zero implementation.",
            btp: "A 2-day implementation sprint. We don't just teach the system; we build it with you.",
            icon: <Zap className="w-6 h-6" />
        }
    ];

    return (
        <section className="relative z-10 border-y border-brand-800 bg-brand-950 py-24 px-4 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-24 -mr-24 h-96 w-96 rounded-full bg-brand-lime opacity-[0.03] blur-[100px]" />
            <div className="absolute bottom-0 left-0 -mb-24 -ml-24 h-96 w-96 rounded-full bg-brand-lime opacity-[0.03] blur-[100px]" />

            <div className="mx-auto max-w-6xl relative z-10">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
                        WHY <span className="text-brand-lime">THIS SPECIFIC</span> OFFER?
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-brand-grey font-medium">
                        Most newsletter courses teach you how to write. <br className="hidden md:block" />
                        <span className="text-white italic">Build to Profit</span> is a system for selling.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {comparisons.map((item, idx) => (
                        <div key={idx} className="group relative border border-brand-800 bg-brand-900/50 p-8 transition-all duration-300 hover:border-brand-lime/30">
                            <div className="absolute -top-4 left-8 bg-brand-lime p-2 text-brand-950 shadow-lg">
                                {item.icon}
                            </div>

                            <h3 className="mb-8 mt-4 font-display text-xl font-bold uppercase tracking-wider text-white">
                                {item.title}
                            </h3>

                            <div className="space-y-6">
                                <div className="relative pl-8 opacity-50">
                                    <XCircle className="absolute left-0 top-1 h-5 w-5 text-red-500/70" />
                                    <p className="text-sm leading-relaxed text-brand-grey">
                                        <span className="block mb-1 text-xs font-bold uppercase tracking-widest text-red-500/50">Generic Courses</span>
                                        {item.common}
                                    </p>
                                </div>

                                <div className="relative pl-8">
                                    <CheckCircle2 className="absolute left-0 top-1 h-5 w-5 text-brand-lime" />
                                    <p className="text-sm leading-relaxed text-white">
                                        <span className="block mb-1 text-xs font-bold uppercase tracking-widest text-brand-lime">Build to Profit</span>
                                        <span className="font-medium text-brand-white">{item.btp}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex flex-col md:flex-row items-center gap-4 border border-brand-lime/20 bg-brand-lime/5 px-6 py-4">
                        <p className="text-brand-lime font-mono text-sm font-bold tracking-tighter">
                            VERDICT:
                        </p>
                        <p className="text-brand-white text-sm font-medium">
                            If you want "growth hacks," buy a course. If you want a <span className="underline decoration-brand-lime decoration-2 underline-offset-4">revenue engine</span>, join Build To Profit.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhySpecificOffer;
