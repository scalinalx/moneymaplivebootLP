'use client';

import React, {
  Suspense,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
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
import {
  getOrCreateSessionId,
  trackSuccessEvent,
} from '@/lib/offer-clarity-success-tracker';

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
const URL_WHAT_TO_SELL_RECORDING = process.env.NEXT_PUBLIC_OFFER_CLARITY_WHAT_TO_SELL_RECORDING_URL || '#what-to-sell-recording-coming-soon';

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
  trackingKey?: string;
}

// Tracking context — set up once at the SuccessInner root so any nested
// DeliveryCard / PasswordReveal can fire events without prop drilling.
interface TrackCtxValue {
  track: (
    type: 'password_copied' | 'link_clicked' | 'error_caught',
    data?: Record<string, unknown>,
  ) => void;
}
const TrackContext = createContext<TrackCtxValue>({ track: () => {} });
const useTrack = () => useContext(TrackContext);

function PasswordReveal({ password, trackingKey }: { password: string; trackingKey: string }) {
  const [copied, setCopied] = useState(false);
  const { track } = useTrack();
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      track('password_copied', { which: trackingKey });
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      track('error_caught', {
        where: 'password_copy',
        which: trackingKey,
        error: e instanceof Error ? e.message : String(e),
      });
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
  trackingKey,
}: DeliveryCardProps) {
  const { track } = useTrack();
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
          onClick={() => track('link_clicked', { which: trackingKey, href, external: Boolean(external) })}
          className={`inline-flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-black text-white font-bold text-xs md:text-sm uppercase tracking-wider px-5 py-3 rounded-md transition-all hover:-translate-y-0.5 whitespace-nowrap`}
          style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
        >
          {cta} {external && <ExternalLink size={14} />}
        </a>
      </div>
      {password && <PasswordReveal password={password} trackingKey={trackingKey || 'unknown'} />}
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
  has_what_to_sell_upsell: boolean;
  has_coaching_upsell: boolean;
  total_paid_cents: number;
  payment_completed_at: string | null;
}

// --- Dev-only mock lead presets so we can preview every bump combo locally ---
// Active only when NODE_ENV !== 'production' AND the URL has `?test=...`.
// In production builds this whole branch is a no-op.
const IS_DEV = process.env.NODE_ENV !== 'production';

const TEST_PRESETS: Record<string, Partial<Lead>> = {
  course_only: {},
  launch_stack: { has_bump_launch_stack: true },
  hooks: { has_bump_hooks: true },
  offer_genius: { has_bump_offer_genius: true },
  ls_hooks: { has_bump_launch_stack: true, has_bump_hooks: true },
  ls_genius: { has_bump_launch_stack: true, has_bump_offer_genius: true },
  hooks_genius: { has_bump_hooks: true, has_bump_offer_genius: true },
  all_three: {
    has_bump_launch_stack: true,
    has_bump_hooks: true,
    has_bump_offer_genius: true,
  },
  bundle: { has_bump_bundle: true },
  bundle_coaching: { has_bump_bundle: true, has_coaching_upsell: true },
  coaching_only: { has_coaching_upsell: true },
  what_to_sell_only: { has_what_to_sell_upsell: true },
  what_to_sell_and_coaching: {
    has_what_to_sell_upsell: true,
    has_coaching_upsell: true,
  },
  all: {
    has_bump_launch_stack: true,
    has_bump_hooks: true,
    has_bump_offer_genius: true,
    has_bump_bundle: true,
    has_what_to_sell_upsell: true,
    has_coaching_upsell: true,
  },
};

function buildMockLead(searchParams: URLSearchParams): Lead {
  const preset = searchParams.get('test') || '';
  const presetOverrides = TEST_PRESETS[preset] ?? {};

  // Fallback: free-form `?bumps=launch_stack,hooks,offer_genius,bundle,coaching`
  const bumpsParam = searchParams.get('bumps') || '';
  const bumpSet = new Set(
    bumpsParam
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  );

  return {
    id: 'TEST-LEAD-' + (preset || 'custom'),
    name: searchParams.get('name') || 'Test User',
    email: searchParams.get('email') || 'test@example.com',
    is_paid: true,
    has_bump_launch_stack:
      presetOverrides.has_bump_launch_stack ?? bumpSet.has('launch_stack'),
    has_bump_hooks: presetOverrides.has_bump_hooks ?? bumpSet.has('hooks'),
    has_bump_offer_genius:
      presetOverrides.has_bump_offer_genius ?? bumpSet.has('offer_genius'),
    has_bump_bundle: presetOverrides.has_bump_bundle ?? bumpSet.has('bundle'),
    has_what_to_sell_upsell:
      presetOverrides.has_what_to_sell_upsell ?? bumpSet.has('what_to_sell'),
    has_coaching_upsell:
      presetOverrides.has_coaching_upsell ??
      (searchParams.get('coaching') === '1' || bumpSet.has('coaching')),
    total_paid_cents: 19700,
    payment_completed_at: new Date().toISOString(),
  };
}

