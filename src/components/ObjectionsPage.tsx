"use client";
import React, { useMemo, useState, useId } from "react";

// ==============================================
// Objections – Standalone Page (Curiosity-Driven)
// Replaces <details> with an accessible custom disclosure
// header that shows the QUESTION title and a curiosity prompt.
// Keeps progress bar and right-rail CTA. Tests unchanged.
// ==============================================

export type ObjectionItem = { q: string; a: React.ReactNode };
export const OBJECTION_ITEMS: ObjectionItem[] = [
  {
    q: "What if I don't have time for live sessions?",
    a: (
      <p className="text-slate-200">
        Recordings are available within 24 hours. But here's the truth: If you don't have 2 hours for the live sessions,
        you don't have time to build a business. <span className="font-semibold text-white">This IS the shortcut.</span>
      </p>
    ),
  },
  {
    q: "What if I don't have a big audience yet?",
    a: (
      <p className="text-slate-200">
        Perfect. You don't need one. Members have launched successfully with
        <span className="font-semibold text-white"> 200–500 subscribers</span>. One member made
        <span className="font-semibold text-white"> $2,800</span> with <span className="font-semibold text-white">847 subscribers</span>.
        <span className="text-emerald-300 font-semibold"> Conversion beats scale.</span>
      </p>
    ),
  },
  {
    q: "What if I'm not a 'writer'?",
    a: (
      <p className="text-slate-200">
        You don't need to be Hemingway. You need to help people solve problems. If you can text a friend, you can write a
        newsletter. <span className="font-semibold text-white">We give you templates.</span>
      </p>
    ),
  },
  {
    q: "What if my niche is too small/weird/competitive?",
    a: (
      <p className="text-slate-200">
        We've had members in: knitting, cryptocurrency, parenting, SaaS, coaching, fitness, finance, poetry, gaming.
        If there's an audience, there's a business.
      </p>
    ),
  },
  {
    q: "What if I've already tried launching and failed?",
    a: (
      <p className="text-slate-200">
        Good. You learned what doesn't work. Now learn what does. Most successful creators "failed" 2–3 times before they figured it out.
        <span className="font-semibold text-white"> This gives you the system to get it right.</span>
      </p>
    ),
  },
  {
    q: "What if I can't afford it?",
    a: (
      <p className="text-slate-200">
        Can you afford to wait another 6 months making $0 from your newsletter? That's $0–$5,000+ in lost revenue.
        <span className="font-semibold text-white"> Build to Profit pays for itself in your first launch if you show up and implement.</span>
      </p>
    ),
  },
];

function QuestionIcon({ className = "h-6 w-6" }: { className?: string }) {
  // Inviting chat-bubble question mark
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" d="M4 12.5C4 7.81 7.94 4 12.9 4S22 7.81 22 12.5 18 21 13.1 21c-.94 0-1.85-.12-2.69-.36-.21-.06-.43-.03-.61.08L6.9 22.7a.8.8 0 0 1-1.16-.72l.03-2.04c0-.23-.11-.45-.3-.59A8.5 8.5 0 0 1 4 12.5Z" />
      <path fill="#ffffff" d="M12 8.2c1.72 0 3 1 3 2.4 0 .95-.52 1.54-1.44 2-.77.36-1.06.7-1.06 1.28v.22h-1.6v-.24c0-1.1.65-1.73 1.55-2.15.8-.37 1.15-.72 1.15-1.1 0-.5-.5-.9-1.6-.9-1.05 0-1.66.46-1.74 1.22H8.7C8.9 9.3 10.2 8.2 12 8.2Z" />
      <circle cx="12" cy="15.9" r="1" fill="#ffffff" />
    </svg>
  );
}

function ChevronIcon({ className = "h-5 w-5 text-slate-300" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.17l3.71-2.94a.75.75 0 1 1 .94 1.16l-4.24 3.36a.75.75 0 0 1-.94 0L5.25 8.39a.75.75 0 0 1-.02-1.18Z" clipRule="evenodd" />
    </svg>
  );
}

