'use client';

import React, { useEffect, useState } from 'react';

const W = 526;
const H = 258;

interface BarProps {
  x: number;
  y: number;
  w: number;
  h?: number;
  color?: string;
  rx?: number;
}

function Bar({ x, y, w, h = 3, color = 'rgba(255,255,255,0.12)', rx = 1.5 }: BarProps) {
  return <rect x={x} y={y} width={w} height={h} rx={rx} fill={color} />;
}

interface SaleToastProps {
  x: number;
  y: number;
  delay: number;
  dur?: number;
}

function SaleToast({ x, y, delay, dur = 2.8 }: SaleToastProps) {
  return (
    <g opacity="0">
      <animate
        attributeName="opacity"
        values="0;0;1;1;0;0"
        keyTimes="0;0.05;0.12;0.75;0.9;1"
        dur={`${dur}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,6;0,6;0,0;0,0;0,-3;0,-3"
        keyTimes="0;0.05;0.15;0.75;0.9;1"
        dur={`${dur}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
      <rect
        x={x}
        y={y}
        width="72"
        height="22"
        rx="5"
        fill="#161310"
        stroke="rgba(255,215,0,0.2)"
        strokeWidth="0.5"
      />
      <circle
        cx={x + 11}
        cy={y + 11}
        r="5"
        fill="rgba(74,222,128,0.2)"
        stroke="rgba(74,222,128,0.5)"
        strokeWidth="0.5"
      />
      <circle cx={x + 11} cy={y + 11} r="2" fill="#4ade80" opacity="0.9" />
      <Bar x={x + 21} y={y + 7} w={30} h={3} color="rgba(255,255,255,0.2)" />
      <Bar x={x + 21} y={y + 13} w={40} h={2.5} color="rgba(255,215,0,0.3)" />
    </g>
  );
}

interface MiniCardProps {
  x: number;
  y: number;
  w: number;
  h: number;
  tier: 0 | 1 | 2 | 3;
  delay: number;
}

// Deterministic feature-line widths so SSR matches client render.
const FEATURE_WIDTHS = [4, 9, 6];

function MiniCard({ x, y, w, h, tier, delay }: MiniCardProps) {
  const borders = [
    'rgba(184,134,11,0.3)',
    'rgba(218,165,32,0.35)',
    'rgba(255,193,7,0.4)',
    'rgba(255,215,0,0.55)',
  ];
  const badges = ['#8B6914', '#B8860B', '#DAA520', '#FFD700'];
  const bgs = ['#13110e', '#15120e', '#17140f', '#1a160f'];

  return (
    <g opacity="0" style={{ animation: `oc-cardIn 0.5s ease ${delay}s forwards` }}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="5"
        fill={bgs[tier]}
        stroke={borders[tier]}
        strokeWidth="0.8"
      />
      <rect x={x} y={y} width={w} height="2" rx="0" fill={badges[tier]} opacity="0.5" />
      {/* Price badge */}
      <rect
        x={x + w / 2 - 16}
        y={y + 8}
        width="32"
        height="10"
        rx="2.5"
        fill={badges[tier]}
        opacity="0.8"
      />
      <Bar x={x + w / 2 - 10} y={y + 11} w={20} h={3} color="rgba(255,255,255,0.35)" />
      {/* Lines */}
      <Bar x={x + 6} y={y + 24} w={w - 12} />
      <Bar x={x + 6} y={y + 30} w={w - 18} />
      {/* Feature dots */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={x + 9} cy={y + 40 + i * 8} r="1.5" fill={badges[tier]} opacity="0.5" />
          <Bar x={x + 14} y={y + 39 + i * 8} w={w * 0.5 + FEATURE_WIDTHS[i]} />
        </g>
      ))}
    </g>
  );
}

