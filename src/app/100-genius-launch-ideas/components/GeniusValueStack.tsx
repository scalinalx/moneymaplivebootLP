'use client';

import React from 'react';
import { CheckCircle2, Zap } from 'lucide-react';
import { GENIUS_IDEAS_PRICE } from '@/lib/constants';

const valueItems = [
    {
        emoji: "📚",
        label: "100 Pre-Validated Offer Blueprints",
        desc: "Every idea is field-tested across 600+ real creators — no theory, no filler",
        value: 197,
    },
    {
        emoji: "🎯",
        label: "10-Niche Market Breakdown",
        desc: "Business, Health, Wellness, Parenting, Tech & more — know exactly where demand lives",
        value: 97,
    },
    {
        emoji: "🏗️",
        label: "8-Part Offer Architecture Per Idea",
        desc: "Hook, value stack, pricing tiers, bonuses & more — all laid out per offer",
        value: 197,
    },
    {
        emoji: "💰",
        label: "Revenue Tiers & Pricing Guide",
        desc: "Each idea is paired with proven price points so you start at the right number",
        value: 97,
    },
    {
        emoji: "⚡",
        label: "Effort + Time-to-Launch Ratings",
        desc: "Know in 10 seconds if an idea fits your bandwidth — quick or slow builder",
        value: 47,
    },
    {
        emoji: "👥",
        label: "Target Audience Profiles",
        desc: "100 buyer personas you can swipe to write copy that converts instantly",
        value: 97,
    },
    {
        emoji: "🔁",
        label: "Money Funnel Structure Per Idea",
        desc: "Front-end offer, upsell, and recurring revenue mapped out for every blueprint",
        value: 97,
    },
];

const totalValue = valueItems.reduce((sum, i) => sum + i.value, 0);

export const GeniusValueStack = ({ onScrollToCheckout }: { onScrollToCheckout: () => void }) => {
    const price = (GENIUS_IDEAS_PRICE / 100).toFixed(2);

    return (
        <section className="w-full py-24 px-4 bg-slate-900 text-white">
            <div className="max-w-[800px] mx-auto">

                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-block bg-rose-500 text-white font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                        ⚡ One-Time Price — Today Only
                    </span>
                    <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight leading-tight mb-4">
                        Here's Everything<br />
                        <span className="text-rose-400">You're Getting</span>
                    </h2>
                    <p className="text-slate-400 text-lg font-medium max-w-[580px] mx-auto">
                        Stack it up. This is why people who see this page buy on the spot.
                    </p>
                </div>

                {/* Value Stack List */}
                <div className="flex flex-col gap-3 mb-12">
                    {valueItems.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-start justify-between gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors group"
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-2xl flex-shrink-0 mt-0.5">{item.emoji}</span>
                                <div>
                                    <p className="font-black text-white text-base md:text-lg uppercase leading-tight tracking-tight">{item.label}</p>
                                    <p className="text-slate-400 text-sm mt-1 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                            <div className="flex-shrink-0 text-right">
                                <span className="text-slate-500 text-xs font-bold uppercase block">Value</span>
                                <span className="text-white font-black text-base">${item.value}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total Box */}
                <div className="bg-white/5 border-2 border-rose-500/50 rounded-3xl p-8 md:p-10 text-center">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="h-px flex-1 bg-white/10"></div>
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Real Value</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    <p className="font-bold text-5xl md:text-6xl text-slate-600 line-through decoration-rose-500 mb-4">
                        ${totalValue}
                    </p>

                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px flex-1 bg-white/10"></div>
                        <span className="text-rose-400 text-xs font-bold uppercase tracking-widest">Your Price Today</span>
                        <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    <p className="font-display font-bold text-7xl md:text-8xl text-white mb-2">
                        ${price}
                    </p>
                    <p className="text-slate-500 text-sm mb-10">
                        One-time payment • Instant PDF download • Lifetime access
                    </p>

                    <button
                        onClick={onScrollToCheckout}
                        className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black text-xl py-6 rounded-2xl shadow-2xl shadow-rose-500/30 transition-all hover:-translate-y-1 uppercase tracking-tight"
                    >
                        YES — Unlock All 100 Genius Offers Now!
                    </button>
                    <p className="text-slate-600 text-xs mt-4 italic">
                        Price may increase without notice. Lock in your access today.
                    </p>
                </div>

            </div>
        </section>
    );
};
