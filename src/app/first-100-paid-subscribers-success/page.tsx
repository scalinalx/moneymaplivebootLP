'use client';

import { useEffect, Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Mail, Zap, ArrowRight, Star } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const leadId = searchParams.get('leadId');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [hasUpsell, setHasUpsell] = useState(false);
    const [hasLaunchLab, setHasLaunchLab] = useState(false);

    useEffect(() => {
        if (leadId) {
            fetch(`/api/first100/get-lead-status?leadId=${leadId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success && (data.lead.is_paid || data.lead.has_10k_lab)) {
                        setIsPaid(data.lead.is_paid);
                        setHasUpsell(!!data.lead.has_upsell);
                        setHasLaunchLab(!!data.lead.has_10k_lab);

                        // Only track purchase if haven't tracked before (or track total)
                        if (typeof window !== 'undefined' && (window as any).fbq) {
                            (window as any).fbq('track', 'Purchase', {
                                value: data.lead.is_paid ? 97.00 : 597.00,
                                currency: 'USD',
                                contents: [{ id: data.lead.is_paid ? 'first100_workshop' : '10k_launch_lab', quantity: 1 }],
                            });
                        }
                    } else if (leadId !== 'TEST') {
                        window.location.href = '/first-100-paid-subscribers';
                    } else if (leadId === 'TEST') {
                        setIsPaid(true);
                        setHasLaunchLab(true);
                        setHasUpsell(true);
                    }
                    setIsLoaded(true);
                })
                .catch(() => {
                    if (leadId !== 'TEST') window.location.href = '/first-100-paid-subscribers';
                    setIsLoaded(true);
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
                                <p className="text-gray-400 mb-6 font-medium">
                                    Your personal dashboard and curriculum have been unlocked. Check your email for a separate login to the Launch Lab portal.
                                </p>
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
