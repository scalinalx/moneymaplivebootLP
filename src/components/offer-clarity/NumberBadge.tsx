'use client';

import React from 'react';

interface NumberBadgeProps {
  n: number;
  withConfetti?: boolean;
}

// 18 particles radiating around the badge — mixed dots and streamers, brand-friendly palette,
// each with its own travel distance, end-rotation, animation delay and duration so the burst
// feels organic and continuous rather than a single synchronized pulse.
const PARTICLES = [
  { angle: 0,   dist: 78, w: 6, h: 6, round: true,  color: '#ff6b6b', rot: 540, delay: 0.00, dur: 1.9 },
  { angle: 20,  dist: 88, w: 4, h: 10, round: false, color: '#4ecdc4', rot: 420, delay: 0.18, dur: 2.2 },
  { angle: 40,  dist: 72, w: 5, h: 5, round: true,  color: '#ffd93d', rot: 360, delay: 0.35, dur: 2.0 },
  { angle: 60,  dist: 92, w: 3, h: 9, round: false, color: '#9E8B52', rot: 600, delay: 0.05, dur: 2.3 },
  { angle: 80,  dist: 70, w: 6, h: 6, round: true,  color: '#c9b67e', rot: 480, delay: 0.42, dur: 1.8 },
  { angle: 100, dist: 86, w: 4, h: 10, round: false, color: '#aa96da', rot: 540, delay: 0.22, dur: 2.1 },
  { angle: 120, dist: 76, w: 5, h: 5, round: true,  color: '#2ed573', rot: 360, delay: 0.55, dur: 2.0 },
  { angle: 140, dist: 90, w: 3, h: 9, round: false, color: '#ffa502', rot: 720, delay: 0.10, dur: 2.4 },
  { angle: 160, dist: 72, w: 6, h: 6, round: true,  color: '#1e90ff', rot: 420, delay: 0.32, dur: 1.9 },
  { angle: 180, dist: 84, w: 4, h: 10, round: false, color: '#fcbad3', rot: 540, delay: 0.48, dur: 2.2 },
  { angle: 200, dist: 74, w: 5, h: 5, round: true,  color: '#f38181', rot: 360, delay: 0.08, dur: 2.0 },
  { angle: 220, dist: 90, w: 3, h: 9, round: false, color: '#9E8B52', rot: 480, delay: 0.28, dur: 2.3 },
  { angle: 240, dist: 70, w: 6, h: 6, round: true,  color: '#95e1d3', rot: 540, delay: 0.50, dur: 1.9 },
  { angle: 260, dist: 86, w: 4, h: 10, round: false, color: '#c9b67e', rot: 420, delay: 0.14, dur: 2.1 },
  { angle: 280, dist: 76, w: 5, h: 5, round: true,  color: '#6c5ce7', rot: 360, delay: 0.38, dur: 2.0 },
  { angle: 300, dist: 92, w: 3, h: 9, round: false, color: '#ff4757', rot: 600, delay: 0.20, dur: 2.4 },
  { angle: 320, dist: 72, w: 6, h: 6, round: true,  color: '#ffd93d', rot: 480, delay: 0.45, dur: 1.8 },
  { angle: 340, dist: 84, w: 4, h: 10, round: false, color: '#4ecdc4', rot: 540, delay: 0.02, dur: 2.2 },
];

export function NumberBadge({ n, withConfetti = false }: NumberBadgeProps) {
  return (
    <div className="relative flex items-center justify-center">
      {withConfetti && (
        <>
          {/* Soft radial glow behind the badge */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 oc-confetti-glow"
            style={{ width: 180, height: 180 }}
          />
          {/* Particle field */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2"
            style={{ width: 0, height: 0 }}
          >
            {PARTICLES.map((p, i) => {
              const rad = (p.angle * Math.PI) / 180;
              const tx = Math.cos(rad) * p.dist;
              const ty = Math.sin(rad) * p.dist;
              return (
                <span
                  key={i}
                  className="oc-confetti-piece"
                  style={{
                    width: `${p.w}px`,
                    height: `${p.h}px`,
                    backgroundColor: p.color,
                    borderRadius: p.round ? '999px' : '1.5px',
                    ['--tx' as never]: `${tx.toFixed(1)}px`,
                    ['--ty' as never]: `${ty.toFixed(1)}px`,
                    ['--rot' as never]: `${p.rot}deg`,
                    animationDelay: `${p.delay}s`,
                    animationDuration: `${p.dur}s`,
                  }}
                />
              );
            })}
          </div>
        </>
      )}

      <div
        className="relative z-10 flex items-center justify-center w-[72px] h-[72px] rounded-2xl text-white font-extrabold leading-none shadow-xl"
        style={{
          background: 'linear-gradient(135deg, #c9b67e, #9e8b52)',
          boxShadow: '0 8px 22px rgba(158, 139, 82, 0.45), 0 2px 6px rgba(0,0,0,0.1)',
          fontFamily: 'Montserrat, system-ui, sans-serif',
          fontSize: '42px',
        }}
      >
        {n}
      </div>

      <style jsx>{`
        .oc-confetti-piece {
          position: absolute;
          left: 0;
          top: 0;
          transform: translate(-50%, -50%) translate(0, 0) rotate(0deg) scale(0.4);
          opacity: 0;
          animation-name: oc-confetti-burst;
          animation-iteration-count: infinite;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
        }
        @keyframes oc-confetti-burst {
          0% {
            transform: translate(-50%, -50%) translate(0, 0) rotate(0deg) scale(0.3);
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%)
              translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(1);
            opacity: 0;
          }
        }
        .oc-confetti-glow {
          background: radial-gradient(
            circle,
            rgba(201, 182, 126, 0.35) 0%,
            rgba(201, 182, 126, 0.18) 30%,
            rgba(201, 182, 126, 0) 70%
          );
          animation: oc-confetti-glow-pulse 2.4s ease-in-out infinite;
        }
        @keyframes oc-confetti-glow-pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.85);
            opacity: 0.6;
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
