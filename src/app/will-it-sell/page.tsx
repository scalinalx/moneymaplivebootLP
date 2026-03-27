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

type Theme = 'classic' | 'rose' | 'brutalist'

/* ── theme config ───────────────────────────────────────────────── */

const T = {
  classic: {
    bodyBg: '#fdfcf9',
    mainCls: 'font-lora min-h-screen bg-[#fdfcf9] px-4 pb-16',
    headingFont: 'font-anton',
    headingColor: 'text-[#2d2d2d]',
    subColor: 'text-gray-700',
    strongColor: 'text-[#1a1a1a]',
    textPrimary: 'text-[#1a1a1a]',
    textSecondary: 'text-gray-500',
    textMuted: 'text-gray-400',
    textFeedback: 'text-gray-500',
    sectionHead: 'font-lora text-2xl italic text-[#2ec4a0]',
    labelCls: 'font-lora text-[15px] font-bold text-[#1a1a1a]',
    cardCls: 'rounded-2xl border border-gray-200 bg-white shadow-sm',
    inputCls: 'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-700 placeholder:text-gray-400 focus:border-[#2ec4a0] focus:outline-none focus:ring-2 focus:ring-[#2ec4a0]/30',
    btnCls: 'mt-6 w-full rounded-lg bg-[#3a3a3a] py-4 text-[22px] font-bold text-[#FFC107] shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60',
    divider: 'my-8 border-t-2 border-dashed border-gray-300',
    resultCardCls: 'bg-white shadow-sm',
    resultRound: 'rounded-xl',
    scoreBg: 'bg-gray-200',
    summaryBg: 'rounded-xl bg-white px-8 py-6 shadow-sm',
    startOverCls: 'rounded-full border border-gray-300 px-5 py-2 text-sm font-bold text-gray-500 transition-colors hover:border-[#e91e90] hover:text-[#e91e90]',
    ctaCls: 'inline-block rounded-lg bg-[#e91e90] px-8 py-4 text-[18px] font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg',
    formulaBg: 'bg-[#F5B731]',
    formulaCardCls: 'rounded-xl bg-white/90 p-5',
    formulaText: 'text-[#1a1a1a]',
    formulaSub: 'text-[#4a4a4a]',
    formulaDesc: 'text-gray-600',
    psBg: 'rounded-2xl bg-[#fce4ec]',
    psText: 'font-lora italic text-[#1a1a1a]',
    disclaimerBorder: 'border-gray-200',
    disclaimerText: 'text-gray-400',
    improvCardCls: 'rounded-xl border-l-4 border-[#4DB8BA] bg-white shadow-sm',
    arrowStroke: '#1a1a1a',
    arrowFill: '#1a1a1a',
    viralZoneFill: '#1a1a1a',
    barRound: 'rounded-full',
    barBorder: '',
    sellUnderline: '#2ecc71',
    numberBadge: 'bg-[#e91e90]',
    pillCls: 'rounded-full',
  },
  rose: {
    bodyBg: 'linear-gradient(to bottom right, #fff1f2, #ffffff, #fdf2f8)',
    mainCls: 'min-h-screen px-4 pb-16',
    headingFont: 'font-display',
    headingColor: 'text-slate-900',
    subColor: 'text-slate-600',
    strongColor: 'text-slate-900',
    textPrimary: 'text-slate-800',
    textSecondary: 'text-slate-500',
    textMuted: 'text-slate-400',
    textFeedback: 'text-slate-500',
    sectionHead: 'text-2xl font-semibold text-slate-900',
    labelCls: 'text-[15px] font-medium text-slate-700',
    cardCls: 'rounded-2xl border border-rose-100 bg-white/80 shadow-lg shadow-pink-900/5 backdrop-blur-xl',
    inputCls: 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-100',
    btnCls: 'mt-6 w-full rounded-xl bg-slate-900 py-4 text-[22px] font-medium text-white shadow-md transition-all hover:bg-slate-800 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70',
    divider: 'my-8 border-t border-rose-100',
    resultCardCls: 'bg-white/80 shadow-lg shadow-pink-900/5 backdrop-blur-xl',
    resultRound: 'rounded-2xl',
    scoreBg: 'bg-slate-100',
    summaryBg: 'rounded-2xl bg-white/80 px-8 py-6 shadow-lg shadow-pink-900/5 backdrop-blur-xl',
    startOverCls: 'rounded-full bg-rose-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-rose-200 transition-all hover:bg-rose-700 hover:scale-105',
    ctaCls: 'inline-block rounded-xl bg-slate-900 px-8 py-4 text-[18px] font-medium text-white shadow-md transition-all hover:bg-slate-800 hover:scale-[1.02]',
    formulaBg: 'bg-gradient-to-br from-rose-50 via-white to-pink-50 border border-rose-100',
    formulaCardCls: 'rounded-2xl bg-white p-5 shadow-sm',
    formulaText: 'text-slate-900',
    formulaSub: 'text-slate-600',
    formulaDesc: 'text-slate-500',
    psBg: 'rounded-2xl bg-rose-50 border border-rose-100',
    psText: 'italic text-slate-700',
    disclaimerBorder: 'border-rose-100',
    disclaimerText: 'text-slate-400',
    improvCardCls: 'rounded-2xl border border-rose-100 bg-white/80 shadow-sm backdrop-blur-xl',
    arrowStroke: '#475569',
    arrowFill: '#475569',
    viralZoneFill: '#475569',
    barRound: 'rounded-full',
    barBorder: '',
    sellUnderline: '#db2777',
    numberBadge: 'bg-rose-600',
    pillCls: 'rounded-full',
  },
  brutalist: {
    bodyBg: '#111111',
    mainCls: 'min-h-screen bg-[#111111] px-4 pb-16',
    headingFont: 'font-anton',
    headingColor: 'text-white',
    subColor: 'text-white/50',
    strongColor: 'text-[#FFC107]',
    textPrimary: 'text-white/90',
    textSecondary: 'text-white/50',
    textMuted: 'text-white/30',
    textFeedback: 'text-white/40',
    sectionHead: 'font-anton text-2xl uppercase text-[#e91e90]',
    labelCls: 'text-[15px] font-bold text-white/70',
    cardCls: 'border-l-4 border-[#FFC107] bg-[#1a1a1a]',
    inputCls: 'w-full border border-white/20 bg-[#1a1a1a] px-4 py-3 text-[15px] text-white placeholder:text-white/20 focus:border-[#FFC107] focus:outline-none',
    btnCls: 'mt-6 w-full bg-[#FFC107] py-4 text-[22px] font-bold uppercase text-[#111111] transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60',
    divider: 'my-8 border-t border-white/10',
    resultCardCls: 'bg-[#1a1a1a]',
    resultRound: '',
    scoreBg: 'bg-white/10',
    summaryBg: 'border-l-4 border-[#e91e90] bg-[#1a1a1a] px-8 py-6',
    startOverCls: 'border border-white/20 px-5 py-2 text-sm font-bold text-white/50 transition-all hover:border-[#FFC107] hover:text-[#FFC107]',
    ctaCls: 'inline-block bg-[#e91e90] px-8 py-4 text-[18px] font-bold uppercase text-white transition-all hover:-translate-y-0.5 hover:shadow-lg',
    formulaBg: 'border-l-4 border-[#FFC107] bg-[#1a1a1a]',
    formulaCardCls: 'border border-white/10 bg-[#111111] p-5',
    formulaText: 'text-white/90',
    formulaSub: 'text-white/50',
    formulaDesc: 'text-white/40',
    psBg: 'border-l-4 border-[#e91e90] bg-[#1a1a1a]',
    psText: 'text-white/60',
    disclaimerBorder: 'border-white/10',
    disclaimerText: 'text-white/30',
    improvCardCls: 'border-l-2 border-[#e91e90] bg-[#1a1a1a]',
    arrowStroke: '#FFC107',
    arrowFill: '#FFC107',
    viralZoneFill: '#FFC107',
    barRound: 'rounded-full',
    barBorder: '',
    sellUnderline: '#e91e90',
    numberBadge: 'bg-[#e91e90]',
    pillCls: '',
  },
}

