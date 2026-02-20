'use client';

import React, { useState, useEffect } from 'react';
import { verifyOfferGeniusPassword } from '@/app/ana-offer-genius/actions';
import { Lock, ArrowRight, Loader2 } from 'lucide-react';

interface PasswordGateProps {
    children: React.ReactNode;
}

export const OfferGeniusPasswordGate: React.FC<PasswordGateProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    useEffect(() => {
        // Check session storage on mount
        const auth = sessionStorage.getItem('offer_genius_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);

        try {
            const isValid = await verifyOfferGeniusPassword(password);

            if (isValid) {
                sessionStorage.setItem('offer_genius_auth', 'true');
                setIsAuthenticated(true);
            } else {
                setError(true);
                setShake(true);
                setTimeout(() => setShake(false), 500); // Reset shake animation
            }
        } catch (err) {
            console.error('Verification failed', err);
            setError(true);
        } finally {
            setIsVerifying(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="animate-spin text-white w-8 h-8" />
            </div>
        );
    }

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4 relative overflow-hidden font-display">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/10 via-black to-black pointer-events-none"></div>

            {/* Content Container */}
            <div className={`relative z-10 w-full max-w-md bg-black/50 backdrop-blur-md border border-white/10 p-12 rounded-2xl shadow-2xl text-center transform transition-all duration-300 ${shake ? 'translate-x-[5px] border-red-500/50' : ''}`}>

                {/* Icon */}
                <div className="mx-auto w-16 h-16 mb-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(255,100,100,0.1)]">
                    <Lock className="text-gray-300 w-6 h-6" />
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl text-gray-200 font-light tracking-[0.2em] mb-2 uppercase" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
                    OfferGenius
                </h1>

                <p className="text-gray-500 text-sm md:text-base italic mb-10 tracking-widest font-serif opacity-70">
                    "Enter the repository"
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(false);
                        }}
                        placeholder="Access Token"
                        className="w-full bg-black/50 border-b border-gray-700 text-white text-center py-3 px-4 focus:outline-none focus:border-white/50 transition-colors placeholder-gray-800 tracking-widest text-lg"
                        autoFocus
                    />

                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-2"
                        disabled={!password || isVerifying}
                    >
                        {isVerifying ? <Loader2 className="animate-spin" size={20} /> : <ArrowRight size={20} />}
                    </button>
                </form>

                {/* Error Message */}
                <div className={`mt-4 h-6 text-red-400 text-xs uppercase tracking-wider transition-opacity duration-300 ${error ? 'opacity-100' : 'opacity-0'}`}>
                    Access Denied.
                </div>
            </div>
        </div>
    );
};
