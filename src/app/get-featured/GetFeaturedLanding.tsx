'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';
import WaitlistForm from './WaitlistForm';
import './get-featured.css';

// ====== EDIT ME ======
// Copy comes from the Claude Design handoff "Get Featured Waitlist v2".
// The course opens in October 2026; the page only collects the waitlist.
const IMG = '/imgs/get-featured';

const FEATURES: { img: string; alt: string; head: string; headClass?: string; tag: string; tagPink?: boolean; title: string; rot: number; ty: number; pos: string }[] = [
  { img: 'forbes-article', alt: 'Forbes article by Ana Calin', head: 'Forbes', tag: 'FEATURE', title: 'How Brands Can Win On Social Media In 2025: Nine Trends To Watch', rot: -6, ty: 10, pos: '18% 12%' },
  { img: 'podcast', alt: 'Podcast episode with Ana Calin', head: 'Podcast', headClass: 'gf-feat-head--italic', tag: 'GUEST', tagPink: true, title: 'I hit $50K per month while holding my newborn', rot: 3, ty: -18, pos: '50% 50%' },
  { img: 'cmo-times', alt: 'CMO Times Q&A with Ana', head: 'CMO Times', headClass: 'gf-feat-head--sans', tag: 'Q&A', title: 'Employ Strategic Storytelling', rot: -2, ty: 6, pos: '0% 35%' },
  { img: 'ceo-weekly', alt: 'CEO Weekly interview', head: 'CEO Weekly', headClass: 'gf-feat-head--28', tag: 'INTERVIEW', tagPink: true, title: 'Personal Branding in 2024: Evolving Beyond LinkedIn and Traditional CVs', rot: 5, ty: -10, pos: '10% 0%' },
  { img: 'revboss', alt: 'RevBoss article quoting Ana', head: 'RevBoss', headClass: 'gf-feat-head--sans', tag: 'QUOTED', title: 'Maintaining Voice While Scaling', rot: -4, ty: 14, pos: '0% 45%' },
  { img: 'forbes-profile', alt: 'Forbes Councils profile of Ana Calin', head: 'Forbes Councils', headClass: 'gf-feat-head--24', tag: 'BYLINE', tagPink: true, title: 'Forbes Business Council. Marketing group lead, 2023.', rot: 2, ty: -4, pos: '0% 0%' },
];

