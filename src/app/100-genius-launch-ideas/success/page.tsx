'use client';

import { useEffect, Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Download, Mail, Zap, ArrowRight, Shield, Rocket } from 'lucide-react';
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
            <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center">

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
                    <p className="text-slate-500 mb-10 max-w-md mx-auto">
                        Click the button below to download the full repository. Pick an offer, launch it, and start earning this weekend.
                    </p>

                    <a
                        href="/downloads/100-Genius-Offers-Sell-2026.pdf"
                        download="100-Genius-Offers-That-Sell-in-2026.pdf"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold px-12 py-5 rounded-full shadow-lg shadow-pink-500/30 transition-all hover:-translate-y-1 text-lg group"
                    >
                        <Download size={24} className="group-hover:bounce" />
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
                                    <a href="/ana-ai-offer-flow" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-md shadow-amber-500/20">
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
                                        <p className="text-slate-600 text-sm leading-relaxed">The "Lazy Launch" email sequence templates are now available in your Launch Stack account.</p>
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
