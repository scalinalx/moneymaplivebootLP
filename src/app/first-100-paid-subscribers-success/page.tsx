'use client';

import { useEffect, Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Mail, Zap, ArrowRight, Star, BookOpen } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const leadId = searchParams.get('leadId');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [hasUpsell, setHasUpsell] = useState(false);
    const [hasLaunchLab, setHasLaunchLab] = useState(false);
    const [hasBump1, setHasBump1] = useState(false);
    const [hasBump2, setHasBump2] = useState(false);
    const [hasBump3, setHasBump3] = useState(false);
    const [hasBundle, setHasBundle] = useState(false);

    useEffect(() => {
        // Short-circuit for local testing - no API call needed
        if (leadId === 'TEST') {
            setIsPaid(true);
            setHasLaunchLab(searchParams.get('lab') !== 'false');
            setHasUpsell(searchParams.get('upsell') === 'true');
            setHasBump1(searchParams.get('bump1') === 'true');
            setHasBump2(searchParams.get('bump2') === 'true');
            setHasBump3(searchParams.get('bump3') === 'true');
            setHasBundle(searchParams.get('bundle') === 'true');
            setIsLoaded(true);
            return;
        }

        if (leadId) {
            fetch(`/api/first100/get-lead-status?leadId=${leadId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success && (data.lead.is_paid || data.lead.has_10k_lab)) {
                        setIsPaid(data.lead.is_paid);
                        setHasUpsell(!!data.lead.has_upsell);
                        setHasLaunchLab(!!data.lead.has_10k_lab);
                        setHasBump1(!!data.lead.has_bump1);
                        setHasBump2(!!data.lead.has_bump2);
                        setHasBump3(!!data.lead.has_bump3);
                        setHasBundle(!!data.lead.has_bundle);

                        if (typeof window !== 'undefined' && (window as any).fbq) {
                            (window as any).fbq('track', 'Purchase', {
                                value: data.lead.is_paid ? 97.00 : 597.00,
                                currency: 'USD',
                                contents: [{ id: data.lead.is_paid ? 'first100_workshop' : '10k_launch_lab', quantity: 1 }],
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

    if (!isLoaded || (!isPaid && !hasLaunchLab)) {
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
                    {isPaid
                        ? <>Success! You now have lifetime access to <strong>Your First 100 Paid Subscribers</strong> — the exact framework to convert free readers to paying customers.</>
                        : <>Success! Your 10k Launch Lab system is being prepared. Check the details below to get started.</>
                    }
                </p>

                {isPaid && (
                    <div className="mb-12">
                        <a
                            href="mailto:anaxcalin@gmail.com"
                            className="inline-flex items-center gap-3 bg-[#333333] hover:bg-black text-white font-montserrat font-bold py-6 px-12 rounded-xl shadow-lg transition-all transform hover:scale-105 uppercase tracking-wider text-lg md:text-xl"
                        >
                            <Zap size={24} fill="white" />
                            GET MY WORKSHOP ACCESS
                        </a>
                    </div>
                )}

                {hasLaunchLab && (
                    <div className="w-full mb-12 bg-black text-white p-8 md:p-12 rounded-3xl border-4 border-[#fffb00] shadow-hard">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="w-full md:w-1/3">
                                <img src="/imgs/10k-launch-lab/hero3.png" alt="10k Launch Lab" className="w-full rounded-xl shadow-lg border border-gray-800" />
                            </div>
                            <div className="w-full md:w-2/3 text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2 text-[#fffb00] mb-4">
                                    <Zap size={20} fill="currentColor" />
                                    <span className="uppercase font-display font-bold italic tracking-widest">VIP UPGRADE ACTIVE</span>
                                </div>
                                <h2 className="font-display text-3xl md:text-4xl italic font-black uppercase mb-4 leading-tight">
                                    THE $10K <br />LAUNCH LAB
                                </h2>

                                <div className="bg-white/10 border border-white/20 p-5 rounded-xl mb-6 text-left">
                                    <p className="text-white font-bold text-base leading-relaxed mb-2">
                                        You'll receive an automated email with login instructions to join the <span className="text-[#fffb00]">10k Launch Lab program & community</span> on Teachable.
                                    </p>
                                    <p className="text-gray-400 text-xs italic">
                                        Please allow up to 60 minutes for access to arrive.
                                    </p>
                                </div>
                                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                    <span className="bg-white/10 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-tight border border-white/10">Full Curriculum</span>
                                    <span className="bg-white/10 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-tight border border-white/10">The $100k Roadmap</span>
                                    <span className="bg-white/10 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-tight border border-white/10">Templates & Swipes</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {hasUpsell && (
                    <div className="w-full mb-12 bg-[#fffb00]/10 border-4 border-black p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="bg-black p-4 rounded-full">
                            <Zap className="text-[#fffb00]" size={32} fill="#fffb00" />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 text-[#d81159] font-bold uppercase text-xs mb-1 tracking-widest">
                                <Star size={14} fill="currentColor" />
                                Priority Booking Unlocked
                            </div>
                            <h3 className="font-anton text-2xl text-black uppercase mb-1">1:1 Private Coaching Session</h3>
                            <p className="font-lora text-gray-700">Ana has been notified! Secure your spot on her calendar right now while it's fresh.</p>
                        </div>
                        <a
                            href="https://calendly.com/anacalin/30min"
                            target="_blank"
                            className="bg-black text-[#fffb00] px-8 py-5 rounded-xl font-display font-black italic text-xl hover:scale-105 transition-transform uppercase whitespace-nowrap shadow-xl border-b-4 border-[#fffb00]/30"
                        >
                            BOOK SESSION NOW
                        </a>
                    </div>
                )}

                {/* Order Bump Fulfillment Blocks */}
                {(hasBump1 || hasBundle) && (
                    <div className="w-full mb-6 bg-gray-50 border-2 border-[#27AE60] p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                        <div className="bg-[#27AE60] p-3 rounded-full flex-shrink-0">
                            <BookOpen className="text-white" size={28} />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <p className="text-[#27AE60] font-bold uppercase text-xs tracking-widest mb-1">Access Unlocked</p>
                            <h3 className="font-anton text-xl text-[#333333] uppercase mb-1">100 Genius Offers</h3>
                            <p className="text-gray-600 text-sm font-lora">Your PDF is ready to download immediately.</p>
                        </div>
                        <a
                            href="/downloads/100-Genius-Offers-Sell-2026.pdf"
                            download
                            className="bg-[#27AE60] text-white px-7 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-green-700 transition-colors whitespace-nowrap flex-shrink-0"
                        >
                            Download PDF →
                        </a>
                    </div>
                )}

                {(hasBump2 || hasBundle) && (
                    <div className="w-full mb-6 bg-gray-50 border-2 border-[#27AE60] p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                        <div className="bg-[#27AE60] p-3 rounded-full flex-shrink-0">
                            <Zap className="text-white" size={28} fill="white" />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <p className="text-[#27AE60] font-bold uppercase text-xs tracking-widest mb-1">Access Unlocked</p>
                            <h3 className="font-anton text-xl text-[#333333] uppercase mb-1">Hooks That Stop the Scroll</h3>
                            <p className="text-gray-600 text-sm font-lora">Access your swipe-file vault of high-converting headline frameworks on Notion.</p>
                        </div>
                        <a
                            href="https://anabubolea.notion.site/Hooks-That-Stop-the-Scroll-17c9b91e546e80b7a0f2c8908465faf2?source=copy_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#27AE60] text-white px-7 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-green-700 transition-colors whitespace-nowrap flex-shrink-0"
                        >
                            Open Vault →
                        </a>
                    </div>
                )}

                {(hasBump3 || hasBundle) && (
                    <div className="w-full mb-12 bg-gray-50 border-2 border-[#d81159] p-6 rounded-2xl">
                        <div className="flex flex-col md:flex-row items-start gap-6">
                            <div className="bg-[#d81159] p-3 rounded-full flex-shrink-0">
                                <Mail className="text-white" size={28} />
                            </div>
                            <div className="flex-grow">
                                <p className="text-[#d81159] font-bold uppercase text-xs tracking-widest mb-1">Access Unlocked</p>
                                <h3 className="font-anton text-xl text-[#333333] uppercase mb-3">Launch Stack — Email Sequence Copywriter</h3>

                                {/* Step-by-step idiot-proof instructions */}
                                <div className="bg-white border-2 border-[#d81159]/30 rounded-xl p-5 mb-4 space-y-3">
                                    <p className="font-bold text-[#333333] text-sm">👇 Here's exactly what you do — follow these steps:</p>
                                    <div className="flex items-start gap-3">
                                        <span className="bg-[#d81159] text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                                        <p className="text-gray-700 text-sm font-medium">Click the <strong>"Open Tool"</strong> button below. A new page will open.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="bg-[#d81159] text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                                        <p className="text-gray-700 text-sm font-medium">You'll see a <strong>password field</strong>. Type in the password exactly as shown below.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="bg-[#d81159] text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                                        <p className="text-gray-700 text-sm font-medium">Hit <strong>Enter</strong> and you're in. That's it.</p>
                                    </div>
                                </div>

                                {/* Password display */}
                                <div className="bg-[#333333] rounded-xl p-4 mb-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
                                    <div>
                                        <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1">Your Password:</p>
                                        <p className="font-mono text-[#fffb00] text-2xl font-black tracking-widest select-all">mellon_hwg</p>
                                    </div>
                                    <p className="text-gray-400 text-xs italic text-center sm:text-right max-w-[160px]">Copy this exactly — underscores and all</p>
                                </div>

                                <a
                                    href="/launch-stack"
                                    target="_blank"
                                    className="inline-flex items-center gap-2 bg-[#d81159] text-white px-7 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-[#b30e4a] transition-colors"
                                >
                                    Open Tool → Enter Password Above
                                </a>
                            </div>
                        </div>
                    </div>
                )}

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
                            {isPaid && [
                                '60-Minute Live Workshop (+ Replay)',
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
                            {hasUpsell && (
                                <li className="flex items-center gap-3 text-[#d81159] font-bold">
                                    <Zap size={18} fill="#d81159" className="flex-shrink-0" />
                                    <span className="font-lato uppercase">1:1 Private Sales Coaching</span>
                                </li>
                            )}
                            {hasLaunchLab && (
                                <li className="flex items-center gap-3 text-black font-bold">
                                    <Star size={18} fill="black" className="flex-shrink-0" />
                                    <span className="font-lato uppercase">The $10k Launch Lab</span>
                                </li>
                            )}
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
