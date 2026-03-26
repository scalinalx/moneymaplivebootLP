'use client'

import Image from 'next/image'

const STRIPE_CHECKOUT_URL =
  'https://buy.stripe.com/cNi3cv9AYgOS40gaLRc7u0t'

/* ── tiny reusable bits ─────────────────────────────────────────── */

function Divider() {
  return (
    <div className="mx-auto mb-8 h-[3px] w-[60px] rounded-full bg-[#ffc300]" />
  )
}

function CtaButton({
  children,
  gold = false,
  large = false,
  sub,
}: {
  children: React.ReactNode
  gold?: boolean
  large?: boolean
  sub?: string
}) {
  const base =
    'inline-block font-dm-sans font-bold uppercase tracking-[1.5px] rounded-lg transition-all duration-300 hover:-translate-y-0.5'
  const size = large
    ? 'text-xl px-14 py-[22px]'
    : 'text-lg px-12 py-[18px]'
  const color = gold
    ? 'bg-[#ffc300] text-[#1a1a1a] shadow-[0_4px_20px_rgba(255,195,0,.35)] hover:shadow-[0_8px_30px_rgba(255,195,0,.45)] hover:bg-[#e6b000]'
    : 'bg-[#f72585] text-white shadow-[0_4px_20px_rgba(247,37,133,.35)] hover:shadow-[0_8px_30px_rgba(247,37,133,.45)] hover:bg-[#e01f75]'

  return (
    <div>
      <a href={STRIPE_CHECKOUT_URL} className={`${base} ${size} ${color}`}>
        {children}
      </a>
      {sub && (
        <span className="mt-2.5 block text-xs font-normal tracking-normal normal-case text-[#6b7280]">
          {sub}
        </span>
      )}
    </div>
  )
}

/* ── section components ─────────────────────────────────────────── */

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#fffdf5] px-5 pb-[60px] pt-8 text-center">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -right-[100px] -top-[100px] h-[400px] w-[400px] rounded-full bg-[#ffc300] opacity-10" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-[#f72585] opacity-[0.08]" />

      <div className="relative z-10 mx-auto max-w-[800px]">
        <span className="mb-8 inline-block rounded-full bg-[#ffc300] px-6 py-2 text-[13px] font-bold uppercase tracking-[2px] text-[#1a1a1a]">
          Live Workshop
        </span>

        <h1 className="mb-6 font-playfair text-[clamp(36px,6vw,64px)] font-black leading-[1.1] text-[#1a1a1a]">
          Your First $1K
          <br />
          <em className="italic text-[#f72585]">After Corporate</em>
        </h1>

        <p className="mx-auto mb-10 max-w-[600px] text-xl leading-relaxed text-[#6b7280]">
          The exact playbook I used to replace my corporate salary — and how you
          can make your first $1,000 online in 90 days or less.
        </p>

        <Image
          src="/imgs/your-first-1k-after-corporate/hero1.jpeg"
          alt="Your First $1K After Corporate — workshop bundle with Ana Calin"
          width={800}
          height={450}
          className="mx-auto mb-10 block w-full max-w-[700px] rounded-xl object-contain"
          priority
        />

        <CtaButton sub="Instant access · Live workshop + replay included">
          YES! I&apos;M READY TO DO THIS!
        </CtaButton>
      </div>
    </section>
  )
}

function StatsSection() {
  const stats = [
    { num: '70K+', label: 'Newsletter subscribers' },
    { num: '$119K', label: 'Monthly revenue' },
    { num: '3 mo', label: 'From zero to bestseller' },
  ]
  return (
    <section className="bg-[#1a1a1a] px-5 py-20 text-white">
      <div className="mx-auto max-w-[780px]">
        <div className="mx-auto grid grid-cols-1 gap-6 text-center sm:grid-cols-3 sm:gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-playfair text-5xl font-black leading-none text-[#ffc300]">
                {s.num}
              </div>
              <div className="mt-2 text-sm text-[#aaa]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProblemSection() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-[780px]">
        <Divider />
        <h2 className="mb-6 font-playfair text-[clamp(28px,4vw,44px)] font-black leading-[1.2]">
          Let me guess...
        </h2>
        <div className="text-xl leading-[1.8]">
          <p className="mb-4">
            You&apos;ve spent{' '}
            <strong className="text-[#f72585]">15+ years</strong> building
            someone else&apos;s dream. You&apos;re good at what you do — maybe too
            good. You&apos;ve managed teams, launched products, hit every KPI they
            threw at you.
          </p>
          <p className="mb-4">
            And yet every Sunday night, you feel that knot in your stomach.
          </p>
          <p className="mb-4">
            You <em>know</em> you want out. You&apos;ve Googled &quot;how to start a
            side hustle&quot; at 11pm more times than you&apos;ll admit. You&apos;ve
            watched other women quit and build something online and thought:{' '}
            <strong className="text-[#f72585]">
              &quot;If she can do it, why can&apos;t I?&quot;
            </strong>
          </p>
          <p className="mb-4">Here&apos;s why you haven&apos;t done it yet:</p>
          <p className="mb-4">
            Because nobody showed you the{' '}
            <strong className="text-[#f72585]">actual steps</strong>. Not vague
            inspiration. Not &quot;follow your passion.&quot; Not a $6,000 coaching
            program that tells you to &quot;just post on Instagram.&quot;
          </p>
          <p>
            You need a{' '}
            <strong className="text-[#f72585]">real plan that gets you to $1K</strong>.
            That&apos;s what this workshop is.
          </p>
        </div>
      </div>
    </section>
  )
}

