'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Lock, Shield, AlertCircle } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const WAITLIST_URL = 'https://substackulous.kit.com/6figurebootcamp-waitlist';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const w = (): any => window as any;

function PaymentForm({ leadId, priceLabel, urgency }: { leadId: string | null; priceLabel: string; urgency?: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setError(null);

    const successUrl = `${window.location.origin}/bootcamp-success?leadId=${leadId ?? ''}&success=true`;
    const { error: err, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: successUrl },
      redirect: 'if_required',
    });

    if (err) {
      try { w().__track?.checkoutStep?.('payment_error', 'bootcamp-checkout'); } catch {}
      setError(err.message || 'Something went wrong with your payment.');
      setProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      try { w().__track?.formSuccess?.('bootcamp-checkout'); } catch {}
      // Mark the lead paid immediately (webhook is the backstop).
      try {
        await fetch('/api/bootcamp/confirm-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ leadId, paymentIntentId: paymentIntent.id }),
        });
      } catch { /* webhook will reconcile */ }
      window.location.href = successUrl;
    }
  };

  return (
    <form onSubmit={submit} className="co-pay-wrap">
      <PaymentElement options={{ layout: 'tabs' }} />
      {error && <div className="co-err"><AlertCircle size={15} style={{ verticalAlign: '-3px', marginRight: 6 }} />{error}</div>}
      <button className="co-btn" style={{ marginTop: 20 }} disabled={processing || !stripe}>
        {processing ? 'Processing…' : `COMPLETE MY ENROLLMENT — ${priceLabel}`}
      </button>
      {urgency && <p className="co-urgency">{urgency}</p>}
      <div className="co-badges">
        <span><Lock size={12} style={{ verticalAlign: '-2px', marginRight: 5 }} />256-bit Secure SSL Connection</span>
        <span><Shield size={12} style={{ verticalAlign: '-2px', marginRight: 5 }} />Secure payments powered by Stripe.</span>
      </div>
    </form>
  );
}

export default function EmbeddedCheckout({ price, closed, urgency }: { price: string; closed: boolean; urgency?: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const start = async (e: React.FormEvent) => {
    e.preventDefault();
    setInitializing(true);
    setError(null);
    try {
      const res = await fetch('/api/bootcamp/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (data.success) {
        try {
          if (w().fbq) w().fbq('track', 'Lead', { value: 5.0, currency: 'USD' });
          w().__track?.checkoutStep?.('payment_step', 'bootcamp-checkout');
        } catch {}
        setLeadId(data.leadId ?? null);
        setClientSecret(data.clientSecret);
      } else {
        setError(data.error || 'Could not start checkout. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setInitializing(false);
    }
  };

  if (closed) {
    return (
      <a className="btn" href={WAITLIST_URL}>JOIN THE WAITLIST FOR THE NEXT COHORT →</a>
    );
  }

  return (
    <div className="co-card">
      <div className="co-head"><Lock size={13} style={{ verticalAlign: '-2px', marginRight: 6 }} />Secure Encrypted Checkout</div>
      <div className="co-body">
        {!clientSecret ? (
          <form onSubmit={start} data-track-form="bootcamp-checkout">
            <label className="co-label">Full name</label>
            <input className="co-input" required type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
            <label className="co-label">Email address</label>
            <input className="co-input" required type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
            {error && <div className="co-err" style={{ marginBottom: 12 }}>{error}</div>}
            <button className="co-btn" disabled={initializing}>
              {initializing ? 'Starting…' : `YES, RESERVE MY SEAT — ${price}`}
            </button>
            {urgency && <p className="co-urgency">{urgency}</p>}
          </form>
        ) : (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance: { theme: 'stripe', variables: { colorPrimary: '#F4442E', borderRadius: '10px' } } }}
          >
            <PaymentForm leadId={leadId} priceLabel={price} urgency={urgency} />
          </Elements>
        )}
      </div>
    </div>
  );
}
