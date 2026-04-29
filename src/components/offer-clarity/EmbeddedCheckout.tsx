'use client';

import React, { useState, useMemo } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  OFFER_CLARITY_PRICE,
  OFFER_CLARITY_BUMP_LAUNCH_STACK_PRICE,
  OFFER_CLARITY_BUMP_HOOKS_PRICE,
  OFFER_CLARITY_BUMP_OFFER_GENIUS_PRICE,
  OFFER_CLARITY_BUMP_BUNDLE_PRICE,
} from '@/lib/stripe';
import { Shield, Lock, AlertCircle } from 'lucide-react';
import { OrderBump } from './OrderBump';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const BUMP_LAUNCH_STACK_RETAIL = 9700; // $97 retail
const BUMP_HOOKS_RETAIL = 4700; // $47 retail
const BUMP_OFFER_GENIUS_RETAIL = 4700; // $47 retail
const BUMP_BUNDLE_INDIVIDUAL_TOTAL =
  OFFER_CLARITY_BUMP_LAUNCH_STACK_PRICE +
  OFFER_CLARITY_BUMP_HOOKS_PRICE +
  OFFER_CLARITY_BUMP_OFFER_GENIUS_PRICE; // before bundle discount

interface CheckoutFormProps {
  customerName: string;
  total: number;
  leadId: string;
}

const CheckoutFormContent: React.FC<CheckoutFormProps> = ({ customerName, total, leadId }) => {
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
        return_url: `${window.location.origin}/offer-clarity-coaching-upsell?leadId=${leadId}`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      await fetch('/api/offer-clarity/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, paymentIntentId: paymentIntent.id }),
      });
      window.location.href = `/offer-clarity-coaching-upsell?leadId=${leadId}`;
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
        className={`w-full mt-8 bg-[#9E8B52] hover:bg-[#8a7a47] text-white font-bold text-xl py-5 rounded-md shadow-lg transition-all transform hover:-translate-y-1 uppercase tracking-wider ${
          isProcessing ? 'opacity-70 cursor-not-allowed' : ''
        }`}
        style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
      >
        {isProcessing ? 'Processing…' : `GET ACCESS NOW — $${total / 100}`}
      </button>

      {customerName && (
        <p className="mt-3 text-xs text-gray-500 text-center">
          Charging the card belonging to{' '}
          <span className="font-bold text-gray-700">{customerName}</span>.
        </p>
      )}

      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <Lock size={12} className="text-emerald-600" />
          <span>256-bit Secure SSL Connection</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-xs text-center">
          <Shield size={12} className="text-emerald-600" />
          <span>
            Secure payments powered by Stripe. Your card data is encrypted and sent directly to
            Stripe.
          </span>
        </div>
      </div>
    </form>
  );
};

