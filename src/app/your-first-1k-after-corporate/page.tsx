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

      <div className="relative z-10 mx-auto max-w-[1000px]">
        <span className="mb-8 inline-block rounded-full bg-[#ffc300] px-6 py-2 text-[13px] font-bold uppercase tracking-[2px] text-[#1a1a1a]">
          Live Workshop · Tuesday
        </span>

        <h1 className="mb-6 font-playfair text-[clamp(36px,6vw,64px)] font-black leading-[1.1] text-[#1a1a1a]">
          You don&apos;t need another plan.
          <br />
          You don&apos;t need permission.
          <br />
          <em className="italic text-[#f72585]">You need one decision.</em>
        </h1>

        <p className="mx-auto mb-10 max-w-[600px] text-xl leading-relaxed text-[#6b7280]">
          Corporate taught you to analyse, prepare, and wait for approval before
          you act. That&apos;s why you&apos;re still stuck. This workshop is the
          decision that starts everything.
        </p>

        <Image
          src="/imgs/your-first-1k-after-corporate/hero1.jpeg"
          alt="Your First $1K After Corporate — workshop bundle with Ana Calin"
          width={800}
          height={450}
          className="mx-auto mb-10 block w-full max-w-[900px] rounded-xl object-contain"
          priority
        />

        <CtaButton sub="60 minutes. Live + replay. This Tuesday.">
          I&apos;M MAKING THE DECISION
        </CtaButton>
      </div>
    </section>
  )
}

function PermissionMirrorSection() {
  return (
    <section className="px-5 pb-3 pt-20">
      <div className="mx-auto max-w-[700px] text-[19px] leading-[2]">
        <p className="mb-8">Someone messaged me this week about this workshop.</p>

        <p className="mb-8">
          She was interested. She said my emails hit home. She said the Sunday
          scaries were eating her alive. She said she was afraid of AI taking her
          job every single day.
        </p>

        <p className="mb-8">
          Then she asked me 4 follow-up questions. Then she asked if she could
          ask more questions after. Then she raised a concern. Then she went
          quiet.
        </p>

        <p className="mb-8">
          I&apos;ve seen this pattern a hundred times.{' '}
          <strong>Because I lived it.</strong>
        </p>

        <p className="mb-8 font-playfair text-[24px] font-black leading-[1.4]">
          This is what corporate does to you.
        </p>

        <p className="mb-8">
          It trains you to investigate every angle before you move. To get
          approval before you act. To build a deck about the decision before you
          make the decision. To run it by your manager, your manager&apos;s
          manager, and legal.
        </p>

        <p className="mb-4">
          And then you bring that exact same behaviour into your own life:
        </p>

        <div className="mb-8 space-y-3 pl-2 text-[18px]">
          <p>
            <span className="mr-2 text-[#ffc300]">→</span> You want to leave.
            But first you need to research every possible path.
          </p>
          <p>
            <span className="mr-2 text-[#ffc300]">→</span> You want to start
            something. But first you need to know if it&apos;ll work.
          </p>
          <p>
            <span className="mr-2 text-[#ffc300]">→</span> You want to join a
            workshop. But first you need 6 questions answered and someone to tell
            you it&apos;s okay.
          </p>
        </div>

        <p className="mb-8">
          <strong className="text-[#f72585]">
            You don&apos;t have a motivation problem. You have a permission
            problem.
          </strong>
        </p>

        <p className="mb-8">
          Corporate taught you that action without approval is dangerous. That
          moving without certainty is reckless. That the smart thing to do is
          wait, analyse, prepare.
        </p>

        <p className="mb-8">
          So that&apos;s what you do. You prepare. You research. You think about
          it.
        </p>

        <p className="mb-12 font-playfair text-[24px] font-black leading-[1.4]">
          And nothing changes.
        </p>

        {/* quote block */}
        <div className="mb-12 space-y-6 rounded-2xl bg-[#1a1a1a] px-8 py-10 text-white sm:px-12">
          <div>
            <p className="mb-3 text-[17px] italic leading-[1.8] text-[#ccc]">
              &ldquo;You&apos;re still thinking in corporate terms.
              Overthinking. If you want to succeed at this, you have to get out
              of the decision fatigue circle. Stop trying to analyse every angle.
              That&apos;s what they taught you in corporate. To scrutinise. To
              post-mortem. To war-room. And eventually make 10 presentations
              about it. Don&apos;t.&rdquo;
            </p>
            <p className="text-sm font-bold text-[#ffc300]">— What I told her</p>
          </div>
          <div className="border-t border-white/10 pt-6">
            <p className="mb-3 text-[17px] italic leading-[1.8] text-[#ccc]">
              &ldquo;You&apos;re absolutely right. I&apos;m incredibly prone to
              overthinking and I&apos;m overthinking the hell out of
              this.&rdquo;
            </p>
            <p className="text-sm font-bold text-[#ffc300]">
              — What she replied
            </p>
          </div>
        </div>

        <p className="text-[19px] leading-[2]">
          She is. And if you clicked the link to get here, you probably are too.
          This workshop exists for exactly that moment. The moment where you stop
          researching and start moving.
        </p>
      </div>
    </section>
  )
}

