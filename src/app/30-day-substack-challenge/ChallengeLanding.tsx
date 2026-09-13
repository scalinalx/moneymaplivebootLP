'use client';

import React, { useCallback, useState } from 'react';
import { ArrowRight, ArrowUpRight, TrendingUp } from 'lucide-react';
import LeadCaptureModal, { type ChallengeTier } from './LeadCaptureModal';
import {
  SUBSTACK_CHALLENGE_PRICE,
  SUBSTACK_CHALLENGE_RETAIL_PRICE,
  SUBSTACK_CHALLENGE_PLUS_PRICE,
  SUBSTACK_CHALLENGE_PLUS_RETAIL_PRICE,
  SUBSTACK_CHALLENGE_CHECKOUT_URL,
} from '@/lib/constants';
import './challenge.css';

// ====== EDIT ME ======
// Copy and structure come from the Claude Design handoff ("30-Day Substack
// Challenge Page v2"). Prices live in src/lib/constants.ts (env-overridable).
// The start date is a label, not a Date — it's only ever displayed.
const IMG = '/imgs/30-day-substack-challenge';
const usd = (cents: number) => '$' + (cents / 100).toLocaleString('en-US');
const CONFIG = {
  startDate: process.env.NEXT_PUBLIC_SUBSTACK_CHALLENGE_START_LABEL || 'Sept 21',
  showOneOnOne: process.env.NEXT_PUBLIC_SUBSTACK_CHALLENGE_SHOW_1ON1 !== 'false',
  price: usd(SUBSTACK_CHALLENGE_PRICE),
  priceWas: usd(SUBSTACK_CHALLENGE_RETAIL_PRICE),
  save: usd(SUBSTACK_CHALLENGE_RETAIL_PRICE - SUBSTACK_CHALLENGE_PRICE),
  plusPrice: usd(SUBSTACK_CHALLENGE_PLUS_PRICE),
  plusPriceWas: usd(SUBSTACK_CHALLENGE_PLUS_RETAIL_PRICE),
  plusSave: usd(SUBSTACK_CHALLENGE_PLUS_RETAIL_PRICE - SUBSTACK_CHALLENGE_PLUS_PRICE),
  checkoutUrl: SUBSTACK_CHALLENGE_CHECKOUT_URL,
};

