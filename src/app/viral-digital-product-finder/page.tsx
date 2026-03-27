'use client'

import { useState, useRef } from 'react'

/* ── types ──────────────────────────────────────────────────────── */

interface Concept {
  type: string
  suggestedPrice?: string
  description: string
  transformation: string
  targetAudience?: string
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
        <span className="text-sm font-bold italic text-slate-500">
          Viral Zone
        </span>
        <span className="text-[10px] leading-none text-slate-500">▼</span>
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
    <div className="mx-auto mt-10 max-w-[960px] rounded-2xl border border-rose-100 bg-white/80 p-8 shadow-lg shadow-pink-900/5 backdrop-blur-xl sm:p-10">
      {/* Section 1 */}
      <div className="mb-2 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-600 text-sm font-bold text-white">
          1
        </span>
        <h2 className="text-2xl font-semibold text-slate-900">
          Let&apos;s start here:
        </h2>
      </div>

      <label className="mb-2 mt-4 block text-[15px] font-medium text-slate-700">
        What are some things you&apos;ve accomplished, problems you&apos;ve
        personally solved, or things you&apos;ve overcome?{' '}
        <span className="text-rose-500">*</span>
      </label>
      <textarea
        value={accomplishments}
        onChange={(e) => setAccomplishments(e.target.value)}
        rows={4}
        placeholder="e.g. paid off $12k in debt on a teacher's salary, got my kid sleeping through the night, healed my skin without a dermatologist"
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-100"
      />

      <div className="my-8 border-t border-rose-100" />

      {/* Section 2 */}
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-600 text-sm font-bold text-white">
          2
        </span>
        <h2 className="text-2xl font-semibold text-slate-900">
          A little more about you:
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[15px] font-medium text-slate-700">
            What could you talk about for hours?
          </label>
          <input
            type="text"
            value={passions}
            onChange={(e) => setPassions(e.target.value)}
            placeholder="e.g. gut health, budgeting, dog training"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[15px] font-medium text-slate-700">
            Your Profession or Expertise
          </label>
          <input
            type="text"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            placeholder="e.g. pediatric nurse, high school teacher"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-100"
          />
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-slate-900 py-4 text-[22px] font-medium text-white shadow-md transition-all hover:bg-slate-800 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
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

/* ── results display ────────────────────────────────────────────── */

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
        <h2 className="font-anton text-[clamp(24px,4vw,48px)] font-normal uppercase leading-[1.15] tracking-[1px] text-rose-600">
          You&apos;ve accomplished some great things!
        </h2>
        <div className="mt-1 text-4xl">🤩</div>
        <p className="mt-3 text-[15px] italic text-slate-500">
          You can definitely create a viral digital product out of everything you&apos;ve done.
        </p>
      </div>

