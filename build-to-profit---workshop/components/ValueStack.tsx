import React from 'react';
import { Check, Sparkles, Lock, Bell } from 'lucide-react';

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
               HERE'S EVERYTHING YOU GET
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
                <p className="text-white font-mono text-lg font-bold mb-2 bg-brand-lime/20 inline-block px-3 py-1 rounded">→ Your Price Today:</p>
                <div className="flex items-center justify-center gap-4">
                   <h4 className="text-7xl md:text-8xl font-display font-bold text-brand-lime tracking-tighter">$747</h4>
                </div>
                <div className="inline-flex items-center gap-2 bg-brand-lime/10 text-brand-lime px-4 py-1 rounded-full text-sm font-bold mt-4 border border-brand-lime/20">
                   <Bell className="w-3 h-3" />
                   LIMITED TIME OFFER
                </div>
              </div>

              {/* Benefits Section */}
              <div className="bg-brand-900/50 rounded-xl p-6 mb-8 border border-brand-800 text-left">
                <h5 className="text-white font-bold text-sm uppercase tracking-wide mb-3 text-center">Why Join Build2Profit?</h5>
                <ul className="space-y-3 text-sm text-brand-grey">
                   <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-brand-lime mt-0.5 shrink-0" />
                      <span>Walk away with a <span className="text-white font-medium">launch-ready offer</span> in 2 days.</span>
                   </li>
                   <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-brand-lime mt-0.5 shrink-0" />
                      <span>Get <span className="text-white font-medium">live coaching</span> from Ana on your specific offer.</span>
                   </li>
                   <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-brand-lime mt-0.5 shrink-0" />
                      <span>Join 350+ creators already <span className="text-white font-medium">monetizing their newsletters</span>.</span>
                   </li>
                </ul>
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
