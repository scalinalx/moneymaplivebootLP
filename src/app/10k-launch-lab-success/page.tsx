'use client';

import { useEffect, Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Calendar, Mail, Zap, ArrowRight, ExternalLink, Star } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const leadId = searchParams.get('leadId');
    const [status, setStatus] = useState<{ isPaid: boolean; hasBump1: boolean; hasBump2: boolean; hasUpsell: boolean }>({
        isPaid: false,
        hasBump1: false,
        hasBump2: false,
        hasUpsell: false
    });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Local Testing Bypass
        const isTest = searchParams.get('test') === 'true' || leadId === 'TEST';
        if (isTest) {
            setStatus({
                isPaid: true,
                hasBump1: searchParams.get('bump1') === 'true',
                hasBump2: searchParams.get('bump2') === 'true',
                hasUpsell: searchParams.get('upsell') === 'true'
            });
            setIsLoaded(true);
            return;
        }

        if (leadId) {
            fetch(`/api/launch-lab/get-lead-status?leadId=${leadId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setStatus({
                            isPaid: data.lead.is_paid,
                            hasBump1: !!data.lead.has_order_bump,
                            hasBump2: !!data.lead.has_order_bump2,
                            hasUpsell: !!data.lead.has_upsell
                        });
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
    }, [leadId, searchParams]);

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    // If not paid and not in test mode, redirect back to sales page
    if (!status.isPaid && searchParams.get('test') !== 'true' && leadId !== 'TEST') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <p className="text-gray-500 italic mb-4">Verifying access...</p>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black font-poppins selection:bg-brand-neon selection:text-black">
            <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center">

                <div className="w-20 h-20 bg-brand-neon rounded-full flex items-center justify-center mb-8 border-2 border-black shadow-hard">
                    <CheckCircle className="w-12 h-12 text-black" />
                </div>

                <h1 className="font-anton text-4xl md:text-6xl text-black mb-6 text-center uppercase tracking-tight">
                    PAYMENT <span className="text-[#d81159]">SUCCESSFUL!</span>
                </h1>

                <p className="text-xl text-gray-600 max-w-2xl text-center mb-12 font-medium">
                    Welcome to the <span className="text-black font-black uppercase italic">10k Launch Lab</span>. Your transformation starts right now.
                </p>

                {/* Main Access Section */}
                <div className="w-full bg-[#f8f9fa] border-4 border-black p-8 md:p-12 rounded-3xl shadow-hard mb-16 text-center transform transition-all">
                    <div className="inline-block p-4 bg-brand-neon rounded-2xl mb-6 border-2 border-black">
                        <Mail className="w-10 h-10 text-black" />
                    </div>
                    <h2 className="text-2xl md:text-4xl font-anton italic uppercase mb-4 tracking-wider text-black">What Happens Next?</h2>

                    <div className="bg-white border-2 border-black p-6 rounded-xl mb-8 shadow-hard-sm inline-block max-w-lg">
                        <p className="text-black font-bold text-lg leading-relaxed">
                            You will receive an automated email with login instructions to join the <span className="text-[#d81159]">10k Launch Lab program & community</span> on Teachable.
                        </p>
                    </div>

                    <p className="text-gray-600 max-w-md mx-auto text-base font-medium">
                        Please allow up to 60 minutes for the email to arrive. Don't forget to check your <span className="underline decoration-black">Spam or Promotions</span> folder just in case.
                    </p>
                </div>

                {/* Upsells/Bumps Section */}
                {(status.hasUpsell || status.hasBump1 || status.hasBump2) && (
                    <div className="w-full mb-16 space-y-8">
                        <h3 className="font-anton text-2xl text-black text-center uppercase italic">Your Active Upgrades:</h3>

                        <div className="grid gap-6">
                            {status.hasUpsell && (
                                <div className="bg-[#fffb00]/10 border-4 border-black p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-hard">
                                    <div className="bg-black p-4 rounded-full">
                                        <Zap className="text-[#fffb00]" size={32} fill="#fffb00" />
                                    </div>
                                    <div className="flex-grow text-center md:text-left">
                                        <div className="flex items-center justify-center md:justify-start gap-2 text-[#d81159] font-bold uppercase text-xs mb-1 tracking-widest">
                                            <Star size={14} fill="currentColor" />
                                            Priority Booking Unlocked
                                        </div>
                                        <h3 className="font-anton text-2xl text-black uppercase mb-1 italic">1:1 Private Coaching Session</h3>
                                        <p className="text-gray-700 font-medium">Ana has been notified! Secure your spot on her calendar right now.</p>
                                    </div>
                                    <a
                                        href="https://calendly.com/anacalin/30min"
                                        target="_blank"
                                        className="bg-black text-brand-neon px-8 py-5 rounded-sm font-anton italic font-black text-xl hover:scale-105 transition-transform uppercase whitespace-nowrap shadow-hard border-2 border-brand-neon"
                                    >
                                        BOOK SESSION
                                    </a>
                                </div>
                            )}

                            {status.hasBump1 && (
                                <div className="bg-gray-50 border-2 border-black p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 shadow-hard-sm">
                                    <div className="bg-white p-4 rounded-2xl border-2 border-black shadow-sm">
                                        <Zap className="text-black" size={32} fill="black" />
                                    </div>
                                    <div className="flex-grow text-center md:text-left">
                                        <h4 className="font-anton text-xl mb-2 italic uppercase tracking-tight">Hooks That Stop the Scroll</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">Access the full vault of headline templates in your dashboard under "Bonuses".</p>
                                    </div>
                                    <a href="#" className="bg-black text-white px-8 py-4 rounded-sm font-bold text-sm transition-all border-2 border-black uppercase shadow-hard-sm hover:bg-brand-neon hover:text-black">
                                        OPEN VAULT
                                    </a>
                                </div>
                            )}

                            {status.hasBump2 && (
                                <div className="bg-gray-50 border-2 border-black p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 shadow-hard-sm">
                                    <div className="bg-white p-4 rounded-2xl border-2 border-black shadow-sm">
                                        <Calendar className="text-black" size={32} />
                                    </div>
                                    <div className="flex-grow text-center md:text-left">
                                        <h4 className="font-anton text-xl mb-2 italic uppercase tracking-tight">The 60-Minute Launch Calendar</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">Your project management templates are waiting in the portal.</p>
                                    </div>
                                    <a href="#" className="bg-black text-white px-8 py-4 rounded-sm font-bold text-sm transition-all border-2 border-black uppercase shadow-hard-sm hover:bg-brand-neon hover:text-black">
                                        VIEW CALENDAR
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Support Footer */}
                <div className="text-center w-full pt-12 border-t border-gray-100">
                    <h2 className="font-anton text-2xl text-black mb-4 uppercase italic">Stuck on a Step?</h2>
                    <p className="text-gray-500 mb-8 max-w-sm mx-auto text-sm">
                        If you haven't received your login email or have any questions, Ana is here to help.
                    </p>
                    <a
                        href="mailto:anaxcalin@gmail.com"
                        className="inline-flex items-center gap-2 text-[#d81159] font-black hover:text-black transition-colors uppercase tracking-widest text-sm"
                    >
                        EMAIL ANA DIRECTLY <ArrowRight size={18} />
                    </a>
                </div>

            </div>
        </div>
    );
}

export default function LaunchLabSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
