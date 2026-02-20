'use client';

import React from 'react';
import { Check, Target, Zap, DollarSign, Users, Award, Sparkles } from 'lucide-react';

interface GeniusOfferCardProps {
    data: {
        id: string;
        title: string;
        naming_framework_used?: string;
        niche: string;
        effort_level: string;
        launch_price: number;
        audience: { icp: string };
        framework: {
            unfair_hook: string;
            value_stack: string[];
            money_funnel: {
                lead_magnet: string;
                core_offer: string;
            };
            plan_of_action?: {
                executive_summary: string;
                funnel_strategy: string;
                sales_sequences: string;
                value_first_philosophy: string;
            };
            how_you_sell_this?: {
                executive_summary: string;
                lead_magnet_leverage: string;
                sales_leverage: string;
                scale_leverage: string;
                value_philosophy: string;
            };
        };
    };
    similarity: number;
    index: number;
}

const themeClasses = {
    0: { border: 'border-rose-200', bg: 'from-rose-50 to-white', text: 'text-rose-600', badge: 'bg-rose-100 text-rose-700' },
    1: { border: 'border-violet-200', bg: 'from-violet-50 to-white', text: 'text-violet-600', badge: 'bg-violet-100 text-violet-700' },
    2: { border: 'border-amber-200', bg: 'from-amber-50 to-white', text: 'text-amber-600', badge: 'bg-amber-100 text-amber-700' },
};

export const GeniusOfferCard: React.FC<GeniusOfferCardProps> = ({ data, similarity, index }) => {
    if (!data) return null;
    const theme = (themeClasses as any)[index] || themeClasses[0];
    const matchPercentage = (similarity * 100).toFixed(1);

    return (
        <div className={`h-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border-2 ${theme.border} overflow-hidden flex flex-col transition-all duration-300 hover:translate-y-[-8px] group hover:shadow-2xl`}>
            {/* Header Area */}
            <div className={`p-8 bg-gradient-to-br ${theme.bg} border-b-2 ${theme.border} relative`}>
                <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col gap-2">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${theme.badge} shadow-sm inline-block w-fit`}>
                            {data.effort_level} Effort
                        </span>
                        <div className="flex items-center gap-1.5 text-[9px] font-black text-rose-400 bg-rose-50 px-2 py-1 rounded-md uppercase tracking-[0.2em] animate-pulse">
                            <Sparkles size={10} className="fill-current" />
                            AI Customized
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Match Score</span>
                        <div className={`text-xl font-black ${theme.text}`}>{matchPercentage}%</div>
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-2 group-hover:text-black transition-colors">
                    {data.title}
                </h3>

                {data.naming_framework_used && (
                    <div className="mb-4">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                            Framework: {data.naming_framework_used}
                        </span>
                    </div>
                )}

                <div className="flex items-center gap-2 text-slate-500 mb-2">
                    <Target size={16} className={theme.text} />
                    <span className="text-xs font-bold uppercase tracking-tight">{data.niche}</span>
                </div>
            </div>

            {/* Body */}
            <div className="p-8 flex-grow flex flex-col gap-8">
                {/* The Unfair Hook */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 relative">
                    <div className="absolute -top-3 left-4 px-2 bg-white text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 rounded">The Unfair Hook</div>
                    <p className="text-sm italic text-slate-700 leading-relaxed">
                        "{data.framework?.unfair_hook || 'Analyzing...'}"
                    </p>
                </div>

                {/* Audience & Price Quick Info */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                        <Users size={18} className="text-slate-400 mt-1" />
                        <div>
                            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Ideal Client</span>
                            <span className="text-xs font-bold text-slate-900">{data.audience?.icp || 'Niche Audience'}</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <DollarSign size={18} className="text-slate-400 mt-1" />
                        <div>
                            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Launch Price</span>
                            <span className="text-xs font-bold text-slate-900">${data.launch_price}</span>
                        </div>
                    </div>
                </div>

                {/* Value Stack */}
                <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Value Stack Components</span>
                    <ul className="space-y-3">
                        {(data.framework?.value_stack || []).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <div className={`mt-1 h-1.5 w-1.5 rounded-full ${theme.text} bg-current flex-shrink-0 animate-pulse`} />
                                <span className="text-xs text-slate-600 leading-tight">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Money Funnel */}
                <div className="pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-2 mb-4">
                        <Zap size={14} className="text-amber-400 fill-current" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Money Funnel Architecture</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lead Magnet</span>
                            <span className="text-[11px] font-bold text-slate-900">{data.framework?.money_funnel?.lead_magnet || 'Free Resource'}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl text-white shadow-lg shadow-slate-900/20">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Core Product</span>
                            <span className="text-[11px] font-bold text-slate-50">{data.framework?.money_funnel?.core_offer || 'Main Architecture'}</span>
                        </div>
                    </div>
                </div>

                {/* HOW YOU SELL THIS */}
                {(data.framework?.how_you_sell_this || data.framework?.plan_of_action) && (
                    <div className="pt-6 border-t border-slate-50">
                        <div className="flex items-center gap-2 mb-6">
                            <Award size={14} className="text-rose-500" />
                            <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">HOW YOU SELL THIS</span>
                        </div>

                        <div className="space-y-6">
                            <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                                <p className="text-[11px] text-slate-700 leading-relaxed font-medium italic">
                                    {data.framework.how_you_sell_this?.executive_summary || (data.framework.plan_of_action as any)?.executive_summary}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5">
                                {data.framework.how_you_sell_this?.lead_magnet_leverage && (
                                    <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                                        <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <div className="w-1 h-1 bg-amber-400 rounded-full" />
                                            Lead Magnet Leverage
                                        </span>
                                        <p className="text-[10px] text-slate-600 leading-relaxed">
                                            {data.framework.how_you_sell_this.lead_magnet_leverage}
                                        </p>
                                    </div>
                                )}

                                {data.framework.how_you_sell_this?.sales_leverage && (
                                    <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                                        <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <div className="w-1 h-1 bg-violet-400 rounded-full" />
                                            Sales Advantage
                                        </span>
                                        <p className="text-[10px] text-slate-600 leading-relaxed font-bold">
                                            {data.framework.how_you_sell_this.sales_leverage}
                                        </p>
                                    </div>
                                )}

                                {data.framework.how_you_sell_this?.scale_leverage && (
                                    <div className="p-4 bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50">
                                        <span className="block text-[9px] font-black text-rose-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Zap size={10} className="fill-current" />
                                            Growth & Scale Blueprint
                                        </span>
                                        <p className="text-[10px] text-white leading-relaxed font-medium">
                                            {data.framework.how_you_sell_this.scale_leverage}
                                        </p>
                                    </div>
                                )}

                                {(data.framework.how_you_sell_this?.value_philosophy || (data.framework.plan_of_action as any)?.value_first_philosophy) && (
                                    <div className="text-center px-4">
                                        <p className="text-[9px] text-slate-400 italic">
                                            "{(data.framework.how_you_sell_this?.value_philosophy || (data.framework.plan_of_action as any)?.value_first_philosophy)}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
