import React from 'react';
import { User, MessageCircle, Clock, Megaphone, Type, TrendingDown } from 'lucide-react';
import Image from 'next/image';

const ColdHardTruthSection = () => {
  const outdatedTactics = [
    {
      icon: User,
      text: "Writing only when you feel inspired"
    },
    {
      icon: MessageCircle,
      text: "Covering random topics with no focus"
    },
    {
      icon: Clock,
      text: "Never asking for paid subscriptions"
    },
    {
      icon: Megaphone,
      text: "Only creating free content forever"
    },
    {
      icon: Type,
      text: "Ignoring email lists completely"
    },
    {
      icon: TrendingDown,
      text: "Copying others without understanding why"
    }
  ];

  return (
    <div className="relative">
      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-lg opacity-30 bg-yellow-500"></div>
              <span className="relative text-white text-sm font-semibold px-5 py-2 rounded-full border border-yellow-500 bg-yellow-500/20">
                Cold Hard Truth:
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            99% of Substack growth & monetization advice is <span className="text-yellow-400">cringe & out-dated.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-gray-300 text-sm md:text-base mb-12 leading-relaxed max-w-3xl mx-auto">
            When done right, Substack is GREAT. It's where your dream future clients are talking. Where meaningful connection happen. But you'll never build an awesome newsletter business if you're still...
          </p>

          {/* 3x2 Grid of Outdated Tactics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {outdatedTactics.map((tactic, index) => {
              const IconComponent = tactic.icon;
              return (
                <div 
                  key={index} 
                  className="bg-black/0 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 hover:border-yellow-400/40 transition-all duration-300 group"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <IconComponent className="w-12 h-12 text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300" />
                    <h3 className="text-white text-lg font-semibold group-hover:text-gray-200 transition-colors duration-300">
                      {tactic.text}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Success Stories Badge */}
          <div className="inline-block mt-8 mb-1">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-lg opacity-30 bg-yellow-500"></div>
              <span className="relative text-white text-sm font-semibold px-5 py-2 rounded-full border border-yellow-500 bg-yellow-500/20">
                Success stories
              </span>
            </div>
          </div>

         
        </div>
      </div>
      
      {/* Close the main container and create full-width testimonials section */}
      <div className="relative">
        <div className="relative z-10 pt-0 pb-20">
          {/* Full-width testimonials container - truly full width */}
          
          <div className="w-full px-8">
             {/* Headline */}
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-8 text-center">
            More real people just like you with real results
          </h2>
            <div className="grid grid-cols-4 gap-6 max-w-none mx-auto">
              
              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/25 hover:border-white/40 transition-colors duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Jake Martinez"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-white font-semibold text-sm">Jake Martinez</h3>
                    <p className="text-gray-400 text-xs">Finance Weekly</p>
                  </div>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed mb-3">
                  "I was stuck at 200 subscribers for months. After implementing these strategies, I hit 5,000 subscribers and $2,800/month in just 90 days!"
                </p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>

              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/25 hover:border-white/40 transition-colors duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Lisa Chen"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-white font-semibold text-sm">Lisa Chen</h3>
                    <p className="text-gray-400 text-xs">Health & Wellness Hub</p>
                  </div>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed mb-3">
                  "The monetization frameworks are pure gold. I launched my premium tier and made $6,500 in the first month. This program pays for itself!"
                </p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>

              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/25 hover:border-white/40 transition-colors duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1374"
                    alt="Tom Wilson"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-white font-semibold text-sm">Tom Wilson</h3>
                    <p className="text-gray-400 text-xs">Creator Chronicles</p>
                  </div>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed mb-3">
                  "From zero to 15K subscribers in 8 months. The growth strategies actually work. My newsletter is now my main income source at $8,200/month."
                </p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>

              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/25 hover:border-white/40 transition-colors duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Rachel Torres"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-white font-semibold text-sm">Rachel Torres</h3>
                    <p className="text-gray-400 text-xs">Business Breakthroughs</p>
                  </div>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed mb-3">
                  "Incredible results! I went from struggling to get 50 opens to 12,000 engaged subscribers and $5,400 monthly revenue. Life-changing program!"
                </p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColdHardTruthSection; 
