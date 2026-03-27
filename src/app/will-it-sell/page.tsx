'use client'

import { useState, useRef } from 'react'

/* ── types ──────────────────────────────────────────────────────── */

interface Criterion {
  name: string
  category: string
  score: number
  weight: number
  feedback: string
}

interface WillItSellResult {
  overallScore: number
  verdict: string
  criteria: Criterion[]
  improvements: string[]
  summary: string
}

/* ── helpers ─────────────────────────────────────────────────────── */

function getScoreColor(score: number) {
  if (score >= 80) return '#2ecc71'
  if (score >= 60) return '#f1c40f'
  if (score >= 40) return '#e67e22'
  return '#e74c3c'
}

/* ── spectrum bar ───────────────────────────────────────────────── */

function SpectrumBar() {
  return (
    <div className="relative mx-auto mt-6 max-w-[875px] pb-14">
      <div className="h-12 w-full rounded-full bg-gradient-to-r from-[#e74c3c] via-[#e67e22] via-35% via-[#f1c40f] via-60% to-[#2ecc71] shadow-md" />
      {/* Arrow + label: one SVG that contains both the text and arrow */}
      <svg
        className="absolute right-[2%] top-[10px]"
        width="140"
        height="80"
        viewBox="0 0 140 80"
        fill="none"
      >
        {/* Curved line from text (bottom-left) up to bar (top-left) */}
        <path
          d="M30 72C20 55 10 35 18 12"
          stroke="#1a1a1a"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Solid triangular arrowhead at top of curve */}
        <polygon points="13,14 18,4 23,14" fill="#1a1a1a" />
        {/* "Viral Zone" text anchored at bottom-left of the SVG */}
        <text
          x="35"
          y="76"
          fontFamily="Lora, serif"
          fontSize="14"
          fontWeight="bold"
          fontStyle="italic"
          fill="#1a1a1a"
        >
          Viral Zone
        </text>
      </svg>
    </div>
  )
}

/* ── score gauge ────────────────────────────────────────────────── */

function ScoreGauge({ score, verdict }: { score: number; verdict: string }) {
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = getScoreColor(score)

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[200px] w-[200px]">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100" cy="100" r={radius}
            fill="none" stroke="#e5e7eb" strokeWidth="12"
          />
          <circle
            cx="100" cy="100" r={radius}
            fill="none" stroke={color} strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-anton text-[56px] leading-none"
            style={{ color }}
          >
            {score}
          </span>
          <span className="text-xs text-gray-400">/100</span>
        </div>
      </div>
      <span
        className="mt-4 rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wider text-white"
        style={{ backgroundColor: color }}
      >
        {verdict}
      </span>
    </div>
  )
}

/* ── criterion bar ──────────────────────────────────────────────── */

