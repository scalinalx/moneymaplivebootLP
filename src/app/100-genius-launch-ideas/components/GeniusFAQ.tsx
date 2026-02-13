'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

export const GeniusFAQ = ({ onScrollToCheckout }: { onScrollToCheckout: () => void }) => {
    const faqs = [
        {
            question: "I have a tiny audience. Will these ideas work?",
            answer: "Yes. In fact, Idea #7, #23, and #88 are specifically designed for lists with fewer than 100 people. We label every idea by 'Audience Size Needed' so you never pick something that requires a massive following."
        },
        {
            question: "Is this just for business coaches?",
            answer: "No way. We have ideas for fitness, parenting, arts, tech, cooking, personal finance, and even 'weird' niches. If you have knowledge, there is an offer format for you in this list."
        },
        {
            question: "Do I need to be an 'expert'?",
            answer: "Nope. Many of the formats (like 'Curated Directories' or 'Interview Series') position you as the *connector* rather than the guru. You don't need to know everything to sell something valuable."
        },
        {
            question: "What format is the guide in?",
            answer: "You get immediate access to the 100 Genius Ideas PDF Guide (optimized for easy reading) so you can save it to your device."
        },
        {
            question: "What if I buy it and still can't pick one?",
            answer: "That's why we included the 'Rapid Selection Checklist'. It forces you to make a decision based on data, not feelings. Plus, you're covered by our 30-day money-back guarantee."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="w-full flex justify-center py-20 px-6 bg-slate-50">
            <div className="max-w-[800px] w-full flex flex-col items-center">

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
                        className="group relative bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold text-lg py-4 px-12 rounded-full shadow-lg shadow-pink-500/20 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2 mx-auto"
                    >
                        <span>Download The Ideas List</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="font-light text-slate-400 mt-4 text-sm">
                        30-Day Money Back Guarantee
                    </p>
                </div>

            </div>
        </div>
    );
};
