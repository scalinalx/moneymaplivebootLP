'use client';

import React from 'react';

interface NumberBadgeProps {
  n: number;
  withConfetti?: boolean;
}

export function NumberBadge({ n, withConfetti = false }: NumberBadgeProps) {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className="relative flex items-center justify-center w-[72px] h-[72px] rounded-2xl text-white font-extrabold leading-none shadow-xl"
        style={{
          background: 'linear-gradient(135deg, #c9b67e, #9e8b52)',
          boxShadow: '0 8px 22px rgba(158, 139, 82, 0.45), 0 2px 6px rgba(0,0,0,0.1)',
          fontFamily: 'Montserrat, system-ui, sans-serif',
          fontSize: '42px',
        }}
      >
        {n}
        {withConfetti && (
          <span
            aria-hidden
            className="absolute pointer-events-none animate-[confettiPop_2s_ease-in-out_infinite]"
            style={{
              inset: '-44px',
              backgroundImage: `
                radial-gradient(circle 4px at  8% 14%, #ff6b6b 99%, transparent 100%),
                radial-gradient(circle 5px at 92% 18%, #4ecdc4 99%, transparent 100%),
                radial-gradient(circle 3px at 22% 86%, #ffd93d 99%, transparent 100%),
                radial-gradient(circle 5px at 78% 82%, #95e1d3 99%, transparent 100%),
                radial-gradient(circle 4px at 50%  6%, #f38181 99%, transparent 100%),
                radial-gradient(circle 3px at  4% 52%, #aa96da 99%, transparent 100%),
                radial-gradient(circle 4px at 96% 56%, #fcbad3 99%, transparent 100%),
                radial-gradient(circle 3px at 38% 95%, #6c5ce7 99%, transparent 100%),
                radial-gradient(circle 4px at 14% 30%, #ffa502 99%, transparent 100%),
                radial-gradient(circle 3px at 86% 70%, #2ed573 99%, transparent 100%),
                radial-gradient(circle 4px at 64%  3%, #ff4757 99%, transparent 100%),
                radial-gradient(circle 3px at 30%  8%, #1e90ff 99%, transparent 100%)
              `,
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}
      </div>
    </div>
  );
}
