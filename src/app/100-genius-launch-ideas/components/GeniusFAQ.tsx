'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

export const GeniusFAQ = ({ onScrollToCheckout }: { onScrollToCheckout: () => void }) => {
    const faqs = [
        {
            question: "I have a tiny audience. Will this work for me?",
            answer: "Absolutely. Many of these offers are designed for lists of fewer than 100 people. We give you the 'Springboard' models that let you generate cash immediately to fund your growth, rather than waiting years for a 'big' list."
        },
        {
            question: "Is this just for business and marketing niches?",
            answer: "No. This repository covers the 'Full Human Spectrum'—Health, Wealth, Relationships, Parenting, Spiritual Growth, and Tech. If people have problems, this vault has your solution."
        },
        {
            question: "Do I need to be a world-class 'expert' to sell these?",
            answer: "The 'Expert Trap' is what keeps most people poor. These architectures position you as a high-value guide or curator, allowing you to provide massive transformation without needing decades of credentials."
        },
        {
            question: "What exactly do I get when I buy?",
            answer: "You get immediate, lifetime access to the 184-page '100 Genius Offers That Sell in 2026' Master Repository. It is the definitive 'Business-In-A-Box' vault for creators who value time and wealth."
        },
        {
            question: "What if I get stuck or can't choose?",
            answer: "The repository is engineered for clarity. Between the Tiered Effort sections and the 'Rapid Selection Checklist,' you'll have a billion-dollar decision in 10 minutes. If not, our 30-day money-back guarantee has you covered."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="w-full flex justify-center py-20 px-6 bg-slate-50">
            <div className="max-w-[800px] w-full flex flex-col items-center">

                <p className="text-slate-400 text-sm italic text-center mb-8 max-w-[600px] leading-relaxed">
                    Please note: Due to the digital nature of these products, we do not offer refunds. This product is sold exact as listed on this page.
                </p>

                <h2 className="font-display font-bold text-3xl md:text-5xl text-slate-900 mb-12 text-center">
                    Frequently Asked <span className="text-rose-500">Questions</span>
                </h2>

                <div className="w-full flex flex-col gap-4 mb-16">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                            >
                                <span className="font-bold text-slate-800 text-lg md:text-xl pr-8">
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUp className="text-rose-500 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="text-slate-400 flex-shrink-0" />
                                )}
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                                    } overflow-hidden`}
                            >
                                <div className="p-6 pt-0 font-light text-slate-600 text-lg leading-relaxed border-t border-slate-50">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <button
                        onClick={onScrollToCheckout}
                        className="group relative bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold text-lg py-4 px-12 rounded-full shadow-lg shadow-pink-500/20 transition-all duration-300 transform hover:-translate-y-1 mx-auto"
                    >
                        <span>Unlock The 100 Genius Offers Vault!</span>
                    </button>
                    <p className="font-light text-slate-400 mt-4 text-sm">
                        30-Day Money Back Guarantee
                    </p>
                </div>

            </div>
        </div>
    );
};
