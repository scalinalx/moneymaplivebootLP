'use client';

import React from 'react';
import Image from 'next/image';
import { NumberBadge } from './NumberBadge';

const steps = [
  {
    n: 1,
    body: (
      <>
        She&apos;d been &ldquo;working on her offer&rdquo; for{' '}
        <span className="font-bold">8 months</span>. 312 subscribers. Zero sales.
      </>
    ),
  },
  {
    n: 2,
    body: (
      <>
        We fixed her offer in <span className="font-bold">45 minutes</span> using the Clarity
        Framework. One sentence. Validated. Priced.
      </>
    ),
  },
  {
    n: 3,
    confetti: true,
    body: (
      <>
        She sent <span className="font-bold">one email</span> the next day using the 3-Email Launch
        Template — and made <span className="font-bold text-[#9E8B52]">$8,400.</span>
      </>
    ),
  },
];

export function CaseStudyWalkthrough() {
  return (
    <section className="bg-[#faf7f0] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-3xl md:text-5xl font-extrabold text-center mb-16 leading-tight"
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          How a clear offer turns 312 subscribers into{' '}
          <span className="text-[#9E8B52]">$8,400:</span>
        </h2>

        <div className="flex flex-col md:flex-row md:items-stretch gap-8 md:gap-3 lg:gap-4 max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <React.Fragment key={step.n}>
              <div className="relative bg-white rounded-xl border border-gray-200 px-6 pt-14 pb-8 shadow-sm flex-1 flex items-center">
                <div className="absolute -top-9 left-1/2 -translate-x-1/2">
                  <NumberBadge n={step.n} withConfetti={step.confetti} />
                </div>
                <p
                  className="text-lg md:text-xl text-center leading-relaxed text-[#1a1a1a]"
                  style={{ fontFamily: 'Lora, Georgia, serif' }}
                >
                  {step.body}
                </p>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className="hidden md:flex shrink-0 items-center justify-center w-12 lg:w-16"
                  aria-hidden="true"
                >
                  <Image
                    src="/imgs/offer-clarity/arrow.png"
                    alt=""
                    width={120}
                    height={60}
                    className="w-full h-auto object-contain drop-shadow-[0_1px_2px_rgba(158,139,82,0.25)] animate-[oc-arrow-drift_2.4s_ease-in-out_infinite]"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <style jsx>{`
          @keyframes oc-arrow-drift {
            0%, 100% { transform: translateX(0); opacity: 0.85; }
            50% { transform: translateX(4px); opacity: 1; }
          }
        `}</style>

        <p className="text-sm italic text-gray-500 text-center mt-10">
          Note: Real student result. Individual results vary based on effort and implementation.
        </p>
      </div>
    </section>
  );
}
