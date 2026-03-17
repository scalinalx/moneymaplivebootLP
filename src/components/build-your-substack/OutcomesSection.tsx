'use client';

import { CheckCircle } from 'lucide-react';

const outcomes = [
  "Position your Substack so the right readers find you — even if you're in a 'crowded' niche",
  "Write a bio and About page that converts visitors into subscribers on autopilot",
  "Structure your first article so it's compelling enough to share — even if you've never published before",
  "Choose between free, paid, or hybrid — and know exactly which model fits your goals",
  "Set up a paywall strategy that people actually want to pay for (not one that feels pushy)",
  "Name your publication something memorable that signals exactly what readers will get",
  "Build a content rhythm you can sustain without burning out in week two",
  "Launch with confidence instead of second-guessing every decision for months",
];

export const OutcomesSection = () => {
  const scrollToCheckout = () => {
    document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-[#1a1a1a] py-20 px-6">
      <p className="text-[#f72585] text-xs tracking-widest uppercase text-center mb-4 font-montserrat">
        WHAT YOU&apos;LL WALK AWAY WITH
      </p>
      <h2 className="font-anton text-3xl md:text-4xl text-white uppercase text-center mb-12">
        By The End Of This Workshop You&apos;ll Know Exactly How To...
      </h2>

      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12">
        {outcomes.map((outcome, i) => (
          <div
            key={i}
            className="bg-white/5 p-5 rounded-xl border border-white/10 flex items-start gap-3"
          >
            <CheckCircle className="text-[#27AE60] flex-shrink-0 mt-0.5" size={20} />
            <span className="font-lato text-gray-300 text-sm">{outcome}</span>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={scrollToCheckout}
          className="bg-[#ffc300] text-[#1a1a1a] font-montserrat font-bold text-lg px-8 py-4 rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
        >
          I WANT ALL OF THIS →
        </button>
        <p className="text-gray-500 italic text-xs text-center mt-4 font-lora">
          60 minutes. Everything you need. No fluff.
        </p>
      </div>
    </section>
  );
};
