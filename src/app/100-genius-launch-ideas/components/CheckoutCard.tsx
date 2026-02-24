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
            <div className="relative overflow-hidden border-2 border-[#f0e6dd] bg-[#faefe5] p-5 transition-all shadow-sm">
                <label className="flex flex-col gap-4 cursor-pointer select-none">
                    <div className="space-y-3">
                        <h4 className="font-bold text-[#0c72d6] text-2xl md:text-3xl leading-tight font-display tracking-tight">
                            The "Grand Slam" Offer Builder
                        </h4>

                        {/* Placeholder for the order bump image */}
                        <div className="w-full bg-white/50 rounded-lg p-2 mb-4">
                            <img src="/imgs/100-genius-offers/bundle_image.webp" alt="Offer Builder Bundle" className="w-full h-auto object-contain mx-auto mix-blend-multiply" />
                        </div>

                        <p className="text-sm md:text-base text-slate-700 leading-relaxed font-medium">
                            <span className="font-bold underline text-slate-900">[STRONGLY RECOMMEND]:</span> Unlock the AI engine that instantly builds your entire high-ticket product stack.
                        </p>
                        <p className="text-sm md:text-base text-slate-700 leading-relaxed font-bold">
                            Most launches fail because the offer is weak. Stop guessing what to sell.
                        </p>
                        <p className="text-sm md:text-base text-slate-700 leading-relaxed italic">
                            OfferGenius™ generates the names, deliverables, bonuses, and guarantees using the $100M Framework. This tool will save you THOUSANDS of wasted dollars on ads, because you'll create winning, profitable offers right from the start!
                        </p>

                        <div className="flex items-center gap-2 mt-4 mb-2">
                            <span className="font-bold text-rose-500 text-2xl">${(bump1Price / 100).toFixed(2)}</span>
                            <span className="text-rose-300 line-through text-lg">$197.00</span>
                        </div>
                    </div>

                    <div className="bg-white p-3 border border-slate-200 flex items-center gap-3 w-full">
                        <input
                            type="checkbox"
                            checked={hasBump1}
                            onChange={(e) => setHasBump1(e.target.checked)}
                            className="w-6 h-6 text-[#0c72d6] border-slate-300 rounded focus:ring-[#0c72d6] cursor-pointer"
                        />
                        <span className="font-bold text-slate-700">Add to order</span>
                    </div>
                </label>
            </div>

            {/* Bump 2: Launch Stack */}
            <div className="relative overflow-hidden border-2 border-[#f0e6dd] bg-[#faefe5] p-5 transition-all shadow-sm">
                <label className="flex flex-col gap-4 cursor-pointer select-none">
                    <div className="space-y-3">
                        <h4 className="font-bold text-[#0c72d6] text-2xl md:text-3xl leading-tight font-display tracking-tight">
                            The "Lazy Launch" Email System
                        </h4>

                        {/* Placeholder for the order bump image */}
                        <div className="w-full bg-white/50 rounded-lg p-2 mb-4">
                            <img src="/imgs/100-genius-offers/bundle_image.webp" alt="Email System Bundle" className="w-full h-auto object-contain mx-auto mix-blend-multiply" />
                        </div>

                        <p className="text-sm md:text-base text-slate-700 leading-relaxed font-medium">
                            <span className="font-bold underline text-slate-900">[STRONGLY RECOMMEND]:</span> Unlock the exact psychological email sequences we use to force the sale.
                        </p>
                        <p className="text-sm md:text-base text-slate-700 leading-relaxed font-bold">
                            Writing sales emails is the #1 revenue killer. Skip the writer's block.
                        </p>
                        <p className="text-sm md:text-base text-slate-700 leading-relaxed italic">
                            Launch Stack AI generates the emails that sell—without being salesy. This system will save you THOUSANDS of wasted hours, because you'll have plug-and-play sequences that turn your list into an ATM right from the start!
                        </p>

                        <div className="flex items-center gap-2 mt-4 mb-2">
                            <span className="font-bold text-rose-500 text-2xl">${(bump2Price / 100).toFixed(2)}</span>
                            <span className="text-rose-300 line-through text-lg">$297.00</span>
                        </div>
                    </div>

                    <div className="bg-white p-3 border border-slate-200 flex items-center gap-3 w-full">
                        <input
                            type="checkbox"
                            checked={hasBump2}
                            onChange={(e) => setHasBump2(e.target.checked)}
                            className="w-6 h-6 text-[#0c72d6] border-slate-300 rounded focus:ring-[#0c72d6] cursor-pointer"
                        />
                        <span className="font-bold text-slate-700">Add to order</span>
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
