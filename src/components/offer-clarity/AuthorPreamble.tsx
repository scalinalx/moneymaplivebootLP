'use client';

import React from 'react';
import Image from 'next/image';
import { CTA } from './CTA';

export function AuthorPreamble() {
  return (
    <>
      <section className="bg-black text-white py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-6">
          <p
            className="text-xl md:text-3xl text-center leading-relaxed"
            style={{ fontFamily: 'Lora, Georgia, serif' }}
          >
            <span className="font-bold">Clear offers are strategically created.</span>{' '}
            <span className="text-white/90">
              Every word is intentional. Every sentence converts. Nothing is left to chance.
            </span>
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-xl overflow-hidden shadow-xl bg-white">
            <Image
              src="/imgs/offer-clarity/4.webp"
              alt="Real revenue from clear offers"
              width={900}
              height={520}
              className="w-full h-auto object-cover"
            />
          </div>

          <div>
            <h3
              className="text-3xl md:text-4xl font-extrabold text-[#9E8B52] mb-6 leading-snug"
              style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
            >
              I woke up to this. While Eva slept.
            </h3>
            <p
              className="text-base md:text-lg text-[#1a1a1a] leading-relaxed"
              style={{ fontFamily: 'Lora, Georgia, serif' }}
            >
              I&apos;m REALLY good at writing newsletters that sell. But the secret to making real
              money — especially when your audience is small — isn&apos;t writing more.{' '}
              <span className="font-bold">
                It&apos;s creating offers so clear, your subscribers buy from a single email.
              </span>{' '}
              For years, I&apos;ve tested every angle of offer creation — positioning, pricing,
              validation, launch sequences. The system inside this course is what works.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center mt-16">
          <h3
            className="text-3xl md:text-5xl font-extrabold leading-tight order-2 md:order-1"
            style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
          >
            Clear offers.
            <br />7 figures.
            <br />
            Two-hour workdays.
          </h3>
          <div className="flex justify-center order-1 md:order-2">
            <CTA size="lg">TEACH ME HOW TO GET WAY MORE MONEY!</CTA>
          </div>
        </div>
      </section>
    </>
  );
}
