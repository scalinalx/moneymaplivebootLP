import React, { useEffect, useMemo, useState } from "react";

// ==============================================
// Final Pricing – Standalone Page (with visuals)
// Start Building Your Newsletter Revenue Machine Today
// - Clear value table (What You Get vs Value)
// - Bonuses block with values
// - Struck-through Regular + Early Bird price
// - Live countdown + capacity bar (18/30)
// - Secure checkout + What happens next steps
// TailwindCSS, no nullish coalescing (for broad JS envs)
// ==============================================

type Row = { label: string; value: string };

const CORE_ROWS: Row[] = [
  { label: "Lifetime access: 2x Recorded Workshop Sessions", value: "$997" },
  { label: "Templates & Resources", value: "$347" },
  { label: "The High-Value Newsletter Club", value: "$297" },
];

const BONUS_ROWS: Row[] = [
  { label: "Notes to Cash Workshop", value: "$297" },
  { label: "Accelerator Preview Invitation", value: "Priceless" },
];

function usd(n: number) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);
  } catch {
    return "$" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

function parseEuroToNumber(v: string) {
  if (/priceless/i.test(v)) return 0;
  const cleaned = v.replace(/[^\d.]/g, "");
  const n = Number(cleaned || 0);
  return Math.round(n);
}

function sumRows(rows: Row[]) {
  return rows.reduce(function (acc, r) { return acc + parseEuroToNumber(r.value); }, 0);
}

function getCountdownParts(deadline: Date, now: Date) {
  const ms = Math.max(0, deadline.getTime() - now.getTime());
  const s = Math.floor(ms / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  return { days, hours, minutes, seconds, expired: ms <= 0 };
}

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M5 13l4.5 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M7 10V8a5 5 0 0 1 10 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1Zm2 0h6V8a3 3 0 1 0-6 0v2Z" fill="currentColor" />
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

function BoltIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" fill="currentColor" />
    </svg>
  );
}

