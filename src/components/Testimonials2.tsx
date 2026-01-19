import React from 'react';
import Image from 'next/image';
import TESTIMONIALS_DATA from '@/data/testimonials.json';

const Testimonials2 = () => {
  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-white text-3xl font-bold mb-2">What Our Students Say</h2>
      </div>
      {/* First row - all testimonials in a single grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {TESTIMONIALS_DATA.slice(15, 21).map((testimonial, i) => (
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
    </div>
  );
};

export default Testimonials2; 