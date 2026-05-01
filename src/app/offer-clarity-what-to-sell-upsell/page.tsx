'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {
  OFFER_CLARITY_WHAT_TO_SELL_PRICE,
  OFFER_CLARITY_WHAT_TO_SELL_RETAIL_PRICE,
} from '@/lib/stripe';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Lead {
  id: string;
  name: string | null;
  email: string;
  is_paid: boolean;
  has_what_to_sell_upsell: boolean;
}

/* ── tiny reusable bits ─────────────────────────────────────────── */

function Divider() {
  return (
    <div className="mx-auto mb-8 h-[3px] w-[60px] rounded-full bg-[#ffc300]" />
  );
}

function CtaButton({
  children,
  gold = false,
  large = false,
  sub,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  gold?: boolean;
  large?: boolean;
  sub?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const base =
    'inline-block font-dm-sans font-bold uppercase tracking-[1.5px] rounded-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0';
  const size = large ? 'text-xl px-14 py-[22px]' : 'text-lg px-12 py-[18px]';
  const color = gold
    ? 'bg-[#ffc300] text-[#1a1a1a] shadow-[0_4px_20px_rgba(255,195,0,.35)] hover:shadow-[0_8px_30px_rgba(255,195,0,.45)] hover:bg-[#e6b000]'
    : 'bg-[#f72585] text-white shadow-[0_4px_20px_rgba(247,37,133,.35)] hover:shadow-[0_8px_30px_rgba(247,37,133,.45)] hover:bg-[#e01f75]';

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`${base} ${size} ${color}`}
      >
        {children}
      </button>
      {sub && (
        <span className="mt-2.5 block text-xs font-normal tracking-normal normal-case text-[#6b7280]">
          {sub}
        </span>
      )}
    </div>
  );
}

/* ── Embedded Stripe Elements fallback (only mounts if no saved card) ── */

