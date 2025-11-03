import React from "react";

// =============================
// PAS (Problem–Agitate–Solution) – Standalone Page
// Renders JUST the PAS section you asked for, with stronger pain emphasis.
// =============================
export type PASSectionProps = {
  headline?: string;
  problemBullets?: string[];
  blockers?: string[];
  months?: number; // used for the loss calculation sentence
  pricePerMonth?: number; // used for the loss calculation sentence
  concludingLine?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
  id?: string;
};

export function calculateLostRevenue(months: number = 6, pricePerMonth: number = 297) {
  const m = Number.isFinite(months) ? Math.max(0, Math.floor(months)) : 0;
  const p = Number.isFinite(pricePerMonth) ? Math.max(0, Math.floor(pricePerMonth)) : 0;
  return m * p;
}

export function formatCurrencyEUR(amount: number) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    // Fallback if Intl is unavailable
    return `$${String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }
}

export function PASSection({
  headline = `You've Been "Getting Ready" For Months... Maybe Years`,
  problemBullets = [
    "You've read the articles.",
    "Taken the courses.",
    "Optimized your homepage.",
    "Planned your offer.",
    "But you still haven't launched.",
  ],
  blockers = [
    "Because there's always one more thing to learn.",
    "One more tweak to make.",
    'One more "expert" to follow.',
  ],
  months = 6,
  pricePerMonth = 297,
  concludingLine = 'The cost of "getting ready" isn\'t the course you didn\'t buy. It\'s the revenue you didn\'t make.',
  ctaLabel = "Start launching",
  ctaHref = "#form-section",
  className = "",
  id,
}: PASSectionProps) {
  const lost = calculateLostRevenue(months, pricePerMonth);
  const lostCurrency = formatCurrencyEUR(lost);

  return (
    <section id={id} className={`w-[80%] mx-auto ${className}`} aria-label="Problem–Agitate–Solution">
      {/* Unified dark gradient surface */}
      <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 bg-gradient-to-b from-black via-zinc-900 to-black">
        {/* Subtle top pulse bar to suggest urgency */}
        <div className="h-1 w-full bg-gradient-to-r from-orange-300 via-red-500 to-orange-400" />

        <div className="p-6 sm:p-10">
          <div className="grid gap-10 md:grid-cols-2 md:gap-12">
            {/* Left – Problem copy */}
            <div>
              <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                {headline}
              </h1>

              {/* Pain chips (press on blockers) */}
              <div className="mt-4 flex flex-wrap gap-2">
                {blockers.map((b, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-[12px] sm:text-[13px] font-bold tracking-wide text-white shadow"
                  >
                    {b}
                  </span>
                ))}
              </div>

              <ul className="mt-6 space-y-3 text-slate-200">
                {problemBullets.map((line, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" aria-hidden />
                    <span className={line.includes("haven't launched") ? "font-semibold text-red-300" : undefined}>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right – Agitate + Solution merged */}
            <div>
              <div className="space-y-4 text-slate-300">
                <p>Meanwhile, creators with worse content and smaller audiences are making money.</p>
                <p>Not because they're smarter.</p>
                <p>
                  <span className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-sm md:text-base font-bold tracking-wide text-white shadow">
                    Because they stopped learning and started launching.
                  </span>
                </p>
                <p className="pt-2 text-slate-200">How much money have you already lost by waiting?</p>
                <p>
                  If you'd launched <span className="font-semibold text-slate-100">{months} {months === 1 ? "month" : "months"}</span> ago at just
                  {' '}<span className="font-semibold text-slate-100">{formatCurrencyEUR(pricePerMonth)}/month</span>, that's
                  {' '}
                  <span className="relative inline-block font-extrabold text-red-400 md:text-red-500">
                    {/* emphasize the euro loss with an underline glow */}
                    <span className="relative z-10">{lostCurrency}</span>
                    <span className="absolute inset-x-0 bottom-0 z-0 h-2 translate-y-1 rounded-full bg-red-500/30 blur-sm" aria-hidden />
                  </span>
                  {' '}you'll never get back.
                </p>
                <p className="text-slate-300">{concludingLine}</p>
              </div>

              <div className="mt-6">
                <a
                  href={ctaHref}
                  aria-label="Start launching"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black bg-yellow-400 border border-transparent rounded-md hover:bg-yellow-500 transition-colors duration-200"
                >
                  {ctaLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Standalone Page (default export) ----
// For embedding inside existing pages, export PASSection as default to avoid extra page padding
export default PASSection;
