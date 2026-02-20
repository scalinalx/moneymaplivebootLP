'use client';

import React, { useState, useRef } from 'react';
import { Sparkles, Loader2, RefreshCw, Search, ArrowLeft, Lightbulb, Users, Zap, Video, Monitor, MessageSquare, DollarSign } from 'lucide-react';
import { GeniusOfferCard } from './GeniusOfferCard';

const OfferGeniusApp = ({ onReset }: { onReset: () => void }) => {
    const [formData, setFormData] = useState({
        expertise: '',
        niche: '',
        audienceSize: '10000-25000',
        revenueGoal: '5000',
        launchTimeline: '1 week',
        effortLevel: 'Mid',
        deliveryPreference: 'Hybrid',
        useVideo: true
    });

    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: finalValue
        }));
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.expertise.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/ana-offer-genius/match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, limit: 3 }),
            });

            const data = await response.json();
            if (data.success) {
                setMatches(data.matches);
                setTimeout(() => {
                    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            } else {
                setError(data.error || "Failed to find matches. Please try a different input.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ana-ai-root min-h-screen pb-20 bg-gradient-to-br from-rose-50 via-white to-pink-50 text-slate-800 font-sans">
            {/* Navbar */}
            <nav className="w-full py-6 px-6 md:px-12 flex items-center justify-between ana-ai-glass-panel sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <button onClick={onReset} className="p-2 hover:bg-rose-50 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-slate-600" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-200">
                            <img
                                src="https://substackcdn.com/image/fetch/$s_!VUeE!,w_1360,c_limit,f_webp,q_auto:best,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9dc2df7d-6cba-4d7e-94fc-05583eec3cda_1280x1280.png"
                                alt="Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="font-extrabold text-xl tracking-tighter text-slate-900 uppercase">
                            OFFER GENIUS
                        </span>
                    </div>
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:block">
                    PRO ACCESS GRANTED
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 mt-12 md:mt-16">

                {/* Intake Form Section */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/50 border border-amber-200 text-amber-700 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                            <Sparkles size={12} className="fill-current" />
                            Offer Architecture Active
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight font-display">
                            Customize Your <span className="ana-ai-gradient-text italic">Genius Offer</span>.
                        </h1>
                        <p className="text-slate-500 font-light max-w-xl mx-auto">
                            Fill in your business details below. My neural engine will match and customize the perfect offer architectures for your specific situation.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-rose-200 to-pink-200 rounded-[2.5rem] blur-xl opacity-30"></div>
                        <form onSubmit={handleSearch} className="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/50 space-y-8">

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Top Left: Expertise */}
                                <div className="space-y-4 md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-800 uppercase tracking-widest ml-1">Your core expertise</label>
                                    <div className="relative">
                                        <textarea
                                            name="expertise"
                                            value={formData.expertise}
                                            onChange={handleInputChange}
                                            placeholder="Example: I help coaches build high-ticket systems using organic content..."
                                            className="w-full px-6 py-5 rounded-2xl bg-white border border-slate-100 focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all placeholder:text-slate-300 text-slate-900 min-h-[120px] shadow-sm font-light text-lg"
                                            required
                                        />
                                        <MessageSquare className="absolute right-6 top-6 text-slate-200" size={24} />
                                    </div>
                                </div>

                                {/* Row 2: Niche & Audience */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-slate-800 uppercase tracking-widest ml-1">Target Niche</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="niche"
                                            value={formData.niche}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Real Estate, Fitness, SaaS"
                                            className="w-full px-6 py-4 rounded-xl bg-white border border-slate-100 focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all placeholder:text-slate-300 text-slate-900 shadow-sm"
                                        />
                                        <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-200" size={20} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-slate-800 uppercase tracking-widest ml-1">Audience Size</label>
                                    <div className="relative">
                                        <select
                                            name="audienceSize"
                                            value={formData.audienceSize}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 rounded-xl bg-white border border-slate-100 focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all text-slate-900 shadow-sm appearance-none cursor-pointer"
                                        >
                                            <option value="0-100">0 - 100 (Nano)</option>
                                            <option value="100-500">100 - 500 (Micro)</option>
                                            <option value="500-1000">500 - 1,000 (Small)</option>
                                            <option value="1000-5000">1,000 - 5,000 (Mid)</option>
                                            <option value="5000-10000">5,000 - 10,000 (Large)</option>
                                            <option value="10000-25000">10,000 - 25,000 (Authority)</option>
                                            <option value="25000-50000">25,000 - 50,000 (Expert)</option>
                                            <option value="50000+">50,000+ (Thought Leader)</option>
                                        </select>
                                        <Users className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-200 pointer-events-none" size={20} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-slate-800 uppercase tracking-widest ml-1">Revenue Goal</label>
                                    <div className="relative">
                                        <select
                                            name="revenueGoal"
                                            value={formData.revenueGoal}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 rounded-xl bg-white border border-slate-100 focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all text-slate-900 shadow-sm appearance-none cursor-pointer"
                                        >
                                            <option value="1000">$1,000/mo</option>
                                            <option value="5000">$5,000/mo</option>
                                            <option value="10000">$10,000/mo</option>
                                            <option value="25000">$25,000/mo</option>
                                            <option value="100000">$100,000/mo</option>
                                            <option value="335000">$335,000/mo</option>
                                            <option value="1000000">$1,000,000/mo</option>
                                        </select>
                                        <DollarSign className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-200 pointer-events-none" size={20} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-slate-800 uppercase tracking-widest ml-1">Launch Timeline</label>
                                    <div className="relative">
                                        <select
                                            name="launchTimeline"
                                            value={formData.launchTimeline}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 rounded-xl bg-white border border-slate-100 focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all text-slate-900 shadow-sm appearance-none cursor-pointer"
                                        >
                                            <option value="24 hours">Within 24 Hours</option>
                                            <option value="1 week">Within 1 Week</option>
                                            <option value="2 weeks">Within 2 Weeks</option>
                                            <option value="1 month">Within 1 Month</option>
                                        </select>
                                        <Zap className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-200 pointer-events-none" size={20} />
                                    </div>
                                </div>

                                {/* Row 3: Effort & Delivery */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-slate-800 uppercase tracking-widest ml-1">Desired Effort Level</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['Low', 'Mid', 'High'].map(level => (
                                            <button
                                                key={level}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, effortLevel: level }))}
                                                className={`py-3 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all ${formData.effortLevel === level
                                                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                                                    : 'bg-white text-slate-400 border-slate-100 hover:border-rose-200'
                                                    }`}
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-slate-800 uppercase tracking-widest ml-1">Delivery Format</label>
                                    <div className="relative">
                                        <select
                                            name="deliveryPreference"
                                            value={formData.deliveryPreference}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 rounded-xl bg-white border border-slate-100 focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all text-slate-900 shadow-sm appearance-none cursor-pointer"
                                        >
                                            <option value="Full Async">Full Async (Scalable)</option>
                                            <option value="Hybrid">Hybrid (Best Efficiency)</option>
                                            <option value="Live">Live (Premium Felt Value)</option>
                                        </select>
                                        <Monitor className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-200 pointer-events-none" size={20} />
                                    </div>
                                </div>

                                {/* Video Preference Toggle */}
                                <div className="md:col-span-2 flex items-center justify-between p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${formData.useVideo ? 'bg-rose-100 text-rose-600' : 'bg-slate-200 text-slate-400'} transition-colors`}>
                                            <Video size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">Video Creation</p>
                                            <p className="text-xs text-slate-500">Are you comfortable creating video content?</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="useVideo"
                                            checked={formData.useVideo}
                                            onChange={handleInputChange}
                                            className="sr-only peer"
                                        />
                                        <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-rose-500"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading || !formData.expertise.trim()}
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-4 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin" size={24} />
                                    ) : (
                                        <>
                                            <span>Generate My High-Converting Custom Offer</span>
                                            <Sparkles size={22} className="text-yellow-400 fill-current" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {error && (
                    <div className="max-w-xl mx-auto mb-12 p-6 bg-red-50 text-red-600 rounded-2xl text-sm border border-red-100 text-center animate-pulse font-bold">
                        {error}
                    </div>
                )}

                {/* Results Grid */}
                {matches.length > 0 && (
                    <div ref={resultsRef} className="space-y-16 mb-20 pt-10">
                        <div className="flex flex-col items-center">
                            <div className="h-20 w-px bg-gradient-to-b from-slate-200 to-rose-200 mb-8" />
                            <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight text-center">Your Neural-Optimized Offers</h2>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] text-center">Adapted from the 100 Genius Offers Repository</p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-10">
                            {matches.map((match, idx) => (
                                <div key={match?.offer?.id || `offer-${idx}`} className="ana-ai-animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                                    <GeniusOfferCard
                                        data={match?.offer}
                                        similarity={match?.similarity || 0}
                                        index={idx}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <button
                                onClick={() => {
                                    setMatches([]);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="inline-flex items-center gap-3 bg-white border border-slate-100 hover:border-rose-200 px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-all shadow-sm"
                            >
                                <RefreshCw size={16} />
                                Start New Architecting Session
                            </button>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && matches.length === 0 && !error && (
                    <div className="max-w-2xl mx-auto py-24 text-center border-4 border-dashed border-slate-100 rounded-[3.5rem] opacity-30">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Search className="text-slate-200" size={40} />
                        </div>
                        <h3 className="text-slate-400 font-black uppercase tracking-[0.2em] text-sm italic">System Ready for Inputs...</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OfferGeniusApp;
