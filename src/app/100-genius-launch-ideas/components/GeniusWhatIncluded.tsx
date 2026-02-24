'use client';

import React from 'react';
import { BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';

export const GeniusWhatIncluded = ({ onScrollToCheckout }: { onScrollToCheckout: () => void }) => {
    const categories = [
        {
            name: "Business & Marketing",
            count: "30 Ideas",
            items: ["The $3K Client Positioning Kit", "The 50-Email Launch Library", "The Email List Money Map", "The $1K Value Stack Builder"]
        },
        {
            name: "Health & Wellness",
            count: "19 Ideas",
            items: ["The 'Normal' Labs Decoder", "The 90-Second Cortisol Reset", "The 7-Day Inflammation Kill Kit", "The Hormone-to-Symptom Matcher"]
        },
        {
            name: "Personal Development",
            count: "14 Ideas",
            items: ["The ADHD Income Operating System", "The 8-Hour Sleep Protocol", "The Focus Mastery Blueprint"]
        },
        {
            name: "Content & Writing",
            count: "12 Ideas",
            items: ["The Story-to-$10K Sales Vault", "The 1-to-30 Content Multiplication System", "The 500-Hook Swipe File"]
        },
        {
            name: "Relationships & Parenting",
            count: "11 Ideas",
            items: ["The Toddler-Tantrum Decoder", "The Relationship Reset Map", "The Connected Parent Protocol"]
        },
        {
            name: "Tech, AI & Specialists",
            count: "14 Ideas",
            items: ["The Human AI System", "The 1,000-Prompt Command Library", "The Teacher's Side-Hustle Framework"]
        }
    ];

    return (
        <section className="mb-20 py-16 px-4 md:px-8 bg-slate-50/50 rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden relative">
            <div className="max-w-[1000px] mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                        <BookOpen size={14} />
                        Table of Contents
                    </div>
                    <h2 className="font-display font-bold text-4xl md:text-6xl text-slate-900 mb-6 leading-tight">
                        What's Inside The Vault?
                    </h2>
                    <p className="text-slate-500 text-lg md:text-xl max-w-[700px] mx-auto font-medium">
                        A full 184-page breakdown of 100 pre-validated ideas across 10 distinct categories. No fluff, just the money-making blueprints.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {categories.map((cat, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:shadow-rose-500/5 transition-all group">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-display font-bold text-2xl text-slate-900 group-hover:text-rose-600 transition-colors">
                                    {cat.name}
                                </h3>
                                <span className="text-sm font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-tighter">
                                    {cat.count}
                                </span>
                            </div>

                            <ul className="space-y-4">
                                {cat.items.map((item, j) => (
                                    <li key={j} className="flex items-center gap-3 text-slate-600 group-hover:translate-x-1 transition-transform">
                                        <ChevronRight size={16} className="text-rose-400 flex-shrink-0" />
                                        <span className="text-lg font-medium tracking-tight italic">"{item}"</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="text-center bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500"></div>

                    <div className="mb-10 w-full max-w-[800px] mx-auto rounded-3xl overflow-hidden shadow-xl border-4 border-slate-50">
                        <img src="/imgs/100-genius-offers/bundle_niches.jpeg" alt="Included Niches" className="w-full h-auto object-cover" />
                    </div>

                    <h3 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mb-8">
                        Ready to see the other 80+ ideas?
                    </h3>

                    <button
                        onClick={onScrollToCheckout}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-black px-12 py-6 rounded-2xl shadow-2xl shadow-rose-500/30 transition-all hover:-translate-y-1 text-xl uppercase tracking-tight"
                    >
                        Unlock The Entire 100 Ideas Vault!
                    </button>

                    <p className="mt-8 text-slate-400 font-bold text-sm uppercase tracking-widest">
                        + Instant PDF Download • Forever Access
                    </p>
                </div>
            </div>
        </section>
    );
};
