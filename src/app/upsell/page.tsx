'use client';

import React, { Suspense, useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from 'next/navigation';

// Conversion‑first hero
// - dark gray/black gradient background
// - yellow CTA/accent
// - wider container (~70% viewport width)
// - aligned orange countdown pill with headline
// - trust badge + proof under countdown
// - value stack + progressive price callout
// - bottom-right secondary choice link

function UpsellContent() {
  // === CONFIG ===
  const cohortStart = useMemo(() => new Date("2025-11-18T09:00:00"), []);
  const seatCap = 30;
  const initialSeatsTaken = 11; // replace with live number if available
  const bundleCheckoutUrl = "#checkout-bundle"; // TODO: real link
  const btpOnlyCheckoutUrl = "#checkout-btp"; // TODO: real link

  // === LIMITED‑TIME OFFER (10‑minute) ===
  const offerDeadline = useMemo(() => new Date(Date.now() + 10 * 60 * 1000), []);
  const [{ mm, ss, expired }, setShortClock] = useState(() => remainingMMSS(offerDeadline));
  useEffect(() => {
    const id = setInterval(() => setShortClock(remainingMMSS(offerDeadline)), 1000);
    return () => clearInterval(id);
  }, [offerDeadline]);

  // === COHORT COUNTDOWN ===
  const [{ d, h, m, s }, setClock] = useState(() => remaining(cohortStart));
  useEffect(() => {
    const id = setInterval(() => setClock(remaining(cohortStart)), 1000);
    return () => clearInterval(id);
  }, [cohortStart]);

  const seatsLeft = Math.max(seatCap - initialSeatsTaken, 0);

  // Lead tracking
  const searchParams = useSearchParams();
  const leadId = searchParams.get('leadId');
  const [loading, setLoading] = useState<'none' | 'bundle' | 'standard'>('none');

  async function createCheckout(variant: 'bundle' | 'standard') {
    if (!leadId) {
      // Graceful fallback
      alert('Missing session. Please start again.');
      return;
    }
    try {
      setLoading(variant);
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, variant }),
      });
      const data = await res.json();
      if (data?.success && data?.data?.url) {
        window.location.href = data.data.url;
      } else {
        setLoading('none');
        alert(data?.error || 'Failed to start checkout. Please try again.');
      }
    } catch (e) {
      setLoading('none');
      alert('Network error. Please try again.');
    }
  }

  // Align orange pill to the right edge of the highlighted subtitle
  const subtitleRef = useRef<HTMLSpanElement | null>(null);
  const [subtitleWidth, setSubtitleWidth] = useState<number>(0);
  useEffect(() => {
    const updateWidth = () => setSubtitleWidth(subtitleRef.current ? subtitleRef.current.offsetWidth : 0);
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    if (subtitleRef.current) ro.observe(subtitleRef.current);
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
      ro.disconnect();
    };
  }, []);

  // === RENDER ===
  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden bg-gradient-to-b from-neutral-900 via-black to-neutral-950 py-10 text-white sm:py-16">
      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20%] h-[800px] w-[1200px] -translate-x-1/2 rounded-full bg-gradient-to-br from-yellow-300/10 via-yellow-200/5 to-white/0 blur-3xl" />
      </div>

      {/* ~70% width container */}
      <div className="mx-auto w-[70%] max-w-[1400px] px-6 text-left">
        {/* Attention subtitle (replaces pill headline) */}
        <h2 className="mb-2 max-w-[1100px] text-2xl font-semibold tracking-tight sm:text-3xl">
          <span ref={subtitleRef} className="rounded bg-yellow-300 px-2 py-1 text-black">Wait! Before you finish — here’s a special offer</span>
        </h2>

        {/* Orange pill aligned to subtitle width */}
        <div className="mb-3" style={{ width: subtitleWidth || undefined }}>
          <div className="flex justify-end">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/15 px-3 py-1 text-[12px] font-semibold text-orange-200 ring-1 ring-orange-400/30">
              <span aria-hidden>🔥</span>
              {expired ? (
                <span>Special offer ended</span>
              ) : (
                <span>
                  This special bundle price expires in <span className="font-bold text-orange-300">{mm}:{ss}</span>
                </span>
              )}
            </div>
          </div>
          {/* Small warning below the countdown, centered */}
          <div className="mt-2 text-center text-[11px] font-bold text-yellow-300">
            To Prevent Double Charges, DO NOT Press Back, Reload, Or Close This Page
          </div>
        </div>

        {/* Top chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2 text-[11px] font-medium text-white/80">
          <span className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">Cohort: Nov 18–19</span>
          <span className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">~{seatCap} seats • <strong className="text-white">{seatsLeft} left</strong></span>
          <span className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">Ana — Substack Bestseller • Top in Business</span>
          <span className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">65k+ subscribers on Substack</span>
        </div>

        {/* Headline */}
        <h1 className="max-w-[1100px] text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
          Get the <span className="bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">Complete Strategy + Launch System</span> that allowed me to generate ~$300k in the last 12 months (avg ~$25k/month)
        </h1>

        {/* What you get */}
        {/* Subtitle above the box */}
        <h2 className="mt-6 text-2xl font-bold text-white/90">Add the <span style={{ color: '#ffc300' }}>Money Map Bundle</span> to Build to Profit</h2>
        <div className="mt-3 max-w-[1100px] rounded-2xl border border-white/10 bg-white/5 p-4 ring-1 ring-white/10">
          <div className="mb-3 text-base font-semibold"><span className="rounded bg-yellow-300 px-2 py-0.5 text-black">Here’s What You Get When You Upgrade Today…</span></div>
          {/* Hook sentence (not a bullet) */}
          <p className="mb-3 text-[15px] text-white/90">
            Copy our <strong>Newsletter Sales Mechanism</strong> to quickly validate your offer and ship in days — and, most importantly, <strong>make an offer they can’t ignore</strong> and <strong>ship the launch that prints orders</strong> so you can enjoy <strong>consistent monthly sales</strong>. Add Money Map to Build to Profit to access:
          </p>
          <ul className="grid gap-2 text-[15px] text-white/90">
            <li className="flex items-start gap-2"><Check /><span><strong>Module 1</strong> — Your Subscriber Conversion Machine</span></li>
            <li className="flex items-start gap-2"><Check /><span><strong>Module 2</strong> — Your Perfect Paywall Strat &amp; Multi-Modal Rev</span></li>
            <li className="flex items-start gap-2"><Check /><span><strong>Module 3</strong> — Multiple Income Streams Blueprint</span></li>
            <li className="flex items-start gap-2"><Check /><span><strong>Module 4</strong> — The Disaster Method</span></li>
            <li className="flex items-start gap-2"><Check /><span><strong>Module 5</strong> — The Anti-Sell System</span></li>
            <li className="flex items-start gap-2"><Check /><span><strong>Bonuses</strong>: 50+ Toolkits, Home page optimization, Infinite Newsletter Idea Generator Prompt, 5-min Growth Ritual, About Page Template, 3 Key Mindset Shifts For New Income</span></li>
          </ul>
        </div>

        {/* Slim countdown (cohort) — centered */}
        <div className="mt-6 mx-auto flex max-w-[900px] flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm text-white/80">
          <div className="font-medium text-white">Enrollment closes when timer hits zero or seats sell out</div>
          <div className="grid grid-flow-col gap-3 text-center">
            <TimeBox label="Days" value={d} />
            <TimeBox label="Hours" value={h} />
            <TimeBox label="Minutes" value={m} />
            <TimeBox label="Seconds" value={s} />
          </div>
        </div>

        {/* Trust badge — standalone colored shield + proof bullets (under countdown) */}
        <div className="mt-6 mx-auto max-w-[900px] rounded-3xl border-2 border-dashed border-white/20 bg-white/5 p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center">
              <TrustedShieldEmblem />
            </div>
            <div className="flex-1">
              <div className="text-xl font-extrabold">You’re In Good Hands</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80 text-left">
                <li>65k+ Substack subscribers</li>
                <li>Generated $300k+ revenue in the last 12 months</li>
                <li>300+ creators in the community — including 25 Substack Bestsellers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Value Stack — directly under trust badge */}
        <div className="mt-6 mx-auto max-w-[900px] rounded-2xl border border-white/10 bg-white/5 p-5 ring-1 ring-white/10">
          <div className="mb-2 text-base font-semibold">
            <span className="rounded bg-yellow-300 px-2 py-0.5 text-black">Bundle Value Stack (What You Get)</span>
          </div>
          <ul className="list-disc space-y-1 pl-5 text-sm text-white/90 text-left">
            <li>Build to Profit: 2× live implementation sessions + exact 12‑day launch plan — <span className="font-semibold text-white">$497 value</span></li>
            <li>Money Map: Complete strategy course (ICP, offer, positioning, segmentation, messaging, copy) — <span className="font-semibold text-white">$497 value</span></li>
            <li>Templates & Resources — <span className="font-semibold text-white">$397 value</span></li>
            <li>Past Workshops Archive — <span className="font-semibold text-white">$697 value</span></li>
            <li>High‑Value Newsletter Club — <span className="font-semibold text-white">$397 value</span></li>
            <li>Extra Bonuses Pack — <span className="font-semibold text-white">$520 value</span></li>
            <li>Special !!! Build To Profit Bonus included = Notes To Cash Workshop! <span className="font-semibold text-white">$197 value</span></li>
          </ul>
        </div>

        {/* Value & Price Callout (progressively smaller text) */}
        <div className="mt-5 mx-auto max-w-[900px] text-center">
          <div className="font-extrabold text-4xl">Retail Value: <span className="text-yellow-300">$3,202</span></div>
          <div className="mt-1 font-bold text-3xl">Discount: <span className="text-yellow-300">$2,455</span></div>
          <div className="mt-1 font-semibold text-2xl">Today You Pay: <span className="text-yellow-300">$747</span></div>
          <div className="mt-1 text-xl">Click The Button Below To Receive <span className="text-yellow-300">25% Off</span></div>
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => createCheckout('bundle')}
              disabled={loading !== 'none'}
              className="inline-flex items-center justify-center rounded-lg bg-yellow-300 px-6 py-3 text-[1.1rem] font-semibold text-black shadow-[0_8px_30px_rgba(253,224,71,0.35)] ring-1 ring-yellow-200 transition hover:translate-y-[-1px] hover:shadow-[0_12px_40px_rgba(253,224,71,0.45)] disabled:opacity-60"
            >
              {loading === 'bundle' ? 'Starting checkout…' : 'Upgrade now — Bundle ($747)'}
            </button>
          </div>

          {/* Secondary choice: non-bundle checkout (moved below main CTA) */}
          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={() => createCheckout('standard')}
              disabled={loading !== 'none'}
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-[1.05rem] py-[0.66rem] text-[0.95rem] font-bold text-white/85 ring-1 ring-white/20 shadow-sm backdrop-blur transition hover:text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/50 disabled:opacity-60"
            >
              <span aria-hidden>❌</span> No Thanks! I want just Build To Profit ($497)
            </button>
          </div>
        </div>

        {/* Visual benefit cards */}
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <BenefitCard
            icon={<TargetIcon />}
            title="Offer your audience actually wants"
            blurb="Pinpoint ICP, problem, and promise so readers say ‘that’s me’."
          />
        	<BenefitCard
            icon={<RocketIcon />}
            title="Ship fast with proven assets"
            blurb="Plug‑and‑play pages, emails, and prompts to publish quickly."
          />
          <BenefitCard
            icon={<GraphIcon />}
            title="Convert more from day one"
            blurb="Stronger positioning + clearer copy → more replies, clicks, and sales."
          />
        </div>

        
      </div>

      
    </section>
  );
}

