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
import { Star, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { PurchaseNotification } from '@/components/PurchaseNotification';

export default function GeniusLaunchIdeasPage() {
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    // Function to scroll to the checkout (desktop) or open sheet (mobile)
    const scrollToCheckout = () => {
        if (window.innerWidth >= 1024) {
            // Desktop: Scroll to sticky checkout
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Mobile: Open sheet
            setIsCheckoutOpen(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 font-sans">
            {/* Container */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-2 md:pt-4 pb-12">
                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-[70%_30%] gap-12">

                    {/* LEFT COLUMN: Sales Copy */}
                    <div className="max-w-[800px] mx-auto lg:mx-0">

                        {/* Hero Section */}
                        <section className="mb-10 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[2px] mb-4 border border-emerald-100 shadow-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                184 Pages of Pure Revenue Infrastructure
                            </div>
                            <p className="text-xs md:text-sm font-black tracking-[4px] uppercase text-rose-500 mb-3 drop-shadow-sm">
                                QUIT THE GUESSWORK. START COLLECTING PAYMENTS.
                            </p>
                            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-8xl leading-[1.05] tracking-tight mb-6 text-slate-900 italic">
                                100 <span className="text-rose-600 drop-shadow-sm">GENIUS OFFERS</span><br />
                                THAT SELL IN 2026
                            </h1>
                            <p className="text-xl md:text-3xl text-slate-700 leading-tight mb-8 max-w-[750px] mx-auto lg:mx-0 font-light tracking-tight">
                                Skip 6 months of confusion. This is the <strong className="text-slate-900 font-bold underline decoration-rose-500/30">Immediate Revenue Infrastructure</strong> you need to go from $0 to launch-ready in under 60 minutes.
                            </p>

                            {/* Social Proof */}
                            <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
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

                            {/* Product Mockup & Direct CTA */}
                            <div className="relative w-full max-w-[900px] mx-auto my-6 group flex flex-col items-center">
                                <div className="relative overflow-hidden transform transition-transform duration-500 hover:scale-[1.01] w-full">
                                    <img
                                        src="/imgs/100-genius-offers/bundle_image.png"
                                        alt="100 Genius Offers Bundle"
                                        className="w-full h-auto max-h-[500px] object-cover object-top"
                                    />
                                </div>
                                <button
                                    onClick={scrollToCheckout}
                                    className="mt-8 bg-rose-600 hover:bg-rose-700 text-white font-black px-10 py-5 rounded-2xl shadow-2xl shadow-rose-500/30 transition-all hover:-translate-y-1 text-xl flex items-center gap-3 uppercase tracking-tight group"
                                >
                                    Get Instant Access Now <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </section>

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

                        {/* NEW: Offer Stack Section (The "What's Inside") */}
                        <GeniusOfferStack onScrollToCheckout={scrollToCheckout} />

                        {/* NEW: Results Gallery (Visual Evidence) */}
                        <GeniusResultsGallery />

                        {/* NEW: FAQ Section */}
                        <GeniusFAQ onScrollToCheckout={scrollToCheckout} />

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
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider line-through decoration-rose-500">$27</div>
                        <div className="font-display font-bold text-3xl bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                            $9.97
                        </div>
                    </div>
                    <button
                        onClick={() => setIsCheckoutOpen(true)}
                        className="bg-gradient-to-r from-pink-600 to-rose-500 text-white font-bold px-8 py-3 rounded-full hover:shadow-lg hover:shadow-pink-500/25 transition-all active:scale-95"
                    >
                        Buy Now
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
