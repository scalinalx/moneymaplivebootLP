'use client';

import React, { useState } from 'react';
import { Mail, User, Clock, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { LaunchLabModal } from './LaunchLabModal';

export const WaitlistForm: React.FC = () => {
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
            const response = await fetch('/api/hit10k/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });

            const data = await response.json();
            if (data.success) {
                // Track Lead with Facebook Pixel
                if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('track', 'Lead', {
                        content_name: 'Hit 10k Waitlist',
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
        window.location.href = '/';
    };

    return (
        <>
            <div id="waitlist-section" className="w-full max-w-[600px] mx-auto bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
                <div className="bg-[#333333] py-4 px-6 text-center">
                    <p className="text-white font-montserrat font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                        <Clock size={14} className="text-[#ffc300] animate-pulse" />
                        February Cohort Now Closed — Join the Waitlist
                    </p>
                </div>

                <div className="p-8 md:p-12">
                    {isSuccess ? (
                        <div className="text-center py-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6 border border-green-100">
                                <CheckCircle className="text-[#27AE60]" size={40} />
                            </div>
                            <h3 className="font-montserrat font-bold text-2xl text-[#333333] uppercase mb-2">You're on the list!</h3>
                            <p className="font-lato text-gray-600">Check your inbox for confirmation.</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-10 text-center">
                                <h2 className="font-montserrat font-bold text-3xl text-[#333333] uppercase leading-tight mb-4 tracking-tight">
                                    Missed the Cut?
                                </h2>
                                <p className="font-lato text-gray-600 text-lg leading-relaxed">
                                    Be the first to know when we open doors for the next cohort.
                                </p>
                                <div className="mt-2">
                                    <span className="bg-[#ffc300] text-black px-3 py-1 rounded inline-block font-montserrat font-bold text-sm uppercase tracking-wide">
                                        Get Exclusive Early bird Pricing.
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block font-montserrat font-bold text-[#333333] mb-2 uppercase text-xs tracking-wider">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                            <User size={18} />
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-11 pr-4 py-4 rounded-lg border border-gray-200 focus:border-[#ffc300] focus:ring-2 focus:ring-[#ffc300]/10 outline-none transition-all font-lato text-black"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block font-montserrat font-bold text-[#333333] mb-2 uppercase text-xs tracking-wider">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            required
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-11 pr-4 py-4 rounded-lg border border-gray-200 focus:border-[#ffc300] focus:ring-2 focus:ring-[#ffc300]/10 outline-none transition-all font-lato text-black"
                                            placeholder="name@example.com"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3 text-red-600 text-sm font-medium">
                                        <AlertCircle size={20} />
                                        {error}
                                    </div>
                                )}

                                <button
                                    disabled={isSubmitting}
                                    className="w-full bg-[#ffc300] hover:bg-[#d49600] text-black font-montserrat font-bold text-xl py-5 rounded shadow-lg transition-all transform hover:-translate-y-1 uppercase tracking-wider"
                                >
                                    {isSubmitting ? 'Joining list...' : 'Notify Me When Open!'}
                                </button>

                                <div className="mt-8 flex flex-col items-center gap-3">
                                    <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase tracking-widest font-bold">
                                        <Lock size={12} className="text-[#ffc300]" />
                                        <span>Secure Data Encryption</span>
                                    </div>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>

            <LaunchLabModal
                isOpen={showModal}
                onClose={handleCloseModal}
            />
        </>
    );
};
