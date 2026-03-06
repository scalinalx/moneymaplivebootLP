'use client';

import { useEffect, Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Calendar, Mail, Users, ArrowRight, ExternalLink, Zap } from 'lucide-react';
import { HIT10K_PRICE, HIT10K_BUMP_PRICE, HIT10K_BUMP2_PRICE } from '@/lib/stripe';

function SuccessContent() {
    const searchParams = useSearchParams();
    const leadId = searchParams.get('leadId');
    const [hasOrderBump, setHasOrderBump] = useState(false);
    const [hasOrderBump2, setHasOrderBump2] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        // Fetch lead status if leadId is present
        if (leadId) {
            fetch(`/api/hit10k/get-lead-status?leadId=${leadId}`)
                .then(res => res.json())
                .then(data => {
                    const paidStatus = data.success && data.lead.is_paid;
                    const hasBump = data.success && data.lead.has_order_bump;
                    const hasBump2 = data.success && data.lead.has_order_bump2;

                    if (paidStatus) {
                        setIsPaid(true);
                        // Track conversion with Facebook Pixel AFTER status is confirmed
                        if (typeof window !== 'undefined' && (window as any).fbq) {
                            const totalValue = (HIT10K_PRICE + (hasBump ? HIT10K_BUMP_PRICE : 0) + (hasBump2 ? HIT10K_BUMP2_PRICE : 0)) / 100;

                            (window as any).fbq('track', 'Purchase', {
                                value: totalValue,
                                currency: 'USD',
                                contents: [{ id: 'hit10k_workshop', quantity: 1 }],
                            });
                        }

                        if (hasBump) {
                            setHasOrderBump(true);
                        }
                        if (hasBump2) {
                            setHasOrderBump2(true);
                        }
                    } else {
                        // Redirect if not paid
                        window.location.href = '/how-to-hit-10k';
                    }
                    setIsLoaded(true);
                })
                .catch(err => {
                    console.error('Error fetching lead status:', err);
                    window.location.href = '/how-to-hit-10k';
                });
        } else {
            // Redirect if no leadId
            window.location.href = '/how-to-hit-10k';
        }
    }, [leadId]);

    if (!isLoaded || !isPaid) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white font-lora text-gray-400 italic">
                Verifying access...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center">

                <div className="w-20 h-20 bg-[#27AE60] rounded-full flex items-center justify-center mb-8 shadow-lg">
                    <CheckCircle className="w-12 h-12 text-white" />
                </div>

                <h1 className="font-anton text-4xl md:text-6xl text-[#333333] mb-6 text-center uppercase">
                    You're In! 🚀
                </h1>

                <p className="font-lora text-xl text-gray-600 max-w-2xl text-center mb-12">
                    Success! You now have lifetime access to the **Hit Your First $10,000 Month** business course. We're ready to scale your business together.
                </p>

                <div className="mb-12">
                    <a
                        href="https://www.youtube.com/watch?v=h23TYuW7EYA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-[#333333] hover:bg-black text-white font-montserrat font-bold py-6 px-12 rounded-xl shadow-lg transition-all transform hover:scale-105 uppercase tracking-wider text-lg md:text-xl"
                    >
                        <Zap size={24} fill="white" />
                        ACCESS THE FULL COURSE NOW
                    </a>
                </div>

                <div className="grid md:grid-cols-2 gap-8 w-full mb-16">
                    <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                        <h3 className="font-anton text-xl text-[#333333] mb-6 uppercase">Next Steps</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <Mail className="text-[#D81B60] flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-[#333333]">Check your inbox</p>
                                    <p className="text-gray-600 text-sm">We've sent a welcome email with your private access link and bonuses.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Zap className="text-[#D81B60] flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-[#333333]">Start with Module 1</p>
                                    <p className="text-gray-600 text-sm">Log in and watch the "Validation Framework" video immediately.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#E0F7FA]/30 p-8 rounded-xl border border-[#4DB6AC]/20">
                        <h3 className="font-anton text-xl text-[#333333] mb-6 uppercase">Course Curriculum</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-gray-700">
                                <Users size={18} className="text-[#4DB6AC]" />
                                <span>90-Minute Strategic Core Curriculum</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <CheckCircle size={18} className="text-[#4DB6AC]" />
                                <span>$1M Framework Library</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <CheckCircle size={18} className="text-[#4DB6AC]" />
                                <span>Advanced Conversion Templates</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {hasOrderBump && (
                    <div className="w-full mb-8 bg-[#FFFBEB] border-2 border-[#ffc300] rounded-2xl p-8 shadow-sm relative overflow-hidden">
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <h2 className="font-anton text-xl text-[#333333] mb-4 uppercase">
                                Your <span className="text-[#d81159]">Hooks That Stop the Scroll</span> access:
                            </h2>
                            <a
                                href="https://anabubolea.notion.site/Hooks-That-Stop-the-Scroll-17c9b91e546e80b7a0f2c8908465faf2?source=copy_link"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-[#333333] hover:bg-black text-white font-montserrat font-bold py-4 px-10 rounded shadow-lg transition-all transform hover:-translate-y-1 uppercase tracking-wider text-sm"
                            >
                                ACCESS THE HOOKS NOW <ExternalLink size={18} />
                            </a>
                        </div>
                    </div>
                )}

                {hasOrderBump2 && (
                    <div className="w-full mb-16 bg-[#F0FDF4] border-2 border-[#22C55E] rounded-2xl p-8 shadow-sm relative overflow-hidden">
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <h2 className="font-anton text-xl text-[#333333] mb-4 uppercase">
                                Your <span className="text-[#22C55E]">60-Minute Launch Calendar</span> access:
                            </h2>
                            <a
                                href="https://anabubolea.notion.site/The-60-Minute-Launch-Calendar-17c9b91e546e80b7a0f2c8908465faf2?source=copy_link"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-[#1A1A1A] hover:bg-black text-white font-montserrat font-bold py-4 px-10 rounded shadow-lg transition-all transform hover:-translate-y-1 uppercase tracking-wider text-sm"
                            >
                                ACCESS THE CALENDAR NOW <ExternalLink size={18} />
                            </a>
                        </div>
                    </div>
                )}

                <div className="text-center bg-[#F5F5F5] p-10 rounded-2xl w-full border border-gray-200">
                    <h2 className="font-anton text-2xl text-[#333333] mb-4 uppercase">Have Questions?</h2>
                    <p className="font-lora italic text-gray-500 mb-8">
                        Our support team is standing by to help you.
                    </p>
                    <a
                        href="mailto:anaxcalin@gmail.com"
                        className="inline-flex items-center gap-2 bg-[#D81B60] hover:bg-[#ad144c] text-white font-montserrat font-bold py-4 px-10 rounded shadow-lg transition-all"
                    >
                        CONTACT SUPPORT <ArrowRight size={18} />
                    </a>
                </div>

            </div>
        </div>
    );
}

export default function Hit10kSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
