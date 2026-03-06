'use client';

import { useEffect, Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Mail, Zap, ArrowRight } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const leadId = searchParams.get('leadId');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    useEffect(() => {
        if (leadId) {
            fetch(`/api/first100/get-lead-status?leadId=${leadId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.lead.is_paid) {
                        setIsPaid(true);

                        if (typeof window !== 'undefined' && (window as any).fbq) {
                            (window as any).fbq('track', 'Purchase', {
                                value: 97.00,
                                currency: 'USD',
                                contents: [{ id: 'first100_workshop', quantity: 1 }],
                            });
                        }
                    } else {
                        window.location.href = '/first-100-paid-subscribers';
                    }
                    setIsLoaded(true);
                })
                .catch(() => {
                    window.location.href = '/first-100-paid-subscribers';
                });
        } else {
            window.location.href = '/first-100-paid-subscribers';
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
                    You're In!
                </h1>

                <p className="font-lora text-xl text-gray-600 max-w-2xl text-center mb-12">
                    Success! You now have lifetime access to <strong>Your First 100 Paid Subscribers</strong> — the exact framework to convert free readers to paying customers.
                </p>

                <div className="mb-12">
                    <a
                        href="mailto:anaxcalin@gmail.com"
                        className="inline-flex items-center gap-3 bg-[#333333] hover:bg-black text-white font-montserrat font-bold py-6 px-12 rounded-xl shadow-lg transition-all transform hover:scale-105 uppercase tracking-wider text-lg md:text-xl"
                    >
                        <Zap size={24} fill="white" />
                        CHECK YOUR EMAIL FOR ACCESS
                    </a>
                </div>

                <div className="grid md:grid-cols-2 gap-8 w-full mb-16">
                    <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                        <h3 className="font-anton text-xl text-[#333333] mb-6 uppercase">Next Steps</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <Mail className="text-[#d81159] flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-[#333333]">Check your inbox</p>
                                    <p className="text-gray-600 text-sm">We've sent your private access link and all bonuses to the email you registered with.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Zap className="text-[#d81159] flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-[#333333]">Start with the Paid Subscriber Engine</p>
                                    <p className="text-gray-600 text-sm">Watch Part 1 of the workshop immediately — it's the foundation everything else builds on.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#E0F7FA]/30 p-8 rounded-xl border border-[#4DB6AC]/20">
                        <h3 className="font-anton text-xl text-[#333333] mb-6 uppercase">What You Got</h3>
                        <ul className="space-y-4">
                            {[
                                '90-Minute Workshop Recording',
                                'The Upgrade Email Sequence',
                                'Paid Subscriber Welcome Templates',
                                'Objection-Crushing Copy Vault',
                                'Tiny List Monetisation Playbook',
                                'Viral Substack Notes Generator'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle size={18} className="text-[#4DB6AC] flex-shrink-0" />
                                    <span className="font-lato">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="text-center bg-[#F5F5F5] p-10 rounded-2xl w-full border border-gray-200">
                    <h2 className="font-anton text-2xl text-[#333333] mb-4 uppercase">Have Questions?</h2>
                    <p className="font-lora italic text-gray-500 mb-8">
                        Our support team is here to help you get the most out of your purchase.
                    </p>
                    <a
                        href="mailto:anaxcalin@gmail.com"
                        className="inline-flex items-center gap-2 bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold py-4 px-10 rounded shadow-lg transition-all"
                    >
                        CONTACT SUPPORT <ArrowRight size={18} />
                    </a>
                </div>

            </div>
        </div>
    );
}

export default function First100SuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