// Accessible custom disclosure item
function DisclosureItem({
  idx,
  q,
  children,
  isOpen,
  onToggle,
}: {
  idx: number;
  q: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: (next: boolean) => void;
}) {
  const panelId = useId();
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-tr from-orange-400/10 via-emerald-400/10 to-indigo-400/10 p-[1px]">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
        {/* Answered tag (subtle) */}
        <span className={`pointer-events-none absolute right-4 top-4 rotate-3 rounded bg-emerald-600/10 px-2 py-1 text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 ring-1 ring-emerald-400/30 transition ${isOpen ? "opacity-100" : "opacity-0"}`}>Answered</span>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(!isOpen)}
          className="flex w-full items-start gap-3 text-left"
        >
          <span className="rounded-xl bg-orange-300/15 p-2 ring-1 ring-orange-400/40 shadow-inner">
            <QuestionIcon className="h-6 w-6 text-orange-200" />
          </span>
          <span className="flex-1">
            <span className="block text-base font-semibold text-white">{q}</span>
            <span className="mt-1 block text-xs italic text-slate-300">
              Curious? Open to see <span className="text-white">exactly</span> how we handle this.
            </span>
          </span>
          <ChevronIcon className={`ml-auto h-5 w-5 text-slate-300 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </button>

        {/* Smoothly collapsing panel using CSS grid trick */}
        <div className={`mt-3 border-t border-white/10 pt-3 text-sm leading-relaxed grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div id={panelId} className="overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ObjectionsPage() {
  // Track which items are open to drive a subtle progress cue (no numbers shown)
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const openedCount = useMemo(() => Object.values(open).filter(Boolean).length, [open]);
  const progress = useMemo(() => (OBJECTION_ITEMS.length ? Math.round((openedCount / OBJECTION_ITEMS.length) * 100) : 0), [openedCount]);

  return (
    <main className="min-h-screen bg-transparent py-14 text-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="inline-block rounded-full bg-slate-800/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-slate-300 ring-1 ring-white/10">Before you decide</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            But wait... what if...
          </h1>
          <p className="mt-3 text-sm text-slate-300">Real objections. Clear answers. No fluff.</p>

          {/* Clarity bar – fills as items are opened; no numbers displayed */}
          <div className="mx-auto mt-6 h-2 w-full max-w-md rounded-full bg-white/10" role="progressbar" aria-label="Clarity"
               aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-yellow-300 to-orange-400 transition-[width] duration-500" style={{ width: `${progress}%` }} />
          </div>
        </header>

        {/* Content layout: questions on the left, supportive note on the right */}
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-4">
            {OBJECTION_ITEMS.map((it, idx) => (
              <DisclosureItem
                key={idx}
                idx={idx}
                q={it.q}
                isOpen={!!open[idx]}
                onToggle={(next) => setOpen((o) => ({ ...o, [idx]: next }))}
              >
                {it.a}
              </DisclosureItem>
            ))}
          </section>

          {/* Right rail – friendly reassurance & CTA */}
          <aside className="lg:col-span-1">
            <div className="sticky top-10 space-y-4">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-600/10 p-5">
                <p className="text-sm font-semibold text-emerald-300">Good news</p>
                <p className="mt-2 text-sm text-slate-200">Most members had these questions too. They shipped anyway — and won. You're not behind; you're starting.</p>
              </div>
              <div className="rounded-2xl border border-orange-500/40 bg-gradient-to-br from-orange-300/10 to-orange-400/10 p-5">
                <p className="text-sm font-semibold text-orange-300">Shortcut</p>
                <p className="mt-2 text-sm text-slate-200">Templates, sequences, and coaching mean you won't stare at a blank page. You execute, we guide.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-300">Ready when you are</p>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-3 inline-flex w-full items-center justify-center px-5 py-3 text-sm font-extrabold text-slate-900 rounded-xl border border-yellow-300 bg-yellow-400 shadow transition hover:-translate-y-0.5 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
                >
                  Get the System — Start Your Launch
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
