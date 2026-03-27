'use client'

import { useState, useRef } from 'react'

/* ── types ──────────────────────────────────────────────────────── */

interface Concept {
  type: string
  suggestedPrice?: string
  description: string
  transformation: string
  titleOptions: string[]
}

interface MarketResearch {
  summary: string
  trendingProducts: string[]
}

interface Bucket {
  routeName: string
  routeSummary?: string
  concepts: Concept[]
  marketResearch: MarketResearch
}

interface Results {
  buckets: Bucket[]
}

/* ── spectrum bar ───────────────────────────────────────────────── */

function SpectrumBar() {
  return (
    <div className="mx-auto mt-6 max-w-[875px]">
      <div className="mr-[8%] flex items-center justify-end gap-0">
        <span className="text-sm font-bold italic text-[#1a1a1a]">
          Viral Zone
        </span>
        <span className="text-[10px] leading-none text-[#1a1a1a]">▼</span>
      </div>
      <div className="h-12 w-full rounded-full bg-gradient-to-r from-[#e74c3c] via-[#e67e22] via-35% via-[#f1c40f] via-60% to-[#2ecc71] shadow-md" />
    </div>
  )
}

/* ── form card ──────────────────────────────────────────────────── */

function FormCard({
  accomplishments,
  setAccomplishments,
  passions,
  setPassions,
  profession,
  setProfession,
  onSubmit,
  loading,
}: {
  accomplishments: string
  setAccomplishments: (v: string) => void
  passions: string
  setPassions: (v: string) => void
  profession: string
  setProfession: (v: string) => void
  onSubmit: () => void
  loading: boolean
}) {
  return (
    <div className="mx-auto mt-10 max-w-[960px] rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
      {/* Section 1 */}
      <div className="mb-2 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e91e90] text-sm font-bold text-white">
          1
        </span>
        <h2 className="font-lora text-2xl italic text-[#2ec4a0]">
          Let&apos;s start here:
        </h2>
      </div>

      <label className="mb-2 mt-4 block font-lora text-[15px] font-bold text-[#1a1a1a]">
        What are some things you&apos;ve accomplished, problems you&apos;ve
        personally solved, or things you&apos;ve overcome?{' '}
        <span className="text-[#e91e90]">*</span>{' '}
        <span
          className="inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full bg-[#3bbfed] text-[11px] font-bold text-white"
          title="Think about skills, wins, or transformations from your life — personal or professional."
        >
          i
        </span>
      </label>
      <textarea
        value={accomplishments}
        onChange={(e) => setAccomplishments(e.target.value)}
        rows={4}
        placeholder="e.g. paid off $12k in debt on a teacher's salary, got my kid sleeping through the night, healed my skin without a dermatologist"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[15px] text-gray-700 placeholder:text-gray-400 focus:border-[#2ec4a0] focus:outline-none focus:ring-2 focus:ring-[#2ec4a0]/30"
      />

      <div className="my-8 border-t-2 border-dashed border-gray-300" />

      {/* Section 2 */}
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e91e90] text-sm font-bold text-white">
          2
        </span>
        <h2 className="font-lora text-2xl italic text-[#2ec4a0]">
          A little more about you:
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block font-lora text-[15px] font-bold text-[#1a1a1a]">
            What could you talk about for hours?
          </label>
          <input
            type="text"
            value={passions}
            onChange={(e) => setPassions(e.target.value)}
            placeholder="e.g. gut health, budgeting, dog training"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[15px] text-gray-700 placeholder:text-gray-400 focus:border-[#2ec4a0] focus:outline-none focus:ring-2 focus:ring-[#2ec4a0]/30"
          />
        </div>
        <div>
          <label className="mb-1.5 block font-lora text-[15px] font-bold text-[#1a1a1a]">
            Your Profession or Expertise
          </label>
          <input
            type="text"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            placeholder="e.g. pediatric nurse, high school teacher"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[15px] text-gray-700 placeholder:text-gray-400 focus:border-[#2ec4a0] focus:outline-none focus:ring-2 focus:ring-[#2ec4a0]/30"
          />
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-gradient-to-r from-[#f472b6] to-[#ec4899] py-4 text-[22px] font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generating your viral product ideas...
          </span>
        ) : (
          '✨ Generate My Viral Product Ideas'
        )}
      </button>
    </div>
  )
}

/* ── results display (matching reference screenshots) ───────────── */

function ResultsSection({
  results,
  onStartOver,
  onSelectConcept,
}: {
  results: Results
  onStartOver: () => void
  onSelectConcept: (routeName: string, concept: Concept) => void
}) {
  const [activeTab, setActiveTab] = useState(0)
  const [openResearch, setOpenResearch] = useState(false)

  const bucket = results.buckets[activeTab]

  return (
    <div className="mx-auto mt-10 max-w-[960px]">
      {/* Celebratory header */}
      <div className="text-center">
        <h2
          className="font-anton text-[clamp(24px,4vw,48px)] font-normal uppercase leading-[1.15] tracking-[1px] text-[#e91e90]"
        >
          You&apos;ve accomplished some great things!
        </h2>
        <div className="mt-1 text-4xl">🤩</div>
        <p className="mt-3 text-[15px] italic text-gray-500">
          You can definitely create a viral digital product out of everything you&apos;ve done.
        </p>
      </div>

      {/* Choose route header */}
      <div className="mt-10 flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#1a1a1a]">
          Choose your route below:
        </h3>
        <button
          onClick={onStartOver}
          className="rounded-full border border-gray-300 px-5 py-2 text-sm text-gray-500 transition-colors hover:border-[#e91e90] hover:text-[#e91e90]"
        >
          &larr; Start Over
        </button>
      </div>

      {/* Route tabs */}
      <div className="mt-6 flex flex-wrap gap-3">
        {results.buckets.map((b, bi) => (
          <button
            key={bi}
            onClick={() => { setActiveTab(bi); setOpenResearch(false) }}
            className={`rounded-full px-6 py-3 text-[15px] font-bold transition-all ${
              bi === activeTab
                ? 'bg-[#7BC74D] text-white shadow-sm'
                : 'border-2 border-[#e91e90] bg-white text-[#e91e90]'
            }`}
          >
            {b.routeName}
          </button>
        ))}
      </div>

      {/* Active bucket content */}
      {bucket && (
        <div className="mt-6">
          {/* Route summary */}
          {bucket.marketResearch?.summary && (
            <p className="text-sm italic text-gray-400">
              {bucket.marketResearch.summary}
            </p>
          )}

          {/* Concept cards */}
          {bucket.concepts.map((concept, ci) => (
            <div
              key={ci}
              className="mt-4 rounded-xl border-l-4 border-[#4DB8BA] bg-white px-8 py-6 shadow-sm"
            >
              {/* Description */}
              <p className="text-[15px] font-bold text-[#1a1a1a]">
                {concept.description}
              </p>

              {/* Badges */}
              <div className="mt-3 flex flex-wrap gap-2">
                {concept.suggestedPrice && (
                  <span className="rounded-full border border-gray-300 bg-white px-4 py-1 text-xs font-bold text-[#1a1a1a]">
                    Suggested Price: {concept.suggestedPrice}
                  </span>
                )}
                <span className="rounded-full border border-gray-300 bg-white px-4 py-1 text-xs font-bold text-[#1a1a1a]">
                  Suggested Format: {concept.type}
                </span>
              </div>

              {/* Title ideas */}
              <p className="mb-3 mt-5 text-xs font-bold uppercase tracking-[2px] text-[#e91e90]">
                Possible Title Ideas
              </p>
              <div className="space-y-0">
                {concept.titleOptions.map((title, ti) => (
                  <div
                    key={ti}
                    className={`flex items-center gap-3 rounded px-4 py-3 ${
                      ti % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <span className="text-sm font-bold text-[#2ec4a0]">
                      {ti + 1}.
                    </span>
                    <span className="text-sm text-[#1a1a1a]">{title}</span>
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <div className="mt-5 text-center">
                <button
                  onClick={() => onSelectConcept(bucket.routeName, concept)}
                  className="inline-block rounded-lg bg-[#e91e90] px-8 py-3 text-[18px] font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  ✅ I choose this as my product idea [Take me to the next step &rarr;]
                </button>
              </div>
            </div>
          ))}

          {/* Market research expandable */}
          {bucket.marketResearch && (
            <div className="mt-4">
              <button
                onClick={() => setOpenResearch(!openResearch)}
                className="w-full rounded-lg bg-[#4DB8BA] px-6 py-3 text-center text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#3ea8aa]"
              >
                🔍 What&apos;s Already Selling in This Niche:{' '}
                {openResearch ? '▲' : '▼'}
              </button>
              {openResearch && (
                <div className="mt-2 rounded-lg bg-[#4DB8BA]/10 px-6 py-4">
                  <p className="mb-3 text-sm text-[#1a1a1a]">
                    {bucket.marketResearch.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {bucket.marketResearch.trendingProducts.map(
                      (product, pi) => (
                        <span
                          key={pi}
                          className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#1a1a1a] shadow-sm"
                        >
                          🔥 {product}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ── upsell section ────────────────────────────────────────────── */

interface SelectedConcept {
  routeName: string
  concept: Concept
}

function UpsellSection({
  selected,
  onBack,
}: {
  selected: SelectedConcept
  onBack: () => void
}) {
  const { routeName, concept } = selected

  return (
    <div className="mx-auto mt-10 max-w-[960px]">
      {/* Header */}
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[3px] text-[#1a1a1a]">
          🎉 You&apos;ve got your idea!
        </p>
        <h2 className="mt-3 font-anton text-[clamp(24px,4vw,44px)] font-medium uppercase leading-[1.15] tracking-[1px] text-[#4DB8BA]" style={{ fontWeight: 500 }}>
          Now let&apos;s make it{' '}
          <span className="text-[#e91e90]">actually happen.</span>
        </h2>
      </div>

      {/* Step 1 */}
      <div className="mt-10 flex items-center justify-center gap-3">
        <span className="rounded-lg bg-[#e91e90] px-4 py-1.5 text-sm font-bold text-white">
          Step 1:
        </span>
        <span className="text-lg font-bold text-[#1a1a1a]">
          You now have your idea!
        </span>
        <span className="text-2xl">✅</span>
      </div>

      {/* Selected concept card */}
      <div className="mx-auto mt-6 max-w-[700px] rounded-xl border-l-4 border-[#4DB8BA] bg-white px-8 py-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[2px] text-[#4DB8BA]">
          {routeName}
        </p>
        <p className="mt-2 text-[15px] font-bold text-[#1a1a1a]">
          {concept.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {concept.suggestedPrice && (
            <span className="rounded-full border border-gray-300 bg-white px-4 py-1 text-xs font-bold text-[#1a1a1a]">
              Suggested Price: {concept.suggestedPrice}
            </span>
          )}
          <span className="rounded-full border border-gray-300 bg-white px-4 py-1 text-xs font-bold text-[#1a1a1a]">
            Suggested Format: {concept.type}
          </span>
        </div>
        <p className="mb-3 mt-5 text-xs font-bold uppercase tracking-[2px] text-[#e91e90]">
          Your Title Options
        </p>
        <div className="space-y-0">
          {concept.titleOptions.map((title, ti) => (
            <div
              key={ti}
              className={`flex items-center gap-3 rounded px-4 py-3 ${
                ti % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <span className="text-sm font-bold text-[#2ec4a0]">
                {ti + 1}.
              </span>
              <span className="text-sm text-[#1a1a1a]">{title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div className="my-6 text-center text-3xl text-[#4DB8BA]">&darr;</div>

      {/* Step 2 */}
      <div className="flex items-center justify-center gap-3">
        <span className="rounded-lg bg-[#e91e90] px-4 py-1.5 text-sm font-bold text-white">
          Step 2:
        </span>
        <span className="text-lg font-bold text-[#1a1a1a]">
          Now it&apos;s time to create it and start selling it:
        </span>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded border-2 border-gray-300" />
      </div>

      {/* Course promo card */}
      <div className="mx-auto mt-6 max-w-[700px] overflow-hidden rounded-2xl border-2 border-[#4DB8BA] bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/imgs/10k-launch-lab/hero3.png"
            alt="10K Launch Lab"
            className="aspect-[4/3] w-full object-cover sm:w-[280px]"
          />
          <div className="flex flex-col justify-center p-6">
            <h3 className="font-anton text-[clamp(20px,3vw,28px)] font-normal uppercase leading-[1.2] tracking-[0.5px] text-[#4DB8BA]">
              How to Create a Viral Digital Product
            </h3>
            <p className="mt-3 text-sm text-gray-500">
              Learn how to create and sell a popular, in-demand digital product even if
              you&apos;re just getting started and have no idea what to sell or
              how to do it.
            </p>
            <a
              href="/10k-launch-lab"
              className="mt-5 inline-block rounded-lg bg-[#e91e90] px-6 py-3 text-center text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Show Me How to Create It &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="mt-6 text-center">
        <button
          onClick={onBack}
          className="text-sm text-gray-400 transition-colors hover:text-[#e91e90]"
        >
          &larr; Back to my ideas
        </button>
      </div>
    </div>
  )
}

/* ── formula card ───────────────────────────────────────────────── */

function FormulaCard() {
  const pillars = [
    {
      num: 1,
      title: 'Provokes Curiosity:',
      desc: 'Make people think "how is that even possible?"',
    },
    {
      num: 2,
      title: 'Solves a Hyper-Specific Problem:',
      desc: 'Laser-focused, not broad or generic',
    },
    {
      num: 3,
      title: 'Promises the Unbelievable:',
      desc: 'Seems too good to be true (but is achievable)',
    },
  ]

  return (
    <div className="mx-auto mt-10 max-w-[960px] rounded-2xl bg-[#F5B731] p-8 shadow-sm sm:p-10">
      <h3 className="text-2xl font-bold text-[#1a1a1a]">
        Ana&apos;s Viral Product Formula
      </h3>
      <p className="mb-6 mt-1 text-[15px] text-[#4a4a4a]">
        Every viral digital product has these 3 things:
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {pillars.map((p) => (
          <div key={p.num} className="rounded-xl bg-white/90 p-5">
            <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#F5B731] text-sm font-bold text-white">
              {p.num}
            </span>
            <h4 className="mb-1 text-[15px] font-bold text-[#1a1a1a]">
              {p.title}
            </h4>
            <p className="text-sm text-gray-600">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── CTA + footer ───────────────────────────────────────────────── */

function CtaBanner() {
  return (
    <div className="mx-auto mt-10 max-w-[960px] rounded-2xl bg-[#fce4ec] px-8 py-5 text-center text-[15px]">
      <span className="font-bold text-[#e91e90]">P.S.</span> Want to learn how
      we make and sell tools &amp; digital products just like this?{' '}
      <a
        href="/10k-launch-lab"
        className="font-bold text-[#e91e90] underline hover:text-[#c2185b]"
      >
        Click here!
      </a>
    </div>
  )
}

function Disclaimer() {
  return (
    <div className="mx-auto mt-10 max-w-[960px] border-t border-gray-200 pt-6 text-center">
      <p className="text-xs italic text-gray-400">
        <strong className="not-italic">Disclaimer:</strong> Results generated by
        this tool are AI-powered suggestions for educational purposes only.
        Individual results will vary. Ana Calin is not responsible for business
        outcomes based on these ideas.
      </p>
      <p className="mt-2 text-xs text-gray-400">
        &copy; Ana Calin {new Date().getFullYear()}, All Rights Reserved.
      </p>
    </div>
  )
}

/* ── page ───────────────────────────────────────────────────────── */

export default function ViralDigitalProductFinderPage() {
  const [accomplishments, setAccomplishments] = useState('')
  const [passions, setPassions] = useState('')
  const [profession, setProfession] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Results | null>(null)
  const [selectedConcept, setSelectedConcept] = useState<SelectedConcept | null>(null)
  const [error, setError] = useState('')
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async () => {
    if (!accomplishments.trim()) {
      setError("Please share at least one accomplishment or problem you've solved.")
      return
    }
    setError('')
    setResults(null)
    setLoading(true)
    try {
      const res = await fetch('/api/viral-digital-product-finder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accomplishments: accomplishments.trim(),
          passions: passions.trim(),
          profession: profession.trim(),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }
      setResults(data)
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 200)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectConcept = (routeName: string, concept: Concept) => {
    setSelectedConcept({ routeName, concept })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToResults = () => {
    setSelectedConcept(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStartOver = () => {
    setResults(null)
    setSelectedConcept(null)
    setAccomplishments('')
    setPassions('')
    setProfession('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="font-lora min-h-screen bg-[#fdfcf9] px-4 pb-16">
      <SpectrumBar />

      {!results && !selectedConcept && (
        <>
          <h1
            className="mx-auto mt-8 max-w-[800px] text-center font-anton text-[clamp(29px,4.4vw,58px)] font-normal uppercase leading-[1.15] tracking-[1px] text-[#4DB8BA]"
            style={{ WebkitTextStroke: '1px #4DB8BA' }}
          >
            Ana&apos;s Viral Digital Product Finder
          </h1>

          <p className="mx-auto mt-4 max-w-[620px] text-center text-[15px] italic text-gray-700">
            Tell me a little bit about yourself, and I&apos;ll give you
            hyper-specific{' '}
            <strong className="not-italic">
              product ideas that will go viral and actually get sales.
            </strong>
          </p>
        </>
      )}

      {!results && !selectedConcept && (
        <FormCard
          accomplishments={accomplishments}
          setAccomplishments={setAccomplishments}
          passions={passions}
          setPassions={setPassions}
          profession={profession}
          setProfession={setProfession}
          onSubmit={handleSubmit}
          loading={loading}
        />
      )}

      {error && (
        <div className="mx-auto mt-4 max-w-[960px] rounded-lg border border-red-200 bg-red-50 px-6 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div ref={resultsRef}>
        {results && !selectedConcept && (
          <ResultsSection
            results={results}
            onStartOver={handleStartOver}
            onSelectConcept={handleSelectConcept}
          />
        )}
        {selectedConcept && (
          <UpsellSection
            selected={selectedConcept}
            onBack={handleBackToResults}
          />
        )}
      </div>

      {!results && !selectedConcept && <FormulaCard />}

      <CtaBanner />
      <Disclaimer />
    </main>
  )
}
