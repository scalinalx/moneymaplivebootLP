'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const GeniusWorkForMe = ({ onScrollToCheckout }: { onScrollToCheckout: () => void }) => {
    const mainNiches = ["Coaches", "Service Providers", "Consultants", "Digital Educators"];

    const columns = [
        [
            "Brand Designer", "Mindset Coach", "Podcast Manager",
            "Web Designer", "Copy Writer", "Financial Coach",
            "Bookkeeper", "Business Coach"
        ],
        [
            "Funnel Builder", "Social Media Manager", "Virtual Assistant",
            "Life Coach", "Parenting Coach", "Interior Designer",
            "Home Organizer", "Ads Manager"
        ],
        [
            "Digital Marketer", "Wellness Coach", "Sales Coach",
            "Course Creator", "Video Editor", "Health Coach",
            "Email Marketer", "Content Creator"
        ]
    ];

    return (
        <section className="py-24 px-4 bg-[#F9F5F3]">
            <div className="max-w-[1100px] mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="font-display font-bold text-5xl md:text-7xl text-slate-900 mb-6 tracking-tight">
                        Will this work for me?
                    </h2>
                    <p className="text-slate-600 text-lg md:text-xl font-medium max-w-[700px] mx-auto leading-relaxed">
                        This bundle is designed for these <span className="font-black text-slate-900 border-b-2 border-emerald-400">four main niches</span>. If you're in one of these industries, this will be a great fit for you!
                    </p>
                </div>

                {/* Main Niches Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
                    {mainNiches.map((niche, i) => (
                        <div key={i} className="bg-white border-2 border-emerald-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all hover:scale-[1.02] duration-300">
                            <div className="bg-emerald-500 rounded-full p-2 mb-6 shadow-lg shadow-emerald-500/20">
                                <CheckCircle2 className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-display font-bold text-2xl md:text-3xl text-slate-900">
                                {niche}
                            </h3>
                        </div>
                    ))}
                </div>

                {/* Sub-Header */}
                <div className="text-center mb-12">
                    <p className="text-slate-500 font-bold text-lg md:text-xl italic">
                        Still unsure? Here are more specific industries that have used this bundle and seen great results!
                    </p>
                </div>

                {/* Industry List Columns */}
                <div className="bg-white/50 rounded-[3rem] p-8 md:p-12 border border-slate-200/50 backdrop-blur-sm mb-16">
                    <div className="grid md:grid-cols-3 gap-8">
                        {columns.map((col, i) => (
                            <ul key={i} className="space-y-5">
                                {col.map((item, j) => (
                                    <li key={j} className="flex items-center gap-3 text-slate-700 font-medium text-lg group">
                                        <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                        <span className="group-hover:text-slate-900 transition-colors uppercase tracking-tight text-sm font-black">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>

                {/* Specific CTA */}
                <div className="text-center">
                    <button
                        onClick={onScrollToCheckout}
                        className="bg-slate-900 hover:bg-black text-white font-black px-12 py-6 rounded-2xl shadow-2xl shadow-slate-900/30 transition-all hover:-translate-y-1 text-xl uppercase tracking-tight"
                    >
                        IT'S A GOOD FIT -- I NEED THIS!
                    </button>
                </div>
            </div>
        </section>
    );
};