function BridgeSection() {
  return (
    <section className="bg-[#fffdf5] px-5 py-20">
      <div className="mx-auto max-w-[780px]">
        <Divider />

        {/* photo + heading */}
        <div className="mb-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">
          <div className="shrink-0">
            <Image
              src="/imgs/ana-calin.jpg"
              alt="Ana Calin"
              width={140}
              height={140}
              className="rounded-full border-[3px] border-[#ffc300] object-cover"
            />
          </div>
          <div>
            <h2 className="mb-4 font-playfair text-[clamp(28px,4vw,44px)] font-black leading-[1.2]">
              I was{' '}
              <em className="font-playfair italic text-[#f72585]">exactly</em>{' '}
              where you are.
            </h2>
            <p className="text-lg leading-[1.8]">
              15 years in corporate marketing. Amsterdam, San Francisco, London.
            </p>
          </div>
        </div>

        {/* story */}
        <div className="text-lg leading-[1.9]">
          <p className="mb-6">
            I could build a 47-slide strategy deck in my sleep. I could present
            risk assessments to a boardroom without breaking a sweat. But when it
            came to starting something for myself? I froze.
          </p>
          <p className="mb-6">
            Because nobody was going to approve it. Nobody was going to
            greenlight it. Nobody was going to schedule a kickoff meeting and
            assign me a project manager.
          </p>
          <p className="mb-6">
            It was just me. And a blank page. And a voice in my head saying
            &ldquo;but what if it doesn&apos;t work?&rdquo;
          </p>
          <p className="mb-8">
            You know what finally moved me? Not more research. Not a better plan.{' '}
            <strong className="text-[#f72585]">A decision.</strong> One imperfect
            decision.
          </p>
        </div>

        {/* stats */}
        <div className="mb-10 space-y-4 rounded-2xl bg-[#1a1a1a] px-8 py-8 text-white sm:px-12">
          <div className="flex items-baseline gap-3">
            <span className="shrink-0 font-playfair text-2xl font-black text-[#ffc300]">
              3 months later:
            </span>
            <span className="text-lg text-[#ccc]">Substack Bestseller</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="shrink-0 font-playfair text-2xl font-black text-[#ffc300]">
              12 months later:
            </span>
            <span className="text-lg text-[#ccc]">$119K/month</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="shrink-0 font-playfair text-2xl font-black text-[#ffc300]">
              Today:
            </span>
            <span className="text-lg text-[#ccc]">
              $3,000/day average, writing from my couch while Eva plays next to
              me
            </span>
          </div>
        </div>

        <p className="text-center font-playfair text-[24px] font-black leading-[1.4]">
          Same corporate skills. Different beneficiary.{' '}
          <em className="italic text-[#f72585]">Me.</em>
        </p>
      </div>
    </section>
  )
}