      {/* Choose route header */}
      <div className="mt-10 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">
          Choose your route below:
        </h3>
        <button
          onClick={onStartOver}
          className="rounded-full bg-rose-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-rose-200 transition-all hover:bg-rose-700 hover:scale-105"
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
                ? 'bg-slate-900 text-white shadow-md'
                : 'border border-rose-200 bg-white/80 text-rose-600 backdrop-blur-sm'
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
            <p className="text-sm italic text-slate-400">
              {bucket.marketResearch.summary}
            </p>
          )}

          {/* Concept cards */}
          {bucket.concepts.map((concept, ci) => (
            <div
              key={ci}
              className="mt-4 rounded-2xl border border-rose-100 bg-white/80 px-8 py-6 shadow-lg shadow-pink-900/5 backdrop-blur-xl"
            >
              {/* Description */}
              <p className="text-[15px] font-bold text-slate-900">
                {concept.description}
              </p>

              {/* Badges */}
              <div className="mt-3 flex flex-wrap gap-2">
                {concept.suggestedPrice && (
                  <span className="rounded-full border border-rose-200 bg-rose-50 px-4 py-1 text-xs font-bold text-rose-700">
                    Suggested Price: {concept.suggestedPrice}
                  </span>
                )}
                <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-xs font-bold text-slate-700">
                  Suggested Format: {concept.type}
                </span>
              </div>

              {/* Target audience */}
              {concept.targetAudience && (
                <div className="mt-3">
                  <span className="text-xs font-bold uppercase tracking-[1px] text-rose-500">Target Audience: </span>
                  <span className="text-sm text-slate-700">{concept.targetAudience}</span>
                </div>
              )}

              {/* Title ideas */}
              <p className="mb-3 mt-5 text-xs font-bold uppercase tracking-[2px] text-rose-500">
                Possible Title Ideas
              </p>
              <div className="space-y-0">
                {concept.titleOptions.map((title, ti) => (
                  <div
                    key={ti}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 ${
                      ti % 2 === 0 ? 'bg-rose-50/50' : 'bg-white'
                    }`}
                  >
                    <span className="text-sm font-bold text-rose-500">
                      {ti + 1}.
                    </span>
                    <span className="text-sm text-slate-800">{title}</span>
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <div className="mt-5 text-center">
                <button
                  onClick={() => onSelectConcept(bucket.routeName, concept)}
                  className="inline-block rounded-xl bg-slate-900 px-8 py-3 text-[18px] font-medium text-white shadow-md transition-all hover:bg-slate-800 hover:scale-[1.02]"
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
                className="w-full rounded-xl bg-slate-900 px-6 py-3 text-center text-sm font-bold text-white shadow-sm transition-colors hover:bg-slate-800"
              >
                🔍 What&apos;s Already Selling in This Niche:{' '}
                {openResearch ? '▲' : '▼'}
              </button>
              {openResearch && (
                <div className="mt-2 rounded-xl border border-rose-100 bg-rose-50/50 px-6 py-4">
                  <p className="mb-3 text-sm text-slate-700">
                    {bucket.marketResearch.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {bucket.marketResearch.trendingProducts.map(
                      (product, pi) => (
                        <span
                          key={pi}
                          className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm"
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
        <p className="text-xs font-bold uppercase tracking-[3px] text-slate-800">
          🎉 You&apos;ve got your idea!
        </p>
        <h2 className="mt-3 font-anton text-[clamp(24px,4vw,44px)] font-bold uppercase leading-[1.15] tracking-[1px] text-slate-900" style={{ fontWeight: 700 }}>
          Now let&apos;s make it{' '}
          <span className="text-rose-600">actually happen.</span>
        </h2>
      </div>

      {/* Step 1 */}
      <div className="mt-10 flex items-center justify-center gap-3">
        <span className="rounded-lg bg-rose-600 px-4 py-1.5 text-sm font-bold text-white">
          Step 1:
        </span>
        <span className="text-lg font-bold text-slate-900">
          You now have your idea!
        </span>
        <span className="text-2xl">✅</span>
      </div>

      {/* Selected concept card */}
      <div className="mx-auto mt-6 max-w-[700px] rounded-2xl border border-rose-100 bg-white/80 px-8 py-6 shadow-lg shadow-pink-900/5 backdrop-blur-xl">
        <p className="text-xs font-bold uppercase tracking-[2px] text-rose-500">
          {routeName}
        </p>
        <p className="mt-2 text-[15px] font-bold text-slate-900">
          {concept.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {concept.suggestedPrice && (
            <span className="rounded-full border border-rose-200 bg-rose-50 px-4 py-1 text-xs font-bold text-rose-700">
              Suggested Price: {concept.suggestedPrice}
            </span>
          )}
          <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-xs font-bold text-slate-700">
            Suggested Format: {concept.type}
          </span>
        </div>
        {concept.targetAudience && (
          <div className="mt-3">
            <span className="text-xs font-bold uppercase tracking-[1px] text-rose-500">Target Audience: </span>
            <span className="text-sm text-slate-700">{concept.targetAudience}</span>
          </div>
        )}
        <p className="mb-3 mt-5 text-xs font-bold uppercase tracking-[2px] text-rose-500">
          Your Title Options
        </p>
        <div className="space-y-0">
          {concept.titleOptions.map((title, ti) => (
            <div
              key={ti}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 ${
                ti % 2 === 0 ? 'bg-rose-50/50' : 'bg-white'
              }`}
            >
              <span className="text-sm font-bold text-rose-500">
                {ti + 1}.
              </span>
              <span className="text-sm text-slate-800">{title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div className="my-6 text-center text-3xl text-slate-300">&darr;</div>

      {/* Step 2 */}
      <div className="flex items-center justify-center gap-3">
        <span className="rounded-lg bg-rose-600 px-4 py-1.5 text-sm font-bold text-white">
          Step 2:
        </span>
        <span className="text-lg font-bold text-slate-900">
          Now it&apos;s time to create it and start selling it:
        </span>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded border-2 border-slate-300" />
      </div>

      {/* Course promo card */}
      <div className="mx-auto mt-8 max-w-[1075px] overflow-hidden rounded-3xl border border-rose-100 bg-white/80 shadow-lg shadow-pink-900/5 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/imgs/10k-launch-lab/hero3.png"
            alt="10K Launch Lab"
            className="w-full object-contain sm:w-[475px]"
          />
          <div className="flex flex-col justify-center p-8">
            <h3 className="font-anton text-[clamp(24px,3.5vw,35px)] font-normal uppercase leading-[1.2] tracking-[0.5px] text-slate-900">
              How to Create a Viral Digital Product
            </h3>
            <p className="mt-4 text-[16px] leading-relaxed text-slate-500">
              Learn how to create and sell a popular, in-demand digital product even if
              you&apos;re just getting started and have no idea what to sell or
              how to do it.
            </p>
            <a
              href="/10k-launch-lab"
              className="mt-6 inline-block rounded-xl bg-slate-900 px-8 py-4 text-center text-[17px] font-medium text-white shadow-md transition-all hover:bg-slate-800 hover:scale-[1.02]"
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
          className="text-sm text-slate-400 transition-colors hover:text-rose-600"
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
    <div className="mx-auto mt-10 max-w-[960px] rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-pink-50 p-8 shadow-sm sm:p-10">
      <h3 className="text-2xl font-bold text-slate-900">
        Ana&apos;s Viral Product Formula
      </h3>
      <p className="mb-6 mt-1 text-[15px] text-slate-600">
        Every viral digital product has these 3 things:
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {pillars.map((p) => (
          <div key={p.num} className="rounded-2xl bg-white p-5 shadow-sm">
            <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-rose-600 text-sm font-bold text-white">
              {p.num}
            </span>
            <h4 className="mb-1 text-[15px] font-bold text-slate-900">
              {p.title}
            </h4>
            <p className="text-sm text-slate-500">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── CTA + footer ───────────────────────────────────────────────── */

function CtaBanner() {
  return (
    <div className="mx-auto mt-10 max-w-[960px] rounded-2xl border border-rose-100 bg-rose-50 px-8 py-5 text-center text-[15px] italic text-slate-700">
      <span className="font-bold not-italic text-rose-600">P.S.</span> The idea is the easy
      part. Knowing exactly how to turn it into a product that sells on autopilot
      &mdash; that&apos;s where most people get stuck. We&apos;ll show you the
      entire system, step by step.{' '}
      <a
        href="/10k-launch-lab"
        className="font-bold text-rose-600 underline hover:text-rose-800"
      >
        Click here!
      </a>
    </div>
  )
}

function Disclaimer() {
  return (
    <div className="mx-auto mt-10 max-w-[960px] border-t border-rose-100 pt-6 text-center">
      <p className="text-xs italic text-slate-400">
        <strong className="not-italic">Disclaimer:</strong> Results generated by
        this tool are AI-powered suggestions for educational purposes only.
        Individual results will vary. Ana Calin is not responsible for business
        outcomes based on these ideas.
      </p>
      <p className="mt-2 text-xs text-slate-400">
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
    <main className="min-h-screen px-4 pb-16" style={{ marginTop: 0 }}>
      <style>{`body { background: linear-gradient(to bottom right, #fff1f2, #ffffff, #fdf2f8) !important; }`}</style>
      <SpectrumBar />

      {!results && !selectedConcept && (
        <>
          <h1
            className="mx-auto mt-8 max-w-[800px] text-center font-anton text-[clamp(29px,4.4vw,58px)] font-normal uppercase leading-[1.15] tracking-[1px] text-slate-900"
          >
            Ana&apos;s Viral Digital Product Finder
          </h1>

          <p className="mx-auto mt-4 max-w-[620px] text-center text-[15px] italic text-slate-600">
            Tell me a little bit about yourself, and I&apos;ll give you
            hyper-specific{' '}
            <strong className="not-italic text-slate-900">
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
