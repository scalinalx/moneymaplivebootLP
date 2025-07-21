'use client';

import React, { useState, useEffect } from 'react';
import { Check, Shield, Zap, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ArrowDown } from 'lucide-react';
import AccordionSection from './AccordionSection';
import ResultsGallery from './ResultsGallery';
import Testimonials2 from './Testimonials2';

const PricingComponent = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 48,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Video progress tracking
  useEffect(() => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    const timeDisplay = document.getElementById('video-time') as HTMLElement;
    const progressBar = document.getElementById('video-progress') as HTMLElement;
    const overlay = document.getElementById('play-overlay') as HTMLElement;
    const progressContainer = document.getElementById('progress-container') as HTMLElement;

    if (!video) return;

    const updateProgress = () => {
      if (video.duration && !isNaN(video.duration)) {
        const currentTime = video.currentTime;
        const duration = video.duration;
        const progress = (currentTime / duration) * 100;
        
        // Update progress bar
        if (progressBar) {
          progressBar.style.width = `${progress}%`;
        }
        
        // Update time display
        if (timeDisplay) {
          const currentMinutes = Math.floor(currentTime / 60);
          const currentSeconds = Math.floor(currentTime % 60);
          const totalMinutes = Math.floor(duration / 60);
          const totalSeconds = Math.floor(duration % 60);
          
          timeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
        }
      }
    };

    const handleVideoEnd = () => {
      if (overlay) {
        overlay.style.display = 'flex';
      }
      if (progressContainer) {
        progressContainer.style.display = 'block';
      }
    };

    const handlePlay = () => {
      if (overlay) {
        overlay.style.display = 'none';
      }
      if (progressContainer) {
        progressContainer.style.display = 'none';
      }
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateProgress);
    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', updateProgress);
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
      
      <div className="max-w-6xl mx-auto px-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center py-16">
          {/* Profile Pictures Row */}
          <div className="flex justify-center items-center gap-1 mb-4">
            <div className="flex -space-x-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 border-2 border-white flex items-center justify-center text-white text-xs font-semibold">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="text-gray-300 text-sm ml-4">Join 250+ Students including 12 Substack Bestsellers</span>
          </div>
          
          <h1 className="text-white text-6xl font-bold mb-6 leading-tight max-w-5xl mx-auto">
            Turn Your Newsletter Into a<br/>
            <span className="text-yellow-400">6-Figure Business</span> in 90 Days
          </h1>
          <p className="text-gray-300 text-xl mb-12 max-w-4xl mx-auto leading-relaxed">
            The complete system that transformed 250+ hobby newsletters into profitable businesses - without spending a penny on ads
          </p>
          
          {/* Video Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <div className="aspect-video bg-black rounded-lg overflow-hidden border border-gray-700">
                <div className="w-full h-full relative">
                  <video
                    id="hero-video"
                    className="w-full h-full object-cover"
                    src="/videos/0721.mp4"
                    preload="metadata"
                    playsInline
                    controls
                  />
                  
                  {/* Play Button Overlay - Only show before first play */}
                  <div 
                    id="play-overlay"
                    className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                    onClick={() => {
                      const video = document.getElementById('hero-video') as HTMLVideoElement;
                      const overlay = document.getElementById('play-overlay') as HTMLElement;
                      const progressContainer = document.getElementById('progress-container') as HTMLElement;
                      if (video && overlay) {
                        video.play();
                        overlay.style.display = 'none';
                        if (progressContainer) {
                          progressContainer.style.display = 'none';
                        }
                      }
                    }}
                  >
                    <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors duration-200 group">
                      <svg className="w-8 h-8 text-black ml-1 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Custom Progress Bar - Only show before first play */}
                  <div 
                    id="progress-container"
                    className="absolute bottom-4 left-4 right-4"
                  >
                    <div className="bg-black/80 rounded p-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      <div className="text-white text-sm" id="video-time">0:00 / 0:00</div>
                      <div className="flex-1 bg-gray-600 h-1 rounded">
                        <div className="bg-white h-1 rounded w-0 transition-all duration-300" id="video-progress"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button
                onClick={() => {
                  document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black bg-yellow-400 border border-transparent rounded-md hover:bg-yellow-500 transition-colors duration-200"
              >
                JOIN SUBSTACK MONEY MAP TODAY!
              </button>
            </div>
          </div>
          
          {/* Social Proof Section */}
          <div className="mt-16 mb-8">
            <div className="mb-12 overflow-hidden">
              <div className="flex animate-scroll">
                <div className="flex items-center gap-12 min-w-full">
                  <div className="text-white font-bold text-2xl opacity-70">Substack</div>
                  <div className="text-white font-bold text-2xl italic opacity-70">Forbes</div>
                  <div className="text-white font-bold text-xl opacity-70">LinkedIn</div>
                  <div className="text-white font-bold text-xl opacity-70">GITEX</div>
                  <div className="text-white font-bold text-lg opacity-70">beehiiv</div>
                  <div className="text-white font-bold text-lg opacity-70">SEMRUSH</div>
                  <div className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm opacity-70">Top Voice</div>
                  <div className="text-white font-bold text-lg opacity-70">LinkedIn News</div>
                </div>
                <div className="flex items-center gap-12 min-w-full">
                  <div className="text-white font-bold text-2xl opacity-70">Substack</div>
                  <div className="text-white font-bold text-2xl italic opacity-70">Forbes</div>
                  <div className="text-white font-bold text-xl opacity-70">LinkedIn</div>
                  <div className="text-white font-bold text-xl opacity-70">GITEX</div>
                  <div className="text-white font-bold text-lg opacity-70">beehiiv</div>
                  <div className="text-white font-bold text-lg opacity-70">SEMRUSH</div>
                  <div className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm opacity-70">Top Voice</div>
                  <div className="text-white font-bold text-lg opacity-70">LinkedIn News</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center border-r border-gray-600 last:border-r-0">
                <div className="text-white text-6xl font-bold mb-2">#1</div>
                <div className="text-gray-300 text-lg">Substack Money Map program</div>
              </div>
              
              <div className="text-center border-r border-gray-600 last:border-r-0">
                <div className="text-white text-6xl font-bold mb-2">100K+</div>
                <div className="text-gray-300 text-lg">Followers on SM</div>
              </div>
              
              <div className="text-center">
                <div className="text-white text-6xl font-bold mb-2">250+</div>
                <div className="text-gray-300 text-lg">Successful students</div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <div className="border border-orange-500 rounded-full px-6 py-2">
                <span className="text-white text-sm">250+ Success stories & counting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl font-bold mb-2">What Our Students Say</h2>
          </div>
          <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/25 hover:border-white/40 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium">
                  SJ
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                "The Newsletter Money Map completely transformed my approach. I went from 200 subscribers to 4.5K in just 3 months and made my first $1,500 from my newsletter!"
              </p>
              <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                Gustavo
              </a>
            </div>

            <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/25 hover:border-white/40 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium">
                  MR
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                "Ana's framework is pure gold. I re-launched my newsletter 6 weeks ago and already have 2,755 engaged subscribers. The templates saved me months of work."
              </p>
              <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                Maria
              </a>
            </div>

            <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/25 hover:border-white/40 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium">
                  KL
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                "Best investment I made this year. The community alone is worth the price. I'm now making $2,500/month from my newsletter thanks to this program."
              </p>
              <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                Kyle
              </a>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="text-center mb-12">
          <div className="bg-yellow-400 rounded-xl p-4 max-w-3xl mx-auto">
            <h3 className="text-black text-xl font-bold mb-1">⚡ LIMITED TIME OFFER</h3>
            <p className="text-black/80 text-sm mb-3">Early Bird Pricing Ends Soon!</p>
            
            <div className="flex justify-center gap-3">
              <div className="bg-black rounded-lg p-2 min-w-[70px]">
                <div className="text-white text-3xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-gray-300 text-sm">HOURS</div>
              </div>
              <div className="bg-black rounded-lg p-2 min-w-[70px]">
                <div className="text-white text-3xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-gray-300 text-sm">MINS</div>
              </div>
              <div className="bg-black rounded-lg p-2 min-w-[70px]">
                <div className="text-white text-3xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-gray-300 text-sm">SECS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Creator Stories Section */}
        <div className="mb-16">
          <div className="grid grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-orange-300 to-orange-400 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black font-bold text-lg">
                  GK
                </div>
              </div>
              <div className="p-6">
                <div className="text-gray-500 text-xs font-medium mb-2 tracking-wide">CREATOR RESULTS</div>
                <h3 className="text-black text-xl font-bold mb-3">Gustavo Karakey ▶</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                Can I just say that you have over delivered. Wow! It's nice to have a clear map. Still work to do, but much more satisfying, and less wheel spinning. 🙂
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black font-bold text-lg">
                  JM
                </div>
              </div>
              <div className="p-6">
                <div className="text-gray-500 text-xs font-medium mb-2 tracking-wide">CREATOR RESULTS</div>
                <h3 className="text-black text-xl font-bold mb-3">Jeanette Martin ▶</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                What a brilliant, actionable, organised, inspiring bootcamp. Thank you, Ana.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-purple-300 to-purple-400 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black font-bold text-lg">
                  SA
                </div>
              </div>
              <div className="p-6">
                <div className="text-gray-500 text-xs font-medium mb-2 tracking-wide">CREATOR RESULTS</div>
                <h3 className="text-black text-xl font-bold mb-3">Shahidah Al-Amin ▶</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                I love the way you get straight to the point about growth and how to communicate value to your audience so they WANT to pay you. It is a priority of mine to grow my audience and get paid for my offers & I'm really confident that your roadmap will help me achieve that.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black font-bold text-lg">
                  AL
                </div>
              </div>
              <div className="p-6">
                <div className="text-gray-500 text-xs font-medium mb-2 tracking-wide">CREATOR RESULTS</div>
                <h3 className="text-black text-xl font-bold mb-3">Adora Lee ▶</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                I finally see the possibility of monetizing here! I'm so excited to apply aal that I've learned during the bootcamp!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transition Section */}
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl font-bold mb-4">Real Creators, Proven Results</h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-12">
            Get personal guidance from me PLUS all the tools and strategies you need to achieve breakthrough growth like these success stories
          </p>
          
          {/* Results Gallery */}
          <ResultsGallery />
        </div>

        {/* What We Cover Section */}
        <div className="pb-16">
          <AccordionSection />
        </div>
        
        <Testimonials2 />
      </div>
    </div>
  );
};

export default PricingComponent; 