function FallbackCheckoutForm({
  clientSecret,
  paymentIntentId,
  leadId,
  onSuccess,
}: {
  clientSecret: string;
  paymentIntentId: string;
  leadId: string;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/offer-clarity-coaching-upsell?leadId=${leadId}`,
      },
      redirect: 'if_required',
    });

    if (stripeError) {
      setError(stripeError.message || 'Payment failed');
      setSubmitting(false);
      return;
    }
    if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Tell the server to flip the flag (webhook is also a safety net).
      await fetch('/api/offer-clarity/what-to-sell-upsell/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, paymentIntentId }),
      }).catch(() => {});
      onSuccess();
    } else {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement options={{ layout: 'tabs' }} />
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full rounded-lg bg-[#f72585] px-12 py-[18px] text-lg font-bold uppercase tracking-[1.5px] text-white shadow-[0_4px_20px_rgba(247,37,133,.35)] transition-all hover:-translate-y-0.5 hover:bg-[#e01f75] disabled:opacity-50"
      >
        {submitting ? 'PROCESSING…' : `ADD FOR $${(OFFER_CLARITY_WHAT_TO_SELL_PRICE / 100).toFixed(0)}`}
      </button>
    </form>
  );
}

/* ── section components ─────────────────────────────────────────── */

function HeroSection({
  onAdd,
  purchasing,
  purchased,
  declineAndContinue,
  error,
}: {
  onAdd: () => void;
  purchasing: boolean;
  purchased: boolean;
  declineAndContinue: () => void;
  error: string | null;
}) {
  const priceUsd = (OFFER_CLARITY_WHAT_TO_SELL_PRICE / 100).toFixed(0);
  const retailUsd = (OFFER_CLARITY_WHAT_TO_SELL_RETAIL_PRICE / 100).toFixed(0);

  return (
    <section className="relative overflow-hidden bg-[#fffdf5] px-5 pb-[60px] pt-8 text-center">
      <div className="pointer-events-none absolute -right-[100px] -top-[100px] h-[400px] w-[400px] rounded-full bg-[#ffc300] opacity-10" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-[#f72585] opacity-[0.08]" />

      <div className="relative z-10 mx-auto max-w-[1000px]">
        <span className="mb-8 inline-block rounded-full bg-[#ffc300] px-6 py-2 text-[13px] font-bold uppercase tracking-[2px] text-[#1a1a1a]">
          Workshop Recordings · Instant Access
        </span>

        <h1 className="mb-6 font-playfair text-[clamp(36px,6vw,64px)] font-black leading-[1.1] text-[#1a1a1a]">
          What Do I Even Sell?
        </h1>

        <p className="mx-auto mb-6 max-w-[700px] font-playfair text-[clamp(20px,3vw,28px)] italic leading-[1.4] text-[#f72585]">
          How to find the one skill hiding in your brain that people will pay for.
        </p>

        <p className="mx-auto mb-10 max-w-[640px] text-[15px] leading-relaxed text-[#6b7280]">
          You don&apos;t need another plan. You don&apos;t need permission. You
          need one decision. Corporate taught you to analyse, prepare, and wait
          for approval before you act. That&apos;s why you&apos;re still stuck.
          This recording is the decision that starts everything.
        </p>

        <Image
          src="/imgs/your-first-1k-after-corporate/hero1.jpeg"
          alt="What Do I Even Sell? — workshop recording with Ana Calin"
          width={800}
          height={450}
          className="mx-auto mb-10 block w-full max-w-[900px] rounded-xl object-contain"
          priority
        />

        {purchased ? (
          <div className="mx-auto max-w-[420px] rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-6 text-center">
            <p className="mb-2 text-2xl font-black text-emerald-700">
              ✓ Added to your order!
            </p>
            <p className="text-sm text-emerald-700/80">
              Heading to the next step…
            </p>
          </div>
        ) : (
          <>
            <CtaButton
              onClick={onAdd}
              disabled={purchasing}
              sub={`Instant access · One-click add (no card re-entry) · Full recording + bonuses`}
            >
              {purchasing
                ? 'PROCESSING…'
                : `YES — ADD FOR $${priceUsd} (was $${retailUsd})`}
            </CtaButton>

            <button
              type="button"
              onClick={declineAndContinue}
              className="mt-4 text-[13px] uppercase tracking-[1.5px] text-[#6b7280] underline-offset-4 hover:text-[#1a1a1a] hover:underline"
            >
              No thanks, continue to my account
            </button>

            {error && (
              <div className="mx-auto mt-6 max-w-[480px] rounded-lg border border-rose-300 bg-rose-50 p-4 text-left text-sm text-rose-700">
                <strong>Couldn&apos;t process that:</strong> {error}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function PermissionMirrorSection() {
  return (
    <section className="px-5 pb-3 pt-20">
      <div className="mx-auto max-w-[700px] text-[19px] leading-[2]">
        <p className="mb-8">Someone messaged me this week about this workshop.</p>
        <p className="mb-8">
          She was interested. She said my emails hit home. She said the Sunday
          scaries were eating her alive. She said she was afraid of AI taking her
          job every single day.
        </p>
        <p className="mb-8">
          Then she asked me 4 follow-up questions. Then she asked if she could
          ask more questions after. Then she raised a concern. Then she went
          quiet.
        </p>
        <p className="mb-8">
          I&apos;ve seen this pattern a hundred times.{' '}
          <strong>Because I lived it.</strong>
        </p>
        <p className="mb-8 font-playfair text-[24px] font-black leading-[1.4]">
          This is what corporate does to you.
        </p>
        <p className="mb-8">
          It trains you to investigate every angle before you move. To get
          approval before you act. To build a deck about the decision before you
          make the decision.
        </p>
        <p className="mb-4">
          And then you bring that exact same behaviour into your own life:
        </p>
        <div className="mb-8 space-y-3 pl-2 text-[18px]">
          <p>
            <span className="mr-2 text-[#ffc300]">→</span> You want to leave. But
            first you need to research every possible path.
          </p>
          <p>
            <span className="mr-2 text-[#ffc300]">→</span> You want to start
            something. But first you need to know if it&apos;ll work.
          </p>
          <p>
            <span className="mr-2 text-[#ffc300]">→</span> You want to watch a
            workshop. But first you need 6 questions answered and someone to tell
            you it&apos;s okay.
          </p>
        </div>
        <p className="mb-8">
          <strong className="text-[#f72585]">
            You don&apos;t have a motivation problem. You have a permission
            problem.
          </strong>
        </p>
        <p className="mb-12 font-playfair text-[24px] font-black leading-[1.4]">
          And nothing changes.
        </p>
      </div>
    </section>
  );
}

function ModulesSection({
  onAdd,
  purchasing,
}: {
  onAdd: () => void;
  purchasing: boolean;
}) {
  const priceUsd = (OFFER_CLARITY_WHAT_TO_SELL_PRICE / 100).toFixed(0);
  const modules = [
    {
      title: "You'll find the skill you're sitting on that's worth $1K",
      desc: "Every career has a monetisable skill hidden inside it. Marketing. Strategy. Operations. Writing. Finance. Project management. You'll identify yours in the first 10 minutes. Most people say this moment alone changes everything, because they stop asking 'what would I even sell?'",
    },
    {
      title:
        "You'll see why a newsletter is the fastest vehicle for career changers",
      desc: "Not a course. Not coaching. Not an app. Not social media. I'll show you why newsletters beat every other option for someone leaving corporate, and exactly which format gets you paid fastest with the smallest audience.",
    },
    {
      title: "You'll get the 90-day sprint to your first $1K",
      desc: "Week by week. What to write. What to sell. How to price it. When to flip from free to paid. This is the core of the workshop. Not theory. A calendar with tasks. The same system I used. The same one my students use.",
    },
    {
      title: "You'll hear the 5 lies that are keeping you stuck",
      desc: "The stories every corporate person tells themselves that prevent them from ever starting. I believed all 5. They almost cost me everything. The reframes will feel like someone turned a light on in a room you've been sitting in for years.",
    },
    {
      title: "Plus the live Q&A recording where I tell people exactly what to build",
      desc: "Real backgrounds, real questions, real answers. I look at each person's specific situation and tell them what I'd do. No gatekeeping. You watch it all in the recording.",
    },
  ];

  return (
    <section className="bg-[#1a1a1a] px-5 py-20 text-white">
      <div className="mx-auto max-w-[780px]">
        <Divider />
        <h2 className="mb-6 font-playfair text-[clamp(28px,4vw,44px)] font-black leading-[1.2] text-white">
          What&apos;s in the recording
        </h2>
        <p className="mb-2 text-[#aaa]">
          60 minutes. No slides with 47 bullet points. Just the system.
        </p>

        <ul className="my-8 list-none p-0">
          {modules.map((m) => (
            <li
              key={m.title.slice(0, 20)}
              className="border-b border-white/10 py-6"
            >
              <h4 className="mb-2 font-dm-sans text-lg font-bold text-white">
                {m.title}
              </h4>
              <p className="m-0 text-[15px] leading-[1.7] text-[#aaa]">
                {m.desc}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <CtaButton onClick={onAdd} disabled={purchasing}>
            {purchasing ? 'PROCESSING…' : `YES — ADD FOR $${priceUsd}`}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

function WhoSection() {
  const items = [
    {
      title: "You're still in corporate and the Sunday night knot won't go away",
      desc: "You've been told it's normal. It's not.",
    },
    {
      title: 'You just left and the clock is ticking',
      desc: "You need a system that generates revenue in weeks, not months. Not another course to 'think about.' An action plan you execute starting Wednesday morning.",
    },
    {
      title: "You started something but it's not making money yet",
      desc: "You've been posting, writing, showing up — but your bank account doesn't reflect your effort. I'll show you what's missing.",
    },
    {
      title: "You've been overthinking this for months and you know it",
      desc: 'You have 14 browser tabs open about side hustles. You have read more about this than 95% of people who are actually doing it. What you need isn\'t more information. It\'s a decision.',
    },
  ];

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-[780px]">
        <Divider />
        <h2 className="mb-4 font-playfair text-[clamp(28px,4vw,44px)] font-black leading-[1.2]">
          This is for the person who&apos;s done thinking about it.
        </h2>
        <p className="mb-6 text-lg text-[#6b7280]">
          Not &ldquo;interested.&rdquo; Not &ldquo;considering it.&rdquo; Done
          thinking. Ready to move.
        </p>
        <ul className="my-8 list-none p-0">
          {items.map((item) => (
            <li
              key={item.title.slice(0, 20)}
              className="flex flex-col gap-2 border-b border-black/[0.08] py-5 sm:flex-row sm:items-start sm:gap-4"
            >
              <div className="w-auto shrink-0 text-left font-playfair text-2xl font-black text-[#ffc300] sm:w-[50px] sm:text-center">
                →
              </div>
              <div>
                <h4 className="mb-1 font-dm-sans text-lg font-bold">
                  {item.title}
                </h4>
                <p className="m-0 text-[15px] text-[#6b7280]">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BonusesSection({
  onAdd,
  purchasing,
}: {
  onAdd: () => void;
  purchasing: boolean;
}) {
  const priceUsd = (OFFER_CLARITY_WHAT_TO_SELL_PRICE / 100).toFixed(0);
  const bonuses = [
    {
      tag: 'Bonus #1',
      title: 'The Skill Audit',
      desc: 'The exact exercise I use to help people find their monetisable skill in 15 minutes. You\'ll know what you\'re building before the recording is half over.',
    },
    {
      tag: 'Bonus #2',
      title: 'The First Week Action Plan',
      desc: "What to do on Wednesday, Thursday, Friday, Saturday, and Sunday after you watch. Five days. Five tasks. No ambiguity.",
    },
    {
      tag: 'Bonus #3',
      title: 'The 90-Day Sprint Calendar',
      desc: 'The week-by-week breakdown from Day 1 to $1K. What to write, when to sell, how to price it. The same system behind my first $10K month.',
    },
  ];

  return (
    <section className="px-5 pb-20 pt-4">
      <div className="mx-auto max-w-[780px]">
        <Divider />
        <h2 className="mb-6 text-center font-playfair text-[clamp(28px,4vw,44px)] font-black leading-[1.2]">
          Plus these bonuses (included free):
        </h2>

        <Image
          src="/imgs/your-first-1k-after-corporate/hero2.jpeg"
          alt="Workshop recording, quick start guides, and resources included"
          width={780}
          height={440}
          className="mx-auto mb-10 block w-full rounded-xl object-contain"
        />

        {bonuses.map((b) => (
          <div
            key={b.tag}
            className="my-5 rounded-xl border border-black/5 bg-white p-8 shadow-[0_2px_16px_rgba(0,0,0,.06)]"
          >
            <span className="mb-3 inline-block rounded-full bg-[#ffc300] px-3.5 py-1 text-xs font-bold uppercase tracking-[1.5px] text-[#1a1a1a]">
              {b.tag}
            </span>
            <h3 className="mb-4 font-playfair text-2xl font-bold">{b.title}</h3>
            <p className="mb-0">{b.desc}</p>
          </div>
        ))}

        <div className="mt-10 text-center">
          <CtaButton onClick={onAdd} disabled={purchasing}>
            {purchasing ? 'PROCESSING…' : `YES — ADD FOR $${priceUsd}`}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: 'When can I watch?',
      a: "Right now. You'll get the recording link the moment you confirm. No 'check your inbox in 5 minutes' — instant access.",
    },
    {
      q: "I don't know what I'd sell. Is this still for me?",
      a: "That's literally what the first 10 minutes solve. You don't need to arrive with a product idea. You arrive with your career. I'll show you what's hiding inside it.",
    },
    {
      q: "I'm not a writer. Is this still for me?",
      a: 'Absolutely. I wasn\'t a "writer" either — I was a marketing executive. The newsletter is just the vehicle. Your expertise is the engine.',
    },
    {
      q: 'Do I need to have quit my job already?',
      a: 'No. Many of my students start building while still employed. The 90-day sprint is designed to work alongside a full-time job. I built mine while pregnant.',
    },
    {
      q: 'I need to think about it…',
      a: "I know. That's the pattern. At some point, thinking stops being preparation and starts being avoidance. Only you know which one this is.",
    },
  ];

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-[780px]">
        <Divider />
        <h2 className="mb-2 text-center font-playfair text-[clamp(28px,4vw,44px)] font-black leading-[1.2]">
          Questions you&apos;re about to overthink
        </h2>
        <p className="mb-8 text-center text-lg italic text-[#6b7280]">
          (I say that with love. I was you.)
        </p>
        {faqs.map((f) => (
          <div key={f.q} className="border-b border-black/[0.08] py-6">
            <div className="mb-2 text-[17px] font-bold">{f.q}</div>
            <div className="text-[15px] leading-[1.7] text-[#6b7280]">{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCtaSection({
  onAdd,
  purchasing,
  purchased,
  declineAndContinue,
}: {
  onAdd: () => void;
  purchasing: boolean;
  purchased: boolean;
  declineAndContinue: () => void;
}) {
  const priceUsd = (OFFER_CLARITY_WHAT_TO_SELL_PRICE / 100).toFixed(0);
  const retailUsd = (OFFER_CLARITY_WHAT_TO_SELL_RETAIL_PRICE / 100).toFixed(0);

  return (
    <section className="bg-gradient-to-br from-[#1a1a1a] to-[#2d1b3d] px-5 py-[100px] text-center text-white">
      <div className="mx-auto max-w-[780px]">
        <h2 className="mb-6 font-playfair text-[clamp(28px,4vw,44px)] font-black leading-[1.2] text-white">
          Instant access. One decision.
          <br />
          <em className="italic text-[#ffc300]">No committee required.</em>
        </h2>
        <p className="mx-auto mb-10 max-w-[600px] text-lg leading-[1.8] text-[#ccc]">
          You spent years building skills that are worth real money. Let me show
          you how to capture that value for yourself. 60 minutes. Recorded. The
          system I used. The plan you&apos;ll leave with.
        </p>

        <div className="mb-10">
          <div className="font-playfair text-7xl font-black leading-none text-white">
            ${priceUsd}
          </div>
          <div className="mt-2 text-sm text-[#aaa] line-through">
            normally ${retailUsd}
          </div>
          <div className="mt-2 text-sm text-[#aaa]">
            One workshop recording. One decision. No subscription.
          </div>
        </div>

        {purchased ? (
          <p className="text-2xl font-black text-emerald-400">
            ✓ Added — see you on your account page.
          </p>
        ) : (
          <>
            <CtaButton large onClick={onAdd} disabled={purchasing}>
              {purchasing
                ? 'PROCESSING…'
                : `I'M DONE THINKING — ADD FOR $${priceUsd}`}
            </CtaButton>
            <button
              type="button"
              onClick={declineAndContinue}
              className="mt-6 block mx-auto text-[13px] uppercase tracking-[1.5px] text-[#aaa] underline-offset-4 hover:text-white hover:underline"
            >
              No thanks, continue without
            </button>
          </>
        )}
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="bg-[#1a1a1a] px-5 py-8 text-center text-[13px] text-[#666]">
      <p>
        &copy; 2026 Ana Calin · How We Grow ·{' '}
        <a
          href="https://howwegrowtoday.substack.com"
          className="text-[#ffc300] no-underline"
        >
          howwegrowtoday.substack.com
        </a>
      </p>
    </footer>
  );
}

