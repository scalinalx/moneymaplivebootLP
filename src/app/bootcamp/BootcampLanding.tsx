'use client';

import React, { useEffect, useState } from 'react';
import EmbeddedCheckout from './EmbeddedCheckout';
import EarningsCard from './EarningsCard';
import './bootcamp.css';

// ====== EDIT ME ======
// Prices + deadlines are driven by env vars (same ones the server charges from,
// so the displayed price and the charged price can never drift). Override in
// .env.local or Vercel, then redeploy (NEXT_PUBLIC_* are inlined at build time):
//   NEXT_PUBLIC_BOOTCAMP_FOUNDING_PRICE   (cents, e.g. 249700)
//   NEXT_PUBLIC_BOOTCAMP_STANDARD_PRICE   (cents, e.g. 299700)
//   NEXT_PUBLIC_BOOTCAMP_FOUNDING_DEADLINE (ISO, e.g. 2026-07-08T16:00:00+03:00)
//   NEXT_PUBLIC_BOOTCAMP_CART_CLOSE        (ISO)
const centsToUsd = (cents: number) => '$' + (cents / 100).toLocaleString('en-US');
const FOUNDING_CENTS = Number.parseInt(process.env.NEXT_PUBLIC_BOOTCAMP_FOUNDING_PRICE || '249700', 10);
const STANDARD_CENTS = Number.parseInt(process.env.NEXT_PUBLIC_BOOTCAMP_STANDARD_PRICE || '299700', 10);
const CONFIG = {
  foundingDeadline: process.env.NEXT_PUBLIC_BOOTCAMP_FOUNDING_DEADLINE || '2026-07-08T16:00:00+03:00',
  cartClose: process.env.NEXT_PUBLIC_BOOTCAMP_CART_CLOSE || '2026-07-14T23:59:00+03:00',
  foundingPrice: centsToUsd(FOUNDING_CENTS),
  foundingPlan: 'one payment · 2-payment plan available on request',
  standardPrice: centsToUsd(STANDARD_CENTS),
  standardPlan: 'one payment · 2-payment plan available on request',
};
const WAITLIST_URL = 'https://substackulous.kit.com/6figurebootcamp-waitlist';

function fmt(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return (d ? d + 'd ' : '') + String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
}

