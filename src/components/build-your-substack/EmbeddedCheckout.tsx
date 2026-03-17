'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { Shield, Lock, AlertCircle, CheckCircle, Sparkles, FileText, Zap, Package } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const UNSTUCK_PRICE = 9700; // $97 in cents
const SDT_BUMP_PRICE = 4700; // $47 in cents
const GENIUS_BUMP_PRICE = 2700; // $27 in cents
const HOOKS_BUMP_PRICE = 2700; // $27 in cents
const BUNDLE_PRICE = 6900; // $69 in cents (all 3 bumps — save $32)

interface CheckoutFormProps {
    clientSecret: string;
    leadId: string;
    hasSdtBump: boolean;
    hasGeniusBump: boolean;
    hasHooksBump: boolean;
    hasBundle: boolean;
}

const CheckoutFormContent: React.FC<CheckoutFormProps> = ({ clientSecret, leadId, hasSdtBump, hasGeniusBump, hasHooksBump, hasBundle }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const bumpTotal = hasBundle
        ? BUNDLE_PRICE
        : (hasSdtBump ? SDT_BUMP_PRICE : 0) + (hasGeniusBump ? GENIUS_BUMP_PRICE : 0) + (hasHooksBump ? HOOKS_BUMP_PRICE : 0);
    const totalDisplay = (UNSTUCK_PRICE + bumpTotal) / 100;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);
        setErrorMessage(null);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/build-your-substack-success?leadId=${leadId}`,
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message || 'An unexpected error occurred.');
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            const confirmRes = await fetch('/api/build-your-substack/confirm-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadId, paymentIntentId: paymentIntent.id }),
            });

            const confirmData = await confirmRes.json();

            const sdtParam = confirmData.sdtTokenId ? `&sdtToken=${confirmData.sdtTokenId}` : '';
            window.location.href = `/build-your-substack-success?leadId=${leadId}${sdtParam}`;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <PaymentElement options={{ layout: 'tabs' }} />

            {errorMessage && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm font-medium">
                    <AlertCircle size={16} />
                    {errorMessage}
                </div>
            )}

            <button
                disabled={isProcessing || !stripe}
                className={`w-full mt-8 bg-[#ffc300] hover:bg-[#e6b000] text-[#1a1a1a] font-montserrat font-bold text-xl py-5 rounded-lg shadow-[0_4px_20px_rgba(255,195,0,0.25)] transition-all transform hover:-translate-y-1 uppercase tracking-wider ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {isProcessing ? 'Processing...' : `COMPLETE MY ORDER — $${totalDisplay}`}
            </button>

            <div className="mt-6 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Lock size={12} className="text-[#27AE60]" />
                    <span>256-bit Secure SSL Connection</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs text-center">
                    <Shield size={12} className="text-[#27AE60]" />
                    <span>Secure payments powered by Stripe. Your data is encrypted and sent directly to Stripe.</span>
                </div>
            </div>
        </form>
    );
};

