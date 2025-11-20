'use client';

import React, { useState, useEffect } from 'react';
import { Check, Sparkles, Lock, Clock, Calendar, Bell } from 'lucide-react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target Date: December 1, 2025
    const targetDate = new Date('2025-12-01T00:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        // Optional: Handle expiration
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center bg-brand-900 border border-brand-800 p-2 rounded w-14 md:w-16 shadow-inner">
      <span className="text-xl md:text-2xl font-mono font-bold text-white">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-brand-grey mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-2 md:gap-3 my-4 md:my-6">
      <TimeUnit value={timeLeft.days} label="Days" />
      <span className="text-brand-lime font-bold text-xl pb-4">:</span>
      <TimeUnit value={timeLeft.hours} label="Hrs" />
      <span className="text-brand-lime font-bold text-xl pb-4">:</span>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <span className="text-brand-lime font-bold text-xl pb-4">:</span>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

export const ValueStack: React.FC = () => {
  const items = [
    { name: "2 Live Workshop Sessions (Build Your Offer; Launch System)", value: "1,500" },
    { name: "Lifetime HD Recording Access", value: "500" },
    { name: "9 Complete Toolkits (Frameworks, templates, calculators)", value: "997" },
    { name: "Lifetime Private Community (Real creators, launches & support)", value: "500" },
    { name: "Launch Templates Library (Emails, landing pages, scripts)", value: "497" },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-0 lg:gap-8 items-center">
          
          {/* Left: The Value List */}
          <div className="lg:col-span-7 bg-brand-900 border border-brand-800 p-8 md:p-12 rounded-t-3xl lg:rounded-3xl lg:rounded-r-none relative z-10">
             <h3 className="text-3xl font-display font-bold text-white mb-8 flex items-center gap-3">
               <Sparkles className="w-6 h-6 text-brand-lime" />
               TOTAL ACCESS PASS
             </h3>
             
             <div className="space-y-6">
                {items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between group border-b border-brand-800 pb-4 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="w-5 h-5 rounded-full bg-brand-lime/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-brand-lime" />
                      </div>
                      <span className="text-brand-white group-hover:text-white transition-colors">{item.name}</span>
                    </div>
                    <span className="text-brand-grey font-mono text-sm hidden sm:block">${item.value}</span>
                  </div>
                ))}
             </div>

             <div className="mt-10 pt-6 border-t border-brand-800 flex justify-between items-center">
                <span className="text-brand-grey uppercase tracking-widest text-sm">Total Value</span>
                <span className="font-mono text-2xl text-white">$3,994</span>
             </div>
          </div>

          {/* Right: The Offer Card */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-brand-lime blur-[100px] opacity-10 pointer-events-none"></div>
            
            <div className="bg-brand-950 border-2 border-brand-800 p-8 md:p-12 rounded-b-3xl lg:rounded-3xl text-center relative z-20 shadow-2xl">
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-white text-brand-950 px-6 py-2 font-bold font-display uppercase tracking-wider shadow-lg transform -rotate-1 whitespace-nowrap">
                Dec 18-19 Cohort
              </div>

              <div className="mb-6 mt-8">
                <p className="text-brand-grey font-mono text-sm mb-1">Regular Price: <span className="line-through">$1,997</span></p>
                <p className="text-brand-grey font-mono text-sm mb-2">Your Price Today:</p>
                <div className="flex items-center justify-center gap-4">
                   <h4 className="text-7xl md:text-8xl font-display font-bold text-white tracking-tighter">TBD</h4>
                </div>
                <div className="inline-flex items-center gap-2 bg-brand-lime/10 text-brand-lime px-4 py-1 rounded-full text-sm font-bold mt-4 border border-brand-lime/20">
                   <Bell className="w-3 h-3" />
                   WAITLIST PRIORITY ACCESS
                </div>
              </div>

              {/* Benefits Section */}
              <div className="bg-brand-900/50 rounded-xl p-6 mb-8 border border-brand-800 text-left">
                <h5 className="text-white font-bold text-sm uppercase tracking-wide mb-3 text-center">Why Join The Waitlist?</h5>
                <ul className="space-y-3 text-sm text-brand-grey">
                   <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-brand-lime mt-0.5 shrink-0" />
                      <span>Be the first to know when enrollment opens.</span>
                   </li>
                   <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-brand-lime mt-0.5 shrink-0" />
                      <span>Unlock exclusive <span className="text-white font-medium">Launch Discounts</span>.</span>
                   </li>
                   <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-brand-lime mt-0.5 shrink-0" />
                      <span>Secure your spot before public sellout.</span>
                   </li>
                </ul>
              </div>

              {/* Countdown Section */}
              <div className="mb-4">
                <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest mb-2" style={{ color: '#f87171' }}>
                  <Clock className="w-3 h-3 text-[#f87171]" />
                  <span>Waitlist Closing Soon</span>
                </div>
                <CountdownTimer />
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-brand-800 uppercase font-bold tracking-widest mt-6">
                <Lock className="w-3 h-3" />
                Limited to 50 Students
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
