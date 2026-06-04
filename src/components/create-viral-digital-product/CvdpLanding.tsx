'use client';
/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */

import React, { useEffect, useRef, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Lock, Shield } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export type CvdpPrices = { core: number; bump1: number; bump2: number; bump3: number; bundle: number };

const usd = (cents: number) => cents / 100;

/* Animated count-up for the revenue counter (mirrors hit10k) */
const AnimatedCounter = ({ end }: { end: number }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const [started, setStarted] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    useEffect(() => {
        if (!started) return;
        let startTime: number | null = null;
        const dur = 2000;
        const tick = (t: number) => {
            if (startTime === null) startTime = t;
            const p = Math.min((t - startTime) / dur, 1);
            setCount(Math.floor(p * end));
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [started, end]);
    return <span ref={ref}>${count.toLocaleString()}{started && count >= end ? '+' : ''}</span>;
};

/* Stripe payment step (lives inside <Elements>) */
function CvdpPaymentForm({ leadId, total }: { leadId: string; total: number }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setIsProcessing(true);
        setErrorMessage(null);
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: `${window.location.origin}/create-viral-digital-product-success?leadId=${leadId}` },
            redirect: 'if_required',
        });
        if (error) {
            setErrorMessage(error.message || 'An unexpected error occurred.');
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            await fetch('/api/create-viral-digital-product/confirm-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadId, paymentIntentId: paymentIntent.id }),
            });
            window.location.href = `/create-viral-digital-product-success?leadId=${leadId}`;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <PaymentElement options={{ layout: 'tabs' }} />
            {errorMessage && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-medium">{errorMessage}</div>
            )}
            <button type="submit" disabled={isProcessing || !stripe}
                className={`w-full mt-7 bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-lg md:text-xl py-5 rounded shadow-lg transition-all transform hover:-translate-y-1 uppercase tracking-wider ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {isProcessing ? 'Processing…' : `Complete My Order — $${usd(total)}`}
            </button>
            <div className="mt-5 flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs"><Lock size={12} className="text-[#27AE60]" /> 256-bit Secure SSL Connection</div>
                <div className="flex items-center gap-2 text-gray-500 text-xs text-center"><Shield size={12} className="text-[#27AE60]" /> Secure payments powered by Stripe.</div>
            </div>
        </form>
    );
}

/* Order-bump card (hit10k look) */
function BumpCard({ checked, disabled, onToggle, title, price, desc }: {
    checked: boolean; disabled: boolean; onToggle: () => void; title: string; price: number; desc: string;
}) {
    return (
        <div onClick={() => !disabled && onToggle()}
            className={`p-4 md:p-5 rounded-xl border-2 relative transition-all ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} ${checked && !disabled ? 'border-[#d81159] bg-[#d81159]/5 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
            <div className="flex gap-4 items-start">
                <div className="mt-0.5 flex-shrink-0">
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${checked && !disabled ? 'border-[#d81159] bg-[#d81159]' : 'border-gray-300'}`}>
                        {checked && !disabled && <span className="text-white text-sm font-bold leading-none">✓</span>}
                    </div>
                </div>
                <div className="flex-1">
                    <p className="font-montserrat font-bold text-[#333333]"><b>{title}: ${price}</b></p>
                    <p className="font-lato text-gray-600 text-sm mt-1">{desc}</p>
                </div>
            </div>
        </div>
    );
}

const HWGLogo = () => (
    <svg width="34" height="34" viewBox="0 0 100 100" aria-label="How We Grow">
        <g fill="#FFC83D">
            <circle cx="50" cy="16" r="13" /><circle cx="50" cy="84" r="13" /><circle cx="16" cy="50" r="13" /><circle cx="84" cy="50" r="13" />
            <circle cx="26" cy="26" r="12" /><circle cx="74" cy="26" r="12" /><circle cx="26" cy="74" r="12" /><circle cx="74" cy="74" r="12" />
        </g>
        <circle cx="50" cy="50" r="22" fill="#262020" />
        <circle cx="43" cy="46" r="3.4" fill="#fff" /><circle cx="57" cy="46" r="3.4" fill="#fff" />
        <path d="M40 55 Q50 65 60 55" stroke="#fff" strokeWidth="3.4" fill="none" strokeLinecap="round" />
    </svg>
);

export function CvdpLanding({ prices }: { prices: CvdpPrices }) {
    const bumpsSum = prices.bump1 + prices.bump2 + prices.bump3;
    const savings = bumpsSum - prices.bundle;

    /* countdown → June 9, 2026 15:00 UTC */
    const [cd, setCd] = useState({ d: '00', h: '00', m: '00', s: '00' });
    const [showSticky, setShowSticky] = useState(false);
    useEffect(() => {
        const target = Date.UTC(2026, 5, 9, 15, 0, 0);
        const pad = (n: number) => String(n).padStart(2, '0');
        const tick = () => {
            let diff = target - Date.now();
            if (diff < 0) diff = 0;
            const s = Math.floor(diff / 1000);
            setCd({ d: pad(Math.floor(s / 86400)), h: pad(Math.floor((s % 86400) / 3600)), m: pad(Math.floor((s % 3600) / 60)), s: pad(s % 60) });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);
    useEffect(() => {
        const onScroll = () => setShowSticky(window.scrollY > 700);
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* order bumps */
    const [b1, setB1] = useState(false);
    const [b2, setB2] = useState(false);
    const [b3, setB3] = useState(false);
    const [bundle, setBundle] = useState(false);
    const toggleIndiv = (setter: React.Dispatch<React.SetStateAction<boolean>>, cur: boolean) => {
        if (bundle) setBundle(false);
        setter(!cur);
    };
    const toggleBundle = () => {
        if (!bundle) { setB1(false); setB2(false); setB3(false); setBundle(true); }
        else setBundle(false);
    };

    /* checkout */
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [leadId, setLeadId] = useState<string | null>(null);
    const [isInitializing, setIsInitializing] = useState(false);
    const [checkoutError, setCheckoutError] = useState<string | null>(null);

    const bumpTotal = bundle ? prices.bundle : (b1 ? prices.bump1 : 0) + (b2 ? prices.bump2 : 0) + (b3 ? prices.bump3 : 0);
    const total = prices.core + bumpTotal;

    const startCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsInitializing(true);
        setCheckoutError(null);
        try {
            const res = await fetch('/api/create-viral-digital-product/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, hasBump1: b1, hasBump2: b2, hasBump3: b3, hasBundle: bundle }),
            });
            const data = await res.json();
            if (data.success) {
                if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq) {
                    (window as unknown as { fbq: (...a: unknown[]) => void }).fbq('track', 'Lead', { value: 2.0, currency: 'USD' });
                }
                setClientSecret(data.clientSecret);
                setLeadId(data.leadId);
                setStep(2);
            } else {
                setCheckoutError(data.error || 'Failed to start checkout. Please try again.');
            }
        } catch {
            setCheckoutError('An error occurred. Please try again.');
        } finally {
            setIsInitializing(false);
        }
    };

    const btn = 'inline-block bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold rounded shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wider text-center cursor-pointer';
    const goEnroll = () => document.getElementById('enroll')?.scrollIntoView({ behavior: 'smooth' });

    // Value stack — perceived values are fixed marketing figures; today's price is env-driven.
    const stackItems: [string, string, number][] = [
        ['The Live 90-Minute "One Offer" Workshop', 'Walk out with your ONE product — chosen, validated, and priced.', 300],
        ['The "Will It Sell?" AI Scorer', 'Score any idea in seconds before you waste a week building it.', 97],
        ['Viral Digital Product Finder', 'Surface exactly what your audience is already dying to buy.', 97],
        ['Ana AI Offer Flow Walkthrough', 'Generate your whole product ecosystem live on the call.', 67],
        ['The One-Page Offer Blueprint', 'You leave with the plan filled in — not a pile of homework.', 47],
        ['Lifetime Replay + All Recordings', 'Rewatch the entire workshop any time, forever.', 97],
    ];
    const stackTotal = stackItems.reduce((s, [, , v]) => s + v, 0);
    const stackSavings = stackTotal - usd(prices.core);
    const stackPct = Math.round((stackSavings / stackTotal) * 100);

    const results = [
        { name: 'Tony R.', avatar: '/testimavatar/32.webp', badge: '💎 Top contributor', time: '5 days ago', quote: '"$13,988 in 5 days with my first real launch. I followed the steps exactly. Less than 500 subscribers."', label: 'Gross revenue', amount: '$13,988.00', amtPrefix: '' },
        { name: 'David K.', avatar: '/testimavatar/jeff.webp', badge: '💎 Top contributor', time: '1 day ago', quote: '"$7,486 this week with a list of only 489. I didn\'t change my offer. I finally committed to it."', label: "You've made a sale!", amount: '$7,486.00', amtPrefix: '+ ' },
        { name: 'Judy L.', avatar: '/testimavatar/47.webp', badge: '⭐ Verified', time: '2 days ago', quote: '"$2,800 in my first week. I only have 427 subscribers. I genuinely didn\'t think it was possible."', label: 'Launch goal reached!', amount: '$2,800.00', amtPrefix: '+ ' },
        { name: 'David G.', avatar: '/imgs/testimonials/testimonial-david.png', badge: '⭐ Verified', time: '3 hours ago', quote: '"No more guessing what to sell. I finally packaged my expertise into one clear offer."', label: '', amount: '', amtPrefix: '' },
        { name: 'Tiff', avatar: '/testimavatar/46.webp', badge: '⭐ Verified', time: '1 day ago', quote: '"Best decision I\'ve made this year. My offer clarity skyrocketed."', label: '', amount: '', amtPrefix: '' },
    ];

    const curriculum: [string, React.ReactNode][] = [
        ['The Knowledge Audit.', <> How to surface the one product hiding in what you already know <i>(even if you feel like you have nothing to teach).</i></>],
        ['The Demand Match.', ' How to know exactly what your audience is desperate to buy from you, before you build it.'],
        ['The One Pick.', ' How to choose your single highest-odds offer and kill the other four, guilt-free.'],
        ['Price it right.', <> The price point that makes the right people excited to buy <i>(too high or too low both kill it).</i></>],
        ['The top 3 things', ' every offer needs before it can sell.'],
        ['Name it to sell it.', ' How to name your offer so the right people feel they have to have it.'],
        ['The credibility layer.', <> How to make your offer land as legit, <i>even if you secretly feel you're not enough of an expert.</i></>],
        ['The 24-hour validation.', ' The exact ask you send to prove demand before you build a thing.'],
    ];

    const bonuses: [string, string, string, string][] = [
        ['Bonus 1', 'The "Will It Sell?" Scorer', 'Score your idea before you build it, so you never pour weeks into something nobody wants.', '$97'],
        ['Bonus 2', 'Viral Digital Product Finder', 'Surface the in-demand product ideas your audience is already searching for.', '$97'],
        ['Bonus 3', 'Ana AI Offer Flow Walkthrough', 'Generate your full product ecosystem live on the call, then we pick the one together.', ''],
        ['Bonus 4', 'The One-Page Offer Blueprint', 'The Notion template you fill in during the workshop. Walk away with your plan, done.', '$47'],
    ];

    const faqs: [string, string][] = [
        ['Is this live or recorded?', "It's live on Tuesday, June 9. Everyone who registers also gets the full replay, so you're covered either way."],
        ['What if I have no idea what to sell?', "Perfect. That's literally step one. You'll leave knowing exactly what to build, drawn from what you already know."],
        ['Do I need a big audience?', "No. This works with under 500 subscribers. It's about picking the right offer, not the size of your list."],
        ['Do I need a finished product already?', 'No. You leave with the plan, not homework. We choose, validate, and map your one offer on the call.'],
        ["What if I'm not an expert?", "You don't have to be. I'll show you how to build something credible and valuable from what you already know."],
        ['How do I get access?', 'A welcome email with your live link and all your bonus tools lands the second you join.'],
        ["What's the investment?", 'Just $97, including the live workshop, the replay, and over $240 in bonus tools.'],
    ];

    return (
        <div className="bg-white font-lato text-[#333333]">
            {/* Announcement */}
            <div className="sticky top-0 z-50 w-full bg-[#d81159] text-white text-center py-2 md:py-3 px-4 shadow-md">
                <p className="font-lato font-bold text-[13px] md:text-[17px] tracking-wide flex items-center justify-center gap-3 flex-wrap leading-tight">
                    <span className="flex items-center gap-2"><span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE Tuesday, June 9 · Replay included</span>
                    <a href="#enroll" className="text-[#FCD34D] underline underline-offset-2">Save my seat →</a>
                </p>
            </div>

            {/* Brand */}
            <div className="flex items-center justify-center gap-3 pt-10">
                <HWGLogo />
                <span className="font-montserrat font-bold text-[#333333]">How We Grow</span>
            </div>

            {/* Hero */}
            <header className="w-full flex justify-center pt-1.5 pb-2 px-6">
                <div className="max-w-[1500px] w-full flex flex-col items-center text-center">
                    <span className="inline-block font-montserrat font-extrabold tracking-widest uppercase text-[11px] text-[#d81159] bg-[#FDE7EF] px-4 py-2 rounded-full mb-4">90-Minute Live Workshop</span>
                    <h1 className="w-full font-anton uppercase leading-[1.04] tracking-wide text-4xl sm:text-5xl lg:text-6xl text-[#333333] mb-5" style={{ WebkitTextStroke: '0.6px currentColor' }}>
                        How To Create The <span className="text-[#d81159]" style={{ WebkitTextStroke: '0.6px currentColor' }}>One<br className="hidden md:block" /> Digital Product</span> <span className="whitespace-nowrap bg-gradient-to-b from-transparent from-55% to-[#ffc300] to-55% px-1" style={{ WebkitTextStroke: '0.6px currentColor' }}>That Sells</span>
                    </h1>

                    {/* Subtitle — benefit, directly under the headline */}
                    <p className="font-display font-bold text-[#333333] text-lg md:text-2xl italic max-w-[46ch] mb-5">
                        Turn what you already know, plus what your audience actually wants, into one signature offer worth building.
                    </p>

                    {/* Countdown */}
                    <div className="flex gap-3 justify-center flex-wrap mb-6">
                        {([['Days', cd.d], ['Hrs', cd.h], ['Min', cd.m], ['Sec', cd.s]] as const).map(([l, v]) => (
                            <div key={l} className="bg-[#333333] text-white rounded-xl px-4 py-3 min-w-[68px]">
                                <div className="font-anton text-2xl md:text-3xl leading-none text-[#ffc300]">{v}</div>
                                <div className="font-lato text-[10px] uppercase tracking-widest opacity-80 mt-1">{l}</div>
                            </div>
                        ))}
                    </div>

                    {/* Hero image (+20% bigger, no drop shadow) */}
                    <img src="/imgs/cvdp/hero2.jpeg" alt="How To Create The One Digital Product That Sells — 90-minute live workshop with Ana Calin" className="w-full max-w-[1080px] h-auto rounded-2xl border border-gray-100" />

                    {/* Proof chip — right below the image, above the CTA */}
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-9">
                        <span className="text-[#F59E0B] text-xl leading-none tracking-tighter">★★★★★</span>
                        <span className="font-lato font-bold text-[#6E665B] text-sm md:text-[15px]">$1,237,300+ in digital products sold · 80,000+ subscribers</span>
                    </div>

                    {/* CTA — below the proof */}
                    <button onClick={goEnroll} className={`${btn} text-xl md:text-2xl py-5 px-10 md:px-16 mt-6`}>Show Me What To Build</button>
                    <span className="block font-lato font-bold text-[#6E665B] text-sm mt-3">Just ${usd(prices.core)} · Live + replay · Walk away with your one offer planned</span>

                    {/* Founder credibility */}
                    <p className="font-lato text-[#6E665B] font-semibold text-[15px] md:text-base max-w-[54ch] mt-8">
                        Even if you've started five things and finished none. Hosted by the founder of How We Grow (80,000+ subscribers, a top Business newsletter on Substack, Forbes-featured) who has built her business past 7 figures and personally critiqued 300+ creator offers.
                    </p>
                    <div className="inline-flex mt-7 bg-white border border-[#EEE3CE] rounded-2xl overflow-hidden shadow-sm">
                        {[['6:00 PM', 'Athens'], ['11:00 AM', 'New York'], ['8:00 AM', 'Los Angeles']].map(([t, z], i) => (
                            <div key={z} className={`px-5 md:px-6 py-3 text-center ${i < 2 ? 'border-r border-[#EEE3CE]' : ''}`}>
                                <div className="font-montserrat font-bold text-[#333333]">{t}</div>
                                <div className="font-lato text-[10px] uppercase tracking-wider text-[#6E665B] font-bold mt-0.5">{z}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Proof strip */}
            <section className="bg-[#262020] text-white py-16 md:py-24 px-6 mt-12">
                <div className="max-w-[880px] mx-auto text-center">
                    <h2 className="font-anton uppercase text-4xl md:text-5xl lg:text-6xl leading-[1.04]">
                        I've sold over <span className="text-[#ffc300]">7 figures</span><br className="hidden sm:block" /> of digital products
                    </h2>
                    <p className="font-lato text-white/65 font-semibold text-base md:text-lg max-w-[44ch] mx-auto mt-6 mb-12">
                        Here's the part nobody tells you: it almost always comes down to <span className="text-white font-bold">ONE</span> offer that finally clicks.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[700px] mx-auto">
                        {['+$97', '+$497', '+$97'].map((amt, i) => (
                            <div key={i} className="bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-3">
                                <span className="w-9 h-9 rounded-lg bg-[#635BFF] text-white font-bold text-sm flex items-center justify-center flex-shrink-0">S</span>
                                <div className="text-left leading-tight">
                                    <div className="text-white/55 text-[11px] font-bold uppercase tracking-wide">You made a sale!</div>
                                    <div className="font-anton text-[#46E08A] text-2xl leading-none mt-0.5">{amt}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hook */}
            <section className="bg-[#FFF8E6] py-16 md:py-24 px-6">
                <div className="max-w-[1040px] mx-auto text-center">
                    <p className="font-montserrat text-[#332C24] text-2xl md:text-[2.1rem] font-bold leading-[1.28]">
                        Every week, someone sends me a version of the same message: <span className="text-[#d81159]">"Ana, I know I'm supposed to be selling something. I just have no idea what."</span>
                    </p>
                    <p className="font-lato italic text-[#6E665B] text-lg md:text-xl leading-relaxed mt-6 max-w-[800px] mx-auto">
                        They have the knowledge. They have an audience that likes them. They still have nothing to sell. <span className="not-italic font-extrabold text-[#332C24]">If that's you, you're in exactly the right place.</span>
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 px-6">
                <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 text-center">
                    {[['80K', '+', 'Subscribers'], ['7', '-fig', 'Business built'], ['Forbes', '', 'Featured'], ['Top', '', 'Business Substack']].map(([n, u, l]) => (
                        <div key={l}>
                            <div className="font-anton text-[#333333] text-3xl md:text-5xl leading-none">{n}<span className="text-[#d81159]">{u}</span></div>
                            <div className="h-1 w-9 bg-[#ffc300] rounded-full mx-auto mt-3" />
                            <div className="font-lato font-bold text-[#6E665B] text-sm mt-2">{l}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Reframe */}
            <section className="py-12 px-6 text-center">
                <div className="max-w-[780px] mx-auto">
                    <h2 className="font-anton uppercase text-3xl md:text-5xl text-[#333333] mb-4">The problem was never your effort</h2>
                    <p className="font-lato text-[#332C24] text-lg md:text-2xl font-semibold max-w-[42ch] mx-auto">
                        You don't have a discipline problem. You have a <span className="text-[#d81159] font-bold">clarity problem.</span> You keep starting products because you're secretly not sure any of them is THE one. So you tweak. You stall. You start a sixth thing. <i>Fix the clarity, and the finishing takes care of itself.</i>
                    </p>
                </div>
            </section>

            {/* NO grid */}
            <section className="py-16 px-6 bg-[#FDF2F8]">
                <div className="max-w-[1000px] mx-auto text-center">
                    <h2 className="font-montserrat font-bold uppercase text-xl md:text-3xl text-[#333333] mb-12">Finding your one signature offer requires <span className="text-red-600 underline decoration-red-600/30 underline-offset-4">NO</span>:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-[900px] mx-auto text-left">
                        {[
                            'a big audience (this works under 500 subscribers)', 'a finished product (you leave with the plan)',
                            'being a guru or a "real expert"', 'fancy tech, software, or a camera',
                            'months of brainstorming or a blank page', "copying someone else's offer",
                            'guessing what people want', 'any "what if it flops" anxiety',
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3 bg-white border border-[#EEE3CE] rounded-xl px-5 py-4 shadow-sm">
                                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#FFE7DE] text-red-600 flex items-center justify-center font-bold">✕</span>
                                <span className="font-lato font-bold text-[#333333]">{item}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10"><button onClick={goEnroll} className={`${btn} text-base md:text-lg py-4 px-8 md:px-12`}>I'm Ready To Find My One Offer</button></div>
                </div>
            </section>

            {/* Steps */}
            <section className="py-16 px-6">
                <div className="max-w-[1100px] mx-auto text-center">
                    <h2 className="font-montserrat font-bold text-3xl md:text-[40px] text-black mb-12">Here's how it works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            ['1', 'Mine your one idea', "We pull the sellable product out of what you already know, your DMs, and your past work. It's almost always already in there. (I'll show you exactly how to spot it.)"],
                            ['2', 'Match it to real demand', 'We confirm your people are already asking for it and willing to pay, before you build a thing. (No more making something nobody wants.)'],
                            ['3', 'Shape and price it', 'Name it, scope it, price it. You leave with a one-page product plan you could start building tonight.'],
                        ].map(([num, title, body]) => (
                            <div key={num} className="bg-white border border-[#EEE3CE] rounded-2xl p-7 shadow-sm text-left">
                                <div className="w-12 h-12 rounded-xl bg-[#ffc300] text-[#333333] font-anton text-2xl flex items-center justify-center mb-5">{num}</div>
                                <h3 className="font-montserrat font-bold text-xl text-black mb-2">{title}</h3>
                                <p className="font-lato text-[#6E665B]">{body}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-9 max-w-[50ch] mx-auto bg-[#EBFAF6] border border-[#BEEAE0] rounded-2xl px-7 py-6 font-lato font-bold text-[#332C24]">
                        By the end of the 90 minutes you won't have a to-do list. You'll have a <b className="text-[#147a6a]">decision</b>: the one product to build, proof people want it, and the plan to make it.
                        <i className="block mt-2 text-[#6E665B] font-bold">So simple, right? I did all the heavy lifting to figure this out. All you have to do is follow the steps.</i>
                    </div>
                </div>
            </section>

            {/* Meet Ana — founder */}
            <section className="py-16 md:py-20 px-6 bg-[#E0F7FA]">
                <div className="max-w-[1000px] mx-auto grid md:grid-cols-[minmax(0,340px)_1fr] gap-10 md:gap-14 items-center">
                    <div className="mx-auto md:mx-0 w-full max-w-[300px]">
                        <img src="/testimavatar/ana.jpg" alt="Ana Calin, founder of How We Grow" className="w-full aspect-[9/16] object-cover rounded-3xl shadow-xl" />
                    </div>
                    <div className="text-center md:text-left">
                        <span className="inline-block font-montserrat font-extrabold tracking-widest uppercase text-[11px] text-[#d81159] bg-white px-4 py-2 rounded-full mb-4">Meet your host</span>
                        <h2 className="font-anton uppercase text-4xl md:text-5xl text-[#333333] mb-4">Hi, I'm Ana</h2>
                        <p className="font-lato text-[#332C24] text-lg leading-relaxed mb-6">
                            I'm <b>Ana Calin</b>, founder of <b>How We Grow</b> — a top Business newsletter on Substack with <b>80,000+ subscribers</b>, and I've been <b>featured in Forbes</b>. I built my business <b>past seven figures</b>, and along the way I've personally critiqued <b>300+ creator offers</b>. That last part matters: I've seen exactly why most products never sell — and the one shift that makes them finally click. In these 90 minutes, I'll walk you through the exact process I use, so you leave with your <i>one</i> offer instead of another half-finished idea.
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-7">
                            {['Forbes-featured', '80,000+ subscribers', 'Top Substack newsletter', '7-figure business', '300+ offers critiqued'].map((c) => (
                                <span key={c} className="bg-white border border-[#BEE3EA] text-[#333333] font-montserrat font-bold text-xs px-3 py-1.5 rounded-full">{c}</span>
                            ))}
                        </div>
                        <button onClick={goEnroll} className={`${btn} text-base md:text-lg py-4 px-8 md:px-12`}>Learn With Me Live</button>
                    </div>
                </div>
            </section>

            {/* Spotlight */}
            <section className="py-16 px-6 bg-[#FFFCF4]">
                <div className="max-w-[560px] mx-auto">
                    <div className="bg-white border-2 border-[#ffc300] rounded-3xl p-7 md:p-8 shadow-[0_18px_44px_rgba(40,32,20,.16)]">
                        <div className="flex items-center gap-3 mb-4">
                            <img src="/testimavatar/45.webp" alt="Susan M." className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                            <div>
                                <div className="font-montserrat font-bold text-[#333333] flex items-center gap-2">Susan M. <span className="text-[#1FB39E] text-xs font-bold">💎 Verified</span></div>
                                <div className="text-[#6E665B] text-xs font-semibold">1 week ago</div>
                            </div>
                        </div>
                        <p className="font-lato text-[#332C24] text-lg md:text-xl font-semibold leading-relaxed">"I had these offers just sitting there for months. I finally knew which one to commit to, launched it, and hit $8,800 in 7 days. This stuff actually works!"</p>
                        <div className="flex items-center gap-3 bg-[#F4FBF6] border border-[#CBE9D5] rounded-xl px-4 py-3 mt-5">
                            <span className="w-[26px] h-[26px] rounded-md bg-[#635BFF] text-white font-bold text-[11px] flex items-center justify-center">S</span>
                            <span className="text-sm font-bold text-[#332C24]">You've made a sale!</span>
                            <span className="ml-auto font-anton text-[#1E9E5A]">+ $8,800.00</span>
                        </div>
                        <div className="flex items-end gap-2 h-16 mt-4">
                            {[['24%', 'D1'], ['42%', 'D2'], ['58%', 'D3'], ['80%', 'D4'], ['100%', 'D5']].map(([h, d]) => (
                                <div key={d} className="flex-1 flex flex-col items-center gap-1.5">
                                    <div className="w-full bg-[#ffc300] rounded-t-md" style={{ height: h }} />
                                    <div className="text-[10px] text-[#6E665B] font-bold tracking-wide">{d}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-center mt-7"><button onClick={goEnroll} className={`${btn} text-base md:text-lg py-4 px-8 md:px-12`}>Let's Build My One Offer</button></div>
                </div>
            </section>

            {/* What's included */}
            <section className="py-16 px-6">
                <div className="max-w-[780px] mx-auto">
                    <h2 className="font-anton uppercase text-3xl md:text-5xl text-[#333333] text-center mb-8">What's included</h2>
                    <img src="/imgs/cvdp/hero1.jpeg" alt="Your viral digital product — what you'll plan and build in the workshop" className="w-full max-w-[760px] h-auto rounded-2xl shadow-xl border border-gray-100 mx-auto mb-10" />
                    <ul className="grid gap-3">
                        {curriculum.map(([b, t]) => (
                            <li key={b} className="flex gap-4 bg-white border border-[#EEE3CE] rounded-xl px-5 py-4 shadow-sm">
                                <span className="flex-shrink-0 w-[26px] h-[26px] rounded-full bg-[#1FB39E] text-white flex items-center justify-center font-bold text-sm mt-0.5">✓</span>
                                <span className="font-lato text-[#332C24]"><b className="font-extrabold">{b}</b>{t}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="font-anton text-center text-2xl md:text-3xl text-[#333333] mt-8">Everything you'd normally pay <s className="text-[#6E665B] font-normal">$300</s> for, live, for just ${usd(prices.core)}.</p>
                </div>
            </section>

            {/* Bonuses */}
            <section className="py-16 px-6 bg-[#FFF8E6]">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="font-anton uppercase text-3xl md:text-5xl text-[#333333] text-center mb-3">Plus the tools that do the heavy lifting</h2>
                    <p className="font-lato font-bold text-[#6E665B] text-center max-w-[42ch] mx-auto mb-10">You won't leave with worksheets. You'll leave with my actual AI tools, included free.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {bonuses.map(([kicker, title, desc, was]) => (
                            <div key={title} className="bg-white rounded-2xl border border-[#EEE3CE] shadow-sm p-6 relative overflow-hidden">
                                <div className="absolute top-4 right-[-34px] bg-[#d81159] text-white font-montserrat font-bold text-[10px] tracking-widest px-10 py-1 rotate-[38deg]">FREE</div>
                                <p className="font-montserrat font-bold text-[#F2AE17] uppercase tracking-widest text-[11px] mb-2">{kicker}</p>
                                <h3 className="font-montserrat font-bold text-[#333333] text-xl mb-2">{title}</h3>
                                <p className="font-lato text-[#6E665B] text-sm">{desc}</p>
                                <p className="font-montserrat font-bold mt-3">{was && <s className="text-[#6E665B] mr-2">{was}</s>}<span className="text-[#d81159]">Included free</span></p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Q&A box */}
            <section className="py-16 px-6">
                <div className="max-w-[50ch] mx-auto bg-[#262020] text-white rounded-3xl px-8 py-10 text-center">
                    <h2 className="font-anton uppercase text-2xl md:text-4xl mb-4">Ana, what do I need to create my one offer?</h2>
                    <p className="font-lato text-white/90 text-lg font-semibold">If you have an audience and the device you're reading this on, you already have everything you need. You don't need a bigger list or a more impressive resume. You need to stop guessing and pick the one thing worth building. I'll get you there in 90 minutes.</p>
                    <button onClick={goEnroll} className="inline-block mt-7 bg-[#ffc300] hover:bg-[#F2AE17] text-[#333333] font-montserrat font-bold uppercase tracking-wider rounded shadow-lg py-4 px-10 transition-all transform hover:-translate-y-1">OK Ana, Let's Do This</button>
                </div>
            </section>

            {/* Results */}
            <section className="py-16 px-6">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="font-anton uppercase text-3xl md:text-5xl text-[#333333] text-center">One clear offer. Real results.</h2>
                    <p className="font-lato font-bold text-[#6E665B] text-center max-w-[42ch] mx-auto mt-3 mb-10">Here's what students did once they knew exactly what to build, and committed to it.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {results.map((r) => (
                            <div key={r.name} className="bg-white border border-[#EEE3CE] rounded-2xl shadow-sm p-6">
                                <div className="flex items-center gap-3 mb-3.5">
                                    <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                                    <div>
                                        <div className="font-montserrat font-bold text-[#333333] flex items-center gap-2">{r.name} <span className="text-[#1FB39E] text-xs font-bold">{r.badge}</span></div>
                                        <div className="text-[#6E665B] text-xs font-semibold">{r.time}</div>
                                    </div>
                                </div>
                                <p className="font-lato text-[#332C24] font-semibold leading-relaxed">{r.quote}</p>
                                {r.amount && (
                                    <div className="flex items-center gap-3 bg-[#F4FBF6] border border-[#CBE9D5] rounded-xl px-4 py-2.5 mt-4">
                                        <span className="w-6 h-6 rounded-md bg-[#635BFF] text-white font-bold text-[10px] flex items-center justify-center">S</span>
                                        <span className="text-xs font-bold text-[#332C24]">{r.label}</span>
                                        <span className="ml-auto font-anton text-[#1E9E5A]">{r.amtPrefix}{r.amount}</span>
                                    </div>
                                )}
                                <div className="flex gap-5 mt-4 pt-3 border-t border-[#EEE3CE] text-[#6E665B] text-sm font-bold">
                                    <span>👍 Like</span><span>💬 Comment</span><span>↗ Share</span>
                                </div>
                            </div>
                        ))}
                        <div className="border-2 border-dashed border-[#ffc300] bg-[#FFFCF4] rounded-2xl flex items-center justify-center text-center text-[#6E665B] italic font-bold min-h-[130px] p-5">
                            [ Add another real student win here ]
                        </div>
                    </div>
                </div>
            </section>

            {/* Counter */}
            <section className="bg-[#262020] text-white text-center py-16 px-6">
                <div className="font-anton text-[#ffc300] leading-none text-5xl md:text-7xl"><AnimatedCounter end={1237300} /></div>
                <div className="font-lato font-bold text-white/85 mt-2">in digital products sold (and counting)</div>
            </section>

            {/* Belief */}
            <section className="py-16 px-6 text-center bg-[#E0F7FA]">
                <div className="max-w-[780px] mx-auto">
                    <h2 className="font-anton uppercase text-3xl md:text-5xl text-[#333333] mb-4">It doesn't have to be perfect</h2>
                    <p className="font-lato text-[#332C24] text-lg md:text-2xl font-semibold max-w-[44ch] mx-auto">The offers that sell are usually the simple, real, slightly imperfect ones, made by a person who actually knows their stuff. <b className="text-[#d81159]">That's you.</b> The only thing missing is knowing which one to build, and that's exactly what we fix.</p>
                </div>
            </section>

            {/* Screenshot wall — second testimonial section (kept far from the first) */}
            <section className="py-16 md:py-20 px-6 bg-white">
                <div className="max-w-[980px] mx-auto">
                    <p className="font-montserrat font-bold text-[#d81159] text-xs tracking-widest uppercase text-center mb-3">Proof it works</p>
                    <h2 className="font-anton uppercase text-3xl md:text-5xl text-[#333333] text-center mb-10">Don't just take my word for it</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {[11, 1, 12, 6, 9, 10].map((n) => (
                            <div key={n} className="rounded-2xl overflow-hidden border border-[#EEE3CE] shadow-sm">
                                <img src={`/imgs/first-100-paid-subscribers/testim/${n}.webp`} alt={`Creator testimonial ${n}`} className="w-full h-auto block" />
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10"><button onClick={goEnroll} className={`${btn} text-base md:text-lg py-4 px-8 md:px-12`}>Save My Seat</button></div>
                </div>
            </section>

            {/* Value stack — maxed-out conversion, right above the checkout */}
            <section className="bg-[#262020] text-white pt-0 pb-16 md:pb-24 px-6">
                {/* Header — wide so the title sits on 2 rows */}
                <div className="max-w-[1100px] mx-auto text-center">
                    <p className="font-montserrat font-extrabold tracking-widest uppercase text-xs text-[#ffc300] mb-4">Everything you walk away with today</p>
                    <h2 className="font-anton uppercase text-3xl md:text-5xl leading-[1.05] mb-4">One offer. One afternoon. <br className="hidden md:block" />A business that finally sells.</h2>
                    <p className="font-lato text-white/70 font-semibold max-w-[56ch] mx-auto">
                        Stop hoarding half-finished ideas. In 90 minutes you walk out with the ONE product worth building — plus every tool to name it, validate it, price it, and launch it. It is all yours the second you join:
                    </p>
                </div>

                {/* Stack card */}
                <div className="max-w-[760px] mx-auto mt-10">
                    <div className="bg-white text-[#332C24] rounded-2xl p-6 md:p-8 text-left shadow-2xl">
                        {stackItems.map(([name, desc, val]) => (
                            <div key={name} className="flex items-start gap-4 py-4 border-b border-[#EEE3CE] last:border-0">
                                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#1FB39E] text-white flex items-center justify-center font-bold text-sm mt-0.5">✓</span>
                                <div className="flex-1">
                                    <p className="font-montserrat font-bold text-[#262020] leading-snug">{name}</p>
                                    <p className="font-lato text-[#6E665B] text-sm mt-0.5">{desc}</p>
                                </div>
                                <span className="font-anton text-[#E11D2A] text-lg whitespace-nowrap line-through">${val}</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center pt-5">
                            <span className="font-montserrat font-extrabold text-[#262020] uppercase text-sm md:text-base">Total real value</span>
                            <span className="font-anton text-3xl md:text-4xl text-[#262020] bg-[#ffc300] px-2.5 py-0.5 rounded-md leading-none">${stackTotal}</span>
                        </div>
                    </div>

                    {/* Price + discount */}
                    <div className="mt-9 text-center">
                        <div className="inline-flex items-center gap-2 bg-[#E11D2A] text-white font-montserrat font-extrabold uppercase tracking-wide text-xs md:text-sm px-5 py-2 rounded-md shadow-lg">
                            🔥 Live launch price — ends Tuesday, June 9
                        </div>
                        <p className="font-lato font-bold text-white/80 mt-5">Today, all of it for just:</p>
                        <div className="flex items-baseline justify-center gap-4 mt-1">
                            <span className="font-anton text-[#ffc300] text-6xl md:text-7xl leading-none">${usd(prices.core)}</span>
                            <span className="font-anton text-[#FF6B6B] text-3xl md:text-4xl line-through">${stackTotal}</span>
                        </div>
                        <div className="inline-block bg-[#1E9E5A] text-white font-montserrat font-extrabold uppercase tracking-wide text-sm md:text-base px-6 py-2.5 rounded-full mt-5 shadow-lg">
                            You save ${stackSavings} — {stackPct}% off
                        </div>
                    </div>
                </div>

                {/* Urgency — 70% of vw so it fits on 2 rows */}
                <p className="font-lato text-white/70 text-sm md:text-[15px] w-[70vw] max-w-[1400px] mx-auto mt-9 leading-relaxed text-center">
                    ⏳ This is the <b className="text-white">live launch price</b>, and it disappears the moment the countdown hits zero on <b className="text-white">Tuesday, June 9</b>. After that the workshop returns to its full <b className="text-[#FF6B6B]">$300</b> and these bonuses come off the table for good. Every week you wait, your audience buys someone else&apos;s offer instead of yours — <b className="text-white">don&apos;t let this be the sixth thing you almost did.</b>
                </p>

                <div className="text-center">
                    <button onClick={goEnroll} className={`${btn} text-lg md:text-2xl py-5 px-10 md:px-16 mt-9`}>Yes — Lock In My Seat For ${usd(prices.core)}</button>
                    <p className="font-lato text-white/45 text-xs mt-4">Live + lifetime replay · instant access to every tool · 256-bit secure checkout</p>
                </div>
            </section>

            {/* Enroll / checkout */}
            <section id="enroll" className="py-16 px-6 bg-[#FFF8E6]">
                <div className="max-w-[600px] mx-auto bg-white rounded-3xl border border-[#EEE3CE] shadow-[0_18px_44px_rgba(40,32,20,.16)] overflow-hidden">
                    <div className="bg-[#262020] py-4 px-6 text-center relative">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ffc300] to-[#d81159]" />
                        <p className="text-white font-montserrat font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2"><Lock size={14} className="text-[#ffc300]" /> Secure 256-Bit Encrypted Checkout</p>
                    </div>
                    <div className="p-7 md:p-10 text-center">
                        <span className="inline-block bg-[#FDE7EF] text-[#d81159] font-montserrat font-bold tracking-wide px-4 py-1.5 rounded-full text-sm mb-4">● LIVE · Tuesday, June 9</span>
                        <h2 className="font-anton uppercase text-3xl md:text-4xl text-[#333333]">Claim your seat</h2>
                        <div className="flex items-baseline justify-center gap-3 mt-2 mb-1">
                            <span className="font-anton text-5xl text-[#333333]">${usd(prices.core)}</span>
                            <span className="text-xl text-[#6E665B] line-through">$300</span>
                        </div>
                        <p className="font-lato font-bold text-[#6E665B] mb-6">Live 90-minute workshop + replay + over $240 in tools, free</p>

                        {step === 1 ? (
                            <form onSubmit={startCheckout} className="text-left">
                                <ul className="grid gap-2 mb-6">
                                    {['The full "One Offer" method, live', 'The "Will It Sell?" Scorer ($97)', 'Viral Digital Product Finder ($97)', 'Offer Flow walkthrough + One-Page Blueprint ($47)', "Replay, so you're covered if you can't make it live"].map((r) => (
                                        <li key={r} className="flex items-start gap-3 font-lato font-bold text-[#332C24] text-[15px]"><span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#1FB39E] text-white flex items-center justify-center text-[11px] mt-0.5">✓</span>{r}</li>
                                    ))}
                                </ul>
                                <div className="mb-3">
                                    <label className="block font-montserrat font-bold text-[#333333] mb-2 uppercase text-xs tracking-wider">Full Name</label>
                                    <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className="w-full px-4 py-4 rounded-lg border border-gray-200 focus:border-[#ffc300] focus:ring-2 focus:ring-[#ffc300]/10 outline-none transition-all font-lato text-black" />
                                </div>
                                <div className="mb-4">
                                    <label className="block font-montserrat font-bold text-[#333333] mb-2 uppercase text-xs tracking-wider">Email Address</label>
                                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full px-4 py-4 rounded-lg border border-gray-200 focus:border-[#ffc300] focus:ring-2 focus:ring-[#ffc300]/10 outline-none transition-all font-lato text-black" />
                                </div>

                                <p className="font-montserrat font-bold text-[#333333] text-sm uppercase tracking-wider mb-3">Add to your order (one time only):</p>
                                <div className="space-y-3">
                                    <BumpCard checked={b1} disabled={bundle} onToggle={() => toggleIndiv(setB1, b1)} title="100 Genius Launch Ideas" price={usd(prices.bump1)} desc="184-page vault of pre-validated offer templates. Steal a proven angle for your one offer." />
                                    <BumpCard checked={b2} disabled={bundle} onToggle={() => toggleIndiv(setB2, b2)} title="Offer Genius AI Builder" price={usd(prices.bump2)} desc="The AI tool that turns your idea into high-converting offer copy in minutes." />
                                    <BumpCard checked={b3} disabled={bundle} onToggle={() => toggleIndiv(setB3, b3)} title="The Launch Stack" price={usd(prices.bump3)} desc="My AI email-sequence writer. Your whole launch, drafted for you." />
                                    <div onClick={toggleBundle} className={`p-4 md:p-5 rounded-xl border-2 cursor-pointer relative transition-all ${bundle ? 'border-[#27AE60] bg-[#27AE60]/5 shadow-lg ring-2 ring-[#27AE60]/20' : 'border-[#ffc300] bg-[#FFFBEF] hover:border-[#F2AE17]'}`}>
                                        <span className="inline-block bg-[#ffc300] text-[#333333] font-montserrat font-extrabold text-[12px] tracking-widest uppercase px-3 py-1 rounded-full mb-1.5">Best value · save ${usd(savings)}!</span>
                                        <div className="flex gap-4 items-start">
                                            <div className="mt-0.5 flex-shrink-0">
                                                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${bundle ? 'border-[#27AE60] bg-[#27AE60]' : 'border-gray-300'}`}>{bundle && <span className="text-white text-sm font-bold leading-none">✓</span>}</div>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-montserrat font-bold text-[#333333]"><b>The One Offer Launch Kit: all 3 for ${usd(prices.bundle)}</b></p>
                                                <p className="font-lato text-gray-600 text-sm mt-1">Everything above (normally ${usd(bumpsSum)}), bundled. Selecting this includes all three.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {checkoutError && <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-medium">{checkoutError}</div>}
                                <button type="submit" disabled={isInitializing} className={`${btn} w-full text-lg md:text-xl py-5 mt-5`}>{isInitializing ? 'Preparing…' : `Yes, I Want My One Offer — $${usd(total)}`}</button>
                                <p className="font-lora italic text-gray-400 text-xs text-center mt-3">6:00 PM Athens · 11:00 AM New York · 8:00 AM Los Angeles</p>
                            </form>
                        ) : (
                            <div className="text-left">
                                <div className="bg-gray-50 rounded-lg p-4 text-sm mb-5">
                                    <div className="flex justify-between mb-1"><span className="text-gray-600">The One Offer Workshop</span><span className="font-bold text-[#333333]">${usd(prices.core)}</span></div>
                                    {bundle ? (
                                        <div className="flex justify-between mb-1"><span className="text-gray-600">One Offer Launch Kit (all 3)</span><span className="font-bold text-[#27AE60]">${usd(prices.bundle)} <span className="text-gray-400 line-through text-xs">${usd(bumpsSum)}</span></span></div>
                                    ) : (
                                        <>
                                            {b1 && <div className="flex justify-between mb-1"><span className="text-gray-600">100 Genius Launch Ideas</span><span className="font-bold text-[#333333]">${usd(prices.bump1)}</span></div>}
                                            {b2 && <div className="flex justify-between mb-1"><span className="text-gray-600">Offer Genius AI Builder</span><span className="font-bold text-[#333333]">${usd(prices.bump2)}</span></div>}
                                            {b3 && <div className="flex justify-between mb-1"><span className="text-gray-600">The Launch Stack</span><span className="font-bold text-[#333333]">${usd(prices.bump3)}</span></div>}
                                        </>
                                    )}
                                    <div className="flex justify-between pt-2 mt-2 border-t border-gray-200"><span className="font-bold text-[#333333]">Total</span><span className="font-bold text-[#d81159]">${usd(total)}</span></div>
                                </div>
                                {clientSecret && leadId && (
                                    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe', variables: { colorPrimary: '#d81159', colorBackground: '#ffffff', colorText: '#333333', borderRadius: '8px' } } }}>
                                        <CvdpPaymentForm leadId={leadId} total={total} />
                                    </Elements>
                                )}
                                <button type="button" onClick={() => setStep(1)} className="w-full text-gray-400 text-sm hover:text-gray-600 transition-colors py-2 mt-1">← Go back to details</button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 px-6">
                <div className="max-w-[780px] mx-auto">
                    <h2 className="font-anton uppercase text-3xl md:text-5xl text-[#333333] text-center mb-10">Questions?</h2>
                    <div className="space-y-3">
                        {faqs.map(([q, a], i) => (
                            <details key={q} className="bg-white border border-[#EEE3CE] rounded-xl shadow-sm overflow-hidden group" open={i === 0}>
                                <summary className="px-6 py-5 font-montserrat font-bold text-[#333333] cursor-pointer list-none flex justify-between items-center gap-4">
                                    {q}
                                    <span className="text-[#d81159] text-2xl leading-none transition-transform group-open:rotate-45">+</span>
                                </summary>
                                <div className="px-6 pb-5 font-lato font-semibold text-[#6E665B]">{a}</div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="text-center py-10 px-6 text-[#6E665B] text-sm font-lato font-semibold">
                © 2026 How We Grow · Ana Calin · Support: <a href="mailto:anaxcalin@gmail.com" className="hover:text-[#333333]">anaxcalin@gmail.com</a>
            </footer>

            {/* Sticky bar */}
            <div className={`fixed left-0 right-0 bottom-0 z-[60] bg-[#262020] text-white py-3 px-5 flex justify-center items-center gap-5 flex-wrap shadow-[0_-8px_24px_rgba(0,0,0,.22)] transition-transform ${showSticky ? 'translate-y-0' : 'translate-y-[120%]'}`}>
                <span className="hidden md:inline font-lato font-bold text-sm"><b className="text-[#ffc300]">Live Tuesday, June 9</b> · Replay included · just ${usd(prices.core)}</span>
                <button onClick={goEnroll} className={`${btn} text-sm py-3 px-8`}>Save My Seat</button>
            </div>
        </div>
    );
}