function DevTestPanel({ active }: { active: string }) {
  const presets: Array<{ key: string; label: string }> = [
    { key: 'course_only', label: 'Course only' },
    { key: 'launch_stack', label: '+ Launch Stack' },
    { key: 'hooks', label: '+ Hooks' },
    { key: 'offer_genius', label: '+ Offer Genius' },
    { key: 'ls_hooks', label: '+ LS + Hooks' },
    { key: 'ls_genius', label: '+ LS + Genius' },
    { key: 'hooks_genius', label: '+ Hooks + Genius' },
    { key: 'all_three', label: '+ All 3 (no bundle)' },
    { key: 'bundle', label: '+ Bundle' },
    { key: 'bundle_coaching', label: '+ Bundle + Coaching' },
    { key: 'coaching_only', label: '+ Coaching only' },
    { key: 'what_to_sell_only', label: '+ What-to-sell only' },
    { key: 'what_to_sell_and_coaching', label: '+ W-to-S + Coaching' },
    { key: 'all', label: 'EVERYTHING' },
  ];
  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-black/90 text-white rounded-xl shadow-2xl border border-white/10 p-3 max-w-[300px] backdrop-blur-sm font-mono text-xs">
      <p className="font-bold mb-2 text-emerald-400">
        🧪 DEV TEST MODE — current: <span className="text-amber-400">{active || 'custom'}</span>
      </p>
      <p className="text-white/60 mb-2">
        Click a combo to preview what the buyer sees on the success page.
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        {presets.map((p) => (
          <a
            key={p.key}
            href={`?test=${p.key}`}
            className={`block text-center px-2 py-1.5 rounded text-[11px] leading-tight transition-colors ${
              active === p.key
                ? 'bg-emerald-600 text-white'
                : 'bg-white/10 hover:bg-white/20 text-white/90'
            }`}
          >
            {p.label}
          </a>
        ))}
      </div>
      <p className="text-white/40 text-[10px] mt-2">
        Production-safe: this panel only mounts when NODE_ENV ≠ production.
      </p>
    </div>
  );
}

