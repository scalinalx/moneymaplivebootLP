'use client';

import React from 'react';
import { CTA } from './CTA';

const results = [
  {
    amount: '$8,400',
    sub: 'from 312 subscribers',
    accent: 'border-rose-400',
    body: 'One email. First launch. She\'d been "working on her offer" for 8 months. We fixed it in 45 minutes. She sent one email.',
  },
  {
    amount: '$2,400',
    sub: 'from 198 subscribers',
    accent: 'border-purple-400',
    body: 'She almost didn\'t start because she thought 198 subscribers wasn\'t enough. It was.',
  },
  {
    amount: '$3,200',
    sub: 'from 547 subscribers',
    accent: 'border-emerald-400',
    body: 'First launch EVER. Wrote 3 emails using the template. Launched that same week.',
  },
  {
    amount: '$340',
    sub: 'from 89 subscribers',
    accent: 'border-orange-400',
    body: 'Used the AI Offer Flow tool on a Tuesday. Had her first sale by Friday. 4.5% conversion.',
  },
];

export function RealResults() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-3xl md:text-5xl font-extrabold text-center mb-3"
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          Real results from my students:
        </h2>
        <p
          className="text-lg md:text-xl italic text-gray-600 text-center mb-14"
          style={{ fontFamily: 'Lora, Georgia, serif' }}
        >
          Hundreds of subscribers. One clear offer. Real revenue.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {results.map((r) => (
            <div
              key={r.amount}
              className={`rounded-xl bg-white border-t-4 ${r.accent} shadow-sm p-6`}
            >
              <p
                className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a]"
                style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
              >
                {r.amount}
              </p>
              <p className="text-sm font-bold text-[#9E8B52] uppercase tracking-wide mt-1 mb-3">
                {r.sub}
              </p>
              <p
                className="text-sm md:text-base text-[#1a1a1a]/80 leading-relaxed"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                {r.body}
              </p>
            </div>
          ))}
        </div>

        <CTA size="lg" variant="dark" className="mt-14">
          I NEED THIS! I&apos;M IN, ANA!
        </CTA>

        <p className="text-xs md:text-sm italic text-gray-500 text-center max-w-3xl mx-auto mt-10 leading-relaxed">
          <span className="font-bold not-italic">Note:</span> This program is educational. Individual
          results vary based on effort, experience, and implementation. No income or performance
          results are guaranteed. Any testimonials, results, or examples shared represent individual
          experiences and are not guarantees. Due to the digital nature of this program, all sales
          are final.
        </p>
      </div>
    </section>
  );
}
