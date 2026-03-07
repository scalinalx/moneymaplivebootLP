import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { FIRST100_PRICE } from '@/lib/stripe';

const included = [
    { item: "60-Minute Live Workshop (March 12th)", value: "$297" },
    { item: "Full Replay — Watch Forever", value: "$97" },
    { item: "The Bestseller Blueprint", value: "$97" },
    { item: "The 7-Day Upgrade Email Sequence", value: "$197" },
    { item: "The 30-Day Bestseller Roadmap", value: "$197" },
    { item: "Paid Subscriber Welcome Sequence", value: "$97" },
    { item: "Objection-Crushing Copy Vault", value: "$97" },
    { item: "Tiny List, Big Revenue Playbook", value: "$97" },
    { item: "Viral Substack Notes Generator", value: "$197" },
];

export const FinalCTASection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-[#1a1a2e]">
            <div className="max-w-[800px] w-full flex flex-col items-center text-center">

                <div className="flex items-center gap-2 text-[#ffc300] font-montserrat font-bold text-sm uppercase tracking-widest mb-6">
                    <Clock size={16} />
                    <span>Workshop is on March 12th — Seats Are Limited</span>
                </div>

                <h2 className="font-anton text-4xl md:text-6xl text-white mb-4 uppercase tracking-wide leading-tight">
                    Everything You Get <span className="text-[#ffc300]">Today</span>
                </h2>
                <p className="font-lora italic text-white/60 text-lg mb-12">
                    One payment. Everything included. Yours to keep.
                </p>

                {/* Second Hero/Mockup Image */}
                <div className="w-full max-w-[1100px] mb-12 rounded-2xl overflow-hidden">
                    <img
                        src="/imgs/first-100-paid-subscribers/hero2_cropped.webp"
                        alt="Everything You Get Today"
                        className="w-full h-auto"
                    />
                </div>

                {/* Value Stack */}
                <div className="w-full bg-white/5 rounded-3xl border border-white/10 overflow-hidden mb-8">
                    {included.map((row, i) => (
                        <div key={i} className={`flex items-center justify-between px-6 py-4 ${i < included.length - 1 ? 'border-b border-white/10' : ''}`}>
                            <span className="font-lato text-white text-left text-sm md:text-base">{row.item}</span>
                            <span className="font-anton text-[#27AE60] text-lg md:text-xl flex-shrink-0 ml-4">{row.value}</span>
                        </div>
                    ))}
                    <div className="flex items-center justify-between px-6 py-5 bg-white/10 border-t-2 border-white/20">
                        <span className="font-montserrat font-black text-white uppercase tracking-wide text-sm md:text-base">Total Value</span>
                        <div className="flex items-center gap-3">
                            <span className="font-anton text-white/40 text-xl line-through">$1,373</span>
                        </div>
                    </div>
                </div>

                {/* Social Proof Insert */}
                <div className="w-full max-w-[600px] flex justify-center mb-10">
                    <img src="/imgs/first-100-paid-subscribers/testim/18.webp" alt="Testimonial 18" className="w-full rounded-2xl shadow-lg border border-white/10 object-contain mx-auto" />
                </div>

                {/* Price reveal */}
                <p className="font-montserrat font-bold text-white/60 uppercase tracking-widest text-sm mb-2">Your investment today</p>
                <div className="font-anton text-[#27AE60] text-8xl md:text-9xl mb-2 leading-none">
                    ${FIRST100_PRICE / 100}
                </div>
                <p className="font-lora italic text-white/50 text-base mb-10">
                    One-time. No subscriptions. No upsells. Just everything you need to hit 100 paid subscribers and Bestseller status.
                </p>

                <button
                    onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group w-full md:w-auto bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-xl md:text-2xl py-6 px-12 rounded-[5px] shadow-2xl shadow-[#d81159]/40 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase flex items-center justify-center gap-3"
                >
                    <span>I WANT TO HIT BESTSELLER STATUS!</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </button>

                <p className="font-lato text-white/40 text-sm mt-6">
                    Live on March 12th · Replay + all bonuses sent immediately · Secure checkout via Stripe
                </p>

                {/* Force-reject */}
                <button
                    onClick={() => { }}
                    className="mt-4 text-white/20 text-xs font-lato hover:text-white/40 transition-colors"
                >
                    No thanks — I'll figure out paid subscribers on my own.
                </button>

            </div>
        </div>
    );
};