function ModulesSection() {
  const modules = [
    {
      title:
        "You'll find the skill you're sitting on that's worth $1K",
      desc: "Every corporate career has a monetisable skill hidden inside it. Marketing. Strategy. Operations. Writing. Finance. Project management. You'll identify yours in the first 10 minutes. Most people say this moment alone changes everything, because they stop asking 'what would I even sell?'",
    },
    {
      title:
        "You'll see why a newsletter is the fastest vehicle for career changers",
      desc: "Not a course. Not coaching. Not an app. Not social media. I'll show you why newsletters beat every other option for someone leaving corporate, and exactly which format gets you paid fastest with the smallest audience.",
    },
    {
      title: "You'll get the 90-day sprint to your first $1K",
      desc: "Week by week. What to write. What to sell. How to price it. When to flip from free to paid. This is the core of the workshop. Not theory. Not 'here are some principles.' A calendar with tasks. The same system I used. The same one my students use.",
    },
    {
      title: "You'll hear the 5 lies that are keeping you stuck",
      desc: "The stories every corporate person tells themselves that prevent them from ever starting. I believed all 5. They almost cost me everything. The reframes in this section will feel like someone turned a light on in a room you've been sitting in for years.",
    },
    {
      title:
        "You'll get live Q&A where I tell you exactly what I'd build if I were you",
      desc: "Bring your background. Bring your questions. I'll look at your specific situation and tell you what I'd do. No gatekeeping. This part only happens live. It doesn't exist on the replay.",
    },
  ]

  return (
    <section className="bg-[#1a1a1a] px-5 py-20 text-white">
      <div className="mx-auto max-w-[780px]">
        <Divider />
        <h2 className="mb-6 font-playfair text-[clamp(28px,4vw,44px)] font-black leading-[1.2] text-white">
          What happens on Tuesday
        </h2>
        <p className="mb-2 text-[#aaa]">
          60 minutes. No slides with 47 bullet points. No corporate agenda. Just
          the system.
        </p>

        <ul className="my-8 list-none p-0">
          {modules.map((m) => (
            <li
              key={m.title.slice(0, 20)}
              className="border-b border-white/10 py-6"
            >
              <h4 className="mb-2 font-dm-sans text-lg font-bold text-white">
                {m.title}
              </h4>
              <p className="m-0 text-[15px] leading-[1.7] text-[#aaa]">
                {m.desc}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <CtaButton>I&apos;M IN THE ROOM ON TUESDAY</CtaButton>
        </div>
      </div>
    </section>
  )
}

function WhoSection() {
  const items = [
    {
      title:
        "You're still in corporate and the Sunday night knot won't go away",
      desc: "You've been told it's normal. It's not.",
    },
    {
      title: 'You just left and the clock is ticking',
      desc: "You need a system that generates revenue in weeks, not months. Not another course to 'think about.' An action plan you execute starting Wednesday morning.",
    },
    {
      title: "You started something but it's not making money yet",
      desc: "You've been posting, writing, showing up — but your bank account doesn't reflect your effort. I'll show you what's missing.",
    },
    {
      title:
        "You've been overthinking this for months and you know it",
      desc: "You have 14 browser tabs open about side hustles. You've read more about this than 95% of people who are actually doing it. What you need isn't more information. It's a decision. This is the decision.",
    },
  ]

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-[780px]">
        <Divider />
        <h2 className="mb-4 font-playfair text-[clamp(28px,4vw,44px)] font-black leading-[1.2]">
          This is for the person who&apos;s done thinking about it.
        </h2>
        <p className="mb-6 text-lg text-[#6b7280]">
          Not &ldquo;interested.&rdquo; Not &ldquo;considering it.&rdquo; Done
          thinking. Ready to move.
        </p>
        <ul className="my-8 list-none p-0">
          {items.map((item) => (
            <li
              key={item.title.slice(0, 20)}
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


function BonusesSection() {
  const bonuses = [
    {
      tag: 'Bonus #1',
      title: 'The Corporate Skill Audit',
      desc: "The exact exercise I use to help people find their monetisable skill in 15 minutes. You'll know what you're building before the workshop is half over.",
    },
    {
      tag: 'Bonus #2',
      title: 'The First Week Action Plan',
      desc: "What to do on Wednesday, Thursday, Friday, Saturday, and Sunday after the workshop. Five days. Five tasks. No ambiguity. No 'figure it out yourself.'",
    },
    {
      tag: 'Bonus #3',
      title: 'The 90-Day Sprint Calendar',
      desc: 'The week-by-week breakdown from Day 1 to $1K. What to write, when to sell, how to price it. The same system behind my first $10K month.',
    },
  ]

  return (
    <section className="px-5 pb-20 pt-4">
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
          <CtaButton>I&apos;M IN THE ROOM ON TUESDAY</CtaButton>
        </div>
      </div>
    </section>
  )
}

function DecisionBlockSection() {
  return (
    <section className="px-5 py-16">
      <div className="mx-auto max-w-[700px] rounded-2xl border-2 border-[#ffc300] bg-[#fffdf5] px-8 py-12 text-[18px] leading-[1.9] sm:px-14">
        <p className="mb-6">
          I&apos;m not going to tell you this workshop will change your life.
          I&apos;m not going to tell you you&apos;ll be a millionaire. I&apos;m
          not going to tell you it&apos;s easy.
        </p>
        <p className="mb-6">
          I&apos;m going to tell you it starts with{' '}
          <strong>one decision</strong>. Not the right decision. Not the perfect
          decision. Just a decision.
        </p>
        <p className="mb-6">
          That decision led to a newsletter. The newsletter led to Bestseller in
          3 months. The Bestseller led to $119K months. The $119K months led to
          me writing this from my couch while my daughter plays next to me.
        </p>
        <p className="font-playfair text-[22px] font-black leading-[1.4]">
          All of it started with one imperfect decision.{' '}
          <em className="italic text-[#f72585]">This workshop is yours.</em>
        </p>
      </div>
    </section>
  )
}

function FAQSection() {
  const faqs = [
    {
      q: 'When is the workshop?',
      a: "This Tuesday. When you buy, you get the time and Zoom link immediately. If you can't make it live, the full replay is included. But the live Q&A where I review your specific situation only happens once.",
    },
    {
      q: "I don't know what I'd sell. Is this still for me?",
      a: "That's literally what the first 10 minutes solve. You don't need to arrive with a product idea. You arrive with your career. I'll show you what's hiding inside it.",
    },
    {
      q: "I'm not a writer. Is this still for me?",
      a: 'Absolutely. I wasn\'t a "writer" either — I was a marketing executive. The newsletter is just the vehicle. Your expertise is the engine. I\'ll show you how to use what you already know.',
    },
    {
      q: 'Do I need to have quit my job already?',
      a: "No. In fact, many of my students start building while still employed. The 90-day sprint is designed to work alongside a full-time job. I built mine while pregnant.",
    },
    {
      q: 'I need to think about it...',
      a: "I know. That's the pattern. You've been thinking about leaving corporate for months, maybe years. You've been thinking about starting something for just as long. At some point, thinking stops being preparation and starts being avoidance. Only you know which one this is.",
    },
    {
      q: "What if it doesn't apply to my specific situation?",
      a: "That's the corporate brain talking. The system works for any professional skill. Marketing, finance, operations, writing, strategy, design, HR, project management, analytics, sales. If people get paid to do what you do at a company, people will pay to learn it from you independently.",
    },
  ]

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-[780px]">
        <Divider />
        <h2 className="mb-2 text-center font-playfair text-[clamp(28px,4vw,44px)] font-black leading-[1.2]">
          Questions you&apos;re about to overthink
        </h2>
        <p className="mb-8 text-center text-lg italic text-[#6b7280]">
          (I say that with love. I was you.)
        </p>
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
          This Tuesday. One decision.
          <br />
          <em className="italic text-[#ffc300]">No committee required.</em>
        </h2>
        <p className="mx-auto mb-10 max-w-[600px] text-lg leading-[1.8] text-[#ccc]">
          You didn&apos;t spend 15 years in corporate to wonder what&apos;s
          next. You spent 15 years building skills that are worth real money. Let
          me show you how to capture that value for yourself. 60 minutes. Live.
          The system I used. The plan you&apos;ll leave with.
        </p>

        <div className="mb-10">
          <div className="font-playfair text-7xl font-black leading-none text-white">
            $250
          </div>
          <div className="mt-2 text-sm text-[#aaa]">
            One workshop. One decision. No subscription. No upsell.
          </div>
        </div>

        <CtaButton large sub="Secure checkout via Stripe · Replay included">
          I&apos;M DONE THINKING. I&apos;M IN.
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
      <PermissionMirrorSection />
      <BridgeSection />
      <ModulesSection />
      <WhoSection />
      <BonusesSection />
      <DecisionBlockSection />
      <FAQSection />
      <FinalCtaSection />
      <FooterSection />
    </main>
  )
}
