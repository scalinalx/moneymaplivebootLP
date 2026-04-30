'use client';

import React from 'react';
import Image from 'next/image';

export function HowIsThisDifferent() {
  return (
    <section className="bg-black text-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2
          className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight text-[#c9b67e]"
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          How is this different than the free offer advice you&apos;ve read online?
        </h2>

        <p
          className="text-base md:text-xl leading-relaxed text-white/90 mb-10"
          style={{ fontFamily: 'Lora, Georgia, serif' }}
        >
          Free advice tells you to &ldquo;niche down&rdquo; and &ldquo;solve a problem.&rdquo;
          Helpful — but not enough. This course goes deep into the actual mechanics: the One-Sentence
          Offer formula, the Will-It-Sell stress test, the Perceived Value Stack, the 3-email launch
          sequence, and the AI tool I built to do it all in 60 seconds.{' '}
          <span className="font-bold">
            It&apos;s the system behind every offer in my 7-figure stack — not generic advice, the
            real playbook.
          </span>
        </p>

        <div className="flex justify-center mb-8">
          <Image
            src="/imgs/offer-clarity/hero3.webp"
            alt="Offer Clarity course preview"
            width={900}
            height={500}
            className="rounded-lg shadow-2xl w-full max-w-3xl h-auto"
          />
        </div>

        <p
          className="text-lg md:text-xl italic text-white/85"
          style={{ fontFamily: 'Lora, Georgia, serif' }}
        >
          This course will show you how to create offers your readers can&apos;t resist.
        </p>
      </div>
    </section>
  );
}
