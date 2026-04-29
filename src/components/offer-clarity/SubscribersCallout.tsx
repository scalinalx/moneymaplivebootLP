'use client';

import React from 'react';
import Image from 'next/image';

export function SubscribersCallout() {
  return (
    <section className="bg-black text-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-3xl md:text-5xl font-extrabold text-center mb-14 leading-tight"
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          When you have a clear offer,{' '}
          <span className="text-[#c9b67e]">198 subscribers can become $2,400</span> in 48 hours:
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-xl overflow-hidden">
            <Image
              src="/imgs/offer-clarity/5.webp"
              alt="Pain points without a clear offer"
              width={800}
              height={500}
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="rounded-xl overflow-hidden">
            <Image
              src="/imgs/offer-clarity/hero4.jpeg"
              alt="Offer Clarity course in action"
              width={800}
              height={500}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        <h3
          className="text-2xl md:text-4xl font-extrabold text-center mt-14 leading-snug"
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          Or 547 subscribers becomes <span className="text-[#c9b67e]">$3,200</span> on a first
          launch.
        </h3>
      </div>
    </section>
  );
}
