'use client';

import { useEffect, Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Mail, Zap, ArrowRight, BookOpen, Copy, Sparkles } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const leadId = searchParams.get('leadId');
    const sdtTokenFromUrl = searchParams.get('sdtToken');
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [hasBump1, setHasBump1] = useState(false);
    const [hasBump2, setHasBump2] = useState(false);
    const [hasBump3, setHasBump3] = useState(false);
    const [hasBundle, setHasBundle] = useState(false);
    const [sdtToken, setSdtToken] = useState<string | null>(sdtTokenFromUrl);
    const [copied, setCopied] = useState(false);

    const hasSdt = hasBump3 || hasBundle;
    const hasGenius = hasBump1 || hasBundle;
    const hasHooks = hasBump2 || hasBundle;

    useEffect(() => {
        if (leadId === 'TEST') {
            setIsPaid(true);
            setHasBump1(searchParams.get('bump1') === 'true');
            setHasBump2(searchParams.get('bump2') === 'true');
            setHasBump3(searchParams.get('bump3') === 'true');
            setHasBundle(searchParams.get('bundle') === 'true');
            if (!sdtToken) setSdtToken('SDT-TESTTOKEN');
            setIsLoaded(true);
            return;
        }

        if (leadId) {
            fetch(`/api/build-your-substack/get-lead-status?leadId=${leadId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.lead.is_paid) {
                        setIsPaid(true);
                        setHasBump1(!!data.lead.has_bump1);
                        setHasBump2(!!data.lead.has_bump2);
                        setHasBump3(!!data.lead.has_bump3);
                        setHasBundle(!!data.lead.has_bundle);

                        let total = 97;
                        if (data.lead.has_bundle) {
                            total += 69;
                        } else {
                            if (data.lead.has_bump3) total += 47;
                            if (data.lead.has_bump1) total += 27;
                            if (data.lead.has_bump2) total += 27;
                        }

                        if (typeof window !== 'undefined' && (window as any).fbq) {
                            (window as any).fbq('track', 'Purchase', {
                                value: total,
                                currency: 'USD',
                                contents: [{ id: 'build_your_substack', quantity: 1 }],
                            });
                        }
                    } else {
                        window.location.href = '/build-your-substack';
                    }
                    setIsLoaded(true);
                })
                .catch(() => {
                    window.location.href = '/build-your-substack';
                });
        } else {
            window.location.href = '/build-your-substack';
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
                    STOP! Don&apos;t close this page — your access links & downloads are below
                    <span className="text-2xl">&#9888;</span>
                </p>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center">

                {/* Success icon */}
                <div className="w-20 h-20 bg-[#27AE60] rounded-full flex items-center justify-center mb-8 shadow-lg">
                    <CheckCircle className="w-12 h-12 text-white" />
                </div>

                <h1 className="font-anton text-4xl md:text-6xl text-[#333333] mb-6 text-center uppercase">
                    You&apos;re In!
                </h1>

                <p className="font-lora text-xl text-gray-600 max-w-2xl text-center mb-12">
                    Success! You now have access to <strong>Build Your Substack</strong> — the live workshop that turns your stuck ideas into published, revenue-generating Substack content.
                </p>

                {/* Main Workshop Access */}
                <div className="w-full mb-8 bg-[#ffc300]/10 border-2 border-[#ffc300] p-8 rounded-2xl">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="bg-[#ffc300] p-4 rounded-full flex-shrink-0">
                            <Zap className="text-[#1a1a1a]" size={32} fill="#1a1a1a" />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <p className="text-[#f72585] font-bold uppercase text-xs tracking-widest mb-1">Workshop Access Confirmed</p>
                            <h2 className="font-anton text-2xl text-[#333333] uppercase mb-2">Build Your Substack — Live Workshop</h2>
                            <div className="bg-white border border-[#ffc300]/40 p-4 rounded-xl mb-3">
                                <p className="text-gray-700 font-medium text-sm mb-1">
                                    <strong>Saturday, March 21 @ 10:00 AM EST</strong>
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Check your inbox for the live workshop link, replay access, and all templates & resources.
                                </p>
                                <p className="text-gray-400 text-xs italic mt-2">
                                    Please allow up to 60 minutes for the email to arrive. Check spam/promotions if needed.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SDT Bump Fulfillment */}
                {hasSdt && sdtToken && (
                    <div className="w-full mb-6 bg-gray-50 border-2 border-[#f72585] p-6 rounded-2xl">
                        <div className="flex flex-col md:flex-row items-start gap-6">
                            <div className="bg-[#f72585] p-3 rounded-full flex-shrink-0">
                                <Sparkles className="text-white" size={28} />
                            </div>
                            <div className="flex-grow">
                                <p className="text-[#f72585] font-bold uppercase text-xs tracking-widest mb-1">Access Unlocked</p>
                                <h3 className="font-anton text-xl text-[#333333] uppercase mb-3">Show Don&apos;t Tell — Viral Thumbnail Generator</h3>

                                <div className="bg-white border-2 border-[#f72585]/30 rounded-xl p-5 mb-4 space-y-3">
                                    <p className="font-bold text-[#333333] text-sm">Here&apos;s how to use your 400 image credits:</p>
                                    <div className="flex items-start gap-3">
                                        <span className="bg-[#f72585] text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                                        <p className="text-gray-700 text-sm font-medium">Click <strong>&quot;Open Tool&quot;</strong> below. A new page will open.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="bg-[#f72585] text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                                        <p className="text-gray-700 text-sm font-medium">Enter your <strong>token ID</strong> (shown below) to log in.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="bg-[#f72585] text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                                        <p className="text-gray-700 text-sm font-medium">Start generating thumbnails! You have <strong>400 credits</strong> (~200 generations).</p>
                                    </div>
                                </div>

                                {/* Token display */}
                                <div className="bg-[#333333] rounded-xl p-4 mb-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
                                    <div>
                                        <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1">Your Token ID:</p>
                                        <p className="font-mono text-[#ffc300] text-2xl font-black tracking-widest select-all">{sdtToken}</p>
                                    </div>
                                    <button
                                        onClick={copyToken}
                                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <Copy size={14} />
                                        {copied ? 'Copied!' : 'Copy Token'}
                                    </button>
                                </div>

                                <a
                                    href="/show-dont-tell"
                                    target="_blank"
                                    className="inline-flex items-center gap-2 bg-[#f72585] text-white px-7 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-[#d81b6f] transition-colors"
                                >
                                    Open Tool → Enter Token Above
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Genius Ideas Fulfillment */}
                {hasGenius && (
                    <div className="w-full mb-6 bg-gray-50 border-2 border-[#27AE60] p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                        <div className="bg-[#27AE60] p-3 rounded-full flex-shrink-0">
                            <BookOpen className="text-white" size={28} />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <p className="text-[#27AE60] font-bold uppercase text-xs tracking-widest mb-1">Access Unlocked</p>
                            <h3 className="font-anton text-xl text-[#333333] uppercase mb-1">100 Genius Launch Ideas</h3>
                            <p className="text-gray-600 text-sm font-lora">Your PDF is ready to download immediately.</p>
                        </div>
                        <a
                            href="/downloads/100-Genius-Offers-Sell-2026.pdf"
                            download
                            className="bg-[#27AE60] text-white px-7 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-green-700 transition-colors whitespace-nowrap flex-shrink-0"
                        >
                            Download PDF →
                        </a>
                    </div>
                )}

                {/* Hooks Fulfillment */}
                {hasHooks && (
                    <div className="w-full mb-6 bg-gray-50 border-2 border-[#27AE60] p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                        <div className="bg-[#27AE60] p-3 rounded-full flex-shrink-0">
                            <Zap className="text-white" size={28} fill="white" />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <p className="text-[#27AE60] font-bold uppercase text-xs tracking-widest mb-1">Access Unlocked</p>
                            <h3 className="font-anton text-xl text-[#333333] uppercase mb-1">Hooks That Stop the Scroll</h3>
                            <p className="text-gray-600 text-sm font-lora">Access your swipe-file vault of high-converting headline frameworks on Notion.</p>
                        </div>
                        <a
                            href="https://anabubolea.notion.site/Hooks-That-Stop-the-Scroll-17c9b91e546e80b7a0f2c8908465faf2?source=copy_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#27AE60] text-white px-7 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-green-700 transition-colors whitespace-nowrap flex-shrink-0"
                        >
                            Open Vault →
                        </a>
                    </div>
                )}

                {/* Next Steps + What You Got */}
                <div className="grid md:grid-cols-2 gap-8 w-full mb-16 mt-6">
                    <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                        <h3 className="font-anton text-xl text-[#333333] mb-6 uppercase">Next Steps</h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <Mail className="text-[#f72585] flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-[#333333]">Check your inbox</p>
                                    <p className="text-gray-600 text-sm">We&apos;ve sent your workshop link, replay access, and all templates to the email you registered with.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Zap className="text-[#f72585] flex-shrink-0" />
                                <div>
                                    <p className="font-bold text-[#333333]">Mark your calendar</p>
                                    <p className="text-gray-600 text-sm">Saturday, March 21 @ 10:00 AM EST. Show up live for the best experience — but the replay is yours forever.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#ffc300]/5 p-8 rounded-xl border border-[#ffc300]/20">
                        <h3 className="font-anton text-xl text-[#333333] mb-6 uppercase">What You Got</h3>
                        <ul className="space-y-4">
                            {[
                                'Build Your Substack — Live Workshop',
                                'Full Workshop Replay (Lifetime Access)',
                                'Idea-to-Outline Template',
                                'Publishing Confidence Checklist',
                                'The "Ship It" Accountability Framework',
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle size={18} className="text-[#ffc300] flex-shrink-0" />
                                    <span className="font-lato">{item}</span>
                                </li>
                            ))}
                            {hasSdt && (
                                <li className="flex items-center gap-3 text-[#f72585] font-bold">
                                    <Sparkles size={18} className="flex-shrink-0" />
                                    <span className="font-lato">Show Don&apos;t Tell — 400 Credits</span>
                                </li>
                            )}
                            {hasGenius && (
                                <li className="flex items-center gap-3 text-[#27AE60] font-bold">
                                    <BookOpen size={18} className="flex-shrink-0" />
                                    <span className="font-lato">100 Genius Launch Ideas PDF</span>
                                </li>
                            )}
                            {hasHooks && (
                                <li className="flex items-center gap-3 text-[#27AE60] font-bold">
                                    <Zap size={18} fill="#27AE60" className="flex-shrink-0" />
                                    <span className="font-lato">Hooks That Stop the Scroll Vault</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Support */}
                <div className="text-center bg-[#F5F5F5] p-10 rounded-2xl w-full border border-gray-200">
                    <h2 className="font-anton text-2xl text-[#333333] mb-4 uppercase">Have Questions?</h2>
                    <p className="font-lora italic text-gray-500 mb-8">
                        Our support team is here to help you get the most out of your purchase.
                    </p>
                    <a
                        href="mailto:anaxcalin@gmail.com"
                        className="inline-flex items-center gap-2 bg-[#f72585] hover:bg-[#d81b6f] text-white font-montserrat font-bold py-4 px-10 rounded shadow-lg transition-all"
                    >
                        CONTACT SUPPORT <ArrowRight size={18} />
                    </a>
                </div>

            </div>
        </div>
    );
}

export default function BuildYourSubstackSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white font-lora text-gray-400 italic">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
