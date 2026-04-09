'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import {
    WIM_PRICE,
    WIM_BUMP1_PRICE,
    WIM_BUMP2_PRICE,
    WIM_BUMP3_PRICE,
    WIM_BUNDLE_PRICE,
} from '@/lib/stripe';
import { Shield, Lock, AlertCircle, CheckCircle } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

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
                return_url: `${window.location.origin}/word-into-money-success?leadId=${leadId}`,
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message || 'An unexpected error occurred.');
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            await fetch('/api/word-into-money/confirm-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadId, paymentIntentId: paymentIntent.id }),
            });
            window.location.href = `/word-into-money-success?leadId=${leadId}`;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <PaymentElement options={{ layout: 'tabs' }} />
            {errorMessage && (
                <div className="mt-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-400 text-sm font-medium">
                    <AlertCircle size={16} />
                    {errorMessage}
                </div>
            )}
            <button
                disabled={isProcessing || !stripe}
                className={`w-full mt-8 bg-brand-lime hover:bg-brand-limeDim text-brand-950 font-anton text-xl py-5 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 uppercase tracking-wider ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {isProcessing ? 'Processing...' : `GET INSTANT ACCESS — $${WIM_PRICE / 100}`}
            </button>
            <div className="mt-6 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-brand-grey text-xs">
                    <Lock size={12} className="text-brand-lime" />
                    <span>256-bit Secure SSL Connection</span>
                </div>
                <div className="flex items-center gap-2 text-brand-grey text-xs text-center">
                    <Shield size={12} className="text-brand-lime" />
                    <span>Secure payments powered by Stripe. Your data is encrypted.</span>
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

    const [hasBump1, setHasBump1] = useState(false);
    const [hasBump2, setHasBump2] = useState(false);
    const [hasBump3, setHasBump3] = useState(false);
    const [hasBundle, setHasBundle] = useState(false);

    const handleBump1Toggle = () => { setHasBump1(!hasBump1); if (!hasBump1) setHasBundle(false); };
    const handleBump2Toggle = () => { setHasBump2(!hasBump2); if (!hasBump2) setHasBundle(false); };
    const handleBump3Toggle = () => { setHasBump3(!hasBump3); if (!hasBump3) setHasBundle(false); };
    const handleBundleToggle = () => {
        if (!hasBundle) {
            setHasBundle(true);
            setHasBump1(false);
            setHasBump2(false);
            setHasBump3(false);
        } else {
            setHasBundle(false);
        }
    };

    let totalCents = WIM_PRICE;
    if (hasBundle) {
        totalCents += WIM_BUNDLE_PRICE;
    } else {
        if (hasBump1) totalCents += WIM_BUMP1_PRICE;
        if (hasBump2) totalCents += WIM_BUMP2_PRICE;
        if (hasBump3) totalCents += WIM_BUMP3_PRICE;
    }

    const startCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsInitializing(true);
        try {
            const response = await fetch('/api/word-into-money/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, hasBump1, hasBump2, hasBump3, hasBundle }),
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

    return (
        <div id="checkout-section" className="w-full bg-brand-900 border border-brand-800 rounded-2xl overflow-hidden">
            <div className="bg-brand-800 py-4 px-6 text-center">
                <p className="text-brand-white font-montserrat font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                    <Lock size={14} className="text-brand-lime" />
                    Secure 256-Bit Encrypted Checkout
                </p>
            </div>

            <div className="p-6 md:p-10">
                {step === 1 ? (
                    <form onSubmit={startCheckout} className="space-y-5">
                        <div>
                            <label className="block font-montserrat font-bold text-brand-white mb-2 uppercase text-xs tracking-wider">Full Name</label>
                            <input
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-4 rounded-lg bg-brand-950 border border-brand-800 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/10 outline-none transition-all font-lato text-brand-white placeholder-brand-grey"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div>
                            <label className="block font-montserrat font-bold text-brand-white mb-2 uppercase text-xs tracking-wider">Email Address</label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-4 rounded-lg bg-brand-950 border border-brand-800 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/10 outline-none transition-all font-lato text-brand-white placeholder-brand-grey"
                                placeholder="name@example.com"
                            />
                        </div>

                        {/* Order Bumps */}
                        <div className="space-y-3 my-6">
                            <h3 className="font-anton text-xl text-brand-white uppercase tracking-wide">Upgrade Your Order</h3>

                            {/* Bump 1: Hooks */}
                            <div
                                onClick={handleBump1Toggle}
                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex gap-4 ${hasBump1 ? 'border-brand-lime bg-brand-lime/5' : 'border-brand-800 hover:border-brand-grey'}`}
                            >
                                <div className="mt-1 flex-shrink-0">
                                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${hasBump1 ? 'border-brand-lime bg-brand-lime' : 'border-brand-grey'}`}>
                                        {hasBump1 && <CheckCircle size={16} className="text-brand-950" />}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold text-brand-white text-base mb-1 leading-tight">
                                        Add Hooks That Stop the Scroll (+${WIM_BUMP1_PRICE / 100})
                                    </p>
                                    <p className="text-sm text-brand-grey font-lora">
                                        Swipe file of high-converting headline frameworks to capture attention instantly.
                                    </p>
                                </div>
                            </div>

                            {/* Bump 2: 100 Genius Ideas */}
                            <div
                                onClick={handleBump2Toggle}
                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex gap-4 ${hasBump2 ? 'border-brand-lime bg-brand-lime/5' : 'border-brand-800 hover:border-brand-grey'}`}
                            >
                                <div className="mt-1 flex-shrink-0">
                                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${hasBump2 ? 'border-brand-lime bg-brand-lime' : 'border-brand-grey'}`}>
                                        {hasBump2 && <CheckCircle size={16} className="text-brand-950" />}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold text-brand-white text-base mb-1 leading-tight">
                                        Add 100 Genius Launch Ideas (+${WIM_BUMP2_PRICE / 100})
                                    </p>
                                    <p className="text-sm text-brand-grey font-lora">
                                        100 proven offer frameworks so you never guess what to sell again.
                                    </p>
                                </div>
                            </div>

                            {/* Bump 3: Launch Stack */}
                            <div
                                onClick={handleBump3Toggle}
                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex gap-4 ${hasBump3 ? 'border-brand-lime bg-brand-lime/5' : 'border-brand-800 hover:border-brand-grey'}`}
                            >
                                <div className="mt-1 flex-shrink-0">
                                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${hasBump3 ? 'border-brand-lime bg-brand-lime' : 'border-brand-grey'}`}>
                                        {hasBump3 && <CheckCircle size={16} className="text-brand-950" />}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold text-brand-white text-base mb-1 leading-tight">
                                        Add Launch Stack Email Copywriter (+${WIM_BUMP3_PRICE / 100})
                                    </p>
                                    <p className="text-sm text-brand-grey font-lora">
                                        AI email sequence copywriter that generates launch emails on autopilot.
                                    </p>
                                </div>
                            </div>

                            {/* Bundle */}
                            <div
                                onClick={handleBundleToggle}
                                className={`p-5 rounded-2xl border-4 transition-all cursor-pointer shadow-lg relative ${hasBundle ? 'border-brand-lime bg-brand-lime/10' : 'border-brand-800 bg-brand-800/30 hover:border-brand-grey'}`}
                            >
                                <div className="absolute -top-3 right-4 bg-brand-lime text-brand-950 text-[10px] font-anton px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                                    Save $52
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${hasBundle ? 'border-brand-lime bg-brand-lime' : 'border-brand-grey'}`}>
                                            {hasBundle && <CheckCircle size={16} className="text-brand-950" />}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-black text-brand-white text-lg mb-1 leading-tight uppercase font-anton">
                                            Bundle All 3 & Save! (+${WIM_BUNDLE_PRICE / 100})
                                        </p>
                                        <p className="text-sm text-brand-grey font-lora">
                                            Get Hooks, 100 Genius Ideas, AND Launch Stack together at a massive discount.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={isInitializing}
                            className="w-full bg-brand-lime hover:bg-brand-limeDim text-brand-950 font-anton text-xl py-5 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 uppercase tracking-wider"
                        >
                            {isInitializing ? 'Preparing...' : 'RESERVE MY SEAT — NEXT: PAYMENT'}
                        </button>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-800">
                            <div>
                                <p className="text-brand-grey text-xs font-bold uppercase">Customer</p>
                                <p className="font-bold text-brand-white">{name}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-brand-grey text-xs font-bold uppercase">Total</p>
                                <p className="font-anton text-2xl text-brand-lime">${totalCents / 100}</p>
                            </div>
                        </div>

                        {clientSecret && leadId && (
                            <Elements stripe={stripePromise} options={{
                                clientSecret,
                                appearance: {
                                    theme: 'night',
                                    variables: {
                                        colorPrimary: '#ffd200',
                                        colorBackground: '#0a0a0a',
                                        colorText: '#ededed',
                                        borderRadius: '8px',
                                    },
                                },
                            }}>
                                <CheckoutFormContent clientSecret={clientSecret} leadId={leadId} />
                            </Elements>
                        )}

                        <button
                            onClick={() => setStep(1)}
                            className="w-full text-brand-grey text-sm hover:text-brand-white transition-colors py-2"
                        >
                            Go Back to Details
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
