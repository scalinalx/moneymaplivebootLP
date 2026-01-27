import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { HIT10K_PRICE } from '@/lib/stripe';

interface FAQItem {
    question: string;
    answer: string;
}

export const FAQSection: React.FC = () => {
    const faqs: FAQItem[] = [
        {
            question: "Is this a live workshop or a recorded course?",
            answer: "This is a 60-minute LIVE intensive workshop. I'll be teaching the framework in real-time on February 3rd and hosting a live Q&A session at the end to answer your specific questions."
        },
        {
            question: "What if the date or time doesn't work for me?",
            answer: "No problem! Every person who registers gets lifetime access to the recording and all the bonuses (Notion template, worksheetsade, email sequences). You can watch the replay whenever it suits you."
        },
        {
            question: "Do I need a huge following or email list to make this work?",
            answer: "Absolutely not. In fact, most of my students who hit their first $10k months start with 'tiny' lists (under 500 people). This framework is specifically designed to maximize revenue from the audience you ALREADY have."
        },
        {
            question: "What if I don't even have a clear offer yet?",
            answer: "Perfect timing. The first step of our 5-part framework is 'Offer Validation.' I'll show you exactly how to pick the offer in your head that has the highest chance of hitting $10,000 in the next 30 days."
        },
        {
            question: "How long will I have access to the materials?",
            answer: "You get lifetime access to the workshop recording, the Notion sales page template, the worksheets, and the email templates. They are yours to keep and reuse for every launch you do."
        },
        {
            question: "What's the total investment for the workshop?",
            answer: `The total investment is just $${HIT10K_PRICE / 100}. This includes the live workshop, the Q&A session, and over $500 worth of bonuses (like the Viral Substack Notes Generator and the Email Sequence templates).`
        },
        {
            question: "Is there a refund policy?",
            answer: "Due to the digital nature of the materials and the live event seating, all sales are final. However, I am confident that if you apply even ONE of the five steps, you'll see a return on your investment almost immediately."
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

                            <div
                                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                    } overflow-hidden`}
                            >
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
                        YES! RESERVE MY SPOT — ${HIT10K_PRICE / 100}
                    </button>
                </div>

            </div>
        </div>
    );
};
