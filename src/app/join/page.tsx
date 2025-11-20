import type { Metadata } from 'next';
import { ArrowRight, Quote, ShieldCheck, Star } from 'lucide-react';
import { WaitlistForm } from '../../../build-to-profit---workshop/components/WaitlistForm';
import { IsThisForYou } from '../../../build-to-profit---workshop/components/IsThisForYou';
import { InstructorBio } from '../../../build-to-profit---workshop/components/InstructorBio';
import { ValueStack } from '../../../build-to-profit---workshop/components/ValueStack';
import { FAQ } from '../../../build-to-profit---workshop/components/FAQ';
import type {
  ScheduleItem,
  Testimonial,
  FAQItem,
} from '../../../build-to-profit---workshop/types';
import JoinVSLPlayer from '@/components/JoinVSLPlayer';
import { MRRGraph } from '@/components/MRRGraph';
import VideoTestimonialsClone from '@/components/VideoTestimonialsClone';

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
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=120&h=120&q=80',
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

export const metadata: Metadata = {
  title:
    'Build To Profit - How to Monetize Your Newsletter & Build 6-Figure Income',
  description:
    'Build To Profit helps newsletter creators monetize—land brand deals, productize, and scale toward 6‑figure income with live sessions, templates, and proven playbooks.',
  icons: {
    icon: '/imgs/hwg-icon.webp',
    shortcut: '/imgs/hwg-icon.webp',
    apple: '/imgs/hwg-icon.webp',
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ),
  openGraph: {
    title:
      'Build To Profit - How to Monetize Your Newsletter & Build 6-Figure Income',
    description:
      'Build To Profit helps newsletter creators monetize—land brand deals, productize, and scale toward 6‑figure income with live sessions, templates, and proven playbooks.',
    siteName: 'Build To Profit',
    type: 'website',
    url: '/join',
    images: [
      {
        url: '/imgs/heroimgs/he2.webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Build To Profit - How to Monetize Your Newsletter & Build 6-Figure Income',
    description:
      'Build To Profit helps newsletter creators monetize—land brand deals, productize, and scale toward 6‑figure income with live sessions, templates, and proven playbooks.',
    images: ['/imgs/heroimgs/he2.webp'],
    site: '@howwegrow',
    creator: 'how we grow',
  },
};

const SCHEDULE_DAY_1: ScheduleItem[] = [
  {
    time: '10:00 AM - 11:00 AM',
    title: 'The Irresistible Offer System',
    description:
      'We stop the guesswork and use systems to create the perfect offer for your most profitable audience segment.',
  },
];

const SCHEDULE_DAY_2: ScheduleItem[] = [
  {
    time: '10:00 AM - 11:00 AM',
    title: 'Pricing Model & Launch Plan',
    description:
      "We create the 14-day Launch Plan along with the right Pricing Model that's GUARANTEEED to bring in sales.",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah K.',
    role: 'Newsletter Creator',
    company: '$3,200 in first 14 days',
    content:
      'I made $3,200 in my first 14 days after joining. Build to Profit ended 8 months of overthinking.',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1374',
  },
  {
    id: 2,
    name: 'Marcus T.',
    role: 'Content Strategist',
    company: '$4,500 Week 1 launch',
    content:
      "Finally launched after endless planning. Hit $4,500 Week 1. The live sessions are everything.",
    avatar:
      'https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png',
  },
  {
    id: 3,
    name: 'Tom Wilson',
    role: 'Creator Chronicles',
    company: '15K subs • $8,200/mo',
    content:
      'From zero to 15K subscribers in 8 months. The growth strategies actually work. My newsletter is now my main income source at $8,200/month.',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1374',
  },
  {
    id: 4,
    name: 'Rachel Torres',
    role: 'Business Breakthroughs',
    company: '12k subs • $5,400/mo',
    content:
      'Incredible results! I went from struggling to get 50 opens to 12,000 engaged subscribers and $5,400 monthly revenue. Life-changing program!',
    avatar:
      'https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 5,
    name: 'Nate Solon',
    role: 'Creator',
    company: '$3,500 from one post',
    content:
      'Used Ana’s naming system on one post—converted $3,500 in paid subs. Taking that playbook across every launch now.',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/testimonials%2F417f5f06-d7a0-44b8-818e-e535c3ec2c55%2Fattached?alt=media&token=daf7c28f-d537-4943-a21d-585db796f083&_w=1000&_h=667',
  },
  {
    id: 6,
    name: 'Jake Martinez',
    role: 'Finance Weekly',
    company: '5k subs • $2,800/mo',
    content:
      'Stuck at 200 subscribers for months. After applying this system, hit 5,000 subscribers and $2,800/month in just 90 days.',
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const EXTRA_TESTIMONIALS: Testimonial[] = [
  {
    id: 7,
    name: 'Lisa Chen',
    role: 'Health & Wellness Hub',
    company: '$6,500 first month',
    content:
      'The monetization frameworks are pure gold. I launched my premium tier and made $6,500 in the first month. This program pays for itself!',
    avatar:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 8,
    name: 'Maria L., 847 subscribers',
    role: 'Creator',
    company: '$2,800 Week 1 • $3,100 Week 2',
    content:
      '“$2,800 in Week 1. Then $3,100 in Week 2. My list is only 847 people. You don’t need 10K subscribers.”',
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 9,
    name: 'Rachel Torres',
    role: 'Business Breakthroughs',
    company: '12k subs • $5,400/mo',
    content:
      'From struggling to get 50 opens to 12,000 engaged subscribers and $5,400 monthly revenue. Life-changing program!',
    avatar:
      'https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Is this live or pre-recorded?',
    answer:
      "This is 100% LIVE. We build together. Ana is on the call, showing you the behind-the-scenes of how she operates and answering your questions in real time.",
  },
  {
    question: 'I have a small list (under 1k). Is this for me?',
    answer:
      "Yes. In fact, it's better to implement these systems NOW before you scale. You will grow faster and monetize sooner than if you wait.",
  },
  {
    question: "What if I can't make the dates?",
    answer:
      'You get lifetime access to the HD recordings, the template library, and the community. You can implement at your own pace during that window.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Public enrollment will open at $1,997. However, waitlist members will receive a significant exclusive discount when we open doors.',
  },
  {
    question: 'What do I get before the cohort starts?',
    answer:
      'You’ll get value-packed emails from Ana that show you the behind-the-scenes of how we grow and monetize, waitlist-only discounts, and first dibs on limited seats when enrollment opens.',
  },
];

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-brand-950 text-brand-white relative overflow-x-hidden">
      {/* Background texture */}
      <div className="fixed inset-0 bg-grid-pattern bg-grid opacity-[0.15] pointer-events-none" />
      <div className="fixed top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,210,0,0.05),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex min-h-screen flex-col font-sans selection:bg-brand-lime selection:text-brand-950">
        {/* Navigation */}
        <nav className="fixed top-0 z-50 w-full border-b border-brand-800 bg-brand-950/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 md:py-6">
            <div className="text-xl font-display font-bold tracking-tighter text-white">
              BUILD<span className="text-brand-lime">2</span>PROFIT
            </div>
            <div className="hidden items-center gap-8 md:flex">
              <a
                href="#program"
                className="text-[12px] font-medium uppercase tracking-widest text-brand-grey transition-colors hover:text-white"
              >
                Program
              </a>
              <a
                href="#instructor"
                className="text-[12px] font-medium uppercase tracking-widest text-brand-grey transition-colors hover:text-white"
              >
                Ana Calin
              </a>
              <a
                href="#join-secondary"
                className="text-[12px] font-medium uppercase tracking-widest text-brand-grey transition-colors hover:text-white"
              >
                Join
              </a>
              <div className="h-4 w-px bg-brand-800" />
              <span className="rounded border border-brand-lime/20 bg-brand-lime/5 px-2 py-1 font-mono text-[12px] uppercase tracking-widest text-brand-lime">
                Waitlist Closing Dec 1
              </span>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-32 md:px-6">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Text block */}
            <div className="relative z-10 flex flex-col justify-center lg:col-span-8">
              <div className="mb-8 inline-flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand-lime" />
                <span className="font-mono text-sm uppercase tracking-widest text-brand-lime">
                  Live Offer Build & Launch Workshop
                </span>
              </div>

              <h1 className="mb-8 text-[2.8rem] font-display font-bold leading-[0.9] tracking-tighter text-white md:text-6xl lg:text-[5.2rem]">
                HOW TO GROW &amp; MONETIZE YOUR NEWSLETTER
                <br />
                BY LAUNCHING IRRESISTIBLE OFFERS THAT TURN IT INTO A <span className="text-brand-lime">CASH MACHINE.</span>
              </h1>

              <p className="mb-10 max-w-2xl text-xl font-light leading-relaxed text-brand-grey md:text-2xl">
                Stop writing for &quot;engagement&quot;. Start building a profit
                engine. Join <span className="font-medium text-white">Ana Calin</span> for 2
                days of deep implementation on launching profitable offers, monetizing your audience &amp; scaling to $5k MRR.
              </p>

              <div className="flex flex-col items-start gap-4">
                <div className="w-full">
                  <WaitlistForm requireName inline />
                </div>
                <p className="text-xs uppercase tracking-wide text-brand-grey">Waitlist Closing on Dec 1</p>
                <div className="flex items-center gap-4 text-sm text-brand-grey">
                  <div className="flex -space-x-3">
                    {HERO_AVATARS.map((avatar, idx) => (
                      <div
                        key={avatar.alt}
                        className="h-8 w-8 overflow-hidden rounded-full border-2 border-brand-950 bg-brand-800"
                      >
                        <img
                          src={avatar.src}
                          alt={avatar.alt}
                          className="h-full w-full object-cover grayscale"
                        />
                      </div>
                    ))}
                  </div>
                  <span>Join 350+ students including 12 Substack Bestsellers</span>
                </div>
              </div>
            </div>

            {/* Side stat card (no VSL for now) */}
            <div className="flex flex-col gap-6 lg:col-span-4">
              <JoinVSLPlayer />
              <div className="border border-brand-800 bg-brand-900 p-6">
                <div className="mb-1 text-4xl font-display font-bold text-white">
                  $5k<span className="text-brand-lime">+</span>
                </div>
                <p className="text-sm text-brand-grey">
                  Target Monthly Recurring Revenue for graduates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social proof ticker */}
        <div className="relative z-10 w-full border-y border-brand-800 bg-brand-900/30 py-6">
          <div className="flex animate-marquee gap-20 whitespace-nowrap opacity-60">
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className="flex items-center gap-20 text-xl font-display font-bold text-brand-white"
              >
                <span className="transition-colors duration-200 hover:text-[#ffd200]">PRODUCT HUNT #1</span>
                <span className="transition-colors duration-200 hover:text-[#7dd3fc]">HOW WE GROW TODAY</span>
                <span className="transition-colors duration-200 hover:text-[#f472b6]">SUBSTACK TOP BESTSELLER</span>
                <span className="transition-colors duration-200 hover:text-[#34d399]">INDIE HACKERS</span>
                <span className="transition-colors duration-200 hover:text-[#f97316]">FORBES COUNCIL</span>
                <span className="transition-colors duration-200 hover:text-[#a78bfa]">ENTREPRENEUR</span>
                <span className="transition-colors duration-200 hover:text-[#22d3ee]">CMO TODAY</span>
                <span className="transition-colors duration-200 hover:text-[#facc15]">MARIE CLAIRE</span>
                <span className="transition-colors duration-200 hover:text-[#60a5fa]">LINKEDIN TOP VOICE</span>
              </span>
            ))}
          </div>
        </div>

        {/* Agitation section */}
        <section className="relative z-10 bg-brand-950 px-4 py-32">
          <div className="mx-auto grid max-w-5xl items-center gap-16 md:grid-cols-2">
            <div>
              <h2 className="mb-8 text-4xl font-display font-bold leading-[0.95] text-white md:text-6xl">
                MOST CREATORS ARE <br />
                <span className="underline decoration-wavy decoration-1 underline-offset-8 text-brand-lime">
                  BROKE.
                </span>
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-brand-grey">
                They have &quot;audiences&quot; but no business. They write
                endless threads, hope for viral hits, and pray a sponsor throws
                them $500.
              </p>
              <p className="border-l-4 border-brand-lime py-2 pl-6 text-xl font-medium text-white">
                That is not a business. That is a job you can&apos;t quit.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="border border-brand-800 bg-brand-900 p-6">
                <h3 className="mb-2 flex items-center gap-2 text-white">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  The Trap
                </h3>
                <p className="text-sm text-brand-grey">
                  Optimizing for Likes and Open Rates instead of Stripe
                  Notifications.
                </p>
              </div>
              <div className="border border-brand-800 bg-brand-900 p-6">
                <h3 className="mb-2 flex items-center gap-2 text-white">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  The Burnout
                </h3>
                <p className="text-sm text-brand-grey">
                  Publishing 5x a week just to feed the algorithm, with no asset
                  to show for it.
                </p>
              </div>
              <div className="border border-brand-800 bg-brand-900 p-6">
                <h3 className="mb-2 flex items-center gap-2 text-white">
                  <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_3px_rgba(74,222,128,0.45)]" />
                  The Fix
                </h3>
                <p className="text-sm font-bold text-brand-lime">
                  Building an automated product &amp; offer ecosystem. (We do this in 2
                  days).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who this is for */}
        <IsThisForYou />

        {/* Additional testimonials (high-signal) */}
        <section className="bg-brand-950 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h3 className="mb-10 text-center font-display text-3xl font-bold text-white">
              <span className="inline-block bg-brand-lime px-3 py-1 text-brand-950">
                Results our creators report
              </span>
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {EXTRA_TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="border border-brand-800 bg-brand-900 p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-display text-sm font-bold uppercase tracking-wide text-white">
                        {t.name}
                      </div>
                      <div className="text-xs text-brand-grey">
                        {t.role} • {t.company}
                      </div>
                    </div>
                  </div>
                  <p className="text-brand-white/90 text-sm leading-relaxed">
                    “{t.content}”
                  </p>
                </div>
              ))}
            </div>

            {/* Growth graph */}
            <div className="mt-12">
              <MRRGraph />
            </div>
          </div>
        </section>

        {/* Curriculum / program */}
        <section
          id="program"
          className="relative z-10 border-t border-brand-800 bg-brand-900 py-32"
        >
          <div className="absolute left-0 top-0 h-[1px] w-full opacity-30 bg-gradient-to-r from-transparent via-brand-lime to-transparent" />

          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-20 text-center">
              <span className="mb-4 block font-mono text-sm uppercase tracking-widest text-brand-lime">
                The System
              </span>
              <h2 className="text-5xl font-display font-bold text-white md:text-7xl">
                BUILD TO PROFIT
              </h2>
              <p className="mt-4 text-lg text-brand-grey">
                Two days. One hour per day. Zero fluff.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              <div className="group relative border border-brand-800 bg-brand-950 p-8 transition-colors duration-500 hover:border-brand-lime">
                <div className="absolute -top-4 left-8 transform bg-brand-lime px-4 py-1 font-display text-xl font-bold text-brand-950 shadow-lg transition-transform group-hover:rotate-0 -rotate-2">
                  DAY 01
                </div>
                <h3 className="mt-4 mb-2 text-3xl font-display font-bold text-white">
                  BUILD YOUR IRRESISTIBLE OFFER
                </h3>
                <p className="mb-10 text-brand-grey">
                  We design the offer that your audience actually wants to
                  buy. We handpick WHO from your audience is ready to buy.
                </p>

                <div className="space-y-8">
                  {SCHEDULE_DAY_1.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="pt-1 font-mono text-brand-lime whitespace-nowrap">
                        {item.time}
                        <div className="text-xs text-brand-grey">EST</div>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-brand-grey">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="group relative border border-brand-800 bg-brand-950 p-8 transition-colors duration-500 hover:border-brand-white">
                <div className="absolute -top-4 left-8 transform bg-brand-white px-4 py-1 font-display text-xl font-bold text-brand-950 shadow-lg transition-transform group-hover:rotate-0 rotate-2">
                  DAY 02
                </div>
                <h3 className="mt-4 mb-2 text-3xl font-display font-bold text-white">
                  LAUNCH, SELL, PROFIT
                </h3>
                <p className="mb-10 text-brand-grey">
                  We launch your perfectly priced offer.
                </p>

                <div className="space-y-8">
                  {SCHEDULE_DAY_2.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="pt-1 font-mono text-brand-white whitespace-nowrap">
                        {item.time}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-brand-grey">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Instructor */}
        <div id="instructor">
          <InstructorBio />
        </div>

        {/* Testimonials */}
        <section className="relative z-10 bg-brand-950 px-4 py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
              <h2 className="max-w-xl text-4xl font-display font-bold text-white md:text-5xl">
                DON&apos;T TAKE MY WORD FOR IT. <br />
                <span className="text-brand-lime">RESULTS ONLY.</span>
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex text-brand-lime">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <span className="font-mono text-sm text-white">5.0/5 RATING</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="group relative border border-brand-800 bg-brand-900 p-8 transition-transform duration-300 hover:-translate-y-1"
                >
                  <Quote className="absolute right-6 top-6 h-8 w-8 text-brand-800 transition-colors group-hover:text-brand-lime/20" />
                  <p className="relative z-10 mb-8 text-lg font-light leading-relaxed text-brand-white/90">
                    &quot;{t.content}&quot;
                  </p>
                  <div className="flex items-center gap-4 border-t border-brand-800 pt-6">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-10 w-10 rounded-full grayscale transition-all group-hover:grayscale-0"
                    />
                    <div>
                      <div className="font-display text-sm font-bold uppercase tracking-wide text-white">
                        {t.name}
                      </div>
                      <div className="text-xs text-brand-grey">
                        {t.role}, {t.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value stack & CTA */}
        <ValueStack />

        {/* Final CTA */}
        <section
          id="join-secondary"
          className="relative z-10 flex justify-center bg-brand-900 px-4 py-20"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />

          <div className="relative z-10 w-full max-w-lg text-center">
            <h3 className="mb-4 text-4xl font-display font-bold text-white">
              Join The Waitlist
            </h3>
            <p className="mb-8 text-brand-grey">
              The December cohort is capped at 50 students. Be the first to know
              when doors open and unlock exclusive discounts.
            </p>
            <WaitlistForm variant="footer" requireName />
            <div className="mt-8 flex items-center justify-center gap-6 opacity-50 grayscale">
              <ShieldCheck className="h-6 w-6 text-brand-grey" />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                alt="Stripe"
                className="h-6 invert"
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="relative z-10 border-t border-brand-800 bg-brand-950 px-4 py-24"
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center font-display text-3xl font-bold text-white">
              QUESTIONS?
            </h2>
            <FAQ items={FAQ_ITEMS} />
          </div>
        </section>

        {/* Video testimonials (cloned from main page) */}
        <VideoTestimonialsClone />

        {/* Footer */}
        <footer className="relative z-10 border-t border-brand-800 bg-brand-950 px-4 py-12">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
            <div className="text-center md:text-left">
              <div className="mb-2 text-2xl font-display font-bold tracking-tight text-white">
                BUILD<span className="text-brand-lime">2</span>PROFIT
              </div>
              <p className="text-xs text-brand-800">
                &copy; 2025 Ana Calin Media. All rights reserved.
              </p>
            </div>

              <div className="flex gap-8 font-mono text-sm uppercase tracking-wider text-brand-grey">
                <a href="#" className="transition-colors hover:text-brand-lime">
                  Terms
                </a>
                <a href="#" className="transition-colors hover:text-brand-lime">
                  Privacy
                </a>
              <a href="https://howwegrowtoday.substack.com/" className="transition-colors hover:text-brand-lime">
                Substack
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