function BridgeSection() {
  return (
    <section className="bg-[#fffdf5] px-5 py-20 text-center">
      <div className="mx-auto max-w-[780px]">
        <Divider />
        <h2 className="mb-6 font-playfair text-[clamp(28px,4vw,44px)] font-black leading-[1.2]">
          I was{' '}
          <em className="font-playfair italic text-[#f72585]">exactly</em> where
          you are.
        </h2>
        <p className="mx-auto mb-6 max-w-[640px] text-lg">
          15 years in corporate marketing. Amsterdam, San Francisco, London. I
          had the title, the salary, the business-class flights. I also had a
          moment where I fainted in a hotel bathroom and realized:{' '}
          <strong>my body was literally telling me to stop.</strong>
        </p>
        <p className="mx-auto mb-6 max-w-[640px] text-lg">
          I quit at 35. Started a newsletter. Had my daughter Eva in my 40s.
          Within 3 months I was a Substack bestseller. Within a year I was making
          $119K/month.
        </p>
        <p className="mx-auto mb-8 max-w-[640px] text-lg">
          <strong>
            I didn&apos;t get lucky. I followed a system.
          </strong>{' '}
          And in this workshop, I&apos;m giving you that system.
        </p>
        <CtaButton gold>I NEED THIS — I&apos;M IN, ANA!</CtaButton>
      </div>
    </section>
  )
}

