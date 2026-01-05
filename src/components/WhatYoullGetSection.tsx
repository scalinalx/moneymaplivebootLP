import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const WhatYoullGetSection = () => {
  const [visibleItems, setVisibleItems] = useState(new Set<number>());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLDivElement;
          const index = itemRefs.current.indexOf(element);

          if (index !== -1) {
            setVisibleItems(prev => {
              const newSet = new Set(prev);
              if (entry.isIntersecting) {
                newSet.add(index);
              }
              // Keep the item visible once it's been seen (don't remove it)
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.6,
        rootMargin: '0px 0px -20% 0px'
      }
    );

    // Observe all current refs
    itemRefs.current.forEach(ref => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const features = [
    {
      number: "01",
      title: "Monthly Implementation Group calls with Me",
      description: "As an academy member you'll get access to monthly group coaching calls directly with me where we will host live Q&As to help you overcome the unique challenges you're facing with your newsletter.",
      image: "group-calls"
    },
    {
      number: "02",
      title: "The 6 module roadmap to build and monetize your newsletter",
      description: "Our course content has been designed to take you from a nobody to a serious newsletter creator. These are the same methods that have grown my newsletter, along with 380+ others over the last few months.",
      image: "roadmap"
    },
    {
      number: "03",
      title: "Access to our Private Community",
      description: "Connect with 380+ newsletter creators who are all working towards the same goal. Share wins, get feedback, and collaborate with like-minded creators in our exclusive community.",
      image: "community"
    },
    {
      number: "04",
      title: "50+ Templates & Revenue Frameworks",
      description: "Get instant access to proven email templates, monetization frameworks, and revenue tracking tools that have generated millions in newsletter revenue.",
      image: "templates"
    }
  ];

  return (
    <div className="relative">
      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-lg opacity-30" style={{ backgroundColor: '#ffc300' }}></div>
              <span className="relative text-black text-base font-semibold px-6 py-2 rounded-full border" style={{ backgroundColor: '#ffc300', borderColor: '#ffc300' }}>
                What you'll learn
              </span>
            </div>
          </div>

          <h2 className="text-white text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Here's exactly what you'll get when you <span className="text-yellow-400">join</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="space-y-16">
          {features.map((feature, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Content Side */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div
                      ref={el => { itemRefs.current[index] = el; }}
                      className={`w-16 h-16 rounded-full bg-yellow-400/20 flex items-center justify-center border-2 border-yellow-400 transition-all duration-700 ease-in-out ${visibleItems.has(index)
                          ? 'scale-110'
                          : 'scale-100'
                        }`}
                      style={visibleItems.has(index) ? {
                        boxShadow: '0 0 30px rgba(255, 195, 0, 0.9), 0 0 60px rgba(255, 195, 0, 0.5), 0 0 90px rgba(255, 195, 0, 0.3)'
                      } : {}}
                    >
                      <span className="text-yellow-400 text-xl font-bold">
                        {feature.number}
                      </span>
                    </div>
                    {index < features.length - 1 && (
                      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-yellow-400 to-transparent"></div>
                    )}
                  </div>
                  <div className="w-16 h-0.5 bg-yellow-400"></div>
                </div>

                <h3 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                  {feature.title}
                </h3>

                <p className="text-gray-300 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Visual Side */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/25 shadow-2xl">
                  {/* Mock Visual Content */}
                  <div className="aspect-video rounded-xl overflow-hidden relative bg-gradient-to-br from-gray-800 to-gray-900">
                    {feature.image === 'group-calls' && (
                      <div className="w-full h-full flex items-center justify-center relative">
                        <div className="grid grid-cols-2 gap-4 w-full h-full p-4">
                          {/* Ana Calin */}
                          <div className="rounded-lg overflow-hidden border-2 border-yellow-400">
                            <Image
                              src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6b1deb04-e24a-4f12-af95-c9941a3c4a34_1500x1500.png"
                              alt="Ana Calin"
                              className="w-full h-full object-cover"
                              width={240}
                              height={240}
                            />
                          </div>
                          {/* Member 1 - Male participant */}
                          <div className="rounded-lg overflow-hidden border-2 border-blue-400">
                            <Image
                              src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
                              alt="Member 1"
                              className="w-full h-full object-cover"
                              width={240}
                              height={240}
                            />
                          </div>
                          {/* Member 2 - Female participant */}
                          <div className="rounded-lg overflow-hidden border-2 border-green-400">
                            <Image
                              src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
                              alt="Member 2"
                              className="w-full h-full object-cover"
                              width={240}
                              height={240}
                            />
                          </div>
                          {/* Member 3 - Diverse participant */}
                          <div className="rounded-lg overflow-hidden border-2 border-purple-400">
                            <Image
                              src="https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&h=300&fit=crop&crop=face&auto=format&q=80"
                              alt="Member 3"
                              className="w-full h-full object-cover"
                              width={240}
                              height={240}
                            />
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 bg-black/80 rounded p-2">
                          <div className="text-white text-sm">Monthly Implementation Call - Live Q&A</div>
                        </div>
                      </div>
                    )}

                    {feature.image === 'roadmap' && (
                      <div className="w-full h-full flex flex-col justify-center p-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 bg-white/10 rounded-lg p-3">
                            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                              <span className="text-black font-bold text-sm">1</span>
                            </div>
                            <div className="text-white text-sm">Module 1: Newsletter Foundations</div>
                            <div className="ml-auto text-green-400 text-xs">✓</div>
                          </div>
                          <div className="flex items-center gap-4 bg-white/10 rounded-lg p-3">
                            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                              <span className="text-black font-bold text-sm">2</span>
                            </div>
                            <div className="text-white text-sm">Module 2: Conversion Machine</div>
                            <div className="ml-auto text-green-400 text-xs">✓</div>
                          </div>
                          <div className="flex items-center gap-4 bg-white/10 rounded-lg p-3">
                            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                              <span className="text-black font-bold text-sm">3</span>
                            </div>
                            <div className="text-white text-sm">Module 3: Paywall Strategy</div>
                            <div className="ml-auto text-green-400 text-xs">✓</div>
                          </div>
                          <div className="flex items-center gap-4 bg-white/10 rounded-lg p-3">
                            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                              <span className="text-black font-bold text-sm">4</span>
                            </div>
                            <div className="text-white text-sm">Module 4: Multiple Income Streams</div>
                            <div className="ml-auto text-green-400 text-xs">✓</div>
                          </div>
                          <div className="flex items-center gap-4 bg-white/10 rounded-lg p-3">
                            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                              <span className="text-black font-bold text-sm">5</span>
                            </div>
                            <div className="text-white text-sm">Module 5: Systems & Scaling</div>
                            <div className="ml-auto text-green-400 text-xs">✓</div>
                          </div>
                          <div className="flex items-center gap-4 bg-white/10 rounded-lg p-3">
                            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                              <span className="text-black font-bold text-sm">6</span>
                            </div>
                            <div className="text-white text-sm">Module 6: Advanced Strategies</div>
                            <div className="ml-auto text-blue-400 text-xs">⏵</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {feature.image === 'community' && (
                      <div className="w-full h-full flex flex-col justify-center p-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                            <div className="text-white text-sm">Just hit $5K MRR! 🎉</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                            <div className="text-white text-sm">Launched my first paid newsletter</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-400 rounded-full"></div>
                            <div className="text-white text-sm">380+ subscribers this week!</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-400 rounded-full"></div>
                            <div className="text-white text-sm">Need feedback on my landing page</div>
                          </div>
                        </div>
                        <div className="mt-4 text-yellow-400 text-xs text-center">380+ Active Members</div>
                      </div>
                    )}

                    {feature.image === 'templates' && (
                      <div className="w-full h-full flex flex-col justify-center p-6">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white/10 rounded-lg p-3 text-center">
                            <div className="text-yellow-400 text-lg font-bold">12</div>
                            <div className="text-white text-xs">Email Templates</div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3 text-center">
                            <div className="text-yellow-400 text-lg font-bold">8</div>
                            <div className="text-white text-xs">Revenue Frameworks</div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3 text-center">
                            <div className="text-yellow-400 text-lg font-bold">15</div>
                            <div className="text-white text-xs">Launch Sequences</div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3 text-center">
                            <div className="text-yellow-400 text-lg font-bold">20+</div>
                            <div className="text-white text-xs">Growth Tools</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <button
            onClick={() => {
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-black font-bold py-4 px-12 rounded-lg text-xl transition-all duration-200 transform hover:scale-105 hover:opacity-90" style={{ backgroundColor: '#ffc300' }}
          >
            GET ACCESS TO EVERYTHING TODAY
          </button>
          <p className="text-gray-400 text-sm mt-4">
            Join 380+ newsletter creators already building their revenue machines
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatYoullGetSection; 
