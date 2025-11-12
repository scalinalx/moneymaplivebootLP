import React from "react";

// ==============================================
// Value Stack – Standalone Page (Visual Checkmarks)
// Renders JUST the value stack section.
// ==============================================

function formatCurrencyUSD(amount: number) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${String(Math.round(amount)).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",")}`;
  }
}

function percentOff(total: number, price: number) {
  if (!Number.isFinite(total) || total <= 0 || !Number.isFinite(price) || price < 0) return 0;
  const pct = (1 - price / total) * 100;
  return Math.round(pct);
}

function CheckIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 7.28a.75.75 0 0 0-1.06-1.06l-4.72 4.72-1.72-1.72a.75.75 0 1 0-1.06 1.06l2.25 2.25c.293.293.767.293 1.06 0l5.25-5.25Z" />
    </svg>
  );
}

function NeonSeparator() {
  return (
    <div className="relative my-8 flex items-center justify-center">
      {/* left line */}
      <div className="h-px w-1/3 max-w-sm bg-gradient-to-r from-transparent via-cyan-400 to-cyan-300/40 blur-[0.3px] shadow-[0_0_12px_0_rgba(34,211,238,0.6)]" />
      {/* center node with chevron */}
      <div className="mx-3 relative flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/20 ring-2 ring-cyan-400/70 shadow-[0_0_20px_4px_rgba(34,211,238,0.45)]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]">
          <path fillRule="evenodd" d="M12 16a.75.75 0 0 1-.53-.22l-5-5a.75.75 0 1 1 1.06-1.06L12 14.19l4.47-4.47a.75.75 0 1 1 1.06 1.06l-5 5A.75.75 0 0 1 12 16Z" clipRule="evenodd" />
        </svg>
        <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-cyan-400/20 blur-md" />
      </div>
      {/* right line */}
      <div className="h-px w-1/3 max-w-sm bg-gradient-to-l from-transparent via-cyan-400 to-cyan-300/40 blur-[0.3px] shadow-[0_0_12px_0_rgba(34,211,238,0.6)]" />
    </div>
  );
}

export default function ValueStackPage() {
  const totalValue = 2735;
  const yourPrice = 497;
  const regularPrice = 997;
  const off = percentOff(totalValue, yourPrice); // 82

  return (
    <main className="bg-transparent pt-8 pb-4 text-slate-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">What You Get When You Join <span className="block">Build to Profit</span></h1>
          <div className="mt-3 text-lg sm:text-xl md:text-2xl font-extrabold text-yellow-300">
            Secure the $497 launch rate by Nov 18th
          </div>
        </header>

        <section className="mt-10 space-y-6">
          {/* Item 1 – moved: Launch to Profit first */}
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 rounded-full bg-emerald-600/20 p-1 ring-1 ring-emerald-500/40">
                <CheckIcon className="h-5 w-5 text-emerald-400" />
              </span>
              <div className="flex-1">
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <h2 className="text-xl md:text-2xl font-extrabold text-white">2x Live Implementation Sessions <span className="font-medium text-slate-300">({formatCurrencyUSD(997)} value)</span></h2>
                    <svg className="h-5 w-5 text-slate-300 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="mt-3 pt-2 border-t border-white/10">
                    <p className="text-sm">2 x 1-hour live Zoom sessions with Ana + max 29 other creators</p>
                    <p className="mt-1 text-sm font-semibold text-yellow-300">This is where strategy becomes MONEY.</p>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-orange-500/70 bg-gradient-to-br from-orange-300/20 to-orange-400/10 p-4">
                        <p className="text-sm font-semibold text-white">Day 1 - Build Day (Nov 18, 9am EET):</p>
                        <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-left">
                          <li>Build or fix your offer (live, together)</li>
                          <li>Write your 4-email launch sequence (copy-paste templates provided)</li>
                          <li>Map your 14-day launch plan (no guessing)</li>
                          <li>Get hot seat coaching on YOUR specific offer</li>
                        </ul>
                      </div>
                      <div className="rounded-xl border border-orange-500/70 bg-gradient-to-br from-orange-300/20 to-orange-400/10 p-4">
                        <p className="text-sm font-semibold text-white">Day 2 - Launch Day (Nov 19, 9am EET):</p>
                        <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-left">
                          <li>Troubleshoot what's working (live feedback)</li>
                          <li>Learn how to close your first 10 customers (objection handling scripts)</li>
                          <li>Create post-launch momentum (keep sales coming after launch ends)</li>
                          <li>Celebrate wins together (accountability fuel)</li>
                        </ul>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-300"><span aria-hidden>📹</span> Can't attend live? Recordings sent within 24 hours. But live is where magic happens.</p>
                    <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-600/15 px-4 py-1.5 text-[15px] font-bold text-emerald-300 ring-1 ring-emerald-500/30">
                      <span aria-hidden>🎯</span>
                      Outcome: You launch within 14 days with a complete system that works
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </article>
          {/* Bridge line under first card removed per request */}
        </section>

        {/* Value summary chips moved to end */}
        <div className="mt-8 text-center">
          {/* Early bird with attached CRO discount badge */}
          <div className="mt-3 flex items-center justify-center">
            <span className="relative inline-flex items-center justify-center gap-3 rounded-md bg-yellow-400 px-12 py-3 text-2xl sm:text-3xl font-extrabold text-slate-900 ring-2 ring-yellow-300 shadow-lg shadow-yellow-400/30 min-w-[22rem] sm:min-w-[32rem]">
              Early Bird (Today): {formatCurrencyUSD(yourPrice)}
              {/* Attached discount badge (CRO) */}
              <span
                className="absolute -top-2 -right-2 rounded-full bg-rose-600 px-3 py-1 text-xs sm:text-sm font-black uppercase tracking-wider text-white ring-2 ring-rose-300 shadow-md shadow-rose-600/40"
                aria-hidden
              >
                50% OFF
              </span>
            </span>
          </div>
        </div>

        {/* Optional CTA footer */}
        <footer className="mt-2 flex items-center justify-center">
          <button
            type="button"
            onClick={() => {
              document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black bg-yellow-400 border border-transparent rounded-md hover:bg-yellow-500 transition-colors duration-200"
          >
            Save Your Seat Until Nov 18th
          </button>
        </footer>
      </div>
    </main>
  );
}
