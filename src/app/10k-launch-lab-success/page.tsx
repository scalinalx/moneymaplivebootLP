'use client';

import { useEffect, Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Calendar, Mail, Users, ArrowRight, ExternalLink, Zap, Rocket } from 'lucide-react';
import { LAUNCHLAB_PRICE, LAUNCHLAB_BUMP_PRICE, LAUNCHLAB_BUMP2_PRICE } from '@/lib/stripe';

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
            fetch(`/api/launch-lab/get-lead-status?leadId=${leadId}`)
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
                                let totalValue = LAUNCHLAB_PRICE;
                                if (has_order_bump) totalValue += LAUNCHLAB_BUMP_PRICE;
                                if (has_order_bump2) totalValue += LAUNCHLAB_BUMP2_PRICE;

                                (window as any).fbq('track', 'Purchase', {
                                    value: totalValue / 100,
                                    currency: 'USD',
                                    contents: [{ id: '10k_launch_lab', quantity: 1 }],
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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-neon"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black font-poppins selection:bg-brand-neon selection:text-black">
            <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center">

                <div className="w-20 h-20 bg-brand-neon rounded-full flex items-center justify-center mb-8 shadow-hard border-2 border-black animate-bounce">
                    <CheckCircle className="w-12 h-12 text-black" />
                </div>

                <h1 className="font-display font-black text-4xl md:text-7xl text-black mb-6 text-center uppercase leading-none italic transform -rotate-1">
                    WELCOME TO THE <br />
                    <span className="bg-black text-brand-neon px-4 inline-block transform rotate-1">10K LAUNCH LAB!</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-800 max-w-2xl text-center mb-12 font-medium">
                    You're officially IN. Your payment was successful and we're ready to build your $10,000 launch system together.
                </p>

                <div className="grid md:grid-cols-2 gap-8 w-full mb-16">
                    {/* Next Steps */}
                    <div className="bg-white p-8 rounded-xl border-2 border-black shadow-hard">
                        <h3 className="font-display font-black text-2xl text-black mb-6 uppercase italic">Your Roadmap</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="bg-brand-neon p-2 rounded-lg border border-black h-fit">
                                    <Mail className="text-black" size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-black uppercase text-sm tracking-wider">Check Your Email</p>
                                    <p className="text-gray-600 text-sm">I've sent your onboarding details, login info, and the link to our private dashboard.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-brand-neon p-2 rounded-lg border border-black h-fit">
                                    <Rocket className="text-black" size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-black uppercase text-sm tracking-wider">Start Day 1</p>
                                    <p className="text-gray-600 text-sm">Log in immediately and watch the "Strategy Session" to get your foundations right.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* What's Included */}
                    <div className="bg-black p-8 rounded-xl border-2 border-black shadow-[8px_8px_0px_#e2ff00]">
                        <h3 className="font-display font-black text-2xl text-brand-neon mb-6 uppercase italic">What Happens Now</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-gray-300">
                                <CheckCircle size={18} className="text-brand-neon" />
                                <span>Lifetime Course Access</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <CheckCircle size={18} className="text-brand-neon" />
                                <span>Copywriting Frameworks Vault</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <CheckCircle size={18} className="text-brand-neon" />
                                <span>Weekly Live Performance Audits</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bumps Section */}
                {(status.hasBump1 || status.hasBump2) && (
                    <div className="w-full mb-16 space-y-6">
                        <h2 className="font-display font-black text-3xl text-black uppercase italic text-center">Your Upgrades:</h2>

                        <div className="grid gap-6">
                            {status.hasBump1 && (
                                <div className="bg-[#f8f9fa] border-2 border-black p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 shadow-hard-sm">
                                    <div className="bg-brand-neon p-4 rounded-full border-2 border-black">
                                        <Zap className="text-black" size={24} fill="black" />
                                    </div>
                                    <div className="flex-grow text-center md:text-left">
                                        <h4 className="font-bold text-xl uppercase">Hooks That Stop the Scroll</h4>
                                        <p className="text-gray-600">Access the full vault of headline templates in your dashboard under "Bonuses".</p>
                                    </div>
                                    <a href="#" className="bg-black text-white px-6 py-3 rounded-sm font-bold uppercase text-sm hover:bg-brand-neon hover:text-black transition-all border-2 border-black">
                                        Open Vault
                                    </a>
                                </div>
                            )}

                            {status.hasBump2 && (
                                <div className="bg-[#f8f9fa] border-2 border-black p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 shadow-hard-sm">
                                    <div className="bg-brand-neon p-4 rounded-full border-2 border-black">
                                        <Calendar className="text-black" size={24} />
                                    </div>
                                    <div className="flex-grow text-center md:text-left">
                                        <h4 className="font-bold text-xl uppercase">The 60-Minute Launch Calendar</h4>
                                        <p className="text-gray-600">Your Notion templates have been added to your account library.</p>
                                    </div>
                                    <a href="#" className="bg-black text-white px-6 py-3 rounded-sm font-bold uppercase text-sm hover:bg-brand-neon hover:text-black transition-all border-2 border-black">
                                        View Calendar
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="text-center bg-gray-50 p-10 rounded-2xl w-full border-2 border-dashed border-gray-300">
                    <h2 className="font-display font-black text-2xl text-black mb-4 uppercase italic">Confused? Need Help?</h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        If you haven't received your login email within 10 minutes, check your spam or reach out to Ana directly.
                    </p>
                    <a
                        href="mailto:anaxcalin@gmail.com"
                        className="inline-flex items-center gap-2 bg-brand-neon hover:bg-black hover:text-white text-black font-bold py-4 px-10 rounded-sm border-2 border-black shadow-hard transition-all transform hover:-translate-y-1"
                    >
                        EMAIL SUPPORT <ArrowRight size={18} />
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
