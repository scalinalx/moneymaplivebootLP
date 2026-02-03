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
import { LAUNCHLAB_PRICE, LAUNCHLAB_BUMP_PRICE, LAUNCHLAB_BUMP2_PRICE } from '@/lib/stripe';
import { Shield, Lock, AlertCircle } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutFormProps {
    clientSecret: string;
    leadId: string;
    hasOrderBump: boolean;
    hasOrderBump2: boolean;
}

const CheckoutFormContent: React.FC<CheckoutFormProps> = ({ clientSecret, leadId, hasOrderBump, hasOrderBump2 }) => {
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
                return_url: `${window.location.origin}/10k-launch-lab-upsell?leadId=${leadId}&success=true`,
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message || 'An unexpected error occurred.');
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // Update Supabase
            await fetch('/api/launch-lab/confirm-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    leadId,
                    paymentIntentId: paymentIntent.id
                }),
            });

            // Redirect to success page or show success message
            window.location.href = `/10k-launch-lab-upsell?leadId=${leadId}`;
        }
    };

    const calculateTotal = () => {
        let total = LAUNCHLAB_PRICE;
        if (hasOrderBump) total += LAUNCHLAB_BUMP_PRICE;
        if (hasOrderBump2) total += LAUNCHLAB_BUMP2_PRICE;
        return total / 100;
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <PaymentElement options={{
                layout: 'tabs',
            }} />

            {errorMessage && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-[#ff4d4d] text-sm font-medium">
                    <AlertCircle size={16} />
                    {errorMessage}
                </div>
            )}

            <button
                disabled={isProcessing || !stripe}
                className={`w-full mt-8 bg-brand-neon text-black font-display font-bold text-xl py-3.5 rounded-sm border-2 border-black shadow-hard hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase tracking-wider ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
            >
                {isProcessing ? 'Processing...' : `LET'S GO, I'M READY! — $${calculateTotal()}`}
            </button>

            <div className="mt-6 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Lock size={12} className="text-gray-400" />
                    <span>256-bit Secure SSL Connection</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs text-center">
                    <Shield size={12} className="text-gray-400" />
                    <span>Secure payments powered by Stripe.</span>
                </div>
            </div>
        </form>
    );
};

export const EmbeddedCheckout: React.FC = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [hasOrderBump, setHasOrderBump] = useState(false);
    const [hasOrderBump2, setHasOrderBump2] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [leadId, setLeadId] = useState<string | null>(null);
    const [isInitializing, setIsInitializing] = useState(false);
    const [step, setStep] = useState(1); // 1: Lead Info, 2: Payment

    const startCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsInitializing(true);

        try {
            const response = await fetch('/api/launch-lab/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, hasOrderBump, hasOrderBump2 }),
            });

            const data = await response.json();
            if (data.success) {
                // Track Lead with Facebook Pixel
                if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('track', 'Lead', {
                        value: 5.00,
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

    const calculateTotal = () => {
        let total = LAUNCHLAB_PRICE;
        if (hasOrderBump) total += LAUNCHLAB_BUMP_PRICE;
        if (hasOrderBump2) total += LAUNCHLAB_BUMP2_PRICE;
        return total / 100;
    };

    return (
        <section id="checkout" className="w-full bg-white py-20 px-4 md:px-8 border-t-2 border-black">
            <div className="w-full max-w-[600px] mx-auto bg-white rounded-xl shadow-hard border-2 border-black overflow-hidden">
                <div className="bg-black py-4 px-6 text-center">
                    <p className="text-white font-poppins font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                        <Lock size={14} className="text-brand-neon" />
                        Secure Encrypted Checkout
                    </p>
                </div>

                <div className="p-8 md:p-12">
                    {step === 1 ? (
                        <form onSubmit={startCheckout} className="space-y-6">
                            <div>
                                <label className="block font-poppins font-bold text-black mb-2 uppercase text-xs tracking-wider">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-4 rounded-sm border-2 border-black focus:bg-yellow-50 outline-none transition-all font-poppins text-black"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div>
                                <label className="block font-poppins font-bold text-black mb-2 uppercase text-xs tracking-wider">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-4 rounded-sm border-2 border-black focus:bg-yellow-50 outline-none transition-all font-poppins text-black"
                                    placeholder="name@example.com"
                                />
                            </div>

                            {/* BUMP 1 */}
                            <OrderBump
                                isSelected={hasOrderBump}
                                onToggle={() => setHasOrderBump(!hasOrderBump)}
                                title='Wait! Do you want "Hooks That Stop the Scroll"?'
                                description='Stop being ignored. Get my vault of high-converting headline frameworks and opening loops that force readers to stop scrolling and click your content instantly.'
                                price={LAUNCHLAB_BUMP_PRICE}
                                originalPriceValue={197}
                            />

                            {/* BUMP 2 */}
                            <OrderBump
                                isSelected={hasOrderBump2}
                                onToggle={() => setHasOrderBump2(!hasOrderBump2)}
                                title='Add "The 60-Minute Launch Calendar"?'
                                description='Get the exact day-by-day Notion templates I use to manage 6-figure launches without burnout. Includes email scheduling checklist.'
                                price={LAUNCHLAB_BUMP2_PRICE}
                                originalPriceValue={297}
                                highlightText="SPEED UP:"
                            />

                            <button
                                disabled={isInitializing}
                                className="w-full bg-brand-neon hover:bg-[#e6e200] text-black font-display font-bold text-xl py-3.5 rounded-sm border-2 border-black shadow-hard hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase tracking-wider"
                            >
                                {isInitializing ? 'Preparing...' : 'Next: Payment Details'}
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-dashed border-gray-200">
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase">Customer</p>
                                    <p className="font-bold text-black">{name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-500 text-xs font-bold uppercase">Total Due</p>
                                    <p className="font-display text-2xl text-black">${calculateTotal()}</p>
                                </div>
                            </div>

                            {clientSecret && leadId && (
                                <Elements stripe={stripePromise} options={{
                                    clientSecret, appearance: {
                                        theme: 'stripe',
                                        variables: {
                                            colorPrimary: '#000000',
                                            colorBackground: '#ffffff',
                                            colorText: '#000000',
                                            borderRadius: '2px',
                                        }
                                    }
                                }}>
                                    <CheckoutFormContent clientSecret={clientSecret} leadId={leadId} hasOrderBump={hasOrderBump} hasOrderBump2={hasOrderBump2} />
                                </Elements>
                            )}

                            <button
                                onClick={() => setStep(1)}
                                className="w-full text-gray-400 text-sm hover:text-black transition-colors py-2 font-medium"
                            >
                                ← Go Back to Details
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
