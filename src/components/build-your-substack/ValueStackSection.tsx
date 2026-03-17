'use client';

const valueItems = [
  { name: 'Live 60-Minute Workshop', price: '$197' },
  { name: 'Full Replay — Watch Anytime', price: '$97' },
  { name: 'Positioning Angle Framework', price: '$47' },
  { name: 'First Article Template', price: '$47' },
  { name: 'Paywall Strategy Blueprint', price: '$47' },
  { name: 'Publishing Confidence Checklist', price: '$27' },
  { name: "The 'Ship It' Accountability Framework", price: '$27' },
  { name: 'Live Q&A Access', price: '$97' },
];

export const ValueStackSection = () => {
  const scrollToCheckout = () => {
    document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-[#1a1a1a] py-20 px-6">
      <p className="text-[#ffc300] text-xs tracking-widest uppercase text-center mb-4 font-montserrat">
        EVERYTHING YOU GET
      </p>
      <h2 className="font-anton text-3xl md:text-4xl text-white uppercase text-center mb-12">
        Here&apos;s What&apos;s Inside
      </h2>

      <div className="max-w-2xl mx-auto space-y-3 mb-12">
        {valueItems.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center py-3 border-b border-white/10"
          >
            <span className="font-lato text-gray-300 text-sm">{item.name}</span>
            <span className="font-montserrat font-bold text-white text-sm">{item.price}</span>
          </div>
        ))}

        <div className="flex justify-between items-center py-4 border-t-2 border-[#ffc300]">
          <span className="font-montserrat font-bold text-white">Total Value</span>
          <span className="font-anton text-2xl text-white line-through">$586</span>
        </div>
      </div>

      <div className="text-center mt-8 mb-8">
        <p className="font-lora italic text-gray-400 text-lg mb-2">Your Price Today:</p>
        <p className="font-anton text-7xl md:text-8xl text-[#ffc300]">$97</p>
        <span className="inline-block bg-[#27AE60] text-white text-sm font-bold px-4 py-1 rounded-full mt-3">
          Save 83%
        </span>
      </div>

      <div className="text-center">
        <button
          onClick={scrollToCheckout}
          className="bg-[#ffc300] text-[#1a1a1a] font-montserrat font-bold text-xl px-10 py-5 rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
        >
          GET INSTANT ACCESS — $97 →
        </button>
        <p className="text-gray-500 text-xs text-center mt-4 font-lato">
          Replay included for all attendees. Secure checkout via Stripe.
        </p>
      </div>
    </section>
  );
};