export const EmbeddedCheckout: React.FC = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [leadId, setLeadId] = useState<string | null>(null);
    const [isInitializing, setIsInitializing] = useState(false);
    const [step, setStep] = useState(1);
    const [hasSdtBump, setHasSdtBump] = useState(false);
    const [hasGeniusBump, setHasGeniusBump] = useState(false);
    const [hasHooksBump, setHasHooksBump] = useState(false);
    const [hasBundle, setHasBundle] = useState(false);

    // When bundle is selected, individual bumps are ignored (bundle includes all 3)
    const bumpTotal = hasBundle
        ? BUNDLE_PRICE
        : (hasSdtBump ? SDT_BUMP_PRICE : 0) + (hasGeniusBump ? GENIUS_BUMP_PRICE : 0) + (hasHooksBump ? HOOKS_BUMP_PRICE : 0);
    const totalCents = UNSTUCK_PRICE + bumpTotal;

    const handleBundleToggle = () => {
        if (!hasBundle) {
            setHasSdtBump(false);
            setHasGeniusBump(false);
            setHasHooksBump(false);
            setHasBundle(true);
        } else {
            setHasBundle(false);
        }
    };

    const handleIndividualBump = (setter: React.Dispatch<React.SetStateAction<boolean>>, current: boolean) => {
        if (hasBundle) setHasBundle(false);
        setter(!current);
    };

    const startCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsInitializing(true);

        const effectiveSdt = hasBundle || hasSdtBump;
        const effectiveGenius = hasBundle || hasGeniusBump;
        const effectiveHooks = hasBundle || hasHooksBump;

        try {
            const response = await fetch('/api/build-your-substack/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    name,
                    hasSdtBump: effectiveSdt,
                    hasGeniusBump: effectiveGenius,
                    hasHooksBump: effectiveHooks,
                    hasBundle,
                }),
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
        } catch (error) {
            console.error('Checkout error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsInitializing(false);
        }
    };

    const effectiveSdt = hasBundle || hasSdtBump;
    const effectiveGenius = hasBundle || hasGeniusBump;
    const effectiveHooks = hasBundle || hasHooksBump;

    return (
        <div id="checkout-section" className="w-full max-w-[660px] mx-auto bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
            <div className="bg-[#1a1a1a] py-4 px-6 text-center relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ffc300] to-[#f72585]" />
                <p className="text-white font-montserrat font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                    <Lock size={14} className="text-[#ffc300]" />
                    Secure 256-Bit Encrypted Checkout
                </p>
            </div>

            <div className="p-8 md:p-12">
                {step === 1 ? (
                    <form onSubmit={startCheckout} className="space-y-6">
                        <div>
                            <label className="block font-montserrat font-bold text-[#1a1a1a] mb-2 uppercase text-xs tracking-wider">Full Name</label>
                            <input
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-4 rounded-lg border border-gray-200 focus:border-[#ffc300] focus:ring-2 focus:ring-[#ffc300]/10 outline-none transition-all font-lato text-black"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div>
                            <label className="block font-montserrat font-bold text-[#1a1a1a] mb-2 uppercase text-xs tracking-wider">Email Address</label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-4 rounded-lg border border-gray-200 focus:border-[#ffc300] focus:ring-2 focus:ring-[#ffc300]/10 outline-none transition-all font-lato text-black"
                                placeholder="name@example.com"
                            />
                        </div>

                        {/* ═══════════ BUMP 1: Show Don't Tell ═══════════ */}
                        <div className={`my-4 transition-opacity ${hasBundle ? 'opacity-40' : ''}`}>
                            <div
                                onClick={() => handleIndividualBump(setHasSdtBump, hasSdtBump)}
                                className={`p-5 rounded-xl border-2 transition-all cursor-pointer relative ${hasSdtBump && !hasBundle ? 'border-[#f72585] bg-[#f72585]/5 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <div className="absolute -top-3 right-4 bg-[#f72585] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm flex items-center gap-1">
                                    <Sparkles size={10} />
                                    Highly Recommended!
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${hasSdtBump && !hasBundle ? 'border-[#f72585] bg-[#f72585]' : 'border-gray-300'}`}>
                                            {hasSdtBump && !hasBundle && <CheckCircle size={16} className="text-white" />}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-[#1a1a1a] text-lg mb-1 leading-tight">
                                            Yes! Add Show Don't Tell — Viral Thumbnail Generator <span className="text-[#f72585]">(+$47)</span>
                                        </p>
                                        <div className="flex gap-3 my-2">
                                            <img
                                                src="/imgs/unstuck-to-published/showdonttell-hero.jpeg"
                                                alt="Show Don't Tell Thumbnail Generator"
                                                className="w-[121px] h-[85px] rounded-lg object-cover border border-gray-200 flex-shrink-0"
                                            />
                                            <p className="text-[17px] text-gray-600 font-lato">
                                                Get 400 AI image credits to generate scroll-stopping thumbnails for every Substack post. Powered by Gemini 2.5 Flash — professional visuals in seconds, not hours.
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-semibold">400 Image Credits</span>
                                            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-semibold">~200 Generations</span>
                                            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-semibold">19 Style Presets</span>
                                            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-semibold">1 Year Access</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ═══════════ BUMP 2: 100 Genius Launch Ideas ═══════════ */}
                        <div className={`my-4 transition-opacity ${hasBundle ? 'opacity-40' : ''}`}>
                            <div
                                onClick={() => handleIndividualBump(setHasGeniusBump, hasGeniusBump)}
                                className={`p-5 rounded-xl border-2 transition-all cursor-pointer relative ${hasGeniusBump && !hasBundle ? 'border-[#ffc300] bg-[#ffc300]/5 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <div className="absolute -top-3 right-4 bg-[#ffc300] text-[#1a1a1a] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm flex items-center gap-1">
                                    <FileText size={10} />
                                    Highly Recommended!
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${hasGeniusBump && !hasBundle ? 'border-[#ffc300] bg-[#ffc300]' : 'border-gray-300'}`}>
                                            {hasGeniusBump && !hasBundle && <CheckCircle size={16} className="text-[#1a1a1a]" />}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-[#1a1a1a] text-lg mb-1 leading-tight">
                                            Yes! Add 100 Genius Launch Ideas PDF <span className="text-[#f72585]">(+$27)</span>
                                        </p>
                                        <div className="flex gap-3 my-2">
                                            <img
                                                src="/imgs/100-genius-offers/bundle_image.webp"
                                                alt="100 Genius Launch Ideas"
                                                className="w-[121px] h-[85px] rounded-lg object-cover border border-gray-200 flex-shrink-0"
                                            />
                                            <p className="text-[17px] text-gray-600 font-lato">
                                                100 vetted, high-converting launch ideas sorted by difficulty and revenue potential. Know exactly what to sell and how to price it.
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-semibold">100 Proven Ideas</span>
                                            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-semibold">Sorted by Revenue</span>
                                            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-semibold">Instant PDF Download</span>
                                            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-semibold">Lifetime Access</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ═══════════ BUMP 3: Hooks That Stop the Scroll ═══════════ */}
                        <div className={`my-4 transition-opacity ${hasBundle ? 'opacity-40' : ''}`}>
                            <div
                                onClick={() => handleIndividualBump(setHasHooksBump, hasHooksBump)}
                                className={`p-5 rounded-xl border-2 transition-all cursor-pointer relative ${hasHooksBump && !hasBundle ? 'border-[#f72585] bg-[#f72585]/5 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <div className="absolute -top-3 right-4 bg-[#f72585] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm flex items-center gap-1">
                                    <Zap size={10} />
                                    Highly Recommended!
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${hasHooksBump && !hasBundle ? 'border-[#f72585] bg-[#f72585]' : 'border-gray-300'}`}>
                                            {hasHooksBump && !hasBundle && <CheckCircle size={16} className="text-white" />}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-[#1a1a1a] text-lg mb-1 leading-tight">
                                            Yes! Add Hooks That Stop the Scroll <span className="text-[#f72585]">(+$27)</span>
                                        </p>
                                        <div className="flex gap-3 my-2">
                                            <img
                                                src="/imgs/unstuck-to-published/hooks-hero.jpeg"
                                                alt="Hooks That Stop the Scroll"
                                                className="w-[121px] h-[85px] rounded-lg object-cover border border-gray-200 flex-shrink-0"
                                            />
                                            <p className="text-[17px] text-gray-600 font-lato">
                                                Stop being ignored. Get our vault of high-converting headline frameworks and opening loops that force readers to stop scrolling and click your content instantly.
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-semibold">Headline Swipe File</span>
                                            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-semibold">Opening Loop Templates</span>
                                            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-semibold">Instant Access</span>
                                            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-semibold">Lifetime Updates</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ═══════════ BUNDLE — BEST DEAL (last) ═══════════ */}
                        <div className="my-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex-1 h-px bg-gray-200" />
                                <span className="text-[#27AE60] text-xs font-black uppercase tracking-wider">Or get all 3 and save</span>
                                <div className="flex-1 h-px bg-gray-200" />
                            </div>
                            <div
                                onClick={handleBundleToggle}
                                className={`p-5 rounded-xl border-2 transition-all cursor-pointer relative ${hasBundle ? 'border-[#27AE60] bg-[#27AE60]/5 shadow-lg ring-2 ring-[#27AE60]/20' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <div className="absolute -top-3 left-4 bg-[#27AE60] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm flex items-center gap-1">
                                    <Package size={10} />
                                    Save $32!
                                </div>
                                <div className="absolute -top-3 right-4 bg-[#f72585] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm animate-pulse">
                                    HIGHLY RECOMMENDED!
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${hasBundle ? 'border-[#27AE60] bg-[#27AE60]' : 'border-gray-300'}`}>
                                            {hasBundle && <CheckCircle size={16} className="text-white" />}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-[#1a1a1a] text-lg mb-1 leading-tight">
                                            The Creator Launch Kit — All 3 Add-Ons <span className="text-[#27AE60] font-black">(+$69)</span>
                                            <span className="text-gray-400 text-sm line-through ml-2">$101</span>
                                        </p>
                                        <div className="flex gap-3 my-2">
                                            <img
                                                src="/imgs/unstuck-to-published/creatorbundle-hero2.jpeg"
                                                alt="Creator Launch Kit Bundle"
                                                className="w-[145px] h-[101px] rounded-lg object-cover border border-gray-200 flex-shrink-0"
                                            />
                                            <p className="text-[17px] text-gray-600 font-lato">
                                                Get everything you need to launch like a pro: AI-powered thumbnails, 100 proven launch ideas, and headline frameworks that stop the scroll — all in one bundle.
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-1.5 text-[15px] text-gray-700 font-lato mt-2">
                                            <span className="flex items-center gap-2"><CheckCircle size={12} className="text-[#27AE60]" /> Show Don't Tell — 400 AI image credits (worth $47)</span>
                                            <span className="flex items-center gap-2"><CheckCircle size={12} className="text-[#27AE60]" /> 100 Genius Launch Ideas PDF (worth $27)</span>
                                            <span className="flex items-center gap-2"><CheckCircle size={12} className="text-[#27AE60]" /> Hooks That Stop the Scroll (worth $27)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={isInitializing}
                            className="w-full bg-[#ffc300] hover:bg-[#e6b000] text-[#1a1a1a] font-montserrat font-bold text-xl py-5 rounded-lg shadow-[0_4px_20px_rgba(255,195,0,0.25)] transition-all transform hover:-translate-y-1 uppercase tracking-wider"
                        >
                            {isInitializing ? 'Preparing...' : `BOOK YOUR SEAT — $${totalCents / 100} →`}
                        </button>

                        <p className="font-lato text-gray-400 text-xs text-center">
                            Replay included for all attendees. Secure checkout via Stripe.
                        </p>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                            <div>
                                <p className="text-gray-500 text-xs font-bold uppercase">Customer</p>
                                <p className="font-bold text-[#1a1a1a]">{name}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-500 text-xs font-bold uppercase">Total</p>
                                <p className="font-anton text-2xl text-[#ffc300]">${totalCents / 100}</p>
                            </div>
                        </div>

                        {/* Order summary */}
                        <div className="bg-gray-50 rounded-lg p-4 text-sm">
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-600">Build Your Substack Workshop</span>
                                <span className="font-bold text-[#1a1a1a]">$97</span>
                            </div>
                            {hasBundle ? (
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-600">Creator Launch Kit (all 3 add-ons)</span>
                                    <span className="font-bold text-[#27AE60]">$69 <span className="text-gray-400 line-through text-xs">$101</span></span>
                                </div>
                            ) : (
                                <>
                                    {effectiveSdt && (
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-600">Show Don't Tell (400 credits)</span>
                                            <span className="font-bold text-[#1a1a1a]">$47</span>
                                        </div>
                                    )}
                                    {effectiveGenius && (
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-600">100 Genius Launch Ideas PDF</span>
                                            <span className="font-bold text-[#1a1a1a]">$27</span>
                                        </div>
                                    )}
                                    {effectiveHooks && (
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-600">Hooks That Stop the Scroll</span>
                                            <span className="font-bold text-[#1a1a1a]">$27</span>
                                        </div>
                                    )}
                                </>
                            )}
                            <div className="flex justify-between pt-2 mt-2 border-t border-gray-200">
                                <span className="font-bold text-[#1a1a1a]">Total</span>
                                <span className="font-bold text-[#ffc300]">${totalCents / 100}</span>
                            </div>
                        </div>

                        {clientSecret && leadId && (
                            <Elements stripe={stripePromise} options={{
                                clientSecret,
                                appearance: {
                                    theme: 'stripe',
                                    variables: {
                                        colorPrimary: '#ffc300',
                                        colorBackground: '#ffffff',
                                        colorText: '#1a1a1a',
                                        borderRadius: '8px',
                                    }
                                }
                            }}>
                                <CheckoutFormContent
                                    clientSecret={clientSecret}
                                    leadId={leadId}
                                    hasSdtBump={effectiveSdt}
                                    hasGeniusBump={effectiveGenius}
                                    hasHooksBump={effectiveHooks}
                                    hasBundle={hasBundle}
                                />
                            </Elements>
                        )}

                        <button
                            onClick={() => setStep(1)}
                            className="w-full text-gray-400 text-sm hover:text-gray-600 transition-colors py-2"
                        >
                            Go Back to Details
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
