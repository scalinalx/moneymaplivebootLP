'use client';

import React, { useState } from 'react';
import { ArrowRight, Lock, CheckCircle2, Loader2, ThumbsUp, Heart, Award } from 'lucide-react';
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
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 relative overflow-x-hidden">
            {/* Hero Section */}
            <div className="flex flex-col items-center pt-24 md:pt-32 pb-4 px-6 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-rose-200/30 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-pink-200/20 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

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

                        <h1 className="text-2xl md:text-4xl font-bold text-slate-900 leading-[1.15]">
                            Turn <span className="ana-ai-gradient-text italic pl-1">"I don't know what to sell"</span> into a clear offer people actually want to buy.
                        </h1>

                        <p className="text-sm text-slate-500 leading-relaxed max-w-lg mx-auto md:mx-0">
                            Stop guessing. Instantly see how to package your expertise into products that sell.
                        </p>

                        <div className="space-y-3 max-w-md mx-auto md:mx-0 text-left">
                            <div className="flex items-center gap-3 text-slate-700 bg-white/50 p-2.5 rounded-lg border border-white/60 shadow-sm">
                                <CheckCircle2 className="text-rose-500 w-4 h-4 flex-shrink-0" />
                                <span className="text-sm font-medium text-slate-900">Generate a full 4-product ecosystem</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-700 bg-white/50 p-2.5 rounded-lg border border-white/60 shadow-sm">
                                <CheckCircle2 className="text-rose-500 w-4 h-4 flex-shrink-0" />
                                <span className="text-sm font-medium text-slate-900">Get high-value psychological anchor pricing</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-700 bg-white/50 p-2.5 rounded-lg border border-white/60 shadow-sm">
                                <CheckCircle2 className="text-rose-500 w-4 h-4 flex-shrink-0" />
                                <span className="text-sm font-medium text-slate-900">Zero cost to use today</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Form Card */}
                    <div className="relative order-1 md:order-2">
                        <div className="absolute -inset-1 bg-gradient-to-br from-rose-300 to-pink-500 rounded-2xl blur opacity-30"></div>
                        <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 p-6 rounded-2xl shadow-2xl">
                            <div className="text-center mb-5">
                                <h2 className="text-lg font-bold text-slate-900 mb-1.5">Get Instant Access</h2>
                                <p className="text-slate-500 text-[10px]">Join the top 1% of creators building smarter offers.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all placeholder:text-slate-300 text-slate-900 text-sm"
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
                                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 outline-none transition-all placeholder:text-slate-300 text-slate-900 text-sm"
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
                                        className="w-3.5 h-3.5 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
                                    />
                                    <label htmlFor="terms" className="text-xs text-slate-600 cursor-pointer select-none">
                                        Yes, I agree to Terms & Conditions.
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || !name || !email || !agreed}
                                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-900/10 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-4 disabled:opacity-70 text-sm"
                                >
                                    {isSubmitting ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        <>
                                            <span>Show Me What To Sell</span>
                                            <ArrowRight size={16} />
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

            {/* Testimonials Section */}
            <div className="max-w-7xl mx-auto px-6 pb-24 mt-2">
                <div className="w-full border-t border-slate-100 pt-8">
                    <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
                        {/* Testimonial 1 */}
                        <div className="flex gap-3">
                            <img
                                src="/imgs/ana-ai/avatar_female_1.png"
                                className="w-10 h-10 rounded-full flex-shrink-0 shadow-sm border border-slate-100"
                                alt="Tiff"
                            />
                            <div className="flex-1">
                                <div className="bg-[#F0F2F5] p-3 px-4 rounded-2xl relative">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <span className="font-bold text-[13px] text-slate-900 leading-none">Tiff</span>
                                    </div>
                                    <p className="text-[13px] text-slate-800 leading-normal">
                                        Best find I've made this year. I'm already seeing my offer clarity skyrocket as instructed. I love Ana! 😍
                                    </p>
                                    <div className="absolute -right-2 bottom-1 flex items-center gap-0.5 bg-white shadow-sm border border-slate-50 rounded-full p-1 px-1.5 translate-y-1/2">
                                        <div className="bg-blue-500 rounded-full p-0.5"><ThumbsUp size={8} className="text-white" /></div>
                                        <div className="bg-rose-500 rounded-full p-0.5"><Heart size={8} className="text-white" /></div>
                                        <span className="text-[10px] font-medium text-slate-500 ml-0.5">2</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mt-1.5 ml-3 text-[11px] font-bold text-slate-500">
                                    <span className="hover:underline cursor-pointer">1d</span>
                                    <span className="text-rose-600 hover:underline cursor-pointer">Love</span>
                                    <span className="hover:underline cursor-pointer">Reply</span>
                                    <span className="text-blue-600 hover:underline cursor-pointer">Send message</span>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="flex gap-3">
                            <img
                                src="/imgs/ana-ai/avatar_female_2.png"
                                className="w-10 h-10 rounded-full flex-shrink-0 shadow-sm border border-slate-100"
                                alt="Monique"
                            />
                            <div className="flex-1">
                                <div className="bg-[#F0F2F5] p-3 px-4 rounded-2xl relative">
                                    <span className="font-bold text-[13px] text-slate-900 block mb-1 leading-none">Monique</span>
                                    <p className="text-[13px] text-slate-800 leading-normal">
                                        I was amazed by the logic. The value is incredible. After implementing these offer stacks, I immediately gained confidence in my high ticket business. 💰 The lead-gen secrets are ingenious. Thank you, Ana! ❤️
                                    </p>
                                    <div className="absolute -right-1 bottom-1 bg-white shadow-sm border border-slate-50 rounded-full p-1 translate-y-1/2">
                                        <div className="bg-rose-500 rounded-full p-0.5"><Heart size={8} className="text-white" /></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mt-1.5 ml-3 text-[11px] font-bold text-slate-500">
                                    <span className="hover:underline cursor-pointer">5d</span>
                                    <span className="text-rose-600 hover:underline cursor-pointer">Love</span>
                                    <span className="hover:underline cursor-pointer">Reply</span>
                                    <span className="text-blue-600 hover:underline cursor-pointer">Send message</span>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="flex gap-3">
                            <img
                                src="/imgs/ana-ai/avatar_male_1.png"
                                className="w-10 h-10 rounded-full flex-shrink-0 shadow-sm border border-slate-100"
                                alt="David"
                            />
                            <div className="flex-1">
                                <div className="bg-[#F0F2F5] p-3 px-4 rounded-2xl relative">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <span className="font-bold text-[13px] text-slate-900 leading-none">David G.</span>
                                    </div>
                                    <p className="text-[13px] text-slate-800 leading-normal">
                                        Finally a tool that makes sense. No more guessing what to sell. This helped me package my coaching into a solid ecosystem in minutes. Highly recommended for scaling! 🚀🤝
                                    </p>
                                    <div className="absolute -right-1 bottom-1 bg-white shadow-sm border border-slate-50 rounded-full p-1 translate-y-1/2">
                                        <div className="bg-blue-500 rounded-full p-0.5"><ThumbsUp size={8} className="text-white" /></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mt-1.5 ml-3 text-[11px] font-bold text-slate-500">
                                    <span className="hover:underline cursor-pointer">2h</span>
                                    <span className="text-blue-600 hover:underline cursor-pointer">Like</span>
                                    <span className="hover:underline cursor-pointer">Reply</span>
                                    <span className="text-blue-600 hover:underline cursor-pointer">Send message</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