/* ── helpers ─────────────────────────────────────────────────────── */

function getScoreColor(score: number) {
  if (score >= 80) return '#2ecc71'
  if (score >= 60) return '#f1c40f'
  if (score >= 40) return '#e67e22'
  return '#e74c3c'
}

/* ── theme selector ─────────────────────────────────────────────── */

function ThemeSelector({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as Theme)}
      className={`shrink-0 cursor-pointer border px-3 py-1.5 text-xs font-bold transition-all focus:outline-none ${
        theme === 'brutalist'
          ? 'border border-white/20 bg-[#1a1a1a] text-white/60'
          : theme === 'rose'
            ? 'rounded-lg border-rose-200 bg-white/80 text-slate-600 backdrop-blur-sm'
            : 'rounded-lg border-gray-300 bg-white text-gray-600'
      }`}
    >
      <option value="classic">🎨 Classic</option>
      <option value="rose">🌸 Soft Rose</option>
      <option value="brutalist">⚡ Neo Brutalist</option>
    </select>
  )
}

/* ── spectrum bar ───────────────────────────────────────────────── */

function SpectrumBar({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  const t = T[theme]
  return (
    <div className="relative mx-auto mt-6 max-w-[875px] pb-14">
      <div className={`h-12 w-full ${t.barRound} bg-gradient-to-r from-[#e74c3c] via-[#e67e22] via-35% via-[#f1c40f] via-60% to-[#2ecc71] shadow-md ${t.barBorder}`} />
      <svg
        className="absolute right-[2%] top-[10px]"
        width="140"
        height="80"
        viewBox="0 0 140 80"
        fill="none"
      >
        <path
          d="M30 72C20 55 10 35 18 12"
          stroke={t.arrowStroke}
          strokeWidth="1.5"
          fill="none"
        />
        <polygon points="13,14 18,4 23,14" fill={t.arrowFill} />
        <text
          x="35"
          y="76"
          fontFamily="Lora, serif"
          fontSize="17"
          fontWeight="bold"
          fontStyle="italic"
          fill={t.viralZoneFill}
        >
          Viral Zone
        </text>
      </svg>
    </div>
  )
}

/* ── score gauge ────────────────────────────────────────────────── */

function ScoreGauge({ score, verdict, theme }: { score: number; verdict: string; theme: Theme }) {
  const t = T[theme]
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = getScoreColor(score)
  const trackColor = theme === 'brutalist' ? '#3a3a3a' : '#e5e7eb'

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[200px] w-[200px]">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={radius} fill="none" stroke={trackColor} strokeWidth="12" />
          <circle
            cx="100" cy="100" r={radius}
            fill="none" stroke={color} strokeWidth="12"
            strokeLinecap={theme === 'brutalist' ? undefined : 'round'}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-anton text-[56px] leading-none" style={{ color }}>
            {score}
          </span>
          <span className={`text-xs ${t.textMuted}`}>/100</span>
        </div>
      </div>
      <span
        className={`mt-4 ${t.pillCls} px-6 py-2 text-sm font-bold uppercase tracking-wider text-white`}
        style={{ backgroundColor: color }}
      >
        {verdict}
      </span>
    </div>
  )
}

