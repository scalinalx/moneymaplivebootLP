import React from 'react';
import Image from 'next/image';

const Testimonials2 = () => {
  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-white text-3xl font-bold mb-2">What Our Community Says</h2>
        <p className="text-gray-400">Join hundreds of successful newsletter creators</p>
      </div>
      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Hilde Palladino - keep as is but update avatar */}
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
              <h3 className="text-white font-semibold">Hilde Palladino</h3>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            "Thank you so much, this was sooo worth my time and money."
          </p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>

        {/* Sue Bolton - update avatar */}
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
              <h3 className="text-white font-semibold">Sue Bolton</h3>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            "Everything was fabulous but I was particularly thrilled about the content strategy and how that was all interrelated with the paywall strategy, plus the promotional calendars, etc. I have to go back and review all of it. Thank you."
          </p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <br/>
      </div>

      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
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
              <h3 className="text-white font-semibold">Mary Bartnikowski</h3>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            "Finally have a clear path going forward, thank you Ana."
          </p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>

        {/* Jeff Herring */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/testimavatar/32.webp"
              alt="Jeff Herring"
              className="w-16 h-16 rounded-full"
              width={64}
              height={64}
            />
            <div>
              <h3 className="text-white font-semibold">Jeff Herring</h3>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            "I'm still grinning about how thorough and action oriented this Boot Camp was. I've set aside the entire holiday weekend to get it done and complete."
          </p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <br/>
      </div>
      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
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
              <h3 className="text-white font-semibold">Jill Hart</h3>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            "I've implemented Ana's money map and make $1500 over the last month with a less than 400 subscriber base!"
          </p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>
        {/* Jill Hart 2 */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/testimavatar/48.webp"
              alt="Jill Hart"
              className="w-16 h-16 rounded-full"
              width={64}
              height={64}
            />
            <div>
              <h3 className="text-white font-semibold">Jill Hart</h3>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            "I'm following in your footsteps Ana I hosted a workshop and am doing an intensive for my subscribers - I've gained 9 paid subscribers in the last week. It will be 4 weeks 2 hours of live work along each week to get people up and running on Substack. My subscribers are mainly people I interview on my podcast that I'm introducing to Substack - because I love it over there."
          </p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <br/>
      </div>
      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Juliana Shoumbert */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/testimavatar/49.webp"
              alt="Juliana Shoumbert"
              className="w-16 h-16 rounded-full"
              width={64}
              height={64}
            />
            <div>
              <h3 className="text-white font-semibold">Juliana Shoumbert</h3>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            "Yay! Got my first paid subscriber 😍😍 and she left a really nice message."
          </p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>
        {/* Neera Mahajan */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 hover:border-white/40 transition-colors duration-200">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/testimavatar/50.webp"
              alt="Neera Mahajan"
              className="w-16 h-16 rounded-full"
              width={64}
              height={64}
            />
            <div>
              <h3 className="text-white font-semibold">Neera Mahajan</h3>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            "I’ve been writing on Substack for four and a half years, never really worrying about growth. But this year, I made it my focus.Two weeks ago, one of my Notes—where I shared a personal story—went viral. That brought in a surge of new subscribers. Around the same time, I launched my 90-Day Write-Grow-Monetize System program. It immediately took off—within two weeks, I had 17 new paid subscribers, taking my total to 30."
          </p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials2; 