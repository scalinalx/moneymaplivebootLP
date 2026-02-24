'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Loader2, Lock, CheckCircle2, Shield, AlertCircle, ArrowRight, Zap, Mail } from 'lucide-react';
import { GENIUS_IDEAS_PRICE, GENIUS_IDEAS_BUMP_PRICE, GENIUS_IDEAS_BUMP2_PRICE } from '@/lib/constants';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface CheckoutFormContentProps {
    clientSecret: string;
    leadId: string;
    totalAmount: number;
}

const CheckoutFormContent = ({ clientSecret, leadId, totalAmount }: CheckoutFormContentProps) => {
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
                return_url: `${window.location.origin}/100-genius-launch-ideas?success=true&leadId=${leadId}`,
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message || 'An unexpected error occurred.');
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            try {
                // Confirm payment on backend to update lead status
                await fetch('/api/genius-ideas/confirm-payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ leadId, paymentIntentId: paymentIntent.id }),
                });
                // Redirect to success page (or show success state)
                // For now, redirecting to a success page or just showing success
                // User didn't specify a dedicated success page for this, but standard behavior is redirect or show success.
                // I'll simulate a redirect to a thank you page or use the success state.
                // Redirect to the dedicated success page with leadId
                window.location.href = `/100-genius-launch-ideas/success?leadId=${leadId}`;
            } catch (err) {
                console.error('Confirmation error', err);
                setIsProcessing(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
            <PaymentElement options={{ layout: 'tabs' }} />

            {errorMessage && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                    <AlertCircle size={16} />
                    {errorMessage}
                </div>
            )}

            <button
                disabled={isProcessing || !stripe}
                className="w-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg uppercase tracking-wide"
            >
                {isProcessing ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Processing...</span>
                    </>
                ) : (
                    <>
                        <Lock size={18} />
                        <span>Pay ${(totalAmount / 100).toFixed(2)}</span>
                    </>
                )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-4">
                <Shield size={12} className="text-emerald-500" />
                <span>Secure 256-bit SSL Encrypted Payment</span>
            </div>
        </form>
    );
};

