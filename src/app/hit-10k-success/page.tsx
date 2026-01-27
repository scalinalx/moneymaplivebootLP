'use client';

import { useEffect, Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Calendar, Mail, Users, ArrowRight, ExternalLink, Zap } from 'lucide-react';
import { HIT10K_PRICE } from '@/lib/stripe';

function SuccessContent() {
    const searchParams = useSearchParams();
    const leadId = searchParams.get('leadId');
    const [hasOrderBump, setHasOrderBump] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // ... (Lead status fetching and Purchase tracking)

        // Auto-open calendar link after 3 seconds
        const timer = setTimeout(() => {
            window.open('https://calendar.app.google/NyyFt4JK8qjQV16R8', '_blank');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Fetch lead status if leadId is present
        if (leadId) {
            fetch(`/api/hit10k/get-lead-status?leadId=${leadId}`)
                .then(res => res.json())
                .then(data => {
                    const isPaid = data.success && data.lead.is_paid;
                    const hasBump = data.success && data.lead.has_order_bump;

                    if (isPaid) {
                        // Track conversion with Facebook Pixel AFTER status is confirmed
                        if (typeof window !== 'undefined' && (window as any).fbq) {
                            const totalValue = hasBump
                                ? (HIT10K_PRICE + (parseInt(process.env.NEXT_PUBLIC_HIT10K_BUMP_PRICE || '2700'))) / 100
                                : HIT10K_PRICE / 100;

                            (window as any).fbq('track', 'Purchase', {
                                value: totalValue,
                                currency: 'USD',
                                contents: [{ id: 'hit10k_workshop', quantity: 1 }],
                            });
                        }

                        if (hasBump) {
                            setHasOrderBump(true);
                            // Automatically open the link in a new tab
                            const notionLink = "https://anabubolea.notion.site/Hooks-That-Stop-the-Scroll-17c9b91e546e80b7a0f2c8908465faf2?source=copy_link";
                            window.open(notionLink, '_blank');
                        }
                    }
                    setIsLoaded(true);
                })
                .catch(err => {
                    console.error('Error fetching lead status:', err);
                    setIsLoaded(true);
                });
        } else {
            setIsLoaded(true);
        }
    }, [leadId]);

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center">

                <div className="w-20 h-20 bg-[#27AE60] rounded-full flex items-center justify-center mb-8 shadow-lg">
                    <CheckCircle className="w-12 h-12 text-white" />
                </div>

                <h1 className="font-anton text-4xl md:text-6xl text-[#333333] mb-6 text-center uppercase">
                    You're Registered! 🎉
                </h1>

                <p className="font-lora text-xl text-gray-600 max-w-2xl text-center mb-8">
                    Congratulations! Your payment was successful and you've secured your spot for the **Hit Your First $10,000 Month** live workshop on February 3rd.
                </p>

                <div className="mb-12">
                    <a
                        href="https://calendar.app.google/NyyFt4JK8qjQV16R8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold py-6 px-12 rounded-xl shadow-[0_10px_30px_rgba(216,17,89,0.3)] transition-all transform hover:scale-105 uppercase tracking-wider text-lg md:text-xl"
                    >
                        <Zap className="animate-pulse" size={24} fill="white" />
                        ADD THIS TO YOUR CALENDAR RIGHT NOW
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
                                    <p className="text-gray-600 text-sm">We've sent your confirmation email with the calendar invite and Zoom link.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Calendar className="text-[#D81B60] flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-[#333333]">Save the date</p>
                                    <p className="text-gray-600 text-sm">February 3rd, 2026 @ 10:00 AM EST (New York Time).</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#E0F7FA]/30 p-8 rounded-xl border border-[#4DB6AC]/20">
                        <h3 className="font-anton text-xl text-[#333333] mb-6 uppercase">Workshop Details</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-gray-700">
                                <Users size={18} className="text-[#4DB6AC]" />
                                <span>60-Min Intensive + Live Q&A</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <CheckCircle size={18} className="text-[#4DB6AC]" />
                                <span>5-Step $10k Framework</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <CheckCircle size={18} className="text-[#4DB6AC]" />
                                <span>Bonus Templates & Sequences</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {hasOrderBump && (
                    <div className="w-full mb-16 bg-[#FFFBEB] border-2 border-[#ffc300] rounded-2xl p-8 md:p-12 shadow-sm relative overflow-hidden">
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-[#ffc300] rounded-full flex items-center justify-center mb-6 shadow-md">
                                <Zap className="w-8 h-8 text-white" fill="white" />
                            </div>

                            <h2 className="font-anton text-2xl md:text-3xl text-[#333333] mb-4 uppercase text-center">
                                Thank you for purchasing <span className="text-[#d81159]">Hooks That Stop the Scroll!</span>
                            </h2>

                            <p className="font-lora text-lg text-gray-700 max-w-2xl mb-8">
                                The link should have automatically opened in a new tab. If your browser blocked it, click the button below to access your tool immediately.
                            </p>

                            <a
                                href="https://anabubolea.notion.site/Hooks-That-Stop-the-Scroll-17c9b91e546e80b7a0f2c8908465faf2?source=copy_link"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-[#333333] hover:bg-black text-white font-montserrat font-bold py-5 px-12 rounded-lg shadow-xl transition-all transform hover:-translate-y-1 uppercase tracking-wider"
                            >
                                ACCESS THE HOOKS NOW <ExternalLink size={20} />
                            </a>
                        </div>

                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffc300]/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
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
