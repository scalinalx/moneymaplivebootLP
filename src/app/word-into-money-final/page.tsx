'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Mail, Zap, ArrowRight, BookOpen, Star, Calendar } from 'lucide-react';

function FinalContent() {
    const searchParams = useSearchParams();
    const leadId = searchParams.get('leadId');
    const [isLoaded, setIsLoaded] = useState(false);
    const [lead, setLead] = useState<any>(null);

    useEffect(() => {
        if (leadId === 'TEST') {
            setLead({ is_paid: true, has_bump1: true, has_bump2: true, has_bump3: false, has_bundle: false, has_upsell1: true, has_upsell2: false, has_upsell3: false });
            setIsLoaded(true);
            return;
        }

        if (leadId) {
            fetch(`/api/word-into-money/get-lead-status?leadId=${leadId}`)
                .then(r => r.json())
                .then(d => {
                    if (d.success && d.lead.is_paid) {
                        setLead(d.lead);
                    } else {
                        window.location.href = '/word-into-money';
                    }
                    setIsLoaded(true);
                })
                .catch(() => { window.location.href = '/word-into-money'; });
        } else {
            window.location.href = '/word-into-money';
        }
    }, [leadId]);

    if (!isLoaded || !lead) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-950 text-brand-grey font-lora italic">
                Loading your purchases...
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
                    You&apos;re All Set!
                </h1>
                <p className="font-lora text-lg text-brand-grey text-center mb-12 max-w-lg">
                    Everything is confirmed. Check your email for access links to all your purchases.
                </p>

                {/* Core Product */}
                <div className="w-full mb-6 bg-brand-900 border-2 border-brand-lime p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                    <div className="bg-brand-lime p-3 rounded-full flex-shrink-0">
                        <Zap className="text-brand-950" size={28} />
                    </div>
                    <div className="flex-grow text-center md:text-left">
                        <p className="text-brand-lime font-bold uppercase text-xs tracking-widest mb-1">Core Workshop</p>
                        <h3 className="font-anton text-xl text-brand-white uppercase">Word Into Money</h3>
                        <p className="text-brand-grey text-sm font-lora">Check your email for workshop access link.</p>
                    </div>
                </div>

                {/* Bump Fulfillment */}
                {(lead.has_bump1 || lead.has_bundle) && (
                    <div className="w-full mb-4 bg-brand-900 border border-brand-800 p-5 rounded-xl flex items-center gap-4">
                        <BookOpen className="text-brand-lime flex-shrink-0" size={22} />
                        <div className="flex-grow">
                            <p className="font-bold text-brand-white text-sm">Hooks That Stop the Scroll</p>
                            <p className="text-brand-grey text-xs font-lora">Access your Notion vault →</p>
                        </div>
                        <a href="https://anabubolea.notion.site/Hooks-That-Stop-the-Scroll-17c9b91e546e80b7a0f2c8908465faf2" target="_blank" rel="noopener noreferrer" className="bg-brand-lime text-brand-950 px-4 py-2 rounded-lg font-bold text-xs uppercase">Open</a>
                    </div>
                )}

                {(lead.has_bump2 || lead.has_bundle) && (
                    <div className="w-full mb-4 bg-brand-900 border border-brand-800 p-5 rounded-xl flex items-center gap-4">
                        <BookOpen className="text-brand-lime flex-shrink-0" size={22} />
                        <div className="flex-grow">
                            <p className="font-bold text-brand-white text-sm">100 Genius Launch Ideas</p>
                            <p className="text-brand-grey text-xs font-lora">Download your PDF →</p>
                        </div>
                        <a href="/downloads/100-Genius-Offers-Sell-2026.pdf" download className="bg-brand-lime text-brand-950 px-4 py-2 rounded-lg font-bold text-xs uppercase">Download</a>
                    </div>
                )}

                {(lead.has_bump3 || lead.has_bundle) && (
                    <div className="w-full mb-4 bg-brand-900 border border-brand-800 p-5 rounded-xl">
                        <div className="flex items-center gap-4 mb-3">
                            <Mail className="text-brand-lime flex-shrink-0" size={22} />
                            <div className="flex-grow">
                                <p className="font-bold text-brand-white text-sm">Launch Stack Email Copywriter</p>
                            </div>
                        </div>
                        <div className="bg-brand-950 rounded-lg p-3 flex items-center justify-between">
                            <div>
                                <p className="text-brand-grey text-[10px] uppercase font-bold tracking-widest mb-1">Password:</p>
                                <p className="font-mono text-brand-lime text-lg font-black tracking-widest select-all">mellon_hwg</p>
                            </div>
                            <a href="/launch-stack" target="_blank" className="bg-brand-lime text-brand-950 px-4 py-2 rounded-lg font-bold text-xs uppercase">Open Tool</a>
                        </div>
                    </div>
                )}

                {/* Upsell Fulfillment */}
                {lead.has_upsell1 && (
                    <div className="w-full mb-4 bg-brand-900 border border-brand-lime/50 p-5 rounded-xl flex items-center gap-4">
                        <Star className="text-brand-lime flex-shrink-0" size={22} />
                        <div className="flex-grow">
                            <p className="font-bold text-brand-white text-sm">First 100 Paid Subscribers</p>
                            <p className="text-brand-grey text-xs font-lora">Check your email for access.</p>
                        </div>
                    </div>
                )}

                {lead.has_upsell2 && (
                    <div className="w-full mb-4 bg-brand-900 border border-brand-lime/50 p-5 rounded-xl flex items-center gap-4">
                        <Zap className="text-brand-lime flex-shrink-0" size={22} />
                        <div className="flex-grow">
                            <p className="font-bold text-brand-white text-sm">The $10K Launch Lab</p>
                            <p className="text-brand-grey text-xs font-lora">Login instructions coming to your email within 60 minutes.</p>
                        </div>
                    </div>
                )}

                {lead.has_upsell3 && (
                    <div className="w-full mb-4 bg-brand-900 border border-brand-lime/50 p-5 rounded-xl flex items-center gap-4">
                        <Calendar className="text-brand-lime flex-shrink-0" size={22} />
                        <div className="flex-grow">
                            <p className="font-bold text-brand-white text-sm">1:1 Coaching with Ana</p>
                            <p className="text-brand-grey text-xs font-lora">Book your session now.</p>
                        </div>
                        <a href="https://calendly.com/anacalin/30min" target="_blank" className="bg-brand-lime text-brand-950 px-4 py-2 rounded-lg font-bold text-xs uppercase">Book</a>
                    </div>
                )}

                {/* Support */}
                <div className="text-center mt-12 bg-brand-900 p-8 rounded-2xl w-full border border-brand-800">
                    <h2 className="font-anton text-xl text-brand-white mb-3 uppercase">Need Help?</h2>
                    <p className="font-lora text-brand-grey text-sm mb-6">Our team is here to help you succeed.</p>
                    <a
                        href="mailto:anaxcalin@gmail.com"
                        className="inline-flex items-center gap-2 bg-brand-lime hover:bg-brand-limeDim text-brand-950 font-bold py-3 px-8 rounded-xl transition-all uppercase text-sm"
                    >
                        CONTACT SUPPORT <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function WordIntoMoneyFinalPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-brand-950 text-brand-grey">Loading...</div>}>
            <FinalContent />
        </Suspense>
    );
}