export default function UpsellPage() {
  return (
    <Suspense fallback={
      <section className="min-h-[92vh] flex items-center justify-center bg-gradient-to-b from-neutral-900 via-black to-neutral-950 text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-300" />
      </section>
    }>
      <UpsellContent />
    </Suspense>
  );
}

// ====== UI bits ======
function BenefitCard({ icon, title, blurb }: { icon: React.ReactNode; title: string; blurb: string }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-4 ring-1 ring-white/5 transition hover:from-white/10 hover:to-white/5">
      <div className="mb-3 inline-flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-300/15 ring-1 ring-yellow-300/30">
          <span className="text-yellow-300">{icon}</span>
        </span>
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-white/75">{blurb}</p>
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="w-20 rounded-lg bg-black/40 p-2.5 ring-1 ring-white/10">
      <div className="text-2xl font-semibold tabular-nums">{String(value).padStart(2, "0")}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wide text-white/70">{label}</div>
    </div>
  );
}

function Check() {
  return (
    <svg className="mt-0.5 h-5 w-5 flex-none text-yellow-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" opacity="0.3" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" opacity="0.3" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 19c3-1 6-1 9 0 0-3 0-6 3-9 2-2 4-3 6-3-1 2-2 4-3 6-3 3-6 3-9 3 0 3-2 5-6 6 1-2 2-4 0-6z" />
    </svg>
  );
}

function GraphIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 20V6" opacity="0.3" />
      <path d="M10 20V10" />
      <path d="M16 20V4" />
      <path d="M3 20h18" opacity="0.3" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l7 4v5c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V7l7-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function TrustedShieldEmblem() {
  // Colored shield emblem provided by user (standalone shield, no circle)
  return (
    <svg viewBox="0 0 24 24" width="96" height="96" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <g transform="translate(0 -1028.4)">
        <path d="m3 1031.4v10c0 4.2 3.6322 8 9 10 5.368-2 9-5.8 9-10v-10h-18z" fill="#95a5a6"></path>
        <path d="m3 1030.4v10c0 4.2 3.6322 8 9 10 5.368-2 9-5.8 9-10v-10h-18z" fill="#ecf0f1"></path>
        <path d="m3 1030.4v10c0 4.2 3.6322 8 9 10v-20h-9z" fill="#bdc3c7"></path>
        <path d="m5 1032.4v8c0 3.4 2.8251 6.4 7 8 4.175-1.6 7-4.6 7-8v-8h-14z" fill="#27ae60"></path>
        <path d="m12 1032.4v16c4.175-1.6 7-4.6 7-8v-8h-7z" fill="#2ecc71"></path>
        <path d="m16 1037.4-4.683 4.6-1.9511-1.9-1.6586 1.7 1.9512 1.9 1.5615 1.6 0.097 0.1 6.342-6.4-1.659-1.6z" fill="#27ae60"></path>
        <path d="m16 1036.4-4.683 4.6-1.9511-1.9-1.6586 1.7 1.9512 1.9 1.5615 1.6 0.097 0.1 6.342-6.4-1.659-1.6z" fill="#ecf0f1"></path>
      </g>
    </svg>
  );
}

