import React from "react";

// Types for TS/JS projects using .tsx (safe to ignore in plain JS projects)
export type UrgencyBarProps = {
  spotsTaken?: number;
  totalSpots?: number;
  daysLeft?: number;
  cohortLabel?: string;
  sticky?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
  id?: string;
  deadlineISO?: string;
};

// Pure helper for unit tests and easier reasoning
export function computeUrgencyStats(
  spotsTaken: number = 0,
  totalSpots: number = 0
) {
  const t = Number.isFinite(totalSpots) ? totalSpots : 0;
  const s = Number.isFinite(spotsTaken) ? spotsTaken : 0;

  const safeTotal = Math.max(0, Math.floor(t));
  const safeTaken = Math.max(0, Math.min(Math.floor(s), safeTotal));
  const percentRaw = safeTotal > 0 ? (safeTaken / safeTotal) * 100 : 0;
  const percent = Math.max(0, Math.min(100, Math.round(percentRaw)));
  const spotsLeft = Math.max(0, safeTotal - safeTaken);

  return { safeTotal, safeTaken, percent, spotsLeft };
}

/**
 * UrgencyBar – a compact, high-converting announcement bar for landing pages.
 *
 * Defaults match your request:
 *  🔥 18 of 30 spots taken | Early bird pricing ends in 9 days | Next cohort: December 9
 */
export default function UrgencyBar({
  spotsTaken = 18,
  totalSpots = 30,
  daysLeft = 9,
  cohortLabel = "November 18",
  sticky = true,
  ctaLabel = "Apply now",
  ctaHref = "#apply",
  className = "",
  id,
  deadlineISO = "2025-11-18T09:00:00",
}: UrgencyBarProps) {
  const { safeTotal, safeTaken, percent, spotsLeft } = computeUrgencyStats(
    spotsTaken,
    totalSpots
  );

  // Hydration-safe live countdown to match BonusStackPage
  const [mounted, setMounted] = React.useState(false);
  const [now, setNow] = React.useState<Date>(new Date());
  React.useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const deadline = React.useMemo(() => new Date(deadlineISO), [deadlineISO]);
  function parts(at: Date) {
    const ms = Math.max(0, deadline.getTime() - at.getTime());
    const s = Math.floor(ms / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return { d, h, m, sec };
  }
  const time = mounted ? parts(now) : { d: 0, h: 0, m: 0, sec: 0 };

  return (
    <div id={id} className={`${sticky ? "sticky top-0 z-50" : ""} w-full`}>
      <div className="mx-auto max-w-7xl">
        <div
          className={`relative overflow-hidden rounded-2xl border border-amber-300/40 bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 p-3 shadow-sm backdrop-blur ${className}`}
          role="region"
          aria-label="Cohort sign-up status"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:text-base font-medium text-stone-800">
                <span role="img" aria-label="fire" className="text-base sm:text-lg">
                  🔥
                </span>
                <span>
                  <strong>{safeTaken}</strong> of <strong>{safeTotal}</strong> spots taken
                </span>
                <span className="hidden sm:inline text-stone-400">|</span>
                {deadlineISO ? (
                  <span className="inline-flex items-center gap-2">
                    Early bird pricing ends in
                    <span className="inline-flex items-center gap-1 font-bold tabular-nums">
                      <span className="min-w-[2ch]">{String(time.d).padStart(2, '0')}</span>d
                      <span className="min-w-[2ch]">{String(time.h).padStart(2, '0')}</span>h
                      <span className="min-w-[2ch]">{String(time.m).padStart(2, '0')}</span>m
                      <span className="min-w-[2ch]">{String(time.sec).padStart(2, '0')}</span>s
                    </span>
                  </span>
                ) : (
                  <span>
                    Early bird pricing ends in <strong>{daysLeft} {daysLeft === 1 ? "day" : "days"}</strong>
                  </span>
                )}
                <span className="hidden sm:inline text-stone-400">|</span>
                <span>
                  Next cohort: <strong>{cohortLabel}</strong>
                </span>
              </div>

              <div
                className="mt-2 h-2 w-full rounded-full bg-stone-200"
                role="progressbar"
                aria-label="Spots taken"
                aria-valuemin={0}
                aria-valuenow={safeTaken}
                aria-valuemax={safeTotal}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="mt-1 text-[11px] leading-none text-stone-500">
                <span className="sr-only">{percent}% filled. </span>
                Only {spotsLeft} {spotsLeft === 1 ? "spot" : "spots"} left
              </div>
            </div>

            <div className="shrink-0">
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-xl border border-amber-300/60 bg-white px-3 py-2 text-sm font-semibold text-stone-800 shadow transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400/50"
              >
                <span className="hidden sm:inline">{ctaLabel}</span>
                <span className="sm:hidden">Apply</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M13.5 4.5a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V6.56l-7.22 7.22a.75.75 0 1 1-1.06-1.06L17.44 5.5h-2.69a.75.75 0 0 1-.75-.75Z" />
                  <path d="M5.25 6A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75v-5.5a.75.75 0 0 0-1.5 0v5.5c0 .414-.336.75-.75.75H5.25a.75.75 0 0 1-.75-.75V8.25c0-.414.336-.75.75-.75h5.5a.75.75 0 0 0 0-1.5h-5.5Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
