'use client';

import React, { useState, useRef } from 'react';
import { Sparkles, ArrowRight, Loader2, Feather, MessageSquarePlus, RefreshCw, ExternalLink } from 'lucide-react';
import { generateOfferStack, refineOfferStack } from '@/services/ana-ai/geminiService';
import { trackActivity } from '@/services/ana-ai/leadService';
import { OfferStackResponse } from '@/types/ana-ai';
import { OfferCard } from '@/components/ana-ai/OfferCard';
import { LandingPage } from '@/components/ana-ai/LandingPage';
import { ProductHuntBadge } from '@/components/ProductHuntBadge';
import { ExitIntentModal } from '@/components/ExitIntentModal';

const AnaAiApp = () => {
    // User Access State
    const [user, setUser] = useState<{ name: string, email: string } | null>(null);

    // App State
    const [expertise, setExpertise] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<OfferStackResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Feedback state
    const [feedback, setFeedback] = useState('');
    const [refining, setRefining] = useState(false);

    const resultsRef = useRef<HTMLDivElement>(null);

    const handleSignup = (name: string, email: string) => {
        // Track Facebook Lead Event
        if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'Lead', {
                content_name: 'Ana AI Offer Flow Signup',
                user_email: email, // Hashed by FB automatically if pixel is set up for advanced matching
                value: 2,
                currency: 'USD'
            });
        }

        setUser({ name, email });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!expertise.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await generateOfferStack(expertise);
            setResult(data);

            // Track activity in Supabase
            if (user?.email) {
                trackActivity(user.email, expertise, 'initial_generation');
            }

            // Small delay to allow render before scrolling
            setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } catch (err) {
            setError("Oops! Something went wrong while brainstorming. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRefine = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedback.trim() || !result) return;

        setRefining(true);
        setError(null);

        try {
            const data = await refineOfferStack(expertise, result, feedback);
            setResult(data);

            // Track activity in Supabase
            if (user?.email) {
                trackActivity(user.email, feedback, 'refinement');
            }

            setFeedback(''); // Clear feedback after successful update
        } catch (err) {
            setError("Could not refine the offer. Please try again.");
        } finally {
            setRefining(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setExpertise('');
        setFeedback('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // If no user, show Landing Page
    if (!user) {
        return (
            <div className="ana-ai-root">
                <LandingPage onSignup={handleSignup} />
            </div>
        );
    }

    // Main App Interface
    return (
        <div className="ana-ai-root min-h-screen pb-20 bg-gradient-to-br from-rose-50 via-white to-pink-50 text-slate-800 font-sans">
            {/* Navbar */}
            <nav className="w-full py-6 px-6 md:px-12 flex items-center justify-between ana-ai-glass-panel sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-200">
                        <img
                            src="https://substackcdn.com/image/fetch/$s_!VUeE!,w_1360,c_limit,f_webp,q_auto:best,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9dc2df7d-6cba-4d7e-94fc-05583eec3cda_1280x1280.png"
                            alt="Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="font-extrabold text-xl tracking-tighter text-slate-900 uppercase">
                        ANA'S OFFER FLOW
                    </span>
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest hidden sm:block">
                    ANA CALIN'S HOW WE GROW
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 mt-12 md:mt-20">

                {/* Header Section */}
                <div className="max-w-5xl mx-auto text-center mb-12">
                    <h1 className="text-4xl md:text-7xl font-bold mb-6 text-slate-900 leading-tight font-display">
                        Turn your <span className="ana-ai-gradient-text">Expertise</span> into a <br className="hidden md:block" /> high-value Product That SELLZ.
                    </h1>

                    <div className="mb-10 flex justify-center">
                        <ProductHuntBadge />
                    </div>

                    {/* Show intro text only if no results yet */}
                    {!result && (
                        <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto font-light ana-ai-animate-fade-in">
                            Welcome inside, {user.name}. Ready to actually make money from your online business? Enter your skill below, and our AI will architect the perfect Lead Magnet, Core Offer, Upsell, and Downsell for you.
                        </p>
                    )}

                    {/* Input Form - Hidden after generation */}
                    {!result && (
                        <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto ana-ai-animate-fade-in-up">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-rose-300 to-pink-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative bg-white rounded-2xl p-2 shadow-xl ring-1 ring-slate-900/5 flex flex-col md:flex-row gap-2">
                                    <input
                                        type="text"
                                        value={expertise}
                                        onChange={(e) => setExpertise(e.target.value)}
                                        placeholder="e.g. I help busy moms meal prep organic food..."
                                        className="flex-1 px-4 py-4 text-slate-700 placeholder-slate-400 bg-transparent focus:outline-none text-lg"
                                        disabled={loading}
                                    />
                                    <button
                                        type="submit"
                                        disabled={loading || !expertise.trim()}
                                        className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group-hover:scale-[1.02]"
                                    >
                                        {loading ? (
                                            <Loader2 className="animate-spin" size={20} />
                                        ) : (
                                            <>
                                                <span>Generate</span>
                                                <Sparkles size={18} className="text-yellow-300 fill-current" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-slate-400">
                                "Write one sentence below sharing one area of your life that you're knowledgeable in."
                            </p>
                        </form>
                    )}

                    {error && (
                        <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 inline-block animate-pulse">
                            {error}
                        </div>
                    )}
                </div>

                {/* Results Section */}
                {result && result.stack && (
                    <div ref={resultsRef} className="ana-ai-animate-fade-in-up transition-opacity duration-700">
                        <div className="mb-12 text-center">
                            <div className="inline-block px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium mb-4">
                                Strategy Brief
                            </div>
                            <p className="text-xl text-slate-700 max-w-3xl mx-auto italic leading-relaxed">
                                "{result.strategySummary}"
                            </p>
                        </div>

                        {/* The Stack Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative">

                            {/* Connector Lines (Desktop Only) - visual decoration */}
                            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 border-t-2 border-dashed border-slate-200 -z-10"></div>

                            {/* Lead Magnet */}
                            <div className="md:col-span-3 transform md:translate-y-12">
                                <OfferCard
                                    type="Lead Magnet"
                                    data={result.stack.leadMagnet}
                                    colorTheme="rose"
                                />
                            </div>

                            {/* Core Product - Center Stage */}
                            <div className="md:col-span-6 transform md:-translate-y-6 z-10">
                                <div className="relative">
                                    {/* Explicit z-index handling for glow vs content */}
                                    <div className="absolute -inset-1 bg-gradient-to-b from-rose-200 to-pink-200 rounded-[1.2rem] blur-sm opacity-50 -z-10"></div>
                                    <div className="relative z-10 h-full">
                                        <OfferCard
                                            type="Core Product"
                                            data={result.stack.coreProduct}
                                            colorTheme="fuchsia"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Upsell / Downsell Column */}
                            <div className="md:col-span-3 flex flex-col gap-6 transform md:translate-y-12">
                                <OfferCard
                                    type="Upsell"
                                    data={result.stack.upsell}
                                    colorTheme="violet"
                                />
                                <div className="relative pt-6 md:pt-0">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs font-bold text-slate-300 tracking-widest uppercase md:hidden">
                                        OR
                                    </div>
                                    <OfferCard
                                        type="Downsell"
                                        data={result.stack.downsell}
                                        colorTheme="amber"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Feedback & Actions Area */}
                        <div className="mt-20 max-w-2xl mx-auto mb-12">

                            {/* Feedback Form */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-12">
                                <div className="flex items-center gap-2 mb-4 text-slate-800 font-semibold">
                                    <MessageSquarePlus size={20} className="text-rose-500" />
                                    <h3>Refine with Feedback</h3>
                                </div>
                                <p className="text-sm text-slate-500 mb-4">
                                    Give our AI feedback on this first draft of your offer stack.
                                    Want a higher price? Different format? Tell us below.
                                </p>
                                <form onSubmit={handleRefine}>
                                    <textarea
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="e.g. Make the upsell a monthly subscription instead, and increase the core product price..."
                                        className="w-full p-4 rounded-xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-200 text-slate-700 text-sm min-h-[100px] mb-4 resize-none"
                                        disabled={refining}
                                    />
                                    <button
                                        type="submit"
                                        disabled={refining || !feedback.trim()}
                                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {refining ? (
                                            <>
                                                <Loader2 className="animate-spin" size={16} />
                                                <span>Refining Stack...</span>
                                            </>
                                        ) : (
                                            <>
                                                <RefreshCw size={16} />
                                                <span>Refine Offer Stack</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>

                            {/* Start Over Button */}
                            <div className="text-center">
                                <button
                                    onClick={handleReset}
                                    className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-full font-medium shadow-lg shadow-rose-200 transition-all hover:scale-105 inline-flex items-center gap-2"
                                >
                                    Try another topic <ArrowRight size={18} />
                                </button>
                            </div>

                            {/* Money Map Bootcamp CTA Section */}
                            <div className="mt-16 mb-8 max-w-4xl mx-auto">
                                <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-2 border-emerald-200 rounded-2xl p-8 md:p-10 shadow-xl">
                                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 text-center">
                                        Strong start, huh? 👆
                                    </h3>
                                    <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-10 text-center max-w-2xl mx-auto">
                                        If you're serious about turning this into reality, you need to dive deep into building and launching a profitable offer stack. That's the proven path to your first $10k—and the <span className="font-bold text-emerald-700">Money Map Bootcamp</span> will show you exactly how to do it.
                                    </p>

                                    {/* Testimonials Grid */}
                                    <div className="grid md:grid-cols-3 gap-4 mb-10 text-left">
                                        {/* Testimonial 1 - Jill Hart */}
                                        <div className="bg-white/60 p-4 rounded-xl border border-emerald-100 shadow-sm backdrop-blur-sm">
                                            <div className="flex items-center gap-3 mb-2">
                                                <img
                                                    src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/testimonials%2Fe6a99c21-4306-4fec-817f-ccab659b69f5%2Favatar?alt=media&token=ab8ae473-f1ba-4034-8ddf-059bc842131b"
                                                    alt="Jill"
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                                <div>
                                                    <p className="font-bold text-xs text-slate-900">Jill Hart</p>
                                                    <p className="text-[10px] text-emerald-600 font-medium">$1,500/mo with &lt;400 subs</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-600 leading-relaxed">
                                                "I've implemented Ana's money map and made $1,500 over the last month with a less than 400 subscriber base!"
                                            </p>
                                        </div>

                                        {/* Testimonial 2 - Jeanette Martin */}
                                        <div className="bg-white/60 p-4 rounded-xl border border-emerald-100 shadow-sm backdrop-blur-sm">
                                            <div className="flex items-center gap-3 mb-2">
                                                <img
                                                    src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/testimonials%2Fc9cdb423-d612-48be-9745-2665ff95993f%2Favatar?alt=media&token=8cb6ceb6-b40e-4698-8a51-3ab418023d38"
                                                    alt="Jeanette"
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                                <div>
                                                    <p className="font-bold text-xs text-slate-900">Jeanette Martin</p>
                                                    <p className="text-[10px] text-emerald-600 font-medium">Bootcamp Attendee</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-600 leading-relaxed">
                                                "What a brilliant, actionable, organised, inspiring bootcamp. Thank you, Ana."
                                            </p>
                                        </div>

                                        {/* Testimonial 3 - Kyle */}
                                        <div className="bg-white/60 p-4 rounded-xl border border-emerald-100 shadow-sm backdrop-blur-sm">
                                            <div className="flex items-center gap-3 mb-2">
                                                <img
                                                    src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=256&h=256&auto=format&fit=crop"
                                                    alt="Kyle"
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                                <div>
                                                    <p className="font-bold text-xs text-slate-900">Kyle</p>
                                                    <p className="text-[10px] text-emerald-600 font-medium">$2,500/month revenue</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-600 leading-relaxed">
                                                "Best investment I made this year. I'm now making $2,500/month from my newsletter thanks to this program."
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-slate-900 font-bold mb-3 text-lg">
                                            If you're serious about making $10k/month from your creator business, click here now. 👇
                                        </p>
                                        <a
                                            href="https://www.monetisesubstack.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-900/20 transition-all hover:scale-105 text-lg"
                                        >
                                            I'm ready to monetize
                                            <ArrowRight size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/* Product Hunt Badge - Secondary Placement */}
                <div className="mt-20 flex justify-center w-full">
                    <ProductHuntBadge />
                </div>

                {/* EXTERNAL CTA BUTTON */}
                <div className="mt-8 mb-16 flex justify-center w-full">
                    <a
                        href="https://howwegrowtoday.substack.com/subscribe"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                    relative group
                    px-5 md:px-8 py-3 rounded-xl 
                    bg-[#F59E0B] text-white text-base md:text-lg font-bold tracking-wide
                    shadow-[0_4px_20px_rgba(244,114,182,0.4)]
                    hover:shadow-[0_8px_30px_rgba(244,114,182,0.6)]
                    transform transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1
                    flex items-center gap-2 overflow-hidden
                "
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            JOIN 70K+ CREATORS WHO MAKE MONEY
                            <ExternalLink size={18} className="stroke-[3]" />
                        </span>

                        {/* Shine effect overlay */}
                        <div className="absolute top-0 -left-[100%] w-[100%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 transition-all duration-1000 group-hover:left-[100%]"></div>
                    </a>
                </div>

                {/* Exit Intent Modal - Only shown after results generated */}
                {result && <ExitIntentModal />}

            </div>
        </div>
    );
};

export default AnaAiApp;
