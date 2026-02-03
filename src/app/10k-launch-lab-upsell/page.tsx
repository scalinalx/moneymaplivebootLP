'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { LAUNCHLAB_COACHING_PRICE } from '@/lib/stripe';
import { Check, Zap, ArrowRight, ShieldCheck, Lock, AlertCircle, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

function UpsellContent() {
    const searchParams = useSearchParams();
    const leadId = searchParams.get('leadId');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAccept = async () => {
        if (!leadId) return;
        setIsProcessing(true);

        try {
            const res = await fetch('/api/launch-lab/confirm-upsell', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadId }),
            });
            const data = await res.json();

            if (data.success) {
                window.location.href = `/10k-launch-lab-success?leadId=${leadId}&upsell=accepted`;
            } else {
                alert(data.error || 'Payment failed. Please try again.');
                setIsProcessing(false);
            }
        } catch (error) {
            console.error('Error accepting upsell:', error);
            window.location.href = `/10k-launch-lab-success?leadId=${leadId}&upsell=error`;
        }
    };

    const handleDecline = () => {
        if (!leadId) return;
        window.location.href = `/10k-launch-lab-success?leadId=${leadId}&upsell=declined`;
    };

    return (
        <div className="min-h-screen bg-white text-black font-poppins">
            {/* Urgency Bar */}
            <div className="bg-[#d81159] text-white py-3 text-center px-4">
                <p className="text-sm md:text-base font-bold uppercase tracking-wider animate-pulse font-display">
                    Special One-Time Offer — Do not close this page!
                </p>
            </div>

            <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center">
                {/* Status Indicator */}
                <div className="mb-10 flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-100 text-sm font-bold">
                    <Check size={16} />
                    Registration for 10K Launch Lab Confirmed!
                </div>

                {/* Headline */}
                <h1 className="font-display text-4xl md:text-7xl text-center mb-6 leading-tight uppercase italic tracking-tighter">
                    Wait! Want to <span className="text-[#d81159]">Hyper-Scale</span> Your Sales?
                </h1>

                <p className="text-xl md:text-2xl text-center text-gray-600 mb-6 max-w-2xl leading-relaxed">
                    Add a <span className="font-bold text-black border-b-2 border-[#fffb00]">1:1 Private Sales Coaching Session</span> to your order now at this exclusive price.
                </p>

                <p className="text-base md:text-lg text-center text-gray-500 mb-12 max-w-3xl leading-relaxed italic">
                    Work with me 1:1. Access my 20 years of business, marketing, and sales experience. Whether you're starting out or scaling, I <span className="text-black font-bold uppercase">guarantee</span> this session will be a <span className="text-[#d81159] font-bold uppercase">massive boost</span> of progress—collapsing months of work into a single day.
                </p>

                {/* Value Proposition Box */}
                <div className="w-full bg-gray-50 border-4 border-black shadow-hard p-8 md:p-12 mb-12 relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-[#fffb00] px-6 py-2 font-display text-xl uppercase italic">
                        The Ultimate Conversion Edge
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 mt-6">
                        <div className="space-y-6">
                            <h3 className="font-display text-2xl uppercase font-bold">What We'll Accomplish:</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <Check className="text-[#d81159] mt-1 flex-shrink-0" />
                                    <span><strong>Individual Review</strong> — I will audit your strategy and offer to maximize sales.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="text-[#d81159] mt-1 flex-shrink-0" />
                                    <span><strong>Customized Plan</strong> — A precise execution roadmap to hit your goals ASAP.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="text-[#d81159] mt-1 flex-shrink-0" />
                                    <span><strong>High-Ticket Sales Script</strong> — I’ll write your custom closing script with you.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 border-2 border-black flex flex-col justify-center items-center text-center">
                            <p className="text-gray-500 line-through text-lg font-bold">Standard Price: $1,997</p>
                            <p className="text-4xl md:text-6xl font-display font-bold text-black mt-2">ONLY ${LAUNCHLAB_COACHING_PRICE / 100}</p>
                            <p className="text-[#d81159] font-bold text-sm mt-2 uppercase tracking-widest text-[10px] md:text-xs">ONE-TIME EXCLUSIVE PRICE</p>
                        </div>
                    </div>
                </div>

                {/* Main CTA */}
                <button
                    onClick={handleAccept}
                    disabled={isProcessing}
                    className="w-full max-w-2xl bg-[#fffb00] hover:bg-[#e6e200] text-black font-display font-bold text-2xl md:text-4xl py-6 rounded-sm border-4 border-black shadow-hard hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase tracking-wider mb-8"
                >
                    {isProcessing ? 'Processing...' : 'Yes! Add it to my order!'}
                </button>

                {/* Decline Link */}
                <button
                    onClick={handleDecline}
                    className="text-gray-400 hover:text-black transition-colors font-medium border-b border-transparent hover:border-black py-2 text-lg mb-20"
                >
                    No thanks, I'll pass on this 50% discount. Just take me to my dashboard.
                </button>

                {/* Social Proof Grid */}
                <div className="w-full max-w-6xl mb-20 px-4">
                    <h2 className="font-display text-3xl md:text-5xl text-center mb-16 uppercase italic">Results from the Inner Circle</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {/* 1. Elena (White/European/20s) - Instagram Style */}
                        <div className="bg-white rounded-3xl p-0 shadow-xl border border-gray-100 h-fit overflow-hidden transform hover:scale-[1.02] transition-transform">
                            <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <img src="/imgs/10k-launch-lab/social-proof/avatar4.png" className="w-8 h-8 rounded-full border border-gray-100 object-cover" alt="User" />
                                    <p className="text-sm font-bold">elena_fluorescence</p>
                                </div>
                                <MoreHorizontal size={18} className="text-gray-400" />
                            </div>
                            <div className="p-6 bg-gradient-to-br from-[#833ab408] to-[#fcb04508]">
                                <p className="text-gray-800 text-base leading-relaxed">
                                    "Ana, that 1:1 was a total game changer. I was so stuck on my positioning and you simplified it in 15 mins. Just had my <strong>biggest launch ever</strong> ($18k) using the roadmap we built. Incredible."
                                </p>
                            </div>
                            <div className="p-4 flex gap-4">
                                <Heart size={20} className="text-[#d81159]" fill="#d81159" />
                                <MessageCircle size={20} className="text-gray-400" />
                                <Send size={20} className="text-gray-400" />
                                <div className="flex-grow"></div>
                                <Bookmark size={20} className="text-gray-400" />
                            </div>
                        </div>

                        {/* 2. Sarah (Existing) - iOS Message Card */}
                        <div className="bg-[#F2F2F7] rounded-[2rem] p-6 shadow-xl border border-gray-200 flex flex-col h-fit transform -rotate-1 hover:rotate-0 transition-transform">
                            <div className="flex items-center gap-3 mb-4">
                                <img src="/imgs/10k-launch-lab/social-proof/avatar1.png" className="w-10 h-10 rounded-full border border-gray-300 object-cover" alt="User" />
                                <div>
                                    <p className="text-[14px] font-bold text-black">Sarah Jennings</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-tight">Active Now</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="bg-[#E9E9EB] text-black rounded-2xl rounded-bl-none px-4 py-2 text-sm max-w-[85%] self-start">
                                    Ana, thank you!!
                                </div>
                                <div className="bg-[#007AFF] text-white rounded-2xl rounded-br-none px-5 py-3 text-sm max-w-[90%] self-end shadow-sm leading-tight">
                                    CLOSED MY FIRST $5K DEAL! 🚀 The session was the missing piece. Literally collapsed months of work into 60 mins.
                                </div>
                            </div>
                            <div className="mt-4 text-[11px] text-gray-400 font-medium px-1">Delivered</div>
                        </div>

                        {/* 3. Claire (Mid 30s) - Facebook Style */}
                        <div className="bg-white rounded-lg p-5 shadow-xl border border-gray-200 h-fit hover:rotate-1 transition-transform">
                            <div className="flex items-center gap-3 mb-4">
                                <img src="/imgs/10k-launch-lab/social-proof/avatar5.png" className="w-11 h-11 rounded-full border border-blue-100 object-cover" alt="User" />
                                <div>
                                    <p className="text-[15px] font-bold text-[#1c1e21]">Claire Morrison</p>
                                    <p className="text-[12px] text-gray-500 font-medium">Top Contributor · 4h</p>
                                </div>
                            </div>
                            <p className="text-[#1c1e21] text-[15px] leading-relaxed mb-4">
                                Update on my scaling goals: THE 1:1 SESSION IS THE SHORTCUT. I’ve launched 4 offers before but none felt this "aligned". Ana stripped away everything that wasn't making money. Just hit **$25k this month**. So happy!
                            </p>
                            <div className="flex items-center justify-between py-3 border-t border-gray-100 gap-4 opacity-60">
                                <div className="flex items-center gap-1.5 text-gray-500 font-bold text-xs uppercase"><Heart size={14} /> Like</div>
                                <div className="flex items-center gap-1.5 text-gray-500 font-bold text-xs uppercase"><MessageCircle size={14} /> Comment</div>
                                <div className="flex items-center gap-1.5 text-gray-500 font-bold text-xs uppercase"><Send size={14} /> Share</div>
                            </div>
                        </div>

                        {/* 4. Sophia (Early 40s) - iOS Message Card */}
                        <div className="bg-[#F2F2F7] rounded-[2rem] p-6 shadow-xl border border-gray-200 flex flex-col h-fit transform rotate-1 hover:rotate-0 transition-transform">
                            <div className="flex items-center gap-3 mb-4">
                                <img src="/imgs/10k-launch-lab/social-proof/avatar6.png" className="w-10 h-10 rounded-full border border-gray-300 object-cover" alt="User" />
                                <div>
                                    <p className="text-[14px] font-bold text-black">Sophia Laurent</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-tight">Digital CEO</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="bg-[#007AFF] text-white rounded-2xl rounded-br-none px-5 py-3 text-sm max-w-[90%] self-end shadow-sm leading-tight">
                                    Just had to tell you... your pricing audit just added **$8k** to my bottom line. This coaching is the highest ROI thing I've done all year. 🥂
                                </div>
                            </div>
                            <div className="mt-4 text-[11px] text-gray-400 font-medium px-1">Read 11:11 PM</div>
                        </div>

                        {/* 5. Jessica (Existing) - Facebook Style */}
                        <div className="bg-white rounded-lg p-5 shadow-xl border border-gray-200 h-fit hover:scale-[1.02] transition-transform">
                            <div className="flex items-center gap-3 mb-4">
                                <img src="/imgs/10k-launch-lab/social-proof/avatar3.png" className="w-11 h-11 rounded-full border border-blue-100 object-cover" alt="User" />
                                <div>
                                    <p className="text-[15px] font-bold text-[#1c1e21]">Jessica Wilde</p>
                                    <p className="text-[12px] text-gray-500 font-medium">Inner Circle · 14m</p>
                                </div>
                            </div>
                            <p className="text-[#1c1e21] text-[15px] leading-relaxed mb-4">
                                If you're on the fence about the 1:1 session... <strong>stop thinking and just do it.</strong> Within 15 minutes she found huge leaks in my funnel. Worth 10x the price.
                            </p>
                            <div className="flex items-center justify-between py-3 border-t border-gray-100 gap-4 opacity-50">
                                <div className="flex items-center gap-1.5 text-gray-500 font-bold text-xs uppercase"><Heart size={14} /> Like</div>
                                <div className="flex items-center gap-1.5 text-gray-500 font-bold text-xs uppercase"><MessageCircle size={14} /> Comment</div>
                                <div className="flex items-center gap-1.5 text-gray-500 font-bold text-xs uppercase"><Send size={14} /> Share</div>
                            </div>
                        </div>

                        {/* 6. Mark (Existing - Diversity) - Instagram Style */}
                        <div className="bg-white rounded-3xl p-0 shadow-xl border border-gray-100 h-fit overflow-hidden opacity-90 hover:opacity-100 transition-opacity">
                            <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <img src="/imgs/10k-launch-lab/social-proof/avatar2.png" className="w-8 h-8 rounded-full object-cover" alt="User" />
                                    <p className="text-sm font-bold">mark_digital</p>
                                </div>
                                <MoreHorizontal size={18} className="text-gray-400" />
                            </div>
                            <div className="p-6 bg-gray-50">
                                <p className="text-gray-800 text-base leading-relaxed">
                                    "The sales script we wrote together just hit <strong>$12k in 48 hours.</strong> Honestly insane how much fluff I was using before. Direct and clear."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secondary CTA */}
                <button
                    onClick={handleAccept}
                    disabled={isProcessing}
                    className="w-full max-w-2xl bg-[#fffb00] hover:bg-[#e6e200] text-black font-display font-bold text-2xl md:text-3xl py-6 rounded-sm border-4 border-black shadow-hard hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase tracking-wider mb-20"
                >
                    {isProcessing ? 'Processing...' : 'Yes! Add it to my order!'}
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
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-display text-4xl italic">Verifying Session...</div>}>
            <UpsellContent />
        </Suspense>
    );
}
