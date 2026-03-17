'use client';

import Image from 'next/image';

const hosts = [
  {
    name: 'Ana Calin',
    image: '/imgs/unstuck-to-published/2.jpeg',
    credentials:
      "47,000+ subscribers on How We Grow. Built multiple digital products generating 6-figures. Knows exactly what works because she's tested it all.",
  },
  {
    name: 'Jessica Best',
    image: '/imgs/unstuck-to-published/3.jpeg',
    credentials:
      '40,000+ subscribers on The Behave Way. Bestselling Substack author. Helps creators stop overthinking and start publishing.',
  },
];

export const BestsellerProofSection = () => {
  const scrollToCheckout = () => {
    document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-[#f72585]/5 py-20 px-6">
      <p className="text-[#f72585] text-xs tracking-widest uppercase text-center mb-4 font-montserrat">
        YOUR HOSTS
      </p>
      <h2 className="font-anton text-3xl md:text-4xl text-[#333333] uppercase text-center mb-12">
        Built By Two Creators Who&apos;ve Done It
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        {hosts.map((host) => (
          <div
            key={host.name}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center"
          >
            <div className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#ffc300] overflow-hidden relative">
              <Image
                src={host.image}
                alt={host.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="inline-block bg-[#ffc300]/10 text-[#333333] text-xs font-bold px-3 py-1 rounded-full mb-3">
              ⭐ Substack Bestseller
            </span>
            <h3 className="font-anton text-xl text-[#333333] uppercase mb-2">{host.name}</h3>
            <p className="font-lato text-gray-600 text-sm leading-relaxed">{host.credentials}</p>
          </div>
        ))}
      </div>

      <p className="text-center font-lora italic text-gray-500 text-lg max-w-2xl mx-auto mb-12">
        &ldquo;We&apos;re not gurus selling theory. We&apos;re working creators who build on Substack every
        single day — and we&apos;ll show you exactly what we&apos;d do if we were starting over
        today.&rdquo;
      </p>

      <div className="text-center">
        <button
          onClick={scrollToCheckout}
          className="bg-[#ffc300] text-[#1a1a1a] font-montserrat font-bold text-lg px-8 py-4 rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
        >
          TEACH ME EVERYTHING →
        </button>
      </div>
    </section>
  );
};
