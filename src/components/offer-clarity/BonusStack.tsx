'use client';

import React from 'react';
import { CTA } from './CTA';

const bonuses = [
  {
    label: 'BONUS',
    title: 'One-Sentence Offer Workbook',
    body: 'Fill in the blanks. Build your offer in 30 minutes.',
    oldPrice: '$27',
    free: true,
    color: 'border-[#9E8B52]',
  },
  {
    label: 'BONUS',
    title: '3-Email Launch Template',
    body: 'Copy. Paste. Send. Launch this week.',
    oldPrice: '$37',
    free: true,
    color: 'border-[#9E8B52]',
  },
  {
    label: 'BONUS',
    title: 'AI Offer Flow Access (Forever)',
    body: 'Generates offers in 60 seconds. 3,000+ creators use it.',
    oldPrice: '$47',
    free: true,
    color: 'border-[#9E8B52]',
  },
  {
    label: 'VIP ONLY',
    title: 'VIP Live Call with Ana',
    body: 'Personal offer review. Direct feedback. VIP ONLY.',
    free: false,
    priceless: true,
    color: 'border-pink-500 bg-gradient-to-br from-pink-500 to-pink-600 text-white',
  },
];

export function BonusStack() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-3xl md:text-5xl font-extrabold text-center mb-3"
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          LAUNCH BONUSES:
        </h2>
        <p
          className="text-base md:text-lg italic text-gray-600 text-center mb-12"
          style={{ fontFamily: 'Lora, Georgia, serif' }}
        >
          When you join during launch, you get all of these free.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bonuses.map((b, i) => (
            <div
              key={i}
              className={`rounded-xl border-t-4 ${b.color} ${
                b.priceless ? 'shadow-lg' : 'bg-white shadow-sm'
              } p-6 flex flex-col`}
            >
              <p
                className={`text-xs font-extrabold uppercase tracking-widest mb-2 ${
                  b.priceless ? 'text-white/90' : 'text-[#9E8B52]'
                }`}
                style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
              >
                {b.label}
              </p>
              <h3
                className={`text-lg md:text-xl font-extrabold mb-3 leading-snug ${
                  b.priceless ? 'text-white' : 'text-[#1a1a1a]'
                }`}
                style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
              >
                {b.title}
              </h3>
              <p
                className={`text-sm md:text-base mb-5 leading-relaxed flex-1 ${
                  b.priceless ? 'text-white/90' : 'text-[#1a1a1a]/80'
                }`}
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                {b.body}
              </p>
              <div className="mt-auto">
                {b.free ? (
                  <p className="text-base">
                    <span className="line-through text-gray-500 mr-2">{b.oldPrice}</span>
                    <span className="font-extrabold text-[#9E8B52]">FREE*</span>
                  </p>
                ) : (
                  <p
                    className="font-extrabold text-2xl text-white"
                    style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                  >
                    PRICELESS
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs italic text-gray-500 text-center mt-6">
          *when you purchase during the launch period.
        </p>

        <CTA size="lg" className="mt-10">
          GIVE ME EVERYTHING!
        </CTA>
      </div>
    </section>
  );
}
