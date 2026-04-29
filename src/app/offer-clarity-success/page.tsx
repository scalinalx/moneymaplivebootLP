'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Mail, BookOpen, Sparkles, Calendar } from 'lucide-react';

interface Lead {
  id: string;
  name: string | null;
  email: string;
  is_paid: boolean;
  has_bump_launch_stack: boolean;
  has_bump_hooks: boolean;
  has_bump_offer_genius: boolean;
  has_bump_bundle: boolean;
  has_coaching_upsell: boolean;
  total_paid_cents: number;
  payment_completed_at: string | null;
}

function SuccessInner() {
  const searchParams = useSearchParams();
  const leadId = searchParams.get('leadId') || '';
  const fromCoaching = searchParams.get('coaching') === '1';

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!leadId) {
      setLoading(false);
      return;
    }
    fetch(`/api/offer-clarity/get-lead-status?leadId=${leadId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setLead(d.lead);
      })
      .finally(() => setLoading(false));
  }, [leadId]);

  // Fire purchase pixel + GA event once on mount
  useEffect(() => {
    if (typeof window === 'undefined' || !lead) return;
    const w = window as {
      fbq?: (...args: unknown[]) => void;
      gtag?: (...args: unknown[]) => void;
    };
    if (w.fbq) {
      w.fbq('track', 'Purchase', {
        value: lead.total_paid_cents / 100,
        currency: 'USD',
      });
    }
    if (w.gtag) {
      w.gtag('event', 'purchase', {
        transaction_id: lead.id,
        value: lead.total_paid_cents / 100,
        currency: 'USD',
      });
    }
  }, [lead]);

  const items = lead
    ? [
        { name: 'The Offer Clarity Sprint course', included: true },
        {
          name: 'Launch Stack',
          included: lead.has_bump_launch_stack || lead.has_bump_bundle,
        },
        {
          name: 'Hooks That Stop The Scroll',
          included: lead.has_bump_hooks || lead.has_bump_bundle,
        },
        {
          name: 'Offer Genius',
          included: lead.has_bump_offer_genius || lead.has_bump_bundle,
        },
        { name: '1:1 Coaching Call with Ana', included: lead.has_coaching_upsell },
      ]
    : [];

  return (
    <main
      className="min-h-screen bg-[#faf7f0]"
      style={{ fontFamily: 'Lora, Georgia, serif' }}
    >
      <div className="bg-emerald-600 text-white py-3 text-center">
        <p
          className="text-xs md:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          <CheckCircle2 size={16} /> Payment confirmed
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-5">
            <CheckCircle2 className="text-emerald-600" size={36} />
          </div>
          <h1
            className="text-3xl md:text-5xl font-extrabold leading-tight mb-3"
            style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
          >
            {lead?.name ? `Welcome in, ${lead.name.split(' ')[0]}.` : 'Welcome in.'}
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-xl mx-auto">
            Your purchase is confirmed. Everything below is on its way to{' '}
            {lead ? (
              <span className="font-bold text-[#1a1a1a]">{lead.email}</span>
            ) : (
              'your inbox'
            )}{' '}
            within the next few minutes.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading your order…</p>
        ) : (
          <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden mb-8">
            <div className="bg-[#1a1a1a] py-4 px-6 flex items-center justify-between">
              <p
                className="text-white font-bold text-sm uppercase tracking-widest"
                style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
              >
                What you got
              </p>
              {lead && (
                <p
                  className="text-[#c9b67e] font-extrabold text-2xl"
                  style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                >
                  ${lead.total_paid_cents / 100}
                </p>
              )}
            </div>
            <ul className="p-6 md:p-8 space-y-3">
              {items.map((item) => (
                <li
                  key={item.name}
                  className={`flex items-center gap-3 ${
                    item.included ? 'text-[#1a1a1a]' : 'text-gray-400 line-through'
                  }`}
                >
                  {item.included ? (
                    <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-gray-300 flex-shrink-0" />
                  )}
                  <span className="text-base md:text-lg">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bonuses always included */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
          <p
            className="text-xs font-extrabold uppercase tracking-widest text-[#9E8B52] mb-4"
            style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
          >
            Plus your launch bonuses
          </p>
          <ul className="space-y-3">
            {[
              {
                icon: BookOpen,
                title: 'The One-Sentence Offer Workbook',
                desc: 'Fill in the blanks. Build your offer in 30 minutes.',
              },
              {
                icon: Mail,
                title: 'The 3-Email Launch Template',
                desc: 'Copy. Paste. Send. Launch this week.',
              },
              {
                icon: Sparkles,
                title: 'AI Offer Flow Access (Forever)',
                desc: 'The AI tool that generates a validated offer in 60 seconds.',
              },
            ].map((b) => (
              <li key={b.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#FFFBEB] border border-[#9E8B52]/20 flex items-center justify-center">
                  <b.icon className="text-[#9E8B52]" size={18} />
                </div>
                <div>
                  <p
                    className="font-extrabold text-[#1a1a1a]"
                    style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                  >
                    {b.title}
                  </p>
                  <p className="text-sm text-gray-600">{b.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Next steps */}
        <div className="bg-[#1a1a1a] text-white rounded-3xl p-6 md:p-8 mb-8">
          <h2
            className="text-xl md:text-2xl font-extrabold mb-4"
            style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
          >
            What happens next
          </h2>
          <ol className="space-y-4 text-sm md:text-base">
            <li className="flex gap-4">
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full bg-[#9E8B52] text-white font-bold flex items-center justify-center"
                style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
              >
                1
              </span>
              <p>
                Check your inbox for the{' '}
                <span className="font-bold text-[#c9b67e]">welcome email</span> with your course
                login + bonus downloads.
              </p>
            </li>
            <li className="flex gap-4">
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full bg-[#9E8B52] text-white font-bold flex items-center justify-center"
                style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
              >
                2
              </span>
              <p>
                Open <span className="font-bold text-[#c9b67e]">Module 1: The Clarity Framework</span>{' '}
                — you can write your one-sentence offer in the first 20 minutes.
              </p>
            </li>
            {lead?.has_coaching_upsell && (
              <li className="flex gap-4">
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full bg-[#9E8B52] text-white font-bold flex items-center justify-center"
                  style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                >
                  3
                </span>
                <p>
                  Your <span className="font-bold text-[#c9b67e]">1:1 coaching booking link</span>{' '}
                  arrives in a separate email — pick a slot that works for you.
                </p>
              </li>
            )}
          </ol>
        </div>

        {fromCoaching && (
          <div className="bg-[#FFFBEB] border-2 border-[#9E8B52]/30 rounded-2xl p-5 mb-8 text-center">
            <Calendar className="text-[#9E8B52] mx-auto mb-2" size={22} />
            <p
              className="font-extrabold text-[#1a1a1a] mb-1"
              style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
            >
              Your 1:1 with Ana is reserved
            </p>
            <p className="text-sm text-gray-600">
              Watch your inbox for the booking link — it lands within 5 minutes.
            </p>
          </div>
        )}

        <p className="text-xs text-gray-500 text-center">
          Questions?{' '}
          <a
            href="mailto:anaxcalin@gmail.com"
            className="underline hover:text-gray-700"
          >
            anaxcalin@gmail.com
          </a>{' '}
          — I read every email.
        </p>
      </div>

      <footer className="py-8 text-center text-gray-400 text-xs border-t border-gray-200 bg-white">
        <p>© Ana Calin — How We Grow {new Date().getFullYear()}, All Rights Reserved.</p>
      </footer>
    </main>
  );
}

export default function OfferClaritySuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf7f0] flex items-center justify-center">
          <p className="text-gray-500 text-lg">Loading…</p>
        </div>
      }
    >
      <SuccessInner />
    </Suspense>
  );
}
