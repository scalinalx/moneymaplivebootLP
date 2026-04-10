'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FIRST100_PRICE } from '@/lib/stripe';

export const FAQSection: React.FC = () => {
    const faqs = [
        {
            question: "Is this live or a recording?",
            answer: "You get immediate access to the full 60-minute webinar recording the moment you check out, plus every template and bonus. No waiting, no scheduling — just log in and start watching on your own time."
        },
        {
            question: "I only have a small free list. Will this actually work for me?",
            answer: "This system was built specifically for writers with small lists. If you have 200 free subscribers, you likely have everything you need to hit 100 paid. The workshop includes a dedicated module — 'Tiny List, Big Revenue' — that shows you exactly how to do this with under 500 free subscribers."
        },
        {
            question: "I haven't even set up a paid tier yet. Where do I start?",
            answer: "Right here. The workshop starts from the very beginning — how to structure your paid tier, what to put behind the paywall, how to price it, and how to launch it to your existing free subscribers. By the time you finish, you'll have a complete paid setup ready to go."
        },
        {
            question: "What's the difference between this and all the free Substack advice online?",
            answer: "Every piece of free advice says 'grow your free list first.' This workshop ignores that entirely. It's 100% focused on conversion — turning the readers you already have into paying subscribers. That's the gap nobody fills, and the gap that's costing you money every single month."
        },
        {
            question: "What exactly does 'Substack Bestseller status' mean and can I really hit it?",
            answer: "Substack awards Bestseller status based on paid subscriber count thresholds relative to your total list. It's more achievable than most people think — especially with a high conversion rate. The Bestseller Blueprint module covers exactly what the thresholds are and the fastest path to hit them."
        },
        {
            question: "How do I get access after I register?",
            answer: "The moment your payment is confirmed, you'll get immediate access to the full webinar recording along with every template and bonus. Everything is yours to keep — watch at your own pace, revisit anytime."
        },
        {
            question: "What's everything I get for $97?",
            answer: "The full 60-minute webinar recording, The Bestseller Blueprint, The Paid Conversion System, The 7-Day Upgrade Sequence, The 30-Day Bestseller Roadmap, The Paid Subscriber Welcome Sequence, The Objection-Crushing Copy Vault, Tiny List Big Revenue, and the Viral Substack Notes Generator ($197 value). One price. Lifetime access to everything included."
        },
        {
            question: "Is there a refund policy?",
            answer: "Because you get instant access to the full recording and materials, all sales are final. That said — implement even one module from this workshop and you will earn back your $97 with your first handful of new paid subscribers. That's the whole point."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="w-full flex justify-center py-20 px-6 bg-gray-50">
            <div className="max-w-[800px] w-full flex flex-col items-center">

                <h2 className="font-anton text-4xl md:text-5xl text-[#333333] mb-12 text-center uppercase tracking-wide">
                    Frequently Asked <span className="text-[#ffc300]">Questions</span>
                </h2>

                <div className="w-full flex flex-col gap-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
                            >
                                <span className="font-montserrat font-bold text-[#333333] text-lg md:text-xl pr-8">
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUp className="text-[#ffc300] flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="text-gray-400 flex-shrink-0" />
                                )}
                            </button>

                            <div className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                                <div className="p-5 pt-0 font-lato text-gray-600 text-[17px] leading-relaxed border-t border-gray-50">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="font-lora italic text-gray-500 mb-6">
                        Still have questions? Email us at anaxcalin@gmail.com
                    </p>
                    <button
                        onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-lg py-4 px-12 rounded-[5px] shadow-lg transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wider"
                    >
                        I'M IN, ANA!
                    </button>
                </div>

            </div>
        </div>
    );
};
