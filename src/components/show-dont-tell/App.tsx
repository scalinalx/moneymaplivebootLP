'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Loader2, RefreshCw, Eye, ArrowLeft, MessageSquare, ImageIcon, Settings, LogOut, Download, Sliders, Type, Hash, CheckSquare } from 'lucide-react';
import { TokenLogin } from './TokenLogin';

const stylePresets = [
    "Minimal bold‑text style; high‑contrast title on a clean solid/gradient background maximizing readability.",
    "Clean photorealistic background with expressive texture or subtle depth; only the title overlaid, no other graphic elements, no stickers, no emojis, no borders — minimal, high-contrast typography with ample negative space.",
    "Split-screen comparison visual: negative state on the left and positive state on the right; examples include Before/After, Other Brands vs Us, and Without X vs With X. Use a clear divider, strong contrast, consistent framing across both sides, minimal ornaments, and bold labels integrated with the title to highlight the transformation.",
    "Generalistic style covering diverse topics with balanced, accessible presentation.",
    "Abstract style with minimalistic elements and clean design.",
    "Design/Illustration style emphasizing polished visuals, thoughtful typography, and strong composition.",
    "Realistic and engaging style centered on authentic storytelling, relatable scenarios, and dynamic pacing.",
    "High-energy, colorful style with shocked expressions and bold text.",
    "Business-focused, minimalist style with strong personal branding.",
    "Tech-focused, clean style with product shots and minimal text.",
    "Gaming and meme culture with expressive reactions style.",
    "Aesthetic, vintage-inspired style with film photography vibes.",
    "Challenge-based style with dynamic action shots.",
    "Educational style with scientific visuals and clear explanations.",
    "Sports tricks style with explosive action and celebration moments.",
    "Animated educational style with distinctive vector art.",
    "Adventure and travel style with inspiring landscapes.",
    "Minimal vector illustration style with topic‑specific icons, solid fills, no textures/3D, and a centered high‑contrast title ribbon.",
    "Minimal niche illustration style with flat shapes, brand‑color background, zero clutter, and a centered title banner.",
    "Fine-art black-and-white, medium-format film photography style with a widescreen composition, soft natural light, gentle contrast, subtle grain, shallow depth of field, and clean negative space."
];

