'use client';

import React from 'react';
import { Check, ShieldCheck, Box } from 'lucide-react';
import { OfferItem } from '../../types/ana-ai';

interface OfferCardProps {
    type: string;
    data: OfferItem;
    colorTheme: 'rose' | 'fuchsia' | 'violet' | 'amber';
}

const themeClasses = {
    rose: {
        badge: 'bg-rose-100 text-rose-700',
        border: 'border-rose-100',
        icon: 'text-rose-500',
        accentText: 'text-rose-600',
        priceText: 'text-rose-600',
        header: 'bg-gradient-to-r from-rose-50 to-white'
    },
    fuchsia: {
        badge: 'bg-fuchsia-100 text-fuchsia-700',
        border: 'border-fuchsia-100',
        icon: 'text-fuchsia-500',
        accentText: 'text-fuchsia-600',
        priceText: 'text-fuchsia-600',
        header: 'bg-gradient-to-r from-fuchsia-50 to-white'
    },
    violet: {
        badge: 'bg-violet-100 text-violet-700',
        border: 'border-violet-100',
        icon: 'text-violet-500',
        accentText: 'text-violet-600',
        priceText: 'text-violet-600',
        header: 'bg-gradient-to-r from-violet-50 to-white'
    },
    amber: {
        badge: 'bg-amber-100 text-amber-700',
        border: 'border-amber-100',
        icon: 'text-amber-500',
        accentText: 'text-amber-600',
        priceText: 'text-amber-600',
        header: 'bg-gradient-to-r from-amber-50 to-white'
    },
};

export const OfferCard: React.FC<OfferCardProps> = ({ type, data, colorTheme }) => {
    const theme = themeClasses[colorTheme];

    return (
        <div className={`h-full bg-white rounded-2xl shadow-lg shadow-pink-900/5 border ${theme.border} overflow-hidden flex flex-col transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl`}>
            {/* Header */}
            <div className={`p-6 ${theme.header} border-b ${theme.border}`}>
                <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase ${theme.badge}`}>
                        {type}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">
                    {data.title}
                </h3>

                {/* Delivery Vehicle */}
                <div className="flex items-center gap-1.5 mb-3 text-xs font-semibold uppercase tracking-wide opacity-80">
                    <Box size={14} className={theme.icon} />
                    <span className="text-slate-600">{data.deliveryVehicle}</span>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed">
                    {data.description}
                </p>
            </div>

            {/* Body: The Value Stack */}
            <div className="p-6 flex-grow flex flex-col">

                <div className="flex-grow">
                    {/* Stack Items */}
                    <ul className="space-y-3 mb-6">
                        {data.valueStackItems && data.valueStackItems.length > 0 ? (
                            data.valueStackItems.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${theme.icon}`} strokeWidth={3} />
                                    <span>
                                        <span className="font-medium">{item.component}</span>{' '}
                                        <span className={`font-bold ${theme.accentText} whitespace-nowrap`}>
                                            (Value {item.value})
                                        </span>
                                    </span>
                                </li>
                            ))
                        ) : (
                            // Fallback to valueProps if stack is missing for some reason
                            data.valueProps.map((prop, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${theme.icon}`} strokeWidth={3} />
                                    <span>{prop}</span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                {/* Pricing Section */}
                <div className="mt-4 pt-4 border-t border-slate-100 text-center">

                    {/* Total Value Anchor */}
                    <div className="text-slate-500 font-bold text-lg mb-1">
                        Total Value: <span className="line-through decoration-slate-400/50 decoration-2">{data.totalValue}</span>
                    </div>

                    {/* Today's Price */}
                    <div className={`text-4xl font-extrabold ${theme.priceText} mb-4`}>
                        <span className="text-base font-semibold text-slate-400 uppercase tracking-widest block mb-1">Today Just</span>
                        {data.price}
                    </div>

                    {/* Guarantee */}
                    {data.guarantee && (
                        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 bg-slate-50 py-2 px-3 rounded-lg">
                            <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{data.guarantee}</span>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
