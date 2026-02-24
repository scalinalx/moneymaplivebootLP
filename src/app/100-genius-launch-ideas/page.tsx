'use client';

import React, { useState } from 'react';
import { CheckoutCard } from './components/CheckoutCard';
import { MobileCheckoutSheet } from './components/MobileCheckoutSheet';
import { GeniusBridgeSection } from './components/GeniusBridgeSection';
import { GeniusProcessSection } from './components/GeniusProcessSection';
import { GeniusOfferStack } from './components/GeniusOfferStack';
import { GeniusTestimonials } from './components/GeniusTestimonials';
import { GeniusResultsGallery } from './components/GeniusResultsGallery';
import { GeniusFAQ } from './components/GeniusFAQ';
import { GeniusOutcomesSection } from './components/GeniusOutcomesSection';
import { GeniusSegmentSection } from './components/GeniusSegmentSection';
import { GeniusWhatIncluded } from './components/GeniusWhatIncluded';
import { GeniusWorkForMe } from './components/GeniusWorkForMe';
import { GeniusValueStack } from './components/GeniusValueStack';
import { Star, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { PurchaseNotification } from '@/components/PurchaseNotification';
import { GENIUS_IDEAS_PRICE } from '@/lib/constants';

export default function GeniusLaunchIdeasPage() {
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    // Function to scroll to the checkout (desktop) or open sheet (mobile)
    const scrollToCheckout = () => {
        if (window.innerWidth >= 1024) {
            // Desktop: Scroll to the sticky checkout card and focus the name input
            const checkoutEl = document.getElementById('checkout-card');
            if (checkoutEl) {
                checkoutEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            // Also scroll the left column to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Dispatch a custom event that CheckoutForm listens for
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('focus-checkout'));
            }, 600);
        } else {
            // Mobile: Open sheet
            setIsCheckoutOpen(true);
            // Focus first input after sheet opens
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('focus-checkout'));
            }, 400);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 font-sans">
            {/* Container */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-2 md:pt-4 pb-12">
                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-[70%_30%] gap-12">

                    {/* LEFT COLUMN: Sales Copy */}
                    <div className="max-w-[1000px] mx-auto lg:mx-0">

                        {/* Hero Section */}
                        <section className="mb-10 text-center">
                            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[2px] mb-6 border-b-2 border-amber-500 shadow-md">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900"></span>
                                </span>
                                Pure PROVEN Revenue Infrastructure
                            </div>

                            <div className="font-sans font-black text-slate-900 text-3xl md:text-5xl uppercase tracking-tighter mb-2">
                                GET THE OFFER VAULT
                            </div>
                            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-4 text-slate-900 italic">
                                Stop Starting From Scratch: <span className="text-rose-500 drop-shadow-sm">100 Pre-Validated Offers</span><br />
                                That Are Clearing Stripe Accounts Right Now
                            </h1>

                            <div className="text-slate-400 italic text-sm md:text-base mb-6 w-full text-center px-4">
                                *limited time offer*
                            </div>

                            <div className="mb-8 max-w-[750px] bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-rose-100 shadow-sm mx-auto">
                                <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed text-center">
                                    Every single offer in this repository has been <span className="text-rose-600 font-bold underline decoration-rose-500/20">pre-validated</span> based on my direct work with <span className="text-slate-900 font-black">600+ creators like you across many different niches</span>. No theory. No guesswork. Only what’s clearing Stripe accounts right now.
                                </p>
                            </div>

                            {/* Product Mockup */}
                            <div className="relative w-full max-w-[900px] mx-auto lg:mx-0 mb-10 overflow-hidden rounded-2xl transform transition-transform duration-500 hover:scale-[1.01]">
                                <img
                                    src="/imgs/100-genius-offers/bundle_image.webp"
                                    alt="100 Genius Offers Bundle"
                                    className="w-full h-auto block"
                                />
                            </div>

                            {/* Primary CTA */}
                            <div className="flex flex-col items-center gap-6">
                                <button
                                    onClick={scrollToCheckout}
                                    className="bg-rose-600 hover:bg-rose-700 text-white font-black px-12 py-6 rounded-2xl shadow-2xl shadow-rose-500/30 transition-all hover:-translate-y-1 text-xl uppercase tracking-tight"
                                >
                                    Unlock 100 Genius Offers That Sell!
                                </button>

                                <p className="text-lg md:text-2xl text-slate-500 leading-tight max-w-[750px] font-light tracking-tight italic text-center">
                                    Skip 6 months of confusion. This is the <strong className="text-slate-900 font-bold underline decoration-rose-500/30">Immediate Revenue Infrastructure</strong> you need to go from $0 to launch-ready in under 60 minutes.
                                </p>
                            </div>

                            {/* Social Proof */}
                            <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4 mt-12">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full rounded-full object-cover" />
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                        +500
                                    </div>
                                </div>
                                <div className="flex flex-col items-center md:items-start">
                                    <div className="flex gap-0.5 text-amber-400 mb-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star key={i} fill="currentColor" size={16} />
                                        ))}
                                    </div>
                                    <span className="text-sm text-slate-500 font-medium">Trusted by 500+ creators</span>
                                </div>
                            </div>
                        </section>

                        <GeniusOutcomesSection onScrollToCheckout={scrollToCheckout} />

                        <div className="mt-8 mb-20 space-y-12">
                            <GeniusSegmentSection
                                outcome="a quick cash injection"
                                description="If you need to clear an extra $1,000 - $3,000 this week to fund a project or pay a bill, focus on these:"
                                ideas={["The 4-Day Beta Launch", "The $500 'Save My Seat' Workshop", "The Flash-Sale Cash Machine"]}
                                variant="rose"
                                onScrollToCheckout={scrollToCheckout}
                            />

                            <GeniusSegmentSection
                                outcome="a 5-figure launch"
                                description="If you have an audience ready for a major payday and want to crack the $10k+ mark with one offer, focus on these:"
                                ideas={["The High-Conversion 'Vault' Launch", "The 7-Day Profit Sprint", "The Milestone Celebration Offer"]}
                                variant="emerald"
                                onScrollToCheckout={scrollToCheckout}
                            />

                            <GeniusSegmentSection
                                outcome="long-term freedom"
                                description="If you're ready to build a real business that pays you while you sleep, focus on these:"
                                ideas={["The Monthly Membership Vault", "The Passive Digital Asset", "The Evergreen Sales Machine"]}
                                variant="rose"
                                onScrollToCheckout={scrollToCheckout}
                            />

                            <GeniusSegmentSection
                                outcome="elite high-ticket pricing"
                                description="If you're ready to stop selling $97 courses and start commanding $5k+ for your direct help, focus on these:"
                                ideas={["The $5k Signature Service", "The Elite Mastermind Offer", "The Done-For-You Accelerator"]}
                                variant="emerald"
                                onScrollToCheckout={scrollToCheckout}
                            />
                        </div>

                        {/* NEW: What's Included (Table of Contents) */}
                        <GeniusWhatIncluded onScrollToCheckout={scrollToCheckout} />

                        {/* NEW: Will this work for me? (Niche Social Proof) */}
                        <GeniusWorkForMe onScrollToCheckout={scrollToCheckout} />

                        {/* NEW: Bridge Section (The "Problem" Shift) */}
                        <GeniusBridgeSection onScrollToCheckout={scrollToCheckout} />

                        {/* NEW: Social Proof Testimonials */}
                        <GeniusTestimonials />

                        {/* NEW: Process Section (The "Mechanism") */}
                        <GeniusProcessSection />


                        {/* Who This Is For Section (Kept from original but styled) */}
                        <section className="mb-20 pt-20 border-t border-rose-100">
                            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-12 text-slate-900 text-center">
                                Who Needs This List?
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* For You */}
                                <div className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100">
                                    <h3 className="font-display font-bold text-2xl mb-6 text-emerald-900 flex items-center gap-2">
                                        <CheckCircle2 className="text-emerald-500" size={24} />
                                        YOU, IF:
                                    </h3>
                                    <ul className="space-y-4">
                                        {[
                                            'You have an audience but NO offer yet',
                                            'You\'re stuck in "idea paralysis"',
                                            'You want to launch something THIS MONTH',
                                            'You need proven receipts, not theories'
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-slate-700">
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2.5 flex-shrink-0"></div>
                                                <span className="text-lg">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Not For You */}
                                <div className="bg-rose-50/50 p-8 rounded-3xl border border-rose-100">
                                    <h3 className="font-display font-bold text-2xl mb-6 text-rose-900 flex items-center gap-2">
                                        <XCircle className="text-rose-500" size={24} />
                                        NOT YOU, IF:
                                    </h3>
                                    <ul className="space-y-4">
                                        {[
                                            'You already have a winning offer',
                                            'You\'re looking for a 12-week course',
                                            'You have zero interest in monetization',
                                            'You want someone to do the work FOR you'
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-slate-700">
                                                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2.5 flex-shrink-0"></div>
                                                <span className="text-lg">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* NEW: Value Stack — $729 → $27 */}
                        <GeniusValueStack onScrollToCheckout={scrollToCheckout} />

                        {/* NEW: Offer Stack Section (The "What's Inside") */}
                        <GeniusOfferStack onScrollToCheckout={scrollToCheckout} />


                        {/* NEW: Results Gallery (Visual Evidence) */}
                        <GeniusResultsGallery />

                        {/* NEW: FAQ Section */}
                        <GeniusFAQ onScrollToCheckout={scrollToCheckout} />

                        {/* COMPLIANT FOOTER */}
                        <footer className="mt-20 py-12 border-t border-slate-200">
                            <div className="max-w-[800px] mx-auto text-center px-6">
                                <p className="text-slate-900 font-black tracking-tighter text-sm mb-6 uppercase">
                                    © ANA CALIN, HOW WE GROW 2026, All Rights Reserved.
                                </p>
                                <div className="space-y-4 text-slate-400 text-[10px] md:text-xs leading-relaxed font-medium">
                                    <p>
                                        This site is not a part of the Facebook website or Facebook Inc. Additionally, This site is NOT endorsed by Facebook in any way.
                                    </p>
                                    <p>
                                        FACEBOOK is a trademark of FACEBOOK, Inc.
                                    </p>
                                </div>
                            </div>
                        </footer>

                    </div>

                    {/* RIGHT COLUMN: Sticky Checkout (Desktop Only) */}
                    <div className="hidden lg:block relative z-10">
                        <CheckoutCard />
                    </div>

                </div>
            </div>

            {/* Mobile Sticky Bar */}
            <div className="lg:hidden fixed bottom-4 left-4 right-4 z-[999]">
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider line-through decoration-rose-500">$97</div>
                        <div className="font-display font-bold text-3xl bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                            ${(GENIUS_IDEAS_PRICE / 100).toFixed(2)}
                        </div>
                    </div>
                    <button
                        onClick={() => setIsCheckoutOpen(true)}
                        className="bg-gradient-to-r from-pink-600 to-rose-500 text-white font-bold px-8 py-3 rounded-full hover:shadow-lg hover:shadow-pink-500/25 transition-all active:scale-95"
                    >
                        Unlock The 100 Genius Offers!
                    </button>
                </div>
            </div>

            {/* Mobile Checkout Sheet */}
            <div className="lg:hidden">
                <MobileCheckoutSheet
                    isOpen={isCheckoutOpen}
                    onClose={() => setIsCheckoutOpen(false)}
                />
            </div>
            <PurchaseNotification />
        </div>
    );
}