function CriterionBar({ criterion }: { criterion: Criterion }) {
  const color = getScoreColor(criterion.score)

  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[15px] font-bold text-[#1a1a1a]">
            {criterion.name}
          </span>
          <span className="ml-2 text-xs text-gray-400">
            ({criterion.weight}% weight)
          </span>
        </div>
        <span className="font-anton text-lg" style={{ color }}>
          {criterion.score}
        </span>
      </div>
      <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${criterion.score}%`,
            backgroundColor: color,
          }}
        />
      </div>
      <p className="mt-2 text-sm italic text-gray-500">{criterion.feedback}</p>
    </div>
  )
}

/* ── form card ──────────────────────────────────────────────────── */

function FormCard({
  productIdea,
  setProductIdea,
  price,
  setPrice,
  niche,
  setNiche,
  onSubmit,
  loading,
}: {
  productIdea: string
  setProductIdea: (v: string) => void
  price: string
  setPrice: (v: string) => void
  niche: string
  setNiche: (v: string) => void
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
          Describe your product idea:
        </h2>
      </div>

      <label className="mb-2 mt-4 block font-lora text-[15px] font-bold text-[#1a1a1a]">
        What&apos;s the digital product you want to score?{' '}
        <span className="text-[#e91e90]">*</span>{' '}
        <span
          className="inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full bg-[#3bbfed] text-[11px] font-bold text-white"
          title="Describe your product idea as specifically as possible — include the format, who it's for, and what outcome it promises."
        >
          i
        </span>
      </label>
      <textarea
        value={productIdea}
        onChange={(e) => setProductIdea(e.target.value)}
        rows={4}
        placeholder="e.g. A 7-day email course that teaches new moms how to meal prep for the week in under 60 minutes"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[15px] text-gray-700 placeholder:text-gray-400 focus:border-[#2ec4a0] focus:outline-none focus:ring-2 focus:ring-[#2ec4a0]/30"
      />

      <div className="my-8 border-t-2 border-dashed border-gray-300" />

      {/* Section 2 */}
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e91e90] text-sm font-bold text-white">
          2
        </span>
        <h2 className="font-lora text-2xl italic text-[#2ec4a0]">
          A few more details:
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block font-lora text-[15px] font-bold text-[#1a1a1a]">
            Price Point <span className="text-[#e91e90]">*</span>
          </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. $27"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[15px] text-gray-700 placeholder:text-gray-400 focus:border-[#2ec4a0] focus:outline-none focus:ring-2 focus:ring-[#2ec4a0]/30"
          />
        </div>
        <div>
          <label className="mb-1.5 block font-lora text-[15px] font-bold text-[#1a1a1a]">
            Niche / Target Market <span className="text-[#e91e90]">*</span>
          </label>
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="e.g. new moms, solopreneurs, dog owners"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[15px] text-gray-700 placeholder:text-gray-400 focus:border-[#2ec4a0] focus:outline-none focus:ring-2 focus:ring-[#2ec4a0]/30"
          />
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-[#3a3a3a] py-4 text-[22px] font-bold text-[#FFC107] shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Analyzing your product idea...
          </span>
        ) : (
          'Score My Product Idea'
        )}
      </button>
    </div>
  )
}

/* ── results section (scorecard) ────────────────────────────────── */

function ResultsSection({
  results,
  onStartOver,
  onSeeHowToBuild,
}: {
  results: WillItSellResult
  onStartOver: () => void
  onSeeHowToBuild: () => void
}) {
  const viralFormula = results.criteria.filter(
    (c) => c.category === "Ana's Viral Formula"
  )
  const marketSignals = results.criteria.filter(
    (c) => c.category === 'Market Signals'
  )
  const clarity = results.criteria.filter((c) => c.category === 'Clarity')

  return (
    <div className="mx-auto mt-10 max-w-[960px]">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-anton text-[clamp(24px,4vw,48px)] font-normal uppercase leading-[1.15] tracking-[1px] text-[#e91e90]">
          Your Scorecard Is Ready!
        </h2>
        <div className="mt-1 text-4xl">📊</div>
      </div>

      {/* Score gauge */}
      <div className="mt-8 flex justify-center">
        <ScoreGauge score={results.overallScore} verdict={results.verdict} />
      </div>

      {/* Summary */}
      <div className="mx-auto mt-8 max-w-[700px] rounded-xl bg-white px-8 py-6 text-center shadow-sm">
        <p className="text-[15px] italic text-gray-600">{results.summary}</p>
      </div>

      {/* Score breakdown */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#1a1a1a]">Score Breakdown</h3>
          <button
            onClick={onStartOver}
            className="rounded-full border border-gray-300 px-5 py-2 text-sm font-bold text-gray-500 transition-colors hover:border-[#e91e90] hover:text-[#e91e90]"
          >
            &larr; Start Over
          </button>
        </div>

        {/* Ana's Viral Formula */}
        <div className="mt-6">
          <p className="mb-1 text-xs font-bold uppercase tracking-[2px] text-[#e91e90]">
            Ana&apos;s Viral Formula
          </p>
          <div className="rounded-xl border-l-4 border-[#e91e90] bg-white px-8 py-2 shadow-sm">
            {viralFormula.map((c, i) => (
              <CriterionBar key={i} criterion={c} />
            ))}
          </div>
        </div>

        {/* Market Signals */}
        <div className="mt-6">
          <p className="mb-1 text-xs font-bold uppercase tracking-[2px] text-[#4DB8BA]">
            Market &amp; Value Signals
          </p>
          <div className="rounded-xl border-l-4 border-[#4DB8BA] bg-white px-8 py-2 shadow-sm">
            {marketSignals.map((c, i) => (
              <CriterionBar key={i} criterion={c} />
            ))}
          </div>
        </div>

        {/* Clarity */}
        <div className="mt-6">
          <p className="mb-1 text-xs font-bold uppercase tracking-[2px] text-[#F5B731]">
            Clarity
          </p>
          <div className="rounded-xl border-l-4 border-[#F5B731] bg-white px-8 py-2 shadow-sm">
            {clarity.map((c, i) => (
              <CriterionBar key={i} criterion={c} />
            ))}
          </div>
        </div>
      </div>

      {/* Improvements */}
      <div className="mt-10">
        <h3 className="text-lg font-bold text-[#1a1a1a]">
          How to Improve Your Score
        </h3>
        <div className="mt-4 space-y-3">
          {results.improvements.map((improvement, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-xl border-l-4 border-[#4DB8BA] bg-white px-6 py-4 shadow-sm"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e91e90] text-xs font-bold text-white">
                {i + 1}
              </span>
              <p className="text-[15px] text-[#1a1a1a]">{improvement}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action button */}
      <div className="mt-10 text-center">
        <button
          onClick={onSeeHowToBuild}
          className="inline-block rounded-lg bg-[#e91e90] px-8 py-4 text-[18px] font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          See How to Build &amp; Sell It &rarr;
        </button>
      </div>
    </div>
  )
}

/* ── upsell section ────────────────────────────────────────────── */

function UpsellSection({
  results,
  onBack,
}: {
  results: WillItSellResult
  onBack: () => void
}) {
  const color = getScoreColor(results.overallScore)

  return (
    <div className="mx-auto mt-10 max-w-[960px]">
      {/* Header */}
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[3px] text-[#1a1a1a]">
          📊 You&apos;ve got your score!
        </p>
        <h2
          className="mt-3 font-anton text-[clamp(24px,4vw,44px)] font-bold uppercase leading-[1.15] tracking-[1px] text-[#4DB8BA]"
          style={{ fontWeight: 700 }}
        >
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
          You know your score!
        </span>
        <span className="text-2xl">✅</span>
      </div>

      {/* Score recap */}
      <div className="mx-auto mt-6 max-w-[700px] rounded-xl border-l-4 bg-white px-8 py-6 shadow-sm" style={{ borderColor: color }}>
        <div className="flex items-center gap-4">
          <span className="font-anton text-[40px] leading-none" style={{ color }}>
            {results.overallScore}
          </span>
          <div>
            <span
              className="rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: color }}
            >
              {results.verdict}
            </span>
            <p className="mt-2 text-sm italic text-gray-500">
              {results.summary}
            </p>
          </div>
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
      <div className="mx-auto mt-8 max-w-[1075px] overflow-hidden rounded-3xl border-2 border-[#4DB8BA] bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/imgs/10k-launch-lab/hero3.png"
            alt="10K Launch Lab"
            className="w-full object-contain sm:w-[475px]"
          />
          <div className="flex flex-col justify-center p-8">
            <h3 className="font-anton text-[clamp(24px,3.5vw,35px)] font-normal uppercase leading-[1.2] tracking-[0.5px] text-[#4DB8BA]">
              How to Create a Viral Digital Product
            </h3>
            <p className="mt-4 text-[16px] leading-relaxed text-gray-500">
              Learn how to create and sell a popular, in-demand digital product even if
              you&apos;re just getting started and have no idea what to sell or
              how to do it.
            </p>
            <a
              href="/10k-launch-lab"
              className="mt-6 inline-block rounded-lg bg-[#e91e90] px-8 py-4 text-center text-[17px] font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
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
          &larr; Back to my scorecard
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
    <div className="mx-auto mt-10 max-w-[960px] rounded-2xl bg-[#fce4ec] px-8 py-5 text-center font-lora text-[15px] italic text-[#1a1a1a]">
      <span className="font-bold not-italic text-[#e91e90]">P.S.</span> The idea is the easy
      part. Knowing exactly how to turn it into a product that sells on autopilot
      &mdash; that&apos;s where most people get stuck. We&apos;ll show you the
      entire system, step by step.{' '}
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
        <strong className="not-italic">Disclaimer:</strong> Scores generated by
        this tool are AI-powered assessments for educational purposes only.
        Individual results will vary. Ana Calin is not responsible for business
        outcomes based on these scores.
      </p>
      <p className="mt-2 text-xs text-gray-400">
        &copy; Ana Calin {new Date().getFullYear()}, All Rights Reserved.
      </p>
    </div>
  )
}

/* ── page ───────────────────────────────────────────────────────── */

export default function WillItSellPage() {
  const [productIdea, setProductIdea] = useState('')
  const [price, setPrice] = useState('')
  const [niche, setNiche] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<WillItSellResult | null>(null)
  const [showUpsell, setShowUpsell] = useState(false)
  const [error, setError] = useState('')
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async () => {
    if (!productIdea.trim()) {
      setError('Please describe your product idea.')
      return
    }
    if (!price.trim()) {
      setError('Please enter your price point.')
      return
    }
    if (!niche.trim()) {
      setError('Please enter your niche or target market.')
      return
    }
    setError('')
    setResults(null)
    setShowUpsell(false)
    setLoading(true)
    try {
      const res = await fetch('/api/will-it-sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productIdea: productIdea.trim(),
          price: price.trim(),
          niche: niche.trim(),
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

  const handleSeeHowToBuild = () => {
    setShowUpsell(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToScorecard = () => {
    setShowUpsell(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStartOver = () => {
    setResults(null)
    setShowUpsell(false)
    setProductIdea('')
    setPrice('')
    setNiche('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="font-lora min-h-screen bg-[#fdfcf9] px-4 pb-16">
      <SpectrumBar />

      {!results && !showUpsell && (
        <>
          <h1
            className="mx-auto mt-8 max-w-[800px] text-center font-anton text-[clamp(29px,4.4vw,58px)] font-normal uppercase leading-[1.15] tracking-[1px] text-[#2d2d2d]"
          >
            Will It{' '}
            <span className="relative inline-block">
              Sell?
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 120 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8C20 4 40 3 60 5C80 7 100 6 118 4"
                  stroke="#2ecc71"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <path
                  d="M4 14C25 10 50 11 70 13C90 15 105 12 116 10"
                  stroke="#2ecc71"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-[620px] text-center text-[15px] italic text-gray-700">
            Get a brutally honest virality score and a step-by-step fix list to
            turn any idea into a{' '}
            <strong className="not-italic">no-brainer buy.</strong>
          </p>
        </>
      )}

      {!results && !showUpsell && (
        <FormCard
          productIdea={productIdea}
          setProductIdea={setProductIdea}
          price={price}
          setPrice={setPrice}
          niche={niche}
          setNiche={setNiche}
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
        {results && !showUpsell && (
          <ResultsSection
            results={results}
            onStartOver={handleStartOver}
            onSeeHowToBuild={handleSeeHowToBuild}
          />
        )}
        {showUpsell && results && (
          <UpsellSection results={results} onBack={handleBackToScorecard} />
        )}
      </div>

      {!results && !showUpsell && <FormulaCard />}

      <CtaBanner />
      <Disclaimer />
    </main>
  )
}
