'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { EmbeddedCheckout } from '@/app/10k-launch-lab/components/EmbeddedCheckout';
import { Check, ShieldCheck, Lock, ArrowRight } from 'lucide-react';

function UpsellContent() {
    const searchParams = useSearchParams();
    const leadId = searchParams.get('leadId') || 'test-lead-id';

    const handleDecline = () => {
        window.location.href = `/first-100-paid-subscribers-success?leadId=${leadId}&upsell=declined`;
    };

    return (
        <div className="min-h-screen bg-white text-black font-poppins pb-20">
            {/* Urgency Bar */}
            <div className="bg-[#d81159] text-white py-3 text-center px-4 sticky top-0 z-50 shadow-md">
                <p className="text-sm md:text-base font-bold uppercase tracking-wider animate-pulse font-display">
                    WAIT! Do Not Close This Page — Special Limited-Time Offer
                </p>
            </div>

            <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center">
                {/* Status Indicator */}
                <div className="mb-10 flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-100 text-sm font-bold">
                    <Check size={16} />
                    Registration for First 100 Paid Subscribers Confirmed!
                </div>

                {/* Headline */}
                <h1 className="font-display text-4xl md:text-6xl text-center mb-6 leading-tight uppercase italic tracking-tighter">
                    Ready to scale to <span className="text-[#d81159]">$10K Months?</span>
                </h1>

                <p className="text-xl md:text-2xl text-center text-gray-600 mb-8 max-w-2xl leading-relaxed">
                    You have the conversion system. Now you need the <span className="font-bold text-black border-b-2 border-[#fffb00]">high-ticket scaling engine.</span>
                </p>

                {/* Bundle Image */}
                <div className="mb-0 md:mb-12 w-full max-w-4xl flex justify-center px-4">
                    <img
                        src="/imgs/10k-launch-lab/hero3.png"
                        alt="10k Launch Lab Program Bundle"
                        className="w-full h-auto drop-shadow-xl cursor-pointer hover:scale-[1.01] transition-transform duration-300"
                        onClick={() => document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })}
                    />
                </div>

                <p className="text-base md:text-lg text-left text-gray-700 mb-6 max-w-3xl leading-relaxed">
                    Hitting 100 paid subscribers is the foundation. But to reach $10,000/month consistently, you need to stop selling $5/month subscriptions and start selling $500–$2,000 high-ticket offers directly to your readers.
                </p>

                <p className="text-base md:text-lg text-left font-bold text-black border-l-4 border-[#d81159] pl-4 mb-12 max-w-3xl leading-relaxed">
                    The 10k Launch Lab is my complete swipe file, blueprint, and system for launching and selling high-ticket offers (coaching, cohorts, services) on Substack without being salesy.
                </p>

                {/* Value Proposition Box */}
                <div className="w-full bg-gray-50 border-4 border-black shadow-hard p-8 md:p-12 mb-16 relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-[#fffb00] px-6 py-2 font-display text-xl uppercase italic whitespace-nowrap">
                        Everything You Get Inside the Lab
                    </div>

                    <div className="flex flex-col gap-4 mt-6">
                        <div className="flex items-start justify-between gap-4 p-4 border border-gray-200 bg-white rounded-xl shadow-sm">
                            <div className="flex items-start gap-3">
                                <Check className="text-green-600 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-display font-black text-lg uppercase leading-tight">Video Training Library</p>
                                    <p className="text-sm text-gray-500 mt-1">Step-by-step modules you watch at your own pace</p>
                                </div>
                            </div>
                            <span className="font-bold text-gray-400">$997</span>
                        </div>
                        <div className="flex items-start justify-between gap-4 p-4 border border-gray-200 bg-white rounded-xl shadow-sm">
                            <div className="flex items-start gap-3">
                                <Check className="text-green-600 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-display font-black text-lg uppercase leading-tight">Live Group Coaching Calls</p>
                                    <p className="text-sm text-gray-500 mt-1">Weekly hot-seats and Q&A with Ana — get unstuck fast</p>
                                </div>
                            </div>
                            <span className="font-bold text-gray-400">$1,497</span>
                        </div>
                        <div className="flex items-start justify-between gap-4 p-4 border border-gray-200 bg-white rounded-xl shadow-sm">
                            <div className="flex items-start gap-3">
                                <Check className="text-green-600 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-display font-black text-lg uppercase leading-tight">Direct Feedback on Your Offer</p>
                                    <p className="text-sm text-gray-500 mt-1">Submit your offer and get a personal critique</p>
                                </div>
                            </div>
                            <span className="font-bold text-gray-400">$997</span>
                        </div>
                        <div className="flex items-start justify-between gap-4 p-4 border border-gray-200 bg-white rounded-xl shadow-sm">
                            <div className="flex items-start gap-3">
                                <Check className="text-green-600 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-display font-black text-lg uppercase leading-tight">Private Community Access</p>
                                    <p className="text-sm text-gray-500 mt-1">A high-accountability space of ambitious peers pushing to $10k</p>
                                </div>
                            </div>
                            <span className="font-bold text-gray-400">$497</span>
                        </div>
                        <div className="flex items-start justify-between gap-4 p-4 border border-gray-200 bg-white rounded-xl shadow-sm">
                            <div className="flex items-start gap-3">
                                <Check className="text-green-600 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-display font-black text-lg uppercase leading-tight">Templates, Playbooks & Tools</p>
                                    <p className="text-sm text-gray-500 mt-1">PDF playbooks, templates, and custom-built AI tools so you never guess</p>
                                </div>
                            </div>
                            <span className="font-bold text-gray-400">$1,009</span>
                        </div>

                        <div className="p-4 border-2 border-black bg-white rounded-xl text-center mt-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                            <p className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-1">Total Value: <span className="line-through">$4,997</span></p>
                            <p className="font-display font-black text-4xl text-[#d81159]">ONLY $597 FOR YOU</p>
                        </div>
                    </div>
                </div>

                {/* Testimonials */}
                <div className="w-full mb-16 space-y-6">
                    <h2 className="font-display text-4xl text-center mb-8 uppercase italic">💬 What People Are Saying</h2>

                    <div className="bg-gray-50 border border-gray-100 p-8 rounded-lg shadow-sm flex flex-col justify-between hover:scale-[1.01] transition-transform">
                        <p className="font-poppins text-lg leading-relaxed mb-6 italic text-gray-800">
                            "I spent 3 months 'figuring it out' on my own. Made $0. 30 days in the Lab? $5,200. The daily tasks made it impossible to procrastinate. I just opened the module, did the thing, moved on."
                        </p>
                        <div className="border-t border-gray-200 pt-4">
                            <p className="font-bold text-lg">Marcus D.</p>
                            <p className="text-xs font-bold text-green-600 uppercase tracking-wider mt-1">Verified Purchase | $5,200 Revenue</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 p-8 rounded-lg shadow-sm flex flex-col justify-between hover:scale-[1.01] transition-transform">
                        <p className="font-poppins text-lg leading-relaxed mb-6 italic text-gray-800">
                            "I've bought 4 different courses on 'how to launch.' Watched all the videos. Never launched. The Lab was different. No 3-hour modules. Just ONE task per day. Day 22: Launched. Day 28: $6,400 in sales."
                        </p>
                        <div className="border-t border-gray-200 pt-4">
                            <p className="font-bold text-lg">Priya S.</p>
                            <p className="text-xs font-bold text-green-600 uppercase tracking-wider mt-1">Verified Purchase | $6,400 Revenue</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 p-8 rounded-lg shadow-sm flex flex-col justify-between hover:scale-[1.01] transition-transform">
                        <p className="font-poppins text-lg leading-relaxed mb-6 italic text-gray-800">
                            "The templates are insane. I'm not a copywriter. But the fill-in-the-blank sales page template made me sound like one. I launched 19 days after joining. Made $3,200 in the first week."
                        </p>
                        <div className="border-t border-gray-200 pt-4">
                            <p className="font-bold text-lg">Lizzy D.</p>
                            <p className="text-xs font-bold text-green-600 uppercase tracking-wider mt-1">Verified Purchase | $3,200+ Revenue</p>
                        </div>
                    </div>
                </div>

                {/* Urgency Section */}
                <div className="w-full max-w-3xl text-center mb-12">
                    <h2 className="font-display text-3xl font-bold uppercase italic mb-4">This is your ONLY chance to get this price.</h2>
                    <p className="text-gray-600">Once you close this page, the price goes back to its normal retail rate. Add it to your order now and get instant access.</p>
                </div>

                {/* Embedded Checkout */}
                <div className="w-full max-w-[600px] mb-8">
                    <EmbeddedCheckout />
                </div>

                {/* Decline Link */}
                <button
                    onClick={handleDecline}
                    className="text-gray-400 hover:text-gray-600 transition-colors font-medium text-sm md:text-base cursor-pointer"
                >
                    No thanks, I don't want to get rich today. I'll just stick to a small paid tier.
                </button>

                {/* Trust Elements */}
                <div className="mt-20 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={20} />
                        <span className="text-xs font-bold uppercase tracking-widest">Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Lock size={20} />
                        <span className="text-xs font-bold uppercase tracking-widest">256-Bit Encryption</span>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function UpsellPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-display text-4xl italic">Loading Offer...</div>}>
            <UpsellContent />
        </Suspense>
    );
}