const LESSONS = [
  ['01', 'The three free routes in, and what each one costs you in time'],
  ['02', 'How to find the one number only you own'],
  ['03', 'My exact pitch emails, ready to copy'],
  ['04', "How to answer an editor's question so yours is the one they use"],
  ['05', 'How to turn a feature into subscribers instead of a number you cannot contact'],
  ['06', 'A 30-day plan and a tracker'],
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

export default function GetFeaturedLanding() {
  return (
    <div className="gf">
      {/* Nav */}
      <div className="gf-nav">
        <div className="gf-wrap">
          <img src={`${IMG}/logo-mark.png`} alt="how we grow" />
          <span className="gf-brand">how we grow</span>
          <span className="gf-spacer" />
          <span className="gf-eyebrow gf-eyebrow--cocoa">Get Featured · opens in October</span>
          <button type="button" className="gf-btn gf-btn--ink gf-btn--s" onClick={() => scrollToId('join-top')}>Get the head start</button>
        </div>
      </div>

      {/* Hero */}
      <section className="gf-wrap gf-hero" data-track-section="hero">
        <div className="gf-hero-copy">
          <div className="gf-eyebrow gf-eyebrow--hero"><b>Get Featured</b> · a short course on getting into the media</div>
          <h1>Six articles on Forbes.com.<br />20,134 people read them.<br /><em>I cannot contact a single one.</em></h1>
          <p className="gf-hero-lede">But there is another way. <b>And I&apos;ll show it to you.</b></p>
          <p className="gf-hero-body"><b>Get Featured</b> is a short course on getting your name into Forbes, trade press and podcasts without paying for it, and turning each feature into reputation and readers you can actually reach. Join the waitlist and you get in 48 hours before anyone else.</p>
          <div id="join-top" className="gf-card-form">
            <WaitlistForm placement="top" buttonLabel="Join the Get Featured waitlist" fine="48-hour head start. No spam. Leave any time." />
          </div>
          <div className="gf-seen">
            <span className="gf-eyebrow gf-eyebrow--cocoa">As seen in</span>
            <div className="gf-seen-box">
              <div className="gf-seen-crop">
                <img src={`${IMG}/as-seen-in.webp`} alt="Forbes, Microsoft, Entrepreneur, TechBullion, CEO Weekly, CMO Times" />
              </div>
            </div>
          </div>
        </div>
        <div className="gf-hero-photo">
          <div className="gf-hero-photo-frame">
            <img src={`${IMG}/hero.jpg`} alt="Ana Calin" />
          </div>
          <div className="gf-sticker gf-sticker--views"><b>20,134</b><span>VIEWS ON FORBES</span></div>
          <div className="gf-sticker gf-sticker--zero"><b>0</b><span>I CAN CONTACT</span></div>
          <div className="gf-photo-caption">Ana Calin · how we grow</div>
        </div>
      </section>

      {/* Story */}
      <section className="gf-story" data-track-section="story">
        <div className="gf-wrap">
          <div className="gf-story-card">
            <span className="gf-eyebrow gf-eyebrow--yellow">Forbes Business Council · 2023</span>
            <div className="gf-serif">I thought it would bring clients.<br /><em>It brought a number on a page.</em></div>
            <small>Six articles. 20,134 views. Zero emails I could send.</small>
          </div>
          <div className="gf-story-text">
            <p>I got the byline in 2023, when Forbes Business Council asked me to lead their marketing group for a year.</p>
            <p>I thought it would bring clients.</p>
            <p>It brought a number on a page.</p>
            <p>Then I worked out what a feature is actually for. It does not build your audience. <span className="gf-hl">It makes a stranger willing to look at the audience you are already building.</span></p>
            <p>That changed how I pitch.</p>
            <p>I stopped waiting to be discovered.</p>
            <p>I started using three routes that cost nothing, and I have used all three. Answering the questions editors post when they need an expert. Pitching one journalist at a time. Saying yes to podcasts.</p>
            <p>I am putting all of it into a short course called <span className="gf-hl gf-hl--pink">Get Featured.</span></p>
          </div>
        </div>
      </section>

      {/* Features fan */}
      <section className="gf-feats" data-track-section="features">
        <div className="gf-feats-head">
          <div>
            <div className="gf-eyebrow">Where the three routes took me</div>
            <h2 className="gf-h2">Bylines. Interviews.<br />Podcasts.</h2>
          </div>
          <p>Six articles on Forbes.com, and the outlets here. Every one of them came from a route that cost nothing. Hover a cover.</p>
        </div>
        <div className="gf-fan">
          {FEATURES.map((f) => (
            <div className="gf-feat" key={f.img} style={{ ['--rot' as string]: `${f.rot}deg`, ['--ty' as string]: `${f.ty}px` }}>
              <img src={`${IMG}/${f.img}.webp`} alt={f.alt} loading="lazy" style={{ objectPosition: f.pos }} />
              <div className={'gf-feat-head' + (f.headClass ? ' ' + f.headClass : '')}>{f.head}</div>
              <div className={'gf-feat-tag' + (f.tagPink ? ' gf-feat-tag--pink' : '')}>{f.tag}</div>
              <div className="gf-feat-foot">{f.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Kraft: what a feature is for */}
      <section className="gf-kraft" data-track-section="routes">
        <div className="gf-wrap">
          <div className="gf-kraft-head">
            <div>
              <div className="gf-eyebrow gf-eyebrow--ink">What a feature is for</div>
              <h2 className="gf-h2">It is not about the views <span className="gf-hl gf-hl--pink" style={{ fontWeight: 800 }}>in one place.</span></h2>
            </div>
            <div className="gf-story-text gf-kraft-text">
              <p>A feature is a door. The number on the page did not pay me. What paid me was what each one opened: the next editor who said yes, the next podcast invite, the next reader who trusted me before reading a word.</p>
              <p>And there is more than one way in. I have used three. <b>None of them cost money.</b></p>
            </div>
          </div>
          <div className="gf-stats">
            <div className="gf-stat"><b>20,134</b><span>views, on Forbes</span></div>
            <div className="gf-stat"><b className="pink">0</b><span>readers I can email</span></div>
            <div className="gf-stat gf-stat--yellow"><b>3</b><span>free routes in</span></div>
          </div>
          <div className="gf-routes">
            <div className="gf-route"><small>ROUTE 01</small><h3>Answer the editor.</h3><p>Editors post questions when they need an expert. Answer well, and yours is the quote they use.</p></div>
            <div className="gf-route"><small>ROUTE 02</small><h3>Pitch one journalist.</h3><p>One person, one email, one number only you own. Not a press release to a hundred inboxes.</p></div>
            <div className="gf-route"><small>ROUTE 03</small><h3>Say yes to podcasts.</h3><p>An hour of talking is a feature you can send people to, and the host does the introducing.</p></div>
          </div>
        </div>
      </section>

      {/* Inside + timeline */}
      <section className="gf-inside" data-track-section="inside">
        <div className="gf-wrap">
          <div className="gf-inside-copy">
            <span className="gf-eyebrow gf-eyebrow--yellow">Inside Get Featured</span>
            <h2>Six lessons.<br /><em>About an hour.</em></h2>
            <div className="gf-lessons">
              {LESSONS.map(([n, t]) => (
                <div className="gf-lesson" key={n}><span>{n}</span><span>{t}</span></div>
              ))}
            </div>
          </div>
          <div className="gf-timeline">
            <div>
              <span className="gf-eyebrow gf-eyebrow--cocoa">Timeline</span>
              <div className="gf-timeline-title" style={{ marginTop: 8 }}>It opens in October.</div>
            </div>
            <div className="gf-tl">
              <div className="gf-tl-item"><span className="gf-dot gf-dot--yellow" /><div><b>Today</b><span>You join the list. Takes twenty seconds.</span></div></div>
              <div className="gf-tl-item"><span className="gf-dot gf-dot--pink" /><div><b>October, day one</b><span>You get the door. 48 hours before anyone else.</span></div></div>
              <div className="gf-tl-item"><span className="gf-dot" /><div><b>Two days later</b><span>Substack, social, everyone else.</span></div></div>
            </div>
            <button type="button" className="gf-btn gf-btn--ink gf-btn--l gf-btn--full" onClick={() => scrollToId('join-bottom')}>Put me on the list <ArrowDown size={20} /></button>
          </div>
        </div>
      </section>

      {/* Yellow: 48 hours */}
      <section className="gf-head-start" data-track-section="head-start">
        <div className="gf-wrap">
          <div className="gf-head-start-copy">
            <span className="gf-eyebrow gf-eyebrow--cocoa">Here is what I am doing for the people on this list.</span>
            <h2>You get in <em>48 hours</em> before anyone else.</h2>
            <p>Two days before I announce it anywhere, before my Substack hears about it, before a single social post goes out.</p>
            <p>That is not for everyone. <b>Only this page.</b></p>
          </div>
          <div id="join-bottom" className="gf-card-form gf-card-form--bottom">
            <WaitlistForm placement="bottom" buttonLabel="Give me the 48-hour head start" fine="No spam. Leave any time." stacked />
          </div>
        </div>
      </section>

      {/* PS */}
      <section className="gf-ps" data-track-section="ps">
        <div className="gf-wrap">
          <div className="gf-ps-card">
            <div className="gf-avatar"><img src={`${IMG}/ana-avatar.jpg`} alt="Ana Calin" loading="lazy" /></div>
            <div>
              <div className="gf-ps-name">Ana Calin</div>
              <p className="gf-ps-text"><b>PS.</b> Before you close this tab, write down one number about your work that nobody else can claim. Years, clients, mistakes, subscribers, whatever it is. <span className="gf-hl">That number is the first line of your first pitch,</span> and most people have one and never use it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="gf-footer">
        <div className="gf-wrap">
          <a href="https://howwegrowtoday.substack.com/" target="_blank" rel="noopener noreferrer">
            <img src={`${IMG}/logo-mark.png`} alt="" />
            <b className="gf-brand">how we grow</b>
            <i>with Ana Calin</i>
          </a>
          <span className="gf-spacer" />
          <a className="gf-handle" href="https://www.instagram.com/anacalin_hwg" target="_blank" rel="noopener noreferrer">@ANACALIN_HWG</a>
        </div>
      </footer>
    </div>
  );
}
