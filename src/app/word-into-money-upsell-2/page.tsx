'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AlertCircle, Shield, Lock, CheckCircle, Zap } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function PaymentForm({ clientSecret, leadId, wimLeadId }: { clientSecret: string; leadId: string; wimLeadId: string }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setIsProcessing(true);
        setErrorMessage(null);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: `${window.location.origin}/word-into-money-upsell-3?leadId=${wimLeadId}` },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message || 'An error occurred.');
            setIsProcessing(false);
        } else if (paymentIntent?.status === 'succeeded') {
            await fetch('/api/word-into-money/upsell-2/confirm-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadId, paymentIntentId: paymentIntent.id, wimLeadId }),
            });
            window.location.href = `/word-into-money-upsell-3?leadId=${wimLeadId}`;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement options={{ layout: 'tabs' }} />
            {errorMessage && (
                <div className="mt-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={16} /> {errorMessage}
                </div>
            )}
            <button disabled={isProcessing || !stripe} className={`w-full mt-6 bg-brand-lime hover:bg-brand-limeDim text-brand-950 font-anton text-xl py-5 rounded-xl uppercase ${isProcessing ? 'opacity-70' : ''}`}>
                {isProcessing ? 'Processing...' : 'JOIN THE 10K LAUNCH LAB — $597'}
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-brand-grey text-xs">
                <Shield size={12} className="text-brand-lime" /> Secure payments powered by Stripe
            </div>
        </form>
    );
}

function Upsell2Content() {
    const searchParams = useSearchParams();
    const wimLeadId = searchParams.get('leadId') || '';
    const [step, setStep] = useState<'info' | 'payment'>('info');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [upsellLeadId, setUpsellLeadId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (wimLeadId && wimLeadId !== 'TEST') {
            fetch(`/api/word-into-money/get-lead-status?leadId=${wimLeadId}`)
                .then(r => r.json())
                .then(d => { if (d.success) { setEmail(d.lead.email); setName(d.lead.name); } });
        }
    }, [wimLeadId]);

    const startPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch('/api/word-into-money/upsell-2/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, wimLeadId }),
            });
            const data = await res.json();
            if (data.success) {
                setClientSecret(data.clientSecret);
                setUpsellLeadId(data.leadId);
                setStep('payment');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-950">
            <div className="max-w-[620px] mx-auto px-4 py-12">
                <div className="text-center mb-10">
                    <p className="text-brand-lime text-xs font-bold uppercase tracking-widest mb-3">Upsell 2 of 3 — Scale Your Income</p>
                    <h1 className="font-anton text-3xl md:text-5xl text-brand-white uppercase mb-4">The $10K Launch Lab</h1>
                    <p className="font-lora text-lg text-brand-grey max-w-md mx-auto">
                        Ready to go bigger? This is the complete system for consistent $10K launches. The full program.
                    </p>
                </div>

                <div className="space-y-4 mb-10">
                    {['Complete launch system from $0 to $10K', 'The $100K Roadmap & templates', 'Launch email sequences & swipe files', 'Community access with other launchers', 'Templates, tools & lifetime updates'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-brand-900 border border-brand-800 rounded-xl p-4">
                            <Zap size={18} className="text-brand-lime flex-shrink-0" />
                            <span className="text-brand-white text-sm font-lora">{item}</span>
                        </div>
                    ))}
                </div>

                <div className="bg-brand-900 border border-brand-800 rounded-2xl overflow-hidden">
                    <div className="bg-brand-800 py-3 px-6 text-center">
                        <p className="text-brand-white font-montserrat font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                            <Lock size={14} className="text-brand-lime" /> Secure Checkout
                        </p>
                    </div>
                    <div className="p-6 md:p-8">
                        {step === 'info' ? (
                            <form onSubmit={startPayment} className="space-y-4">
                                <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className="w-full px-4 py-4 rounded-lg bg-brand-950 border border-brand-800 focus:border-brand-lime outline-none text-brand-white placeholder-brand-grey font-lato" />
                                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-4 rounded-lg bg-brand-950 border border-brand-800 focus:border-brand-lime outline-none text-brand-white placeholder-brand-grey font-lato" />
                                <button disabled={isLoading} className="w-full bg-brand-lime hover:bg-brand-limeDim text-brand-950 font-anton text-xl py-5 rounded-xl uppercase">
                                    {isLoading ? 'Preparing...' : 'CONTINUE TO PAYMENT — $597'}
                                </button>
                            </form>
                        ) : clientSecret && upsellLeadId ? (
                            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night', variables: { colorPrimary: '#ffd200', colorBackground: '#0a0a0a', colorText: '#ededed', borderRadius: '8px' } } }}>
                                <PaymentForm clientSecret={clientSecret} leadId={upsellLeadId} wimLeadId={wimLeadId} />
                            </Elements>
                        ) : null}
                    </div>
                </div>

                <div className="text-center mt-6">
                    <a href={`/word-into-money-upsell-3?leadId=${wimLeadId}`} className="text-brand-grey text-sm hover:text-brand-white transition-colors">
                        No thanks, skip to next offer →
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function Upsell2Page() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-brand-950 text-brand-grey">Loading...</div>}>
            <Upsell2Content />
        </Suspense>
    );
}
