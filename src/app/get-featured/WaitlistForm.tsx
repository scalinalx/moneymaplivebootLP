'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { validateEmail, validateName } from '@/utils/validation';

export const WANTS_OPTIONS = [
  'Forbes or a business magazine',
  'A national newspaper',
  'A trade publication',
  'A podcast',
  "Someone else's newsletter",
  'Not sure yet',
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const w = (): any => window as any;

// The waitlist signup used twice on /get-featured (hero + yellow section).
// Name + email + an optional "where do you want to be featured" pick. On
// success it swaps in the "You're on the list" state inline, per the design.
export default function WaitlistForm({
  placement,
  buttonLabel,
  fine,
  stacked = false,
}: {
  placement: 'top' | 'bottom';
  buttonLabel: string;
  fine: string;
  stacked?: boolean;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [wants, setWants] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [formErr, setFormErr] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const formId = `get-featured-${placement}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim();
    const nBad = !validateName(n);
    const eBad = !validateEmail(em);
    setNameErr(nBad);
    setEmailErr(eBad);
    if (nBad || eBad) {
      setFormErr(nBad && eBad ? 'Your first name and a valid email, please.' : nBad ? 'Your first name, please.' : 'That email doesn’t look right.');
      return;
    }
    setFormErr(null);
    setSubmitting(true);
    try { w().__track?.formSubmit?.(formId); } catch {}
    try {
      const res = await fetch('/api/get-featured/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: n, email: em, wants: wants || null, placement }),
      });
      const result = await res.json();
      if (!result.success) {
        setFormErr(result.error || 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }
      try { w().__track?.formSuccess?.(formId); } catch {}
      try { w().fbq?.('track', 'Lead'); } catch {}
      setDone(true);
    } catch {
      setFormErr('Network error. Please try again.');
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="gf-form" role="status">
        <div className="gf-done-title">You&apos;re on the list.</div>
        <p className="gf-done-sub">You&apos;ll hear from me 48 hours before anyone else.</p>
      </div>
    );
  }

  const nameInput = (
    <input
      className={'gf-input' + (nameErr ? ' gf-input--err' : '')}
      placeholder="Your first name"
      autoComplete="given-name"
      value={name}
      onChange={(e) => { setName(e.target.value); if (nameErr) setNameErr(false); }}
      disabled={submitting}
      aria-label="Your first name"
    />
  );
  const emailInput = (
    <input
      className={'gf-input' + (emailErr ? ' gf-input--err' : '')}
      type="email"
      inputMode="email"
      placeholder="you@email.com"
      autoComplete="email"
      value={email}
      onChange={(e) => { setEmail(e.target.value); if (emailErr) setEmailErr(false); }}
      disabled={submitting}
      aria-label="Your email"
    />
  );

  return (
    <form className="gf-form" onSubmit={submit} data-track-form={formId} noValidate>
      {formErr && <div className="gf-form-err">{formErr}</div>}
      {stacked ? (
        <>
          {nameInput}
          {emailInput}
        </>
      ) : (
        <div className="gf-form-row">
          {nameInput}
          {emailInput}
        </div>
      )}
      <span className="gf-select-wrap">
        <select className="gf-select" value={wants} onChange={(e) => setWants(e.target.value)} disabled={submitting} aria-label="Where do you most want to be featured?">
          <option value="">Where do you most want to be featured?</option>
          {WANTS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={18} />
      </span>
      <button type="submit" className="gf-btn gf-btn--accent gf-btn--l gf-btn--full" disabled={submitting}>
        {submitting ? 'One moment…' : <>{buttonLabel} <ArrowRight size={20} /></>}
      </button>
      <p className="gf-form-fine">{fine}</p>
    </form>
  );
}
