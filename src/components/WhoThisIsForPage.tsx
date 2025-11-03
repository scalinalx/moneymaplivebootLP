"use client";
import React, { useMemo, useState } from "react";

// ==============================================
// Who This Is For – Standalone Page (with Visual Hook)
// Adds an engaging "Fit Meter" + interactive self-check highlighting.
// Palette: dark gradient bg, emerald for "FOR", red for "NOT".
// NOTE: Copy is unchanged; interactions are optional for engagement.
// ==============================================

export const FOR_ITEMS: string[] = [
  "✅ You have a newsletter (or newsletter idea) and need to monetize it without waiting for 10K subscribers",
  "✅ You're done \"getting ready\" and ready to launch in the next 30 days",
  "✅ You want step-by-step guidance with real-time feedback (not another course you watch alone)",
  "✅ You're willing to implement even if it's not perfect (70% ready beats 100% never)",
  "✅ You want to build a business that works in 2 hours/day, not 12",
];

export const NOT_FOR_ITEMS: string[] = [
  "❌ You're looking for \"get rich quick\" without doing the work",
  "❌ You want someone to build your business for you",
  "❌ You're not willing to actually launch (perfectionism over progress)",
  "❌ You're \"just researching\" and not ready to invest in yourself",
  "❌ You think you can figure it out alone (spoiler: you can, but it'll take 2 years instead of 30 days)",
];

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 7.28a.75.75 0 0 0-1.06-1.06l-4.72 4.72-1.72-1.72a.75.75 0 1 0-1.06 1.06l2.25 2.25c.293.293.767.293 1.06 0l5.25-5.25Z" />
    </svg>
  );
}

function XIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3.53 6.22a.75.75 0 0 0-1.06-1.06L12 9.88 9.53 7.41a.75.75 0 1 0-1.06 1.06L10.94 11l-2.47 2.47a.75.75 0 1 0 1.06 1.06L12 12.06l2.47 2.47a.75.75 0 1 0 1.06-1.06L13.06 11l2.47-2.53Z" />
    </svg>
  );
}

function FitMeter({ percent }: { percent: number }) {
  let label = "Maybe";
  if (percent >= 80) label = "Strong fit";
  else if (percent >= 50) label = "Likely fit";
  else if (percent < 20) label = "Not a fit yet";

  return (
    <div className="mx-auto mt-6 max-w-xl">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-slate-300">
        <span>Quick self‑check</span>
        <span className="font-semibold text-white">{label}</span>
      </div>
      <div className="mt-2 h-2 w-full rounded-full bg-white/10" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-yellow-300 to-orange-400 transition-[width] duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function ForList({ selected, onToggle }: { selected: Set<number>; onToggle: (i: number) => void }) {
  return (
    <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 bg-gradient-to-br from-emerald-600/10 via-emerald-500/5 to-slate-900/20 p-6 sm:p-8">
      {/* decorative glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
      <h2 className="text-xl sm:text-2xl font-extrabold text-white">This Is For You If...</h2>
      <ul className="mt-5 space-y-3 text-slate-200">
        {FOR_ITEMS.map((item, i) => {
          const isOn = selected.has(i);
          return (
            <li
              key={i}
              className={`flex items-start gap-3 rounded-xl p-2 transition shadow-sm ${isOn ? "ring-1 ring-emerald-400/40 bg-emerald-400/5" : "hover:bg-white/5"}`}
            >
              <span className="mt-0.5 rounded-full bg-emerald-600/20 p-1 ring-1 ring-emerald-500/40">
                <CheckIcon className="h-5 w-5 text-emerald-300" />
              </span>
              <span className="flex-1">{item}</span>
              <button
                type="button"
                aria-pressed={isOn}
                onClick={() => onToggle(i)}
                className={`ml-auto inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition ${
                  isOn
                    ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-200"
                    : "border-white/15 bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {isOn ? "Selected" : "That's me"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function NotForList({ selected, onToggle }: { selected: Set<number>; onToggle: (i: number) => void }) {
  return (
    <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 bg-gradient-to-br from-red-600/10 via-red-500/5 to-slate-900/20 p-6 sm:p-8">
      {/* decorative glow */}
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-red-400/10 blur-3xl" />
      <h2 className="text-xl sm:text-2xl font-extrabold text-white">This Is NOT For You If...</h2>
      <ul className="mt-5 space-y-3 text-slate-200">
        {NOT_FOR_ITEMS.map((item, i) => {
          const isOn = selected.has(i);
          return (
            <li
              key={i}
              className={`flex items-start gap-3 rounded-xl p-2 transition shadow-sm ${isOn ? "ring-1 ring-red-400/40 bg-red-400/5" : "hover:bg-white/5"}`}
            >
              <span className="mt-0.5 rounded-full bg-red-600/20 p-1 ring-1 ring-red-500/40">
                <XIcon className="h-5 w-5 text-red-300" />
              </span>
              <span className="flex-1">{item}</span>
              <button
                type="button"
                aria-pressed={isOn}
                onClick={() => onToggle(i)}
                className={`ml-auto inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold transition ${
                  isOn
                    ? "border-red-400/60 bg-red-500/20 text-red-200"
                    : "border-white/15 bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {isOn ? "Selected" : "That's me"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function WhoThisIsForPage() {
  const [forSel, setForSel] = useState<Set<number>>(new Set());
  const [notSel, setNotSel] = useState<Set<number>>(new Set());

  const toggleFor = (i: number) => setForSel(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const toggleNot = (i: number) => setNotSel(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });

  // Score: -5 .. +5 mapped to 0..100
  const percent = useMemo(() => {
    const f = forSel.size; const n = notSel.size; const raw = ((f - n) + 5) / 10; // 0..1
    return Math.max(0, Math.min(100, Math.round(raw * 100)));
  }, [forSel, notSel]);

  return (
    <main className="relative min-h-screen bg-transparent py-14">
      {/* soft background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-10 h-64 w-64 translate-x-1/2 rounded-full bg-red-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">Who This Is For</h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">Clear criteria so the right people win fast — and the wrong fit self-selects out.</p>
          <FitMeter percent={percent} />
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <ForList selected={forSel} onToggle={toggleFor} />
          <NotForList selected={notSel} onToggle={toggleNot} />
        </section>

        {/* small helper line */}
        <p className="mt-6 text-center text-xs text-slate-400">Select <span className="font-semibold text-slate-300">all that apply</span> — your Fit Meter updates as you choose.</p>
      </div>
    </main>
  );
}
