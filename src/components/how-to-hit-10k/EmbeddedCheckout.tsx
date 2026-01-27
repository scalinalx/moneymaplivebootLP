'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { OrderBump } from './OrderBump';
import { HIT10K_PRICE, HIT10K_BUMP_PRICE } from '@/lib/stripe';
import { Shield, Lock, AlertCircle } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutFormProps {
    clientSecret: string;
    leadId: string;
    hasOrderBump: boolean;
}

const CheckoutFormContent: React.FC<CheckoutFormProps> = ({ clientSecret, leadId, hasOrderBump }) => {
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
                return_url: `${window.location.origin}/hit-10k-success?leadId=${leadId}`,
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message || 'An unexpected error occurred.');
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // Update Supabase
            await fetch('/api/hit10k/confirm-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    leadId,
                    paymentIntentId: paymentIntent.id
                }),
            });

            // Redirect to success page
            window.location.href = `/hit-10k-success?leadId=${leadId}`;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <PaymentElement options={{
                layout: 'tabs',
            }} />

            {errorMessage && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm font-medium">
                    <AlertCircle size={16} />
                    {errorMessage}
                </div>
            )}

            <button
                disabled={isProcessing || !stripe}
                className={`w-full mt-8 bg-[#d81159] hover:bg-[#b30e4a] text-white font-montserrat font-bold text-xl py-5 rounded shadow-lg transition-all transform hover:-translate-y-1 uppercase tracking-wider ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
            >
                {isProcessing ? 'Processing...' : `YES! RESERVE MY SPOT — $${(hasOrderBump ? (HIT10K_PRICE + HIT10K_BUMP_PRICE) : HIT10K_PRICE) / 100}`}
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
    const [hasOrderBump, setHasOrderBump] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [leadId, setLeadId] = useState<string | null>(null);
    const [isInitializing, setIsInitializing] = useState(false);
    const [step, setStep] = useState(1); // 1: Lead Info, 2: Payment

    const startCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsInitializing(true);

        try {
            const response = await fetch('/api/hit10k/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, hasOrderBump }),
            });

            const data = await response.json();
            if (data.success) {
                // Track Lead with Facebook Pixel
                if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('track', 'Lead', {
                        value: 2.00,
                        currency: 'USD'
                    });
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
        <div id="checkout-section" className="w-full max-w-[600px] mx-auto bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
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

                        <OrderBump isSelected={hasOrderBump} onToggle={() => setHasOrderBump(!hasOrderBump)} />

                        <button
                            disabled={isInitializing}
                            className="w-full bg-[#ffc300] hover:bg-[#d49600] text-white font-montserrat font-bold text-xl py-5 rounded shadow-lg transition-all transform hover:-translate-y-1 uppercase tracking-wider"
                        >
                            {isInitializing ? 'Preparing...' : 'Next: Payment Details'}
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
                                <p className="font-anton text-2xl text-[#ffc300]">${(hasOrderBump ? (HIT10K_PRICE + HIT10K_BUMP_PRICE) : HIT10K_PRICE) / 100}</p>
                            </div>
                        </div>

                        {clientSecret && leadId && (
                            <Elements stripe={stripePromise} options={{
                                clientSecret, appearance: {
                                    theme: 'stripe',
                                    variables: {
                                        colorPrimary: '#ffc300',
                                        colorBackground: '#ffffff',
                                        colorText: '#333333',
                                        borderRadius: '8px',
                                    }
                                }
                            }}>
                                <CheckoutFormContent clientSecret={clientSecret} leadId={leadId} hasOrderBump={hasOrderBump} />
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
