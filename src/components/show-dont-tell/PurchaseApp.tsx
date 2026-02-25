'use client';

import React, { useState } from 'react';
import { Sparkles, Loader2, ArrowLeft, CheckCircle2, Zap } from 'lucide-react';
import Link from 'next/link';

const PurchaseApp = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [existingToken, setExistingToken] = useState('');
    const [loadingPackage, setLoadingPackage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handlePurchase = async (packageType: 'starter' | 'pro') => {
        if (!email) {
            setError("Please enter your email address to continue.");
            return;
        }

        setLoadingPackage(packageType);
        setError(null);

        try {
            const response = await fetch('/api/show-dont-tell/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    name,
                    existingTokenId: existingToken || undefined,
                    packageType
                })
            });

            const data = await response.json();

            if (data.success && data.url) {
                window.location.href = data.url;
            } else {
                setError(data.error || "Failed to initialize checkout.");
                setLoadingPackage(null);
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong connecting to the checkout server.");
            setLoadingPackage(null);
        }
    };

    return (
        <div className="ana-ai-root min-h-screen pb-20 bg-gradient-to-br from-rose-50 via-white to-pink-50 text-slate-800 font-sans">
            {/* Navbar */}
            <nav className="w-full py-4 px-6 md:px-12 flex items-center justify-between ana-ai-glass-panel sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <Link href="/show-dont-tell" className="p-2 hover:bg-rose-50 rounded-full transition-colors hidden md:block">
                        <ArrowLeft size={20} className="text-slate-600" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-200 bg-gradient-to-tr from-rose-400 to-pink-500 flex items-center justify-center text-white">
                            <Sparkles size={20} />
                        </div>
                        <span className="font-extrabold text-xl tracking-tighter text-slate-900 uppercase">
                            SHOW DON'T TELL
                        </span>
                    </div>
                </div>
            </nav>

            <div className="max-w-5xl mx-auto px-6 mt-12 md:mt-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 leading-tight font-display">
                        Choose Your <span className="ana-ai-gradient-text italic">Creator</span> Package
                    </h1>
                    <p className="text-slate-500 font-light max-w-xl mx-auto text-lg">
                        Get instant access to our viral thumbnail generator. 1 Credit = 1 Image Generation.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto mb-12">
                    <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-white/50 space-y-6">
                        <h2 className="text-lg font-bold text-slate-800 uppercase tracking-widest text-center mb-6">Your Details</h2>

                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 font-bold text-center">
                                {error}
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Name (Optional)</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name"
                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all placeholder:text-slate-300 text-slate-900"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email <span className="text-rose-500">*</span></label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all placeholder:text-slate-300 text-slate-900"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Existing Token ID (Optional Topping Up)</label>
                                <input
                                    type="text"
                                    value={existingToken}
                                    onChange={(e) => setExistingToken(e.target.value)}
                                    placeholder="e.g. SDT-XXXXXXXX (Leave blank for a new token)"
                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all placeholder:text-slate-300 text-slate-900"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Starter Package */}
                    <div className="relative bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 hover:border-rose-200 transition-all hover:shadow-2xl flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-2xl font-black text-slate-900 mb-2">Starter</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-rose-500">$24</span>
                            </div>
                            <p className="text-slate-500 font-medium mt-4">Perfect for getting started and testing multiple viral concepts.</p>
                        </div>

                        <div className="space-y-4 mb-10 flex-grow">
                            <div className="flex items-center gap-3 text-slate-700 font-medium">
                                <CheckCircle2 className="text-emerald-500" size={20} />
                                <span><strong className="text-slate-900">200</strong> Image Credits</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-700 font-medium">
                                <CheckCircle2 className="text-emerald-500" size={20} />
                                <span>~100 Thumbnail Generations</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-700 font-medium">
                                <CheckCircle2 className="text-emerald-500" size={20} />
                                <span>Access for 1 Year</span>
                            </div>
                        </div>

                        <button
                            onClick={() => handlePurchase('starter')}
                            disabled={loadingPackage !== null}
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {loadingPackage === 'starter' ? <Loader2 className="animate-spin" size={20} /> : 'Get Starter'}
                        </button>
                    </div>

                    {/* Pro Package */}
                    <div className="relative bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl border border-slate-800 transition-all hover:shadow-rose-500/20 flex flex-col transform md:-translate-y-4">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-400 to-pink-500 rounded-t-[2.5rem]" />
                        <div className="absolute -top-4 right-8 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-xs font-black uppercase tracking-widest py-1 px-4 rounded-full shadow-lg">
                            Best Value
                        </div>

                        <div className="mb-6">
                            <h3 className="text-2xl font-black text-white mb-2">Pro Creator</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-white">$247</span>
                            </div>
                            <p className="text-slate-400 font-medium mt-4">For serious creators who need consistent viral performance.</p>
                        </div>

                        <div className="space-y-4 mb-10 flex-grow">
                            <div className="flex items-center gap-3 text-slate-300 font-medium">
                                <Zap className="text-yellow-400" size={20} />
                                <span><strong className="text-white">2500</strong> Image Credits</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300 font-medium">
                                <CheckCircle2 className="text-emerald-500" size={20} />
                                <span>~1250 Thumbnail Generations</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300 font-medium">
                                <CheckCircle2 className="text-emerald-500" size={20} />
                                <span>Access for 1 Year</span>
                            </div>
                        </div>

                        <button
                            onClick={() => handlePurchase('pro')}
                            disabled={loadingPackage !== null}
                            className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 hover:scale-[1.02]"
                        >
                            {loadingPackage === 'pro' ? <Loader2 className="animate-spin" size={20} /> : 'Get Pro Creator'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseApp;
