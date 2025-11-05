import React from "react";

// ==============================================
// Risk Reversal – Standalone Page
// "Here's the Math" section with visual emphasis.
// Palette: dark gradient bg, yellow CTA, green checks, orange accents.
// ==============================================

type MathProps = {
  productPrice?: number; // $597 one-time
  offerPrice?: number; // €297
  typicalCustomers?: number; // 10
  roiLabel?: string; // "5X in 30 days" (copy override)
  originalProductPrice?: number; // for price anchoring, e.g., €997
};

function formatCurrencyEUR(amount: number) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }
}

function calcRevenue(customers: number, price: number) {
  const c = Number.isFinite(customers) ? Math.max(0, Math.floor(customers)) : 0;
  const p = Number.isFinite(price) ? Math.max(0, Math.floor(price)) : 0;
  return c * p;
}

function calcProfit(revenue: number, productPrice: number) {
  const r = Number.isFinite(revenue) ? Math.max(0, Math.floor(revenue)) : 0;
  const pp = Number.isFinite(productPrice) ? Math.max(0, Math.floor(productPrice)) : 0;
  return Math.max(0, r - pp);
}

function calcBreakEvenCustomers(productPrice: number, offerPrice: number) {
  const pp = Number.isFinite(productPrice) ? Math.max(0, productPrice) : 0;
  const op = Number.isFinite(offerPrice) ? Math.max(1, offerPrice) : 1; // prevent div by zero
  return Math.ceil(pp / op);
}

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 7.28a.75.75 0 0 0-1.06-1.06l-4.72 4.72-1.72-1.72a.75.75 0 1 0-1.06 1.06l2.25 2.25c.293.293.767.293 1.06 0l5.25-5.25Z" />
    </svg>
  );
}

export default function RiskReversalPage({
  productPrice = 497,
  offerPrice = 297,
  typicalCustomers = 10,
  roiLabel = "5X in 30 days",
  originalProductPrice = 997,
}: MathProps) {
  const revenue = calcRevenue(tipicalCustomersFix(typicalCustomers), offerPrice);
  const profit = calcProfit(revenue, productPrice);
  const breakEven = calcBreakEvenCustomers(productPrice, offerPrice);

  return (
    <main className="bg-transparent pt-8 pb-5 text-slate-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            Here’s the Math
          </h1>
          <p className="mt-2 text-sm text-slate-300">Risk reversal that makes saying yes easy.</p>
        </header>

        {/* Numbers Row */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <CheckIcon className="h-6 w-6 text-emerald-400" />
              <div>
                <p className="text-sm uppercase tracking-wider text-slate-300">Build to Profit</p>
                <p className="text-2xl font-extrabold text-white">{formatCurrencyEUR(productPrice)} <span className="text-sm font-semibold text-slate-300">one-time</span></p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-orange-500/70 bg-orange-400/10 px-2.5 py-1 text-xs font-semibold text-orange-300 ring-1 ring-orange-500/30">
                  <span className="line-through opacity-80">{formatCurrencyEUR(originalProductPrice)}</span>
                  <span className="text-slate-200">now {formatCurrencyEUR(productPrice)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <CheckIcon className="h-6 w-6 text-emerald-400" />
              <div>
                <p className="text-sm uppercase tracking-wider text-slate-300">Your first launch (conservative)</p>
                <p className="text-2xl font-extrabold text-white">{tipicalCustomersFix(typicalCustomers)} customers × {formatCurrencyEUR(offerPrice)} = {formatCurrencyEUR(revenue)}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md sm:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <CheckIcon className="h-6 w-6 text-emerald-400" />
                <div>
                  <p className="text-sm uppercase tracking-wider text-slate-300">Your Profit</p>
                  <p className="text-3xl font-extrabold text-white">{formatCurrencyEUR(profit)}</p>
                </div>
              </div>
              <div className="group flex items-center gap-3 rounded-xl border border-orange-500 bg-gradient-to-r from-orange-300 to-orange-400 px-5 py-2.5 text-slate-900 shadow-md ring-1 ring-orange-500/40 motion-safe:animate-pulse hover:animate-none transition hover:shadow-lg hover:-translate-y-0.5">
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] font-semibold uppercase tracking-wider">ROI</span>
                  <span className="text-xl sm:text-2xl font-extrabold">{roiLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reassurance copy */}
        <section className="mt-8 space-y-3 text-slate-200">
          <p>Even if you only sell to <span className="font-bold text-white">{breakEven}</span> customers at {formatCurrencyEUR(offerPrice)}, you’ve made back your investment.</p>
          <p>Everything after that is <span className="font-bold text-emerald-300">pure profit</span>.</p>
          <p className="pt-2 text-slate-300">The question isn’t <span className="italic">“Can I afford this?”</span></p>
          <p className="text-white font-semibold">The question is: <span className="underline decoration-yellow-400 decoration-4 underline-offset-4">“Can I afford to wait another month without launching?”</span></p>
        </section>

        {/* CTA */}
        <footer className="mt-2 flex items-center justify-center">
          <button
            type="button"
            onClick={() => {
              document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black bg-yellow-400 border border-transparent rounded-md hover:bg-yellow-500 transition-colors duration-200"
          >
            Start Now — Make Back {formatCurrencyEUR(productPrice)} Fast
          </button>
        </footer>
      </div>
    </main>
  );
}

// Helper to sanitize customers to int
function tipicalCustomersFix(n: number) {
  const v = Number.isFinite(n) ? n : 0;
  return Math.max(0, Math.floor(v));
}
