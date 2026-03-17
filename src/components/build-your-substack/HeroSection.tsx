'use client';

import { ArrowRight, Calendar, Clock, Monitor, RotateCcw } from 'lucide-react';
import Image from 'next/image';

export const HeroSection = () => {
  const handleScrollToCheckout = () => {
    const section = document.getElementById('checkout-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#1a1a1a] overflow-hidden pt-3 pb-12">
      {/* Decorative subtle circles */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full border border-white/5" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] rounded-full border border-white/5" />
      <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] rounded-full border border-white/5" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
        {/* 1. Urgency pill */}
        <div className="animate-pulse mb-8">
          <span className="bg-[#f72585] text-white font-montserrat font-bold text-xs uppercase tracking-wider py-2 px-5 rounded-full">
            Only 100 Seats Available
          </span>
        </div>

        {/* 2. Small text above headline */}
        <p className="font-lora text-gray-400 tracking-widest uppercase text-sm mb-3">
          How To
        </p>

        {/* 3. Main headline */}
        <h1 className="font-anton uppercase leading-tight mb-4">
          <span className="text-white text-5xl md:text-7xl block">
            Build Your Substack
          </span>
          <span className="text-[#ffc300] text-5xl md:text-7xl block">
            The Right Way From Day One
          </span>
        </h1>

        {/* 4. Subhead */}
        <p className="font-lora italic text-gray-400 text-lg md:text-xl max-w-2xl mb-10">
          even if you&apos;re starting from zero, have no audience, and no idea what to write about
        </p>

        {/* 5. Hero image */}
        <div className="w-full max-w-[1100px] mb-10">
          <Image
            src="/imgs/unstuck-to-published/hero1.webp"
            alt="Build Your Substack Workshop"
            width={1100}
            height={620}
            className="w-full rounded-2xl shadow-2xl"
            priority
          />
        </div>

        {/* 6. Sub-copy */}
        <p className="font-montserrat font-bold text-white/90 text-lg md:text-xl max-w-3xl mb-8 leading-relaxed">
          Walk in with an idea. Walk out with a positioned publication, a structured first article, and a paywall strategy that converts — in 60 minutes flat.
        </p>

        {/* 7. Workshop details row */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <div className="flex items-center gap-1.5 bg-white/5 rounded-full py-2 px-4">
            <Calendar className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-lato">Saturday, March 21</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 rounded-full py-2 px-4">
            <Clock className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-lato">10:00 AM EST · 60 min</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 rounded-full py-2 px-4">
            <Monitor className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-lato">Live on Zoom</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 rounded-full py-2 px-4">
            <RotateCcw className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-lato">Replay Included</span>
          </div>
        </div>

        {/* 8. CTA button */}
        <button
          onClick={handleScrollToCheckout}
          className="bg-[#ffc300] text-[#1a1a1a] font-montserrat font-bold text-lg py-5 px-12 rounded-lg shadow uppercase tracking-wider hover:-translate-y-1 transition-transform duration-200 flex items-center gap-2 mb-4"
        >
          SAVE MY SEAT →
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* 9. Small text below CTA */}
        <p className="text-gray-500 text-xs mb-12">
          100% satisfaction guarantee · Secure checkout via Stripe
        </p>

        {/* 10. Credibility bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full">
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur rounded-xl border border-white/10 p-4">
            <Image
              src="/imgs/unstuck-to-published/1.jpeg"
              alt="Subscribers Converted"
              width={54}
              height={54}
              className="w-[54px] h-[54px] rounded-full object-cover"
            />
            <div className="text-left">
              <p className="font-anton text-2xl text-[#ffc300]">10,000+</p>
              <p className="text-gray-400 text-xs">Subscribers Converted</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 backdrop-blur rounded-xl border border-white/10 p-4">
            <Image
              src="/imgs/unstuck-to-published/2.jpeg"
              alt="Combined Subscribers"
              width={54}
              height={54}
              className="w-[54px] h-[54px] rounded-full object-cover"
            />
            <div className="text-left">
              <p className="font-anton text-2xl text-[#ffc300]">87,000+</p>
              <p className="text-gray-400 text-xs">Combined Subscribers</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 backdrop-blur rounded-xl border border-white/10 p-4">
            <Image
              src="/imgs/unstuck-to-published/3.jpeg"
              alt="On Substack"
              width={54}
              height={54}
              className="w-[54px] h-[54px] rounded-full object-cover"
            />
            <div className="text-left">
              <p className="font-anton text-2xl text-[#ffc300]">#1 Bestseller</p>
              <p className="text-gray-400 text-xs">On Substack</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
