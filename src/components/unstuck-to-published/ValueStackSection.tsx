import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

const valueItems = [
    { item: "60-Minute Live Workshop (Sat, March 21)", value: "$297" },
    { item: "Full HD Replay — Watch Anytime, Forever", value: "$97" },
    { item: "The Get Unstuck Framework (Jessica's Signature System)", value: "$197" },
    { item: "Publication Positioning Worksheet (Ana's $119K/Month System)", value: "$197" },
    { item: "First Article Template — Story → Lesson → Framework", value: "$97" },
    { item: "Paywall Placement Guide — Where, What, When", value: "$147" },
    { item: "About Page Copy Template That Sells 24/7", value: "$97" },
    { item: "Working Name Framework — Stop Agonizing, Start Publishing", value: "$47" },
    { item: "20 Minutes Live Q&A — Bring Your Substack, Get Direct Feedback", value: "$197" },
    { item: "Monetization Strategy Blueprint — Price, Package & Convert", value: "$147" },
];

const totalValue = 1570; // Sum of all values

export const ValueStackSection: React.FC = () => {
    return (
        <div className="w-full flex justify-center py-20 px-6 bg-[#1a1a2e]">
            <div className="max-w-[800px] w-full flex flex-col items-center text-center">

                <div className="flex items-center gap-2 text-[#ffc300] font-montserrat font-bold text-sm uppercase tracking-widest mb-6">
                    <Clock size={16} />
                    <span>Workshop is Saturday, March 21 — Only 100 Seats</span>
                </div>

                <h2 className="font-anton text-4xl md:text-6xl text-white mb-4 uppercase tracking-wide leading-tight">
                    Everything You Get <span className="text-[#ffc300]">Today</span>
                </h2>
                <p className="font-lora italic text-white/60 text-lg mb-12">
                    One payment. Two experts. Everything included. Yours to keep forever.
                </p>

                {/* Value Stack Table */}
                <div className="w-full bg-white/5 rounded-3xl border border-white/10 overflow-hidden mb-8">
                    {valueItems.map((row, i) => (
                        <div key={i} className={`flex items-center justify-between px-6 py-4 ${i < valueItems.length - 1 ? 'border-b border-white/10' : ''}`}>
                            <span className="font-lato text-white text-left text-sm md:text-base">{row.item}</span>
                            <span className="font-anton text-[#27AE60] text-lg md:text-xl flex-shrink-0 ml-4">{row.value}</span>
                        </div>
                    ))}
                    <div className="flex items-center justify-between px-6 py-5 bg-white/10 border-t-2 border-white/20">
                        <span className="font-montserrat font-black text-white uppercase tracking-wide text-sm md:text-base">Total Value</span>
                        <span className="font-anton text-white/40 text-xl line-through">${totalValue.toLocaleString()}</span>
                    </div>
                </div>

                {/* Add-On Stack */}
                <div className="w-full mb-8">
                    <p className="font-montserrat font-bold text-[#f72585] text-sm uppercase tracking-widest mb-4">
                        Plus — available add-ons at checkout:
                    </p>
                    <div className="w-full bg-white/5 rounded-2xl border border-[#f72585]/20 overflow-hidden">
                        {[
                            { item: "Show Don't Tell — 400 AI Thumbnail Credits", value: "$47" },
                            { item: "100 Genius Launch Ideas PDF", value: "$27" },
                            { item: "Hooks That Stop the Scroll — Headline Swipe File", value: "$27" },
                        ].map((row, i) => (
                            <div key={i} className={`flex items-center justify-between px-6 py-3 ${i < 2 ? 'border-b border-white/10' : ''}`}>
                                <span className="font-lato text-white/80 text-left text-sm">{row.item}</span>
                                <span className="font-anton text-[#f72585] text-base flex-shrink-0 ml-4">{row.value}</span>
                            </div>
                        ))}
                        <div className="flex items-center justify-between px-6 py-3 bg-[#27AE60]/10 border-t border-[#27AE60]/20">
                            <span className="font-montserrat font-bold text-[#27AE60] text-sm uppercase tracking-wide">Or bundle all 3 and save $32</span>
                            <span className="font-anton text-[#27AE60] text-lg">$69 <span className="text-white/30 line-through text-sm">$101</span></span>
                        </div>
                    </div>
                </div>

                {/* Social Proof Insert */}
                <div className="w-full max-w-[600px] flex justify-center mb-10">
                    <img src="/imgs/first-100-paid-subscribers/testim/18.webp" alt="Testimonial 18" className="w-full rounded-2xl shadow-lg border border-white/10 object-contain mx-auto" />
                </div>

                {/* Price Reveal */}
                <p className="font-montserrat font-bold text-white/60 uppercase tracking-widest text-sm mb-2">Your investment today</p>
                <div className="flex items-baseline gap-4 mb-2">
                    <span className="font-anton text-white/30 text-3xl md:text-4xl line-through">$1,570</span>
                    <span className="font-anton text-[#27AE60] text-8xl md:text-9xl leading-none">$97</span>
                </div>
                <p className="font-lora italic text-white/50 text-base mb-4">
                    That's over 93% off the total value. One payment. Everything included.
                </p>
                <p className="font-montserrat font-bold text-[#ffc300] text-lg mb-10">
                    You'd be crazy to pass this up.
                </p>

                <button
                    onClick={() => document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group w-full md:w-auto bg-[#ffc300] hover:bg-[#e6b000] text-[#1a1a1a] font-montserrat font-bold text-xl md:text-2xl py-6 px-12 rounded-lg shadow-[0_4px_30px_rgba(255,195,0,0.35)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase flex items-center justify-center gap-3"
                >
                    <span>I WANT ALL OF THIS — $97</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </button>

                <p className="font-lato text-white/40 text-sm mt-6">
                    Sat, March 21 @ 10:00 AM EST · Replay + all resources included · Secure checkout via Stripe
                </p>

                {/* Force-reject */}
                <button
                    onClick={() => { }}
                    className="mt-4 text-white/20 text-xs font-lato hover:text-white/40 transition-colors"
                >
                    No thanks — I'll keep overthinking on my own.
                </button>

            </div>
        </div>
    );
};
