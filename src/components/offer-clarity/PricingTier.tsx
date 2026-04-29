'use client';

import React from 'react';
import Image from 'next/image';
import { CTA } from './CTA';

export function PricingTier() {
  return (
    <section className="bg-black text-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-8">
          <Image
            src="/imgs/offer-clarity/wordm2.jpeg"
            alt="Ana Calin"
            width={200}
            height={86}
            className="h-auto w-[160px] md:w-[200px] object-contain"
          />
        </div>

        <h2
          className="font-extrabold leading-tight mb-10"
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          <span className="block text-3xl sm:text-4xl md:text-5xl">
            <span className="text-[#c9b67e]">THE OFFER CLARITY SPRINT:</span>
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl">
            How We Get Way More Money Working Less
          </span>
        </h2>

        <div className="bg-[#1a1a1a] border-2 border-[#9E8B52] rounded-2xl overflow-hidden max-w-2xl mx-auto mb-10">
          <div className="grid grid-cols-2 bg-[#9E8B52] text-white px-6 py-4 font-bold text-base md:text-lg">
            <p className="text-left">Today (Launch Day)</p>
            <p className="text-right">$97 ← YOU ARE HERE</p>
          </div>
          <div className="grid grid-cols-2 px-6 py-4 border-t border-[#333] text-white/80">
            <p className="text-left">Tomorrow</p>
            <p className="text-right">$147</p>
          </div>
          <div className="grid grid-cols-2 px-6 py-4 border-t border-[#333] text-white/80">
            <p className="text-left">Day 3+</p>
            <p className="text-right">$197 (forever)</p>
          </div>
        </div>

        <CTA size="lg">I NEED THIS! I&apos;M IN, ANA! — $97</CTA>
      </div>
    </section>
  );
}
