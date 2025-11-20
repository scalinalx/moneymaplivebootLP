'use client';

import React, { useEffect, useRef, useState } from 'react';

const points = [
  { x: 60, value: 0, label: "Apr '25" },
  { x: 150, value: 120, label: 'May' },
  { x: 240, value: 280 },
  { x: 330, value: 410 },
  { x: 400, value: 570, label: 'Late Jun' },
  // Inflection around late Aug
  { x: 460, value: 650, label: 'Aug' },
  { x: 520, value: 900 },
  { x: 580, value: 1250, label: 'Sep' },
  { x: 640, value: 3200 },
  { x: 700, value: 4050, label: 'Oct' },
  { x: 760, value: 4755, label: 'Now' },
];

const maxY = 7000;
const chart = { xStart: 60, xEnd: 760, yBase: 280, yHeight: 240 };

const valueToY = (value: number) =>
  chart.yBase - (value / maxY) * chart.yHeight;

export function MRRGraph() {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sepPoint = points.find((p) => p.label === 'Sep') || points[points.length - 3];

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const buildPathD = () => {
    if (!points.length) return '';
    let d = `M ${points[0].x} ${valueToY(points[0].value).toFixed(2)}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const prevY = valueToY(prev.value);
      const currY = valueToY(curr.value);
      const midX = (prev.x + curr.x) / 2;
      const midY = (prevY + currY) / 2;
      d += ` Q ${prev.x} ${prevY.toFixed(2)} ${midX} ${midY.toFixed(2)}`;
      if (i === points.length - 1) {
        d += ` Q ${curr.x} ${currY.toFixed(2)} ${curr.x} ${currY.toFixed(2)}`;
      }
    }
    return d;
  };

  const pathD = buildPathD();

  return (
    <div
      ref={containerRef}
      className={`rounded-xl border border-brand-800 bg-[#f8f5ec] p-6 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-grey">
          MRR Growth (Apr ’25 → Now)
        </p>
      </div>

      <div className="relative">
        <svg viewBox="0 0 820 320" className="h-auto w-full">
          {/* Axes */}
          <line x1="60" y1="280" x2="780" y2="280" stroke="#1f1f1f" strokeWidth="1" />
          <line x1="60" y1="280" x2="60" y2="40" stroke="#1f1f1f" strokeWidth="1" />
          {/* Y ticks */}
          {[0, 1750, 3500, 5250, 7000].map((val) => {
            const y = valueToY(val);
            return (
              <g key={val}>
                <line x1="56" y1={y} x2="780" y2={y} stroke="#151515" strokeWidth="1" opacity="0.35" />
                <text x="52" y={y + 4} fill="#666" fontSize="10" textAnchor="end">
                  ${val.toLocaleString()}
                </text>
              </g>
            );
          })}
          {/* Path */}
          <defs>
            <linearGradient id="mrr-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3a3a3a" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3a3a3a" stopOpacity="0" />
            </linearGradient>
            <marker id="arrowhead-join" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill="#3a3a3a" />
            </marker>
          </defs>
          {/* Area fill */}
          <path
            d={`${pathD} L ${points[points.length - 1].x} ${chart.yBase} L ${points[0].x} ${chart.yBase} Z`}
            fill="url(#mrr-fill)"
            opacity={visible ? 1 : 0}
            style={{ transition: 'opacity 1.8s ease-out' }}
          />
          <path
            d={pathD}
            fill="none"
            stroke="#3a3a3a"
            strokeWidth="4"
            strokeLinecap="round"
            style={{
              strokeDasharray: 1200,
              strokeDashoffset: visible ? 0 : 1200,
              transition: 'stroke-dashoffset 1.8s ease-out',
            }}
          />
          {/* Inflection callout */}
          {sepPoint && (
            <g
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0px)' : 'translateY(10px)',
                transition: 'opacity 1s ease, transform 1s ease',
              }}
            >
              {/* Pill */}
              <g transform={`translate(370 70)`}>
                <rect x="-6" y="-20" width="200" height="50" rx="6" fill="#ffd200" opacity="0.95" />
                <text x="0" y="0" fill="#0a0a0a" fontSize="9.7" fontWeight="700">
                  implemented Build2Profit strategies
                </text>
                <text x="0" y="14" fill="#0a0a0a" fontSize="9.7" fontWeight="700">
                  crafted offer & launched
                </text>
              </g>
              {/* Curved arrow from pill to Sep point */}
              <path
                d={`M 370 110 Q 460 200 ${sepPoint.x-10} ${valueToY(sepPoint.value) - 8}`}
                fill="none"
                stroke="#3a3a3a"
                strokeWidth="2"
                markerEnd="url(#arrowhead-join)"
              />
            </g>
          )}
          {/* Start / end dots and labels */}
          {points.map((p, idx) => (
            <g key={`${p.x}-${p.value}`}>
              <circle cx={p.x} cy={valueToY(p.value)} r={idx === points.length - 1 ? 6 : 4} fill="#3a3a3a" />
              {p.label && (
                <text
                  x={p.x}
                  y={valueToY(p.value) + 18}
                  fill={idx === points.length - 1 ? '#3a3a3a' : '#888'}
                  fontSize="11"
                  textAnchor="middle"
                >
                  {p.label}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