function SuccessInner() {
  const searchParams = useSearchParams();
  const leadId = searchParams.get('leadId') || '';
  const fromCoaching = searchParams.get('coaching') === '1';

  const testParam = searchParams.get('test');
  const testMode = IS_DEV && testParam !== null;

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string>('');

  // Initialize session id once on mount and fire the page_loaded event.
  // We never track in dev test mode so the table stays clean.
  useEffect(() => {
    const sid = getOrCreateSessionId();
    setSessionId(sid);
    if (testMode) return;
    trackSuccessEvent('page_loaded', {
      leadId: leadId || null,
      sessionId: sid,
      data: {
        href: typeof window !== 'undefined' ? window.location.href : null,
        fromCoaching,
        hasLeadIdParam: Boolean(leadId),
      },
    });
    if (!leadId) {
      trackSuccessEvent('lead_missing', { sessionId: sid });
    }

    // Track total time-on-page on unload via sendBeacon.
    const startedAt = Date.now();
    const onUnload = () => {
      trackSuccessEvent(
        'time_on_page',
        {
          leadId: leadId || null,
          sessionId: sid,
          data: { seconds: Math.round((Date.now() - startedAt) / 1000) },
        },
        { beacon: true },
      );
    };
    window.addEventListener('pagehide', onUnload);
    return () => window.removeEventListener('pagehide', onUnload);
    // We intentionally only run this once per mount; leadId/testMode are
    // captured in the closure and don't change on this page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (testMode) {
      setLead(buildMockLead(searchParams));
      setLoading(false);
      return;
    }
    if (!leadId) {
      setLoading(false);
      return;
    }
    if (!sessionId) return; // wait until session id is ready
    trackSuccessEvent('lead_fetch_started', { leadId, sessionId });
    fetch(`/api/offer-clarity/get-lead-status?leadId=${leadId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setLead(d.lead);
          trackSuccessEvent('lead_fetch_success', {
            leadId,
            sessionId,
            data: {
              email: d.lead?.email,
              is_paid: d.lead?.is_paid,
              has_bump_launch_stack: d.lead?.has_bump_launch_stack,
              has_bump_hooks: d.lead?.has_bump_hooks,
              has_bump_offer_genius: d.lead?.has_bump_offer_genius,
              has_bump_bundle: d.lead?.has_bump_bundle,
              has_coaching_upsell: d.lead?.has_coaching_upsell,
              total_paid_cents: d.lead?.total_paid_cents,
            },
          });
        } else {
          trackSuccessEvent('lead_fetch_failed', {
            leadId,
            sessionId,
            data: { error: d.error || 'unknown', responseShape: Object.keys(d) },
          });
        }
      })
      .catch((err) => {
        trackSuccessEvent('lead_fetch_failed', {
          leadId,
          sessionId,
          data: { error: err instanceof Error ? err.message : String(err) },
        });
      })
      .finally(() => setLoading(false));
  }, [leadId, testMode, searchParams, sessionId]);

  // Once the lead resolves, snapshot exactly which delivery cards rendered.
  useEffect(() => {
    if (!lead || !sessionId || testMode) return;
    const bumpsShown = {
      course: true,
      launch_stack: lead.has_bump_launch_stack || lead.has_bump_bundle,
      hooks: lead.has_bump_hooks || lead.has_bump_bundle,
      offer_genius: lead.has_bump_offer_genius || lead.has_bump_bundle,
      what_to_sell: lead.has_what_to_sell_upsell,
      coaching: lead.has_coaching_upsell,
    };
    trackSuccessEvent('render_snapshot', {
      leadId: lead.id,
      sessionId,
      data: {
        bumpsShown,
        bumpCount: Object.values(bumpsShown).filter(Boolean).length,
        password_visible_for: ['launch_stack', 'offer_genius'].filter(
          (k) => bumpsShown[k as keyof typeof bumpsShown],
        ),
      },
    });
    if (lead.has_coaching_upsell) {
      trackSuccessEvent('coaching_card_shown', { leadId: lead.id, sessionId });
    }
  }, [lead, sessionId, testMode]);

  // Fire purchase pixel + GA event once on mount.
  // Skipped entirely in dev test mode so we don't log fake conversions.
  useEffect(() => {
    if (typeof window === 'undefined' || !lead || testMode) return;
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
        {
          name: '"What Do I Even Sell?" workshop recording',
          included: lead.has_what_to_sell_upsell,
        },
        { name: '1:1 Coaching Call with Ana', included: lead.has_coaching_upsell },
      ]
    : [];

  // Stable track function bound to current lead/session — passed via context
  // so DeliveryCard / PasswordReveal can fire events without prop drilling.
  const trackCtxValue = useMemo<TrackCtxValue>(
    () => ({
      track: (type, data) => {
        if (testMode) return;
        trackSuccessEvent(type, {
          leadId: lead?.id ?? leadId ?? null,
          sessionId,
          data,
        });
      },
    }),
    [lead, leadId, sessionId, testMode],
  );

  return (
    <TrackContext.Provider value={trackCtxValue}>
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
                trackingKey="course"
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
                  trackingKey="launch_stack"
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
                  trackingKey="hooks"
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
                  trackingKey="offer_genius"
                />
              )}

              {/* "What Do I Even Sell?" workshop-recording upsell — conditional */}
              {lead.has_what_to_sell_upsell && (
                <DeliveryCard
                  title="What Do I Even Sell?"
                  description="The 60-minute workshop recording: how to find the one skill hiding in your brain that people will pay for. Plus the Skill Audit, First-Week Action Plan, and 90-Day Sprint Calendar."
                  cta="WATCH THE RECORDING"
                  href={URL_WHAT_TO_SELL_RECORDING}
                  external={URL_WHAT_TO_SELL_RECORDING !== '#what-to-sell-recording-coming-soon'}
                  icon={Video}
                  accent="text-pink-700"
                  border="border-pink-300"
                  bg="bg-pink-50"
                  badge="Workshop recording"
                  trackingKey="what_to_sell"
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
                  trackingKey="coaching"
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
                trackingKey="bonus_workbook"
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
                trackingKey="bonus_launch_template"
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
                trackingKey="bonus_ai_offer_flow"
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

      {testMode && <DevTestPanel active={testParam || ''} />}
    </main>
    </TrackContext.Provider>
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
