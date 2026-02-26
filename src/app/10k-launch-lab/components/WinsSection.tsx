import React, { useState } from 'react';
import { Button } from './Button';
import { ChevronDown, ChevronUp, Calendar, ArrowRight } from 'lucide-react';

export const WinsSection: React.FC = () => {
    const scrollToCheckout = () => {
        const element = document.getElementById('checkout');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const faqs = [
        {
            question: "I don't have an offer yet. Can I still join?",
            answer: "YES. Day 1 is the Offer Validation Worksheet. By Day 2, you'll have your offer. That's the whole point."
        },
        {
            question: "I'm not technical. Will I get stuck on the tech setup?",
            answer: "NO. Every tech step has a Loom video showing exactly where to click. Plus, Week 3's live call is entirely devoted to tech troubleshooting. You won't get stuck."
        },
        {
            question: "What if I can't attend the live calls?",
            answer: "No problem. Recordings are posted within 2 hours. Plus, the Skool community gives you 24-hour async support. You can do this entirely self-paced if needed."
        },
        {
            question: "I have a newborn/full-time job. Do I have time for this?",
            answer: "YES. Each daily task is 30-60 minutes MAX. Do it during naptime or at 10 PM. The program is async-first with one optional live call per week."
        },
        {
            question: "What if I've already launched and it flopped?",
            answer: "PERFECT. The Disaster Recovery Playbook + relaunch strategies will show you exactly what went wrong and how to fix it."
        },
        {
            question: "Is this a course or coaching?",
            answer: "BOTH. You get the course materials (tasks, templates, videos) AND weekly group coaching (hot seats + feedback)."
        },
        {
            question: "What happens after 30 days?",
            answer: "You keep lifetime access to all materials. You can relaunch as many times as you want using the same system."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="w-full bg-white py-20 px-4 md:px-8 flex flex-col items-center border-t border-gray-200">

            {/* FAQ Area */}
            <div className="max-w-4xl w-full mx-auto mb-20">
                <h2 className="font-display font-black text-3xl md:text-5xl uppercase mb-12 text-center">❓ FAQ</h2>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="border border-gray-100 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full p-6 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <span className="font-poppins font-bold text-lg md:text-xl">{faq.question}</span>
                                {openIndex === idx ? <ChevronUp /> : <ChevronDown />}
                            </button>
                            {openIndex === idx && (
                                <div className="p-6 bg-white border-t border-gray-100 font-poppins text-gray-700 leading-relaxed">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>


            {/* Final Thought / Real Question */}
            <div className="max-w-4xl w-full mx-auto text-center font-poppins text-lg md:text-xl leading-relaxed mb-16">
                <h2 className="font-display font-black text-3xl md:text-4xl uppercase mb-6">💡 The Real Question:</h2>
                <p className="mb-4">This isn't about the $597.</p>
                <p className="mb-8 font-bold text-2xl">This is about the next 30 days of your life.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
                    <div className="bg-gray-100 p-6 rounded-2xl border border-gray-300">
                        <h4 className="font-bold mb-2">Path A:</h4>
                        <p>Trying to "figure it out" on your own, getting stuck, giving up.</p>
                    </div>
                    <div className="bg-rose-50 p-6 rounded-2xl border border-gray-100 shadow-lg">
                        <h4 className="font-bold mb-2">Path B:</h4>
                        <p>Following a proven system, getting support, actually launching.</p>
                    </div>
                </div>

                <p className="font-bold text-2xl mb-8">Both paths cost you 30 days. Only one path makes you money.</p>

                <Button
                    onClick={scrollToCheckout}
                    className="mx-auto px-10 py-5 bg-[#d81159] text-white hover:bg-[#b30e4a] border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                >
                    <div className="flex flex-col items-center leading-tight">
                        <span className="font-normal text-lg md:text-xl tracking-wide uppercase">OK, I’M CONVINCED—LET’S GO!</span>
                        <ArrowRight className="mt-1 w-5 h-5" />
                    </div>
                </Button>
            </div>

        </section>
    );
};
