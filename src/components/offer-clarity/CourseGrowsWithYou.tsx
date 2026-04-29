'use client';

import React from 'react';
import Image from 'next/image';
import { CTA } from './CTA';

export function CourseGrowsWithYou() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div className="rounded-xl overflow-hidden shadow-xl border-2 border-dashed border-gray-300 bg-[#1a1a1a]">
          <Image
            src="/imgs/offer-clarity/2.webp"
            alt="Stripe payment notifications"
            width={900}
            height={700}
            className="w-full h-auto object-contain"
          />
        </div>

        <div>
          <h2
            className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight"
            style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
          >
            This course grows with you:
          </h2>

          <div className="space-y-5 mb-8">
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ fontFamily: 'Lora, Georgia, serif' }}
            >
              <span className="font-extrabold text-[#9E8B52]">New creators:</span> use this to write
              your first clear offer and launch it in a weekend, even if your audience is 50 people.
            </p>
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ fontFamily: 'Lora, Georgia, serif' }}
            >
              <span className="font-extrabold text-[#9E8B52]">Established creators:</span> use this
              to fix the offer you&apos;ve been &ldquo;working on&rdquo; for months and finally ship
              it.
            </p>
          </div>

          <CTA size="lg">I WANT RESULTS LIKE THESE!</CTA>
        </div>
      </div>
    </section>
  );
}
