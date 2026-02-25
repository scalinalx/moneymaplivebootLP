import { Metadata } from 'next';
import {
    BookOpen, Zap, DollarSign, Settings, Database,
    Code, Server, AppWindow, ShieldCheck, Mail, Globe, Sparkles
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Ecosystem Map | Monetise Substack',
    description: 'Visual blueprint of the Monetise Substack software and product ecosystem.',
};

export default function EcosystemPage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-neon/30 pb-24">
            {/* Header */}
            <header className="bg-black text-white pt-20 pb-16 px-6 border-b-8 border-brand-neon relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/imgs/noise.png')] opacity-20 mix-blend-overlay"></div>
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest text-brand-neon mb-6">
                        <Globe size={14} /> Live Architecture
                    </div>
                    <h1 className="font-display font-black text-5xl md:text-7xl tracking-tighter uppercase leading-none mb-6">
                        Ecosystem <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-yellow-300">Blueprint</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl leading-relaxed">
                        A comprehensive map of all products, funnels, AI tools, and backend infrastructure currently live on Monetise Substack.
                    </p>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 mt-16 space-y-20">

                {/* Section: Core Programs */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                            <BookOpen size={28} />
                        </div>
                        <h2 className="font-display font-black text-3xl uppercase tracking-tight">Core Educational Programs</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-xl uppercase tracking-tight">Build to Profit Live Workshop</h3>
                                <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">$497</span>
                            </div>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed">The flagship live workshop offering, teaching foundational monetization strategies.</p>
                            <div className="space-y-3 bg-slate-50 p-4 rounded-xl text-sm border border-slate-100">
                                <div className="flex justify-between"><span className="text-slate-500">Sales:</span> <Link href="/landing" className="font-medium text-blue-600 hover:underline">/landing</Link></div>
                                <div className="flex justify-between"><span className="text-slate-500">Checkout:</span> <Link href="/checkout-step1" className="font-medium text-blue-600 hover:underline">/checkout-step1</Link></div>
                                <div className="flex justify-between"><span className="text-slate-500">Success:</span> <Link href="/success" className="font-medium text-blue-600 hover:underline">/success</Link></div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-xl uppercase tracking-tight">The $10k Launch Lab</h3>
                                <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">$597</span>
                            </div>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed">A higher-tier workshop focused on consistent $10k launches.</p>
                            <div className="space-y-3 bg-slate-50 p-4 rounded-xl text-sm border border-slate-100">
                                <div className="flex justify-between"><span className="text-slate-500">Sales:</span> <Link href="/10k-launch-lab" className="font-medium text-blue-600 hover:underline">/10k-launch-lab</Link></div>
                                <div className="flex justify-between"><span className="text-slate-500">Upsell:</span> <Link href="/10k-launch-lab-upsell" className="font-medium text-blue-600 hover:underline">/...-upsell</Link></div>
                                <div className="flex justify-between"><span className="text-slate-500">Success:</span> <Link href="/10k-launch-lab-success" className="font-medium text-blue-600 hover:underline">/...-success</Link></div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-xl uppercase tracking-tight">The Money Map</h3>
                                <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">$497</span>
                            </div>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed">A complete strategy course covering ICP, offer, positioning, messaging, and copy.</p>
                            <div className="space-y-3 bg-slate-50 p-4 rounded-xl text-sm border border-slate-100">
                                <div className="flex justify-between"><span className="text-slate-500">Sales:</span> <Link href="/" className="font-medium text-blue-600 hover:underline">/</Link></div>
                                <div className="flex justify-between text-xs text-orange-600 bg-orange-50 p-2 rounded col-span-2">Sold as $300 Bump on Build to Profit</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Sub Products */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                            <Sparkles size={28} />
                        </div>
                        <h2 className="font-display font-black text-3xl uppercase tracking-tight">Mini-Workshops & Info Products</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-xl uppercase tracking-tight">How to Hit 10k</h3>
                                    <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">$97</span>
                                </div>
                                <p className="text-slate-500 text-sm mb-6 leading-relaxed">A lower barrier-to-entry challenge and curriculum mapping to your first $10k month.</p>
                            </div>
                            <div className="space-y-3 bg-slate-50 p-4 rounded-xl text-sm border border-slate-100">
                                <div className="flex justify-between"><span className="text-slate-500">Checkout:</span> <Link href="/how-to-hit-10k" className="font-medium text-purple-600 hover:underline">/how-to-hit-10k</Link></div>
                                <div className="flex justify-between"><span className="text-slate-500">Success:</span> <Link href="/hit-10k-success" className="font-medium text-purple-600 hover:underline">/hit-10k-success</Link></div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-xl uppercase tracking-tight">100 Genius Launch Ideas</h3>
                                    <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">$27</span>
                                </div>
                                <p className="text-slate-500 text-sm mb-6 leading-relaxed">A 184-page PDF detailing successful launch frameworks and plug-and-play ideas.</p>
                            </div>
                            <div className="space-y-3 bg-slate-50 p-4 rounded-xl text-sm border border-slate-100">
                                <div className="flex justify-between"><span className="text-slate-500">Checkout:</span> <Link href="/100-genius-launch-ideas" className="font-medium text-purple-600 hover:underline">/100-genius-launch-ideas</Link></div>
                                <div className="flex justify-between"><span className="text-slate-500">Success:</span> <Link href="/100-genius-launch-ideas/success" className="font-medium text-purple-600 hover:underline">/.../success</Link></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: AI Software */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-brand-neon/20 text-yellow-600 border border-brand-neon/50 rounded-xl">
                            <AppWindow size={28} />
                        </div>
                        <h2 className="font-display font-black text-3xl uppercase tracking-tight">AI Software & Custom Tools</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-900 text-white rounded-2xl shadow-xl border-2 border-brand-neon p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Code size={120} /></div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-2xl uppercase tracking-tight text-brand-neon">Show Don't Tell</h3>
                                    <span className="bg-white/10 text-white border border-white/20 font-bold px-3 py-1 rounded-full text-sm">Token Model</span>
                                </div>
                                <p className="text-slate-300 text-sm mb-6 leading-relaxed pr-12">
                                    Viral Thumbnail Generator connected to Gemini 2.5 Flash. Generates high-converting creator graphics.
                                </p>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg"><span className="block text-xs text-slate-400">Starter</span><span className="font-bold">$19.97 (200 Cr)</span></div>
                                    <div className="bg-white/5 border border-brand-neon/50 p-3 rounded-lg"><span className="block text-xs text-brand-neon">Pro Value</span><span className="font-bold">$247.00 (2.5k Cr)</span></div>
                                </div>
                                <div className="space-y-3 bg-black/50 p-4 rounded-xl text-sm border border-white/10">
                                    <div className="flex justify-between"><span className="text-slate-400">App Home:</span> <Link href="/show-dont-tell" className="font-medium text-brand-neon hover:underline">/show-dont-tell</Link></div>
                                    <div className="flex justify-between"><span className="text-slate-400">Purchase:</span> <Link href="/show-dont-tell/purchase" className="font-medium text-brand-neon hover:underline">/show-dont-tell/purchase</Link></div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-rows-3 gap-4">
                            <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between hover:border-slate-300 transition-colors">
                                <div>
                                    <h4 className="font-bold uppercase flex items-center gap-2"><Globe size={16} className="text-indigo-500" /> Ana AI Offer Flow</h4>
                                    <p className="text-xs text-slate-500 mt-1">Free interactive clarity tool</p>
                                </div>
                                <Link href="/ana-ai-offer-flow" className="text-xs font-bold px-3 py-2 bg-slate-100 rounded hover:bg-slate-200 transition-colors">/ana-ai-offer-flow</Link>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between hover:border-slate-300 transition-colors">
                                <div>
                                    <h4 className="font-bold uppercase flex items-center gap-2"><Zap size={16} className="text-orange-500" /> OfferGenius™</h4>
                                    <p className="text-xs text-slate-500 mt-1">Sold as $37 Order Bump</p>
                                </div>
                                <Link href="/ana-offer-genius" className="text-xs font-bold px-3 py-2 bg-slate-100 rounded hover:bg-slate-200 transition-colors">/ana-offer-genius</Link>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between hover:border-slate-300 transition-colors">
                                <div>
                                    <h4 className="font-bold uppercase flex items-center gap-2"><Mail size={16} className="text-cyan-500" /> Launch Stack</h4>
                                    <p className="text-xs text-slate-500 mt-1">Sold as $67 Email Sequence AI</p>
                                </div>
                                <Link href="/launch-stack" className="text-xs font-bold px-3 py-2 bg-slate-100 rounded hover:bg-slate-200 transition-colors">/launch-stack</Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Bumps and Upsells */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
                            <DollarSign size={28} />
                        </div>
                        <h2 className="font-display font-black text-3xl uppercase tracking-tight">Bumps & Upsells</h2>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase tracking-wider text-xs text-slate-500">
                                <tr>
                                    <th className="p-4">Offer Name</th>
                                    <th className="p-4">Price</th>
                                    <th className="p-4">Type</th>
                                    <th className="p-4">Offered On</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50">
                                    <td className="p-4 font-bold text-slate-900">Hooks That Stop the Scroll</td>
                                    <td className="p-4 text-green-600 font-bold">$27</td>
                                    <td className="p-4"><span className="bg-rose-100 text-rose-700 px-2 py-1 rounded text-xs font-bold">Order Bump</span></td>
                                    <td className="p-4 text-slate-500">10k Lab, How to Hit 10k</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="p-4 font-bold text-slate-900">The 60-Minute Launch Calendar</td>
                                    <td className="p-4 text-green-600 font-bold">$69</td>
                                    <td className="p-4"><span className="bg-rose-100 text-rose-700 px-2 py-1 rounded text-xs font-bold">Order Bump</span></td>
                                    <td className="p-4 text-slate-500">10k Launch Lab</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="p-4 font-bold text-slate-900">OfferGenius™ AI Builder</td>
                                    <td className="p-4 text-green-600 font-bold">$37</td>
                                    <td className="p-4"><span className="bg-rose-100 text-rose-700 px-2 py-1 rounded text-xs font-bold">Order Bump</span></td>
                                    <td className="p-4 text-slate-500">100 Genius Ideas</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="p-4 font-bold text-slate-900">Launch Stack / Lazy Launch Writer</td>
                                    <td className="p-4 text-green-600 font-bold">$67</td>
                                    <td className="p-4"><span className="bg-rose-100 text-rose-700 px-2 py-1 rounded text-xs font-bold">Order Bump</span></td>
                                    <td className="p-4 text-slate-500">100 Genius Ideas</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="p-4 font-bold text-slate-900">Money Map Bundle</td>
                                    <td className="p-4 text-green-600 font-bold">+$300</td>
                                    <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">Upsell</span></td>
                                    <td className="p-4 text-slate-500">Workshop Checkout</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="p-4 font-bold text-slate-900">1:1 Sales Coaching Session</td>
                                    <td className="p-4 text-green-600 font-bold">$747</td>
                                    <td className="p-4"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">Upsell (Dedicated)</span></td>
                                    <td className="p-4 text-slate-500">/10k-launch-lab-upsell</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Section: Infrastructure & DB */}
                <div className="grid md:grid-cols-2 gap-8">
                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-2 bg-slate-200 rounded-lg">
                                <Database size={20} />
                            </div>
                            <h2 className="font-bold text-xl uppercase tracking-tight">Supabase Tables</h2>
                        </div>
                        <ul className="space-y-3">
                            <li className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-slate-300">
                                <span className="font-mono font-bold text-sm text-slate-800 block mb-1">leads_bootcamp_brands</span>
                                <span className="text-xs text-slate-500">Stores data for the Build to profit workshop.</span>
                            </li>
                            <li className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-slate-300">
                                <span className="font-mono font-bold text-sm text-slate-800 block mb-1">launch_lab_leads</span>
                                <span className="text-xs text-slate-500">Stores data and order bumps for the 10k Launch Lab.</span>
                            </li>
                            <li className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-slate-300">
                                <span className="font-mono font-bold text-sm text-slate-800 block mb-1">hit10k_leads & genius_ideas_leads</span>
                                <span className="text-xs text-slate-500">Data for Hit 10k Challenge and 100 Genius Ideas.</span>
                            </li>
                            <li className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-slate-300">
                                <span className="font-mono font-bold text-sm text-slate-800 flex items-center gap-2 mb-1"><Zap size={14} className="text-brand-neon" /> show_dont_tell_users</span>
                                <span className="text-xs text-slate-500">Tokens, expiration, and credits for Thumbnail Generator.</span>
                            </li>
                            <li className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-slate-300 border-l-4 border-l-blue-500">
                                <span className="font-mono font-bold text-sm text-slate-800 block mb-1">ana_ai_leads</span>
                                <span className="text-xs text-slate-500">Stores leads and usage data for the free Ana AI Offer Flow tool.</span>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-2 bg-slate-200 rounded-lg">
                                <ShieldCheck size={20} />
                            </div>
                            <h2 className="font-bold text-xl uppercase tracking-tight">3rd-Party & APIs</h2>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                            <div>
                                <h4 className="font-bold text-sm mb-2 flex items-center gap-2 border-b border-slate-100 pb-2"><img src="https://cdn.iconscout.com/icon/free/png-256/free-stripe-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-6-pack-logos-icons-2945037.png" className="w-4 h-4" alt="Stripe" /> Stripe Payments</h4>
                                <p className="text-xs text-slate-600">Frontend elements (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`) and secure `/api/webhooks/stripe` routing for fulfillment.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm mb-2 flex items-center gap-2 border-b border-slate-100 pb-2"><img src="https://seeklogo.com/images/G/google-gemini-logo-A5787B2669-seeklogo.com.png" className="w-4 h-4 rounded-full" alt="Gemini" /> Google Gemini 2.5</h4>
                                <p className="text-xs text-slate-600">Uses `NEXT_PUBLIC_GEMINI_API_KEY` to securely generate images on edge networks for Show Don't Tell.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm mb-2 flex items-center gap-2 border-b border-slate-100 pb-2"><Settings size={16} className="text-slate-500" /> Marketing Pixels</h4>
                                <ul className="text-xs text-slate-600 space-y-1 mt-2 list-disc pl-4">
                                    <li>Meta Pixel (`925153509944098`)</li>
                                    <li>Google Analytics (`G-CC592MQH07`)</li>
                                    <li>Rewardful Affiliates (`68083c`)</li>
                                    <li>UseProof Social Proof Popups</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
