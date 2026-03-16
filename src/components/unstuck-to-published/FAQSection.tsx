'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQSection: React.FC = () => {
    const faqs = [
        {
            question: "I haven't started my Substack yet. Is this too advanced?",
            answer: "This is literally designed for you. You're the person we built this for. Come with nothing but an idea — you'll leave with a structured publication ready to publish."
        },
        {
            question: "I already launched but it feels messy. Can I still attend?",
            answer: "Yes. A huge percentage of creators launch without structure and then feel stuck. This workshop gives you the framework to rebuild your foundation properly — positioning, About page, paywall strategy — without starting over."
        },
        {
            question: "Will there be a replay?",
            answer: "Yes. Every attendee gets the full replay plus all templates and resources. But the live Q&A — where we review YOUR Substack and give direct feedback — only happens once. Saturday, March 21 @ 10:00 AM EST. In the room."
        },
        {
            question: "What if I can't attend live?",
            answer: "You'll get the recording and all the resources. But we strongly recommend attending live — the Q&A section is where the biggest breakthroughs happen. If you have a scheduling conflict, book your seat anyway and watch the replay within 48 hours while the momentum is fresh."
        },
        {
            question: "How is this different from free advice on YouTube or other Substacks?",
            answer: "Free advice tells you what to do. This workshop sits next to you while you do it. You'll leave with actual assets — a positioned publication, a first article outline, a paywall strategy — not just more ideas to add to the pile."
        },
        {
            question: "Who are Ana and Jessica and why should I trust them?",
            answer: "Ana built How We Grow to 70,000+ subscribers and $119K+/month in 14 months. Bestseller in under 3 months. Featured in Forbes. Jessica has helped hundreds of creators go from \"stuck on the idea\" to \"published and growing\" through her Unstuck to Published framework. Between us, we've seen every mistake, every sticking point, and every shortcut that actually works."
        },
        {
            question: "What's the Show Don't Tell thumbnail generator add-on?",
            answer: "Show Don't Tell is our AI-powered viral thumbnail generator that creates scroll-stopping visuals for your Substack posts. You get 400 image credits (enough for ~200 thumbnail generations) — normally these credits cost $47+ on their own. It's the perfect companion tool when you start publishing."
        },
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="w-full flex justify-center py-16 md:py-20 px-6 bg-[#faf9f5]">
            <div className="max-w-[800px] w-full flex flex-col items-center">

                <h2 className="font-anton text-4xl md:text-5xl text-[#1a1a1a] mb-10 text-center uppercase tracking-wide">
                    Common <span className="text-[#ffc300]">Questions</span>
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
                                <span className="font-montserrat font-bold text-[#1a1a1a] text-base md:text-lg pr-8">
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUp className="text-[#ffc300] flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="text-gray-400 flex-shrink-0" />
                                )}
                            </button>

                            <div className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                                <div className="p-5 pt-0 font-lato text-gray-600 text-[15px] md:text-[17px] leading-relaxed border-t border-gray-50">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="font-lora italic text-gray-500 mb-6">
                        Still have questions? Email us at anaxcalin@gmail.com
                    </p>
                    <button
                        onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-[#ffc300] hover:bg-[#e6b000] text-[#1a1a1a] font-montserrat font-bold text-lg py-4 px-12 rounded-lg shadow-[0_4px_20px_rgba(255,195,0,0.25)] transition-all duration-300 transform hover:-translate-y-1 tracking-wider"
                    >
                        BOOK YOUR SEAT — $97
                    </button>
                </div>

            </div>
        </div>
    );
};