export default function BootcampLanding() {
  const [barLabel, setBarLabel] = useState('Founding price ends in');
  const [clock, setClock] = useState('—');
  const [priceLabel, setPriceLabel] = useState('Founding Price');
  const [price, setPrice] = useState(CONFIG.foundingPrice);
  const [plan, setPlan] = useState(CONFIG.foundingPlan);
  const [riseText, setRiseText] = useState(
    'Goes up to ' + CONFIG.standardPrice + ' when public doors open, July 8 at 4pm Greece time',
  );
  const [closed, setClosed] = useState(false);
  const [founding, setFounding] = useState(true);

  useEffect(() => {
    const founding = new Date(CONFIG.foundingDeadline);
    const close = new Date(CONFIG.cartClose);
    function tick() {
      const now = new Date();
      if (now < founding) {
        setBarLabel('Founding price ends in');
        setClock(fmt(founding.getTime() - now.getTime()));
        setPriceLabel('Founding Price');
        setPrice(CONFIG.foundingPrice);
        setPlan(CONFIG.foundingPlan);
        setRiseText('Goes up to ' + CONFIG.standardPrice + ' when public doors open, July 8 at 4pm Greece time');
        setClosed(false);
        setFounding(true);
      } else if (now < close) {
        setBarLabel('Doors close in');
        setClock(fmt(close.getTime() - now.getTime()));
        setPriceLabel('Price');
        setPrice(CONFIG.standardPrice);
        setPlan(CONFIG.standardPlan);
        setRiseText('Doors close July 14');
        setClosed(false);
        setFounding(false);
      } else {
        setBarLabel('Doors are closed');
        setClock('00:00:00');
        setClosed(true);
        setFounding(false);
      }
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // CTA href/label: when closed, all buttons become the waitlist. Otherwise the
  // in-page CTAs scroll down to the embedded #checkout form.
  const ctaHref = (scrollTarget: string) => (closed ? WAITLIST_URL : scrollTarget);
  const ctaLabel = (label: string) => (closed ? 'JOIN THE WAITLIST FOR THE NEXT COHORT →' : label);

  // CTA copy is phase-aware so the savings/price claims stay true after the
  // founding deadline. First-person + concrete value, never process words.
  const save = centsToUsd(STANDARD_CENTS - FOUNDING_CENTS);
  const ctaTop = founding
    ? `CLAIM MY FOUNDING SEAT — SAVE ${save} →`
    : 'CLAIM MY SEAT BEFORE DOORS CLOSE →';
  const ctaMid = founding
    ? `LOCK IN ${CONFIG.foundingPrice} BEFORE IT’S ${CONFIG.standardPrice} →`
    : 'CLAIM ONE OF THE 30 SEATS →';
  const urgency = founding
    ? `Founding price ends in ${clock} — then ${CONFIG.foundingPrice} becomes ${CONFIG.standardPrice}.`
    : `Doors close in ${clock} — and I keep my deadlines.`;

  return (
    <div className="bootcamp">
      <div className="bar">
        <span>{barLabel}</span>
        <span className="clock">{clock}</span>
        <a href={ctaHref('#checkout')}>{closed ? 'Join waitlist' : 'Claim my seat'}</a>
      </div>

      {/* Wider, viewport-relative hero band: hero image + title + tagline. */}
      <div className="wrap-wide">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="block" src="/imgs/bootcamp/hero.webp" alt="The 6-Figures Newsletter Bootcamp: turn what you know into six figures. 7 weeks, live, 30 women, July 15 to September 1." />

        <h1>The 6-Figures Newsletter Bootcamp:<br />Turn What You Know Into <span className="hl">Six Figures</span></h1>
        <p className="tagline">Learn how to turn your existing expertise into a <span className="hl"><b>six-figure business</b></span> using email and your newsletter, even if you have no audience, hate being on camera, and only have two hours a day.</p>
      </div>

      {/* Earnings chart band: wider than .wrap, scaled to the viewport. */}
      <div className="wrap-earnings">
        <EarningsCard />
        <p className="fine" style={{ marginTop: -18 }}>My actual Substack earnings screen. 18 months. Starting from zero. Products and brand deals are on top of this.</p>
      </div>

      <div className="wrap">
        <p className="price-line">{priceLabel}: <span>{price}</span></p>
        <p className="plan-line">{plan}</p>
        <p className="rise-line">{riseText}</p>
        <a className="btn" href={ctaHref('#checkout')}>{ctaLabel(ctaTop)}</a>
        <p className="btn-note">30 seats. 250+ women were on the waitlist. Doors close July 14.</p>

        <h2>What’s included?</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="block" src="/imgs/bootcamp/included.webp" alt="Everything included in the 6-Figures Newsletter Bootcamp" style={{ marginTop: 0 }} />
        <ul className="inc">
          <li><b>7 weekly LIVE hot seat coaching calls</b> where we work on YOUR offer, YOUR emails, and YOUR launch, every call recorded and posted the same day <em>(bring your drafts and your numbers, leave knowing your exact next move)</em>.</li>
          <li><b>a weekly roadmap that tells you exactly what to watch and what to execute</b> so 50+ hours never feels overwhelming <em>(one focus per week, in the right order, zero guesswork)</em>.</li>
          <li><b>my “Money Map” system for picking the ONE offer</b> your expertise should become, and pricing it with confidence <em>(this is the exact system behind the $8,600, $13,988, and $100K student launches you’ll see below)</em>.</li>
          <li><b>how to sell to a SMALL list</b> using my “small and hot beats big and cold” launch method <em>(one of my students launched to fewer than 500 subscribers and did $13,988 in 5 days)</em>.</li>
          <li><b>my exact launch emails and the 5-Line Email Architecture</b> so you never stare at a blank page <em>(copy the structure, pour in your voice, hit send)</em>.</li>
          <li><b>a real launch, <span className="hl">DONE, before September 1</span>.</b> Not planned. Not “someday.” You open your own cart during Week 5 with me in your corner all week.</li>
          <li><b>Week 6: we build your own AI tool trained on YOUR expertise, together,</b> step by step, so your business sells and delivers while you’re living your life <em>(nobody else in this space teaches this)</em>.</li>
          <li><b>async feedback from me all summer:</b> post your draft, your sales page, your “does this sound weird?” moment between calls, and I answer <em>(this is coaching, not a course you watch alone)</em>.</li>
          <li><b>a private cohort room capped at 30 women,</b> small enough that I know your name, your offer, and your numbers <em>(and big enough that someone is always one step ahead of you to learn from)</em>.</li>
          <li><b>the repeat system:</b> in Week 7 we debrief your launch numbers and build your calendar to run it again in October, December, and every quarter after <em>(the first launch is the hardest one you’ll ever do; the rest are copies)</em>.</li>
          <li className="bonus"><b>[bonus] the first 10 women to enroll get a private 1:1 strategy session with me,</b> a $1,500 session, completely free <em>(these have never lasted long, I’m just being honest)</em>.</li>
          <li className="bonus"><b>[bonus] FIRST TIME EVER: access to my private AI coach.</b> It’s Ana in your pocket, 24/7. All my knowledge, my experience, and my case studies live inside, and nobody outside my own business has ever had access until now <em>(stuck at 11pm? ask it. it answers like I would. worth thousands, and I mean that literally)</em>.</li>
          <li className="bonus"><b>[bonus] my 50+ hour video workshop repository,</b> my best programs including the complete 10K Launch Lab, on top of the weekly curriculum and support <em>(the Lab alone sells for $797; the repository is yours from day one)</em>.</li>
        </ul>

        <p className="fine">Please note: the results on this page are real, individual student outcomes and are not a promise or guarantee of your earnings. This is a live cohort capped at 30 seats, so enrollment closes July 14 or when seats fill, whichever comes first.</p>

        <h2>Don’t take my word for it:</h2>
        <div className="t-pair">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="tcard" src="/imgs/bootcamp/cards/1.webp" alt="Student testimonial" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="tcard" src="/imgs/bootcamp/cards/2.webp" alt="Student testimonial" />
        </div>
        <div className="t-pair">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="tcard" src="/imgs/bootcamp/cards/3.webp" alt="Student testimonial" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="tcard" src="/imgs/bootcamp/cards/4.webp" alt="Student testimonial" />
        </div>

        <p className="price-line">Founding Price: <span>{price}</span></p>
        <p className="plan-line">{plan}</p>
        <a className="btn" href={ctaHref('#checkout')}>{ctaLabel(ctaMid)}</a>
        <p className="btn-note">First 10 in get the free $1,500 private 1:1 with me.</p>

        <h2>Questions I know you have:</h2>

        <h3>But I don’t have an audience!?</h3>
        <p className="faq-a">Neither did I, 18 months ago. Zero subscribers, kitchen table, baby on my chest. And Tony (below) launched to fewer than 500 subscribers and did $13,988. Week 3 of the bootcamp is dedicated to building your small, engaged list, and my entire launch method is designed for exactly that list, not for influencers. Coming in with zero is the standard starting line here.</p>

        <h3>How much time does this actually take?</h3>
        <p className="faq-a">One live call a week (recorded the same day if you miss it) plus focused execution from your weekly roadmap. I built this whole business in about two hours a day around a baby who thinks sleep is optional. This program is designed for women with jobs, kids, and real lives. You will never hear “just hustle harder” from me.</p>

        <h3>I’m not a writer. Or techy. At all.</h3>
        <p className="faq-a">I was a marketing executive, not a writer, and every email you’ll send follows my templates: you pour your voice into a structure that already works. And the AI tool build in Week 6 happens live, together, step by step, with my eyes on your screen. If you can fill in a form, you can build it. I promise.</p>

        <h3>What if I can’t make the calls live?</h3>
        <p className="faq-a">Every call is recorded and posted the same day, you can submit your work for hot seat feedback in advance, and async feedback runs all summer regardless of your time zone. My students live in 75+ countries. The program bends around your life, not the other way.</p>

        <h3>Why does the price go up?</h3>
        <p className="faq-a">$2,497 is the founding price for this first cohort, and it’s available for 24 hours after the kickoff call, until public doors open July 8 at 4pm Greece time. After that it’s $2,997 until doors close July 14. Future cohorts will never see the founding price again. I keep my deadlines because that’s the only reason deadlines mean anything.</p>

        <h3>I already have a newsletter but it’s not making money.</h3>
        <p className="faq-a">Then you’re actually ahead. One of my students (Amaya, on the wall below) built an 8k+ newsletter that made a few hundred dollars in over a year. Within 3 days of applying the system she’d made more progress toward real revenue than in the previous 13 months. The newsletter isn’t your problem. The offer and the launch are, and that’s exactly what we fix in Weeks 1 through 5.</p>

        <h3>Which of your programs should I start with?</h3>
        <p className="faq-a">If you want me personally in your corner while you build and launch this summer, it’s this one, full stop. The bootcamp includes the complete 10K Launch Lab and my flagship trainings anyway, so there’s nothing to buy first. If you’d rather self-study without live coaching, wait for the Lab to reopen after the summer (at its regular price, without the 1:1s, the hot seats, or the AI tool).</p>

        <h3>What happens right after I enroll?</h3>
        <p className="faq-a">You get instant access to the full video library and the private cohort room, your Week 1 roadmap lands in your inbox before July 15, and if you’re one of the first 10, my team reaches out to schedule your private 1:1. Then we start. Together.</p>

        <div className="t-pair">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="tcard" src="/imgs/bootcamp/cards/leaderboard.webp" alt="Bootcamp member: 17 paid subscribers in 30 days and number 11 on the Education leaderboard" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="tcard" src="/imgs/bootcamp/cards/launch10k.webp" alt="Community member: almost $10K from one launch and 3,000 new followers since September" />
        </div>

        <h2 id="checkout">Ready? Claim one of the 30 seats:</h2>
        <p className="price-line">Founding Price: <span>{price}</span></p>
        <p className="plan-line">{plan}</p>
        <p className="rise-line">{riseText}</p>
        <EmbeddedCheckout price={price} closed={closed} urgency={urgency} />
        <p className="btn-note">We start July 15. See you inside.</p>

        <p className="quote">“Stop shrinking the dream to fit the doubt.”</p>
        <p className="quote-src">Letter №347 · how we grow</p>
      </div>

      <footer>
        How We Grow · Ana · <a href="https://howwegrowtoday.substack.com">howwegrowtoday.substack.com</a><br />
        Results shown are individual student outcomes, not a promise of earnings.
      </footer>
    </div>
  );
}
