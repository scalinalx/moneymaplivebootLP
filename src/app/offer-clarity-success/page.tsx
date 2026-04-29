'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Mail,
  BookOpen,
  Sparkles,
  Calendar,
  ExternalLink,
  GraduationCap,
  Rocket,
  Zap,
  Wand2,
  Video,
} from 'lucide-react';
import { PurchaseNotification } from '@/components/PurchaseNotification';

// Product delivery URLs. Course URL is a placeholder until the Teachable
// course finishes uploading.
const COURSE_URL = process.env.NEXT_PUBLIC_OFFER_CLARITY_COURSE_URL || '#course-coming-soon';
const URL_HOOKS = 'https://anabubolea.notion.site/Hooks-That-Stop-the-Scroll-17c9b91e546e80b7a0f2c8908465faf2?source=copy_link';
const URL_LAUNCH_STACK = '/launch-stack';
const URL_OFFER_GENIUS = '/ana-offer-genius';
const URL_AI_OFFER_FLOW = '/ana-ai-offer-flow';
const URL_WORKBOOK = '/downloads/one-sentence-offer-workbook.pdf';
const URL_LAUNCH_TEMPLATE = '/downloads/3-email-launch-template.pdf';
const URL_COACHING_BOOKING = process.env.NEXT_PUBLIC_OFFER_CLARITY_COACHING_BOOKING_URL || 'mailto:anaxcalin@gmail.com?subject=Book%20My%201:1%20Coaching%20Call';

// Shared password for the password-protected AI tools (Launch Stack + Offer Genius).
const TOOL_PASSWORD = process.env.NEXT_PUBLIC_LAUNCH_STACK_PASSWORD || 'mellon_hwg';

interface DeliveryCardProps {
  title: string;
  description: string;
  cta: string;
  href: string;
  external?: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent: string;
  border: string;
  bg: string;
  badge?: string;
  compact?: boolean;
  password?: string | null;
}

function PasswordReveal({ password }: { password: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };
  return (
    <div className="mt-4 rounded-lg border border-dashed border-amber-400 bg-amber-50 px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
      <div className="flex-1 min-w-[180px]">
        <p
          className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700 mb-1"
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          Access password
        </p>
        <code className="font-mono text-base md:text-lg font-bold text-[#1a1a1a] break-all">
          {password}
        </code>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="flex-shrink-0 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded transition-colors"
        style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
      >
        {copied ? 'Copied!' : 'Copy password'}
      </button>
    </div>
  );
}

