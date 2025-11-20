'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

type WaitlistVariant = 'hero' | 'footer';

export const WaitlistForm: React.FC<{
  variant?: WaitlistVariant;
  requireName?: boolean;
  inline?: boolean;
}> = ({
  variant = 'hero',
  requireName = false,
  inline = false,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  );
  const [error, setError] = useState<string | null>(null);
  const [referralId, setReferralId] = useState<string | null>(null);

  useEffect(() => {
    const captureReferral = () => {
      if (typeof window !== 'undefined' && window.rewardful) {
        window.rewardful('ready', () => {
          if (window.Rewardful?.referral) {
            setReferralId(window.Rewardful.referral);
          }
        });
      }
    };
    captureReferral();
    const timeout = setTimeout(captureReferral, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (requireName && !name.trim()) {
      setError('Name is required');
      return;
    }
    if (!email) {
      setError('Email is required');
      return;
    }
    setStatus('loading');
    try {
      const payload: Record<string, string> = {
        email,
      };
      if (requireName) {
        payload.name = name.trim();
      }
      if (referralId) {
        payload.referralId = referralId;
      }

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || 'Failed to submit');
      }
      setStatus('success');
      window.location.href = '/thankyou';
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to submit';
      setError(message);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-6 bg-brand-lime/10 border border-brand-lime/20 rounded-none text-center animate-in fade-in zoom-in duration-300">
        <CheckCircle2 className="w-12 h-12 text-brand-lime mx-auto mb-3" />
        <h3 className="text-xl font-display font-bold text-white mb-1">You're on the list.</h3>
        <p className="text-brand-grey">We'll notify you when doors open.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full flex ${inline ? 'flex-col md:flex-row md:items-center md:gap-3' : 'flex-col'} gap-4`}
    >
      {requireName && (
        <div className="relative group">
          <input
            type="text"
            placeholder="Enter your full name..."
            className={`w-full px-6 py-4 bg-brand-950 border border-white/40 text-white placeholder-white/50 focus:outline-none focus:border-brand-lime focus:ring-1 focus:ring-brand-lime transition-all text-lg font-light rounded-none ${inline ? 'md:flex-1' : ''}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}
      <div className="relative group">
        <input
          type="email"
          placeholder="Enter your email address..."
          className={`w-full px-6 py-4 bg-brand-950 border border-white/40 text-white placeholder-white/50 focus:outline-none focus:border-brand-lime focus:ring-1 focus:ring-brand-lime transition-all text-lg font-light rounded-none ${inline ? 'md:flex-1' : ''}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
      <Button
        type="submit"
        fullWidth
        isLoading={status === 'loading'}
        className={inline ? 'md:w-auto' : '!w-full'}
      >
        JOIN THE WAITLIST <ArrowRight className="w-5 h-5" />
      </Button>
      
      {variant === 'hero' && (
        <p className="text-center text-xs text-brand-grey mt-2 uppercase tracking-wide">
          
        </p>
      )}
    </form>
  );
};