// ====== helpers ======
function remaining(target: Date) {
  const now = new Date();
  let diff = Math.max(0, target.getTime() - now.getTime());
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= d * 24 * 60 * 60 * 1000;
  const h = Math.floor(diff / (1000 * 60 * 60));
  diff -= h * 60 * 60 * 1000;
  const m = Math.floor(diff / (1000 * 60));
  diff -= m * 60 * 1000;
  const s = Math.floor(diff / 1000);
  return { d, h, m, s };
}

function remainingMMSS(target: Date) {
  const now = new Date();
  let diff = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const mm = Math.floor(totalSeconds / 60);
  const ss = totalSeconds % 60;
  return { mm: String(mm).padStart(2, "0"), ss: String(ss).padStart(2, "0"), expired: totalSeconds <= 0 } as const;
}

/*
MANUAL TEST CASES (no test runner required)
1) No JSX errors: UpsellHero returns a single <section> (one root). All tags balanced.
2) Orange MM:SS pill aligns to the right edge of the yellow subtitle and updates each second; never below 00:00.
3) Small warning line shows centered directly under the pill (not above countdown), bold and yellow.
4) Cohort countdown is centered; numbers tick down correctly.
5) Trust badge (standalone colored shield + left-aligned bullets) is directly under the countdown and uses the same width.
6) Value Stack follows the trust badge; bullets left-aligned.
7) Progressive price callout shows four lines with decreasing font sizes.
8) Secondary link fixed bottom-right reads “❌ No Thanks, I don't want the complete system”.
9) Accessibility: CTAs are focusable; text has sufficient contrast on dark background.
*/