const NOT_DOING = ['Writing for everyone.', 'Forty posts, zero asks.', 'Waiting for a bigger list.', 'Counting likes.'];
const DOING = ['Name one reader.', 'Price one offer.', 'Say what you sell, one post in four.', 'Get your first paying subscribers.'];
const STATS = [
  { label: 'Readers', value: '82,000' },
  { label: 'Time from zero', value: '< 2 years' },
  { label: 'Other social platforms', value: '0' },
];
const WINS: { img: string; alt: string; name: string; pill?: string; tilt: number }[] = [
  { img: 't-highticket', alt: 'From 27 to 88 subscribers in 15 days', name: 'The High-Ticket Closer', pill: '27 → 88 in 15 days', tilt: -1.5 },
  { img: 't-suzanne', alt: 'Suzanne: #62 Rising, 16 subscribers and 3 paid in a week', name: 'Suzanne Harrison', pill: '+3 paid in week 1', tilt: 1.5 },
  { img: 't-jessica', alt: 'Jessica: woke up to 52 subscribers', name: 'Jessica Donovan', pill: '52 subscribers', tilt: -1 },
  { img: 't-jenna', alt: 'Jenna: increased the price, updated paid subscription', name: 'Jenna Garagiola', pill: 'Raised her price', tilt: 2 },
  { img: 't-asteria', alt: 'Asteria: first 100 subs', name: 'Asteria Rose', pill: 'First 100 subs', tilt: -2 },
  { img: 't-kwame-2away', alt: 'Kwame: +18 subscribers, 2 paid away from double digits', name: 'Kwame Twumasi-Ankrah', pill: '+18 in 30 days', tilt: 1 },
  { img: 't-andrea', alt: 'Andrea on the Thursday hot seat', name: 'Andrea Dell', tilt: -1.5 },
  { img: 't-malinda', alt: 'Malinda: first week of the challenge has been amazing', name: 'Malinda Zarate', tilt: 1.5 },
  { img: 't-stephanie', alt: 'Stephanie: rebranded her Substack in week one', name: 'Stephanie Frank', tilt: -1 },
];
const WEEKS = [
  { n: '1', label: 'Week one', title: 'One reader.', body: 'Name her. Know what she typed into Google at 11pm. Everything you write from here is to her.' },
  { n: '2', label: 'Week two', title: 'One offer.', body: 'Price it. Write the page. Stop waiting for a bigger list before you make something worth paying for.' },
  { n: '3', label: 'Week three', title: 'The ask.', body: "One post in every four says what you sell. Not a pitch. A sentence. You'll write four of them." },
  { n: '4', label: 'Week four', title: 'Sell.', body: 'Your first paying subscribers, or a clear reason why not and what to change.' },
];
const INCLUDED = [
  { n: '30', title: 'Daily lessons', body: 'One lesson and one task in your inbox every morning for 30 days.' },
  { n: '4', title: 'Weekly hot seats', body: 'Live with me on Thursdays. Bring your reader, your offer, your post. We fix it together.' },
  { n: '24/7', title: 'Ana AI Coach', body: 'Trained on how I built the newsletter. Ask it anything, any hour.' },
  { n: '1', title: 'Me in your corner', body: 'Feedback inside the community for all 30 days.' },
  { n: '60', title: 'Days of full access', body: 'Finish the curriculum at your pace after the live 30 days.' },
];
const TIER_A = ['30 daily lessons', '4 weekly hot seats with Ana', 'Ana AI Coach, 24/7', '60-day full content access'];
const TIER_B = ['Everything in the full challenge', 'One private 1:1 session with Ana', 'Your offer and pricing, reviewed by me'];
const FAQS = [
  ['Do I need an audience already?', 'No. Under 500 subscribers is who this is built for. Two hundred readers and one offer is a business.'],
  ['How much time does it take each day?', 'A lesson and one task. Most days, under an hour. Hot seats are once a week and recorded.'],
  ['What is the AI coach?', 'A coach trained on how I built How We Grow. Ask it about your reader, your offer, your pricing, any hour of the day.'],
  ['What if I fall behind?', 'You keep full access for 60 days. Thirty to do it live with us, thirty more to finish.'],
  ['Is this only for Substack?', "The platform doesn't matter. Pricing your writing does. Substack is where the lessons are shown."],
];

// Hand-drawn accent strokes from the design system's Scribble component.
const SCRIBBLE: Record<string, { vb: string; d: string }> = {
  'arrow-curl': { vb: '0 0 140 90', d: 'M6 78c30-40 60-40 78-22 10 10 4 22-6 18-10-6 2-22 18-24 14-2 26 6 36 16M118 52l14 14-18 4' },
  underline: { vb: '0 0 300 20', d: 'M4 12c60-8 150-10 292-4' },
  x: { vb: '0 0 40 40', d: 'M6 6l28 28M34 6L6 34' },
  check: { vb: '0 0 40 40', d: 'M5 22l11 11L36 8' },
};
function Scribble({ kind, color, width, stroke = 5, style }: { kind: keyof typeof SCRIBBLE; color: string; width: number; stroke?: number; style?: React.CSSProperties }) {
  const s = SCRIBBLE[kind];
  const [, , w, h] = s.vb.split(' ').map(Number);
  return (
    <svg viewBox={s.vb} width={width} height={(width * h) / w} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: 'block', overflow: 'visible', ...style }}>
      <path d={s.d} />
    </svg>
  );
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 68, behavior: 'smooth' });
}