function ModulesSection() {
  const modules = [
    {
      num: '01',
      title: 'The Asset You Already Have (10 min)',
      desc: 'How to identify the $1K skill hiding inside your corporate career — the one people will pay for before you even have a website.',
    },
    {
      num: '02',
      title: 'The Vehicle (10 min)',
      desc: 'Why newsletters beat courses, coaching, and social media for career changers — and how to pick the exact format that gets you paid fastest.',
    },
    {
      num: '03',
      title: 'The 90-Day Sprint to $1K (30 min)',
      desc: "My week-by-week breakdown: what to write, what to sell, how to price it, and exactly when to flip the switch from free to paid. This is the core of the workshop.",
    },
    {
      num: '04',
      title: 'The 5 Lies That Kill the Transition (5 min)',
      desc: 'The stories every corporate woman tells herself that keep her stuck — and the reframes that actually work. This part alone is worth the price of admission.',
    },
    {
      num: '05',
      title: 'Live Q&A (open)',
      desc: "Bring your specific situation. I'll tell you what I'd do if I were you. No gatekeeping.",
    },
  ]

  return (
    <section className="bg-[#1a1a1a] px-5 py-20 text-white">
      <div className="mx-auto max-w-[780px]">
        <Divider />
        <h2 className="mb-6 font-playfair text-[clamp(28px,4vw,44px)] font-black leading-[1.2] text-white">
          Here&apos;s exactly what you&apos;ll learn:
        </h2>
        <p className="mb-2 text-[#aaa]">
          60 minutes of pure strategy + live Q&amp;A. No fluff. No filler.
        </p>

        <ul className="my-8 list-none p-0">
          {modules.map((m) => (
            <li
              key={m.num}
              className="flex flex-col gap-2 border-b border-white/10 py-5 sm:flex-row sm:items-start sm:gap-4"
            >
              <div className="w-auto shrink-0 text-left font-playfair text-[32px] font-black leading-none text-[#ffc300] sm:w-[50px] sm:text-center">
                {m.num}
              </div>
              <div>
                <h4 className="mb-1 font-dm-sans text-lg font-bold text-white">
                  {m.title}
                </h4>
                <p className="m-0 text-[15px] text-[#aaa]">{m.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <CtaButton>I&apos;M READY — LET&apos;S GO!</CtaButton>
        </div>
      </div>
    </section>
  )
}

function WhoSection() {
  const items = [
    {
      title: "You're still in corporate but planning your exit",
      desc: 'You want to build something on the side before you hand in your resignation. Smart. This gives you the roadmap.',
    },
    {
      title: 'You just left and need to make money NOW',
      desc: "The clock is ticking. You need a plan that generates revenue in weeks, not months. This is that plan.",
    },
    {
      title: "You started something but it's not making money yet",
      desc: "You've been posting, writing, showing up — but your bank account doesn't reflect your effort. I'll show you what's missing.",
    },
  ]

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-[780px]">
        <Divider />
        <h2 className="mb-6 font-playfair text-[clamp(28px,4vw,44px)] font-black leading-[1.2]">
          This workshop is for you if...
        </h2>
        <ul className="my-8 list-none p-0">
          {items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-2 border-b border-black/[0.08] py-5 sm:flex-row sm:items-start sm:gap-4"
            >
              <div className="w-auto shrink-0 text-left font-playfair text-2xl font-black text-[#ffc300] sm:w-[50px] sm:text-center">
                →
              </div>
              <div>
                <h4 className="mb-1 font-dm-sans text-lg font-bold">
                  {item.title}
                </h4>
                <p className="m-0 text-[15px] text-[#6b7280]">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "I went from zero subscribers to my first paid subscriber in under 2 weeks following Ana's method. The 90-day sprint framework gave me clarity I'd been missing for months.",
      name: '— Workshop Student',
    },
    {
      quote:
        "Ana doesn't sell you a dream — she gives you the spreadsheet. I made my first $500 within 30 days of taking her workshop and I hadn't even quit my job yet.",
      name: '— Workshop Student',
    },
    {
      quote:
        "After 12 years in corporate finance, I was terrified to start. Ana's workshop made it feel not just possible but obvious. I'm now at $3,200/month and growing.",
      name: '— Workshop Student',
    },
  ]

  return (
    <section className="bg-[#fffdf5] px-5 py-20">
      <div className="mx-auto max-w-[780px]">
        <Divider />
        <h2 className="mb-6 text-center font-playfair text-[clamp(28px,4vw,44px)] font-black leading-[1.2]">
          What students are saying
        </h2>
        {testimonials.map((t) => (
          <div
            key={t.name + t.quote.slice(0, 20)}
            className="my-8 rounded-2xl border-l-4 border-[#ffc300] bg-[#fffdf5] p-10 shadow-sm"
          >
            <p className="mb-3 text-lg italic leading-[1.7]">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="text-sm font-bold not-italic text-[#f72585]">
              {t.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function BonusesSection() {
  const bonuses = [
    {
      tag: 'Bonus #1',
      title: 'The Bestseller Blueprint',
      desc: 'The exact growth strategy I used to hit Substack Bestseller in 3 months. Step-by-step, week-by-week.',
    },
    {
      tag: 'Bonus #2',
      title: 'Full Workshop Replay',
      desc: "Can't make it live? No problem. You get lifetime access to the recording so you can watch (and re-watch) on your schedule.",
    },
    {
      tag: 'Bonus #3',
      title: 'The $3,000 Email Template',
      desc: 'The exact email structure that generates $3,000+ every time I send it. Copy it. Customize it. Send it.',
    },
  ]

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-[780px]">
        <Divider />
        <h2 className="mb-6 text-center font-playfair text-[clamp(28px,4vw,44px)] font-black leading-[1.2]">
          Plus these bonuses (included free):
        </h2>

        <Image
          src="/imgs/your-first-1k-after-corporate/hero2.jpeg"
          alt="Workshop video, quick start guides, and resources included"
          width={780}
          height={440}
          className="mx-auto mb-10 block w-full rounded-xl object-contain"
        />

        {bonuses.map((b) => (
          <div
            key={b.tag}
            className="my-5 rounded-xl border border-black/5 bg-white p-8 shadow-[0_2px_16px_rgba(0,0,0,.06)]"
          >
            <span className="mb-3 inline-block rounded-full bg-[#ffc300] px-3.5 py-1 text-xs font-bold uppercase tracking-[1.5px] text-[#1a1a1a]">
              {b.tag}
            </span>
            <h3 className="mb-4 font-playfair text-2xl font-bold">{b.title}</h3>
            <p className="mb-0">{b.desc}</p>
          </div>
        ))}

        <div className="mt-10 text-center">
          <CtaButton gold>YES! GIVE ME EVERYTHING!</CtaButton>
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section className="bg-[#fffdf5] px-5 py-20 text-center">
      <div className="mx-auto max-w-[780px]">
        <Divider />
        <h2 className="mb-6 font-playfair text-[clamp(28px,4vw,44px)] font-black leading-[1.2]">
          Let&apos;s talk investment.
        </h2>
        <p className="mx-auto mb-8 max-w-[600px] text-lg text-[#6b7280]">
          This workshop contains the same strategies I teach in programs that
          cost 6x more. I priced it so that the only thing standing between you
          and your first $1K is a decision.
        </p>

        <div className="mx-auto max-w-[560px] rounded-[20px] border-2 border-[#ffc300] bg-white px-6 py-12 text-center shadow-[0_8px_40px_rgba(0,0,0,.08)] sm:px-12">
          <div className="mb-1 text-2xl text-[#6b7280] line-through">$497</div>
          <div className="font-playfair text-7xl font-black leading-none text-[#1a1a1a]">
            $250
          </div>
          <div className="mb-8 mt-2 text-sm text-[#6b7280]">
            One-time payment · No subscription · No upsell
          </div>
          <CtaButton>I&apos;M IN — BOOK MY SEAT!</CtaButton>
          <span className="mt-4 block text-xs text-[#6b7280]">
            Secure checkout via Stripe
          </span>
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const faqs = [
    {
      q: 'When is the workshop?',
      a: "The live session is March 31st. When you purchase, you'll receive the exact time and Zoom link immediately. If you can't make it live, the full replay is included.",
    },
    {
      q: "I'm not a writer. Is this still for me?",
      a: 'Absolutely. I wasn\'t a "writer" either — I was a marketing executive. The newsletter is just the vehicle. Your expertise is the engine. I\'ll show you how to use what you already know.',
    },
    {
      q: 'Do I need to have quit my job already?',
      a: "No. In fact, many of my students start building while still employed. The 90-day sprint is designed to work alongside a full-time job.",
    },
    {
      q: '$250 feels like a lot right now...',
      a: "I understand. Here's how I think about it: you're learning a system designed to make you $1,000. That's a 4x return on a single workshop. And you'll use this system over and over.",
    },
    {
      q: "What if I already have a newsletter but it's not making money?",
      a: "Perfect — you're actually ahead. Module 3 (The 90-Day Sprint) will show you exactly where the money is hiding in your existing audience. Most people are closer than they think.",
    },
  ]

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-[780px]">
        <Divider />
        <h2 className="mb-6 text-center font-playfair text-[clamp(28px,4vw,44px)] font-black leading-[1.2]">
          Common questions
        </h2>
        {faqs.map((f) => (
          <div
            key={f.q}
            className="border-b border-black/[0.08] py-6"
          >
            <div className="mb-2 text-[17px] font-bold">{f.q}</div>
            <div className="text-[15px] leading-[1.7] text-[#6b7280]">
              {f.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function FinalCtaSection() {
  return (
    <section className="bg-gradient-to-br from-[#1a1a1a] to-[#2d1b3d] px-5 py-[100px] text-center text-white">
      <div className="mx-auto max-w-[780px]">
        <h2 className="mb-6 font-playfair text-[clamp(28px,4vw,44px)] font-black leading-[1.2] text-white">
          You didn&apos;t spend 15 years in corporate
          <br />
          to <em className="italic text-[#ffc300]">wonder</em> what&apos;s next.
        </h2>
        <p className="mx-auto mb-10 max-w-[560px] text-lg text-[#ccc]">
          You spent 15 years building skills that are worth real money. Let me
          show you how to turn them into your first $1K — and then keep going.
        </p>
        <CtaButton large sub="Join the workshop · Instant access · Replay included">
          YES! I&apos;M DOING THIS!
        </CtaButton>
      </div>
    </section>
  )
}

function FooterSection() {
  return (
    <footer className="bg-[#1a1a1a] px-5 py-8 text-center text-[13px] text-[#666]">
      <p>
        &copy; 2026 Ana Calin · How We Grow ·{' '}
        <a
          href="https://howwegrowtoday.substack.com"
          className="text-[#ffc300] no-underline"
        >
          howwegrowtoday.substack.com
        </a>
      </p>
    </footer>
  )
}

/* ── page ───────────────────────────────────────────────────────── */

export default function YourFirst1KAfterCorporatePage() {
  return (
    <main className="min-h-screen bg-white font-dm-sans text-[#1a1a1a] antialiased [line-height:1.7]">
      <HeroSection />
      <StatsSection />
      <ProblemSection />
      <BridgeSection />
      <ModulesSection />
      <WhoSection />
      <TestimonialsSection />
      <BonusesSection />
      <PricingSection />
      <FAQSection />
      <FinalCtaSection />
      <FooterSection />
    </main>
  )
}
