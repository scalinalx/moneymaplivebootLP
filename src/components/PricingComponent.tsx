'use client';

import React, { useState, useEffect } from 'react';
import { Check, Shield, Zap, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ArrowDown } from 'lucide-react';
import TESTIMONIALS_DATA from '@/data/testimonials.json';
import AccordionSection from './AccordionSection';
import ResultsGallery from './ResultsGallery';
import Testimonials2 from './Testimonials2';

const HERO_AVATARS = [
  {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=120&h=120&q=80',
    alt: 'Sarah K.',
  },
  {
    src: 'https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png',
    alt: 'Marcus T.',
  },
  {
    src: 'https://images.unsplash.com/photo-1685903772095-f07172808761?auto=format&fit=facearea&facepad=2&w=120&h=120&q=80',
    alt: 'Priya M.',
  },
  {
    src: 'https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/testimonials%2Fa5e4510d-697e-412b-a33e-d5503f645c92%2Favatar?alt=media&token=3a4e4b81-9080-436e-bfae-25808b43fc0f',
    alt: 'Sue',
  },
  { src: '/testimavatar/jeff.webp', alt: 'Jeff' },
  { src: '/testimavatar/46.webp', alt: 'Mary B.' },
  {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=120&h=120&q=80',
    alt: 'Alexandra L.',
  },
  {
    src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=120&h=120&q=80',
    alt: 'Emma Wilson',
  },
  {
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=120&h=120&q=80',
    alt: 'Tom Wilson',
  },
  {
    src: 'https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?auto=format&fit=facearea&facepad=2&w=120&h=120&q=80',
    alt: 'Rachel Torres',
  },
];

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
        /* Hover shine effect (stronger, visible) */
        .shine { position: relative; overflow: hidden; }
        .shine::before {
          content: '';
          position: absolute;
          inset: -40% -70%;
          background: linear-gradient(115deg,
            rgba(255,255,255,0) 20%,
            rgba(255,255,255,0.55) 45%,
            rgba(255,255,255,0.85) 50%,
            rgba(255,255,255,0.55) 55%,
            rgba(255,255,255,0) 80%);
          filter: blur(2px);
          transform: translateX(-130%) skewX(-18deg);
          transition: transform 650ms ease;
          pointer-events: none;
        }
        .shine:hover::before { transform: translateX(130%) skewX(-18deg); }

        /* Animated gradient border ring */
        .promo-border { position: relative; }
        .promo-border::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          background: conic-gradient(
            from 0deg,
            #facc15,
            #f97316,
            #ef4444,
            #facc15
          );
          z-index: -1;
          filter: blur(6px);
          opacity: 0.35;
          transition: opacity 300ms ease, filter 300ms ease;
        }
        .promo-border:hover::after { opacity: 0.7; filter: blur(8px); }
      `}</style>

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center py-16">
          {/* Profile Pictures Row */}
          <div className="flex justify-center items-center gap-1 mb-4">
            <div className="flex -space-x-3">
              {HERO_AVATARS.map((avatar, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                  <img src={avatar.src} alt={avatar.alt} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span className="text-gray-300 text-sm ml-4">Join 380+ students including 17 substack bestsellers</span>
          </div>

          <h1 className="text-white text-6xl font-bold mb-6 leading-tight max-w-5xl mx-auto">
            Turn Your Newsletter Into a<br />
            <span className="text-yellow-400">6-Figure Business</span> in 90 Days
          </h1>
          <p className="text-gray-300 text-xl mb-12 max-w-4xl mx-auto leading-relaxed">
            The complete system that transformed 380+ hobby newsletters into profitable businesses - without spending a penny on ads
          </p>
          {/* CRO Banner (clickable) */}
          <div className="mb-10 relative group">
            {/* Squiggles like example (hover reveal) */}
            <div
              className="pointer-events-none absolute left-[-84px] top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 md:flex"
              style={{ color: '#FACC15' }}
            >
              {[0, 1, 2].map((i) => (
                <svg
                  key={`l-${i}`}
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-300 ${i === 0 ? '-rotate-12' : i === 2 ? 'rotate-12' : ''}`}
                >
                  <path d="M2 12c3-3 6 3 9 0s6 3 11 0" />
                </svg>
              ))}
            </div>
            <div
              className="pointer-events-none absolute right-[-84px] top-1/2 hidden -translate-y-1/2 flex-col items-start gap-3 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 md:flex"
              style={{ color: '#FACC15' }}
            >
              {[0, 1, 2].map((i) => (
                <svg
                  key={`r-${i}`}
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-300 ${i === 0 ? 'rotate-12' : i === 2 ? '-rotate-12' : ''}`}
                >
                  <path d="M2 12c3-3 6 3 9 0s6 3 11 0" />
                </svg>
              ))}
            </div>
            <button
              type="button"
              aria-label="Get Instant Access - scroll to form"
              onClick={() => {
                document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="shine promo-border relative w-full overflow-hidden rounded-2xl border border-yellow-300/60 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400/40 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 opacity-90" />
              {/* Deadline pill */}
              <div className="absolute top-1.5 right-1.5 md:top-2 md:right-3 flex items-center gap-2 bg-black/20 backdrop-blur px-2.5 py-1 rounded-full border border-white/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-black font-semibold text-[11px] md:text-xs">Instant Access</span>
              </div>

              {/* Content (reduced height ~20%) */}
              <div className="relative px-6 py-4 md:px-9 md:py-6 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-black drop-shadow" />
                <div className="text-center">
                  <div className="text-black font-extrabold text-xl md:text-2xl leading-tight">
                    Get the Complete System
                  </div>
                  <div className="text-black/90 font-semibold text-sm md:text-base">
                    Watch anytime, anywhere. Lifetime access included.
                  </div>
                </div>
                <Zap className="hidden md:block w-6 h-6 text-black drop-shadow" />
              </div>
            </button>
          </div>

          {/* Video Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <div className="aspect-video bg-black rounded-lg overflow-hidden border border-gray-700">
                <div className="w-full h-full relative">
                  <video
                    id="hero-video"
                    className="w-full h-full object-cover"
                    src="/videos/vsl_3.mp4"
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
                        <path d="M8 5v14l11-7z" />
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
                        <path d="M8 5v14l11-7z" />
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
                I'M READY TO SCALE
              </button>
            </div>
          </div>

          {/* Social Proof Section */}
          <div className="mt-16 mb-8">
            <div className="mb-12 overflow-hidden">
              <div className="flex animate-scroll">
                <div className="flex items-center gap-6 md:gap-12 min-w-full px-4">
                  <div className="text-white font-bold text-lg md:text-2xl opacity-70 px-2">Substack</div>
                  <div className="text-white font-bold text-lg md:text-2xl italic opacity-70 px-2">Forbes</div>
                  <div className="text-white font-bold text-base md:text-xl opacity-70 px-2">LinkedIn</div>
                  <div className="text-white font-bold text-base md:text-xl opacity-70 px-2">GITEX</div>
                  <div className="text-white font-bold text-sm md:text-lg opacity-70 px-2">beehiiv</div>
                  <div className="text-white font-bold text-sm md:text-lg opacity-70 px-2">SEMRUSH</div>
                  <div className="bg-gray-600 text-white px-3 py-1 rounded-full text-xs md:text-sm opacity-70">Top Voice</div>
                  <div className="text-white font-bold text-sm md:text-lg opacity-70 px-2">LinkedIn News</div>
                </div>
                <div className="flex items-center gap-6 md:gap-12 min-w-full px-4">
                  <div className="text-white font-bold text-lg md:text-2xl opacity-70 px-2">Substack</div>
                  <div className="text-white font-bold text-lg md:text-2xl italic opacity-70 px-2">Forbes</div>
                  <div className="text-white font-bold text-base md:text-xl opacity-70 px-2">LinkedIn</div>
                  <div className="text-white font-bold text-base md:text-xl opacity-70 px-2">GITEX</div>
                  <div className="text-white font-bold text-sm md:text-lg opacity-70 px-2">beehiiv</div>
                  <div className="text-white font-bold text-sm md:text-lg opacity-70 px-2">SEMRUSH</div>
                  <div className="bg-gray-600 text-white px-3 py-1 rounded-full text-xs md:text-sm opacity-70">Top Voice</div>
                  <div className="text-white font-bold text-sm md:text-lg opacity-70 px-2">LinkedIn News</div>
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
                <div className="text-white text-6xl font-bold mb-2">380+</div>
                <div className="text-gray-300 text-lg">Successful students</div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <div className="border border-orange-500 rounded-full px-6 py-2">
                <span className="text-white text-sm">380+ Success stories & counting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl font-bold mb-2">What Our Students Say</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto mb-8">
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/25 hover:border-white/40 transition-colors duration-200 w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium">
                  SJ
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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

            <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/25 hover:border-white/40 transition-colors duration-200 w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium">
                  MR
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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

            <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/25 hover:border-white/40 transition-colors duration-200 w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium">
                  KL
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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

        {/* Full-width Last Chance banner (replaces countdown and yellow bg) */}
        <div className="mb-12 -mx-8 relative group">
          {/* Squiggles like example (hover reveal) */}
          <div
            className="pointer-events-none absolute left-[-84px] top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 md:flex"
            style={{ color: '#FACC15' }}
          >
            {[0, 1, 2].map((i) => (
              <svg
                key={`l2-${i}`}
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${i === 0 ? '-rotate-12' : i === 2 ? 'rotate-12' : ''}`}
              >
                <path d="M2 12c3-3 6 3 9 0s6 3 11 0" />
              </svg>
            ))}
          </div>
          <div
            className="pointer-events-none absolute right-[-84px] top-1/2 hidden -translate-y-1/2 flex-col items-start gap-3 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 md:flex"
            style={{ color: '#FACC15' }}
          >
            {[0, 1, 2].map((i) => (
              <svg
                key={`r2-${i}`}
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${i === 0 ? 'rotate-12' : i === 2 ? '-rotate-12' : ''}`}
              >
                <path d="M2 12c3-3 6 3 9 0s6 3 11 0" />
              </svg>
            ))}
          </div>
          <button
            type="button"
            aria-label="Get Instant Access - scroll to form"
            onClick={() => {
              document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="shine promo-border relative w-full overflow-hidden rounded-none md:rounded-2xl border-y md:border border-yellow-300/60 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-500/30 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 opacity-90" />
            {/* Deadline pill */}
            <div className="absolute top-1.5 right-1.5 md:top-2 md:right-3 flex items-center gap-2 bg-black/20 backdrop-blur px-2.5 py-1 rounded-full border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-black font-semibold text-[11px] md:text-xs">Instant Access</span>
            </div>
            <div className="relative px-6 py-5 md:px-10 md:py-6 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-black drop-shadow" />
              <div className="text-center">
                <div className="text-black font-extrabold text-xl md:text-2xl leading-tight">
                  Get the Complete System
                </div>
                <div className="text-black/90 font-semibold text-sm md:text-base">
                  Watch anytime, anywhere. Lifetime access included.
                </div>
              </div>
              <Zap className="hidden md:block w-6 h-6 text-black drop-shadow" />
            </div>
          </button>
        </div>

        {/* Creator Stories Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {TESTIMONIALS_DATA.slice(0, 4).map((testimonial, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className={`h-48 bg-gradient-to-br ${i % 4 === 0 ? 'from-orange-300 to-orange-400' :
                  i % 4 === 1 ? 'from-blue-300 to-blue-400' :
                    i % 4 === 2 ? 'from-purple-300 to-purple-400' :
                      'from-emerald-300 to-emerald-400'
                  } flex items-center justify-center`}>
                  {testimonial.AvatarURL ? (
                    <img
                      src={testimonial.AvatarURL}
                      alt={testimonial.Name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black font-bold text-lg shadow-lg">
                      {testimonial.Name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-gray-500 text-xs font-medium mb-2 tracking-wide uppercase">{testimonial.additionalinfo}</div>
                  <h3 className="text-black text-xl font-bold mb-3">{testimonial.Name}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    "{testimonial.Text}"
                  </p>
                </div>
              </div>
            ))}
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
