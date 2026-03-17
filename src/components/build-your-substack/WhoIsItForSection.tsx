'use client';

import { CheckCircle, XCircle } from 'lucide-react';

const forYou = [
  "You've been thinking about starting a Substack but keep putting it off",
  "You have ideas but don't know how to structure or position them",
  "You want to monetize your writing but don't know where to start",
  "You're tired of overthinking and ready to just DO it",
  "You want expert guidance instead of piecing it together from free content",
  "You believe in learning by doing, not watching 40 hours of courses",
];

const notForYou = [
  'You already have a thriving Substack with paid subscribers',
  "You're looking for advanced growth hacks, not foundational setup",
  'You want someone to build your Substack for you',
  "You're not willing to spend 60 minutes on your future",
];

export const WhoIsItForSection = () => {
  const scrollToCheckout = () => {
    document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-20 px-6">
      <h2 className="font-anton text-3xl md:text-4xl text-[#333333] uppercase text-center mb-12">
        Is This Workshop Right For You?
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        {/* For You Column */}
        <div className="bg-[#27AE60]/5 p-8 rounded-2xl border border-[#27AE60]/20">
          <h3 className="font-montserrat font-bold text-[#27AE60] text-sm uppercase tracking-wider mb-6">
            THIS IS FOR YOU IF:
          </h3>
          {forYou.map((item, i) => (
            <div key={i} className="flex items-start gap-3 mb-4">
              <CheckCircle
                className="text-[#27AE60] flex-shrink-0 mt-0.5"
                size={18}
              />
              <span className="font-lato text-gray-700 text-sm">{item}</span>
            </div>
          ))}
        </div>

        {/* Not For You Column */}
        <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
          <h3 className="font-montserrat font-bold text-red-500 text-sm uppercase tracking-wider mb-6">
            NOT FOR YOU IF:
          </h3>
          {notForYou.map((item, i) => (
            <div key={i} className="flex items-start gap-3 mb-4">
              <XCircle
                className="text-red-400 flex-shrink-0 mt-0.5"
                size={18}
              />
              <span className="font-lato text-gray-600 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={scrollToCheckout}
          className="bg-[#ffc300] text-[#1a1a1a] font-montserrat font-bold text-lg px-8 py-4 rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
        >
          THIS WAS MADE FOR ME →
        </button>
      </div>
    </section>
  );
};
