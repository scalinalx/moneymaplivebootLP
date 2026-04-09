'use client';

import React, { useState } from 'react';
import { FeedCard } from '../FeedCard';
import { ChevronDown } from 'lucide-react';

interface Module {
    title: string;
    description: string;
}

interface CurriculumCardProps {
    modules: Module[];
    animation?: string;
}

export const CurriculumCard: React.FC<CurriculumCardProps> = ({ modules, animation = 'slide-up' }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <FeedCard animation={animation as any}>
            <h3 className="font-anton text-2xl text-brand-white uppercase mb-1">What&apos;s Inside</h3>
            <p className="text-brand-grey text-sm font-lora mb-5">The full Word Into Money curriculum</p>
            <div className="space-y-2">
                {modules.map((mod, i) => (
                    <div key={i} className="border border-brand-800 rounded-xl overflow-hidden">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-brand-800/50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-brand-lime font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
                                <span className="font-bold text-brand-white text-sm">{mod.title}</span>
                            </div>
                            <ChevronDown
                                size={16}
                                className={`text-brand-grey transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                            />
                        </button>
                        {openIndex === i && (
                            <div className="px-4 pb-4 pt-0">
                                <p className="text-brand-grey text-sm font-lora leading-relaxed pl-8">{mod.description}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </FeedCard>
    );
};
