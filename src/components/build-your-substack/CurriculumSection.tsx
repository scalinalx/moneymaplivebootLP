'use client';

const agendaItems = [
  {
    number: 1,
    title: 'Your Positioning Angle',
    description:
      "Find the intersection of what you love, what you know, and what people will pay for. Walk out knowing exactly what your Substack is about.",
    time: '15 min',
  },
  {
    number: 2,
    title: 'Publication Name, Bio & About Page',
    description:
      'Craft a name that sticks, a bio that converts, and an About page that turns curious visitors into subscribers.',
    time: '10 min',
  },
  {
    number: 3,
    title: 'Your First Article — Structured & Ready',
    description:
      "Build a compelling first post using our proven article framework. No staring at a blank page.",
    time: '20 min',
  },
  {
    number: 4,
    title: 'Paywall & Monetization Strategy',
    description:
      'Choose your pricing model, set up your paywall, and know exactly when and how to start charging.',
    time: '10 min',
  },
  {
    number: 5,
    title: 'Live Q&A — Your Questions Answered',
    description:
      'Get personalized answers to your specific situation. No question is too basic.',
    time: '5 min',
  },
];

export const CurriculumSection = () => {
  const scrollToCheckout = () => {
    document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFaq = () => {
    document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-20 px-6">
      <p className="text-[#f72585] text-xs tracking-widest uppercase text-center mb-4 font-montserrat">
        THE SUBSTACK DAY-ONE FRAMEWORK
      </p>
      <h2 className="font-anton text-3xl md:text-4xl text-[#333333] uppercase text-center mb-4">
        What You&apos;ll Build — Live, Together
      </h2>
      <p className="font-lora italic text-gray-500 text-center mb-12">
        Follow along step-by-step. Leave with everything done.
      </p>

      <div className="max-w-3xl mx-auto space-y-4">
        {agendaItems.map((item) => (
          <div
            key={item.number}
            className="flex gap-4 bg-gray-50 p-6 rounded-xl border border-gray-100"
          >
            <div className="w-10 h-10 rounded-full bg-[#ffc300] text-[#1a1a1a] font-anton text-lg flex items-center justify-center flex-shrink-0">
              {item.number}
            </div>
            <div>
              <h3 className="font-montserrat font-bold text-[#333333] text-base mb-1">
                {item.title}
              </h3>
              <p className="font-lato text-gray-600 text-sm">{item.description}</p>
              <span className="inline-block bg-[#ffc300]/10 text-[#333333] text-xs font-bold px-2 py-0.5 rounded mt-2">
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center font-montserrat font-bold text-[#333333] text-sm mt-6">
        Total workshop time: 60 minutes
      </p>
      <p className="text-center font-lora italic text-gray-400 text-sm mt-4 mb-8">
        Still have questions? No worries — scroll to the{' '}
        <button
          onClick={scrollToFaq}
          className="underline hover:text-gray-600 transition-colors cursor-pointer"
        >
          FAQ section
        </button>{' '}
        at the bottom of this page.
      </p>

      <div className="text-center">
        <button
          onClick={scrollToCheckout}
          className="bg-[#ffc300] text-[#1a1a1a] font-montserrat font-bold text-lg px-8 py-4 rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
        >
          SIGN ME UP →
        </button>
      </div>
    </section>
  );
};
