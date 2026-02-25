'use client';

import React, { useState } from 'react';
import { KeyRound, ArrowRight, Loader2, Lock } from 'lucide-react';

interface TokenLoginProps {
    onLoginSuccess: (user: any, token: string) => void;
}

export const TokenLogin: React.FC<TokenLoginProps> = ({ onLoginSuccess }) => {
    const [tokenId, setTokenId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!tokenId.trim()) {
            setError("Please enter your Token ID.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/show-dont-tell/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tokenId: tokenId.trim() }),
            });

            const data = await response.json();

            if (data.success) {
                // Store token in session storage for persistence across reloads
                sessionStorage.setItem('sdt_token', tokenId.trim());
                onLoginSuccess(data.user, tokenId.trim());
            } else {
                setError(data.error || "Invalid or expired Token ID.");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong connecting to the validation server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex flex-col items-center justify-center p-6 ana-ai-root font-sans">
            <div className="max-w-md w-full ana-ai-animate-fade-in-up">

                {/* Logo Area */}
                <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-rose-100 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-rose-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <Lock className="text-rose-400 group-hover:text-white transition-colors duration-500 relative z-10" size={32} />
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/50 text-center relative">
                    <h1 className="text-3xl font-black text-slate-900 mb-2 font-display uppercase tracking-tight">Access Required</h1>
                    <p className="text-slate-500 mb-8 font-light">Enter your Access Token ID to enter the Viral Image Generator.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2 text-left">
                            <label className="block text-xs font-bold text-slate-800 uppercase tracking-widest pl-2">Your Token ID</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={tokenId}
                                    onChange={(e) => setTokenId(e.target.value)}
                                    placeholder="e.g. sdt_tok_123456789"
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all placeholder:text-slate-300 text-slate-900 shadow-inner font-mono text-center tracking-widest"
                                    disabled={loading}
                                />
                                <KeyRound className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 animate-pulse font-medium">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !tokenId.trim()}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <span>Verify Access</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer Link */}
                <div className="text-center mt-8">
                    <p className="text-xs text-slate-400 font-medium">
                        Don't have a token? <a href="/show-dont-tell/purchase" className="text-rose-500 hover:text-rose-600 underline underline-offset-4 decoration-rose-200 uppercase tracking-wider font-bold">Purchase Access</a>
                    </p>
                </div>
            </div>
        </div>
    );
};
