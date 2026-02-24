'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface GeniusSegmentSectionProps {
    outcome: string;
    description?: string;
    ideas?: string[];
    imageUrl?: string;
    variant: 'rose' | 'emerald';
    onScrollToCheckout: () => void;
}

export const GeniusSegmentSection = ({
    outcome,
    description,
    ideas,
    imageUrl,
    variant,
    onScrollToCheckout
}: GeniusSegmentSectionProps) => {
    const isRose = variant === 'rose';

    return (
        <section className={`mb-16 rounded-[2.5rem] p-8 md:p-12 border text-center ${isRose
            ? 'bg-rose-50/50 border-rose-100 shadow-rose-500/5'
            : 'bg-emerald-50/50 border-emerald-100 shadow-emerald-500/5'
            } shadow-lg relative overflow-hidden flex flex-col items-center`}>
            {/* Background Decorative Element */}
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 ${isRose ? 'bg-rose-200/20' : 'bg-emerald-200/20'
                }`}></div>

            <div className="relative z-10 flex flex-col items-center w-full">
                <h3 className={`font-display font-bold text-2xl md:text-3xl lg:text-4xl leading-tight mb-4 ${isRose ? 'text-rose-900' : 'text-emerald-900'
                    }`}>
                    If you need <span className={isRose ? 'text-rose-600' : 'text-emerald-600'}>{outcome}</span>, focus on these ideas...
                </h3>

                {description && (
                    <p className="text-slate-600 text-lg md:text-xl mb-8 font-medium leading-relaxed max-w-[700px]">
                        {description}
                    </p>
                )}

                {imageUrl && (
                    <div className="mb-10 w-full max-w-[800px]">
                        <img src={imageUrl} alt={outcome} className="w-full h-auto object-contain mx-auto" />
                    </div>
                )}

                {ideas && ideas.length > 0 && (
                    <div className="space-y-4 mb-10 text-left">
                        {ideas.map((idea, i) => (
                            <div key={i} className="flex items-center gap-3 justify-center">
                                <div className={`${isRose ? 'bg-rose-500' : 'bg-emerald-500'} rounded-full p-1 flex-shrink-0 shadow-lg`}>
                                    <CheckCircle2 size={16} className="text-white" strokeWidth={3} />
                                </div>
                                <span className="text-xl md:text-2xl font-black text-slate-800 tracking-tight italic">
                                    "{idea}"
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    onClick={onScrollToCheckout}
                    className={`font-black px-12 py-5 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.15)] text-xl uppercase tracking-tight ${isRose
                        ? 'bg-rose-500 hover:bg-rose-600 text-white border-2 border-rose-600'
                        : 'bg-emerald-500 hover:bg-emerald-600 text-white border-2 border-emerald-600'
                        }`}
                >
                    Unlock These Ideas Now!
                </button>
            </div>
        </section>
    );
};
