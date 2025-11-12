"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Shield, Check, Rocket, Target, Clock, Sparkles } from "lucide-react";
import Script from "next/script";
import type { Lead, ApiResponse, StripeCheckoutSession } from "@/types";
import { LeadForm } from "@/components/forms/LeadForm";
import UrgencyLanding from "@/components/urgency-landing";
import ResultsGallery from "@/components/ResultsGallery";
import Growth4Landing from "@/components/Growth4Landing";

export default function SimpleLandingPage() {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [llReady, setLlReady] = useState(false);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // Visuals
  const heroImg = "/imgs/heroimgs/he2.webp";
  const heroAvatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&h=96&q=80",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=96&h=96&q=80",
    "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=96&h=96&q=80",
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=96&h=96&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=96&h=96&q=80",
  ];

  const handleLeadSuccess = async (leadData: Lead) => {
    setError(null);
    setIsProcessingPayment(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: leadData.id, variant: "standard" }),
      });
      const result: ApiResponse<StripeCheckoutSession> = await response.json();
      if (result.success && result.data?.url) {
        window.location.href = result.data.url;
      } else {
        setError(result.error || "Could not start checkout. Please try again.");
        setIsProcessingPayment(false);
      }
    } catch (e) {
      setError("Network error. Please try again.");
      setIsProcessingPayment(false);
    }
  };

  const handleLeadError = (msg: string) => setError(msg);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const LeaderLine: any = (window as any).LeaderLine;
    let line: any = null;

    const mountLine = () => {
      if (!LeaderLine) return;
      // Only draw on >= sm screens (two columns)
      if (window.innerWidth < 640) {
        if (line) { line.remove(); line = null; }
        return;
      }
      if (leftColRef.current && rightColRef.current) {
        // Clean up previous
        if (line) { line.remove(); line = null; }
        line = new LeaderLine(leftColRef.current, rightColRef.current, {
          color: '#facc15',
          size: 3,
          path: 'fluid',
          startPlug: 'behind',
          endPlug: 'arrow3',
          dash: { animation: true },
          dropShadow: true,
        });
      }
    };

    if (llReady) {
      mountLine();
      const onResize = () => { if (line) line.position(); mountLine(); };
      const onScroll = () => { if (line) line.position(); };
      window.addEventListener('resize', onResize);
      window.addEventListener('scroll', onScroll, true);
      return () => {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('scroll', onScroll, true);
        if (line) { line.remove(); line = null; }
      };
    }
  }, [llReady]);

  function TestimonialCard({ avatar, name, title, date, quote }: { avatar: string; name: string; title?: string | null; date?: string | null; quote: string }) {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-sm hover:shadow-md transition">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-yellow-400" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, s) => (
              <svg key={s} className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/></svg>
            ))}
          </div>
          {date ? <span className="text-xs text-slate-400">{date}</span> : <span />}
        </div>
        <p className="mt-3 text-slate-100 text-[15px] leading-relaxed italic">{quote}</p>
        <div className="mt-4 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} alt={name} className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10" />
          <div>
            <div className="text-white font-semibold">{name}</div>
            {title ? <div className="text-slate-400 text-xs">{title}</div> : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-page-radial">
      {/* LeaderLine script (for the connecting arrow) */}
      <Script
        src="https://unpkg.com/leader-line"
        strategy="afterInteractive"
        onLoad={() => setLlReady(true)}
      />
      <div className="mx-auto w-full max-w-[90vw] lg:max-w-[70vw] px-6 py-12">
        {/* Top Urgency Bar (sticky) */}
        <UrgencyLanding
          sticky={true}
          spotsTaken={25}
          totalSpots={30}
          cohortLabel="Nov 18–19, 2025"
          ctaLabel="Join now"
          ctaHref="#form-section"
          primaryOverride="LAST 5 seats remaining!"
        />
        {/* Hero */}
        <header className="text-center">
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
          <span className="text-emerald-400">3X Your Sales</span>  Without Changing Anything <br/> About Your Offer
          </h1>
          <p className="mt-2 text-lg sm:text-xl text-yellow-300 font-bold">
          The problem is almost never what you’re selling, but how you’re selling it.
          </p>
          <p className="mt-2 text-lg sm:text-xl text-yellow-300 font-bold">
            Two live build sessions • Templates • Coaching • Nov 18–19, 2025
          </p>
          {/* Hero visual */}
          <div className="mt-6 relative mx-auto max-w-[58rem]">
            <button
              type="button"
              onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
              aria-label="Go to checkout form"
            >
              <Image src={heroImg} alt="Build To Profit hero" fill priority className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            </button>
            {/* Avatar row */}
            <div className="mt-4 relative z-10 pointer-events-none flex justify-center">
              <div className="flex -space-x-3">
                {heroAvatars.map((src, i) => (
                  <span key={i} className="inline-block h-9 w-9 overflow-hidden rounded-full ring-2 ring-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="creator" className="h-full w-full object-cover" />
                  </span>
                ))}
                <span className="ml-3 text-sm text-slate-300">Join 300+ creators</span>
              </div>
            </div>
          </div>
        </header>
        
               {/* Pain → Promise with visual connector (LeaderLine) */}
        <section className="mt-6 relative">
          <div className="grid gap-8 sm:gap-20 sm:grid-cols-2">
            <div ref={leftColRef} className="rounded-xl border border-white/10 bg-white/5 p-4 max-w-sm mx-auto">
              <p className="text-white font-extrabold mb-2">This is you</p>
              <ul className="space-y-2 text-slate-200 text-base">
                <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5 text-[1.1em]">😕</span> Great content. Weak conversions.</li>
                <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5 text-[1.1em]">😕</span> Launches drag. Revenue stalls.</li>
                <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5 text-[1.1em]">😕</span> Unsure what to say to get buys.</li>
                <li className="flex items-start gap-2"><span aria-hidden className="mt-0.5 text-[1.1em]">😕</span> Too many ideas. No plan.</li>
              </ul>
            </div>
            <div ref={rightColRef} className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 max-w-sm mx-auto">
              <p className="text-white font-extrabold mb-2">What changes</p>
              <ul className="space-y-2 text-slate-100 text-base">
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-300 mt-0.5"/> A clear, irresistible offer</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-300 mt-0.5"/> A 12‑day launch you can follow</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-300 mt-0.5"/> Copy you can plug right in</li>
                <li className="flex items-start gap-2"><Check className="w-5 h-5 text-emerald-300 mt-0.5"/> Live feedback and accountability</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Offer CTA */}
        <section className="mt-8 text-center">
          <a href="#form-section" className="relative inline-flex items-center gap-3 rounded-lg bg-yellow-400 text-slate-900 px-6 py-3 font-extrabold text-xl ring-2 ring-yellow-300">
            Join Build To Profit – $497
            <span
              className="absolute -top-2 -right-2 rounded-full bg-rose-600 px-2.5 py-1 text-xs font-black uppercase tracking-wider text-white ring-2 ring-rose-300 shadow-md"
              aria-hidden
            >
              <span className="line-through">$897</span>
            </span>
          </a>
          <div className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-300">
            <Shield className="w-4 h-4 text-emerald-400" aria-hidden />
            <span>Secure checkout</span>
            <span className="opacity-60">(Stripe)</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Recordings included. Templates included.</p>
          <div className="mt-4">
            <Image
              src="/imgs/heroimgs/join1.png"
              alt="What we cover in Build To Profit"
              width={1200}
              height={675}
              className="mx-auto w-full h-auto max-w-4xl rounded-xl border border-white/10"
              priority={false}
            />
          </div>
        </section>

        

        {/* Testimonials Group A (unified design) */}
        <section className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2">
          {[
            { name: 'Marni', title: null, date: 'Aug 30, 2025', avatar: 'https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/testimonials%2F71750850-e9e2-45cd-8e06-5daa71b7f61d%2Favatar?alt=media&token=6e39ea1b-96a6-410e-8d40-a69e2e022a38', quote: "I have two people in my 90 day program and it generated 4k (so far) and I'm so happy about that!" },
            { name: 'Carrie Loranger', title: null, date: 'Jun 29, 2025', avatar: 'https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/testimonials%2F6fd11c11-ac36-43d9-9d22-7d7fdf9e398a%2Favatar?alt=media&token=8442c231-2be2-46c9-93c1-733ea4ad27d3', quote: 'The feedback is already incredible on my just-launched $100k Offer Stack Builder: "This nailed exactly what I needed to focus on" "Finally, a clear path forward" "Spot-on recommendations"' },
            { name: 'Nate Solon', title: null, date: 'Oct 21, 2025', avatar: 'https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/testimonials%2F417f5f06-d7a0-44b8-818e-e535c3ec2c55%2Fattached?alt=media&token=daf7c28f-d537-4943-a21d-585db796f083&_w=1000&_h=667', quote: 'Hi Ana, just wanted to say thank you for your webinar. I used your system to name my highest performing post, which is currently responsible for quite a lot of my overall profit. Of course now I’ll use the same system to more posts. I want to send a screenshot of the stats but looks like I can’t in messages anyway it’s this post. It’s converted $3500 in paid subs.' },
            { name: 'Jeanette Martin', title: null, date: 'Sept 21, 2025', avatar: 'https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/testimonials%2Fc9cdb423-d612-48be-9745-2665ff95993f%2Favatar?alt=media&token=8cb6ceb6-b40e-4698-8a51-3ab418023d38', quote: 'What a brilliant, actionable, organised, inspiring bootcamp. Thank you, Ana.' },
          ].map((t, i) => (
            <TestimonialCard key={i} avatar={t.avatar} name={t.name} title={t.title} date={t.date} quote={t.quote} />
          ))}
        </section>

        {/* Pain → Promise (3-step inline) */}
        <section className="mt-6 relative">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-slate-900 font-extrabold">1</div>
              <p className="text-white font-bold">Lock the offer</p>
              <p className="text-slate-300 text-sm mt-1">Pick price. Sharpen promise.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-slate-900 font-extrabold">2</div>
              <p className="text-white font-bold">Write & plan</p>
              <p className="text-slate-300 text-sm mt-1">4 emails. 12‑day plan.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-slate-900 font-extrabold">3</div>
              <p className="text-white font-bold">Launch & refine</p>
              <p className="text-slate-300 text-sm mt-1">Ship. Get feedback. Sell.</p>
            </div>
          </div>
        </section>

        {/* How it works (days) */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-white font-extrabold">Day 1 — Build (Nov 18)</p>
            <ul className="mt-2 space-y-2 text-slate-200 text-sm">
              <li>Lock your offer and pricing</li>
              <li>Write a 4‑email launch sequence</li>
              <li>Map a 12‑day launch plan</li>
              <li>Get coached live on your offer</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-white font-extrabold">Day 2 — Launch (Nov 19)</p>
            <ul className="mt-2 space-y-2 text-slate-200 text-sm">
              <li>Ship, review, and adjust fast</li>
              <li>Handle objections. Close your first 10</li>
              <li>Create post‑launch momentum</li>
              <li>Leave with a system that sells</li>
            </ul>
          </div>
        </section>

        {/* What you get */}
        <section className="mt-8 grid gap-3">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <p className="text-white font-extrabold">Included</p>
            <ul className="mt-2 space-y-2 text-slate-100 text-sm">
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-300 mt-0.5"/> 2× live sessions with coaching</li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-300 mt-0.5"/> 12‑day launch plan and tracker</li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-300 mt-0.5"/> Copy you can plug right in + sales templates</li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-300 mt-0.5"/> Private community + recordings</li>
            </ul>
          </div>
        </section>

        {/* Testimonials from main page (Group A) hidden legacy section (kept for reference) */}
        <section className="hidden"></section>

        {/* Form → Checkout */}
        <section id="form-section" className="mt-8">
          <p className="text-center text-slate-200 mb-3">
            Enter your details. Go to secure checkout.
          </p>
          <LeadForm onSuccess={handleLeadSuccess} onError={handleLeadError} />

          {isProcessingPayment && (
            <p className="mt-3 text-center text-sm text-slate-300">Starting checkout…</p>
          )}
          {error && (
            <div className="mt-3 text-center text-sm text-rose-300">{error}</div>
          )}
        </section>
        {/* Real Results from Our Students */}
        <section className="mt-8">
          <ResultsGallery />
        </section>

        {/* Risk reversal + FAQ (tiny) */}
        <section className="mt-10 grid gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-white font-bold">Can’t attend live?</p>
            <p className="mt-1 text-slate-200 text-sm">Recordings within 24 hours. Follow the plan. Get results.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-white font-bold">Who it’s for</p>
            <p className="mt-1 text-slate-200 text-sm">Newsletter creators who want sales, not just opens.</p>
          </div>
        </section>

        {/* Growth story graph section */}
        <section className="mt-12">
          <Growth4Landing />
        </section>

        {/* Testimonials Group B (unified design) */}
        <section className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2">
          {[
            { name: 'Hilde', title: 'Substack Bestseller', date: 'Jul 12, 2025', avatar: '/testimavatar/44.webp', quote: "Ana's framework is pure gold. I re-launched my newsletter 6 weeks ago and already have 2,755 engaged subscribers. The templates saved me months of work." },
            { name: 'Sue', title: 'Newsletter Creator', date: 'Aug 05, 2025', avatar: 'https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/testimonials%2Fa5e4510d-697e-412b-a33e-d5503f645c92%2Favatar?alt=media&token=3a4e4b81-9080-436e-bfae-25808b43fc0f', quote: "Your programs completely transformed my approach. I went from 200 subscribers to 4.5K in just 3 months and made my first $1,500 from my newsletter!" },
            { name: 'Mary B.', title: 'Content Creator', date: 'Sep 18, 2025', avatar: '/testimavatar/46.webp', quote: "Best investment I made this year. The community alone is worth the price. I'm now making $2,500/month from my newsletter thanks to this program." },
            { name: 'Jeff', title: 'Host of the How You Profit Show', date: 'Aug 28, 2025', avatar: '/testimavatar/jeff.webp', quote: "Ana's strategies are game-changing. I've seen a 300% increase in my newsletter engagement and revenue since implementing her framework." },
          ].map((t, i) => (
            <TestimonialCard key={i} avatar={t.avatar} name={t.name} title={t.title} date={t.date} quote={t.quote} />
          ))}
        </section>

        

        {/* Final CTA */}
        <section className="mt-8 text-center">
          <a href="#form-section" className="relative inline-flex items-center gap-3 rounded-lg bg-yellow-400 text-slate-900 px-6 py-3 font-extrabold text-xl ring-2 ring-yellow-300">
            Join Build To Profit – $497
            <span
              className="absolute -top-2 -right-2 rounded-full bg-rose-600 px-2.5 py-1 text-xs font-black uppercase tracking-wider text-white ring-2 ring-rose-300 shadow-md"
              aria-hidden
            >
              50% OFF
            </span>
          </a>
          <div className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-300">
            <Shield className="w-4 h-4 text-emerald-400" aria-hidden />
            <span>Secure checkout</span>
            <span className="opacity-60">(Stripe)</span>
          </div>
        </section>
      </div>
    </main>
  );
}
