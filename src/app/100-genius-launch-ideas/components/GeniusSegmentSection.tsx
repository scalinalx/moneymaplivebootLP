'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface GeniusSegmentSectionProps {
    outcome: string;
    description: string;
    ideas: string[];
    variant: 'rose' | 'emerald';
    onScrollToCheckout: () => void;
}

export const GeniusSegmentSection = ({
    outcome,
    description,
    ideas,
    variant,
    onScrollToCheckout
}: GeniusSegmentSectionProps) => {
    const isRose = variant === 'rose';

    return (
        <section className={`mb-16 rounded-[2.5rem] p-8 md:p-12 border ${isRose
            ? 'bg-rose-50/50 border-rose-100 shadow-rose-500/5'
            : 'bg-emerald-50/50 border-emerald-100 shadow-emerald-500/5'
            } shadow-lg relative overflow-hidden`}>
            {/* Background Decorative Element */}
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 ${isRose ? 'bg-rose-200/20' : 'bg-emerald-200/20'
                }`}></div>

            <div className="relative z-10">
                <h3 className={`font-display font-bold text-2xl md:text-3xl lg:text-4xl leading-tight mb-4 ${isRose ? 'text-rose-900' : 'text-emerald-900'
                    }`}>
                    If you need <span className={isRose ? 'text-rose-600' : 'text-emerald-600'}>{outcome}</span>, focus on these ideas...
                </h3>

                <p className="text-slate-600 text-lg md:text-xl mb-8 font-medium leading-relaxed max-w-[700px]">
                    {description}
                </p>

                <div className="space-y-4 mb-10">
                    {ideas.map((idea, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className={`${isRose ? 'bg-rose-500' : 'bg-emerald-500'} rounded-full p-1 flex-shrink-0 shadow-lg`}>
                                <CheckCircle2 size={16} className="text-white" strokeWidth={3} />
                            </div>
                            <span className="text-xl md:text-2xl font-black text-slate-800 tracking-tight italic">
                                "{idea}"
                            </span>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onScrollToCheckout}
                    className={`font-black px-10 py-5 rounded-2xl shadow-xl transition-all hover:-translate-y-1 text-lg uppercase tracking-tight ${isRose
                        ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                        }`}
                >
                    Unlock These Ideas Now!
                </button>
            </div>
        </section>
    );
};
