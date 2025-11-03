import React from "react";

// ==============================================
// Final Urgency – Standalone Page
// "Two Paths. One Decision."
// Palette: site gradient bg; left (wait) grayscale+red tint; right (join) emerald color
// Safe JS (no nullish coalescing). Includes optional tests at bottom (commented).
// ==============================================

function XIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M5 13l4.5 4L19 7" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FinalUrgencyPage() {
  return (
    <main className="bg-transparent pt-8 pb-4 text-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">Two Paths. One Decision.</h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">Choose momentum over maintenance. Your next 30 days can compound for the next 6 months.</p>
        </header>

        {/* Paths */}
        <section className="relative mt-6 grid gap-6 lg:grid-cols-2">
          {/* Centered VS medallion (desktop) */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:flex items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-white/10 text-white/70 backdrop-blur-md ring-1 ring-white/20 flex items-center justify-center text-xs font-extrabold">
              VS
            </div>
          </div>
          {/* Path 1 – Keep Waiting */}
          <article className="relative overflow-hidden rounded-3xl border border-white/15 p-6 backdrop-blur-md saturate-100 contrast-95 ring-1 ring-red-500/30 bg-gradient-to-br from-red-700/12 via-slate-700/10 to-slate-600/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] shadow-red-800/10">
            <div className="pointer-events-none absolute -top-20 -left-20 h-56 w-56 rounded-full bg-red-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-red-700/8 blur-3xl" />
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-red-600/15 p-2 ring-1 ring-red-500/40 shadow shadow-red-900/5"><XIcon className="h-5 w-5 text-red-200" /></span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">Path 1: Keep Waiting</h2>
            </div>
            <div className="mt-4 space-y-3 text-slate-300">
              <p>Stay in research mode. Read another article. Watch another YouTube video. Tell yourself you'll launch "when you're ready."</p>
              <p><span className="font-semibold text-white">6 months from now</span>, you'll still be preparing.</p>
              <p>And you'll have <span className="font-extrabold text-red-200 underline decoration-red-200 decoration-1">$0</span> to show for it.</p>
            </div>
          </article>

          {/* Path 2 – Join Build to Profit */}
          <article className="relative overflow-hidden rounded-3xl border ring-2 ring-emerald-400/60 bg-gradient-to-br from-emerald-500/20 to-emerald-400/15 p-6 backdrop-blur-md shadow-lg shadow-emerald-500/20">
            <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-emerald-600/15 p-2 ring-1 ring-emerald-500/30"><CheckIcon className="h-5 w-5 text-emerald-300" /></span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">Path 2: Join Build to Profit</h2>
            </div>
            <div className="mt-4 space-y-3 text-slate-100">
              <p>Get the complete system. Launch with a cohort. Make your first sales in <span className="font-extrabold">30 days</span>.</p>
              <p><span className="font-semibold">6 months from now</span>, you'll have a profitable newsletter business and <span className="font-extrabold text-emerald-300">$15K–$30K</span> in revenue.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-md border border-transparent bg-yellow-400 px-8 py-4 text-base font-bold text-black transition-colors duration-200 hover:bg-yellow-500"
            >
              Choose Path 2 <ArrowRightIcon />
            </button>
          </article>
        </section>

        {/* Footer line */}
        <p className="mt-3 text-center text-sm text-slate-300">
          The difference isn't talent. <span className="font-semibold text-white">It's decision.</span>
        </p>
      </div>
    </main>
  );
}
