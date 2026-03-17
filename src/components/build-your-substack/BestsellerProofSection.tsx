'use client';

const hosts = [
  {
    name: 'Ana Calin',
    image: 'https://substackcdn.com/image/fetch/w_224,h_224,c_fill,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F571a8b69-320b-4df6-ba84-dd1394fb5af1_864x864.png',
    credentials:
      "47,000+ subscribers on How We Grow. Built multiple digital products generating 6-figures. Knows exactly what works because she's tested it all.",
  },
  {
    name: 'Jessica Best',
    image: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F73cbd9d5-897c-4efd-8e01-ad688304de32_1170x1170.jpeg',
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
            <div className="w-36 h-36 rounded-full mx-auto mb-4 border-4 border-[#ffc300] overflow-hidden">
              <img
                src={host.image}
                alt={host.name}
                className="w-full h-full object-cover"
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