/* ── criterion bar ──────────────────────────────────────────────── */

function CriterionBar({ criterion, theme }: { criterion: Criterion; theme: Theme }) {
  const t = T[theme]
  const color = getScoreColor(criterion.score)

  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        <div>
          <span className={`text-[15px] font-bold ${t.textPrimary}`}>
            {criterion.name}
          </span>
          <span className={`ml-2 text-xs ${t.textMuted}`}>
            ({criterion.weight}% weight)
          </span>
        </div>
        <span className="font-anton text-lg" style={{ color }}>
          {criterion.score}
        </span>
      </div>
      <div className={`mt-2 h-3 w-full overflow-hidden ${theme === 'brutalist' ? '' : 'rounded-full'} ${t.scoreBg}`}>
        <div
          className={`h-full ${theme === 'brutalist' ? '' : 'rounded-full'} transition-all duration-700 ease-out`}
          style={{ width: `${criterion.score}%`, backgroundColor: color }}
        />
      </div>
      <p className={`mt-2 text-sm italic ${t.textFeedback}`}>{criterion.feedback}</p>
    </div>
  )
}

/* ── form card ──────────────────────────────────────────────────── */

function FormCard({
  productIdea, setProductIdea, price, setPrice, niche, setNiche, onSubmit, loading, theme,
}: {
  productIdea: string; setProductIdea: (v: string) => void
  price: string; setPrice: (v: string) => void
  niche: string; setNiche: (v: string) => void
  onSubmit: () => void; loading: boolean; theme: Theme
}) {
  const t = T[theme]
  const accent = theme === 'brutalist' ? 'text-[#e91e90]' : 'text-[#e91e90]'

  return (
    <div className={`mx-auto mt-10 max-w-[960px] p-8 sm:p-10 ${t.cardCls}`}>
      <div className="mb-2 flex items-center gap-3">
        <span className={`flex h-8 w-8 items-center justify-center ${theme === 'brutalist' ? '' : 'rounded-full'} ${t.numberBadge} text-sm font-bold text-white`}>1</span>
        <h2 className={t.sectionHead}>Describe your product idea:</h2>
      </div>
      <label className={`mb-2 mt-4 block ${t.labelCls}`}>
        What&apos;s the digital product you want to score?{' '}
        <span className={accent}>*</span>
      </label>
      <textarea
        value={productIdea}
        onChange={(e) => setProductIdea(e.target.value)}
        rows={4}
        placeholder="e.g. A 7-day email course that teaches new moms how to meal prep for the week in under 60 minutes"
        className={t.inputCls}
      />
      <div className={t.divider} />
      <div className="mb-4 flex items-center gap-3">
        <span className={`flex h-8 w-8 items-center justify-center ${theme === 'brutalist' ? '' : 'rounded-full'} ${t.numberBadge} text-sm font-bold text-white`}>2</span>
        <h2 className={t.sectionHead}>A few more details:</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={`mb-1.5 block ${t.labelCls}`}>Price Point <span className={accent}>*</span></label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. $27" className={t.inputCls} />
        </div>
        <div>
          <label className={`mb-1.5 block ${t.labelCls}`}>Niche / Target Market <span className={accent}>*</span></label>
          <input type="text" value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="e.g. new moms, solopreneurs, dog owners" className={t.inputCls} />
        </div>
      </div>
      <button onClick={onSubmit} disabled={loading} className={t.btnCls}>
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

/* ── results section ────────────────────────────────────────────── */

function ResultsSection({
  results, onStartOver, onSeeHowToBuild, theme,
}: {
  results: WillItSellResult; onStartOver: () => void; onSeeHowToBuild: () => void; theme: Theme
}) {
  const t = T[theme]
  const viralFormula = results.criteria.filter((c) => c.category === "Ana's Viral Formula")
  const marketSignals = results.criteria.filter((c) => c.category === 'Market Signals')
  const clarity = results.criteria.filter((c) => c.category === 'Clarity')

  const catColor1 = theme === 'brutalist' ? 'text-[#e91e90]' : 'text-[#e91e90]'
  const catBorder1 = theme === 'brutalist' ? 'border-l-4 border-[#e91e90]' : 'border-l-4 border-[#e91e90]'
  const catColor2 = theme === 'brutalist' ? 'text-[#FFC107]' : 'text-[#4DB8BA]'
  const catBorder2 = theme === 'brutalist' ? 'border-l-4 border-[#FFC107]' : 'border-l-4 border-[#4DB8BA]'
  const catColor3 = theme === 'brutalist' ? 'text-[#e91e90]' : 'text-[#F5B731]'
  const catBorder3 = theme === 'brutalist' ? 'border-l-4 border-[#e91e90]' : 'border-l-4 border-[#F5B731]'

  return (
    <div className="mx-auto mt-10 max-w-[960px]">
      <div className="text-center">
        <h2 className={`${t.headingFont} text-[clamp(24px,4vw,48px)] font-normal uppercase leading-[1.15] tracking-[1px] ${theme === 'brutalist' ? 'text-[#FFC107]' : 'text-[#e91e90]'}`}>
          Your Scorecard Is Ready!
        </h2>
        <div className="mt-1 text-4xl">📊</div>
      </div>
      <div className="mt-8 flex justify-center">
        <ScoreGauge score={results.overallScore} verdict={results.verdict} theme={theme} />
      </div>
      <div className={`mx-auto mt-8 max-w-[700px] text-center ${t.summaryBg}`}>
        <p className={`text-[15px] italic ${t.textFeedback}`}>{results.summary}</p>
      </div>
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-bold ${t.textPrimary}`}>Score Breakdown</h3>
          <button onClick={onStartOver} className={t.startOverCls}>&larr; Start Over</button>
        </div>
        {[
          { label: "Ana\u2019s Viral Formula", items: viralFormula, color: catColor1, border: catBorder1 },
          { label: "Market & Value Signals", items: marketSignals, color: catColor2, border: catBorder2 },
          { label: "Clarity", items: clarity, color: catColor3, border: catBorder3 },
        ].map((group) => (
          <div key={group.label} className="mt-6">
            <p className={`mb-1 text-xs font-bold uppercase tracking-[2px] ${group.color}`}>{group.label}</p>
            <div className={`${t.resultRound} ${group.border} ${t.resultCardCls} px-8 py-2`}>
              {group.items.map((c, i) => (
                <CriterionBar key={i} criterion={c} theme={theme} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <h3 className={`text-lg font-bold ${t.textPrimary}`}>How to Improve Your Score</h3>
        <div className="mt-4 space-y-3">
          {results.improvements.map((improvement, i) => (
            <div key={i} className={`flex gap-4 px-6 py-4 ${t.improvCardCls}`}>
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center ${theme === 'brutalist' ? '' : 'rounded-full'} ${t.numberBadge} text-xs font-bold text-white`}>{i + 1}</span>
              <p className={`text-[15px] ${t.textPrimary}`}>{improvement}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 text-center">
        <button onClick={onSeeHowToBuild} className={t.ctaCls}>
          See How to Build &amp; Sell It &rarr;
        </button>
      </div>
    </div>
  )
}

/* ── upsell section ────────────────────────────────────────────── */

function UpsellSection({ results, onBack, theme }: { results: WillItSellResult; onBack: () => void; theme: Theme }) {
  const t = T[theme]
  const color = getScoreColor(results.overallScore)

  return (
    <div className="mx-auto mt-10 max-w-[960px]">
      <div className="text-center">
        <p className={`text-xs font-bold uppercase tracking-[3px] ${t.textPrimary}`}>📊 You&apos;ve got your score!</p>
        <h2 className={`mt-3 ${t.headingFont} text-[clamp(24px,4vw,44px)] font-bold uppercase leading-[1.15] tracking-[1px] ${theme === 'brutalist' ? 'text-[#FFC107]' : 'text-[#4DB8BA]'}`} style={{ fontWeight: 700 }}>
          Now let&apos;s make it{' '}
          <span className={theme === 'brutalist' ? 'text-[#e91e90]' : 'text-[#e91e90]'}>actually happen.</span>
        </h2>
      </div>
      <div className="mt-10 flex items-center justify-center gap-3">
        <span className={`${theme === 'brutalist' ? '' : 'rounded-lg'} bg-[#e91e90] px-4 py-1.5 text-sm font-bold text-white`}>Step 1:</span>
        <span className={`text-lg font-bold ${t.textPrimary}`}>You know your score!</span>
        <span className="text-2xl">✅</span>
      </div>
      <div className={`mx-auto mt-6 max-w-[700px] ${t.resultRound} border-l-4 ${t.resultCardCls} px-8 py-6`} style={{ borderColor: color }}>
        <div className="flex items-center gap-4">
          <span className="font-anton text-[40px] leading-none" style={{ color }}>{results.overallScore}</span>
          <div>
            <span className={`${t.pillCls} px-4 py-1 text-xs font-bold uppercase tracking-wider text-white`} style={{ backgroundColor: color }}>{results.verdict}</span>
            <p className={`mt-2 text-sm italic ${t.textSecondary}`}>{results.summary}</p>
          </div>
        </div>
      </div>
      <div className={`my-6 text-center text-3xl ${theme === 'brutalist' ? 'text-[#FFC107]' : 'text-[#4DB8BA]'}`}>&darr;</div>
      <div className="flex items-center justify-center gap-3">
        <span className={`${theme === 'brutalist' ? '' : 'rounded-lg'} bg-[#e91e90] px-4 py-1.5 text-sm font-bold text-white`}>Step 2:</span>
        <span className={`text-lg font-bold ${t.textPrimary}`}>Now it&apos;s time to create it and start selling it:</span>
        <span className={`inline-flex h-6 w-6 items-center justify-center ${theme === 'brutalist' ? 'border-2 border-[#FFC107]' : 'rounded border-2 border-gray-300'}`} />
      </div>
      <div className={`mx-auto mt-8 max-w-[1075px] overflow-hidden ${theme === 'brutalist' ? 'border-4 border-[#FFC107] bg-[#2d2d2d] shadow-[8px_8px_0px_#FFC107]' : 'rounded-3xl border-2 border-[#4DB8BA] bg-white shadow-sm'}`}>
        <div className="flex flex-col sm:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/imgs/10k-launch-lab/hero3.png" alt="10K Launch Lab" className="w-full object-contain sm:w-[475px]" />
          <div className="flex flex-col justify-center p-8">
            <h3 className={`${t.headingFont} text-[clamp(24px,3.5vw,35px)] font-normal uppercase leading-[1.2] tracking-[0.5px] ${theme === 'brutalist' ? 'text-[#FFC107]' : 'text-[#4DB8BA]'}`}>
              How to Create a Viral Digital Product
            </h3>
            <p className={`mt-4 text-[16px] leading-relaxed ${t.textSecondary}`}>
              Learn how to create and sell a popular, in-demand digital product even if you&apos;re just getting started and have no idea what to sell or how to do it.
            </p>
            <a href="/10k-launch-lab" className={`mt-6 inline-block px-8 py-4 text-center text-[17px] font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg ${theme === 'brutalist' ? 'border-4 border-[#FFC107] bg-[#e91e90]' : 'rounded-lg bg-[#e91e90]'}`}>
              Show Me How to Create It &rarr;
            </a>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <button onClick={onBack} className={`text-sm ${t.textMuted} transition-colors hover:text-[#e91e90]`}>&larr; Back to my scorecard</button>
      </div>
    </div>
  )
}

/* ── formula card ───────────────────────────────────────────────── */

function FormulaCard({ theme }: { theme: Theme }) {
  const t = T[theme]
  const pillars = [
    { num: 1, title: 'Provokes Curiosity:', desc: 'Make people think "how is that even possible?"' },
    { num: 2, title: 'Solves a Hyper-Specific Problem:', desc: 'Laser-focused, not broad or generic' },
    { num: 3, title: 'Promises the Unbelievable:', desc: 'Seems too good to be true (but is achievable)' },
  ]

  return (
    <div className={`mx-auto mt-10 max-w-[960px] ${theme === 'brutalist' ? '' : 'rounded-2xl'} p-8 shadow-sm sm:p-10 ${t.formulaBg}`}>
      <h3 className={`text-2xl font-bold ${t.formulaText}`}>Ana&apos;s Viral Product Formula</h3>
      <p className={`mb-6 mt-1 text-[15px] ${t.formulaSub}`}>Every viral digital product has these 3 things:</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {pillars.map((p) => (
          <div key={p.num} className={t.formulaCardCls}>
            <span className={`mb-3 inline-flex h-8 w-8 items-center justify-center ${theme === 'brutalist' ? 'border-2 border-[#e91e90] bg-[#e91e90]' : 'rounded-md bg-[#F5B731]'} text-sm font-bold text-white`}>{p.num}</span>
            <h4 className={`mb-1 text-[15px] font-bold ${t.formulaText}`}>{p.title}</h4>
            <p className={`text-sm ${t.formulaDesc}`}>{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── CTA + footer ───────────────────────────────────────────────── */

function CtaBanner({ theme }: { theme: Theme }) {
  const t = T[theme]
  return (
    <div className={`mx-auto mt-10 max-w-[960px] px-8 py-5 text-center text-[15px] ${t.psBg} ${t.psText}`}>
      <span className={`font-bold not-italic ${theme === 'brutalist' ? 'text-[#FFC107]' : 'text-[#e91e90]'}`}>P.S.</span> The idea is the easy
      part. Knowing exactly how to turn it into a product that sells on autopilot
      &mdash; that&apos;s where most people get stuck. We&apos;ll show you the
      entire system, step by step.{' '}
      <a href="/10k-launch-lab" className={`font-bold underline ${theme === 'brutalist' ? 'text-[#FFC107] hover:text-[#e91e90]' : 'text-[#e91e90] hover:text-[#c2185b]'}`}>
        Click here!
      </a>
    </div>
  )
}

function Disclaimer({ theme }: { theme: Theme }) {
  const t = T[theme]
  return (
    <div className={`mx-auto mt-10 max-w-[960px] border-t ${t.disclaimerBorder} pt-6 text-center`}>
      <p className={`text-xs italic ${t.disclaimerText}`}>
        <strong className="not-italic">Disclaimer:</strong> Scores generated by this tool are AI-powered assessments for educational purposes only. Individual results will vary. Ana Calin is not responsible for business outcomes based on these scores.
      </p>
      <p className={`mt-2 text-xs ${t.disclaimerText}`}>&copy; Ana Calin {new Date().getFullYear()}, All Rights Reserved.</p>
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
  const [theme, setTheme] = useState<Theme>('rose')
  const resultsRef = useRef<HTMLDivElement>(null)
  const t = T[theme]

  const handleSubmit = async () => {
    if (!productIdea.trim()) { setError('Please describe your product idea.'); return }
    if (!price.trim()) { setError('Please enter your price point.'); return }
    if (!niche.trim()) { setError('Please enter your niche or target market.'); return }
    setError(''); setResults(null); setShowUpsell(false); setLoading(true)
    try {
      const res = await fetch('/api/will-it-sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIdea: productIdea.trim(), price: price.trim(), niche: niche.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong. Please try again.'); return }
      setResults(data)
      setTimeout(() => { resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, 200)
    } catch { setError('Network error. Please check your connection and try again.') }
    finally { setLoading(false) }
  }

  const handleSeeHowToBuild = () => { setShowUpsell(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const handleBackToScorecard = () => { setShowUpsell(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const handleStartOver = () => { setResults(null); setShowUpsell(false); setProductIdea(''); setPrice(''); setNiche(''); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const bodyBgCss = t.bodyBg.includes('gradient')
    ? `body { background: ${t.bodyBg} !important; }`
    : `body { background: ${t.bodyBg} !important; }`

  return (
    <main className={t.mainCls} style={{ marginTop: 0 }}>
      <style>{bodyBgCss}</style>
      <SpectrumBar theme={theme} setTheme={setTheme} />

      {!results && !showUpsell && (
        <>
          <h1 className={`mx-auto mt-8 max-w-[800px] text-center ${t.headingFont} text-[clamp(29px,4.4vw,58px)] font-normal uppercase leading-[1.15] tracking-[1px] ${t.headingColor}`}>
            Will It{' '}
            <span className="relative inline-block">
              Sell?
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 120 18" fill="none" preserveAspectRatio="none">
                <path d="M2 8C20 4 40 3 60 5C80 7 100 6 118 4" stroke={t.sellUnderline} strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
                <path d="M4 14C25 10 50 11 70 13C90 15 105 12 116 10" stroke={t.sellUnderline} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
              </svg>
            </span>
          </h1>
          <p className={`mx-auto mt-4 max-w-[620px] text-center text-[15px] italic ${t.subColor}`}>
            Get a brutally honest virality score and a step-by-step fix list to turn any idea into a{' '}
            <strong className={`not-italic ${t.strongColor}`}>no-brainer buy.</strong>
          </p>
        </>
      )}

      {!results && !showUpsell && (
        <FormCard productIdea={productIdea} setProductIdea={setProductIdea} price={price} setPrice={setPrice} niche={niche} setNiche={setNiche} onSubmit={handleSubmit} loading={loading} theme={theme} />
      )}

      {error && (
        <div className={`mx-auto mt-4 max-w-[960px] px-6 py-3 text-sm ${theme === 'brutalist' ? 'border-4 border-[#e74c3c] bg-[#2d2d2d] text-[#e74c3c]' : 'rounded-lg border border-red-200 bg-red-50 text-red-700'}`}>
          {error}
        </div>
      )}

      <div ref={resultsRef}>
        {results && !showUpsell && <ResultsSection results={results} onStartOver={handleStartOver} onSeeHowToBuild={handleSeeHowToBuild} theme={theme} />}
        {showUpsell && results && <UpsellSection results={results} onBack={handleBackToScorecard} theme={theme} />}
      </div>

      {!results && !showUpsell && <FormulaCard theme={theme} />}

      <CtaBanner theme={theme} />
      <Disclaimer theme={theme} />
    </main>
  )
}
