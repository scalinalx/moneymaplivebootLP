'use client';

import React from 'react';
import Image from 'next/image';
import { OfferFlowCard } from './OfferFlowCard';

export function ToolsAndSignature() {
  return (
    <section className="bg-black text-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-extrabold text-center mb-12 leading-snug"
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          We also included a BUNCH of additional templates &amp; tools to help you build your offer:
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/imgs/offer-clarity/8.webp"
              alt="Worksheets and tools"
              width={900}
              height={620}
              className="w-full h-auto object-contain bg-white"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
            <OfferFlowCard />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-12 text-center">
          <p
            className="text-xl md:text-2xl font-bold leading-snug"
            style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
          >
            TONS of exclusive worksheets &amp; plug-and-play offer templates!
          </p>
          <p
            className="text-xl md:text-2xl font-bold leading-snug"
            style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
          >
            Free forever access to my AI Offer Flow tool!
          </p>
        </div>
      </div>
    </section>
  );
}