/* ── inner page ───────────────────────────────────────────────────── */

function WhatToSellInner() {
  const searchParams = useSearchParams();
  const leadId = searchParams.get('leadId') || '';

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fallback: if one-click fails (no saved card), collect details inline.
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
          if (d.lead.has_what_to_sell_upsell) setPurchased(true);
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
      const res = await fetch(
        '/api/offer-clarity/what-to-sell-upsell/create-payment-intent',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ leadId }),
        },
      );
      const data = await res.json();
      if (!data.success) {
        setError(data.error || 'Could not initialize purchase');
        setPurchasing(false);
        return;
      }
      if (data.alreadyPurchased) {
        setPurchased(true);
        setPurchasing(false);
        setTimeout(() => continueToCoaching(), 1200);
        return;
      }
      if (data.oneClick) {
        setPurchased(true);
        setPurchasing(false);
        setTimeout(() => continueToCoaching(), 1200);
      } else {
        setFallbackClientSecret(data.clientSecret);
        setFallbackPaymentIntentId(data.paymentIntentId);
        setPurchasing(false);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Purchase failed');
      setPurchasing(false);
    }
  };

  const continueToCoaching = () => {
    window.location.href = `/offer-clarity-coaching-upsell?leadId=${leadId || ''}`;
  };

  const declineAndContinue = () => continueToCoaching();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffdf5] flex items-center justify-center">
        <p className="text-[#6b7280] text-lg">Loading…</p>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="min-h-screen bg-[#fffdf5] flex items-center justify-center px-5">
        <div className="max-w-md text-center">
          <p className="text-rose-600 font-bold mb-3">{error || 'Lead not found'}</p>
          <a
            href="/offer-clarity-success"
            className="text-[#f72585] underline"
          >
            Continue to your account
          </a>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white font-dm-sans text-[#1a1a1a] antialiased [line-height:1.7]">
      <HeroSection
        onAdd={oneClickAdd}
        purchasing={purchasing}
        purchased={purchased}
        declineAndContinue={declineAndContinue}
        error={error}
      />

      {/* Inline fallback checkout (only if no saved card). */}
      {fallbackClientSecret && !purchased && (
        <section className="bg-[#fffdf5] px-5 py-12">
          <div className="mx-auto max-w-[520px] rounded-2xl border-2 border-[#ffc300] bg-white p-8 shadow-lg">
            <h3 className="mb-2 font-playfair text-2xl font-black">
              One last step — your payment details
            </h3>
            <p className="mb-6 text-sm text-[#6b7280]">
              We didn&apos;t find a saved card on file, so confirm your payment
              method below to complete the purchase.
            </p>
            <Elements
              stripe={stripePromise}
              options={{ clientSecret: fallbackClientSecret, appearance: { theme: 'stripe' } }}
            >
              <FallbackCheckoutForm
                clientSecret={fallbackClientSecret}
                paymentIntentId={fallbackPaymentIntentId!}
                leadId={leadId}
                onSuccess={() => {
                  setPurchased(true);
                  setTimeout(() => continueToCoaching(), 1200);
                }}
              />
            </Elements>
          </div>
        </section>
      )}

      <PermissionMirrorSection />
      <ModulesSection onAdd={oneClickAdd} purchasing={purchasing} />
      <WhoSection />
      <BonusesSection onAdd={oneClickAdd} purchasing={purchasing} />
      <FAQSection />
      <FinalCtaSection
        onAdd={oneClickAdd}
        purchasing={purchasing}
        purchased={purchased}
        declineAndContinue={declineAndContinue}
      />
      <FooterSection />
    </main>
  );
}

export default function OfferClarityWhatToSellUpsellPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fffdf5] flex items-center justify-center">
          <p className="text-[#6b7280] text-lg">Loading…</p>
        </div>
      }
    >
      <WhatToSellInner />
    </Suspense>
  );
}
