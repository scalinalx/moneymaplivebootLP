'use client';

import React, { useEffect, useRef, useState } from 'react';

interface NumberBadgeProps {
  n: number;
  withConfetti?: boolean;
}

const CONFETTI_COUNT = 62;
// Cool / cold-shifted palette for high contrast against the warm cream
// section background (#faf7f0). Blues, teals, pinks, magentas, purples
// dominate; a couple of gold/yellow accents stay for brand continuity.
const COLORS = [
  '#1e90ff', // dodger blue
  '#0ea5e9', // sky
  '#3b82f6', // royal blue
  '#06b6d4', // cyan
  '#14b8a6', // teal
  '#22d3ee', // bright cyan
  '#ec4899', // pink
  '#f43f5e', // rose
  '#ff4081', // hot pink
  '#a855f7', // purple
  '#8b5cf6', // violet
  '#6366f1', // indigo
  '#FFD700', // gold accent
  '#FFEB3B', // yellow accent
];
const PAUSE_MS = 2000;
const BURST_DURATION = 1200;

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

function Particle({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // When the burst flag goes false (pause phase) we leave the particle
    // exactly where it landed at the end of the burst — no fade, no reset.
    // The hard reset happens when the parent re-keys this component on the
    // next loop tick, which unmounts these and mounts fresh ones at center.
    if (!active) return;

    // Upward hemisphere emission so particles burst over the card.
    const angle = randomBetween(-Math.PI * 0.92, -Math.PI * 0.08);
    const dist = randomBetween(53, 158);
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    const rot = randomBetween(-180, 180);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const size = randomBetween(4, 9);
    const dur = randomBetween(600, BURST_DURATION);
    const delay = randomBetween(0, 100);
    const isRect = Math.random() > 0.4;

    el.style.transition = 'none';
    el.style.transform = 'translate(-50%, -50%) translate(0px, 0px) rotate(0deg) scale(1)';
    el.style.opacity = '1';
    el.style.background = color;
    el.style.width = `${size}px`;
    el.style.height = isRect ? `${size * 0.6}px` : `${size}px`;
    el.style.borderRadius = isRect ? '1px' : '50%';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = `transform ${dur}ms cubic-bezier(0.2, 0.8, 0.3, 1) ${delay}ms`;
        el.style.transform = `translate(-50%, -50%) translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(0.7)`;
      });
    });
  }, [active]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        opacity: 0,
        pointerEvents: 'none',
        willChange: 'transform, opacity',
      }}
    />
  );
}

export function NumberBadge({ n, withConfetti = false }: NumberBadgeProps) {
  const [burstKey, setBurstKey] = useState(0);
  const [burstActive, setBurstActive] = useState(false);

  useEffect(() => {
    if (!withConfetti) return;
    let stopped = false;
    let t1: ReturnType<typeof setTimeout> | undefined;
    let t2: ReturnType<typeof setTimeout> | undefined;

    const loop = () => {
      if (stopped) return;
      setBurstKey((k) => k + 1);
      setBurstActive(true);
      t1 = setTimeout(() => setBurstActive(false), BURST_DURATION + 200);
      t2 = setTimeout(loop, BURST_DURATION + PAUSE_MS);
    };

    const initial = setTimeout(loop, 600);
    return () => {
      stopped = true;
      clearTimeout(initial);
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
    };
  }, [withConfetti]);

  return (
    <div className="relative flex items-center justify-center">
      {withConfetti && (
        <>
          {/* Soft gold radial glow behind the badge */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 220,
              height: 220,
              background:
                'radial-gradient(circle, rgba(255,215,0,0.30) 0%, rgba(255,215,0,0.10) 35%, transparent 70%)',
              animation: 'oc-confetti-glow 2.4s ease-in-out infinite',
            }}
          />

          {/* Confetti burst layer — re-keyed each burst so all 62 particles re-randomize */}
          <div
            key={burstKey}
            aria-hidden
            className="pointer-events-none absolute"
            style={{ inset: 0 }}
          >
            {Array.from({ length: CONFETTI_COUNT }).map((_, i) => (
              <Particle key={i} active={burstActive} />
            ))}
          </div>
        </>
      )}

      <div
        className="relative z-10 flex items-center justify-center w-[72px] h-[72px] rounded-2xl text-white font-extrabold leading-none shadow-xl"
        style={{
          background: 'linear-gradient(135deg, #c9b67e, #9e8b52)',
          boxShadow:
            '0 8px 22px rgba(158, 139, 82, 0.45), 0 2px 6px rgba(0,0,0,0.1)',
          fontFamily: 'Montserrat, system-ui, sans-serif',
          fontSize: '42px',
        }}
      >
        {n}
      </div>

      <style jsx>{`
        @keyframes oc-confetti-glow {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0.7;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
