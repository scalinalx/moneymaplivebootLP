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
    FIRST100_PRICE,
    FIRST100_BUMP_PRICE,
    FIRST100_BUMP2_PRICE,
    FIRST100_BUMP3_PRICE,
    FIRST100_BUNDLE_PRICE
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
                return_url: `${window.location.origin}/first-100-paid-subscribers-success?leadId=${leadId}`,
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message || 'An unexpected error occurred.');
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            await fetch('/api/first100/confirm-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadId, paymentIntentId: paymentIntent.id }),
            });

            window.location.href = `/first-100-paid-subscribers-success?leadId=${leadId}`;
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
                className={`w-full mt-8 bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-xl py-5 rounded shadow-lg transition-all transform hover:-translate-y-1 uppercase tracking-wider ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {isProcessing ? 'Processing...' : `I WANT TO HIT BESTSELLER STATUS — $${FIRST100_PRICE / 100}`}
            </button>

            <div className="mt-6 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Lock size={12} className="text-[#27AE60]" />
                    <span>256-bit Secure SSL Connection</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs text-center">
                    <Shield size={12} className="text-[#27AE60]" />
                    <span>Secure payments powered by Stripe. Your address data is encrypted and sent directly to Stripe.</span>
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

    const [hasBump1, setHasBump1] = useState(false); // 100 Genius Offers
    const [hasBump2, setHasBump2] = useState(false); // Hooks
    const [hasBump3, setHasBump3] = useState(false); // Launch Stack
    const [hasBundle, setHasBundle] = useState(false); // All 3 Bundle

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

    let totalCents = FIRST100_PRICE;
    if (hasBundle) {
        totalCents += FIRST100_BUNDLE_PRICE;
    } else {
        if (hasBump1) totalCents += FIRST100_BUMP_PRICE;
        if (hasBump2) totalCents += FIRST100_BUMP2_PRICE;
        if (hasBump3) totalCents += FIRST100_BUMP3_PRICE;
    }

    const startCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsInitializing(true);

        try {
            const response = await fetch('/api/first100/create-payment-intent', {
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
        <div id="waitlist-section" className="w-full max-w-[600px] mx-auto bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
            <div className="bg-[#333333] py-4 px-6 text-center">
                <p className="text-white font-montserrat font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                    <Lock size={14} className="text-[#ffc300]" />
                    Secure 256-Bit Encrypted Checkout
                </p>
            </div>

            <div className="p-8 md:p-12">
                {step === 1 ? (
                    <form onSubmit={startCheckout} className="space-y-6">
                        <div>
                            <label className="block font-montserrat font-bold text-[#333333] mb-2 uppercase text-xs tracking-wider">Full Name</label>
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
                            <label className="block font-montserrat font-bold text-[#333333] mb-2 uppercase text-xs tracking-wider">Email Address</label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-4 rounded-lg border border-gray-200 focus:border-[#ffc300] focus:ring-2 focus:ring-[#ffc300]/10 outline-none transition-all font-lato text-black"
                                placeholder="name@example.com"
                            />
                        </div>

                        {/* Order Bumps Section */}
                        <div className="space-y-4 my-8">
                            <h3 className="font-anton text-xl text-[#333333] uppercase tracking-wide">Upgrade Your Order</h3>

                            {/* Bump 1: 100 Genius Offers */}
                            <div
                                onClick={handleBump1Toggle}
                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex gap-4 ${hasBump1 ? 'border-[#27AE60] bg-[#27AE60]/5' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <div className="mt-1 flex-shrink-0">
                                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${hasBump1 ? 'border-[#27AE60] bg-[#27AE60]' : 'border-gray-300'}`}>
                                        {hasBump1 && <CheckCircle size={16} className="text-white" />}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold text-[#333333] text-lg mb-1 leading-tight">
                                        Yes! Add 100 Genius Offers (+${FIRST100_BUMP_PRICE / 100})
                                    </p>
                                    <p className="text-sm text-gray-600 font-lora">
                                        A complete vault of 100 proven offer frameworks that sell effortlessly. Never guess what to sell again.
                                    </p>
                                </div>
                            </div>

                            {/* Bump 2: Hooks That Stop the Scroll */}
                            <div
                                onClick={handleBump2Toggle}
                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex gap-4 ${hasBump2 ? 'border-[#27AE60] bg-[#27AE60]/5' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <div className="mt-1 flex-shrink-0">
                                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${hasBump2 ? 'border-[#27AE60] bg-[#27AE60]' : 'border-gray-300'}`}>
                                        {hasBump2 && <CheckCircle size={16} className="text-white" />}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold text-[#333333] text-lg mb-1 leading-tight">
                                        Yes! Add Hooks That Stop the Scroll (+${FIRST100_BUMP2_PRICE / 100})
                                    </p>
                                    <p className="text-sm text-gray-600 font-lora">
                                        Swipe file of high-converting headline frameworks to capture attention instantly in a busy feed.
                                    </p>
                                </div>
                            </div>

                            {/* Bump 3: Launch Stack */}
                            <div
                                onClick={handleBump3Toggle}
                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex gap-4 ${hasBump3 ? 'border-[#d81159] bg-[#d81159]/5' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <div className="mt-1 flex-shrink-0">
                                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${hasBump3 ? 'border-[#d81159] bg-[#d81159]' : 'border-gray-300'}`}>
                                        {hasBump3 && <CheckCircle size={16} className="text-white" />}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold text-[#d81159] text-lg mb-1 leading-tight">
                                        Yes! Add Launch Stack Email Sequence Copywriter (+${FIRST100_BUMP3_PRICE / 100})
                                    </p>
                                    <p className="text-sm text-gray-600 font-lora">
                                        Use our custom AI email sequence copywriter to generate launch emails that convert free readers into buyers on autopilot.
                                    </p>
                                </div>
                            </div>

                            {/* The Bundle */}
                            <div
                                onClick={handleBundleToggle}
                                className={`p-5 rounded-2xl border-4 transition-all cursor-pointer shadow-lg relative ${hasBundle ? 'border-[#ffc300] bg-[#ffc300]/10' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}
                            >
                                <div className="absolute -top-3 right-4 bg-[#ffc300] text-black text-[10px] font-anton px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                                    Best Value
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${hasBundle ? 'border-[#ffc300] bg-[#ffc300]' : 'border-gray-300'}`}>
                                            {hasBundle && <CheckCircle size={16} className="text-black" />}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-black text-[#333333] text-xl mb-1 leading-tight uppercase font-anton">
                                            Bundle All 3 Upgrades & Save! (+${FIRST100_BUNDLE_PRICE / 100})
                                        </p>
                                        <p className="text-sm text-gray-700 font-lora">
                                            Get 100 Genius Offers, Hooks That Stop the Scroll, AND the Launch Stack Email Copywriter all together at a massive discount compared to buying individually.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={isInitializing}
                            className="w-full bg-[#ffc300] hover:bg-[#d49600] text-white font-montserrat font-bold text-xl py-5 rounded shadow-lg transition-all transform hover:-translate-y-1 uppercase tracking-wider"
                        >
                            {isInitializing ? 'Preparing...' : "RESERVE MY SEAT — NEXT: PAYMENT"}
                        </button>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                            <div>
                                <p className="text-gray-500 text-xs font-bold uppercase">Customer</p>
                                <p className="font-bold text-[#333333]">{name}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-500 text-xs font-bold uppercase">Total</p>
                                <p className="font-anton text-2xl text-[#ffc300]">${totalCents / 100}</p>
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
                                        colorText: '#333333',
                                        borderRadius: '8px',
                                    }
                                }
                            }}>
                                <CheckoutFormContent clientSecret={clientSecret} leadId={leadId} />
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
