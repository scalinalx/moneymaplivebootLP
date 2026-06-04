'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Mail, Download, Copy, ArrowRight, Sparkles } from 'lucide-react';

const LAUNCH_STACK_PW = process.env.NEXT_PUBLIC_LAUNCH_STACK_PASSWORD || 'mellon_hwg';

function SuccessContent() {
    const searchParams = useSearchParams();
    const leadId = searchParams.get('leadId');

    const [isLoaded, setIsLoaded] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [name, setName] = useState('');
    const [hasBump1, setHasBump1] = useState(false); // 100 Genius Launch Ideas
    const [hasBump2, setHasBump2] = useState(false); // Offer Genius AI Builder
    const [hasBump3, setHasBump3] = useState(false); // The Launch Stack
    const [hasBundle, setHasBundle] = useState(false);
    const [copied, setCopied] = useState('');

    const genius = hasBump1 || hasBundle;
    const offerGenius = hasBump2 || hasBundle;
    const launchStack = hasBump3 || hasBundle;

    useEffect(() => {
        if (!leadId) {
            window.location.href = '/create-viral-digital-product';
            return;
        }
        if (leadId === 'TEST') {
            setIsPaid(true);
            setHasBump1(searchParams.get('bump1') === 'true');
            setHasBump2(searchParams.get('bump2') === 'true');
            setHasBump3(searchParams.get('bump3') === 'true');
            setHasBundle(searchParams.get('bundle') === 'true');
            setIsLoaded(true);
            return;
        }

        fetch(`/api/create-viral-digital-product/get-lead-status?leadId=${leadId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.lead.is_paid) {
                    setIsPaid(true);
                    setName(data.lead.name || '');
                    setHasBump1(!!data.lead.has_bump1);
                    setHasBump2(!!data.lead.has_bump2);
                    setHasBump3(!!data.lead.has_bump3);
                    setHasBundle(!!data.lead.has_bundle);

                    let total = 97;
                    if (data.lead.has_bundle) total += 81;
                    else {
                        if (data.lead.has_bump1) total += 27;
                        if (data.lead.has_bump2) total += 37;
                        if (data.lead.has_bump3) total += 67;
                    }
                    if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq) {
                        (window as unknown as { fbq: (...a: unknown[]) => void }).fbq('track', 'Purchase', {
                            value: total,
                            currency: 'USD',
                            contents: [{ id: 'create_viral_digital_product', quantity: 1 }],
                        });
                    }
                } else {
                    window.location.href = '/create-viral-digital-product';
                }
                setIsLoaded(true);
            })
            .catch(() => {
                window.location.href = '/create-viral-digital-product';
            });
    }, [leadId, searchParams]);

    const copy = (value: string, key: string) => {
        navigator.clipboard.writeText(value);
        setCopied(key);
        setTimeout(() => setCopied(''), 2000);
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FFFCF4]">
                <div className="animate-pulse text-[#6E665B] font-semibold">Confirming your order…</div>
            </div>
        );
    }
    if (!isPaid) return null;

    return (
        <div className="min-h-screen bg-[#FFFCF4] py-14 px-5">
            <div className="max-w-[640px] mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1E9E5A]/10 mb-5">
                        <CheckCircle className="text-[#1E9E5A]" size={36} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#262020] tracking-tight">
                        You&apos;re in{name ? `, ${name.split(' ')[0]}` : ''}! 🎉
                    </h1>
                    <p className="text-[#6E665B] font-semibold mt-3 max-w-[46ch] mx-auto">
                        Your seat for <b>How To Create The One Digital Product That Sells</b> is confirmed. The live link + replay land in your inbox shortly.
                    </p>
                </div>

                {/* Main access */}
                <div className="bg-white rounded-2xl border border-[#EEE3CE] shadow-[0_6px_18px_rgba(40,32,20,.08)] p-6 mb-4 flex gap-4 items-start">
                    <Mail className="text-[#F2AE17] flex-shrink-0 mt-1" size={24} />
                    <div>
                        <h2 className="font-bold text-[#262020] text-lg mb-1">Check your email</h2>
                        <p className="text-[#6E665B] text-[15px]">
                            We sent your workshop access, the calendar invite, and your replay link. Add it to your calendar so you don&apos;t miss it — 6:00 PM Athens / 11:00 AM New York / 8:00 AM Los Angeles.
                        </p>
                    </div>
                </div>

                {(genius || offerGenius || launchStack) && (
                    <div className="mt-8 mb-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="text-[#FF6A3D]" size={18} />
                            <h2 className="font-extrabold text-[#262020] text-lg">Your add-ons — unlock them now</h2>
                        </div>
                    </div>
                )}

                {/* Bump 1: 100 Genius Launch Ideas */}
                {genius && (
                    <div className="bg-white rounded-2xl border border-[#EEE3CE] shadow-[0_6px_18px_rgba(40,32,20,.08)] p-6 mb-4">
                        <h3 className="font-bold text-[#262020] text-lg mb-1">100 Genius Launch Ideas</h3>
                        <p className="text-[#6E665B] text-[15px] mb-4">Your 184-page vault of pre-validated offer templates. Instant download, lifetime access.</p>
                        <a
                            href="/downloads/100-Genius-Offers-Sell-2026.pdf"
                            download
                            className="inline-flex items-center gap-2 bg-[#FFC83D] hover:bg-[#F2AE17] text-[#262020] font-bold px-5 py-3 rounded-xl transition-colors"
                        >
                            <Download size={18} /> Download the PDF
                        </a>
                    </div>
                )}

                {/* Bump 2: Offer Genius AI Builder */}
                {offerGenius && (
                    <div className="bg-white rounded-2xl border border-[#EEE3CE] shadow-[0_6px_18px_rgba(40,32,20,.08)] p-6 mb-4">
                        <h3 className="font-bold text-[#262020] text-lg mb-1">Offer Genius AI Builder</h3>
                        <p className="text-[#6E665B] text-[15px] mb-4">Turn your idea into high-converting offer copy in minutes. Use the access password below.</p>
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={() => copy(LAUNCH_STACK_PW, 'og')}
                                className="inline-flex items-center gap-2 bg-[#FFF8E6] border border-[#EEE3CE] text-[#262020] font-mono font-bold px-4 py-2.5 rounded-xl"
                            >
                                {LAUNCH_STACK_PW} <Copy size={15} className="text-[#6E665B]" />
                            </button>
                            {copied === 'og' && <span className="text-[#1E9E5A] text-sm font-bold">Copied!</span>}
                            <a href="/ana-offer-genius" className="inline-flex items-center gap-1 text-[#E8541F] font-bold">
                                Open Offer Genius <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                )}

                {/* Bump 3: The Launch Stack */}
                {launchStack && (
                    <div className="bg-white rounded-2xl border border-[#EEE3CE] shadow-[0_6px_18px_rgba(40,32,20,.08)] p-6 mb-4">
                        <h3 className="font-bold text-[#262020] text-lg mb-1">The Launch Stack</h3>
                        <p className="text-[#6E665B] text-[15px] mb-4">My AI email-sequence writer — your whole launch, drafted for you. Use the access password below.</p>
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={() => copy(LAUNCH_STACK_PW, 'ls')}
                                className="inline-flex items-center gap-2 bg-[#FFF8E6] border border-[#EEE3CE] text-[#262020] font-mono font-bold px-4 py-2.5 rounded-xl"
                            >
                                {LAUNCH_STACK_PW} <Copy size={15} className="text-[#6E665B]" />
                            </button>
                            {copied === 'ls' && <span className="text-[#1E9E5A] text-sm font-bold">Copied!</span>}
                            <a href="/launch-stack" className="inline-flex items-center gap-1 text-[#E8541F] font-bold">
                                Open The Launch Stack <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                )}

                <p className="text-center text-[#6E665B] text-sm mt-10">
                    Questions? Email <a href="mailto:anaxcalin@gmail.com" className="text-[#E8541F] font-semibold">anaxcalin@gmail.com</a>
                </p>
            </div>
        </div>
    );
}

export default function CreateViralDigitalProductSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FFFCF4] text-[#6E665B]">Loading…</div>}>
            <SuccessContent />
        </Suspense>
    );
}
