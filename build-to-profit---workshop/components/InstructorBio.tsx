import React from 'react';
import { TrendingUp, Award, ArrowUpRight, Users, BookOpen } from 'lucide-react';

export const InstructorBio: React.FC = () => {
  return (
    <section className="py-32 px-4 bg-brand-950 relative overflow-hidden border-t border-brand-800 z-10">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-10 bg-grid-pattern bg-grid"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Image Side - Editorial Style */}
          <div className="lg:col-span-5 order-1 relative group">
            <div className="relative aspect-[4/5] overflow-hidden border border-brand-800 bg-brand-900">
              {/* Filter overlay */}
              <div className="absolute inset-0 bg-brand-lime/10 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700"></div>

              {/* IMPORTANT: Replace the src below with the URL of the image you uploaded! */}
              <img
                src="/6b1deb04-e24a-4f12-af95-c9941a3c4a34_1500x1500.jpg"
                alt="Ana Calin"
                className="w-full h-full object-cover contrast-125 transition-all duration-700 ease-out group-hover:scale-105"
              />

              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 z-20 bg-brand-lime text-brand-950 p-6 w-48 shadow-[10px_10px_0px_0px_rgba(255,255,255,0.1)]">
                <div className="font-display font-bold text-3xl">TOP 1%</div>
                <p className="font-medium text-sm mt-1">Substack Business Category</p>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border-l-2 border-t-2 border-brand-lime/50 z-0"></div>
          </div>

          {/* Content Side */}
          <div className="lg:col-span-7 order-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[1px] bg-brand-lime"></div>
              <span className="text-brand-lime font-mono text-sm uppercase tracking-widest">Your Host</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-[0.9] tracking-tighter">
              ANA CALIN. <br />
              <span className="text-brand-grey">STRATEGIST. SOLOPRENEUR. MOM.</span>
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-brand-white/80 font-light leading-relaxed max-w-2xl border-l border-brand-800 pl-8">
              <p>
                Founder of <span className="text-white font-medium border-b border-brand-lime">How We Grow Today</span>.
              </p>
              <p>
                I don't teach you how to "write viral threads". That's a commodity. I teach you how to build <strong className="text-white">media assets</strong> that compound in value.
              </p>
              <p>
                The <em>Build to Profit</em> system is the exact framework I used to scale from 0 to <span className="text-brand-lime font-semibold">70k+ subscribers</span> without paid ads, and how I consistently hit <span className="text-brand-lime font-semibold">$25,000+ revenue</span> months while working for only 2 hours/day.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 max-w-lg">
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-brand-lime flex-shrink-0" />
                <div>
                  <p className="text-3xl font-display font-bold text-white">70k+</p>
                  <p className="text-xs text-brand-grey uppercase tracking-wider mt-1">Active Readers</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <BookOpen className="w-8 h-8 text-brand-lime flex-shrink-0" />
                <div>
                  <p className="text-3xl font-display font-bold text-white">380+</p>
                  <p className="text-xs text-brand-grey uppercase tracking-wider mt-1">Successful Students</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <a href="https://howwegrowtoday.substack.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-brand-white hover:text-brand-lime transition-colors border-b border-white/20 hover:border-brand-lime pb-1">
                Read 'How We Grow Today' <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
