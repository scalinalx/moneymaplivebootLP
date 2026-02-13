'use client';

import React from 'react';
import { Search, BarChart3, TrendingUp, Rocket, ArrowRight } from 'lucide-react';

export const GeniusProcessSection = () => {
    const steps = [
        {
            icon: <Search className="w-10 h-10 text-white" />,
            title: "Scan & Select",
            subtext: "Browse 100 vetted ideas organized by category and niche."
        },
        {
            icon: <BarChart3 className="w-10 h-10 text-white" />,
            title: "Check Effort Score",
            subtext: "Filter by 'Low Effort' if you need to launch this weekend."
        },
        {
            icon: <TrendingUp className="w-10 h-10 text-white" />,
            title: "Verify Revenue",
            subtext: "Focus only on 'High Potential' offers scalable to $10k+."
        },
        {
            icon: <Rocket className="w-10 h-10 text-white" />,
            title: "Launch It",
            subtext: "Use the Quick-Start Checklist to go live in under 24h."
        }
    ];

    return (
        <div className="w-full flex justify-center py-20 px-6 bg-white">
            <div className="max-w-[1200px] w-full text-center">

                {/* Headline */}
                <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-slate-900 mb-16">
                    How you'll find your winner in <span className="text-rose-500">10 minutes</span>:
                </h2>

                {/* Steps Row */}
                <div className="flex flex-col md:flex-row items-start justify-between relative gap-12 md:gap-0">
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            {/* Step Item */}
                            <div className="flex flex-col items-center text-center px-4 flex-1 relative group">
                                <div className="mb-6 w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                                    {step.icon}
                                </div>
                                <h3 className="font-display font-bold text-xl text-slate-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="font-light text-slate-600 text-lg leading-relaxed max-w-[250px] mx-auto">
                                    {step.subtext}
                                </p>
                            </div>

                            {/* Arrow Connector (Desktop only) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:flex items-center justify-center pt-8 w-12 flex-shrink-0">
                                    <ArrowRight className="w-8 h-8 text-slate-200" strokeWidth={2} />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Simple Bridge */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 mt-16 max-w-3xl mx-auto">
                    <p className="font-display text-slate-700 text-xl italic">
                        "I used this system to stop 'thinking' and start 'earning'. I picked Idea #42 (Micro-Workshop) and made <span className="font-bold text-rose-600">$1,200 in my first weekend</span>."
                        <br />
                        <span className="text-sm text-slate-400 font-sans not-italic mt-4 block uppercase tracking-widest font-bold">- Validated Student Result</span>
                    </p>
                </div>
            </div>
        </div>
    );
};
