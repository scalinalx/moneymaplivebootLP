'use client';

import React, { useState, useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import {
    ArrowRight, Shield, Lock, AlertCircle, CheckCircle, Sparkles, FileText, Zap,
    Package, X, ChevronDown, Image, PenTool, Mail, Target, Clock, Users,
    TrendingUp, Eye, MousePointerClick, DollarSign, Star, Award, Flame
} from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const BUNDLE_DISPLAY_PRICE = 107;

// ─── CHECKOUT FORM (Step 2) ───
interface CheckoutFormProps {
    clientSecret: string;
    leadId: string;
}

const CheckoutFormContent: React.FC<CheckoutFormProps> = ({ clientSecret, leadId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) return;
        setIsProcessing(true);
        setErrorMessage(null);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/creator-bundle-success?leadId=${leadId}`,
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message || 'An unexpected error occurred.');
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            const confirmRes = await fetch('/api/creator-bundle/confirm-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadId, paymentIntentId: paymentIntent.id }),
            });
            const confirmData = await confirmRes.json();
            const sdtParam = confirmData.sdtTokenId ? `&sdtToken=${confirmData.sdtTokenId}` : '';
            window.location.href = `/creator-bundle-success?leadId=${leadId}${sdtParam}`;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <PaymentElement options={{ layout: 'tabs' }} />
            {errorMessage && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm font-medium">
                    <AlertCircle size={16} />{errorMessage}
                </div>
            )}
            <button
                disabled={isProcessing || !stripe}
                className={`w-full mt-8 bg-[#27AE60] hover:bg-[#219653] text-white font-montserrat font-black text-xl py-5 rounded-lg shadow-[0_4px_20px_rgba(39,174,96,0.35)] transition-all transform hover:-translate-y-1 uppercase tracking-wider ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {isProcessing ? 'Processing...' : `GET INSTANT ACCESS — $${BUNDLE_DISPLAY_PRICE}`}
            </button>
            <div className="mt-4 flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Lock size={12} className="text-[#27AE60]" /><span>256-bit Secure SSL Connection</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs text-center">
                    <Shield size={12} className="text-[#27AE60]" /><span>Secure payments powered by Stripe.</span>
                </div>
            </div>
        </form>
    );
};

// ─── ANIMATED COUNTER ───
const AnimatedCounter: React.FC<{ target: number; suffix?: string; prefix?: string }> = ({ target, suffix = '', prefix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                let start = 0;
                const duration = 2000;
                const startTime = performance.now();
                const animate = (now: number) => {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    setCount(Math.floor(eased * target));
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
                obs.disconnect();
            }
        }, { threshold: 0.3 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [target]);
    return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// ─── MAIN PAGE ───
export default function CreatorBundlePage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [leadId, setLeadId] = useState<string | null>(null);
    const [isInitializing, setIsInitializing] = useState(false);
    const [step, setStep] = useState(1);

    const scrollToCheckout = () => {
        document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const startCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsInitializing(true);
        try {
            const response = await fetch('/api/creator-bundle/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name }),
            });
            const data = await response.json();
            if (data.success) {
                if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('track', 'Lead', { value: 2.00, currency: 'USD' });
                }
                setClientSecret(data.clientSecret);
                setLeadId(data.leadId);
                setStep(2);
            } else {
                alert(data.error || 'Failed to start checkout');
            }
        } catch {
            alert('An error occurred. Please try again.');
        } finally {
            setIsInitializing(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* ═══════════ URGENCY BAR ═══════════ */}
            <div className="w-full bg-[#1a1a1a] py-2 px-4 text-center sticky top-0 z-50 border-b border-[#27AE60]/30">
                <p className="text-white font-montserrat font-bold text-xs md:text-sm tracking-wider">
                    <span className="text-[#27AE60] animate-pulse inline-block mr-1">&#9679;</span>
                    LAUNCH WEEK SPECIAL — <span className="text-[#ffc300]">90% OFF</span> ENDS WHEN THIS PAGE COMES DOWN
                </p>
            </div>

            <main className="flex-grow">
                {/* ═══════════ HERO ═══════════ */}
                <section className="w-full bg-[#1a1a1a] relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#27AE60] opacity-[0.06] rounded-full" />
                    <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-[#ffc300] opacity-[0.04] rounded-full" />

                    <div className="max-w-[1100px] mx-auto px-6 pt-12 pb-16 md:pt-20 md:pb-24 relative z-10 text-center">
                        <div className="mb-6">
                            <span className="inline-block bg-[#27AE60] text-white text-[11px] font-black tracking-[2px] uppercase px-5 py-2 rounded-full">
                                4 Tools. One Price. Zero Excuses.
                            </span>
                        </div>

                        <h1 className="font-anton leading-[1.05] uppercase mb-6 tracking-wide">
                            <span className="block text-white text-3xl sm:text-4xl md:text-5xl lg:text-[60px]">Stop Buying Tools One-By-One.</span>
                            <span className="block text-[#ffc300] text-3xl sm:text-4xl md:text-5xl lg:text-[60px] mt-2">Get The Entire Arsenal For $97.</span>
                        </h1>

                        <p className="font-montserrat font-bold text-white/80 text-base md:text-xl max-w-3xl mx-auto mb-4 leading-relaxed">
                            AI-powered thumbnails. 100 battle-tested launch ideas. Scroll-stopping headlines. A launch email sequence writer.
                            <span className="text-[#ffc300]"> Everything a Substack creator needs to go from zero to revenue</span> — in one kit.
                        </p>

                        <p className="font-lora italic text-gray-500 text-sm mb-8">Used by 10,000+ creators. Trusted by Substack Bestsellers.</p>

                        {/* Hero image */}
                        <div className="w-full max-w-[900px] mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            <img
                                src="/imgs/unstuck-to-published/creatorbundle-hero2.jpeg"
                                alt="The Creator Launch Kit — 4 Essential Tools"
                                className="w-full h-auto"
                            />
                        </div>

                        <button
                            onClick={scrollToCheckout}
                            className="group bg-[#27AE60] hover:bg-[#219653] text-white font-montserrat font-black text-xl md:text-2xl py-5 px-10 md:px-16 rounded-lg shadow-[0_4px_30px_rgba(39,174,96,0.4)] hover:shadow-[0_8px_40px_rgba(39,174,96,0.6)] transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wider flex items-center gap-3 mx-auto"
                        >
                            <span>YES — I WANT THE FULL KIT FOR $97</span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                        </button>
                        <p className="text-[#27AE60] font-semibold mt-3 text-sm tracking-wide">Instant access. All 4 tools. One payment. No subscription.</p>

                        {/* Trust badges */}
                        <div className="flex flex-wrap gap-6 justify-center mt-10">
                            {[
                                { icon: Users, text: "10,000+ Creators" },
                                { icon: Star, text: "Substack Bestseller" },
                                { icon: Shield, text: "Instant Delivery" },
                                { icon: Zap, text: "AI-Powered" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-gray-400 text-xs md:text-sm font-semibold">
                                    <div className="w-7 h-7 bg-[#27AE60]/15 rounded-full flex items-center justify-center">
                                        <item.icon size={14} className="text-[#27AE60]" />
                                    </div>
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════ PROBLEM / AGITATION ═══════════ */}
                <section className="w-full bg-white py-16 md:py-24 px-6">
                    <div className="max-w-[800px] mx-auto text-center">
                        <p className="font-lora italic text-[#f72585] text-sm uppercase tracking-widest mb-4">Here's what's really going on...</p>
                        <h2 className="font-anton text-3xl md:text-5xl text-[#1a1a1a] uppercase mb-8 leading-tight">
                            You Don't Have a <span className="text-[#f72585]">Talent Problem.</span><br />
                            You Have a <span className="text-[#f72585]">Tools Problem.</span>
                        </h2>

                        <div className="text-left space-y-5 font-lato text-gray-700 text-lg leading-relaxed">
                            <p>You've got ideas. You've got things to say. You might even have a small audience already.</p>
                            <p>But every time you sit down to actually <em>launch</em> something...</p>

                            <div className="bg-red-50 border-l-4 border-red-400 p-5 rounded-r-xl my-6">
                                <ul className="space-y-3 text-[#333]">
                                    {[
                                        "You spend 3 hours making a thumbnail that still looks amateur",
                                        "You stare at a blank page trying to figure out what to sell",
                                        "Your headlines get scrolled past like they don't exist",
                                        "Your launch emails sound like a robot wrote them (or worse — you didn't write any)",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <X size={18} className="text-red-500 flex-shrink-0 mt-1" />
                                            <span className="font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <p>Meanwhile, the creators blowing up around you? They're not more talented. They're not working harder.</p>
                            <p className="font-bold text-[#1a1a1a] text-xl">They just have better tools.</p>
                            <p>And now — for less than the cost of a single freelancer's invoice — <span className="font-bold text-[#27AE60]">you can have all four of them.</span></p>
                        </div>
                    </div>
                </section>

                {/* ═══════════ THE 4 TOOLS (Product Showcase) ═══════════ */}
                <section className="w-full bg-[#fafafa] py-16 md:py-24 px-6">
                    <div className="max-w-[1100px] mx-auto">
                        <div className="text-center mb-16">
                            <p className="font-montserrat font-bold text-[#27AE60] text-xs uppercase tracking-[3px] mb-3">What's Inside The Kit</p>
                            <h2 className="font-anton text-3xl md:text-5xl text-[#1a1a1a] uppercase leading-tight">
                                Four Weapons. <span className="text-[#27AE60]">One Kit.</span><br />
                                <span className="text-2xl md:text-3xl text-gray-500">Every tool you need from idea to income.</span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Tool 1: Show Don't Tell */}
                            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                <div className="bg-[#f72585] py-3 px-6 flex items-center gap-2">
                                    <Image size={18} className="text-white" />
                                    <span className="text-white font-montserrat font-bold text-sm uppercase tracking-wider">Tool 1</span>
                                    <span className="ml-auto text-white/70 text-sm font-bold">Worth $247</span>
                                </div>
                                <div className="p-6 md:p-8">
                                    <img src="/imgs/unstuck-to-published/showdonttell-hero.jpeg" alt="Show Don't Tell" className="w-full h-40 object-cover rounded-xl mb-5 border border-gray-100" />
                                    <h3 className="font-anton text-2xl text-[#1a1a1a] uppercase mb-3">Show Don't Tell</h3>
                                    <p className="font-lora italic text-[#f72585] text-sm mb-3">Viral Thumbnail Generator — AI-Powered</p>
                                    <p className="font-lato text-gray-600 text-base mb-4">
                                        Describe your post. Get scroll-stopping thumbnails in seconds. 19 style presets. Multiple aspect ratios. Powered by custom-trained AI that understands what makes people <em>click</em>.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {['400 AI Credits', '~200 Generations', '19 Style Presets', '1 Year Access'].map((tag, i) => (
                                            <span key={i} className="text-[10px] bg-[#f72585]/10 text-[#f72585] px-2.5 py-1 rounded-full font-bold">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Tool 2: 100 Genius Launch Ideas */}
                            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                <div className="bg-[#ffc300] py-3 px-6 flex items-center gap-2">
                                    <FileText size={18} className="text-[#1a1a1a]" />
                                    <span className="text-[#1a1a1a] font-montserrat font-bold text-sm uppercase tracking-wider">Tool 2</span>
                                    <span className="ml-auto text-[#1a1a1a]/60 text-sm font-bold">Worth $97</span>
                                </div>
                                <div className="p-6 md:p-8">
                                    <img src="/imgs/100-genius-offers/bundle_image.webp" alt="100 Genius Launch Ideas" className="w-full h-40 object-cover rounded-xl mb-5 border border-gray-100" />
                                    <h3 className="font-anton text-2xl text-[#1a1a1a] uppercase mb-3">100 Genius Launch Ideas</h3>
                                    <p className="font-lora italic text-[#ffc300] text-sm mb-3">The Offer Vault — 184-Page Revenue Blueprint</p>
                                    <p className="font-lato text-gray-600 text-base mb-4">
                                        100 pre-validated, revenue-generating offer ideas sorted by difficulty and income potential. Stop guessing what to sell. Pick an idea, price it, launch it this week.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {['100 Proven Ideas', 'Revenue Sorted', '184 Pages', 'Instant Download'].map((tag, i) => (
                                            <span key={i} className="text-[10px] bg-[#ffc300]/15 text-[#1a1a1a] px-2.5 py-1 rounded-full font-bold">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Tool 3: Hooks That Stop the Scroll */}
                            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                <div className="bg-[#1a1a1a] py-3 px-6 flex items-center gap-2">
                                    <MousePointerClick size={18} className="text-[#ffc300]" />
                                    <span className="text-white font-montserrat font-bold text-sm uppercase tracking-wider">Tool 3</span>
                                    <span className="ml-auto text-white/50 text-sm font-bold">Worth $97</span>
                                </div>
                                <div className="p-6 md:p-8">
                                    <img src="/imgs/unstuck-to-published/hooks-hero.jpeg" alt="Hooks That Stop the Scroll" className="w-full h-40 object-cover rounded-xl mb-5 border border-gray-100" />
                                    <h3 className="font-anton text-2xl text-[#1a1a1a] uppercase mb-3">Hooks That Stop the Scroll</h3>
                                    <p className="font-lora italic text-gray-500 text-sm mb-3">Headline Frameworks & Opening Loops Swipe File</p>
                                    <p className="font-lato text-gray-600 text-base mb-4">
                                        The exact headline structures and opening lines used by the fastest-growing Substacks. Copy them. Adapt them. Watch your open rates spike.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Headline Swipe File', 'Opening Loops', 'Proven Frameworks', 'Lifetime Updates'].map((tag, i) => (
                                            <span key={i} className="text-[10px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-bold">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Tool 4: Launch Stack */}
                            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                <div className="bg-gradient-to-r from-[#f72585] to-[#7209b7] py-3 px-6 flex items-center gap-2">
                                    <Mail size={18} className="text-white" />
                                    <span className="text-white font-montserrat font-bold text-sm uppercase tracking-wider">Tool 4</span>
                                    <span className="ml-auto text-white/70 text-sm font-bold">Worth $497</span>
                                </div>
                                <div className="p-6 md:p-8">
                                    <div className="w-full h-40 bg-gradient-to-br from-[#1a1a1a] to-[#333] rounded-xl mb-5 flex items-center justify-center border border-gray-100">
                                        <div className="text-center">
                                            <Mail size={48} className="text-[#ffc300] mx-auto mb-2" />
                                            <p className="font-anton text-white text-lg uppercase">LaunchStack</p>
                                            <p className="text-gray-400 text-xs">AI Email Engine</p>
                                        </div>
                                    </div>
                                    <h3 className="font-anton text-2xl text-[#1a1a1a] uppercase mb-3">LaunchStack</h3>
                                    <p className="font-lora italic text-[#7209b7] text-sm mb-3">AI Launch Email Sequence Generator</p>
                                    <p className="font-lato text-gray-600 text-base mb-4">
                                        Generate complete, psychology-backed launch email sequences in seconds. Tell it your offer, your audience, your tone — get a full sequence ready to send. No more staring at blank drafts.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {['AI-Powered', 'Full Sequences', 'Psychology-Backed', 'Unlimited Use'].map((tag, i) => (
                                            <span key={i} className="text-[10px] bg-purple-50 text-[#7209b7] px-2.5 py-1 rounded-full font-bold">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════ BRIDGE: "Why This Bundle Exists" ═══════════ */}
                <section className="w-full bg-[#1a1a1a] py-16 md:py-20 px-6">
                    <div className="max-w-[800px] mx-auto text-center">
                        <p className="font-lora italic text-[#ffc300] text-sm mb-6">A note from Ana</p>
                        <div className="font-lato text-white/80 text-lg md:text-xl leading-relaxed space-y-5">
                            <p>"When I started on Substack, I spent <span className="text-white font-bold">$2,400+ on separate tools, courses, and templates</span> before I found what actually worked."</p>
                            <p>"I bought a thumbnail design course. A copywriting swipe file. An email template pack. A launch strategy program. Each one solved one piece of the puzzle — and each one cost me $200-$500."</p>
                            <p className="text-[#ffc300] font-bold text-xl md:text-2xl">"I built this kit so you don't have to do that."</p>
                            <p>"These are the <span className="text-white font-bold">four tools I wish existed when I started</span> — bundled together for less than the price of any one of them alone."</p>
                        </div>
                        <div className="mt-10 flex items-center gap-4 justify-center">
                            <div className="w-14 h-14 rounded-full bg-[#ffc300] flex items-center justify-center font-anton text-[#1a1a1a] text-xl">A</div>
                            <div className="text-left">
                                <p className="text-white font-bold">Ana Calin</p>
                                <p className="text-gray-400 text-sm">79,000+ subscribers. Substack Bestseller.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════ VALUE STACK ═══════════ */}
                <section className="w-full bg-[#0d0d0d] py-16 md:py-24 px-6">
                    <div className="max-w-[700px] mx-auto flex flex-col items-center">
                        <p className="font-montserrat font-bold text-[#27AE60] text-xs uppercase tracking-[3px] mb-3">Here's what you're getting</p>
                        <h2 className="font-anton text-3xl md:text-5xl text-white uppercase mb-12 text-center leading-tight">
                            The Math Doesn't Lie.
                        </h2>

                        <div className="w-full rounded-2xl overflow-hidden border border-white/10 mb-10">
                            {[
                                { item: "Show Don't Tell — 400 AI Thumbnail Credits", value: "$247", icon: Image },
                                { item: "100 Genius Launch Ideas — 184-Page Vault", value: "$97", icon: FileText },
                                { item: "Hooks That Stop the Scroll — Headline Frameworks", value: "$97", icon: MousePointerClick },
                                { item: "LaunchStack — AI Email Sequence Writer", value: "$497", icon: Mail },
                            ].map((row, i) => (
                                <div key={i} className={`flex items-center justify-between px-6 py-4 ${i < 3 ? 'border-b border-white/10' : ''} bg-white/[0.02]`}>
                                    <div className="flex items-center gap-3">
                                        <row.icon size={18} className="text-[#27AE60] flex-shrink-0" />
                                        <span className="font-lato text-white/80 text-sm md:text-base">{row.item}</span>
                                    </div>
                                    <span className="font-anton text-[#27AE60] text-lg flex-shrink-0 ml-4">{row.value}</span>
                                </div>
                            ))}
                            <div className="flex items-center justify-between px-6 py-4 bg-[#27AE60]/10 border-t-2 border-[#27AE60]/30">
                                <span className="font-montserrat font-bold text-white text-sm uppercase tracking-wide">Total Real-World Value</span>
                                <span className="font-anton text-[#27AE60] text-2xl">$938</span>
                            </div>
                        </div>

                        {/* Price reveal */}
                        <p className="font-montserrat font-bold text-white/50 uppercase tracking-widest text-sm mb-3">Your price today</p>
                        <div className="flex items-baseline gap-4 mb-3">
                            <span className="font-anton text-white/25 text-4xl md:text-5xl line-through">$938</span>
                            <span className="font-anton text-[#27AE60] text-8xl md:text-9xl leading-none">$97</span>
                        </div>
                        <div className="bg-[#27AE60] text-white font-montserrat font-black text-sm px-5 py-2 rounded-full uppercase tracking-wider mb-6">
                            That's 90% off — Save $841
                        </div>
                        <p className="font-lora italic text-gray-500 text-base text-center mb-8">
                            Less than the cost of a single freelance thumbnail. And you get <em>all four tools</em>.
                        </p>

                        <button
                            onClick={scrollToCheckout}
                            className="group bg-[#27AE60] hover:bg-[#219653] text-white font-montserrat font-black text-lg md:text-xl py-5 px-10 md:px-14 rounded-lg shadow-[0_4px_30px_rgba(39,174,96,0.4)] transition-all transform hover:-translate-y-1 uppercase tracking-wider flex items-center gap-3"
                        >
                            <span>GET ALL 4 TOOLS FOR $97</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                        </button>
                    </div>
                </section>

                {/* ═══════════ USE CASES / "WHAT YOU'LL DO WITH THIS" ═══════════ */}
                <section className="w-full bg-white py-16 md:py-24 px-6">
                    <div className="max-w-[900px] mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="font-anton text-3xl md:text-5xl text-[#1a1a1a] uppercase leading-tight">
                                Here's What Your <span className="text-[#27AE60]">First Week</span> Looks Like
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {[
                                { day: "Monday", action: "Pick your winning offer from 100 Genius Launch Ideas", result: "You now know exactly what to sell and how to price it", icon: Target, color: "#ffc300" },
                                { day: "Tuesday", action: "Generate your launch email sequence with LaunchStack", result: "5-7 psychology-backed emails ready to schedule", icon: Mail, color: "#7209b7" },
                                { day: "Wednesday", action: "Write your sales post using Hooks That Stop the Scroll", result: "A headline and opener that force people to read", icon: PenTool, color: "#1a1a1a" },
                                { day: "Thursday", action: "Create thumbnails for every post with Show Don't Tell", result: "Professional, scroll-stopping visuals in minutes", icon: Image, color: "#f72585" },
                                { day: "Friday", action: "Hit publish. Send the emails. Watch Stripe light up.", result: "Your first sale. Then your second. Then momentum.", icon: DollarSign, color: "#27AE60" },
                            ].map((day, i) => (
                                <div key={i} className="flex items-start gap-5 bg-gray-50 rounded-xl p-5 md:p-6 border border-gray-100">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: day.color + '15' }}>
                                        <day.icon size={22} style={{ color: day.color }} />
                                    </div>
                                    <div>
                                        <p className="font-montserrat font-black text-xs uppercase tracking-widest mb-1" style={{ color: day.color }}>{day.day}</p>
                                        <p className="font-bold text-[#1a1a1a] text-base md:text-lg mb-1">{day.action}</p>
                                        <p className="font-lato text-gray-500 text-sm">{day.result}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <p className="font-lato text-gray-700 text-lg">
                                By Friday, you've done what most creators spend <span className="font-bold">months</span> trying to figure out.
                            </p>
                            <p className="font-anton text-[#27AE60] text-2xl md:text-3xl uppercase mt-3">
                                And you only paid $97.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ═══════════ SOCIAL PROOF ═══════════ */}
                <section className="w-full bg-[#fafafa] py-16 md:py-20 px-6">
                    <div className="max-w-[1000px] mx-auto text-center">
                        <p className="font-montserrat font-bold text-[#f72585] text-xs uppercase tracking-[3px] mb-3">Proof it works</p>
                        <h2 className="font-anton text-3xl md:text-4xl text-[#1a1a1a] uppercase mb-4">
                            <AnimatedCounter target={10000} suffix="+" /> Creators. Real Results.
                        </h2>
                        <p className="font-lora italic text-gray-500 mb-12">From our community of Substack builders</p>

                        <div className="grid md:grid-cols-2 gap-6 mb-10">
                            <img src="/imgs/first-100-paid-subscribers/testim/9.webp" alt="Testimonial" className="w-full rounded-2xl shadow-md border border-gray-100 object-contain" />
                            <img src="/imgs/first-100-paid-subscribers/testim/10.webp" alt="Testimonial" className="w-full rounded-2xl shadow-md border border-gray-100 object-contain" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <img src="/imgs/first-100-paid-subscribers/testim/18.webp" alt="Testimonial" className="w-full rounded-2xl shadow-md border border-gray-100 object-contain" />
                            <img src="/imgs/first-100-paid-subscribers/testim/3.webp" alt="Testimonial" className="w-full rounded-2xl shadow-md border border-gray-100 object-contain" />
                        </div>
                    </div>
                </section>

                {/* ═══════════ WHO IT'S FOR / NOT FOR ═══════════ */}
                <section className="w-full bg-white py-16 md:py-24 px-6">
                    <div className="max-w-[900px] mx-auto">
                        <h2 className="font-anton text-3xl md:text-4xl text-[#1a1a1a] uppercase text-center mb-12">
                            Is This <span className="text-[#27AE60]">For You?</span>
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-[#27AE60]/5 border-2 border-[#27AE60]/20 rounded-2xl p-8">
                                <p className="font-anton text-xl text-[#27AE60] uppercase mb-6">This is for you if...</p>
                                <ul className="space-y-4">
                                    {[
                                        "You're building on Substack (or about to)",
                                        "You have ideas but struggle to package them into something people buy",
                                        "You want to launch this month, not 'someday'",
                                        "You're tired of spending hours on thumbnails that still look mediocre",
                                        "You know you need an email strategy but don't know where to start",
                                        "You want battle-tested frameworks, not generic advice",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle size={18} className="text-[#27AE60] flex-shrink-0 mt-0.5" />
                                            <span className="font-lato text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-8">
                                <p className="font-anton text-xl text-red-500 uppercase mb-6">This is NOT for you if...</p>
                                <ul className="space-y-4">
                                    {[
                                        "You already have a $10k/month system that's working",
                                        "You're looking for a 12-week course with hand-holding",
                                        "You want someone to do the work for you",
                                        "You have zero interest in monetizing your writing",
                                        "You think tools don't matter and 'just writing' is enough",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <X size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                                            <span className="font-lato text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════ OBJECTION CRUSHER ═══════════ */}
                <section className="w-full bg-[#fafafa] py-16 md:py-20 px-6">
                    <div className="max-w-[700px] mx-auto">
                        <h2 className="font-anton text-3xl md:text-4xl text-[#1a1a1a] uppercase text-center mb-12">
                            Still Thinking About It?
                        </h2>

                        <div className="space-y-6">
                            {[
                                { q: "\"I'm not sure I'm ready to launch yet.\"", a: "That's exactly why you need this. These tools work whether you're launching tomorrow or in 3 months. You'll be building your arsenal while others are still googling 'how to write a headline.'" },
                                { q: "\"$97 is still money...\"", a: "You'd pay $97 for a single hour of coaching. This gives you 4 tools you'll use for an entire year. One good headline from the Hooks vault or one launch idea from the PDF could 100x that investment." },
                                { q: "\"Will these actually work for my niche?\"", a: "The 100 Genius Launch Ideas cover 10 major niche categories. The AI tools adapt to any topic. The headline frameworks are niche-agnostic — they work on human psychology, not niche tricks." },
                                { q: "\"What if I already have one of these tools?\"", a: "At $97 for all 4, each tool costs roughly $24. Even if you own one already, you're getting the other 3 at a massive discount. Plus, these versions may be updated since you last saw them." },
                            ].map((faq, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
                                    <p className="font-bold text-[#1a1a1a] text-lg mb-2">{faq.q}</p>
                                    <p className="font-lato text-gray-600">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════ FINAL CTA + RISK REVERSAL ═══════════ */}
                <section className="w-full bg-[#1a1a1a] py-16 md:py-20 px-6">
                    <div className="max-w-[700px] mx-auto text-center">
                        <h2 className="font-anton text-3xl md:text-5xl text-white uppercase mb-6 leading-tight">
                            Two Types of Creators <span className="text-[#ffc300]">Will See This Page.</span>
                        </h2>
                        <div className="font-lato text-white/70 text-lg space-y-4 mb-10">
                            <p><span className="text-white font-bold">Creator A</span> will think "that looks cool" — close the tab — and go back to spending 4 hours on a thumbnail that gets 12 clicks.</p>
                            <p><span className="text-[#ffc300] font-bold">Creator B</span> will spend 60 seconds filling out the form below, get instant access to all 4 tools, and launch something this week that actually makes money.</p>
                            <p className="text-white font-bold text-xl pt-4">The tools are the same. The difference is who uses them.</p>
                        </div>

                        <button
                            onClick={scrollToCheckout}
                            className="group bg-[#27AE60] hover:bg-[#219653] text-white font-montserrat font-black text-xl py-5 px-12 rounded-lg shadow-[0_4px_30px_rgba(39,174,96,0.4)] transition-all transform hover:-translate-y-1 uppercase tracking-wider flex items-center gap-3 mx-auto mb-4"
                        >
                            <span>BE CREATOR B — $97</span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                        </button>
                        <p className="text-gray-500 text-sm">Instant access. All 4 tools. No subscription. No upsells.</p>
                    </div>
                </section>

                {/* ═══════════ CHECKOUT ═══════════ */}
                <div id="checkout-section" className="w-full flex justify-center py-20 px-6 bg-white">
                    <div className="w-full max-w-[600px] mx-auto">
                        <h2 className="font-anton text-3xl md:text-4xl text-[#333333] mb-2 text-center uppercase tracking-wide">
                            GET <span className="text-[#27AE60]">INSTANT ACCESS</span>
                        </h2>
                        <p className="font-lora italic text-gray-500 text-center mb-10 text-base">
                            All 4 tools. Delivered instantly. One payment of $97.
                        </p>

                        <div className="w-full bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
                            <div className="bg-[#1a1a1a] py-4 px-6 text-center relative">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#27AE60] to-[#ffc300]" />
                                <p className="text-white font-montserrat font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                                    <Lock size={14} className="text-[#27AE60]" />
                                    Secure 256-Bit Encrypted Checkout
                                </p>
                            </div>

                            <div className="p-8 md:p-10">
                                {/* What you're getting summary */}
                                <div className="bg-[#27AE60]/5 border border-[#27AE60]/20 rounded-xl p-4 mb-6">
                                    <p className="font-montserrat font-bold text-[#27AE60] text-xs uppercase tracking-wider mb-3">The Creator Launch Kit includes:</p>
                                    {[
                                        "Show Don't Tell — 400 AI Thumbnail Credits",
                                        "100 Genius Launch Ideas — 184-Page PDF",
                                        "Hooks That Stop the Scroll — Headline Vault",
                                        "LaunchStack — AI Email Sequence Writer",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 mb-1.5">
                                            <CheckCircle size={14} className="text-[#27AE60] flex-shrink-0" />
                                            <span className="text-gray-700 text-sm font-medium">{item}</span>
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#27AE60]/20">
                                        <span className="text-gray-400 text-sm line-through">$938 value</span>
                                        <span className="font-anton text-[#27AE60] text-2xl">$97</span>
                                    </div>
                                </div>

                                {step === 1 ? (
                                    <form onSubmit={startCheckout} className="space-y-5">
                                        <div>
                                            <label className="block font-montserrat font-bold text-[#1a1a1a] mb-2 uppercase text-xs tracking-wider">Full Name</label>
                                            <input
                                                required type="text" value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-4 rounded-lg border border-gray-200 focus:border-[#27AE60] focus:ring-2 focus:ring-[#27AE60]/10 outline-none transition-all font-lato text-black"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-montserrat font-bold text-[#1a1a1a] mb-2 uppercase text-xs tracking-wider">Email Address</label>
                                            <input
                                                required type="email" value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-4 rounded-lg border border-gray-200 focus:border-[#27AE60] focus:ring-2 focus:ring-[#27AE60]/10 outline-none transition-all font-lato text-black"
                                                placeholder="name@example.com"
                                            />
                                        </div>

                                        <button
                                            disabled={isInitializing}
                                            className="w-full bg-[#27AE60] hover:bg-[#219653] text-white font-montserrat font-bold text-xl py-5 rounded-lg shadow-[0_4px_20px_rgba(39,174,96,0.3)] transition-all transform hover:-translate-y-1 uppercase tracking-wider"
                                        >
                                            {isInitializing ? 'Preparing...' : 'GET INSTANT ACCESS — $97 →'}
                                        </button>

                                        <p className="text-gray-400 text-xs text-center font-lato">
                                            All sales final due to instant digital delivery. Secure checkout via Stripe.
                                        </p>
                                    </form>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                                            <div>
                                                <p className="text-gray-500 text-xs font-bold uppercase">Customer</p>
                                                <p className="font-bold text-[#1a1a1a]">{name}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-gray-500 text-xs font-bold uppercase">Total</p>
                                                <p className="font-anton text-2xl text-[#27AE60]">$97</p>
                                            </div>
                                        </div>

                                        {clientSecret && (
                                            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe', variables: { colorPrimary: '#27AE60' } } }}>
                                                <CheckoutFormContent clientSecret={clientSecret} leadId={leadId!} />
                                            </Elements>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══════════ FORCE REJECT ═══════════ */}
                <div className="w-full bg-gray-50 py-8 px-6 text-center border-t border-gray-100">
                    <p className="font-lato text-gray-400 text-sm italic">
                        <a href="/" className="hover:text-gray-600 transition-colors underline">No thanks — I'll keep buying tools one-by-one and spending 10x more.</a>
                    </p>
                </div>
            </main>

            <footer className="py-8 text-center text-gray-400 text-sm font-sans bg-white border-t border-gray-100">
                <p>&copy; 2026 How We Grow. All rights reserved. Support: <a href="mailto:anaxcalin@gmail.com" className="hover:text-gray-600 transition-colors">anaxcalin@gmail.com</a></p>
            </footer>
        </div>
    );
}
