'use client';
import React from 'react';
import Image from 'next/image';
import TESTIMONIALS_DATA from '@/data/testimonials.json';

const Testimonial4 = () => {
  return (
    <div className="relative">
      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-lg opacity-30" style={{ backgroundColor: '#ffc300' }}></div>
              <span className="relative text-black text-base font-semibold px-6 py-2 rounded-full border" style={{ backgroundColor: '#ffc300', borderColor: '#ffc300' }}>
                Even More Success Stories
              </span>
            </div>
          </div>

          <h2 className="text-white text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Just take a look at what our <span className="text-yellow-400">380+</span> members are saying.
          </h2>
        </div>

        {/* Text Grid (Replaces Video Gallery) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {TESTIMONIALS_DATA.slice(21, 31).map((testimonial, i) => (
            <div key={i} className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 hover:border-white/40 transition-colors duration-200">
              <div className="flex items-center gap-4 mb-6">
                {testimonial.AvatarURL ? (
                  <img
                    src={testimonial.AvatarURL}
                    alt={testimonial.Name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.Name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                )}
                <div>
                  <h3 className="text-white font-semibold text-lg">{testimonial.Name}</h3>
                  <div className="text-gray-400 text-[10px] uppercase font-medium tracking-wider mb-1">{testimonial.additionalinfo} • {testimonial.Date}</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                "{testimonial.Text}"
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 border border-white/25">
            <div className="text-4xl font-bold text-yellow-400 mb-2">380+</div>
            <div className="text-gray-300">Active Members</div>
          </div>
          <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 border border-white/25">
            <div className="text-4xl font-bold text-yellow-400 mb-2">$500k+</div>
            <div className="text-gray-300">Revenue Generated</div>
          </div>
          <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 border border-white/25">
            <div className="text-4xl font-bold text-yellow-400 mb-2">93%</div>
            <div className="text-gray-300">Success Rate</div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => {
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-black font-bold py-4 px-12 rounded-lg text-xl transition-all duration-200 transform hover:scale-105 hover:opacity-90" style={{ backgroundColor: '#ffc300' }}
          >
            I WANT $5K/MONTH
          </button>
          <p className="text-gray-400 text-sm mt-4">
            Start building your newsletter revenue machine today
          </p>
        </div>

        {/* Revenue Hero Section */}
        <div className="mt-8 text-center max-w-5xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
            Turn Your Newsletter Into a <span className="text-yellow-400">$120K+/Year</span> Revenue Machine
          </h1>

          {/* Subheadline */}
          <p className="text-gray-300 text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
            The exact system 380+ creators used to build 6-figure newsletter businesses
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial4; 