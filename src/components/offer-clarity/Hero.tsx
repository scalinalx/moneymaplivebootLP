'use client';

import React from 'react';
import Image from 'next/image';
import { CTA } from './CTA';

export function Hero() {
  return (
    <section className="bg-black text-white pt-0 pb-14 md:pb-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-8">
          <Image
            src="/imgs/offer-clarity/wordm2.jpeg"
            alt="Ana Calin"
            width={220}
            height={95}
            priority
            className="h-auto w-[180px] md:w-[220px] object-contain block"
          />
        </div>

        <h1
          className="font-extrabold leading-[1.05] mb-6"
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-[#c9b67e]">THE OFFER CLARITY SPRINT:</span>{' '}
            <span className="text-white">How We Get</span>
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
            Way More Money Working Less
          </span>
        </h1>

        <p
          className="text-base md:text-lg lg:text-xl text-white/85 mt-2 mb-10 max-w-3xl mx-auto"
          style={{ fontFamily: 'Lora, Georgia, serif' }}
        >
          5 years of figuring out offers that sell from one email.{' '}
          <span className="font-bold text-white">The wait is finally over.</span>
        </p>

        <div className="flex justify-center mb-10">
          <Image
            src="/imgs/offer-clarity/hero1.jpeg"
            alt="The Offer Clarity Sprint — product mockups"
            width={1080}
            height={540}
            priority
            className="rounded-lg shadow-2xl w-full max-w-5xl h-auto object-contain"
          />
        </div>

        <p
          className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10"
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          I&apos;ll teach you exactly how I package expertise into clear offers that subscribers buy
          from a single email — no calls, no funnels, no ads. Just{' '}
          <span className="text-[#c9b67e] font-bold">one clear offer.</span>
        </p>

        <CTA size="lg">TEACH ME HOW TO GET WAY MORE MONEY!</CTA>
      </div>
    </section>
  );
}