export const EmbeddedCheckout: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [bumpLaunchStack, setBumpLaunchStack] = useState(false);
  const [bumpHooks, setBumpHooks] = useState(false);
  const [bumpOfferGenius, setBumpOfferGenius] = useState(false);
  const [bumpBundle, setBumpBundle] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Bundle covers all 3 — auto-mark them so the user sees what they get,
  // and de-select the bundle if they pick fewer than all 3 individually.
  const total = useMemo(() => {
    let bumps = 0;
    if (bumpBundle) {
      bumps = OFFER_CLARITY_BUMP_BUNDLE_PRICE;
    } else {
      if (bumpLaunchStack) bumps += OFFER_CLARITY_BUMP_LAUNCH_STACK_PRICE;
      if (bumpHooks) bumps += OFFER_CLARITY_BUMP_HOOKS_PRICE;
      if (bumpOfferGenius) bumps += OFFER_CLARITY_BUMP_OFFER_GENIUS_PRICE;
    }
    return OFFER_CLARITY_PRICE + bumps;
  }, [bumpBundle, bumpLaunchStack, bumpHooks, bumpOfferGenius]);

  const toggleBundle = () => {
    const next = !bumpBundle;
    setBumpBundle(next);
    if (next) {
      setBumpLaunchStack(false);
      setBumpHooks(false);
      setBumpOfferGenius(false);
    }
  };

  const startCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsInitializing(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/offer-clarity/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          hasBumpLaunchStack: bumpLaunchStack,
          hasBumpHooks: bumpHooks,
          hasBumpOfferGenius: bumpOfferGenius,
          hasBumpBundle: bumpBundle,
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        }),
      });

      const data = await response.json();
      if (data.success) {
        if (typeof window !== 'undefined' && (window as { fbq?: (...args: unknown[]) => void }).fbq) {
          (window as { fbq?: (...args: unknown[]) => void }).fbq?.('track', 'Lead', {
            value: 2.0,
            currency: 'USD',
          });
        }
        setClientSecret(data.clientSecret);
        setLeadId(data.leadId);
        setStep(2);
      } else {
        setErrorMessage(data.error || 'Failed to start checkout');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <section id="checkout-section" className="bg-[#faf7f0] py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-6">
        <h2
          className="text-3xl md:text-5xl font-extrabold text-center mb-3 leading-tight"
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          Get Instant Access
        </h2>
        <p
          className="text-base md:text-lg italic text-gray-600 text-center mb-10"
          style={{ fontFamily: 'Lora, Georgia, serif' }}
        >
          One clear offer. The wait is finally over.
        </p>

        <div className="w-full max-w-[640px] mx-auto bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
          <div className="bg-[#1a1a1a] py-4 px-6 text-center">
            <p
              className="text-white font-bold text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-2"
              style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
            >
              <Lock size={14} className="text-[#c9b67e]" />
              Secure 256-Bit Encrypted Checkout
            </p>
          </div>

          <div className="p-6 md:p-10">
            {step === 1 ? (
              <form onSubmit={startCheckout} className="space-y-5">
                {/* Header summary */}
                <div className="flex items-baseline justify-between mb-2">
                  <p
                    className="text-xs font-extrabold uppercase tracking-widest text-gray-500"
                    style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                  >
                    The Offer Clarity Sprint
                  </p>
                  <p
                    className="text-3xl font-extrabold text-[#9E8B52]"
                    style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                  >
                    ${OFFER_CLARITY_PRICE / 100}
                  </p>
                </div>

                <div>
                  <label
                    className="block font-bold text-[#1a1a1a] mb-2 uppercase text-xs tracking-wider"
                    style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                  >
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-4 rounded-lg border border-gray-200 focus:border-[#9E8B52] focus:ring-2 focus:ring-[#9E8B52]/15 outline-none transition-all text-black"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label
                    className="block font-bold text-[#1a1a1a] mb-2 uppercase text-xs tracking-wider"
                    style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                  >
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-4 rounded-lg border border-gray-200 focus:border-[#9E8B52] focus:ring-2 focus:ring-[#9E8B52]/15 outline-none transition-all text-black"
                    placeholder="name@example.com"
                  />
                </div>

                {/* Order bumps */}
                <div className="pt-4 mt-2 border-t border-gray-100">
                  <p
                    className="text-xs font-extrabold uppercase tracking-widest text-gray-500 mb-4"
                    style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                  >
                    Add ons — one-time offer at this price
                  </p>

                  <div className="space-y-4">
                    {/* Bundle (highlighted) */}
                    <OrderBump
                      isSelected={bumpBundle}
                      onToggle={toggleBundle}
                      highlight
                      badge="Best value"
                      title="All 3 Add-ons Bundle"
                      description="Launch Stack + Hooks That Stop The Scroll + Offer Genius — every add-on, lowest price."
                      price={OFFER_CLARITY_BUMP_BUNDLE_PRICE}
                      originalPrice={BUMP_BUNDLE_INDIVIDUAL_TOTAL}
                    />

                    <OrderBump
                      isSelected={bumpBundle || bumpLaunchStack}
                      disabled={bumpBundle}
                      onToggle={() => setBumpLaunchStack((v) => !v)}
                      title="Launch Stack"
                      description="The plug-and-play launch system — email scripts, Notion templates, and a 7-day rollout calendar."
                      price={OFFER_CLARITY_BUMP_LAUNCH_STACK_PRICE}
                      originalPrice={BUMP_LAUNCH_STACK_RETAIL}
                    />

                    <OrderBump
                      isSelected={bumpBundle || bumpHooks}
                      disabled={bumpBundle}
                      onToggle={() => setBumpHooks((v) => !v)}
                      title="Hooks That Stop The Scroll"
                      description="My vault of high-converting headlines and opening lines that force readers to stop, click, and read."
                      price={OFFER_CLARITY_BUMP_HOOKS_PRICE}
                      originalPrice={BUMP_HOOKS_RETAIL}
                    />

                    <OrderBump
                      isSelected={bumpBundle || bumpOfferGenius}
                      disabled={bumpBundle}
                      onToggle={() => setBumpOfferGenius((v) => !v)}
                      title="Offer Genius"
                      description="The AI-powered idea engine that generates 50 niche-specific offer angles in 60 seconds."
                      price={OFFER_CLARITY_BUMP_OFFER_GENIUS_PRICE}
                      originalPrice={BUMP_OFFER_GENIUS_RETAIL}
                    />
                  </div>
                </div>

                {/* Running total */}
                <div className="pt-5 mt-3 border-t border-gray-100 flex items-baseline justify-between">
                  <span
                    className="text-sm font-bold uppercase tracking-widest text-gray-500"
                    style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                  >
                    Total today
                  </span>
                  <span
                    className="text-3xl font-extrabold text-[#1a1a1a]"
                    style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                  >
                    ${total / 100}
                  </span>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm font-medium">
                    <AlertCircle size={16} />
                    {errorMessage}
                  </div>
                )}

                <button
                  disabled={isInitializing}
                  className="w-full bg-[#9E8B52] hover:bg-[#8a7a47] text-white font-bold text-xl py-5 rounded-md shadow-lg transition-all transform hover:-translate-y-1 uppercase tracking-wider disabled:opacity-70"
                  style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                >
                  {isInitializing ? 'Preparing…' : 'Next: Payment Details'}
                </button>
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
                    <p
                      className="text-2xl text-[#9E8B52] font-extrabold"
                      style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                    >
                      ${total / 100}
                    </p>
                  </div>
                </div>

                {clientSecret && leadId && (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: 'stripe',
                        variables: {
                          colorPrimary: '#9E8B52',
                          colorBackground: '#ffffff',
                          colorText: '#1a1a1a',
                          borderRadius: '8px',
                        },
                      },
                    }}
                  >
                    <CheckoutFormContent customerName={name} total={total} leadId={leadId} />
                  </Elements>
                )}

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-gray-400 text-sm hover:text-gray-600 transition-colors py-2"
                >
                  Go Back to Details
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