export default function ChallengeLanding() {
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [modalTier, setModalTier] = useState<ChallengeTier | null>(null);
  const closeModal = useCallback(() => setModalTier(null), []);

  const openLead = (tier: ChallengeTier) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    try { (window as any).__track?.checkoutStep?.('lead_form_open', 'substack-challenge-' + tier); } catch {}
    setModalTier(tier);
  };

  return (
    <div className="sc30">
      {/* Announcement */}
      <div className="sc30-announce" data-track-section="announcement">
        Doors open · We start {CONFIG.startDate} · Under 500 subscribers? This is built for you.
      </div>

      {/* Nav */}
      <div className="sc30-nav">
        <div className="sc30-wrap">
          <img src={`${IMG}/logo-mark.png`} alt="how we grow" />
          <b className="sc30-brand">how we grow</b>
          <span className="sc30-spacer" />
          <button type="button" className="sc30-btn sc30-btn--accent sc30-btn--s" onClick={() => scrollToId('pricing')}>
            join — {CONFIG.price}
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="sc30-hero" data-track-section="hero">
        <img className="sc30-hero-img" src={`${IMG}/hero.jpg`} alt="" />
        <div className="sc30-hero-dim" />
        <div className="sc30-hero-scrim" />
        <div className="sc30-wrap sc30-hero-grid">
          <div>
            <div className="sc30-eyebrow">30-Day Substack Challenge</div>
            <div className="sc30-marker sc30-marker--hero sc30-tilt-a">Still under 500 subscribers?</div>
            <h1><span className="sc30-hl sc30-hl--white">That&apos;s exactly who this is built for.</span></h1>
            <p>Thirty days. A daily lesson, a weekly hot seat with me, my AI coach in between. You leave with one reader, one priced offer, and your first paying subscribers.</p>
            <div className="sc30-hero-ctas">
              <button type="button" className="sc30-btn sc30-btn--accent sc30-btn--l" onClick={() => scrollToId('pricing')}>
                join the challenge <ArrowRight size={20} />
              </button>
              <button type="button" className="sc30-btn sc30-btn--l" onClick={() => scrollToId('wins')}>
                see the wins
              </button>
            </div>
          </div>
          <div className="sc30-hero-proof">
            <div className="sc30-proofcard sc30-proofcard--float">
              <img src={`${IMG}/t-kwame-600.webp`} alt="Kwame's Substack note: 600 subscribers today, 7 paid" />
            </div>
            <div className="sc30-sticker sc30-sticker--pink">Last cohort</div>
          </div>
        </div>
      </section>

      {/* Kraft: X-list */}
      <section className="sc30-kraft" data-track-section="contrast">
        <div className="sc30-wrap">
          <div>
            <div className="sc30-marker sc30-marker--m sc30-tilt-a">What you&apos;re doing now</div>
            <ul className="sc30-xlist">
              {NOT_DOING.map((t) => (
                <li key={t}><Scribble kind="x" color="var(--ink)" width={21} /><span>{t}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="sc30-marker sc30-marker--m sc30-marker--pink sc30-tilt-b">What we do in 30 days</div>
            <ul className="sc30-xlist">
              {DOING.map((t) => (
                <li key={t}><Scribble kind="check" color="var(--yellow)" width={21} /><span>{t}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Ink: the number */}
      <section className="sc30-ink" data-track-section="proof-number">
        <div className="sc30-wrap">
          <div>
            <div className="sc30-eyebrow sc30-eyebrow--yellow">Does it actually work? Yes.</div>
            <div className="sc30-bignum">$1.4M</div>
            <Scribble kind="underline" color="var(--pink)" width={320} stroke={6} />
            <p className="sc30-ink-lede">from one Substack. 82,000 readers. Under two years. Starting from zero, <em>with no other social media presence.</em></p>
          </div>
          <div className="sc30-stats">
            {STATS.map((s) => (
              <div className="sc30-stat" key={s.label}><span>{s.label}</span><span>{s.value}</span></div>
            ))}
            <p>Not because I write better than you. Because I priced my work and made offers. The challenge is that process, compressed into 30 days.</p>
          </div>
        </div>
      </section>

      {/* Wins wall */}
      <section id="wins" className="sc30-wrap sc30-wins" data-track-section="wins">
        <div className="sc30-wins-head">
          <div>
            <div className="sc30-eyebrow">From the last cohort</div>
            <div className="sc30-marker sc30-marker--l sc30-tilt-a">Likes are not buyers. These are.</div>
          </div>
          <div className="sc30-wins-note">
            <Scribble kind="arrow-curl" color="var(--pink)" width={110} />
            <span>real posts from inside the community, unedited</span>
          </div>
        </div>
        <div className="sc30-wall">
          {WINS.map((wn) => (
            <div key={wn.img}>
              <div className="sc30-proofcard" style={{ transform: `rotate(${wn.tilt}deg)` }}>
                <img src={`${IMG}/${wn.img}.webp`} alt={wn.alt} loading="lazy" />
                <div className="sc30-proofcard-meta">
                  <b>{wn.name}</b>
                  {wn.pill && <span className="sc30-pill"><TrendingUp size={16} strokeWidth={2.5} />{wn.pill}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="sc30-wins-cta">
          <button type="button" className="sc30-btn sc30-btn--ink sc30-btn--l" onClick={() => scrollToId('pricing')}>
            I want wins like these <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* The 30 days */}
      <section id="plan" className="sc30-plan" data-track-section="plan">
        <div className="sc30-wrap">
          <div className="sc30-eyebrow">The 30 days</div>
          <h2 className="sc30-h2">Reader. Offer. Ask. <span className="sc30-hl">Sell.</span></h2>
          <div className="sc30-cards">
            {WEEKS.map((wk) => (
              <div className="sc30-card" key={wk.n}>
                <div className="sc30-card-n">{wk.n}</div>
                <div className="sc30-eyebrow sc30-eyebrow--muted">{wk.label}</div>
                <h3>{wk.title}</h3>
                <p>{wk.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="sc30-wrap sc30-included" data-track-section="included">
        <div>
          <div className="sc30-eyebrow">What&apos;s included</div>
          <h2 className="sc30-h2">Me in your corner for <span className="sc30-hl sc30-hl--pink">30 days.</span></h2>
          <p className="sc30-lede">Work through the full 30-day curriculum, then keep complete access for 60 days to finish at your pace.</p>
          <div className="sc30-proofcard">
            <img src={`${IMG}/t-bernadette.webp`} alt="Bernadette: Ana AI Coach is brilliant" loading="lazy" />
          </div>
        </div>
        <div className="sc30-inc-list">
          {INCLUDED.map((it) => (
            <div className="sc30-inc" key={it.title}>
              <div className="sc30-inc-n">{it.n}</div>
              <div>
                <div className="sc30-inc-t">{it.title}</div>
                <div className="sc30-inc-b">{it.body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="sc30-about" data-track-section="about">
        <img className="sc30-about-img" src={`${IMG}/about.jpg`} alt="" loading="lazy" />
        <div className="sc30-about-scrim" />
        <div className="sc30-wrap">
          <div className="sc30-caption">
            <div className="sc30-eyebrow sc30-eyebrow--yellow">About Ana</div>
            <h2>I write to one reader. <em>She is me, two years ago.</em></h2>
            <p>I&apos;m Ana Calin. I run How We Grow, a Substack about growing and monetizing a newsletter. I started it from zero, with no other social media presence. In under two years it grew to 82,000 readers and $1.4M in revenue.</p>
            <p>I didn&apos;t get here by writing for everyone. I named one reader, priced my work, and said what I sell in <b>one post in every four.</b> That&apos;s what I&apos;ll hold you to for 30 days.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="sc30-wrap sc30-pricing" data-track-section="pricing">
        <div className="sc30-pricing-head">
          <div className="sc30-eyebrow">Doors are open · Starts {CONFIG.startDate}</div>
          <div className="sc30-marker sc30-marker--l sc30-marker--center sc30-tilt-b">Pick which one you&apos;re running.</div>
          <p>A hobby with analytics, or a business with an offer. Cohort pricing, one-time fee, 60-day access.</p>
        </div>
        <div className="sc30-tiers">
          <div className="sc30-tier">
            <div className="sc30-card">
              <div className="sc30-eyebrow sc30-eyebrow--muted">The full challenge</div>
              <div className="sc30-price-row">
                <span className="sc30-price-was">{CONFIG.priceWas}</span>
                <span className="sc30-price">{CONFIG.price}</span>
                <span className="sc30-price-per">one-time</span>
              </div>
              <div className="sc30-tags">
                <span className="sc30-tag sc30-tag--yellow">You save {CONFIG.save}</span>
                <span className="sc30-tag">Less than $10 a day</span>
              </div>
              <div className="sc30-tier-desc">Everything in the 30 days. Daily lessons, weekly hot seats, AI coach, 60-day access.</div>
              <ul className="sc30-checks">
                {TIER_A.map((t) => <li key={t}><Scribble kind="check" color="var(--pink)" width={18} /><span>{t}</span></li>)}
              </ul>
              <button type="button" className="sc30-btn sc30-btn--ink sc30-btn--l sc30-btn--full" onClick={() => openLead('challenge')}>
                join for {CONFIG.price} <ArrowUpRight size={20} />
              </button>
            </div>
          </div>
          {CONFIG.showOneOnOne && (
            <div className="sc30-tier">
              <div className="sc30-sticker sc30-sticker--yellow">Limited spots</div>
              <div className="sc30-card sc30-card--ink">
                <div className="sc30-eyebrow sc30-eyebrow--yellow">Challenge + 1:1 with Ana</div>
                <div className="sc30-price-row">
                  <span className="sc30-price-was">{CONFIG.plusPriceWas}</span>
                  <span className="sc30-price">{CONFIG.plusPrice}</span>
                  <span className="sc30-price-per">one-time</span>
                </div>
                <div className="sc30-tags">
                  <span className="sc30-tag sc30-tag--yellow">You save {CONFIG.plusSave}</span>
                  <span className="sc30-tag sc30-tag--pink">1:1 alone is worth $1,500</span>
                </div>
                <div className="sc30-tier-desc">The full challenge, plus a private session with me on your offer and your pricing.</div>
                <ul className="sc30-checks">
                  {TIER_B.map((t) => <li key={t}><Scribble kind="check" color="var(--yellow)" width={18} /><span>{t}</span></li>)}
                </ul>
                <button type="button" className="sc30-btn sc30-btn--l sc30-btn--full" onClick={() => openLead('challenge_1on1')}>
                  join for {CONFIG.plusPrice} <ArrowUpRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="sc30-badges">
          <span className="sc30-tag sc30-tag--yellow">Substack Bestseller</span>
          <span className="sc30-tag sc30-tag--pink">7-Figure Creator</span>
          <span className="sc30-tag">30-day challenge · 60-day access</span>
        </div>
      </section>

      {/* FAQ */}
      <section className="sc30-faq" data-track-section="faq">
        <div className="sc30-eyebrow sc30-eyebrow--muted">Questions</div>
        <div className="sc30-faq-list">
          {FAQS.map(([q, a], i) => {
            const open = openFaq === i;
            return (
              <div className="sc30-faq-item" key={q}>
                <button type="button" className="sc30-faq-q" aria-expanded={open} onClick={() => setOpenFaq(open ? -1 : i)}>
                  <span>{q}</span><span aria-hidden="true">{open ? '−' : '+'}</span>
                </button>
                {open && <p className="sc30-faq-a">{a}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="sc30-final" data-track-section="final-cta">
        <div className="sc30-wrap">
          <div className="sc30-marker sc30-marker--xl sc30-marker--center sc30-tilt-a">We start {CONFIG.startDate}.</div>
          <p>Two hundred readers and one priced offer is a business. <em>Come build yours.</em></p>
          <button type="button" className="sc30-btn sc30-btn--accent sc30-btn--l" onClick={() => scrollToId('pricing')}>
            join the challenge — {CONFIG.price} <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="sc30-footer">
        <div className="sc30-wrap">
          <img src={`${IMG}/logo-mark.png`} alt="" />
          <b className="sc30-brand">how we grow</b>
          <i>with Ana Calin</i>
          <span className="sc30-spacer" />
          <span className="sc30-handle">@ANACALIN</span>
        </div>
      </footer>

      {modalTier && (
        <LeadCaptureModal
          tier={modalTier}
          priceLabel={modalTier === 'challenge' ? CONFIG.price : CONFIG.plusPrice}
          checkoutUrl={CONFIG.checkoutUrl}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