const App = () => {
    // Auth State
    const [user, setUser] = useState<{ name: string, email: string, usage: number, credits?: number } | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        keywords: '',
        style: stylePresets[0],
        aspectRatio: '16:9',
        lessVirality: false
    });

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedToken = sessionStorage.getItem('sdt_token');
        if (savedToken) {
            // Check later if we auto-verify
        }
    }, []);

    const handleLoginSuccess = (userData: any, userToken: string) => {
        setUser(userData);
        setToken(userToken);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('sdt_token');
        setUser(null);
        setToken(null);
        setResults([]);
        setFormData(prev => ({ ...prev, title: '', keywords: '' }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked :
            type === 'range' ? parseInt(value) : value;

        setFormData(prev => ({
            ...prev,
            [name]: finalValue
        }));
    };

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim() || !token) return;

        setLoading(true);
        setError(null);
        setResults([]);

        try {
            const response = await fetch('/api/show-dont-tell/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tokenId: token,
                    ...formData
                })
            });

            const data = await response.json();

            if (data.success) {
                setResults(data.images);
                setUser(prev => prev ? { ...prev, usage: data.newUsage, credits: data.newCredits } : null);
                setTimeout(() => {
                    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            } else {
                setError(data.error || "Failed to generate images.");
                if (data.error?.includes("expired") || data.error?.includes("Invalid Token") || data.error?.includes("Insufficient credits")) {
                    if (!data.error?.includes("Insufficient credits")) {
                        handleLogout();
                    }
                }
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong connecting to the generation server.");
        } finally {
            setLoading(false);
        }
    };

    if (!user || !token) {
        return <TokenLogin onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <div className="ana-ai-root min-h-screen pb-20 bg-gradient-to-br from-rose-50 via-white to-pink-50 text-slate-800 font-sans">
            {/* Navbar */}
            <nav className="w-full py-4 px-6 md:px-12 flex items-center justify-between ana-ai-glass-panel sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <button onClick={() => window.history.back()} className="p-2 hover:bg-rose-50 rounded-full transition-colors hidden md:block">
                        <ArrowLeft size={20} className="text-slate-600" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-200 bg-gradient-to-tr from-rose-400 to-pink-500 flex items-center justify-center text-white">
                            <Eye size={20} />
                        </div>
                        <span className="font-extrabold text-xl tracking-tighter text-slate-900 uppercase">
                            SHOW DON'T TELL
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                        <span>Welcome, {user.name}</span>
                        <div className="h-4 w-px bg-slate-300"></div>
                        <span className="text-emerald-500">Credits Remaining: {user.credits ?? Math.max(0, 5000 - user.usage)}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-700 transition-colors"
                    >
                        <LogOut size={16} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 mt-12 md:mt-16">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/50 border border-rose-200 text-rose-700 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                        <Sparkles size={12} className="fill-current" />
                        Powered by our Custom Coded AnaViralVisuals model
                    </div>

                    <p className="text-rose-500 font-bold uppercase tracking-widest text-sm mb-4">
                        Because thumbnails win before words do.
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight font-display">
                        Generate <span className="ana-ai-gradient-text italic">Scroll-Stopping</span> Thumbnails.
                    </h1>
                    <p className="text-slate-500 font-light max-w-xl mx-auto text-lg">
                        Describe the concept you want to create. Our engine will synthesize your prompt into highly-engaging visual assets engineered for virality.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto mb-20">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-rose-200 to-pink-200 rounded-[2.5rem] blur-xl opacity-30"></div>
                        <form onSubmit={handleGenerate} className="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/50 space-y-8">

                            <div className="grid md:grid-cols-2 gap-8">

                                {/* 2. Title */}
                                <div className="space-y-4 md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-800 uppercase tracking-widest ml-1">Title</label>
                                    <div className="relative">
                                        <textarea
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Enter your title (e.g. How to Monetize Your Substack Faster)"
                                            className="w-full px-6 py-5 rounded-2xl bg-white border border-slate-100 focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all placeholder:text-slate-300 text-slate-900 min-h-[100px] shadow-sm font-light text-xl resize-y"
                                            required
                                        />
                                        <Type className="absolute right-6 top-6 text-slate-200" size={24} />
                                    </div>
                                    <p className="text-xs text-slate-400 font-medium pl-2">This text is sent directly to the generator to appear on the thumbnail.</p>
                                </div>

                                {/* 3. Additional Keywords */}
                                <div className="space-y-4 md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-800 uppercase tracking-widest ml-1">Additional Keywords (Optional)</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="keywords"
                                            value={formData.keywords}
                                            onChange={handleInputChange}
                                            placeholder="e.g., cinematic lighting, 3D, bold typography"
                                            className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all placeholder:text-slate-300 text-slate-900 shadow-sm font-light text-base"
                                        />
                                        <Hash className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200" size={20} />
                                    </div>
                                </div>

                                {/* 4. Style Preset */}
                                <div className="space-y-4 md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-800 uppercase tracking-widest ml-1">Style Preset</label>
                                    <div className="relative">
                                        <select
                                            name="style"
                                            value={formData.style}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 rounded-xl bg-white border border-slate-100 focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all text-slate-900 shadow-sm appearance-none cursor-pointer text-sm"
                                        >
                                            {stylePresets.map((style, idx) => (
                                                <option key={idx} value={style}>
                                                    {idx + 1}. {style.substring(0, 100)}{style.length > 100 ? '...' : ''}
                                                </option>
                                            ))}
                                        </select>
                                        <ImageIcon className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-200 pointer-events-none" size={20} />
                                    </div>
                                </div>

                                {/* 5. Aspect Ratio */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-slate-800 uppercase tracking-widest ml-1">Aspect Ratio</label>
                                    <div className="relative">
                                        <select
                                            name="aspectRatio"
                                            value={formData.aspectRatio}
                                            onChange={handleInputChange}
                                            className="w-full px-6 py-4 rounded-xl bg-white border border-slate-100 focus:border-rose-300 focus:ring-4 focus:ring-rose-100 outline-none transition-all text-slate-900 shadow-sm appearance-none cursor-pointer"
                                        >
                                            <option value="16:9">Landscape (16:9)</option>
                                            <option value="3:2">Landscape (3:2)</option>
                                            <option value="2:1">Landscape (2:1)</option>
                                            <option value="3:1">Panorama (3:1)</option>
                                            <option value="1:1">Square (1:1)</option>
                                            <option value="4:5">Portrait (4:5)</option>
                                            <option value="9:16">Portrait (9:16)</option>
                                        </select>
                                        <Settings className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-200 pointer-events-none" size={20} />
                                    </div>
                                </div>

                                {/* 6. Less Virality Toggle */}
                                <div className="space-y-4 flex flex-col justify-center">
                                    <label className="relative inline-flex items-center cursor-pointer mt-6 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-rose-200 transition-colors">
                                        <input
                                            type="checkbox"
                                            name="lessVirality"
                                            checked={formData.lessVirality}
                                            onChange={handleInputChange}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[20px] after:left-[20px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                                        <span className="ml-4 text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                            Less Virality <CheckSquare size={16} className={formData.lessVirality ? "text-rose-500" : "text-slate-300"} />
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-8">
                                <button
                                    type="submit"
                                    disabled={loading || !formData.title.trim()}
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-4 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin" size={24} />
                                    ) : (
                                        <>
                                            <span>Generate Visuals (-2 Credits)</span>
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

                {/* Results Section */}
                {results.length > 0 && (
                    <div ref={resultsRef} className="max-w-6xl mx-auto space-y-8 mb-20 pt-10 ana-ai-animate-fade-in-up">
                        <div className="flex flex-col items-center">
                            <div className="h-20 w-px bg-gradient-to-b from-slate-200 to-rose-200 mb-8" />
                            <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight text-center">Your Generated Assets</h2>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em] text-center">Ready for Download</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {results.map((url, index) => (
                                <div key={index} className="relative group rounded-[2rem] overflow-hidden shadow-2xl border border-rose-100/50 bg-white aspect-auto">
                                    <div className="w-full h-full bg-slate-100 relative min-h-[250px] flex items-center justify-center">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={url}
                                            alt={`Generated visual ${index + 1} for ${formData.title}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        {/* Overlay Actions */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                                            <a
                                                href={url}
                                                download={`thumbnail_${index + 1}.jpg`}
                                                className="bg-white/90 backdrop-blur text-slate-900 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-white hover:scale-105 transition-all shadow-xl"
                                            >
                                                <Download size={16} />
                                                Download HD Asset
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center pt-12">
                            <button
                                onClick={() => {
                                    setResults([]);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="inline-flex items-center gap-3 bg-white border border-slate-100 hover:border-rose-200 px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-all shadow-sm"
                            >
                                <RefreshCw size={16} />
                                Generate New Images
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
