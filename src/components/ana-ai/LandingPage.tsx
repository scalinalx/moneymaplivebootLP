'use client';

import React, { useState } from 'react';
import { ArrowRight, Lock, CheckCircle2, Loader2 } from 'lucide-react';
import { captureLead } from '@/services/ana-ai/leadService';

interface LandingPageProps {
    onSignup: (name: string, email: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSignup }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (name && email && agreed) {
            setIsSubmitting(true);
            try {
                await captureLead(name, email);
                onSignup(name, email);
            } catch (error) {
                alert("Something went wrong. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-rose-200/30 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-pink-200/20 rounded-full blur-[100px] -z-10" />

            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Left Content */}
                <div className="space-y-8 text-center md:text-left order-2 md:order-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mx-auto md:mx-0">
                        <img
                            src="https://substackcdn.com/image/fetch/$s_!VUeE!,w_1360,c_limit,f_webp,q_auto:best,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9dc2df7d-6cba-4d7e-94fc-05583eec3cda_1280x1280.png"
                            alt="Logo"
                            className="w-4 h-4 rounded-full"
                        />
                        ANA'S OFFER FLOW
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.15]">
                        This takes you from <span className="ana-ai-gradient-text italic">"I don't know what to sell"</span> to actually making money online.
                    </h1>

                    <p className="text-lg text-slate-500 leading-relaxed max-w-lg mx-auto md:mx-0">
                        Stop guessing. Build a $5k/month creator business. Enter your details to instantly generate a complete, high-value product ecosystem tailored to your specific expertise.
                    </p>

                    <div className="space-y-4 max-w-md mx-auto md:mx-0 text-left">
                        <div className="flex items-center gap-3 text-slate-700 bg-white/50 p-3 rounded-lg border border-white/60 shadow-sm">
                            <CheckCircle2 className="text-rose-500 w-5 h-5 flex-shrink-0" />
                            <span className="font-medium">Generate a full 4-product ecosystem</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-700 bg-white/50 p-3 rounded-lg border border-white/60 shadow-sm">
                            <CheckCircle2 className="text-rose-500 w-5 h-5 flex-shrink-0" />
                            <span className="font-medium">Get high-value psychological anchor pricing</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-700 bg-white/50 p-3 rounded-lg border border-white/60 shadow-sm">
                            <CheckCircle2 className="text-rose-500 w-5 h-5 flex-shrink-0" />
                            <span className="font-medium">Zero cost to use today</span>
                        </div>
                    </div>
                </div>

                {/* Right Form Card */}
                <div className="relative order-1 md:order-2">
                    <div className="absolute -inset-1 bg-gradient-to-br from-rose-300 to-pink-500 rounded-2xl blur opacity-30"></div>
                    <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 p-8 rounded-2xl shadow-2xl">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Get Instant Access</h2>
                            <p className="text-slate-500 text-sm">Join the top 1% of creators building smarter offers.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">First Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all placeholder:text-slate-300 text-slate-900"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all placeholder:text-slate-300 text-slate-900"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="flex items-center gap-3 px-1">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    required
                                    className="w-4 h-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
                                />
                                <label htmlFor="terms" className="text-sm text-slate-600 cursor-pointer select-none">
                                    Yes, I agree to Terms & Conditions.
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || !name || !email || !agreed}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-xl shadow-lg shadow-slate-900/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : (
                                    <>
                                        <span>Unlock The Tool</span>
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>

                            <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-400">
                                <Lock size={12} />
                                <span>Your data is 100% secure.</span>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};
