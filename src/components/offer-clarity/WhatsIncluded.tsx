'use client';

import React from 'react';
import Image from 'next/image';
import { CTA } from './CTA';

const modules = [
  {
    title: 'The Clarity Framework',
    body: (
      <>
        my <u>One-Sentence Offer</u> formula that turns a vague idea into something you can describe
        — and SELL — in 10 seconds flat.
      </>
    ),
    note: "Once you see this formula, you'll understand exactly why your previous offers didn't convert.",
  },
  {
    title: 'The Validation Sprint',
    body: (
      <>
        how to know — <em>before you build ANYTHING</em> — that people will actually pay. Includes
        the <em>&ldquo;Will It Sell?&rdquo; 7-question stress test</em> I use for my own 7-figure
        product stack.
      </>
    ),
    note: 'This section alone can save you months of wasted work building something nobody wants.',
  },
  {
    title: 'The Price Architect',
    body: (
      <>
        why $97 outsells $27 <em>(counterintuitive but I have the data)</em>. The{' '}
        <em>&ldquo;Perceived Value Stack&rdquo;</em> that makes a $97 offer FEEL like $500+.
      </>
    ),
    note: 'The pricing system that took me from $7 ebooks to $597 programs.',
  },
  {
    title: 'The Launch Plan',
    body: (
      <>
        a done-for-you <em>3-email launch sequence</em> you can copy, paste, and send THIS WEEK —
        even if your audience is 50 people. Plus the <em>&ldquo;Send Day&rdquo;</em> formula and a
        48-hour recovery plan if nobody buys.
      </>
    ),
    note: 'My student used this EXACT template for her $8,400 launch from 312 subscribers.',
  },
  {
    title: '[BONUS] AI Offer Flow Tool',
    isBonus: true,
    body: (
      <>
        the AI tool that generates a validated offer with positioning, pricing, and a one-sentence
        pitch in 60 seconds. Over 3,000 creators have used it.
      </>
    ),
    note: "You'll use it live inside the course and keep it forever after.",
  },
];

const advancedItems = [
  'How to launch a second offer without confusing or cannibalizing your first one.',
  "How I've trained my readers to eagerly buy from one email — what I do is extremely intentional and nothing is left to chance.",
  'How to make the switch from one scrappy offer to a clean ecosystem of 3–5 offers your audience can move through.',
  'The #1 element every offer needs if you want repeat buyers — what separates one-time customers from raving fans.',
  'Insider walkthrough of my exact monthly offer-rotation gameplan — how I structure each month to make the most while writing the least.',
];

export function WhatsIncluded() {
  return (
    <section className="bg-black py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-2xl border-2 border-[#9E8B52] shadow-2xl px-8 py-12 md:px-14 md:py-16">
          <div className="flex justify-center mb-8">
            <Image
              src="/imgs/offer-clarity/6.webp"
              alt="Course product mockups"
              width={900}
              height={450}
              className="w-full max-w-3xl h-auto object-contain"
            />
          </div>

          <h2
            className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-[#1a1a1a]"
            style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
          >
            What&apos;s Included In The Offer Clarity Sprint?
          </h2>

          <p
            className="text-lg md:text-xl mb-10 leading-relaxed font-bold text-[#1a1a1a]"
            style={{ fontFamily: 'Lora, Georgia, serif' }}
          >
            Everything you need to package your expertise into a clear offer that sells{' '}
            <em className="font-normal">
              — positioning, validation, pricing, launch, and the AI tool to do it all in 60
              seconds.
            </em>
          </p>

          <ul className="space-y-7">
            {modules.map((m) => (
              <li key={m.title} className="border-l-4 border-[#9E8B52] pl-5">
                <h3
                  className={`text-lg md:text-xl font-extrabold mb-2 ${
                    m.isBonus ? 'text-[#9E8B52]' : 'text-[#9E8B52]'
                  }`}
                  style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                >
                  {m.title}
                </h3>
                <p
                  className="text-base md:text-lg text-[#1a1a1a] leading-relaxed"
                  style={{ fontFamily: 'Lora, Georgia, serif' }}
                >
                  {m.body}
                </p>
                {m.note && (
                  <p className="text-sm md:text-base text-gray-600 italic mt-2">({m.note})</p>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-12 mb-6 bg-[#faf7f0] rounded-xl p-6 md:p-8">
            <h3
              className="text-base font-extrabold text-[#9E8B52] uppercase tracking-widest mb-4"
              style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
            >
              For Established Creators:
            </h3>
            <ul className="space-y-3">
              {advancedItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#9E8B52] mt-1.5">●</span>
                  <span
                    className="text-base md:text-lg text-[#1a1a1a]"
                    style={{ fontFamily: 'Lora, Georgia, serif' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 mb-2 bg-[#faf7f0] rounded-xl p-6 border-2 border-dashed border-[#9E8B52]">
            <p
              className="text-base md:text-lg text-[#1a1a1a]"
              style={{ fontFamily: 'Lora, Georgia, serif' }}
            >
              <span className="font-extrabold text-[#9E8B52]">[BONUS WORKBOOK]:</span> The
              One-Sentence Offer Workbook — get from blank page to validated, priced offer in 30
              minutes.
            </p>
          </div>

          <div className="text-center mt-12">
            <h3
              className="text-4xl md:text-5xl font-extrabold mb-3 text-[#1a1a1a]"
              style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
            >
              Price: $197
            </h3>
          </div>

          <CTA size="lg" className="mt-10">
            SHOW ME HOW TO MAKE WAY MORE MONEY
          </CTA>
        </div>
      </div>
    </section>
  );
}
