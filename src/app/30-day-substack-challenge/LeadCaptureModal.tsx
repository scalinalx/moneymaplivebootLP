'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { validateEmail, validateName } from '@/utils/validation';

export type ChallengeTier = 'challenge' | 'challenge_1on1';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const w = (): any => window as any;

// Same two-field lead capture we use on the workshop/webinar pages (name +
// email, validated the same way), but with no Stripe step: once the lead is
// recorded we send the visitor straight to the Circle checkout.
export default function LeadCaptureModal({
  tier,
  priceLabel,
  checkoutUrl,
  onClose,
}: {
  tier: ChallengeTier;
  priceLabel: string;
  checkoutUrl: string;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameErr, setNameErr] = useState<string | null>(null);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [formErr, setFormErr] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
    try { w().__track?.formStart?.('substack-challenge-lead'); } catch {}
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !redirecting) onClose(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose, redirecting]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim();
    const nErr = validateName(n) ? null : 'Name must be at least 2 characters';
    const eErr = validateEmail(em) ? null : 'Please enter a valid email address';
    setNameErr(nErr);
    setEmailErr(eErr);
    if (nErr || eErr) return;

    setSubmitting(true);
    setFormErr(null);
    try { w().__track?.formSubmit?.('substack-challenge-lead'); } catch {}
    try {
      const res = await fetch('/api/substack-challenge/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: n, email: em, tier }),
      });
      const result = await res.json();
      if (!result.success) {
        setFormErr(result.error || 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }
      try { w().__track?.formSuccess?.('substack-challenge-lead'); } catch {}
      try { w().fbq?.('track', 'Lead'); } catch {}
      setRedirecting(true);
      window.location.href = checkoutUrl;
    } catch {
      setFormErr('Network error. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="sc30-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget && !redirecting) onClose(); }}>
      <div className="sc30-modal" role="dialog" aria-modal="true" aria-labelledby="sc30-modal-title">
        {!redirecting && (
          <button type="button" className="sc30-modal-close" aria-label="Close" onClick={onClose}>
            <X size={18} />
          </button>
        )}
        <div className="sc30-eyebrow">30-Day Substack Challenge · {priceLabel}</div>
        <h2 id="sc30-modal-title">
          {redirecting ? <>Taking you to <em>checkout.</em></> : <>One step, then <em>checkout.</em></>}
        </h2>
        <p className="sc30-modal-sub">
          {redirecting
            ? 'Hold on a second.'
            : 'Your name and email, so I know who is in the room. Then you pay on the next page.'}
        </p>

        {!redirecting && (
          <form onSubmit={submit} data-track-form="substack-challenge-lead" noValidate>
            {formErr && <div className="sc30-form-err">{formErr}</div>}
            <div className="sc30-field">
              <label htmlFor="sc30-name">Full name</label>
              <input
                ref={nameRef}
                id="sc30-name"
                name="name"
                className={'sc30-input' + (nameErr ? ' sc30-input--err' : '')}
                placeholder="Your name"
                autoComplete="name"
                value={name}
                onChange={(e) => { setName(e.target.value); if (nameErr) setNameErr(null); }}
                disabled={submitting}
                required
              />
              {nameErr && <div className="sc30-field-err">{nameErr}</div>}
            </div>
            <div className="sc30-field">
              <label htmlFor="sc30-email">Email</label>
              <input
                id="sc30-email"
                name="email"
                type="email"
                className={'sc30-input' + (emailErr ? ' sc30-input--err' : '')}
                placeholder="you@example.com"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (emailErr) setEmailErr(null); }}
                disabled={submitting}
                required
              />
              {emailErr && <div className="sc30-field-err">{emailErr}</div>}
            </div>
            <button type="submit" className="sc30-btn sc30-btn--accent sc30-btn--l sc30-btn--full" disabled={submitting}>
              {submitting ? 'One moment…' : <>continue to checkout <ArrowRight size={20} /></>}
            </button>
            <p className="sc30-modal-fine">Secure payment on the next page. No spam, ever.</p>
          </form>
        )}
      </div>
    </div>
  );
}
