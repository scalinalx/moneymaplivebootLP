'use client';

import { useEffect, Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const leadId = searchParams.get('leadId');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    useEffect(() => {
        if (leadId === 'TEST') {
            setIsPaid(true);
            setIsLoaded(true);
            return;
        }

        if (leadId) {
            fetch(`/api/word-into-money/get-lead-status?leadId=${leadId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.lead.is_paid) {
                        setIsPaid(true);
                        if (typeof window !== 'undefined' && (window as any).fbq) {
                            (window as any).fbq('track', 'Purchase', {
                                value: 97.00,
                                currency: 'USD',
                                contents: [{ id: 'word_into_money', quantity: 1 }],
                            });
                        }
                    } else {
                        window.location.href = '/word-into-money';
                    }
                    setIsLoaded(true);
                })
                .catch(() => {
                    window.location.href = '/word-into-money';
                });
        } else {
            window.location.href = '/word-into-money';
        }
    }, [leadId]);

    if (!isLoaded || !isPaid) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-brand-950 font-lora text-brand-grey italic">
                Verifying your purchase...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-950">
            <div className="max-w-2xl mx-auto px-6 py-20 flex flex-col items-center">
                <div className="w-20 h-20 bg-brand-lime rounded-full flex items-center justify-center mb-8 shadow-lg">
                    <CheckCircle className="w-12 h-12 text-brand-950" />
                </div>

                <h1 className="font-anton text-4xl md:text-5xl text-brand-white mb-4 text-center uppercase">
                    You&apos;re In!
                </h1>

                <p className="font-lora text-lg text-brand-grey max-w-lg text-center mb-10">
                    Your access to <strong className="text-brand-white">Word Into Money</strong> is confirmed. Check your email for your workshop link and all bonuses.
                </p>

                {/* Upsell 1 CTA */}
                <div className="w-full bg-brand-900 border border-brand-800 rounded-2xl p-8 text-center mb-6">
                    <p className="text-brand-lime text-xs font-bold uppercase tracking-widest mb-3">Exclusive One-Time Offer</p>
                    <h2 className="font-anton text-2xl md:text-3xl text-brand-white uppercase mb-3">
                        Your First 100 Paid Subscribers
                    </h2>
                    <p className="font-lora text-brand-grey mb-6 max-w-md mx-auto">
                        You can write copy now. Here&apos;s how to turn that into your first 100 paying subscribers. The exact framework — just $97.
                    </p>
                    <a
                        href={`/word-into-money-upsell-1?leadId=${leadId}`}
                        className="inline-flex items-center gap-2 bg-brand-lime hover:bg-brand-limeDim text-brand-950 font-anton text-lg py-4 px-10 rounded-xl transition-all hover:scale-[1.02] uppercase tracking-wide"
                    >
                        YES — SHOW ME <ArrowRight size={18} />
                    </a>
                    <div className="mt-4">
                        <a
                            href={`/word-into-money-upsell-2?leadId=${leadId}`}
                            className="text-brand-grey text-sm hover:text-brand-white transition-colors"
                        >
                            No thanks, skip this offer →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function WordIntoMoneySuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-brand-950 text-brand-grey">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
