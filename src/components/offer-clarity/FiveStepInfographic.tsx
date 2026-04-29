'use client';

import React from 'react';
import { CTA } from './CTA';

const steps = [
  {
    n: '1',
    color: 'bg-[#e74c3c]',
    title: 'The Clarity Framework',
    sub: 'The "One-Sentence Offer" formula',
    bullets: ['Build your offer', 'in one sentence'],
    accent: 'text-rose-600',
  },
  {
    n: '2',
    color: 'bg-[#9b59b6]',
    title: 'The Validation Sprint',
    sub: 'The "Will It Sell?" stress test',
    bullets: ['Know it sells', 'before you launch'],
    accent: 'text-purple-600',
  },
  {
    n: '3',
    color: 'bg-[#27ae60]',
    title: 'The Price Architect',
    sub: 'Why $97 outsells $27',
    bullets: ['Price with', 'confidence'],
    accent: 'text-emerald-600',
  },
  {
    n: '4',
    color: 'bg-[#f39c12]',
    title: 'The Launch Plan',
    sub: '3-email template, copy. paste. send.',
    bullets: ['Launch this', 'week'],
    accent: 'text-orange-600',
  },
  {
    n: 'AI',
    color: 'bg-[#3498db]',
    title: 'AI Offer Flow Tool',
    sub: 'Generates offers in 60 seconds',
    bullets: ['60-second', 'offer generation'],
    accent: 'text-sky-600',
  },
];

export function FiveStepInfographic() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-3xl md:text-5xl font-extrabold text-center mb-12 leading-tight"
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          What happens when you have a clear offer:
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 max-w-5xl mx-auto">
          {steps.map((s) => (
            <div
              key={s.n}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col items-start"
            >
              <div
                className={`${s.color} text-white font-extrabold text-lg w-12 h-10 rounded-md flex items-center justify-center mb-4 shadow`}
                style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
              >
                {s.n}
              </div>
              <h3
                className="text-base font-extrabold text-[#1a1a1a] mb-2 leading-tight"
                style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
              >
                {s.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">{s.sub}</p>
              <ul className={`text-xs ${s.accent} space-y-1 mt-auto`}>
                {s.bullets.map((b, i) => (
                  <li key={i}>→ {b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
