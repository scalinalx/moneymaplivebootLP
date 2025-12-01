import React from 'react';
import { Check, X, ArrowRight } from 'lucide-react';

export const IsThisForYou: React.FC = () => {
  const forYou = [
    "You have a newsletter (or idea) but no clear path to $5k/mo.",
    "You're tired of the 'content treadmill'—writing endlessly for likes.",
    "You want a proven SYSTEM, not just random 'growth hacks'.",
    "You are willing to do the work and implement the workshop.",
    "You're a creator, consultant, coach or newsletter writter ready to monetize your expertise",
    "You've tried launching before and got crickets",
    "You're TIRED of guessing what you'll audience would buy"
  ];

  const notForYou = [
    "You want a 'get rich quick' scheme that requires zero effort.",
    "You think 'passive income' means doing nothing upfront.",
    "You aren't willing to invest in paid growth or premium tools.",
    "You just want to 'build a community' without selling anything.",
    "You don't have an audience yet (build that first)"
  ];

  return (
    <section className="py-24 px-4 bg-brand-900/30 border-y border-brand-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          
          {/* The "YES" Column */}
          <div className="relative pl-8 md:pl-12 border-l border-brand-lime/30">
            <h3 className="text-2xl font-display font-bold text-white mb-8 flex items-center gap-3">
               <span className="w-8 h-8 bg-brand-lime rounded-full flex items-center justify-center text-brand-950 text-lg">✓</span>
               THIS IS FOR YOU IF...
            </h3>
            <ul className="space-y-8">
              {forYou.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <Check className="w-5 h-5 text-brand-lime mt-1 flex-shrink-0" />
                  <span className="text-brand-white/90 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The "NO" Column */}
          <div className="relative pl-8 md:pl-12 border-l border-brand-800 opacity-60 hover:opacity-100 transition-opacity duration-500">
            <h3 className="text-2xl font-display font-bold text-brand-grey mb-8 flex items-center gap-3">
               <span className="w-8 h-8 bg-brand-800 rounded-full flex items-center justify-center text-brand-grey text-lg">✕</span>
               WALK AWAY IF...
            </h3>
            <ul className="space-y-8">
              {notForYou.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <X className="w-5 h-5 text-brand-grey mt-1 flex-shrink-0" />
                  <span className="text-brand-grey text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Centered CTA */}
        <div className="mt-12 text-center">
          <a
            href="#join-secondary"
            className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 font-bold px-8 py-4 text-lg rounded-lg hover:bg-yellow-300 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            This is for me! <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
