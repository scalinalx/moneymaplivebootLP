'use client';

export const GuaranteeSection = () => {
  const handleClick = () => {
    const el = document.getElementById('checkout-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#1a1a1a] py-20 px-6">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#ffc300] to-[#f72585]" />

      <div className="max-w-3xl mx-auto text-center">
        {/* Headline */}
        <h2 className="font-anton text-3xl md:text-4xl text-white uppercase mb-6">
          Still On The Fence?
        </h2>

        {/* Three paragraphs */}
        <div className="space-y-4 mb-10">
          <p className="font-lora text-gray-400 text-lg leading-relaxed">
            Here&apos;s the thing: you can keep Googling &ldquo;how to start a Substack&rdquo; and
            piecing together free advice for the next six months. Or you can spend 60 minutes with
            two creators who&apos;ve built 88,000+ subscribers and walk out with everything done.
          </p>
          <p className="font-lora text-gray-400 text-lg leading-relaxed">
            The replay is yours forever. The frameworks are yours to keep. And if you show up and do
            the work, you&apos;ll have a Substack that&apos;s positioned to grow from day one.
          </p>
          <p className="font-lora text-gray-400 text-lg leading-relaxed">
            This isn&apos;t a $2,000 course. It&apos;s not a 6-week program. It&apos;s 60 minutes
            and $97. That&apos;s less than most creators spend on a domain name they never use.
          </p>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-[#ffc300] mx-auto my-8" />

        {/* Policy note */}
        <p className="font-lato text-gray-500 text-sm max-w-xl mx-auto mb-8">
          Due to the live, digital nature of this workshop (with full replay included), all sales are
          final. We stand behind our work — our track record speaks for itself.
        </p>

        {/* Signature */}
        <p className="font-lora italic text-gray-400 text-base mb-10">— Ana &amp; Jessica</p>

        {/* CTA Button */}
        <button
          onClick={handleClick}
          className="bg-[#ffc300] text-[#1a1a1a] font-montserrat font-bold text-lg py-5 px-12 rounded-lg shadow uppercase hover:bg-[#e6b000] transition-colors"
        >
          LET&apos;S DO THIS →
        </button>
      </div>
    </section>
  );
};
