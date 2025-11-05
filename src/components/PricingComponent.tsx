'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Check, Shield, Zap, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ArrowDown } from 'lucide-react';
import ResultsGallery from './ResultsGallery';
// import Testimonials2 from './Testimonials2';
import Animated10KGrowth from './Animated10KGrowth';
import InlineHeroTestimonials from './InlineHeroTestimonials';
import UrgencyBar from './UrgencyBar';
import ProblemAgitateSection from './ProblemAgitateSection';
import ThreeTestimonials from './ThreeTestimonials';
import FeaturedBySection from './FeaturedBySection';
import ValueStackPage from './ValueStackPage';
import RiskReversalPage from './RiskReversalPage';
import ObjectionsPage from './ObjectionsPage';
import WhoThisIsForPage from './WhoThisIsForPage';
import ComparisonPage from './ComparisonPage';
import TestimonialsFull from './TestimonialsFull';
import BonusStackPage from './BonusStackPage';
import FinalPricingPage from './FinalPricingPage';
import FAQPage from './FAQPage';
import FinalUrgencyPage from './FinalUrgencyPage';
import FinalCTAPage from './FinalCTAPage';
import PSPage from './PSPage';
import Testimonial4 from './testimonial4';

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

  // (Video section removed) – using randomized hero image instead

  // Fixed hero image (single source)
  const heroImg = '/imgs/heroimgs/btp8.webp';

  // Avatars for social proof row (Unsplash portraits)
  const heroAvatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&h=96&q=80',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=96&h=96&q=80',
    'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=96&h=96&q=80',
    'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=96&h=96&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=96&h=96&q=80',
    'https://images.unsplash.com/photo-1546525848-3ce03ca516f6?auto=format&fit=crop&w=96&h=96&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=96&h=96&q=80',
    'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=96&h=96&q=80',
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=96&h=96&q=80',
    'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&w=96&h=96&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=96&h=96&q=80',
  ];

  // UrgencyBar now handles its own computations and defaults

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
      
      <div className="w-full max-w-none mx-auto px-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center py-16">
          {/* Profile Pictures Row (avatars restored) */}
          <div className="flex justify-center items-center gap-1 mb-4">
            <div className="flex -space-x-2">
              {heroAvatars.map((src, i) => (
                <div key={i} className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white shrink-0">
                  <Image
                    src={src}
                    alt={`Member ${i + 1}`}
                    fill
                    sizes="40px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <span className="text-gray-300 text-sm ml-4">Join 350+ Students including 25 Substack Bestsellers</span>
          </div>
          
          {/* Added top title + subtitle */}
          <div className="mb-4">
            <h1 className="text-white text-5xl sm:text-6xl font-extrabold leading-tight w-full max-w-5xl mx-auto">
              Turn Your Newsletter Into a <span style={{ color: '#ffc300' }}>$120K+/Year</span> Revenue Machine
            </h1>
            <p className="text-gray-300 text-xl max-w-4xl mx-auto mt-2">
              The exact system 300+ creators used to build 6-figure newsletter businesses
            </p>
          </div>

          {/* Removed duplicate main headline per request; now shown near "Two Paths" section */}
          {/* CRO banner removed per new launch copy */}
          
          {/* Video Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <div className="aspect-video bg-black rounded-lg overflow-hidden border border-gray-700 relative">
                
                  <Image src={heroImg} alt="Build To Profit hero" fill priority className="object-cover" />
                  
                  
              </div>
              <div className="text-center mt-4">
                <div className="text-yellow-400 font-extrabold">
                  Build Your Irresistible Offer + Understand Your Audience Painpoints + Live Implementation + 24/7 Community Support
                </div>
              </div>
            </div>
            
            {/* Styled testimonials before primary CTA */}
            <InlineHeroTestimonials />

            <div className="text-center mt-8">
              <button
                onClick={() => {
                  document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black bg-yellow-400 border border-transparent rounded-md hover:bg-yellow-500 transition-colors duration-200"
              >
                JOIN BUILD TO PROFIT TODAY!
              </button>
            </div>

            {/* Urgency Bar */}
            <div className="mt-6">
              <UrgencyBar sticky={false} ctaLabel="Join now" ctaHref="#pricing" />
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
                <div className="text-gray-300 text-lg">Newsletter Monetization program</div>
              </div>
              
              <div className="text-center border-r border-gray-600 last:border-r-0">
                <div className="text-white text-6xl font-bold mb-2">100K+</div>
                <div className="text-gray-300 text-lg">Followers on SM</div>
              </div>
              
              <div className="text-center">
                <div className="text-white text-6xl font-bold mb-2">350+</div>
                <div className="text-gray-300 text-lg">Successful students</div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <div className="border border-orange-500 rounded-full px-6 py-2">
                <span className="text-white text-sm">350+ Success stories & counting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <ThreeTestimonials />

        {/* Problem-Agitate Section */}
        <ProblemAgitateSection />

        {/* Last-chance banner removed per new launch copy */}

        {/* Creator Stories Section */}
        <div className="pt-5 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-orange-300 to-orange-400 flex items-center justify-center">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/testimonials%2F71750850-e9e2-45cd-8e06-5daa71b7f61d%2Favatar?alt=media&token=6e39ea1b-96a6-410e-8d40-a69e2e022a38"
                  alt="Marni avatar"
                  className="w-24 h-24 rounded-full object-cover border-2 border-white"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="text-gray-500 text-xs font-medium tracking-wide">CREATOR RESULTS</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-yellow-500" aria-label="5 out of 5 stars">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  </div>
                  <div className="text-xs text-gray-500">Aug 30, 2025</div>
                </div>
                <h3 className="text-black text-xl font-bold mt-2 mb-3">Marni ▶</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  I have two people in my 90 day program and it generated 4k (so far) and I'm so happy about that!
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/testimonials%2F6fd11c11-ac36-43d9-9d22-7d7fdf9e398a%2Favatar?alt=media&token=8442c231-2be2-46c9-93c1-733ea4ad27d3"
                  alt="Carrie Loranger avatar"
                  className="w-24 h-24 rounded-full object-cover border-2 border-white"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="text-gray-500 text-xs font-medium tracking-wide">CREATOR RESULTS</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-yellow-500" aria-label="5 out of 5 stars">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  </div>
                  <div className="text-xs text-gray-500">Jun 29, 2025</div>
                </div>
                <h3 className="text-black text-xl font-bold mt-2 mb-3">Carrie Loranger ▶</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  The feedback is already incredible on my just-launched $100k Offer Stack Builder: "This nailed exactly what I needed to focus on" "Finally, a clear path forward" "Spot-on recommendations"
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-purple-300 to-purple-400 flex items-center justify-center">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/testimonials%2F417f5f06-d7a0-44b8-818e-e535c3ec2c55%2Fattached?alt=media&token=daf7c28f-d537-4943-a21d-585db796f083&_w=1000&_h=667"
                  alt="Nate Solon avatar"
                  className="w-24 h-24 rounded-full object-cover border-2 border-white"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="text-gray-500 text-xs font-medium tracking-wide">CREATOR RESULTS</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-yellow-500" aria-label="5 out of 5 stars">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  </div>
                  <div className="text-xs text-gray-500">Oct 21, 2025</div>
                </div>
                <h3 className="text-black text-xl font-bold mt-2 mb-3">Nate Solon ▶</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Hi Ana, just wanted to say thank you for your webinar. I used your system to name my highest performing post, which is currently responsible for quite a lot of my overall profit. Of course now I’ll use the same system to more posts. I want to send a screenshot of the stats but looks like I can’t in messages anyway it’s this post. It’s converted $3500 in paid subs.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/testimonials%2Fc9cdb423-d612-48be-9745-2665ff95993f%2Favatar?alt=media&token=8cb6ceb6-b40e-4698-8a51-3ab418023d38"
                  alt="Jeanette Martin avatar"
                  className="w-24 h-24 rounded-full object-cover border-2 border-white"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="text-gray-500 text-xs font-medium tracking-wide">CREATOR RESULTS</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-yellow-500" aria-label="5 out of 5 stars">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  </div>
                  <div className="text-xs text-gray-500">Sept 21, 2025</div>
                </div>
                <h3 className="text-black text-xl font-bold mt-2 mb-3">Jeanette Martin ▶</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  What a brilliant, actionable, organised, inspiring bootcamp. Thank you, Ana.
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
          <FeaturedBySection />
          <ValueStackPage />
          <RiskReversalPage />
          <ObjectionsPage />
          <WhoThisIsForPage />
          <ComparisonPage />
          <TestimonialsFull />
          <BonusStackPage />
          <FinalPricingPage />
          <FAQPage />
          {/* Move Even More Success Stories here */}
          <Testimonial4 />
          <FinalUrgencyPage />
          <FinalCTAPage />
          <PSPage />
          <Animated10KGrowth />
        </div>

        {/* What We Cover Section */}
        <div className="pb-16">
        </div>
        
        {/** Removed duplicate "What Our Students Say" section above the yellow pill */}
      </div>
    </div>
  );
};

export default PricingComponent; 
