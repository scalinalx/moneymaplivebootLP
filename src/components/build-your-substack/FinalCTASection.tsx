'use client';

import { CheckCircle } from 'lucide-react';

const checklistItems = [
  'Live 60-Minute Workshop',
  'Full Replay (Lifetime Access)',
  'Positioning Angle Framework',
  'First Article Template',
  'Paywall Strategy Blueprint',
  'Publishing Confidence Checklist',
  'Live Q&A Access',
];

export const FinalCTASection = () => {
  const handleClick = () => {
    const el = document.getElementById('checkout-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#1a1a1a] p-10 rounded-2xl text-center">
          {/* Urgency pill */}
          <span className="inline-block bg-[#f72585] text-white text-[10px] font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full animate-pulse mb-6">
            ONLY 100 SEATS — GOING FAST
          </span>

          {/* Price */}
          <div className="font-anton text-6xl text-[#ffc300] mb-2">$97</div>

          {/* Strikethrough value */}
          <div className="font-lato text-gray-500 text-sm line-through mb-6">$586 value</div>

          {/* Checklist */}
          <div className="inline-block text-left space-y-2 mb-8">
            {checklistItems.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="text-[#ffc300] flex-shrink-0" size={16} />
                <span className="font-lato text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={handleClick}
            className="bg-[#ffc300] text-[#1a1a1a] font-montserrat font-bold text-xl py-5 w-full rounded-lg shadow-[0_4px_20px_rgba(255,195,0,0.25)] uppercase tracking-wider hover:-translate-y-1 transition-all"
          >
            BOOK MY SEAT — $97 →
          </button>

          {/* Date note */}
          <p className="text-gray-500 text-xs mt-4">Saturday, March 21 @ 10:00 AM EST</p>
        </div>
      </div>
    </section>
  );
};
