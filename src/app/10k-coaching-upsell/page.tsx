'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, ShieldCheck, Lock, Star, Zap, ArrowRight, Loader2 } from 'lucide-react';

function CoachingUpsellContent() {
    const searchParams = useSearchParams();
    const leadId = searchParams.get('leadId');
    const wasBought = searchParams.get('bought') === 'true';

    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const finalSuccessUrl = leadId ? `/10k-launch-lab-success?leadId=${leadId}` : '/10k-launch-lab';

    const handleAccept = async () => {
        setIsProcessing(true);
        setError(null);

        try {
            const response = await fetch('/api/launch-lab/confirm-upsell', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadId }),
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = finalSuccessUrl + '&upsell_bought=true';
            } else {
                setError(data.error || 'Something went wrong. Please try again.');
                setIsProcessing(false);
            }
        } catch (err) {
            console.error('Upsell error:', err);
            setError('Network error. Please try again.');
            setIsProcessing(false);
        }
    };

    const handleDecline = () => {
        window.location.href = finalSuccessUrl + '&upsell_bought=false';
    };

    return (
        <div className="min-h-screen bg-white text-black font-poppins pb-20">
            {/* Urgency Bar */}
            <div className="bg-black text-[#fffb00] py-3 text-center px-4 sticky top-0 z-50 shadow-md">
                <p className="text-sm md:text-base font-bold uppercase tracking-wider font-display italic">
                    ONE LAST THING — THIS WILL NEVER BE OFFERED AGAIN
                </p>
            </div>

            <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center">
                {/* Status Indicator */}
                <div className="mb-10 flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full border border-yellow-100 text-sm font-bold">
                    <Star size={16} fill="currentColor" />
                    Special Priority Access Detected
                </div>

                {/* Headline */}
                <h1 className="font-display text-4xl md:text-6xl text-center mb-6 leading-tight uppercase italic tracking-tighter">
                    Want to work <span className="text-[#d81159]">1:1 with Ana</span> to build your high-ticket engine?
                </h1>

                <p className="text-xl md:text-2xl text-center text-gray-600 mb-12 max-w-3xl leading-relaxed font-medium">
                    Skip the trial and error. Get a <span className="text-black font-bold underline decoration-[#fffb00] decoration-4">Private 1:1 Sales Coaching Session</span> to audit your offer, fix your paywall, and map out your next $10k.
                </p>

                {/* Offer Box */}
                <div className="w-full bg-gray-50 border-4 border-black shadow-hard p-8 md:p-12 mb-12 relative overflow-hidden">
                    {/* Rare Ribbon */}
                    <div className="absolute top-8 -right-12 bg-[#d81159] text-white px-12 py-1 rotate-45 font-bold text-xs uppercase tracking-widest shadow-sm">
                        VERY RARE
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="font-display text-3xl font-black uppercase italic mb-6 leading-none">
                                The Private <br />
                                <span className="text-[#d81159]">Sales Audit</span>
                            </h2>
                            <p className="text-gray-700 mb-8 leading-relaxed">
                                Usually, my 1:1 time is reserved for $5,000+ consulting clients. But because you just joined the Lab, I want to make sure you hit the ground running.
                            </p>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <div className="bg-green-100 p-1 rounded-full mt-1">
                                        <Check size={14} className="text-green-600" />
                                    </div>
                                    <p className="text-sm font-bold uppercase">Personal Offer Audit</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="bg-green-100 p-1 rounded-full mt-1">
                                        <Check size={14} className="text-green-600" />
                                    </div>
                                    <p className="text-sm font-bold uppercase">Paywall Conversion Optimization</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="bg-green-100 p-1 rounded-full mt-1">
                                        <Check size={14} className="text-green-600" />
                                    </div>
                                    <p className="text-sm font-bold uppercase">Custom 90-Day Scaling Roadmap</p>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white border-2 border-black p-8 rounded-2xl shadow-hard-sm flex flex-col items-center">
                            <p className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-2">Exclusive One-Time Price</p>
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-gray-300 line-through text-2xl font-bold">$1,497</span>
                                <span className="text-5xl font-display font-black text-black italic">$747</span>
                            </div>

                            {error && (
                                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg w-full text-center font-medium">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handleAccept}
                                disabled={isProcessing}
                                className="w-full bg-[#d81159] hover:bg-black text-white font-display font-bold text-2xl py-6 rounded-xl border-b-4 border-black transition-all transform hover:-translate-y-1 active:translate-y-0.5 shadow-xl flex items-center justify-center gap-3 uppercase italic"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Zap fill="currentColor" size={24} />
                                        ADD TO MY ORDER — $747
                                    </>
                                )}
                            </button>

                            <p className="mt-4 text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                                Click once to charge your card on file.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Social Proof */}
                <div className="max-w-2xl text-center mb-16">
                    <p className="italic text-gray-500 text-lg">
                        "One session with Ana fixed my positioning. I went from zero sales to $4,200 in 14 days because I finally knew exactly what to say to my readers."
                    </p>
                    <p className="font-bold mt-2">— Sarah K., Business Strategist</p>
                </div>

                {/* Decline Link */}
                <button
                    onClick={handleDecline}
                    disabled={isProcessing}
                    className="text-gray-400 hover:text-gray-600 transition-colors font-medium text-sm md:text-base cursor-pointer hover:underline disabled:opacity-50"
                >
                    No thanks, I'll do it on my own for now.
                </button>

                {/* Trust Elements */}
                <div className="mt-20 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={20} />
                        <span className="text-xs font-bold uppercase tracking-widest">Secure 1-Click Upgrade</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Lock size={20} />
                        <span className="text-xs font-bold uppercase tracking-widest">Encrypted Transaction</span>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function CoachingUpsellPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d81159]"></div>
            </div>
        }>
            <CoachingUpsellContent />
        </Suspense>
    );
}
