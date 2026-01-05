"use client";
import React, { useMemo } from "react";

// ==============================================
// Final CTA – Standalone Page
// Join 380+ Creators Who Stopped Waiting and Started Profiting
// Big price stack, massive CTA, urgency bar, and trust line
// ==============================================

function BoltIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" fill="currentColor" />
    </svg>
  );
}

function ClockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm1 10.268 3.536 2.04-1 1.732L11 13V6h2v6.268Z" fill="currentColor" />
    </svg>
  );
}

function ShieldIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 2 4 5v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3Z" fill="currentColor" />
    </svg>
  );
}

function LockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M7 10V8a5 5 0 0 1 10 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1Zm2 0h6V8a3 3 0 1 0-6 0v2Z" fill="currentColor" />
    </svg>
  );
}

function usd(n: number) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);
  } catch {
    return "$" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export default function FinalCTAPage({ left = 12, capacity = 30 }: { left?: number; capacity?: number }) {
  const totalValue = 2229; // $2,229
  const wasPrice = 997; // $997 (reference/regular)
  const nowPrice = 497; // $497
  const savings = totalValue - nowPrice; // 1732

  const taken = Math.max(0, capacity - left);
  const progress = useMemo(function () {
    return Math.max(0, Math.min(100, Math.round((taken / Math.max(1, capacity)) * 100)));
  }, [taken, capacity]);

  return (
    <main className="bg-page-radial pt-8 pb-4 text-slate-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <header className="text-center">
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">Join 380+ Creators Who Stopped Waiting and Started Profiting</h1>
          <p className="mt-2 text-sm text-slate-300">Everything you need to launch and monetize — fast.</p>
        </header>

        {/* CTA Card */}
        <section className="relative mx-auto mt-8 max-w-3xl overflow-visible rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md">
          {/* soft glows */}
          <div className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

          {/* Price stack */}
          <div className="space-y-1">
            <div className="text-xl font-extrabold text-slate-400 line-through decoration-rose-400/70 decoration-4">
              {usd(totalValue)} <span className="ml-2">{usd(wasPrice)}</span>
            </div>
            <div className="text-5xl md:text-6xl font-black text-white">
              <span className="relative inline-block px-2 -mx-2 rounded-sm bg-[linear-gradient(180deg,transparent_62%,rgba(250,204,21,0.65)_0)]">{usd(nowPrice)}</span>
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">(Save {usd(savings)} — Limited Time Offer)</div>
          </div>

          {/* Massive CTA */}
          <button
            type="button"
            onClick={() => {
              document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-5 inline-flex w-full items-center justify-center px-8 py-4 text-lg font-extrabold text-black bg-yellow-400 border border-transparent rounded-md hover:bg-yellow-500 transition-colors duration-200"
          >
            Yes! I'm Ready to Build to Profit — {usd(nowPrice)}
          </button>

          {/* Urgency strip */}
          <div className="mt-4 grid grid-cols-1 gap-2 text-[13px] font-semibold sm:grid-cols-2">
            <div className="flex items-center justify-center gap-2 whitespace-nowrap">
              <BoltIcon /> Only <span className="font-extrabold text-white">{left}</span> spots left at this price
            </div>
            <div className="flex items-center justify-center gap-2 whitespace-nowrap">
              <ClockIcon /> Early bird price ends <span className="font-extrabold text-white">soon</span>
            </div>
            <div className="flex items-center justify-center gap-2 whitespace-nowrap">
              <ShieldIcon /> Launch or it's free guarantee • <LockIcon /> Secure checkout
            </div>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/30">
            <div className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-rose-500" style={{ width: `${progress}%` }} />
          </div>
        </section>

        {/* Trust line */}
        <p className="mt-6 text-center text-xs text-slate-400">Trusted by 380+ creators • Backed by a risk‑free guarantee • Proven results</p>
      </div>
    </main>
  );
}
