'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CheckCircle2, Lock, Shield, AlertCircle, Calendar, Video, Star } from 'lucide-react';
import { OFFER_CLARITY_COACHING_PRICE, OFFER_CLARITY_COACHING_RETAIL_PRICE } from '@/lib/stripe';
import { PurchaseNotification } from '@/components/PurchaseNotification';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Lead {
  id: string;
  name: string | null;
  email: string;
  is_paid: boolean;
  has_coaching_upsell: boolean;
}

function FallbackCheckoutForm({
  clientSecret,
  leadId,
  paymentIntentId,
}: {
  clientSecret: string;
  leadId: string;
  paymentIntentId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessing(true);
    setError(null);

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/offer-clarity-success?leadId=${leadId}&coaching=1`,
      },
      redirect: 'if_required',
    });

    if (confirmError) {
      setError(confirmError.message || 'An error occurred.');
      setIsProcessing(false);
      return;
    }
    if (paymentIntent?.status === 'succeeded') {
      await fetch('/api/offer-clarity/coaching-upsell/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, paymentIntentId }),
      });
      window.location.href = `/offer-clarity-success?leadId=${leadId}&coaching=1`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement options={{ layout: 'tabs' }} />
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}
      <button
        type="submit"
        disabled={isProcessing || !stripe}
        className="w-full bg-[#9E8B52] hover:bg-[#8a7a47] text-white font-bold text-xl py-5 rounded-md uppercase tracking-wider transition-all hover:-translate-y-1 disabled:opacity-70"
        style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
      >
        {isProcessing
          ? 'Processing…'
          : `YES — ADD MY COACHING CALL — $${OFFER_CLARITY_COACHING_PRICE / 100} (was $${OFFER_CLARITY_COACHING_RETAIL_PRICE / 100})`}
      </button>
    </form>
  );
}

function CoachingUpsellInner() {
  const searchParams = useSearchParams();
  const leadId = searchParams.get('leadId') || '';

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fallback flow: if one-click fails (no saved card), collect details inline.
  const [fallbackClientSecret, setFallbackClientSecret] = useState<string | null>(null);
  const [fallbackPaymentIntentId, setFallbackPaymentIntentId] = useState<string | null>(null);

  useEffect(() => {
    if (!leadId) {
      setLoading(false);
      setError('Missing leadId');
      return;
    }
    fetch(`/api/offer-clarity/get-lead-status?leadId=${leadId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setLead(d.lead);
          if (d.lead.has_coaching_upsell) setPurchased(true);
        } else {
          setError(d.error || 'Lead not found');
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [leadId]);

  const oneClickAdd = async () => {
    if (!leadId) return;
    setPurchasing(true);
    setError(null);
    try {
      const res = await fetch('/api/offer-clarity/coaching-upsell/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error || 'Could not initialize purchase');
        setPurchasing(false);
        return;
      }
      if (data.oneClick) {
        setPurchased(true);
        setPurchasing(false);
        // Auto-redirect to success after a short delay
        setTimeout(() => {
          window.location.href = `/offer-clarity-success?leadId=${leadId}&coaching=1`;
        }, 1200);
      } else {
        setFallbackClientSecret(data.clientSecret);
        setFallbackPaymentIntentId(data.paymentIntentId);
        setPurchasing(false);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Purchase failed';
      setError(msg);
      setPurchasing(false);
    }
  };

  const declineAndContinue = () => {
    window.location.href = `/offer-clarity-success?leadId=${leadId || ''}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf7f0] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading…</p>
      </div>
    );
  }

  if (error && !lead) {
    return (
      <div className="min-h-screen bg-[#faf7f0] flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow p-8 max-w-md text-center">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={32} />
          <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf7f0]" style={{ fontFamily: 'Lora, Georgia, serif' }}>
      {/* Top success bar */}
      <div className="bg-emerald-600 text-white py-3 text-center">
        <p
          className="text-xs md:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          <CheckCircle2 size={16} /> Payment received — your Offer Clarity Sprint access is on its way
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
          <span
            className="text-xs font-extrabold uppercase tracking-widest text-[#9E8B52]"
            style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
          >
            One-Time Offer · This page only
          </span>
          <span
            className="text-xs font-extrabold uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-1 rounded-full"
            style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
          >
            Save ${(OFFER_CLARITY_COACHING_RETAIL_PRICE - OFFER_CLARITY_COACHING_PRICE) / 100}
          </span>
        </div>
        <h1
          className="text-3xl md:text-5xl font-extrabold text-center leading-tight mb-4 text-emerald-600"
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          Want to make sure your offer{' '}
          <span className="text-[#9E8B52]">actually sells?</span>
        </h1>
        <p className="text-center text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-10">
          Add a private 60-minute 1:1 with Ana. We&apos;ll review your offer line-by-line, fix the
          weak spots, and pressure-test your pricing before you launch.
        </p>

        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
          <div className="bg-[#1a1a1a] py-4 px-6 flex items-center justify-between">
            <p
              className="text-white font-bold text-xs md:text-sm uppercase tracking-widest"
              style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
            >
              1:1 Coaching with Ana
            </p>
            <div className="flex items-baseline gap-2">
              <span
                className="text-gray-500 line-through text-base"
                style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
              >
                ${OFFER_CLARITY_COACHING_RETAIL_PRICE / 100}
              </span>
              <span
                className="text-[#c9b67e] font-extrabold text-2xl md:text-3xl"
                style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
              >
                ${OFFER_CLARITY_COACHING_PRICE / 100}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-10 space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="text-center bg-[#FFFBEB] rounded-xl p-4 border border-[#9E8B52]/20">
                <Calendar className="text-[#9E8B52] mx-auto mb-2" size={22} />
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Duration</p>
                <p
                  className="font-extrabold text-[#1a1a1a]"
                  style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                >
                  60 minutes
                </p>
              </div>
              <div className="text-center bg-[#FFFBEB] rounded-xl p-4 border border-[#9E8B52]/20">
                <Video className="text-[#9E8B52] mx-auto mb-2" size={22} />
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Format</p>
                <p
                  className="font-extrabold text-[#1a1a1a]"
                  style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                >
                  Private Zoom
                </p>
              </div>
              <div className="text-center bg-[#FFFBEB] rounded-xl p-4 border border-[#9E8B52]/20">
                <Star className="text-[#9E8B52] mx-auto mb-2" size={22} />
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Recording</p>
                <p
                  className="font-extrabold text-[#1a1a1a]"
                  style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                >
                  Yours forever
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {[
                'Line-by-line review of your offer copy and positioning',
                'A pricing pressure-test using my "Perceived Value Stack"',
                'A custom 3-email launch plan tailored to your audience',
                'Direct answers to the messy questions only you have',
                'Recording of the call so you can rewatch and implement',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-base md:text-lg text-[#1a1a1a]">{item}</span>
                </li>
              ))}
            </ul>

            {purchased ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
                <CheckCircle2 className="text-emerald-600 mx-auto mb-2" size={28} />
                <p
                  className="font-extrabold text-emerald-800 mb-1"
                  style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                >
                  Coaching call added! Redirecting…
                </p>
                <p className="text-sm text-emerald-700">
                  Booking link will arrive in your email.
                </p>
              </div>
            ) : fallbackClientSecret && fallbackPaymentIntentId ? (
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600 italic text-center">
                  Just confirm your card to add the coaching call.
                </p>
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret: fallbackClientSecret,
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
                  <FallbackCheckoutForm
                    clientSecret={fallbackClientSecret}
                    leadId={leadId}
                    paymentIntentId={fallbackPaymentIntentId}
                  />
                </Elements>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}
                <button
                  type="button"
                  onClick={oneClickAdd}
                  disabled={purchasing}
                  className="w-full bg-[#9E8B52] hover:bg-[#8a7a47] text-white font-bold text-lg md:text-xl py-5 rounded-md uppercase tracking-wider transition-all hover:-translate-y-1 disabled:opacity-70"
                  style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                >
                  {purchasing
                    ? 'Adding…'
                    : `YES — ADD MY 1:1 COACHING CALL — $${OFFER_CLARITY_COACHING_PRICE / 100} (was $${OFFER_CLARITY_COACHING_RETAIL_PRICE / 100})`}
                </button>
                <p className="text-xs text-gray-500 text-center">
                  Charged to the same card you used a moment ago. No re-entering details.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={declineAndContinue}
              className="w-full text-gray-400 text-sm hover:text-gray-600 transition-colors pt-2"
            >
              No thanks, take me to my course →
            </button>

            <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1 text-gray-500 text-xs">
                <Lock size={12} className="text-emerald-600" />
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-xs">
                <Shield size={12} className="text-emerald-600" />
                <span>Powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-8 max-w-2xl mx-auto leading-relaxed">
          This 1:1 call is offered at this price <em>only on this page</em>. After you leave, the
          standard rate applies. By adding this you agree the call is non-refundable once booked.
        </p>
      </div>
    </main>
  );
}

export default function OfferClarityCoachingUpsellPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf7f0] flex items-center justify-center">
          <p className="text-gray-500 text-lg">Loading…</p>
        </div>
      }
    >
      <CoachingUpsellInner />
      <PurchaseNotification />
    </Suspense>
  );
}
