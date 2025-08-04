import React from 'react';
import Image from 'next/image';

const Testimonials2 = () => {
  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-white text-3xl font-bold mb-2">What Our Students Say</h2>
      </div>
      {/* First row - all testimonials in a single grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Hilde Palladino */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/testimavatar/44.webp"
              alt="Hilde Palladino"
              className="w-16 h-16 rounded-full"
              width={64}
              height={64}
            />
            <div>
              <h3 className="text-white font-semibold text-lg">Hilde Palladino</h3>
              <p className="text-gray-400 text-sm">Substack Bestseller</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            "Ana's framework is pure gold. I re-launched my newsletter 6 weeks ago and already have 2,755 engaged subscribers. The templates saved me months of work."
          </p>
        </div>

        {/* Sue Bolton */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/testimavatar/45.webp"
              alt="Sue Bolton"
              className="w-16 h-16 rounded-full"
              width={64}
              height={64}
            />
            <div>
              <h3 className="text-white font-semibold text-lg">Sue Bolton</h3>
              <p className="text-gray-400 text-sm">Newsletter Creator</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            "The Newsletter Money Map completely transformed my approach. I went from 200 subscribers to 4.5K in just 3 months and made my first $1,500 from my newsletter!"
          </p>
        </div>

        {/* Mary Bartnikowski */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/testimavatar/46.webp"
              alt="Mary Bartnikowski"
              className="w-16 h-16 rounded-full"
              width={64}
              height={64}
            />
            <div>
              <h3 className="text-white font-semibold text-lg">Mary Bartnikowski</h3>
              <p className="text-gray-400 text-sm">Content Creator</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            "Best investment I made this year. The community alone is worth the price. I'm now making $2,500/month from my newsletter thanks to this program."
          </p>
        </div>

        {/* Jeff Herring */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/testimavatar/jeff.webp"
              alt="Jeff Herring"
              className="w-16 h-16 rounded-full"
              width={64}
              height={64}
            />
            <div>
              <h3 className="text-white font-semibold text-lg">Jeff Herring</h3>
              <p className="text-gray-400 text-sm">Host of the How You Profit Show</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            "Ana's strategies are game-changing. I've seen a 300% increase in my newsletter engagement and revenue since implementing her framework."
          </p>
        </div>

        {/* Jill Hart 1 */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/testimavatar/47.webp"
              alt="Jill Hart"
              className="w-16 h-16 rounded-full"
              width={64}
              height={64}
            />
            <div>
              <h3 className="text-white font-semibold text-lg">Jill Hart</h3>
              <p className="text-gray-400 text-sm">Digital Entrepreneur</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            "This program gave me the exact roadmap I needed. I went from struggling to get subscribers to having a profitable newsletter business in just 90 days."
          </p>
        </div>

        {/* Jill Hart 2 */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/testimavatar/47.webp"
              alt="Jill Hart"
              className="w-16 h-16 rounded-full"
              width={64}
              height={64}
            />
            <div>
              <h3 className="text-white font-semibold text-lg">Jill Hart</h3>
              <p className="text-gray-400 text-sm">Digital Entrepreneur</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            "The templates and strategies are worth 10x the investment. I've already made back the cost of the program in my first month of implementation."
          </p>
        </div>

        {/* Sarah Johnson */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/testimavatar/48.webp"
              alt="Sarah Johnson"
              className="w-16 h-16 rounded-full"
              width={64}
              height={64}
            />
            <div>
              <h3 className="text-white font-semibold text-lg">Sarah Johnson</h3>
              <p className="text-gray-400 text-sm">Freelance Writer</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            "Ana's approach is so practical and actionable. I love how she breaks down complex strategies into simple steps that actually work."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials2; 