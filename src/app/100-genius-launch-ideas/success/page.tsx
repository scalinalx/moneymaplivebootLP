'use client';

import { useEffect, Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Download, Mail, Zap, ArrowRight, Shield, Rocket, AlertCircle } from 'lucide-react';
import { GENIUS_IDEAS_PRICE, GENIUS_IDEAS_BUMP_PRICE, GENIUS_IDEAS_BUMP2_PRICE } from '@/lib/stripe';

function SuccessContent() {
    const searchParams = useSearchParams();
    const leadId = searchParams.get('leadId');
    const [status, setStatus] = useState<{ isPaid: boolean; hasBump1: boolean; hasBump2: boolean }>({
        isPaid: false,
        hasBump1: false,
        hasBump2: false
    });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Local Testing Bypass
        const isTest = searchParams.get('test') === 'true';
        if (isTest) {
            setStatus({
                isPaid: true,
                hasBump1: searchParams.get('bump1') === 'true',
                hasBump2: searchParams.get('bump2') === 'true'
            });
            setIsLoaded(true);
            return;
        }

        if (leadId) {
            fetch(`/api/genius-ideas/get-lead-status?leadId=${leadId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        const { is_paid, has_order_bump, has_order_bump2 } = data.lead;
                        setStatus({
                            isPaid: is_paid,
                            hasBump1: has_order_bump,
                            hasBump2: has_order_bump2
                        });

                        if (is_paid) {
                            // Track conversion with Facebook Pixel
                            if (typeof window !== 'undefined' && (window as any).fbq) {
                                let totalValue = GENIUS_IDEAS_PRICE;
                                if (has_order_bump) totalValue += GENIUS_IDEAS_BUMP_PRICE;
                                if (has_order_bump2) totalValue += GENIUS_IDEAS_BUMP2_PRICE;

                                (window as any).fbq('track', 'Purchase', {
                                    value: totalValue / 100,
                                    currency: 'USD',
                                    contents: [{ id: '100_genius_ideas', quantity: 1 }],
                                });
                            }
                        }
                    }
                    setIsLoaded(true);
                })
                .catch(err => {
                    console.error('Error fetching status:', err);
                    setIsLoaded(true);
                });
        } else {
            setIsLoaded(true);
        }
    }, [leadId]);

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-rose-100 selection:text-rose-900">
            {/* Urgent Attention Bar - Sticky & High Visibility */}
            <div className="sticky top-0 z-50 w-full bg-yellow-400 py-4 px-6 border-b-2 border-yellow-500 shadow-xl animate-pulse-subtle">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 text-center">
                    <span className="font-black text-black uppercase tracking-tighter text-lg md:text-xl flex items-center gap-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        <AlertCircle size={24} className="fill-black text-yellow-400" />
                        ATTENTION! DO NOT CLOSE THIS PAGE!
                    </span>
                    <p className="text-black text-sm md:text-base font-bold leading-tight max-w-3xl" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Due to delivery systems, your access email can take up to 12 hours.
                        <span className="underline decoration-2 underline-offset-4"> Download your file below IMMEDIATELY</span> so you don't lose access.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center">

                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-8 border-2 border-emerald-100 shadow-sm">
                    <CheckCircle className="w-12 h-12 text-emerald-500" />
                </div>

                <h1 className="font-display font-bold text-4xl md:text-6xl text-slate-900 mb-6 text-center leading-tight">
                    PAYMENT <span className="text-rose-500">SUCCESSFUL!</span>
                </h1>

                <p className="text-xl text-slate-600 max-w-2xl text-center mb-12 font-light">
                    You're all set. The <span className="font-bold text-slate-900">184-page Master Repository</span> of 100 Genius Offers is ready for you below.
                </p>

                {/* Main Download Section */}
                <div className="w-full bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200 shadow-xl shadow-rose-500/5 mb-16 text-center transform transition-all hover:scale-[1.01]">
                    <div className="inline-block p-4 bg-rose-50 rounded-2xl mb-6">
                        <Rocket className="w-10 h-10 text-rose-500" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Your 184-Page Master Document</h2>
                    <p className="text-slate-500 mb-10 max-w-md mx-auto text-lg leading-relaxed">
                        Click the button below to download the full repository. Pick an offer, launch it, and start earning today.
                    </p>

                    <a
                        href="/downloads/100-Genius-Offers-Sell-2026.pdf"
                        download="100-Genius-Offers-That-Sell-in-2026.pdf"
                        className="inline-flex items-center gap-4 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-black px-14 py-6 rounded-2xl shadow-xl shadow-pink-500/30 transition-all hover:-translate-y-1 text-xl group uppercase tracking-tight"
                    >
                        <Download size={28} className="group-hover:bounce" />
                        DOWNLOAD THE 184-PAGE PDF
                    </a>
                </div>

                {/* Bumps Section */}
                {(status.hasBump1 || status.hasBump2) && (
                    <div className="w-full mb-16 space-y-8">
                        <h3 className="text-2xl font-bold text-slate-900 text-center">Your Added Tools:</h3>

                        <div className="grid gap-6">
                            {status.hasBump1 && (
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 shadow-sm">
                                    <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm">
                                        <Zap className="text-amber-500" size={32} fill="currentColor" />
                                    </div>
                                    <div className="flex-grow text-center md:text-left">
                                        <h4 className="font-bold text-xl mb-2 italic uppercase tracking-tight">OfferGenius™ AI Engine</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">Your access to the AI offer builder is being activated. Check your email for the login credentials.</p>
                                    </div>
                                    <a href="/ana-offer-genius" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-md shadow-amber-500/20">
                                        ACCESS ENGINE
                                    </a>
                                </div>
                            )}

                            {status.hasBump2 && (
                                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 shadow-sm">
                                    <div className="bg-white p-4 rounded-2xl border border-indigo-200 shadow-sm">
                                        <Mail className="text-indigo-500" size={32} />
                                    </div>
                                    <div className="flex-grow text-center md:text-left">
                                        <h4 className="font-bold text-xl mb-2 italic uppercase tracking-tight">Launch Stack AI Dashboard</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                            The "Lazy Launch" email sequence templates are now available.
                                            <span className="block font-bold text-slate-900 mt-1">Use the password below to unlock your dashboard immediately:</span>
                                        </p>
                                        <div className="inline-flex items-center gap-3 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-lg font-black shadow-lg shadow-indigo-200 border-2 border-indigo-400 uppercase tracking-widest transform transition-transform hover:scale-105">
                                            <span className="text-indigo-200 text-xs font-bold mr-1">PASSWORD:</span>
                                            <span className="selection:bg-indigo-400 select-all font-mono">{process.env.NEXT_PUBLIC_LAUNCH_STACK_PASSWORD || 'mellon_hwg'}</span>
                                        </div>
                                    </div>
                                    <a href="/launch-stack" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-md shadow-indigo-600/20">
                                        OPEN DASHBOARD
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Support Footer */}
                <div className="text-center w-full pt-12 border-t border-slate-200">
                    <p className="text-slate-400 text-sm mb-6 flex items-center justify-center gap-2">
                        <Shield size={14} />
                        SECURE DOWNLOAD AREA
                    </p>
                    <p className="text-slate-500 mb-8 max-w-sm mx-auto text-sm">
                        Problem with your download? Stuck on a step? Ana is here to help.
                    </p>
                    <a
                        href="mailto:anaxcalin@gmail.com"
                        className="inline-flex items-center gap-2 text-rose-500 font-bold hover:text-rose-600 transition-colors"
                    >
                        EMAIL ANA DIRECTLY <ArrowRight size={18} />
                    </a>
                </div>

            </div>
        </div>
    );
}

export default function GeniusIdeasSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
