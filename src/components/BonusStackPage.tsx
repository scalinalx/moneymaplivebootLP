"use client";
import React, { useEffect, useMemo, useState } from "react";

// ==============================================
// Bonus Stack – Standalone Page
// "Join Today and Get These FREE Bonuses" (Vertical stack + live countdown)
// Palette: site gradient bg; bolder yellow/emerald/orange accents.
// ==============================================

export type Bonus = {
  id: string;
  title: string;
  valueEur: number | null; // null = Priceless
  valueLabel: string; // e.g., "($297 value)" or "(Priceless)"
  bullets: string[];
};

export const BONUSES: Bonus[] = [
  {
    id: "b1",
    title: "🎁 Bonus #1: The $5K Launch Playbook",
    valueEur: 297,
    valueLabel: "($297 value)",
    bullets: [
      "Step-by-step guide to launching your first $5K offer",
      "What to say, when to say it, how to handle objections",
    ],
  },
  {
    id: "b2",
    title: "🎁 Bonus #2: Swipe File of 50 High-Converting Emails",
    valueEur: 197,
    valueLabel: "($197 value)",
    bullets: [
      "Ana's personal collection of subject lines, email sequences, and CTAs",
      "Assets that helped generate $500K+",
    ],
  },
  {
    id: "b3",
    title: "🎁 Bonus #3: Private Accelerator Preview",
    valueEur: null,
    valueLabel: "(Priceless)",
    bullets: [
      "Invitation-only opportunity to apply for Ana's high-touch Accelerator program",
      "Typical value reference: $2,997 after Build to Profit",
    ],
  },
];

export function euro(n: number) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);
  } catch {
    return "$" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export function computeNumericTotal(bonuses: Bonus[]) {
  return bonuses.reduce(function (acc, b) { return acc + (typeof b.valueEur === "number" ? b.valueEur : 0); }, 0);
}

export function getCountdownParts(deadline: Date, now: Date) {
  const ms = Math.max(0, deadline.getTime() - now.getTime());
  const s = Math.floor(ms / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  return { days, hours, minutes, seconds, expired: ms <= 0 };
}

function GiftIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M2.75 9.5h18.5v10a1.75 1.75 0 0 1-1.75 1.75H4.5A1.75 1.75 0 0 1 2.75 19.5v-10Z" fill="currentColor" opacity="0.15"/>
      <path d="M21.25 7.5H13c.9-.61 1.5-1.61 1.5-2.75A2.75 2.75 0 0 0 11.75 2 2.75 2.75 0 0 0 9 4.75c0 1.14.6 2.14 1.5 2.75H2.75a.75.75 0 0 0 0 1.5H11v14h2V9h8.25a.75.75 0 0 0 0-1.5ZM10.5 4.75c0-.69.56-1.25 1.25-1.25s1.25.56 1.25 1.25S12.44 6 11.75 6 10.5 5.44 10.5 4.75Z" fill="currentColor"/>
    </svg>
  );
}

function CalendarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M6 2.75a.75.75 0 0 1 .75.75V5h10.5V3.5a.75.75 0 0 1 1.5 0V5h.5A2.75 2.75 0 0 1 22 7.75v10.5A2.75 2.75 0 0 1 19.25 21H4.75A2.75 2.75 0 0 1 2 18.25V7.75A2.75 2.75 0 0 1 4.75 5h.5V3.5A.75.75 0 0 1 6 2.75Z" fill="currentColor" opacity="0.2"/>
      <path d="M3.5 9h17v9.25c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25V9Z" fill="currentColor"/>
    </svg>
  );
}

function ValueBadge({ valueEur }: { valueEur: number | null }) {
  if (typeof valueEur === "number") {
    return (
      <div className="pointer-events-none absolute right-3 top-3 z-10 rounded-xl bg-yellow-400 px-3 py-1.5 text-xs font-extrabold text-slate-900 ring-2 ring-yellow-300 shadow-yellow-400/40 shadow">
        {euro(valueEur)} VALUE • FREE TODAY
      </div>
    );
  }
  // Priceless – strongest treatment
  return (
    <div className="pointer-events-none absolute right-3 top-3 z-10 rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-extrabold text-white ring-2 ring-emerald-300 shadow-emerald-600/40 shadow">
      MOST VALUABLE • PRICELESS
    </div>
  );
}

