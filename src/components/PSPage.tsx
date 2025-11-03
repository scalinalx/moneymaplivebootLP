import React from "react";

// ==============================================
// P.S. – Standalone Page (final nudge section)
// Palette: site gradient bg, subtle yellow/emerald accents
// ==============================================

function FeatherIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M20.24 7.76a6.5 6.5 0 0 0-9.19 0L3 15.81V21h5.19l8.05-8.05a6.5 6.5 0 0 0 0-9.19Z" fill="currentColor" />
      <path d="M14 7 7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function AnchorBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full bg-yellow-400/90 px-5 py-1.5 text-[18px] font-extrabold uppercase tracking-wider text-slate-900 ring-2 ring-yellow-300 shadow-yellow-400/40 shadow">
      <FeatherIcon className="h-6 w-6" />
      <span className="leading-none" aria-hidden>
        🤫
      </span>
      {children}
    </span>
  );
}

export default function PSPage() {
  return (
    <main className="min-h-screen bg-transparent py-14 text-slate-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center">
          <AnchorBadge>P.S.</AnchorBadge>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            Still reading? That means you’re serious.
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">A final nudge to choose action over endless prep.</p>
        </header>

        {/* Card */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-md">
          <div className="space-y-6">
            {/* P.S. */}
            <article className="relative">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white ring-1 ring-white/15">
                <span>P.S.</span>
              </div>
              <p className="text-base leading-relaxed text-slate-200">
                If you’re still reading, you’re serious. You’ve been building, learning, preparing. Maybe for months. Maybe years. The gap between where you are and where you want to be isn’t more knowledge — it’s <span className="font-semibold text-white">implementation</span>. <span className="font-semibold text-white">Build to Profit</span> is the bridge. I can’t do the work for you. But I can give you the exact system, live coaching, and community support to make it happen. The question isn’t <span className="italic">“Is this worth <span className="font-bold text-white">$597</span>?”</span> The question is: <span className="underline decoration-yellow-400/70 decoration-4 underline-offset-4 font-semibold text-white">“How much more money will I lose by waiting?”</span> <span className="text-slate-300">See you in the live sessions.</span> — <span className="italic">Ana</span>
              </p>
            </article>

            {/* P.P.S. */}
            <article>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white ring-1 ring-white/15">
                <span>P.P.S.</span>
              </div>
              <p className="text-base leading-relaxed text-slate-200">
                Early bird ends <span className="font-semibold text-white">November 8</span>. After that, Build to Profit goes to <span className="font-semibold text-white">$997</span>. That’s <span className="font-extrabold text-emerald-300">$300</span> for waiting <span className="font-semibold text-white">9 days</span>. If you know you need this, <span className="font-semibold text-white">grab it now</span>.
              </p>
            </article>

            {/* P.P.P.S. */}
            <article>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white ring-1 ring-white/15">
                <span>P.P.P.S.</span>
              </div>
              <p className="text-base leading-relaxed text-slate-200">
                Only <span className="font-extrabold text-white">12</span> spots left in the November cohort. Once we hit <span className="font-semibold text-white">30</span>, enrollment closes until <span className="font-semibold text-white">December 9</span>. If you want to launch in November, <span className="font-semibold text-white">this is your window</span>.
              </p>
            </article>
          </div>

          {/* Micro-CTA (optional, subtle) */}
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => {
                document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center rounded-xl border border-yellow-300 bg-yellow-400 px-5 py-3 text-sm font-extrabold text-slate-900 shadow transition hover:-translate-y-0.5 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
            >
              Yes, I’m done waiting — Join Build to Profit ($597)
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
