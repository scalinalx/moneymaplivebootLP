'use client';

import React, { useEffect, useRef, useState } from 'react';

// Substack-style interactive earnings chart, ported from the self-contained
// HTML mock. Weekly data from May 1 2025 to Jul 7 2026, seeded so the curve is
// stable across renders (SSR-safe) and sums to exactly $492,226. Interactions:
// hover for a per-week tooltip, drag to total a date range, double-click or
// the reset button to go back to the full range.

const TARGET = 492226;
const W = 672, H = 108, PAD_L = 44, PAD_R = 8, PAD_T = 8, PAD_B = 18;
const PLOT_W = W - PAD_L - PAD_R, PLOT_H = H - PAD_T - PAD_B;

function mulberry32(a: number) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildData() {
  const start = new Date(2025, 4, 1); // May 1 2025
  const today = new Date(2026, 6, 7); // Jul 7 2026
  const dates: Date[] = [];
  const d = new Date(start);
  while (d <= today) { dates.push(new Date(d)); d.setDate(d.getDate() + 7); }
  const n = dates.length;

  // Base shape: growth trend + noise + occasional launch spikes
  const rnd = mulberry32(492226);
  const weights: number[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const trend = 0.55 + 1.1 * t;             // steady growth
    const noise = 0.75 + rnd() * 0.5;         // week-to-week variance
    let spike = 1;
    const r = rnd();
    if (r > 0.92) spike = 1.9 + rnd() * 0.9;  // launch weeks
    else if (r < 0.07) spike = 0.55;          // quiet weeks
    weights.push(trend * noise * spike);
  }

  // Normalize to exact target sum (integers)
  const wSum = weights.reduce((a, b) => a + b, 0);
  const vals = weights.map((w) => Math.floor((w / wSum) * TARGET));
  vals[n - 1] += TARGET - vals.reduce((a, b) => a + b, 0);
  return { dates, vals };
}

const { dates, vals } = buildData();
const n = dates.length;
const maxV = Math.max(...vals) * 1.12;

const x = (i: number) => PAD_L + (i / (n - 1)) * PLOT_W;
const y = (v: number) => PAD_T + PLOT_H - (v / maxV) * PLOT_H;

let LINE_D = '';
for (let p = 0; p < n; p++) LINE_D += (p === 0 ? 'M' : 'L') + x(p).toFixed(1) + ' ' + y(vals[p]).toFixed(1) + ' ';
const AREA_D = LINE_D + 'L' + x(n - 1).toFixed(1) + ' ' + (PAD_T + PLOT_H) + ' L' + PAD_L + ' ' + (PAD_T + PLOT_H) + ' Z';

const fmtMoney = (v: number) => '$' + v.toLocaleString('en-US');
const fmtDate = (dt: Date) => dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const fmtYLabel = (gv: number) =>
  '$' + (gv >= 1000 ? (gv / 1000).toFixed(gv >= 10000 ? 0 : 1) + 'K' : String(Math.round(gv)));

export default function EarningsCard() {
  const [sel, setSel] = useState<[number, number]>([0, n - 1]);
  const [hover, setHover] = useState<number | null>(null);
  const dragging = useRef(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // The SVG scales with the card width, so convert mouse CSS-px to SVG units.
  const idxFromClientX = (clientX: number) => {
    const rect = wrapRef.current!.getBoundingClientRect();
    const sx = ((clientX - rect.left) * W) / rect.width;
    return Math.max(0, Math.min(n - 1, Math.round(((sx - PAD_L) / PLOT_W) * (n - 1))));
  };

  useEffect(() => {
    const move = (ev: MouseEvent) => {
      if (dragging.current) setSel((s) => [s[0], idxFromClientX(ev.clientX)]);
    };
    const up = () => { dragging.current = false; };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  const lo = Math.min(sel[0], sel[1]), hi = Math.max(sel[0], sel[1]);
  let total = 0;
  for (let s = lo; s <= hi; s++) total += vals[s];
  const fullRange = lo === 0 && hi === n - 1;

  return (
    <div className="ecard">
      <div className="info-row">
        <div className="info-box">
          <span className="label">Date range</span>
          <span className="value">{fmtDate(dates[lo])} – {fmtDate(dates[hi])}</span>
        </div>
        <div className="info-box total">
          <span className="label">Total</span>
          <span className="value">{fmtMoney(total)}</span>
        </div>
        <div className="footnote">drag to select a range</div>
        <button
          type="button" className="reset-btn" title="Reset to full range" aria-label="Reset to full range"
          onClick={() => setSel([0, n - 1])}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-2.64-6.36" />
            <polyline points="21 3 21 9 15 9" />
          </svg>
        </button>
      </div>
      <div
        ref={wrapRef} className="chart-wrap"
        onMouseDown={(e) => { dragging.current = true; const i = idxFromClientX(e.clientX); setSel([i, i]); }}
        onMouseMove={(e) => setHover(idxFromClientX(e.clientX))}
        onMouseLeave={() => setHover(null)}
        onDoubleClick={() => setSel([0, n - 1])}
      >
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Ana’s Substack earnings chart showing 492,226 US dollars in lifetime earnings, May 2025 to July 2026" xmlns="http://www.w3.org/2000/svg">
          {[0, 1, 2, 3].map((g) => {
            const gv = (maxV / 3) * g;
            return (
              <React.Fragment key={g}>
                <line x1={PAD_L} y1={y(gv)} x2={W - PAD_R} y2={y(gv)} stroke="#ECECEC" strokeWidth={1} />
                <text x={PAD_L - 6} y={y(gv) + 3} textAnchor="end" fontSize={9} fill="#9A9A9A">{fmtYLabel(gv)}</text>
              </React.Fragment>
            );
          })}
          {dates.map((dt, xi) => (xi % 10 === 0 ? (
            <text key={xi} x={x(xi)} y={H - 4} textAnchor="middle" fontSize={9} fill="#9A9A9A">
              {dt.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
            </text>
          ) : null))}
          <path d={AREA_D} fill="#FF6719" fillOpacity={0.08} stroke="none" />
          {!fullRange && (
            <rect x={x(lo) - 3} y={PAD_T} width={x(hi) - x(lo) + 6} height={PLOT_H} fill="#FF6719" fillOpacity={0.12} rx={2} />
          )}
          <path d={LINE_D} fill="none" stroke="#FF6719" strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" />
          {vals.map((v, q) => (
            <circle key={q} cx={x(q)} cy={y(v)} r={1.9} fill="#FF6719" fillOpacity={q >= lo && q <= hi ? 1 : 0.25} />
          ))}
          {hover !== null && (
            <circle cx={x(hover)} cy={y(vals[hover])} r={3.6} fill="#fff" stroke="#FF6719" strokeWidth={2} />
          )}
        </svg>
        {hover !== null && (
          <div className="tooltip" style={{ left: `${(x(hover) / W) * 100}%`, top: `${((y(vals[hover]) - 2) / H) * 100}%` }}>
            Week of {fmtDate(dates[hover])}<br /><b>≈ {fmtMoney(vals[hover])}</b>
          </div>
        )}
      </div>
    </div>
  );
}
