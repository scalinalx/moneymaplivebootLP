'use client';

import React from 'react';

export function AllSalesFinal() {
  return (
    <section className="bg-black py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-6 text-center text-white">
        <h3
          className="text-3xl md:text-4xl font-extrabold mb-4"
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          All Sales Final
        </h3>
        <p
          className="text-base md:text-lg italic text-white/85 leading-relaxed"
          style={{ fontFamily: 'Lora, Georgia, serif' }}
        >
          Due to the digital nature of this course, all sales are final. No refunds. By purchasing
          you confirm you understand exactly what you&apos;re getting: a step-by-step system for
          creating clear offers that sell.
        </p>
      </div>
    </section>
  );
}
