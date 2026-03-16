'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { Shield, Lock, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const UNSTUCK_PRICE = 9700; // $97 in cents
const SDT_BUMP_PRICE = 4700; // $47 in cents

interface CheckoutFormProps {
    clientSecret: string;
    leadId: string;
    hasSdtBump: boolean;
}

const CheckoutFormContent: React.FC<CheckoutFormProps> = ({ clientSecret, leadId, hasSdtBump }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const totalDisplay = hasSdtBump ? (UNSTUCK_PRICE + SDT_BUMP_PRICE) / 100 : UNSTUCK_PRICE / 100;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);
        setErrorMessage(null);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/unstuck-to-published?success=true&leadId=${leadId}`,
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message || 'An unexpected error occurred.');
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            const confirmRes = await fetch('/api/unstuck/confirm-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadId, paymentIntentId: paymentIntent.id }),
            });

            const confirmData = await confirmRes.json();

            // If SDT bump was purchased and we got a token, include it in the redirect
            const sdtParam = confirmData.sdtTokenId ? `&sdtToken=${confirmData.sdtTokenId}` : '';
            window.location.href = `/unstuck-to-published?success=true&leadId=${leadId}${sdtParam}`;
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

    const totalCents = UNSTUCK_PRICE + (hasSdtBump ? SDT_BUMP_PRICE : 0);

    const startCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsInitializing(true);

        try {
            const response = await fetch('/api/unstuck/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, hasSdtBump }),
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
        <div id="waitlist-section" className="w-full max-w-[600px] mx-auto bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
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

                        {/* Show Don't Tell Order Bump */}
                        <div className="my-6">
                            <div
                                onClick={() => setHasSdtBump(!hasSdtBump)}
                                className={`p-5 rounded-xl border-2 transition-all cursor-pointer relative ${hasSdtBump ? 'border-[#f72585] bg-[#f72585]/5 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <div className="absolute -top-3 right-4 bg-[#f72585] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm flex items-center gap-1">
                                    <Sparkles size={10} />
                                    One-Time Offer
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${hasSdtBump ? 'border-[#f72585] bg-[#f72585]' : 'border-gray-300'}`}>
                                            {hasSdtBump && <CheckCircle size={16} className="text-white" />}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#1a1a1a] text-lg mb-1 leading-tight">
                                            Yes! Add Show Don't Tell — Viral Thumbnail Generator <span className="text-[#f72585]">(+$47)</span>
                                        </p>
                                        <p className="text-sm text-gray-600 font-lato mb-2">
                                            Get 400 AI image credits to generate scroll-stopping thumbnails for every Substack post you publish. Powered by Gemini 2.5 Flash — create professional visuals in seconds, not hours.
                                        </p>
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

                        <button
                            disabled={isInitializing}
                            className="w-full bg-[#ffc300] hover:bg-[#e6b000] text-[#1a1a1a] font-montserrat font-bold text-xl py-5 rounded-lg shadow-[0_4px_20px_rgba(255,195,0,0.25)] transition-all transform hover:-translate-y-1 uppercase tracking-wider"
                        >
                            {isInitializing ? 'Preparing...' : `BOOK YOUR SEAT — $${totalCents / 100} →`}
                        </button>

                        <p className="font-lato text-gray-400 text-xs text-center">
                            24-hour money-back guarantee. Replay included.
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
                                <span className="text-gray-600">Unstuck to Published Workshop</span>
                                <span className="font-bold text-[#1a1a1a]">$97</span>
                            </div>
                            {hasSdtBump && (
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-600">Show Don't Tell (400 credits)</span>
                                    <span className="font-bold text-[#1a1a1a]">$47</span>
                                </div>
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
                                <CheckoutFormContent clientSecret={clientSecret} leadId={leadId} hasSdtBump={hasSdtBump} />
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
