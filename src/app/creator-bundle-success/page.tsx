'use client';

import { useEffect, Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Mail, Zap, ArrowRight, BookOpen, Copy, Sparkles, Image, MousePointerClick } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const leadId = searchParams.get('leadId');
    const sdtTokenFromUrl = searchParams.get('sdtToken');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [sdtToken, setSdtToken] = useState<string | null>(sdtTokenFromUrl);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (leadId === 'TEST') {
            setIsPaid(true);
            if (!sdtToken) setSdtToken('SDT-TESTTOKEN');
            setIsLoaded(true);
            return;
        }

        if (leadId) {
            fetch(`/api/creator-bundle/get-lead-status?leadId=${leadId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.lead.is_paid) {
                        setIsPaid(true);

                        if (typeof window !== 'undefined' && (window as any).fbq) {
                            (window as any).fbq('track', 'Purchase', {
                                value: 97,
                                currency: 'USD',
                                contents: [{ id: 'creator_bundle', quantity: 1 }],
                            });
                        }
                    } else {
                        window.location.href = '/creator-bundle';
                    }
                    setIsLoaded(true);
                })
                .catch(() => {
                    window.location.href = '/creator-bundle';
                });
        } else {
            window.location.href = '/creator-bundle';
        }
    }, [leadId]);

    const copyToken = () => {
        if (sdtToken) {
            navigator.clipboard.writeText(sdtToken);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!isLoaded || !isPaid) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white font-lora text-gray-400 italic">
                Verifying access...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Flashing "Don't close" banner */}
            <div className="w-full bg-[#f72585] text-white py-3 px-4 text-center animate-pulse sticky top-0 z-50 shadow-lg">
                <p className="font-montserrat font-black text-sm md:text-lg uppercase tracking-wider flex items-center justify-center gap-2">
                    <span className="text-2xl">&#9888;</span>
                    STOP! Don't close this page — your access links & downloads are below
                    <span className="text-2xl">&#9888;</span>
                </p>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center">
                {/* Success icon */}
                <div className="w-20 h-20 bg-[#27AE60] rounded-full flex items-center justify-center mb-8 shadow-lg">
                    <CheckCircle className="w-12 h-12 text-white" />
                </div>

                <h1 className="font-anton text-4xl md:text-6xl text-[#333333] mb-6 text-center uppercase">
                    You're In!
                </h1>

                <p className="font-lora text-xl text-gray-600 max-w-2xl text-center mb-12">
                    The <strong>Creator Launch Kit</strong> is yours. All 4 tools — instant access. Here's everything you need to get started right now.
                </p>

                {/* Tool 1: Show Don't Tell */}
                {sdtToken && (
                    <div className="w-full mb-6 bg-gray-50 border-2 border-[#f72585] p-6 rounded-2xl">
                        <div className="flex flex-col md:flex-row items-start gap-6">
                            <div className="bg-[#f72585] p-3 rounded-full flex-shrink-0">
                                <Image className="text-white" size={28} />
                            </div>
                            <div className="flex-grow">
                                <p className="text-[#f72585] font-bold uppercase text-xs tracking-widest mb-1">Tool 1 — Access Unlocked</p>
                                <h3 className="font-anton text-xl text-[#333333] uppercase mb-3">Show Don't Tell — Viral Thumbnail Generator</h3>

                                <div className="bg-white border-2 border-[#f72585]/30 rounded-xl p-5 mb-4 space-y-3">
                                    <p className="font-bold text-[#333333] text-sm">Here's how to use your 400 image credits:</p>
                                    <div className="flex items-start gap-3">
                                        <span className="bg-[#f72585] text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                                        <p className="text-gray-700 text-sm font-medium">Click <strong>"Open Tool"</strong> below.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="bg-[#f72585] text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                                        <p className="text-gray-700 text-sm font-medium">Enter your <strong>token ID</strong> (shown below) to log in.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="bg-[#f72585] text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                                        <p className="text-gray-700 text-sm font-medium">Start generating thumbnails! <strong>400 credits</strong> (~200 generations).</p>
                                    </div>
                                </div>

                                <div className="bg-[#333333] rounded-xl p-4 mb-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
                                    <div>
                                        <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1">Your Token ID:</p>
                                        <p className="font-mono text-[#ffc300] text-2xl font-black tracking-widest select-all">{sdtToken}</p>
                                    </div>
                                    <button onClick={copyToken} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                        <Copy size={14} />{copied ? 'Copied!' : 'Copy Token'}
                                    </button>
                                </div>

                                <a href="/show-dont-tell" target="_blank" className="inline-flex items-center gap-2 bg-[#f72585] text-white px-7 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-[#d81b6f] transition-colors">
                                    Open Tool → Enter Token Above
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tool 2: 100 Genius Ideas */}
                <div className="w-full mb-6 bg-gray-50 border-2 border-[#27AE60] p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                    <div className="bg-[#27AE60] p-3 rounded-full flex-shrink-0">
                        <BookOpen className="text-white" size={28} />
                    </div>
                    <div className="flex-grow text-center md:text-left">
                        <p className="text-[#27AE60] font-bold uppercase text-xs tracking-widest mb-1">Tool 2 — Access Unlocked</p>
                        <h3 className="font-anton text-xl text-[#333333] uppercase mb-1">100 Genius Launch Ideas</h3>
                        <p className="text-gray-600 text-sm font-lora">Your 184-page PDF vault is ready to download.</p>
                    </div>
                    <a href="/downloads/100-Genius-Offers-Sell-2026.pdf" download className="bg-[#27AE60] text-white px-7 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-green-700 transition-colors whitespace-nowrap flex-shrink-0">
                        Download PDF →
                    </a>
                </div>

                {/* Tool 3: Hooks */}
                <div className="w-full mb-6 bg-gray-50 border-2 border-[#27AE60] p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                    <div className="bg-[#27AE60] p-3 rounded-full flex-shrink-0">
                        <MousePointerClick className="text-white" size={28} />
                    </div>
                    <div className="flex-grow text-center md:text-left">
                        <p className="text-[#27AE60] font-bold uppercase text-xs tracking-widest mb-1">Tool 3 — Access Unlocked</p>
                        <h3 className="font-anton text-xl text-[#333333] uppercase mb-1">Hooks That Stop the Scroll</h3>
                        <p className="text-gray-600 text-sm font-lora">Access your headline frameworks and opening loops vault on Notion.</p>
                    </div>
                    <a href="https://anabubolea.notion.site/Hooks-That-Stop-the-Scroll-17c9b91e546e80b7a0f2c8908465faf2?source=copy_link" target="_blank" rel="noopener noreferrer" className="bg-[#27AE60] text-white px-7 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-green-700 transition-colors whitespace-nowrap flex-shrink-0">
                        Open Vault →
                    </a>
                </div>

                {/* Tool 4: Launch Stack */}
                <div className="w-full mb-12 bg-gray-50 border-2 border-[#7209b7] p-6 rounded-2xl">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                        <div className="bg-[#7209b7] p-3 rounded-full flex-shrink-0">
                            <Mail className="text-white" size={28} />
                        </div>
                        <div className="flex-grow">
                            <p className="text-[#7209b7] font-bold uppercase text-xs tracking-widest mb-1">Tool 4 — Access Unlocked</p>
                            <h3 className="font-anton text-xl text-[#333333] uppercase mb-3">LaunchStack — AI Email Sequence Writer</h3>

                            <div className="bg-white border-2 border-[#7209b7]/30 rounded-xl p-5 mb-4 space-y-3">
                                <p className="font-bold text-[#333333] text-sm">Here's how to access LaunchStack:</p>
                                <div className="flex items-start gap-3">
                                    <span className="bg-[#7209b7] text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                                    <p className="text-gray-700 text-sm font-medium">Click <strong>"Open Tool"</strong> below. A new page will open.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="bg-[#7209b7] text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                                    <p className="text-gray-700 text-sm font-medium">Enter the <strong>password</strong> shown below.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="bg-[#7209b7] text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                                    <p className="text-gray-700 text-sm font-medium">Start generating launch email sequences instantly!</p>
                                </div>
                            </div>

                            <div className="bg-[#333333] rounded-xl p-4 mb-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
                                <div>
                                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1">Your Password:</p>
                                    <p className="font-mono text-[#ffc300] text-2xl font-black tracking-widest select-all">mellon_hwg</p>
                                </div>
                                <p className="text-gray-400 text-xs italic text-center sm:text-right max-w-[160px]">Copy this exactly — underscores and all</p>
                            </div>

                            <a href="/launch-stack" target="_blank" className="inline-flex items-center gap-2 bg-[#7209b7] text-white px-7 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-[#5c0896] transition-colors">
                                Open Tool → Enter Password Above
                            </a>
                        </div>
                    </div>
                </div>

                {/* What You Got summary */}
                <div className="w-full bg-[#27AE60]/5 p-8 rounded-xl border border-[#27AE60]/20 mb-12">
                    <h3 className="font-anton text-xl text-[#333333] mb-6 uppercase text-center">Your Creator Launch Kit</h3>
                    <ul className="space-y-3">
                        {[
                            { item: "Show Don't Tell — 400 AI Thumbnail Credits (1 year)", icon: Image, color: "#f72585" },
                            { item: "100 Genius Launch Ideas — 184-Page PDF (Lifetime)", icon: BookOpen, color: "#27AE60" },
                            { item: "Hooks That Stop the Scroll — Headline Vault (Lifetime)", icon: MousePointerClick, color: "#27AE60" },
                            { item: "LaunchStack — AI Email Sequence Writer (Lifetime)", icon: Mail, color: "#7209b7" },
                        ].map((row, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <CheckCircle size={18} style={{ color: row.color }} className="flex-shrink-0" />
                                <span className="font-lato text-gray-700 font-medium">{row.item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support */}
                <div className="text-center bg-[#F5F5F5] p-10 rounded-2xl w-full border border-gray-200">
                    <h2 className="font-anton text-2xl text-[#333333] mb-4 uppercase">Have Questions?</h2>
                    <p className="font-lora italic text-gray-500 mb-8">
                        Our support team is here to help you get the most out of your Creator Launch Kit.
                    </p>
                    <a href="mailto:anaxcalin@gmail.com" className="inline-flex items-center gap-2 bg-[#27AE60] hover:bg-[#219653] text-white font-montserrat font-bold py-4 px-10 rounded shadow-lg transition-all">
                        CONTACT SUPPORT <ArrowRight size={18} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function CreatorBundleSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white font-lora text-gray-400 italic">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