function DeliveryCard({
  title,
  description,
  cta,
  href,
  external,
  icon: Icon,
  accent,
  border,
  bg,
  badge,
  compact,
  password,
}: DeliveryCardProps) {
  return (
    <div
      className={`relative rounded-2xl border-2 ${border} ${bg} ${
        compact ? 'p-5' : 'p-6'
      } shadow-sm`}
    >
      {badge && (
        <div className={`absolute -top-2.5 left-5 text-[10px] font-extrabold uppercase tracking-widest ${accent} bg-white border ${border} px-2 py-0.5 rounded-full`}>
          {badge}
        </div>
      )}
      <div className={`flex ${compact ? 'flex-col' : 'flex-col md:flex-row'} gap-4 md:items-center`}>
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-xl ${bg} border ${border} flex items-center justify-center`}
        >
          <Icon size={22} className={accent} />
        </div>
        <div className="flex-1">
          <h4
            className="text-lg md:text-xl font-extrabold text-[#1a1a1a] leading-tight mb-1"
            style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
          >
            {title}
          </h4>
          <p className="text-sm md:text-base text-gray-700 leading-snug">{description}</p>
        </div>
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={`inline-flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-black text-white font-bold text-xs md:text-sm uppercase tracking-wider px-5 py-3 rounded-md transition-all hover:-translate-y-0.5 whitespace-nowrap`}
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          {cta} {external && <ExternalLink size={14} />}
        </a>
      </div>
      {password && <PasswordReveal password={password} />}
    </div>
  );
}

interface Lead {
  id: string;
  name: string | null;
  email: string;
  is_paid: boolean;
  has_bump_launch_stack: boolean;
  has_bump_hooks: boolean;
  has_bump_offer_genius: boolean;
  has_bump_bundle: boolean;
  has_coaching_upsell: boolean;
  total_paid_cents: number;
  payment_completed_at: string | null;
}

function SuccessInner() {
  const searchParams = useSearchParams();
  const leadId = searchParams.get('leadId') || '';
  const fromCoaching = searchParams.get('coaching') === '1';

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!leadId) {
      setLoading(false);
      return;
    }
    fetch(`/api/offer-clarity/get-lead-status?leadId=${leadId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setLead(d.lead);
      })
      .finally(() => setLoading(false));
  }, [leadId]);

  // Fire purchase pixel + GA event once on mount
  useEffect(() => {
    if (typeof window === 'undefined' || !lead) return;
    const w = window as {
      fbq?: (...args: unknown[]) => void;
      gtag?: (...args: unknown[]) => void;
    };
    if (w.fbq) {
      w.fbq('track', 'Purchase', {
        value: lead.total_paid_cents / 100,
        currency: 'USD',
      });
    }
    if (w.gtag) {
      w.gtag('event', 'purchase', {
        transaction_id: lead.id,
        value: lead.total_paid_cents / 100,
        currency: 'USD',
      });
    }
  }, [lead]);

  const items = lead
    ? [
        { name: 'The Offer Clarity Sprint course', included: true },
        {
          name: 'Launch Stack',
          included: lead.has_bump_launch_stack || lead.has_bump_bundle,
        },
        {
          name: 'Hooks That Stop The Scroll',
          included: lead.has_bump_hooks || lead.has_bump_bundle,
        },
        {
          name: 'Offer Genius',
          included: lead.has_bump_offer_genius || lead.has_bump_bundle,
        },
        { name: '1:1 Coaching Call with Ana', included: lead.has_coaching_upsell },
      ]
    : [];

  return (
    <main
      className="min-h-screen bg-[#faf7f0]"
      style={{ fontFamily: 'Lora, Georgia, serif' }}
    >
      <div className="bg-emerald-600 text-white py-3 text-center">
        <p
          className="text-xs md:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          <CheckCircle2 size={16} /> Payment confirmed
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-5">
            <CheckCircle2 className="text-emerald-600" size={36} />
          </div>
          <h1
            className="text-3xl md:text-5xl font-extrabold leading-tight mb-3 text-emerald-600"
            style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
          >
            {lead?.name ? `Welcome in, ${lead.name.split(' ')[0]}.` : 'Welcome in.'}
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-xl mx-auto">
            Your purchase is confirmed. Everything below is on its way to{' '}
            {lead ? (
              <span className="font-bold text-[#1a1a1a]">{lead.email}</span>
            ) : (
              'your inbox'
            )}{' '}
            within the next few minutes.
          </p>
        </div>

        {/* ============ INSTANT-ACCESS DELIVERY CARDS ============ */}
        {!loading && lead && (
          <div className="mb-10">
            <h2
              className="text-xl md:text-2xl font-extrabold text-center mb-6 text-[#1a1a1a]"
              style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
            >
              Get instant access:
            </h2>
            <div className="space-y-4">
              {/* The course itself — always shown */}
              <DeliveryCard
                title="The Offer Clarity Sprint Course"
                description={
                  COURSE_URL === '#course-coming-soon'
                    ? 'Final modules are uploading now. Your private course login link arrives in your inbox within 5 minutes.'
                    : 'Your full Offer Clarity Sprint course — every module, every workbook, every walkthrough.'
                }
                cta={
                  COURSE_URL === '#course-coming-soon'
                    ? 'CHECK YOUR INBOX'
                    : 'OPEN THE COURSE'
                }
                href={COURSE_URL === '#course-coming-soon' ? `mailto:${lead.email}` : COURSE_URL}
                external={COURSE_URL !== '#course-coming-soon'}
                icon={GraduationCap}
                accent="text-[#9E8B52]"
                border="border-[#9E8B52]"
                bg="bg-[#FFFBEB]"
                badge="Main course"
              />

              {/* Order bumps — conditional */}
              {(lead.has_bump_launch_stack || lead.has_bump_bundle) && (
                <DeliveryCard
                  title="Launch Stack"
                  description="Your AI email-sequence writer + plug-and-play launch templates — turn any idea into a 7-day email rollout in minutes."
                  cta="OPEN LAUNCH STACK"
                  href={URL_LAUNCH_STACK}
                  external
                  icon={Rocket}
                  accent="text-indigo-700"
                  border="border-indigo-300"
                  bg="bg-indigo-50"
                  badge="Add-on"
                  password={TOOL_PASSWORD}
                />
              )}

              {(lead.has_bump_hooks || lead.has_bump_bundle) && (
                <DeliveryCard
                  title="Hooks That Stop The Scroll"
                  description="My private vault of high-converting headlines and opening lines. Notion-hosted — copy what you need, swap the variables."
                  cta="OPEN THE HOOKS VAULT"
                  href={URL_HOOKS}
                  external
                  icon={Zap}
                  accent="text-rose-700"
                  border="border-rose-300"
                  bg="bg-rose-50"
                  badge="Add-on"
                />
              )}

              {(lead.has_bump_offer_genius || lead.has_bump_bundle) && (
                <DeliveryCard
                  title="Offer Genius"
                  description="The AI offer-builder that generates 50 niche-specific offer angles in 60 seconds."
                  cta="OPEN OFFER GENIUS"
                  href={URL_OFFER_GENIUS}
                  external
                  icon={Wand2}
                  accent="text-amber-700"
                  border="border-amber-300"
                  bg="bg-amber-50"
                  badge="Add-on"
                  password={TOOL_PASSWORD}
                />
              )}

              {/* Coaching upsell — conditional */}
              {lead.has_coaching_upsell && (
                <DeliveryCard
                  title="1:1 Coaching Call with Ana"
                  description="Private 60-minute Zoom + recording. Click below to pick a time — your slot is reserved."
                  cta="BOOK MY COACHING CALL"
                  href={URL_COACHING_BOOKING}
                  external
                  icon={Video}
                  accent="text-emerald-700"
                  border="border-emerald-400"
                  bg="bg-emerald-50"
                  badge="Premium upsell"
                />
              )}
            </div>

            {/* Always-included free bonuses */}
            <h3
              className="text-base md:text-lg font-extrabold uppercase tracking-widest text-center mt-10 mb-4 text-[#9E8B52]"
              style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
            >
              Plus your free launch bonuses:
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <DeliveryCard
                title="One-Sentence Offer Workbook"
                description="Fill in the blanks. Build your offer in 30 minutes."
                cta="DOWNLOAD WORKBOOK"
                href={URL_WORKBOOK}
                icon={BookOpen}
                accent="text-[#9E8B52]"
                border="border-[#9E8B52]/30"
                bg="bg-white"
                badge="FREE bonus"
                compact
              />
              <DeliveryCard
                title="3-Email Launch Template"
                description="Copy. Paste. Send. Launch this week."
                cta="DOWNLOAD TEMPLATE"
                href={URL_LAUNCH_TEMPLATE}
                icon={Mail}
                accent="text-[#9E8B52]"
                border="border-[#9E8B52]/30"
                bg="bg-white"
                badge="FREE bonus"
                compact
              />
              <DeliveryCard
                title="AI Offer Flow Access (Forever)"
                description="The AI tool that generates a validated offer in 60 seconds. Yours forever."
                cta="OPEN AI OFFER FLOW"
                href={URL_AI_OFFER_FLOW}
                external
                icon={Sparkles}
                accent="text-[#9E8B52]"
                border="border-[#9E8B52]/30"
                bg="bg-white"
                badge="FREE bonus"
                compact
              />
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-500">Loading your order…</p>
        ) : (
          <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden mb-8">
            <div className="bg-[#1a1a1a] py-4 px-6 flex items-center justify-between">
              <p
                className="text-white font-bold text-sm uppercase tracking-widest"
                style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
              >
                What you got
              </p>
              {lead && (
                <p
                  className="text-[#c9b67e] font-extrabold text-2xl"
                  style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                >
                  ${lead.total_paid_cents / 100}
                </p>
              )}
            </div>
            <ul className="p-6 md:p-8 space-y-3">
              {items.map((item) => (
                <li
                  key={item.name}
                  className={`flex items-center gap-3 ${
                    item.included ? 'text-[#1a1a1a]' : 'text-gray-400 line-through'
                  }`}
                >
                  {item.included ? (
                    <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-gray-300 flex-shrink-0" />
                  )}
                  <span className="text-base md:text-lg">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Next steps */}
        <div className="bg-[#1a1a1a] text-white rounded-3xl p-6 md:p-8 mb-8">
          <h2
            className="text-xl md:text-2xl font-extrabold mb-4"
            style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
          >
            What happens next
          </h2>
          <ol className="space-y-4 text-sm md:text-base">
            <li className="flex gap-4">
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full bg-[#9E8B52] text-white font-bold flex items-center justify-center"
                style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
              >
                1
              </span>
              <p>
                Check your inbox for the{' '}
                <span className="font-bold text-[#c9b67e]">welcome email</span> with your course
                login + bonus downloads.
              </p>
            </li>
            <li className="flex gap-4">
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full bg-[#9E8B52] text-white font-bold flex items-center justify-center"
                style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
              >
                2
              </span>
              <p>
                Open <span className="font-bold text-[#c9b67e]">Module 1: The Clarity Framework</span>{' '}
                — you can write your one-sentence offer in the first 20 minutes.
              </p>
            </li>
            {lead?.has_coaching_upsell && (
              <li className="flex gap-4">
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full bg-[#9E8B52] text-white font-bold flex items-center justify-center"
                  style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
                >
                  3
                </span>
                <p>
                  Your <span className="font-bold text-[#c9b67e]">1:1 coaching booking link</span>{' '}
                  arrives in a separate email — pick a slot that works for you.
                </p>
              </li>
            )}
          </ol>
        </div>

        {fromCoaching && (
          <div className="bg-[#FFFBEB] border-2 border-[#9E8B52]/30 rounded-2xl p-5 mb-8 text-center">
            <Calendar className="text-[#9E8B52] mx-auto mb-2" size={22} />
            <p
              className="font-extrabold text-[#1a1a1a] mb-1"
              style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
            >
              Your 1:1 with Ana is reserved
            </p>
            <p className="text-sm text-gray-600">
              Watch your inbox for the booking link — it lands within 5 minutes.
            </p>
          </div>
        )}

        <p className="text-xs text-gray-500 text-center">
          Questions?{' '}
          <a
            href="mailto:anaxcalin@gmail.com"
            className="underline hover:text-gray-700"
          >
            anaxcalin@gmail.com
          </a>{' '}
          — I read every email.
        </p>
      </div>

      <footer className="py-8 text-center text-gray-400 text-xs border-t border-gray-200 bg-white">
        <p>© Ana Calin — How We Grow {new Date().getFullYear()}, All Rights Reserved.</p>
      </footer>
    </main>
  );
}

export default function OfferClaritySuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf7f0] flex items-center justify-center">
          <p className="text-gray-500 text-lg">Loading…</p>
        </div>
      }
    >
      <SuccessInner />
      <PurchaseNotification />
    </Suspense>
  );
}
