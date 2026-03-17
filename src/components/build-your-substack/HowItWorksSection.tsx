'use client';

const steps = [
  {
    number: 1,
    title: 'Show Up',
    description:
      'Join the live workshop on Zoom — or watch the full replay at your own pace. No prep needed.',
    circleBg: 'bg-[#ffc300]',
    circleText: 'text-[#1a1a1a]',
  },
  {
    number: 2,
    title: 'Follow Along',
    description:
      'We build your Substack together in real-time. Positioning, first article, paywall strategy — all done.',
    circleBg: 'bg-[#f72585]',
    circleText: 'text-white',
  },
  {
    number: 3,
    title: 'Walk Out Ready',
    description:
      "Leave with a publication that's positioned to grow, a first article ready to publish, and total clarity.",
    circleBg: 'bg-[#27AE60]',
    circleText: 'text-white',
  },
];

export const HowItWorksSection = () => {
  const scrollToCheckout = () => {
    document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-[#f8f7f4] py-20 px-6">
      <div className="text-center">
        <p className="font-montserrat font-bold text-[#f72585] text-xs tracking-[3px] uppercase mb-4">
          THE SUBSTACK DAY-ONE FRAMEWORK
        </p>

        <h2 className="font-anton text-3xl md:text-4xl text-[#333333] uppercase mb-4">
          Here&apos;s How It Works
        </h2>

        <p className="font-lora italic text-gray-500 mb-12">
          Three steps. 60 minutes. Everything you need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 text-center"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-anton text-xl mx-auto mb-4 ${step.circleBg} ${step.circleText}`}
            >
              {step.number}
            </div>
            <h3 className="font-montserrat font-bold text-[#333333] text-lg mb-2">
              {step.title}
            </h3>
            <p className="font-lato text-gray-600 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="font-lora text-gray-600 text-lg italic">
          So simple, right? We did all the heavy lifting to figure this out over 87,000+
          subscribers — all you have to do is follow our framework.
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={scrollToCheckout}
          className="bg-[#ffc300] text-[#1a1a1a] font-montserrat font-bold text-lg py-4 px-10 rounded-lg shadow uppercase tracking-wider hover:bg-[#e6b000] transition-colors"
        >
          LOOKS SIMPLE — COUNT ME IN!
        </button>
      </div>
    </section>
  );
};
