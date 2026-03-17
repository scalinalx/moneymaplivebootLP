'use client';

import { CheckCircle } from 'lucide-react';

const objections = [
  'No audience needed',
  'No previous experience required',
  'No expensive tools or software',
  'No tech skills necessary',
  "No need to be an 'expert'",
  'Just 60 minutes of your time',
];

export const BridgeSection = () => {
  const scrollToCheckout = () => {
    document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="font-montserrat font-bold text-[#f72585] text-xs tracking-widest uppercase mb-4">
          SOUND FAMILIAR?
        </p>

        <h2 className="font-anton text-3xl md:text-4xl text-[#333333] uppercase mb-6">
          You Know You Should Start. You Just Don&apos;t Know WHERE.
        </h2>

        <div className="font-lora text-gray-600 text-lg leading-relaxed space-y-4 mb-10">
          <p>
            You&apos;ve read the guides. Watched the YouTube videos. Studied what the top
            Substacks do. And yet — your publication is still blank. Not because you&apos;re
            lazy. Not because you don&apos;t have ideas.
          </p>
          <p>
            Because every time you sit down to start, the same questions paralyze you: What
            should I write about? Should I go free or paid? What if nobody subscribes? What if
            I pick the wrong niche and waste months?
          </p>
          <p>
            Here&apos;s what nobody tells you: the difference between creators who launch
            successfully and creators who stay stuck isn&apos;t talent, audience, or luck.
          </p>
        </div>

        <div className="bg-[#ffc300]/10 border-l-4 border-[#ffc300] p-6 rounded-r-xl mb-10">
          <p className="font-montserrat font-bold text-[#333333] text-lg">
            The only thing you&apos;re missing is a step-by-step structure that tells you
            exactly what to do, in what order, in 60 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {objections.map((item) => (
            <div
              key={item}
              className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-3"
            >
              <CheckCircle className="text-[#27AE60] flex-shrink-0" size={20} />
              <span className="font-lato text-gray-700 font-medium text-sm">{item}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={scrollToCheckout}
            className="bg-[#ffc300] text-[#1a1a1a] font-montserrat font-bold text-lg py-4 px-10 rounded-lg shadow uppercase tracking-wider hover:bg-[#e6b000] transition-colors"
          >
            SHOW ME THE FRAMEWORK →
          </button>
        </div>
      </div>
    </section>
  );
};