export default function BonusStackPage({ deadlineISO = "2025-11-18T09:00:00" }: { deadlineISO?: string }) {
  const deadline = useMemo(function () { return new Date(deadlineISO); }, [deadlineISO]);
  // Avoid hydration mismatch by rendering a stable placeholder until mounted
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date>(new Date());

  useEffect(function () {
    setMounted(true);
    const t = setInterval(function () { setNow(new Date()); }, 1000);
    return function () { clearInterval(t); };
  }, []);

  const parts = mounted
    ? getCountdownParts(deadline, now)
    : { days: 0, hours: 0, minutes: 0, seconds: 0, expired: false };
  const numericTotal = computeNumericTotal(BONUSES);

  return (
    <main className="min-h-screen bg-page-radial py-14 text-slate-200">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-slate-900 ring-2 ring-yellow-300/60 shadow-lg">
            <GiftIcon className="h-4 w-4" />
            Join Today and Get These FREE Bonuses
          </div>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">Unlock your launch</h1>
          <p className="mt-2 text-sm text-slate-300">Bonuses designed to remove friction and speed up your first $5K.</p>

          {/* Live countdown banner */}
          <div className="mx-auto mt-5 max-w-xl">
            <div className={`relative overflow-hidden rounded-2xl px-5 py-3 text-center ring-2 backdrop-blur-md shadow-lg ${parts.expired ? "bg-slate-800/80 ring-white/20 text-slate-200" : "bg-gradient-to-r from-red-600/70 via-orange-500/70 to-yellow-400/70 ring-red-300/60 text-white"}`}>
              <div className="absolute -inset-x-10 -bottom-10 h-24 bg-white/10 blur-2xl" aria-hidden />
              <div className="relative z-10 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider">
                <CalendarIcon className="h-4 w-4" />
                {parts.expired ? (
                  <span>Bonus window ended</span>
                ) : (
                  <span>Bonuses expire in</span>
                )}
              </div>
              {!parts.expired && (
                <div className="relative z-10 mt-1 flex items-center justify-center gap-2">
                  {[parts.days, parts.hours, parts.minutes, parts.seconds].map(function (n, i) {
                    const label = ["Days", "Hours", "Minutes", "Seconds"][i];
                    return (
                      <div key={label} className="min-w-[66px] rounded-xl bg-black/20 px-2 py-1 text-center ring-1 ring-white/20">
                        <div className="text-2xl font-black tabular-nums">{String(n).padStart(2, "0")}</div>
                        <div className="text-[10px] uppercase tracking-wider opacity-80">{label}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Bonuses – stacked vertically */}
        <section className="mt-8 grid grid-cols-1 gap-5">
          {BONUSES.map(function (b, idx) {
            const strongest = b.valueEur === null; // Priceless gets hero styling
            return (
              <article key={b.id} className={`relative overflow-hidden rounded-3xl border p-6 backdrop-blur-md ${
                strongest
                  ? "border-emerald-400/40 ring-1 ring-emerald-300/40 bg-gradient-to-br from-emerald-500/15 to-emerald-400/10 shadow shadow-emerald-600/20"
                  : "border-white/10 bg-white/5"
              }`}>
                <ValueBadge valueEur={b.valueEur} />
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-yellow-400/10 blur-3xl" />
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  {b.title} <span className="text-slate-300 font-bold">{b.valueLabel}</span>
                </h2>
                <ul className="mt-4 space-y-2 text-sm text-slate-200">
                  {b.bullets.map(function (line, i) {
                    return (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span>{line}</span>
                      </li>
                    );
                  })}
                </ul>
                {typeof b.valueEur === "number" ? (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-600/20 px-3 py-1 text-xs font-bold text-emerald-300 ring-1 ring-emerald-500/40">
                    <span>Free today • {euro(b.valueEur || 0)}</span>
                  </div>
                ) : (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/25 px-3 py-1 text-xs font-bold text-emerald-200 ring-1 ring-emerald-300/50">
                    <span>Most valuable bonus • Priceless</span>
                  </div>
                )}
              </article>
            );
          })}
        </section>

        {/* Total & loud value emphasis */}
        <section className="mt-8 rounded-3xl border border-yellow-300/40 bg-gradient-to-r from-yellow-400/20 to-amber-300/20 p-6 text-center backdrop-blur-md ring-1 ring-yellow-200/40">
          <p className="text-xl sm:text-2xl font-black text-white">
            Total Bonus Value: {euro(numericTotal)}+
          </p>
          <p className="mt-1 text-sm text-slate-200">All included when you join Build to Profit today.</p>
        </section>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => {
              document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black bg-yellow-400 border border-transparent rounded-md hover:bg-yellow-500 transition-colors duration-200"
          >
            Claim Your Bonuses Now — Included with Build to Profit
          </button>
        </div>
      </div>
    </main>
  );
}
