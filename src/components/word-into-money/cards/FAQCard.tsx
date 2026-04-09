'use client';

import React, { useState } from 'react';
import { FeedCard } from '../FeedCard';
import { ChevronDown } from 'lucide-react';

interface FAQ {
    question: string;
    answer: string;
}

interface FAQCardProps {
    faqs: FAQ[];
    animation?: string;
}

export const FAQCard: React.FC<FAQCardProps> = ({ faqs, animation = 'slide-up' }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <FeedCard animation={animation as any}>
            <h3 className="font-anton text-xl text-brand-white uppercase mb-4">Quick Answers</h3>
            <div className="space-y-2">
                {faqs.map((faq, i) => (
                    <div key={i} className="border border-brand-800 rounded-lg overflow-hidden">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full flex items-center justify-between p-3 text-left hover:bg-brand-800/50 transition-colors"
                        >
                            <span className="font-bold text-brand-white text-sm pr-4">{faq.question}</span>
                            <ChevronDown
                                size={14}
                                className={`text-brand-grey flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                            />
                        </button>
                        {openIndex === i && (
                            <div className="px-3 pb-3">
                                <p className="text-brand-grey text-sm font-lora leading-relaxed">{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </FeedCard>
    );
};