export function OfferFlowCard() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), 100);
    return () => clearTimeout(t);
  }, []);

  // 2x2 grid positions for ecosystem cards
  const cw = 82;
  const ch = 64;
  const gap = 10;
  const gridX = 52;
  const gridY = 62;
  const cards: Array<{ x: number; y: number; tier: 0 | 1 | 2 | 3 }> = [
    { x: gridX, y: gridY, tier: 0 },
    { x: gridX + cw + gap, y: gridY, tier: 1 },
    { x: gridX, y: gridY + ch + gap, tier: 2 },
    { x: gridX + cw + gap, y: gridY + ch + gap, tier: 3 },
  ];

  // Revenue chart points (trending up)
  const chartX = 310;
  const chartY = 72;
  const chartW = 170;
  const chartH = 70;
  const chartPts: Array<[number, number]> = [
    [0, 0],
    [15, 4],
    [30, 7],
    [45, 12],
    [55, 18],
    [65, 25],
    [80, 32],
    [95, 38],
    [110, 45],
    [125, 50],
    [140, 57],
    [155, 62],
    [170, 68],
  ];
  const chartPath = chartPts
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${chartX + p[0]},${chartY + chartH - p[1]}`)
    .join(' ');
  const areaPath = `${chartPath} L${chartX + chartW},${chartY + chartH} L${chartX},${chartY + chartH} Z`;

  return (
    <div className="w-full flex items-center justify-center">
      <style>{`
        @keyframes oc-cardIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes oc-growLine {
          from { stroke-dashoffset: 400; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
      <div
        style={{
          width: '100%',
          maxWidth: W,
          aspectRatio: `${W} / ${H}`,
          borderRadius: 14,
          overflow: 'hidden',
          opacity: vis ? 1 : 0,
          transform: vis ? 'scale(1)' : 'scale(0.97)',
          transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)',
          boxShadow: '0 4px 40px rgba(255,215,0,0.06)',
        }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ display: 'block' }}
        >
          <defs>
            <radialGradient id="oc-bg" cx="45%" cy="40%" r="80%">
              <stop offset="0%" stopColor="#12100d" />
              <stop offset="100%" stopColor="#090807" />
            </radialGradient>
            <linearGradient id="oc-chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="oc-chartLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B8860B" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFEB3B" />
            </linearGradient>
            <radialGradient id="oc-glow1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
            </radialGradient>
            <filter id="oc-sGlow">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width={W} height={H} fill="url(#oc-bg)" rx="14" />

          {/* Ambient glows */}
          <ellipse cx="140" cy="120" rx="120" ry="90" fill="url(#oc-glow1)" />
          <ellipse cx="390" cy="110" rx="130" ry="80" fill="url(#oc-glow1)" />

          {/* Top bar */}
          <rect x="0" y="0" width={W} height="38" fill="#0f0e0b" rx="14" />
          <rect x="0" y="16" width={W} height="22" fill="#0f0e0b" />
          <line x1="0" y1="38" x2={W} y2="38" stroke="rgba(255,215,0,0.07)" strokeWidth="0.5" />

          {/* Window dots */}
          <circle cx="16" cy="16" r="3.5" fill="#ff5f57" opacity="0.65" />
          <circle cx="28" cy="16" r="3.5" fill="#febc2e" opacity="0.65" />
          <circle cx="40" cy="16" r="3.5" fill="#28c840" opacity="0.65" />

          {/* Nav items */}
          <Bar x={60} y={14} w={50} h={3.5} color="rgba(255,215,0,0.3)" />
          <Bar x={120} y={14} w={35} h={3.5} />
          <Bar x={165} y={14} w={40} h={3.5} />

          {/* Live indicator */}
          <circle cx={W - 20} cy={16} r="3.5" fill="#4ade80" opacity="0.8">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <Bar x={W - 50} y={14} w={22} h={3.5} color="rgba(74,222,128,0.3)" />

          {/* Left sidebar hint */}
          <rect x="0" y="38" width="34" height={H - 38} fill="rgba(255,255,255,0.015)" />
          <line x1="34" y1="38" x2="34" y2={H} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={`nav${i}`}
              x="10"
              y={52 + i * 22}
              width="14"
              height="10"
              rx="2.5"
              fill={i === 0 ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.04)'}
              stroke={i === 0 ? 'rgba(255,215,0,0.25)' : 'none'}
              strokeWidth="0.5"
            />
          ))}

          {/* Section label above cards */}
          <Bar x={gridX} y={48} w={90} h={4} color="rgba(255,255,255,0.18)" />

          {/* 2x2 Ecosystem cards */}
          {cards.map((c, i) => (
            <MiniCard key={i} x={c.x} y={c.y} w={cw} h={ch} tier={c.tier} delay={0.2 + i * 0.1} />
          ))}

          {/* Ecosystem flow arrows — circular cycle */}
          {/* Top: card0 → card1 */}
          <line
            x1={gridX + cw + 1}
            y1={gridY + ch / 2 - 6}
            x2={gridX + cw + gap - 1}
            y2={gridY + ch / 2 - 6}
            stroke="#FFD700"
            strokeWidth="0.8"
            opacity="0.3"
          />
          <polygon
            points={`${gridX + cw + gap - 1},${gridY + ch / 2 - 9} ${gridX + cw + gap + 3},${gridY + ch / 2 - 6} ${gridX + cw + gap - 1},${gridY + ch / 2 - 3}`}
            fill="#FFD700"
            opacity="0.3"
          />

          {/* Right: card1 → card3 */}
          <line
            x1={gridX + cw + gap + cw / 2 + 6}
            y1={gridY + ch + 1}
            x2={gridX + cw + gap + cw / 2 + 6}
            y2={gridY + ch + gap - 1}
            stroke="#FFD700"
            strokeWidth="0.8"
            opacity="0.3"
          />
          <polygon
            points={`${gridX + cw + gap + cw / 2 + 3},${gridY + ch + gap - 1} ${gridX + cw + gap + cw / 2 + 6},${gridY + ch + gap + 3} ${gridX + cw + gap + cw / 2 + 9},${gridY + ch + gap - 1}`}
            fill="#FFD700"
            opacity="0.3"
          />

          {/* Bottom: card3 → card2 */}
          <line
            x1={gridX + cw + gap - 1}
            y1={gridY + ch + gap + ch / 2 + 6}
            x2={gridX + cw + 1}
            y2={gridY + ch + gap + ch / 2 + 6}
            stroke="#FFD700"
            strokeWidth="0.8"
            opacity="0.3"
          />
          <polygon
            points={`${gridX + cw + 1},${gridY + ch + gap + ch / 2 + 3} ${gridX + cw - 3},${gridY + ch + gap + ch / 2 + 6} ${gridX + cw + 1},${gridY + ch + gap + ch / 2 + 9}`}
            fill="#FFD700"
            opacity="0.3"
          />

          {/* Left: card2 → card0 */}
          <line
            x1={gridX + cw / 2 - 6}
            y1={gridY + ch + gap - 1}
            x2={gridX + cw / 2 - 6}
            y2={gridY + ch + 1}
            stroke="#FFD700"
            strokeWidth="0.8"
            opacity="0.3"
          />
          <polygon
            points={`${gridX + cw / 2 - 9},${gridY + ch + 1} ${gridX + cw / 2 - 6},${gridY + ch - 3} ${gridX + cw / 2 - 3},${gridY + ch + 1}`}
            fill="#FFD700"
            opacity="0.3"
          />

          {/* Center ecosystem pulse */}
          <circle
            cx={gridX + cw + gap / 2}
            cy={gridY + ch + gap / 2}
            r="3"
            fill="#FFD700"
            opacity="0.4"
            filter="url(#oc-sGlow)"
          >
            <animate attributeName="r" values="2;5;2" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Divider */}
          <line x1="266" y1="48" x2="266" y2={H - 14} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />

          {/* RIGHT PANEL — Revenue & Sales */}
          {/* Metric label */}
          <Bar x={285} y={48} w={55} h={4} color="rgba(255,255,255,0.18)" />
          {/* Big number placeholder */}
          <Bar x={285} y={56} w={85} h={8} color="rgba(255,215,0,0.35)" rx={2} />
          {/* Percentage badge */}
          <rect
            x={378}
            y={55}
            width="32"
            height="11"
            rx="3"
            fill="rgba(74,222,128,0.12)"
            stroke="rgba(74,222,128,0.25)"
            strokeWidth="0.5"
          />
          <polygon points="386,63 389,58 392,63" fill="#4ade80" opacity="0.7" />
          <Bar x={394} y={59} w={12} h={3} color="rgba(74,222,128,0.5)" />

          {/* Revenue chart */}
          <path d={areaPath} fill="url(#oc-chartGrad)" opacity="0.8" />
          <path
            d={chartPath}
            fill="none"
            stroke="url(#oc-chartLine)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="400"
            strokeDashoffset="400"
            style={{ animation: 'oc-growLine 2s ease 0.8s forwards' }}
          />
          {/* Chart endpoint glow */}
          <circle
            cx={chartX + 170}
            cy={chartY + chartH - 68}
            r="3"
            fill="#FFEB3B"
            opacity="0"
            filter="url(#oc-sGlow)"
          >
            <animate
              attributeName="opacity"
              values="0;0;0.8"
              keyTimes="0;0.6;1"
              dur="2.8s"
              fill="freeze"
            />
          </circle>

          {/* Chart gridlines */}
          {[0, 1, 2].map((i) => (
            <line
              key={`cg${i}`}
              x1={chartX}
              y1={chartY + 18 + i * 22}
              x2={chartX + chartW}
              y2={chartY + 18 + i * 22}
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="0.5"
            />
          ))}

          {/* Metrics row below chart */}
          <g transform={`translate(${285}, ${chartY + chartH + 16})`}>
            {[0, 1, 2].map((i) => (
              <g key={`m${i}`} transform={`translate(${i * 62}, 0)`}>
                <Bar x={0} y={0} w={28} h={3} color="rgba(255,255,255,0.08)" />
                <Bar
                  x={0}
                  y={6}
                  w={40}
                  h={5}
                  color={i === 0 ? 'rgba(255,215,0,0.3)' : 'rgba(255,255,255,0.15)'}
                />
              </g>
            ))}
          </g>

          {/* Sale notification toasts */}
          <SaleToast x={290} y={chartY + chartH + 34} delay={1.5} dur={4} />
          <SaleToast x={375} y={chartY + chartH + 34} delay={3.2} dur={4} />

          {/* Second row toast */}
          <SaleToast x={330} y={chartY + chartH + 60} delay={2.4} dur={3.6} />

          {/* Border */}
          <rect
            x="0.5"
            y="0.5"
            width={W - 1}
            height={H - 1}
            rx="14"
            fill="none"
            stroke="rgba(255,215,0,0.06)"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    </div>
  );
}
