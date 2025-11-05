import React from "react";

// ==============================================
// Comparison – Standalone Page
// Build to Profit vs. Figuring It Out Alone
// Palette: site gradient bg, **B&W** for "On Your Own", **color** (emerald) for "With Build to Profit".
// Fix: replace nullish coalescing (??) with logical OR (||) for broader env support.
// ==============================================

const LEFT_LABEL = "On Your Own";
const RIGHT_LABEL = "With Build to Profit";

const LEFT_ITEMS: string[] = [
  "Spend 6+ months researching",
  "Trial and error (expensive mistakes)",
  "No feedback on your offer",
  "Launch alone (scary)",
  "Generic advice from Google",
  "$0-$500 in first 6 months",
  "Total cost: 6 months of lost revenue",
];

const RIGHT_ITEMS: string[] = [
  "Launch in 30 days",
  "Proven system (avoid mistakes)",
  "Live hot seat coaching",
  "Launch with cohort (supported)",
  "Specific guidance for YOUR business",
  "$2,970-$5,000+ in first 30 days",
  "Total cost: $497 (2X ROI in 30 days)",
];

function XIcon({ className = "h-5 w-5" }: { className?: string }) {
  // Distinctive, clean stroked X (no circle)
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  // Distinctive, clean stroked checkmark (no circle)
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M5 13l4.5 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SideHeader({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-extrabold uppercase tracking-wider ring-2 shadow-lg ${
      isLeft
        ? "bg-gradient-to-r from-red-700/40 to-slate-900/70 text-slate-100 ring-red-400/50 shadow-red-700/30"
        : "bg-emerald-600 text-white ring-emerald-400/60 shadow-emerald-600/30"
    }`}>
      {isLeft ? <XIcon className="h-5 w-5 text-red-200" /> : <CheckIcon className="h-5 w-5 text-white" />}
      {isLeft ? LEFT_LABEL : RIGHT_LABEL}
    </div>
  );
}

function Row({ left, right }: { left: string; right: string }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-white/15 p-4 backdrop-blur-md grayscale contrast-75 ring-1 ring-red-400/40 bg-gradient-to-br from-red-500/15 via-white/5 to-white/5"><div className="flex items-start gap-3 text-slate-300"><span className="mt-0.5"><XIcon className="h-7 w-7 text-slate-400 drop-shadow" /></span>
          <span className="text-sm sm:text-base">{left}</span>
        </div>
      </div>
      <div className="rounded-2xl border ring-1 ring-emerald-400/30 bg-gradient-to-br from-emerald-500/10 to-emerald-400/10 p-4 backdrop-blur-md shadow-sm shadow-emerald-500/10"><div className="flex items-start gap-3 text-slate-100"><span className="mt-0.5"><CheckIcon className="h-7 w-7 text-emerald-400 drop-shadow" /></span>
          <span className="text-sm sm:text-base font-bold">{right}</span>
        </div>
      </div>
    </div>
  );
}

export default function ComparisonPage() {
  // Ensure parity between lists (dev-time assert)
  if (LEFT_ITEMS.length !== RIGHT_ITEMS.length) {
    // eslint-disable-next-line no-console
    console.warn("Comparison lists are uneven:", LEFT_ITEMS.length, RIGHT_ITEMS.length);
  }

  return (
    <main className="min-h-screen bg-transparent py-14 text-slate-200">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">Build to Profit vs. Figuring It Out Alone</h1>
          <p className="mt-3 text-sm text-slate-300">See the path that compounds results vs. the path that burns time.</p>
        </header>

        {/* Head-to-head labels */}
        <div className="relative mt-8">
          <div className="hidden sm:grid sm:grid-cols-2 sm:items-center sm:gap-6">
            <div className="flex justify-start"><SideHeader side="left" /></div>
            <div className="flex justify-start sm:justify-end"><SideHeader side="right" /></div>
          </div>

          {/* VS medallion (desktop only) */}
          <div className="pointer-events-none absolute inset-0 hidden sm:block">
            <div className="absolute left-1/2 top-1 h-10 w-10 -translate-x-1/2 rounded-full bg-white/10 text-white/70 backdrop-blur-md ring-1 ring-white/20 flex items-center justify-center text-xs font-extrabold">VS</div>
          </div>
        </div>

        {/* Rows */}
        <section className="mt-6 space-y-3">
          {LEFT_ITEMS.map((left, i) => (
            <Row key={i} left={left} right={RIGHT_ITEMS[i] || ""} />
          ))}
        </section>

        {/* CTA (optional) */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => {
              document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black bg-yellow-400 border border-transparent rounded-md hover:bg-yellow-500 transition-colors duration-200"
          >
            Join Build to Profit — $497 Today
          </button>
        </div>
      </div>
    </main>
  );
}
