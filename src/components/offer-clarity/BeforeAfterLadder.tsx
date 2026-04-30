'use client';

import React from 'react';
import Image from 'next/image';
import { CTA } from './CTA';

const without = [
  'months of "working on it"',
  'giving your best content away for free',
  'followers who read but never buy',
  '"maybe I should make a course?"',
  'Googling "how much should I charge" at 2 AM',
  '$0 revenue from your expertise',
];

const withClear = [
  'launched in a week',
  'getting paid for what you already know',
  'subscribers who buy from ONE email',
  'an offer you can describe in 10 seconds',
  "pricing you're confident in (that converts)",
  'real revenue from a small audience',
];

export function BeforeAfterLadder() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {/* WITHOUT */}
          <div className="bg-rose-50 rounded-xl border border-rose-100 p-6 md:p-8">
            <h3
              className="text-lg md:text-xl font-extrabold text-rose-700 mb-5 pb-3 border-b border-rose-200"
              style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
            >
              WITHOUT a clear offer
            </h3>
            <ul className="space-y-3">
              {without.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-white/60 rounded-lg px-3 py-2.5"
                >
                  <span className="text-rose-600 font-bold mt-0.5">✕</span>
                  <span
                    className="text-base md:text-lg text-[#1a1a1a]"
                    style={{ fontFamily: 'Lora, Georgia, serif' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* WITH */}
          <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-6 md:p-8">
            <h3
              className="text-lg md:text-xl font-extrabold text-emerald-700 mb-5 pb-3 border-b border-emerald-200"
              style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
            >
              WITH a clear offer
            </h3>
            <ul className="space-y-3">
              {withClear.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-white/60 rounded-lg px-3 py-2.5"
                >
                  <span className="text-emerald-600 font-bold mt-0.5">→</span>
                  <span
                    className="text-base md:text-lg text-[#1a1a1a]"
                    style={{ fontFamily: 'Lora, Georgia, serif' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <CTA size="lg" className="mt-12">
          I&apos;M READY TO MAKE WAY MORE MONEY!
        </CTA>

        <h3
          className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center mt-16 mb-6 text-[#1a1a1a]"
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          Do any of these sound familiar?
        </h3>

        <div className="flex justify-center">
          <Image
            src="/imgs/offer-clarity/5.webp"
            alt="With vs without a clear offer"
            width={1600}
            height={900}
            className="w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl h-auto object-contain rounded-xl"
          />
        </div>

        <CTA size="lg" className="mt-12">
          YES — FIX MY OFFER NOW!
        </CTA>
      </div>
    </section>
  );
}
