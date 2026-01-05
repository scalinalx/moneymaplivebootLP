"use client";
import React, { useId, useMemo, useState } from "react";

// ==============================================
// Frequently Asked Questions – Standalone Page
// Palette: site gradient bg, clean accordion with accessible controls
// - No nullish coalescing used
// - Avoids event pooling pitfalls
// ==============================================

export type FaqItem = { q: string; a: React.ReactNode };

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How long do I have access for?",
    a: (
      <p className="text-slate-200">
        You get <span className="font-semibold text-white">lifetime access</span> to the complete workshop recordings, the template library, and our private community. You can start building today and implement at your own pace whenever you're ready.
      </p>
    ),
  },
  {
    q: "I don't have an audience yet. Is this too advanced?",
    a: (
      <p className="text-slate-200">
        Not at all. Build to Profit helps you START with strategy first, so you don't waste months building the wrong thing. Several members launched with <span className="font-semibold text-white">under 100 subscribers</span>.
      </p>
    ),
  },
  {
    q: "I already have Money Map. Why do I need this?",
    a: (
      <p className="text-slate-200">
        Money Map gives you strategy. Build to Profit gives you <span className="font-semibold text-white">IMPLEMENTATION</span>. If you have Money Map, check your email for your exclusive <span className="font-semibold text-white">$279 upgrade offer</span> (expires Nov 4). You'll get the live sessions, templates, and community access.
      </p>
    ),
  },
  {
    q: "What if my niche is too specific/weird?",
    a: (
      <p className="text-slate-200">
        We've worked with creators in knitting, cryptocurrency, poetry, SaaS, parenting, finance, gaming, and more. If there's an audience, there's a way to monetize. The frameworks work across <span className="font-semibold text-white">ALL</span> niches.
      </p>
    ),
  },
  {
    q: "How is this different from other courses?",
    a: (
      <p className="text-slate-200">
        Most courses are "watch and figure it out yourself." Build to Profit is <span className="font-semibold text-white">build together live with feedback</span>. You're not learning in isolation — you're implementing with a cohort and getting real-time coaching.
      </p>
    ),
  },
  {
    q: "What if I've already tried to monetize and failed?",
    a: (
      <p className="text-slate-200">
        Good. That means you learned what doesn't work. Most successful creators "failed" 2–3 times before getting it right. Build to Profit gives you the system to avoid those mistakes this time.
      </p>
    ),
  },
  {
    q: "Is there a payment plan?",
    a: (
      <p className="text-slate-200">
        Not for Build to Profit (it's already 82% off). However, if you join and succeed, you may be invited to the Accelerator which offers payment plans.
      </p>
    ),
  },
  {
    q: "How long do I have access?",
    a: (
      <p className="text-slate-200">
        Lifetime. Build to Profit, all recordings, templates, community — forever. You can join future monthly cohorts at no extra cost.
      </p>
    ),
  },
  {
    q: "What platform do I need? Only Substack?",
    a: (
      <p className="text-slate-200">
        The strategies work on any newsletter platform (Substack, Beehiiv, ConvertKit, Ghost, etc.). <span className="font-semibold text-white">90% of the content is platform-agnostic.</span>
      </p>
    ),
  },
];

function QuestionIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" d="M12 2.5c5.25 0 9.5 4.25 9.5 9.5s-4.25 9.5-9.5 9.5S2.5 17.25 2.5 12 6.75 2.5 12 2.5Zm0 4.7c1.9 0 3.3 1.1 3.3 2.7 0 1.06-.56 1.74-1.67 2.29-.96.47-1.33.9-1.33 1.69v.3h-1.9v-.34c0-1.36.8-2.19 1.86-2.72.98-.46 1.38-.88 1.38-1.34 0-.6-.63-1.1-1.64-1.1-1.08 0-1.8.5-1.93 1.34H8.48C8.72 9.1 10.02 7.2 12 7.2Zm-1 7.95c0-.6.45-1.05 1.05-1.05s1.05.45 1.05 1.05S12.65 16.25 12.05 16.25 11 15.8 11 15.15Z" />
    </svg>
  );
}

function ChevronIcon({ className = "h-5 w-5 text-slate-300" }: { className?: string }) {
  // Minimal chevron-down (stroked), no circle
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-tr from-indigo-400/10 via-blue-400/10 to-emerald-400/10 p-[1px]">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={function () { onToggle(!isOpen); }}
          className="flex w-full items-center gap-3 text-left"
        >
          <span className="flex-1">
            <span className="block text-base font-semibold text-white">{q}</span>
            <span className="mt-1 block text-xs italic text-slate-300">Tap to reveal the answer.</span>
          </span>
          <ChevronIcon className={"ml-auto h-5 w-5 text-slate-300 transition-transform " + (isOpen ? "rotate-180" : "rotate-0")} />
        </button>

        <div className={"mt-3 border-t border-white/10 pt-3 text-sm leading-relaxed grid transition-[grid-template-rows] duration-300 " + (isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
          <div id={panelId} className="overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  // allow multiple items open at once
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const opened = useMemo(function () { return Object.values(open).filter(Boolean).length; }, [open]);

  return (
    <main className="min-h-screen bg-transparent py-14 text-slate-200">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">Frequently Asked Questions</h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">Answers to the most common questions about Build to Profit. Open the ones that apply to you.</p>
          <div className="mx-auto mt-5 h-2 w-full max-w-md rounded-full bg-white/10" role="progressbar" aria-valuemin={0} aria-valuemax={FAQ_ITEMS.length} aria-valuenow={opened}>
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-yellow-300 to-orange-400 transition-[width] duration-500" style={{ width: String(Math.round((opened / Math.max(1, FAQ_ITEMS.length)) * 100)) + "%" }} />
          </div>
        </header>

        <section className="mt-10 space-y-4">
          {FAQ_ITEMS.map(function (it, idx) {
            return (
              <DisclosureItem
                key={idx}
                idx={idx}
                q={it.q}
                isOpen={Boolean(open[idx])}
                onToggle={function (next) { setOpen(function (o) { return { ...o, [idx]: next }; }); }}
              >
                {it.a}
              </DisclosureItem>
            );
          })}
        </section>
      </div>
    </main>
  );
}
