'use client';

import React, { useState } from 'react';
import { LeadForm } from '@/components/forms/LeadForm';
import type { Lead, ApiResponse, StripeCheckoutSession } from '@/types';

interface CheckoutFormWrapperProps {
  inline?: boolean;
}

/**
 * Wrapper component that uses LeadForm and handles the checkout flow.
 * Reusable anywhere you need lead collection → Stripe checkout.
 */
export const CheckoutFormWrapper: React.FC<CheckoutFormWrapperProps> = ({ inline = false }) => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLeadSuccess = async (leadData: Lead) => {
    setError(null);
    setIsProcessingPayment(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: leadData.id, variant: 'standard' }),
      });
      const result: ApiResponse<StripeCheckoutSession> = await response.json();
      if (result.success && result.data?.url) {
        window.location.href = result.data.url;
      } else {
        setError(result.error || 'Could not start checkout. Please try again.');
        setIsProcessingPayment(false);
      }
    } catch {
      setError('Network error. Please try again.');
      setIsProcessingPayment(false);
    }
  };

  const handleLeadError = (msg: string) => setError(msg);

  return (
    <div>
      <LeadForm onSuccess={handleLeadSuccess} onError={handleLeadError} inline={inline} />
      {isProcessingPayment && (
        <p className="mt-3 text-center text-sm text-slate-300">Redirecting to checkout…</p>
      )}
      {error && (
        <div className="mt-3 text-center text-sm text-rose-400">{error}</div>
      )}
    </div>
  );
};

