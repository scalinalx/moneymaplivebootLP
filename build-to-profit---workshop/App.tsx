import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Zap, 
  Play,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Star,
  Quote
} from 'lucide-react';
import { WaitlistForm } from './components/WaitlistForm';
import { SalesBot } from './components/SalesBot';
import { FAQ } from './components/FAQ';
import { IsThisForYou } from './components/IsThisForYou';
import { InstructorBio } from './components/InstructorBio';
import { ValueStack } from './components/ValueStack';
import { ScheduleItem, Testimonial, FAQItem } from './types';

const SCHEDULE_DAY_1: ScheduleItem[] = [
  { time: "10:00 AM - 11:00 AM", title: "The Asset Architecture", description: "We stop 'creating content' and start creating assets. In this power hour, you will build your high-ticket offer and install the 3 automated referral systems." },
];

const SCHEDULE_DAY_2: ScheduleItem[] = [
  { time: "10:00 AM - 11:00 AM", title: "The Content & Conversion Engine", description: "We install the 'Infinite Content' matrix to write newsletters in record time, and write the 5-email sequence that turns subscribers into buyers." },
];

const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Sarah Jenkins", role: "Founder", company: "TechDaily", content: "I was treating my newsletter like a blog. Ana showed me how to treat it like a media company. I launched my first product during the workshop and made $2.4k.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" },
  { id: 2, name: "Marcus Chen", role: "Growth Lead", company: "SaaS Inc", content: "The 'Offer Engine' session alone was worth the investment. We simplified our pricing and saw a 40% increase in conversions the next week.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces" },
  { id: 3, name: "Elena Rodriguez", role: "Creator", company: "Design Weekly", content: "Simple. Actionable. Profitable. I've taken $5k courses that had less implementation value than these 2 days. Ana is a beast at strategy.", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces" },
];

const FAQ_ITEMS: FAQItem[] = [
  { question: "Is this live or pre-recorded?", answer: "This is 100% LIVE. We build together. Ana is on the call, reviewing your work, and answering questions in real-time." },
  { question: "I have a small list (under 1k). Is this for me?", answer: "Yes. In fact, it's better to implement these systems NOW before you scale. You will grow faster and monetize sooner than if you wait." },
  { question: "What if I can't make the dates?", answer: "You get lifetime access to the HD recordings, the template library, and the community. You can implement at your own pace." },
  { question: "How much does it cost?", answer: "Public enrollment will open at $1,997. However, waitlist members will receive a significant exclusive discount when we open doors." },
  { question: "Do you offer refunds?", answer: "Yes. We offer a 'Day 1 Satisfaction Guarantee'. If you attend Day 1 and don't feel it's worth 10x the price, we refund you 100%." }
];

const VSLPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full h-full min-h-[300px] bg-brand-900 overflow-hidden group cursor-pointer border border-brand-800 hover:border-brand-lime transition-colors duration-500 shadow-2xl" onClick={() => setIsPlaying(!isPlaying)}>
      {!isPlaying ? (
        <>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80')] bg-cover bg-center opacity-50 grayscale mix-blend-overlay transition-transform duration-700 group-hover:scale-105"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/60 to-transparent"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
            <div className="relative">
               <div className="absolute inset-0 bg-brand-lime blur-xl opacity-20 animate-pulse"></div>
               <div className="w-20 h-20 bg-brand-lime rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                 <Play className="w-8 h-8 text-brand-950 ml-1 fill-brand-950" />
               </div>
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-2 uppercase tracking-wider">Watch The Trailer</h3>
            <p className="text-brand-grey text-xs font-mono">ANA CALIN • 03:42</p>
          </div>
        </>
      ) : (
        <div className="w-full h-full bg-black flex items-center justify-center">
           <p className="text-brand-grey font-mono animate-pulse">LOADING VIDEO STREAM...</p>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-brand-950 relative font-sans selection:bg-brand-lime selection:text-brand-950">
      {/* Global Background Elements */}
      <div className="fixed inset-0 bg-grid-pattern bg-grid opacity-[0.15] pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,210,0,0.05),transparent_70%)] pointer-events-none"></div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-950/90 backdrop-blur border-b border-brand-800' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center h-16">
          <div className="text-2xl font-display font-bold tracking-tighter text-white">
            BUILD<span className="text-brand-lime">2</span>PROFIT
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#program" className="text-sm font-medium text-brand-grey hover:text-white transition-colors uppercase tracking-widest">Program</a>
            <a href="#instructor" className="text-sm font-medium text-brand-grey hover:text-white transition-colors uppercase tracking-widest">Ana Calin</a>
            <div className="h-4 w-[1px] bg-brand-800"></div>
            <span className="text-brand-lime font-mono text-xs uppercase border border-brand-lime/20 bg-brand-lime/5 px-2 py-1 rounded">Next Cohort: Dec 18-19</span>
          </div>
        </div>
      </nav>

      {/* Hero Section - Asymmetrical Editorial Layout */}
      <section className="pt-32 pb-16 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Text Block */}
          <div className="lg:col-span-8 flex flex-col justify-center relative z-10">
            <div className="inline-flex items-center gap-2 mb-8">
               <span className="w-2 h-2 bg-brand-lime rounded-full animate-pulse"></span>
               <span className="text-brand-lime font-mono text-sm uppercase tracking-widest">Live Implementation Workshop</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-display font-bold text-white leading-[0.85] tracking-tighter mb-8">
              STOP WRITING CONTENT. <br />
              START BUILDING <span className="text-brand-lime">ASSETS.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-brand-grey max-w-2xl font-light leading-relaxed mb-10">
              Stop writing for "engagement". Start building a profit engine. 
              Join <span className="text-white font-medium">Ana Calin</span> for 2 days of deep implementation to monetize your audience.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
               <div className="w-full sm:w-auto">
                  <WaitlistForm />
               </div>
               <div className="flex items-center gap-4 text-sm text-brand-grey">
                  <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-brand-800 border-2 border-brand-950 overflow-hidden">
                           <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover grayscale" />
                        </div>
                     ))}
                  </div>
                  <span>4,000+ on waitlist</span>
               </div>
            </div>
          </div>

          {/* Visual/VSL Block - Bento Style */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <VSLPlayer />
            
            <div className="bg-brand-900 border border-brand-800 p-6 relative overflow-hidden group hover:border-brand-lime/50 transition-colors">
               <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-6 h-6 text-brand-lime -rotate-45" />
               </div>
               <div className="text-4xl font-display font-bold text-white mb-1">$10k<span className="text-brand-lime">+</span></div>
               <p className="text-brand-grey text-sm">Target Monthly Recurring Revenue for graduates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Ticker */}
      <div className="w-full border-y border-brand-800 bg-brand-900/30 py-6 overflow-hidden relative z-10">
        <div className="flex animate-marquee gap-20 whitespace-nowrap opacity-60">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-xl font-display font-bold text-brand-white">HOW WE GROW TODAY</span>
              <span className="text-xl font-display font-bold text-brand-white">SUBSTACK TOP WRITER</span>
              <span className="text-xl font-display font-bold text-brand-white">INDIE HACKERS</span>
              <span className="text-xl font-display font-bold text-brand-white">PRODUCT HUNT #1</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Agitation Section */}
      <section className="py-32 px-4 bg-brand-950 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-[0.95]">
                   MOST CREATORS ARE <br/>
                   <span className="text-brand-lime underline decoration-wavy decoration-1 underline-offset-8">BROKE.</span>
                </h2>
                <p className="text-brand-grey text-lg leading-relaxed mb-6">
                   They have "audiences" but no business. They write endless threads, hope for viral hits, and pray a sponsor throws them $500.
                </p>
                <p className="text-white text-xl font-medium border-l-4 border-brand-lime pl-6 py-2">
                   That is not a business. That is a job you can't quit.
                </p>
             </div>
             
             <div className="grid gap-4">
                <div className="bg-brand-900 p-6 border border-brand-800">
                   <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div> The Trap
                   </h3>
                   <p className="text-brand-grey text-sm">Optimizing for Likes and Open Rates instead of Stripe Notifications.</p>
                </div>
                <div className="bg-brand-900 p-6 border border-brand-800">
                   <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div> The Burnout
                   </h3>
                   <p className="text-brand-grey text-sm">Publishing 5x a week just to feed the algorithm, with no asset to show for it.</p>
                </div>
                <div className="bg-brand-900 p-6 border border-brand-800">
                   <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div> The Fix
                   </h3>
                   <p className="text-brand-lime text-sm font-bold">Building an automated product &amp; offer ecosystem. (We do this in 2 days).</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <IsThisForYou />

      {/* Curriculum - "The Program" */}
      <section id="program" className="py-32 bg-brand-900 relative border-t border-brand-800 z-10">
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-lime to-transparent opacity-30"></div>
         
         <div className="max-w-7xl mx-auto px-4">
            <div className="mb-20 text-center">
               <span className="text-brand-lime font-mono text-sm uppercase tracking-widest mb-4 block">The System</span>
               <h2 className="text-5xl md:text-7xl font-display font-bold text-white">
                 BUILD TO PROFIT
               </h2>
               <p className="text-brand-grey mt-4 text-lg">Two days. One hour per day. Zero fluff.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
               {/* Day 1 Card */}
               <div className="group relative bg-brand-950 border border-brand-800 p-8 hover:border-brand-lime transition-colors duration-500">
                  <div className="absolute -top-4 left-8 bg-brand-lime text-brand-950 px-4 py-1 font-bold font-display text-xl shadow-lg transform -rotate-2 group-hover:rotate-0 transition-transform">
                     DAY 01
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mt-4 mb-2">FOUNDATION & OFFER</h3>
                  <p className="text-brand-grey mb-10">We design the product that your audience actually wants to buy.</p>
                  
                  <div className="space-y-8">
                     {SCHEDULE_DAY_1.map((item, i) => (
                        <div key={i} className="flex gap-4">
                           <div className="font-mono text-brand-lime pt-1 whitespace-nowrap">{item.time}</div>
                           <div>
                              <h4 className="text-lg font-bold text-white">{item.title}</h4>
                              <p className="text-brand-grey text-sm leading-relaxed mt-1">{item.description}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Day 2 Card */}
               <div className="group relative bg-brand-950 border border-brand-800 p-8 hover:border-brand-white transition-colors duration-500">
                  <div className="absolute -top-4 left-8 bg-brand-white text-brand-950 px-4 py-1 font-bold font-display text-xl shadow-lg transform rotate-2 group-hover:rotate-0 transition-transform">
                     DAY 02
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mt-4 mb-2">SYSTEMS & AUTOMATION</h3>
                  <p className="text-brand-grey mb-10">We build the content engine so you never stare at a blank page again.</p>
                  
                  <div className="space-y-8">
                     {SCHEDULE_DAY_2.map((item, i) => (
                        <div key={i} className="flex gap-4">
                           <div className="font-mono text-brand-white pt-1 whitespace-nowrap">{item.time}</div>
                           <div>
                              <h4 className="text-lg font-bold text-white">{item.title}</h4>
                              <p className="text-brand-grey text-sm leading-relaxed mt-1">{item.description}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      <div id="instructor">
        <InstructorBio />
      </div>

      {/* Testimonials - Masonry/Grid */}
      <section className="py-32 px-4 bg-brand-950 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white max-w-xl">
               DON'T TAKE MY WORD FOR IT. <br/>
               <span className="text-brand-lime">RESULTS ONLY.</span>
            </h2>
            <div className="flex items-center gap-2">
               <div className="flex text-brand-lime">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
               </div>
               <span className="text-white font-mono text-sm">5.0/5 RATING</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-brand-900 p-8 border border-brand-800 relative group hover:-translate-y-1 transition-transform duration-300">
                <Quote className="absolute top-6 right-6 text-brand-800 w-8 h-8 group-hover:text-brand-lime/20 transition-colors" />
                <p className="text-brand-white/90 mb-8 text-lg leading-relaxed font-light relative z-10">"{t.content}"</p>
                <div className="flex items-center gap-4 border-t border-brand-800 pt-6">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full grayscale group-hover:grayscale-0 transition-all" />
                  <div>
                    <div className="font-bold text-white font-display text-sm uppercase tracking-wide">{t.name}</div>
                    <div className="text-xs text-brand-grey">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Stack & CTA */}
      <ValueStack />

      {/* Final CTA */}
      <section className="py-20 px-4 flex justify-center bg-brand-900 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="max-w-lg w-full text-center relative z-10">
           <h3 className="text-4xl font-display font-bold text-white mb-4">Join The Waitlist</h3>
           <p className="text-brand-grey mb-8">
             The December cohort is capped at 50 students.
             Be the first to know when doors open and unlock exclusive discounts.
           </p>
           <WaitlistForm variant="footer" />
           <div className="flex items-center justify-center gap-6 mt-8 opacity-50 grayscale">
              <ShieldCheck className="w-6 h-6 text-brand-grey" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6 invert" />
           </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-4 bg-brand-950 border-t border-brand-800 z-10 relative">
        <div className="max-w-3xl mx-auto">
           <h2 className="text-3xl font-display font-bold mb-12 text-center text-white">QUESTIONS?</h2>
           <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-950 border-t border-brand-800 py-12 px-4 z-10 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="text-2xl font-display font-bold text-white tracking-tight mb-2">
              BUILD<span className="text-brand-lime">2</span>PROFIT
            </div>
            <p className="text-brand-800 text-xs">&copy; 2025 Ana Calin Media. All rights reserved.</p>
          </div>
          
          <div className="flex gap-8 text-sm text-brand-grey font-mono uppercase tracking-wider">
             <a href="#" className="hover:text-brand-lime transition-colors">Terms</a>
             <a href="#" className="hover:text-brand-lime transition-colors">Privacy</a>
             <a href="#" className="hover:text-brand-lime transition-colors">Twitter</a>
          </div>
        </div>
      </footer>

      <SalesBot />
    </div>
  );
}
