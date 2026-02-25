'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Copy, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const SuccessContent = () => {
    const searchParams = useSearchParams();
    const tokenId = searchParams.get('token_id');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (tokenId) {
            navigator.clipboard.writeText(tokenId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!tokenId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center p-8">
                    <p className="text-slate-500 mb-4">No token ID found in the URL.</p>
                    <Link href="/show-dont-tell" className="text-rose-500 font-bold hover:underline">
                        Return to App
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="ana-ai-root min-h-screen py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50 text-slate-800 font-sans flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-16 shadow-2xl border border-white/50 text-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />

                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-emerald-200">
                    <CheckCircle2 size={40} className="text-emerald-500" />
                </div>

                <h1 className="text-4xl font-black mb-4 text-slate-900 leading-tight">
                    Payment <span className="text-emerald-500">Successful!</span>
                </h1>

                <p className="text-slate-500 font-medium text-lg mb-10">
                    Your account has been credited. Please save your Token ID below to access the generator.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 mb-10 relative group">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Your Secret Access Token ID</p>
                    <div className="text-3xl md:text-4xl font-mono font-black text-rose-500 tracking-wider mb-6 break-all">
                        {tokenId}
                    </div>

                    <button
                        onClick={handleCopy}
                        className="mx-auto flex items-center gap-2 bg-white border border-slate-200 hover:border-emerald-300 hover:text-emerald-600 shadow-sm px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest text-slate-500 transition-all active:scale-95"
                    >
                        {copied ? (
                            <>
                                <CheckCircle2 size={16} className="text-emerald-500" />
                                <span className="text-emerald-600">Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy size={16} />
                                Copy to Clipboard
                            </>
                        )}
                    </button>
                </div>

                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 mb-10 text-left flex items-start gap-4">
                    <Sparkles className="text-rose-500 shrink-0 mt-1" size={20} />
                    <p className="text-sm text-rose-700 font-medium leading-relaxed">
                        <strong className="block mb-1 text-rose-900">Keep this token safe!</strong>
                        This is your exclusive key to log in. You will need to enter this Token ID on the login page to access your credits and generate thumbnails.
                    </p>
                </div>

                <Link
                    href="/show-dont-tell"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 hover:scale-[1.02]"
                >
                    Go to Generator <ArrowRight size={20} />
                </Link>
            </div>
        </div>
    );
};

const SuccessApp = () => {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 p-8 text-slate-500">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
};

export default SuccessApp;
