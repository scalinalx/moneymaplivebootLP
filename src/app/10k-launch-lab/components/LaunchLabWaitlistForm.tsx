'use client';

import React, { useState } from 'react';
import { Mail, User, Clock, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { LaunchLabWaitlistModal } from './LaunchLabWaitlistModal';

export const LaunchLabWaitlistForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/launch-lab/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });

            const data = await response.json();
            if (data.success) {
                // Track Lead with Facebook Pixel
                if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('track', 'Lead', {
                        content_name: '10k Launch Lab Waitlist',
                        value: 1.00,
                        currency: 'USD'
                    });
                }
                setIsSuccess(true);
                setShowModal(true);
            } else {
                setError(data.error || 'Failed to join waitlist. Please try again.');
            }
        } catch (err) {
            console.error('Waitlist error:', err);
            setError('An error occurred. Please check your connection.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div id="waitlist" className="w-full max-w-[700px] mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-black py-5 px-6 text-center border-b border-gray-100">
                    <p className="text-white font-display font-black text-base uppercase tracking-widest flex items-center justify-center gap-3">
                        <Clock size={18} className="text-brand-neon animate-pulse" />
                        ENROLLMENT OPEN — RESERVE YOUR SPOT
                    </p>
                </div>

                <div className="p-8 md:p-12">
                    {isSuccess ? (
                        <div className="text-center py-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6 border-2 border-[#27AE60]">
                                <CheckCircle className="text-[#27AE60]" size={40} />
                            </div>
                            <h3 className="font-display font-black text-3xl text-black uppercase mb-2">YOU'RE ON THE LIST!</h3>
                            <p className="font-poppins text-gray-600 text-lg">Check your inbox for confirmation.</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-10 text-center">
                                <h2 className="font-display font-black text-3xl md:text-4xl text-black uppercase leading-tight mb-4 tracking-tight">
                                    DOORS ARE OPEN.
                                    <br />
                                    <span className="relative inline-block mt-2">
                                        <span className="absolute inset-0 bg-rose-50 transform -skew-x-12 scale-105 -z-10"></span>
                                        <span className="relative px-3">GET IN LINE NOW.</span>
                                    </span>
                                </h2>
                                <p className="font-poppins text-gray-700 text-lg leading-relaxed mt-6 max-w-xl mx-auto">
                                    The February cohort is full. But here's the truth: <span className="font-bold text-black">waitlist members get first dibs</span> when we reopen—plus exclusive early-bird pricing.
                                </p>
                                <div className="mt-4">
                                    <span className="bg-[#d81159] text-white px-4 py-2 rounded-lg inline-block font-display font-bold text-sm uppercase tracking-wide border border-gray-100 shadow-xl">
                                        Be First. Get Notified. Save Money.
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block font-display font-bold text-black mb-2 uppercase text-sm tracking-wider">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                            <User size={18} />
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-11 pr-4 py-4 rounded-lg border border-gray-100 focus:border-brand-neon focus:ring-2 focus:ring-brand-neon/20 outline-none transition-all font-poppins text-black shadow-[2px_2px_0px_#000000]"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block font-display font-bold text-black mb-2 uppercase text-sm tracking-wider">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            required
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-11 pr-4 py-4 rounded-lg border border-gray-100 focus:border-brand-neon focus:ring-2 focus:ring-brand-neon/20 outline-none transition-all font-poppins text-black shadow-[2px_2px_0px_#000000]"
                                            placeholder="name@example.com"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-50 border-2 border-red-500 rounded-lg flex items-center gap-3 text-red-600 text-sm font-medium">
                                        <AlertCircle size={20} />
                                        {error}
                                    </div>
                                )}

                                <button
                                    disabled={isSubmitting}
                                    className="w-full bg-[#d81159] hover:bg-[#b30e4a] text-white font-display font-black text-xl py-5 rounded-lg shadow-2xl hover:shadow-lg hover:-translate-y-1 transition-all transform uppercase tracking-wider border border-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'JOINING LIST...' : 'YES! RESERVE MY SPOT IN THE LAB'}
                                </button>

                                <div className="mt-8 flex flex-col items-center gap-3">
                                    <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-widest font-bold">
                                        <Lock size={14} className="text-brand-neon" />
                                        <span>Your Data Is Safe & Encrypted</span>
                                    </div>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>

            <LaunchLabWaitlistModal
                isOpen={showModal}
                onClose={handleCloseModal}
            />
        </>
    );
};
