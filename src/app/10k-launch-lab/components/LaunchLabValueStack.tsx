'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const valueItems = [
    { label: "Video Training Library", desc: "Step-by-step modules you watch at your own pace", value: 297 },
    { label: "Live Group Coaching Calls", desc: "Weekly hot-seats and Q&A with Ana — get unstuck fast", value: 397 },
    { label: "Direct Feedback on Your Offer", desc: "Submit your offer and get a personal critique", value: 297 },
    { label: "Private Community Access", desc: "A high-accountability space of ambitious peers pushing to $10k", value: 197 },
    { label: "PDF Playbooks & Guides", desc: "Printable step-by-step launch maps and strategy docs", value: 197 },
    { label: "Workbooks & Exercises", desc: "Fill-in-the-blank frameworks that do the thinking for you", value: 97 },
    { label: "Plug-and-Play Templates", desc: "Sales pages, email sequences, social posts — ready to deploy", value: 197 },
    { label: "Access to Custom-Built AI Tools", desc: "Proprietary tools to generate offers, hooks, and content in seconds", value: 297 },
];

const totalValue = valueItems.reduce((sum, i) => sum + i.value, 0);
const currentPrice = 597;

const scrollToCheckout = () => {
    const el = document.getElementById('checkout');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export const LaunchLabValueStack: React.FC = () => {
    return (
        <section className="w-full py-20 px-4 md:px-8 bg-black text-white">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block bg-brand-neon text-black font-display font-black text-xs uppercase tracking-widest px-4 py-2 border-2 border-black mb-6">
                        ⚡ Today Only — Limited Enrollment
                    </span>
                    <h2 className="font-display font-black text-4xl md:text-5xl uppercase leading-tight tracking-tight mb-4">
                        Everything You Get<br />
                        <span className="text-brand-neon">Inside the Lab</span>
                    </h2>
                    <p className="font-poppins text-white/70 text-lg">
                        Here's what's stacked inside your investment — and what it's worth.
                    </p>
                </div>

                {/* Value Stack List */}
                <div className="flex flex-col gap-3 mb-12">
                    {valueItems.map((item, i) => (
                        <div key={i} className="flex items-start justify-between gap-4 bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 size={20} className="text-brand-neon flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-display font-black text-white text-lg uppercase leading-tight">{item.label}</p>
                                    <p className="font-poppins text-white/50 text-sm mt-1">{item.desc}</p>
                                </div>
                            </div>
                            <span className="font-poppins font-bold text-white/60 text-sm flex-shrink-0 whitespace-nowrap">${item.value}</span>
                        </div>
                    ))}
                </div>

                {/* Total & Pricing */}
                <div className="bg-white/5 border-2 border-brand-neon rounded-2xl p-8 text-center">
                    <p className="font-poppins text-white/60 uppercase tracking-widest text-xs font-bold mb-3">Total Value</p>
                    <p className="font-display font-black text-5xl text-white/30 line-through mb-2">
                        ${totalValue.toLocaleString()}
                    </p>
                    <p className="font-poppins text-white/60 uppercase tracking-widest text-xs font-bold mb-3">Today Only — You Pay</p>
                    <p className="font-display font-black text-7xl md:text-8xl text-brand-neon">
                        ${currentPrice}
                    </p>
                    <p className="font-poppins text-white/50 text-sm mt-3 mb-8">
                        One-time payment • Instant access • Lifetime community
                    </p>
                    <button
                        onClick={scrollToCheckout}
                        className="w-full bg-brand-neon hover:bg-[#e6e200] text-black font-display font-black text-xl py-5 rounded-sm border-2 border-black shadow-[6px_6px_0px_#FFFB00] hover:shadow-[3px_3px_0px_#FFFB00] hover:translate-x-[3px] hover:translate-y-[3px] transition-all uppercase tracking-wider"
                    >
                        YES — I WANT MY FIRST $10K MONTH!
                    </button>
                    <p className="font-poppins text-white/30 text-xs mt-4 italic">
                        Price goes back to $1,997 when this cohort closes.
                    </p>
                </div>

            </div>
        </section>
    );
};
