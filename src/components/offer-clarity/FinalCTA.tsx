'use client';

import React from 'react';
import { CTA } from './CTA';

export function FinalCTA() {
  return (
    <section className="bg-[#faf7f0] py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p
          className="text-lg md:text-xl text-[#1a1a1a] leading-relaxed mb-3"
          style={{ fontFamily: 'Lora, Georgia, serif' }}
        >
          This course contains the answers to every question I&apos;ve ever been asked about how I
          create offers that sell from a single email.
        </p>
        <p
          className="text-lg md:text-xl text-[#1a1a1a] leading-relaxed mb-10"
          style={{ fontFamily: 'Lora, Georgia, serif' }}
        >
          <span className="font-extrabold">I don&apos;t hold anything back.</span> See you inside. —
          Ana
        </p>

        <CTA size="lg">GIVE ME EVERYTHING!</CTA>
      </div>
    </section>
  );
}