export default function FinalPricingPage({ deadlineISO = "2025-11-18T23:59:59", taken = 18, capacity = 30 }: { deadlineISO?: string; taken?: number; capacity?: number; }) {
  const coreTotal = useMemo(function () { return sumRows(CORE_ROWS); }, []);
  const bonusTotal = useMemo(function () { return sumRows(BONUS_ROWS); }, []); // priceless counts as 0 for math
  const totalValue = coreTotal + bonusTotal; // computed, but display overridden below

  const [now, setNow] = useState<Date>(new Date());
  const deadline = useMemo(function () { return new Date(deadlineISO); }, [deadlineISO]);
  const parts = getCountdownParts(deadline, now);

  useEffect(function () {
    const t = setInterval(function () { setNow(new Date()); }, 1000);
    return function () { clearInterval(t); };
  }, []);

  const regularPrice = 997;
  const earlyBird = 497;
  const savings = totalValue - earlyBird;

  // FIX: removed extra closing parenthesis that caused a syntax error
  const progress = Math.max(0, Math.min(100, Math.round((taken / Math.max(1, capacity)) * 100)));

  return (
    <main className="min-h-screen bg-transparent py-14 text-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <header className="text-center">
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">Start Building Your Newsletter Revenue Machine Today</h1>
          <p className="mt-3 text-sm text-slate-300">Everything you need to launch and monetize — fast.</p>
        </header>

        {/* Pricing card */}
        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Value table */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-white">What You Get</h2>
                <ul className="mt-4 space-y-3 text-slate-200">
                  {CORE_ROWS.map(function (r, i) {
                    return (
                      <li key={"c" + i} className="flex items-start gap-3">
                        <span className="mt-0.5 rounded-full bg-emerald-600/20 p-1 ring-1 ring-emerald-500/40"><CheckIcon className="h-5 w-5 text-emerald-300" /></span>
                        <span>{r.label}</span>
                      </li>
                    );
                  })}
                  <li className="pt-3 text-xs uppercase tracking-wider text-slate-300/80">Special Bonuses</li>
                  {BONUS_ROWS.map(function (r, i) {
                    return (
                      <li key={"b" + i} className="flex items-start gap-3">
                        <span className="mt-0.5 rounded-full bg-yellow-400/20 p-1 ring-1 ring-yellow-300/40"><CheckIcon className="h-5 w-5 text-yellow-300" /></span>
                        <span>{r.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-white">Value</h2>
                <ul className="mt-4 space-y-3 text-slate-200">
                  {CORE_ROWS.map(function (r, i) {
                    return (
                      <li key={"cv" + i} className="flex items-center justify-between gap-3">
                        <span className="sr-only">value</span>
                        <span className="ml-auto font-bold">{r.value}</span>
                      </li>
                    );
                  })}
                  <li className="pt-3 text-xs uppercase tracking-wider text-slate-300/80">&nbsp;</li>
                  {BONUS_ROWS.map(function (r, i) {
                    return (
                      <li key={"bv" + i} className="flex items-center justify-between gap-3">
                        <span className="sr-only">bonus value</span>
                        <span className={`ml-auto font-bold ${/priceless/i.test(r.value) ? "text-emerald-300" : ""}`}>{r.value}</span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-4 border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between text-white font-extrabold">
                    <span>TOTAL VALUE</span>
                    <span className="text-2xl">{usd(2229)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price focus */}
          <aside className="rounded-3xl ring-1 ring-yellow-300/50 border border-white/10 bg-gradient-to-br from-yellow-400/20 to-amber-300/20 p-6 text-slate-900 shadow-yellow-400/10">
            <div className="rounded-2xl bg-white/70 p-4 text-center">
              <div className="text-xs font-extrabold uppercase tracking-widest text-slate-700">Today Only</div>
              <div className="mt-2 text-3xl md:text-4xl font-extrabold text-slate-400 line-through decoration-rose-400/70 decoration-4">{usd(2229)}</div>
              <div className="mt-1 text-5xl md:text-6xl font-black"><span className="relative inline-block px-2 -mx-2 rounded-sm bg-[linear-gradient(180deg,transparent_62%,rgba(250,204,21,0.65)_0)]">{usd(earlyBird)}</span><span className="align-super ml-1 text-xs font-extrabold uppercase tracking-widest">Early Bird</span></div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-700">Limited Time Offer • Save $1,732</div>
              <button
                type="button"
                onClick={() => {
                  document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-4 inline-flex w-full items-center justify-center px-8 py-4 text-base font-bold text-black bg-yellow-400 border border-transparent rounded-md hover:bg-yellow-500 transition-colors duration-200"
              >
                Join Build to Profit Now — {usd(earlyBird)}
              </button>
              <div className="mt-3 grid grid-cols-3 items-center gap-2 text-[11px] font-semibold text-slate-800">
                <div className="flex items-center justify-center gap-1 whitespace-nowrap"><BoltIcon /> {taken} of {capacity} spots</div>
                <div className="flex items-center justify-center gap-1 whitespace-nowrap"><ClockIcon /> {parts.expired ? "Ended" : `${parts.days}d ${String(parts.hours).padStart(2, '0')}h`}</div>
                <div className="flex items-center justify-center gap-1 whitespace-nowrap"><LockIcon /> Secure checkout</div>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/60">
                <div className="h-full rounded-full bg-yellow-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-white font-bold">
              {[
                "✅ Instant access to everything",
                "✅ Recorded workshop sessions",
                "✅ 90 Days community access",
              ].map(function (s, i) { return <li key={i} className="text-sm" >{s}</li>; })}
            </ul>
          </aside>
        </section>

        {/* What happens next */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <h3 className="text-lg font-extrabold text-white">🎯 What happens next:</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-6 text-slate-200 text-sm">
            <li>Click the button above</li>
            <li>Complete secure checkout (Stripe)</li>
            <li>Get instant email with login details</li>
            <li>Get instant access to the Workshop recordings</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