export function CheckoutForm() {
    const [step, setStep] = useState(1); // 1 = Lead, 2 = Payment
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [hasBump1, setHasBump1] = useState(false); // OfferGenius
    const [hasBump2, setHasBump2] = useState(false); // Launch Stack
    const [isInitializing, setIsInitializing] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [leadId, setLeadId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);

    // Listen for CTA-triggered focus events
    useEffect(() => {
        const handleFocusCheckout = () => {
            if (step === 1 && nameInputRef.current) {
                nameInputRef.current.focus();
                nameInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };
        window.addEventListener('focus-checkout', handleFocusCheckout);
        return () => window.removeEventListener('focus-checkout', handleFocusCheckout);
    }, [step]);

    const basePrice = GENIUS_IDEAS_PRICE; // 997
    const bump1Price = GENIUS_IDEAS_BUMP_PRICE; // 1700
    const bump2Price = GENIUS_IDEAS_BUMP2_PRICE; // 2700

    const totalAmount = basePrice + (hasBump1 ? bump1Price : 0) + (hasBump2 ? bump2Price : 0);

    const handleInitialSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsInitializing(true);
        setError(null);

        try {
            const response = await fetch('/api/genius-ideas/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    name,
                    hasOrderBump: hasBump1,
                    hasOrderBump2: hasBump2
                }),
            });
            const data = await response.json();

            if (data.success) {
                setClientSecret(data.clientSecret);
                setLeadId(data.leadId);
                setStep(2);
            } else {
                setError(data.error || 'Failed to initialize checkout');
            }
        } catch (err) {
            setError('Connection error. Please try again.');
        } finally {
            setIsInitializing(false);
        }
    };

    if (step === 2 && clientSecret && leadId) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Customer</p>
                        <p className="font-medium text-slate-900">{name}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total</p>
                        <p className="font-bold text-rose-500 text-xl">${(totalAmount / 100).toFixed(2)}</p>
                    </div>
                </div>

                <Elements stripe={stripePromise} options={{
                    clientSecret,
                    appearance: {
                        theme: 'stripe',
                        variables: {
                            colorPrimary: '#e11d48',
                            borderRadius: '12px',
                        }
                    }
                }}>
                    <CheckoutFormContent clientSecret={clientSecret} leadId={leadId} totalAmount={totalAmount} />
                </Elements>

                <button
                    onClick={() => setStep(1)}
                    className="w-full text-center text-sm text-slate-400 hover:text-slate-600 transition-colors"
                >
                    ← Edit Details
                </button>
            </div>
        );
    }

    // Step 1: Lead Capture & Bumps
    return (
        <form onSubmit={handleInitialSubmit} className="space-y-5">
            {/* Lead Fields */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input
                    type="text"
                    ref={nameInputRef}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-slate-900"
                    placeholder="John Doe"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-slate-900"
                    placeholder="you@example.com"
                />
            </div>

            {/* Bump 1: OfferGenius */}
            <div className="relative overflow-hidden bg-[#f4f6fb] p-6 transition-all shadow-sm rounded-lg border border-slate-100 mb-4">
                <label className="flex flex-col gap-4 cursor-pointer select-none">
                    <div className="space-y-4">
                        <h4 className="font-bold text-[#4353e8] text-2xl md:text-3xl leading-tight font-display tracking-tight uppercase">
                            CUSTOM CODED:<br />OfferGenius™ AI Builder
                        </h4>

                        <p className="text-sm md:text-base text-slate-700 leading-relaxed italic">
                            We felt this tool is SO essential for your success that we recorded a quick walk-through so you can see exactly how it works. I highly recommend you watch it here ⬇
                        </p>

                        {/* Placeholder for the order bump image/video */}
                        <div className="w-full bg-black rounded-lg overflow-hidden relative shadow-lg">
                            <img src="/imgs/100-genius-offers/bundle_image.webp" alt="Offer Builder Bundle" className="w-full h-auto object-cover opacity-80" />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-black/80 rounded-lg px-4 py-3 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm md:text-base text-slate-800 leading-relaxed">
                            <span className="font-bold uppercase tracking-wide">RELEASED SPECIALLY FOR THIS BUNDLE:</span> We coded a new, custom AI tool that is immensely valuable because it completely eliminates checkout hesitation.
                            <br /><br />
                            <span className="font-bold text-slate-900">Not only does this custom-coded tool save you massive amounts of time, but it perfectly customizes the offer for YOU. It ensures YOU will launch the exact perfect thing for YOUR specific audience.</span>
                            <br /><br />
                            It delivers tremendous results by letting you launch offers that are guaranteed to bring money into your bank account. This custom software is a game-changer, giving you everything you need to launch immediately.
                        </p>

                        <p className="text-sm md:text-base text-slate-700 leading-relaxed font-bold italic">
                            <span className="underline uppercase tracking-wide">PLEASE NOTE:</span> we thought this tool was SO important for you to have that we chose to make it available right here so you can focus on getting (& using) it immediately.
                        </p>

                        <div className="mt-4 mb-2">
                            <span className="font-bold text-[#ff7a59] text-3xl md:text-4xl tracking-tight">${(bump1Price / 100).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="bg-white p-4 border border-slate-200 flex items-start gap-4 w-full shadow-sm rounded-md hover:border-slate-300 transition-colors">
                        <input
                            type="checkbox"
                            checked={hasBump1}
                            onChange={(e) => setHasBump1(e.target.checked)}
                            className="w-6 h-6 mt-1 border-slate-300 rounded cursor-pointer accent-[#ff7a59]"
                        />
                        <span className="font-bold text-slate-600 text-sm md:text-base leading-snug">
                            Yes, I need this AI Offer tool! <br className="hidden md:block" /><span className="text-slate-500 font-semibold">[ADD TO ORDER]</span>
                        </span>
                    </div>
                </label>
            </div>

            {/* Bump 2: Launch Stack */}
            <div className="relative overflow-hidden bg-[#f4f6fb] p-6 transition-all shadow-sm rounded-lg border border-slate-100">
                <label className="flex flex-col gap-4 cursor-pointer select-none">
                    <div className="space-y-4">
                        <h4 className="font-bold text-[#4353e8] text-2xl md:text-3xl leading-tight font-display tracking-tight uppercase">
                            CUSTOM TRAINED:<br />"Lazy Launch" Email System
                        </h4>

                        <p className="text-sm md:text-base text-slate-700 leading-relaxed italic">
                            We felt this system is SO essential for your launches that we filmed a video walk-through for you to see exactly how it works. I highly recommend you watch until the end ⬇
                        </p>

                        {/* Placeholder for the order bump image/video */}
                        <div className="w-full bg-black rounded-lg overflow-hidden relative shadow-lg">
                            <img src="/imgs/100-genius-offers/bundle_image.webp" alt="Email System Bundle" className="w-full h-auto object-cover opacity-80" />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-black/80 rounded-lg px-4 py-3 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm md:text-base text-slate-800 leading-relaxed">
                            <span className="font-bold uppercase tracking-wide">RELEASED SPECIALLY FOR YOU:</span> We custom-trained an AI system to write the exact psychological email sequences we use to force the sale. We rarely share these templates because they took years of testing to perfect.
                            <br /><br />
                            <span className="font-bold text-slate-900">Not only that, but this Lazy Launch Email System generates sequences that sell without sounding "salesy" so you don’t have to guess what to write.</span>
                            <br /><br />
                            Writing sales emails is the #1 revenue killer. This system will save you THOUSANDS of wasted writing hours, giving you plug-and-play sequences that turn your list into an ATM right away!
                        </p>

                        <div className="mt-4 mb-2">
                            <span className="font-bold text-[#ff7a59] text-3xl md:text-4xl tracking-tight">${(bump2Price / 100).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="bg-white p-4 border border-slate-200 flex items-start gap-4 w-full shadow-sm rounded-md hover:border-slate-300 transition-colors">
                        <input
                            type="checkbox"
                            checked={hasBump2}
                            onChange={(e) => setHasBump2(e.target.checked)}
                            className="w-6 h-6 mt-1 border-slate-300 rounded cursor-pointer accent-[#ff7a59]"
                        />
                        <span className="font-bold text-slate-600 text-sm md:text-base leading-snug">
                            Yes, I need this Email System! <br className="hidden md:block" /><span className="text-slate-500 font-semibold">[ADD TO ORDER]</span>
                        </span>
                    </div>
                </label>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={isInitializing}
                className="w-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-pink-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg uppercase tracking-wide group"
            >
                {isInitializing ? (
                    'Processing...'
                ) : (
                    <>
                        <span>Continue to Payment</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>

            {/* Total Preview */}
            <div className="text-center text-sm text-slate-400">
                Total due today: <span className="font-bold text-slate-900">${(totalAmount / 100).toFixed(2)}</span>
            </div>

        </form>
    );
}

export function CheckoutCard() {
    return (
        <div id="checkout-card" className="sticky top-6 z-30 max-h-[calc(100vh-3rem)] overflow-y-auto scrollbar-hide rounded-2xl">
            <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-b from-pink-200 to-rose-200 rounded-2xl blur opacity-25"></div>

                {/* Card */}
                <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                    {/* Header */}
                    <div className="text-center mb-6 pb-6 border-b border-slate-100">
                        <div className="inline-block px-3 py-1 bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wide rounded-full mb-3">
                            Limited Time Offer
                        </div>
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <span className="text-slate-400 line-through text-xl">$97</span>
                            <span className="font-display font-bold text-5xl bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                                ${(GENIUS_IDEAS_PRICE / 100).toFixed(2)}
                            </span>
                        </div>
                        <p className="text-sm text-slate-500">One-time payment • Instant access</p>
                    </div>

                    {/* What's Included */}
                    <div className="mb-6 space-y-3">
                        <h3 className="font-bold text-slate-900 mb-3">What's Included:</h3>
                        {[
                            '100 vetted launch ideas',
                            'Sorted by difficulty & revenue',
                            'Instant PDF download',
                            'Lifetime access'
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                                <CheckCircle2 className="text-pink-500 flex-shrink-0" size={16} />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>

                    {/* Checkout Form */}
                    <CheckoutForm />

                    {/* Money Back Guarantee */}
                    <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
                            <Shield size={12} />
                            30-day money-back guarantee
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
