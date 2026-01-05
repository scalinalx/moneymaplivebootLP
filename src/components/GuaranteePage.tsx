import React, { useLayoutEffect, useRef, useState } from "react";

// ==============================================
// Strong Guarantee – Standalone Page
// Renders JUST the guarantee section you specified.
// Palette: dark gradient bg, green guarantee accents, yellow CTA.
// ==============================================

type EligibilityParams = {
  launched: boolean;
  customers: number; // number of paying customers
  proofProvided: boolean; // screenshots of launch emails + offer created
  withinDays: number; // days from purchase until launch
  dayLimit?: number; // default 30
};

export function isRefundEligible({ launched, customers, proofProvided, withinDays, dayLimit = 30 }: EligibilityParams) {
  if (!launched) return false; // must launch
  if (!proofProvided) return false; // must send proof
  if (!Number.isFinite(customers) || customers < 0) return false;
  if (!Number.isFinite(withinDays) || withinDays < 0) return false;
  if (withinDays > dayLimit) return false; // launch must be within the window
  return customers < 3; // refund if fewer than 3 paying customers
}

function ShieldCheckIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.25a.75.75 0 0 1 .338.08l7.5 3.75a.75.75 0 0 1 .412.668V12c0 4.97-3.28 8.88-7.63 9.964a.75.75 0 0 1-.16 0C8.11 20.88 4.83 16.97 4.83 12V6.748a.75.75 0 0 1 .412-.668l7.5-3.75A.75.75 0 0 1 12 2.25Zm3.53 6.97a.75.75 0 0 0-1.06-1.06l-4 4-1.5-1.5a.75.75 0 1 0-1.06 1.06l2.03 2.03a.75.75 0 0 0 1.06 0l4.53-4.53Z" />
    </svg>
  );
}

// Auto-sizes a green checkmark to ~40% of the nearest pill's height
function AutoHalfCheck({ className = "text-emerald-400" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [size, setSize] = useState(12);

  useLayoutEffect(() => {
    const update = () => {
      const el = svgRef.current;
      if (!el) return;
      const pill = el.closest('[data-pill="true"]') as HTMLElement | null;
      const h = pill?.offsetHeight || 0;
      if (h > 0) {
        setSize(Math.max(10, Math.round(h * 0.4))); // ~40% of pill height, min 10px for visibility
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <path d="M4.5 12.75 9 17.25 19.5 6.75" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 rounded-full bg-emerald-600/20 p-1 ring-1 ring-emerald-500/40">
        <ShieldCheckIcon className="h-5 w-5 text-emerald-400" />
      </span>
      <span className="text-slate-200">{children}</span>
    </li>
  );
}

export default function GuaranteePage() {
  return (
    <main className="bg-page-radial pt-8 pb-5 text-slate-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center">          <div className="inline-flex items-center gap-3 rounded-full bg-emerald-600 px-6 py-3 text-lg sm:text-xl font-extrabold uppercase tracking-wider text-white ring-2 ring-emerald-400/50 shadow-lg shadow-emerald-600/30">
          <ShieldCheckIcon className="h-6 w-6" />
          RISK‑FREE GUARANTEE
        </div>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            The <span className="text-emerald-300">“Launch or It’s Free”</span> Guarantee
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-300 sm:text-lg">
            Launch within <strong className="text-white">30 days</strong> using the <strong className="text-white">Build to Profit</strong> system and get at least <strong className="text-white">3 paying customers</strong>.
          </p>
        </header>

        {/* Body */}
        <section className="mt-8 rounded-3xl ring-1 ring-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-md">
          <ul className="space-y-3">
            <CheckItem>
              If you don’t, email us proof you implemented (<span className="text-white font-semibold">screenshots of your launch emails sent</span>, <span className="text-white font-semibold">offer created</span>) and we’ll refund you <span className="font-extrabold text-white">100%</span>.
            </CheckItem>
            <CheckItem>
              <span className="text-white font-semibold text-xl">No questions asked. <span className="text-white font-semibold">Money‑back guaranteed.</span></span>
            </CheckItem>
          </ul>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-600/10 p-4">
              <p className="text-sm font-semibold text-emerald-300">Why this guarantee?</p>
              <p className="mt-2 text-sm text-slate-200">Because I’ve seen it work for <span className="font-semibold text-white">380+ creators</span>. If you show up, implement, and launch—you <span className="font-semibold text-white">WILL</span> make money.</p>
            </div>
            <div className="rounded-2xl border border-red-500/40 bg-red-600/10 p-4">
              <p className="text-sm font-semibold text-red-300">When it doesn’t apply</p>
              <p className="mt-2 text-sm text-slate-200">The only way this doesn’t work is if you don’t do the work.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span data-pill="true" className="inline-flex items-center gap-2 rounded-full bg-slate-800/70 px-4 py-2 text-xs font-semibold text-slate-200 ring-1 ring-white/10">
              <AutoHalfCheck />
              Proof required: screenshots of launch emails + offer created
            </span>
            <span data-pill="true" className="inline-flex items-center gap-2 rounded-full bg-slate-800/70 px-4 py-2 text-xs font-semibold text-slate-200 ring-1 ring-white/10">
              <AutoHalfCheck />
              Launch window: 30 days from purchase
            </span>
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => {
                document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black bg-yellow-400 border border-transparent rounded-md hover:bg-yellow-500 transition-colors duration-200"
            >
              Join Now — You’re Covered
            </button>
            <p className="mt-3 text-xs text-slate-400 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden className="h-3 w-3 text-emerald-400"><path d="M4.5 12.75 9 17.25 19.5 6.75" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span>Activate your guarantee automatically when you enroll.</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden className="h-3 w-3 text-emerald-400"><path d="M4.5 12.75 9 17.25 19.5 6.75" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
