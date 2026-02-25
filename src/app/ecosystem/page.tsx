import React from 'react';
import { Network, Server, BookOpen, Presentation, Sparkles, DollarSign, ArrowRight, ShieldCheck, Database, AppWindow, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import ecosystemData from '@/data/ecosystem.json';

// Helper to grab icons dynamically
const iconMap: { [key: string]: any } = {
    BookOpen: BookOpen,
    Sparkles: Sparkles,
    AppWindow: AppWindow,
    DollarSign: DollarSign,
};

// Helper for Tailwind color mappings to ensure they aren't purged
const colorStyles: { [key: string]: string } = {
    blue: "text-blue-500 bg-blue-50 border-blue-100",
    purple: "text-purple-500 bg-purple-50 border-purple-100",
    "brand-neon": "text-brand-neon bg-[#CCFF00]/10 border-brand-neon/20",
    rose: "text-rose-500 bg-rose-50 border-rose-100",
};

export default function EcosystemPage() {
    // Extract sections directly from JSON
    const cpSection = ecosystemData.sections.find((s) => s.id === "core-programs");
    const mwSection = ecosystemData.sections.find((s) => s.id === "mini-workshops");
    const aiSection = ecosystemData.sections.find((s) => s.id === "ai-software");
    const buSection = ecosystemData.sections.find((s) => s.id === "bumps-upsells");
    const inSection = ecosystemData.sections.find((s) => s.id === "backend-infrastructure");
    const trSection = ecosystemData.sections.find((s) => s.id === "integrations-tracking");

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
            {/* Header */}
            <div className="bg-slate-900 text-white pt-20 pb-32 px-6 md:px-12 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-neon/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-white/10 p-2 rounded-lg border border-white/20">
                                <Network className="text-brand-neon" size={24} />
                            </span>
                            <span className="text-brand-neon font-bold tracking-widest text-sm uppercase">Business Architecture</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight leading-tight">
                            The Complete <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-brand-neon/50">Ecosystem Map</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl">
                            {ecosystemData.description}
                        </p>
                    </div>
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl md:min-w-[300px]">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-slate-400 font-medium">Status</span>
                            <span className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full"><div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div> All Systems Operational</span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm"><span className="text-slate-500">Node JS</span><span className="text-white font-mono">v20+</span></div>
                            <div className="flex justify-between items-center text-sm"><span className="text-slate-500">Framework</span><span className="text-white font-mono">Next.js 14 (App Router)</span></div>
                            <div className="flex justify-between items-center text-sm"><span className="text-slate-500">Database</span><span className="text-white font-mono">Supabase PostgreSQL</span></div>
                            <div className="flex justify-between items-center text-sm"><span className="text-slate-500">Payments</span><span className="text-white font-mono">Stripe Webhooks</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-16 relative z-20 space-y-12">

                {/* Core & Mini Workshops Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Core Programs */}
                    {cpSection && (
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`p-4 rounded-2xl ${colorStyles[cpSection?.color || "blue"]}`}>
                                    {React.createElement(iconMap[cpSection?.icon || "BookOpen"] || BookOpen, { size: 28 })}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800">{cpSection.title}</h2>
                                    <p className="text-slate-500 font-medium text-sm">Main high-ticket funnels</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                {cpSection?.items?.map((item: any, idx: number) => (
                                    <div key={idx} className="group border border-slate-100 p-5 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-bold text-lg text-slate-900">{item.name}</h3>
                                            <div className="text-right">
                                                <span className="inline-block bg-emerald-50 text-emerald-600 font-black text-sm px-3 py-1 rounded-full shadow-sm border border-emerald-100">{item.price}</span>
                                            </div>
                                        </div>
                                        <p className="text-slate-500 text-sm mb-4 leading-relaxed">{item.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {item.links.map((link: any, i: number) => (
                                                <Link key={i} href={link.url} className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                                                    {link.label} <ArrowRight size={12} />
                                                </Link>
                                            ))}
                                        </div>
                                        {item.callout && (
                                            <div className="mt-3 text-xs font-medium text-amber-600 bg-amber-50 inline-block px-3 py-1 rounded-md border border-amber-100">Note: {item.callout}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Mini Workshops */}
                    {mwSection && (
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`p-4 rounded-2xl ${colorStyles[mwSection?.color || "purple"]}`}>
                                    {React.createElement(iconMap[mwSection?.icon || "Sparkles"] || Sparkles, { size: 28 })}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800">{mwSection.title}</h2>
                                    <p className="text-slate-500 font-medium text-sm">Low barrier-to-entry products</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                {mwSection?.items?.map((item: any, idx: number) => (
                                    <div key={idx} className="group border border-slate-100 p-5 rounded-2xl hover:border-purple-200 hover:shadow-lg transition-all">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-bold text-lg text-slate-900">{item.name}</h3>
                                            <span className="inline-block bg-emerald-50 text-emerald-600 font-black text-sm px-3 py-1 rounded-full shadow-sm border border-emerald-100">{item.price}</span>
                                        </div>
                                        <p className="text-slate-500 text-sm mb-4 leading-relaxed">{item.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {item.links.map((link: any, i: number) => (
                                                <Link key={i} href={link.url} className="text-xs font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                                                    {link.label} <ArrowRight size={12} />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* AI Software Tools */}
                {aiSection && (
                    <div className="bg-slate-900 rounded-3xl p-1 shadow-2xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-neon/20 via-purple-500/20 to-blue-500/20 opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        <div className="bg-slate-900 rounded-[23px] p-8 md:p-12 relative z-10">
                            <div className="flex items-center gap-4 mb-10">
                                <div className={`p-4 rounded-2xl ${colorStyles[aiSection?.color || "brand-neon"]}`}>
                                    {React.createElement(iconMap[aiSection?.icon || "AppWindow"] || AppWindow, { size: 28 })}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-white">{aiSection.title}</h2>
                                    <p className="text-slate-400 font-medium">Custom coded programmatic tools</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {aiSection.apps?.map((app: any, idx: number) => (
                                    <div key={idx} className={`p-6 rounded-2xl border ${app.packages ? 'border-brand-neon/30 bg-black/50 shadow-[0_0_30px_rgba(204,255,0,0.05)]' : 'border-white/10 bg-white/5'}`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="font-bold text-xl text-white">{app.name}</h3>
                                            {app.type && <span className="text-xs font-black uppercase tracking-widest text-brand-neon bg-brand-neon/10 px-2 py-1 rounded">{app.type}</span>}
                                        </div>
                                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                            {app.description}
                                        </p>

                                        {/* Handle Packages if they exist */}
                                        {app.packages && (
                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                {app.packages.map((pkg: any, i: number) => (
                                                    <div key={i} className={`p-3 rounded-lg border ${pkg.badge ? 'bg-white/5 border-brand-neon/50' : 'bg-white/5 border-white/10'}`}>
                                                        <span className={`block text-xs ${pkg.badge ? 'text-brand-neon' : 'text-slate-400'}`}>{pkg.name.replace(' Package', '')}</span>
                                                        <span className="font-bold text-white">{pkg.price} <span className="text-xs text-slate-500 font-normal">({pkg.details.split('Grants ')[1].split(' Image')[0]} Cr)</span></span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Links or URL */}
                                        {app.links ? (
                                            <div className="flex gap-3">
                                                {app.links.map((link: any, i: number) => (
                                                    <Link key={i} href={link.url} className={`text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1 ${i === 0 ? 'bg-brand-neon text-black hover:bg-white' : 'text-slate-300 hover:text-white bg-white/10 hover:bg-white/20'}`}>
                                                        {link.label} {i === 0 && <ArrowRight size={14} />}
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <Link href={app.url} className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-brand-neon transition-colors">
                                                Open App <ArrowRight size={16} />
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Order Bumps Database View */}
                {buSection && (
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                        <div className="p-8 border-b border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className={`p-4 rounded-2xl ${colorStyles[buSection?.color || "emerald"]}`}>
                                    {React.createElement(iconMap[buSection?.icon || "DollarSign"] || DollarSign, { size: 28 })}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800">{buSection.title}</h2>
                                    <p className="text-slate-500 font-medium text-sm">{buSection.subtitle}</p>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-widest text-slate-500">
                                        <th className="p-4 font-bold pl-8">Product Name</th>
                                        <th className="p-4 font-bold">Price</th>
                                        <th className="p-4 font-bold">Type</th>
                                        <th className="p-4 font-bold max-w-[200px]">Connected Funnels</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {buSection.table?.map((row: any, idx: number) => (
                                        <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                            <td className="p-4 pl-8">
                                                <div className="font-bold text-slate-900">{row.name}</div>
                                                <div className="text-xs text-slate-500 mt-1 max-w-sm truncate">{row.details}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-block bg-emerald-50 text-emerald-700 font-black px-2 py-1 rounded-md">{row.price}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${row.type.includes('Upsell') ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>
                                                    {row.type}
                                                </span>
                                            </td>
                                            <td className="p-4 text-slate-600 font-medium">
                                                {row.offeredOn}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Infrastructure Details */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Database */}
                    {inSection && (
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <Database className="text-blue-500" size={24} />
                                <h2 className="text-xl font-black text-slate-800">Supabase Architecture</h2>
                            </div>
                            <div className="space-y-3">
                                {inSection.tables?.map((table: any, idx: number) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="mt-1"><Server size={14} className="text-slate-400" /></div>
                                        <div>
                                            <div className="font-mono text-sm font-bold text-slate-700">{table.name}</div>
                                            <div className="text-xs text-slate-500 mt-0.5">{table.description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tracking */}
                    {trSection && (
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <ShieldCheck className="text-rose-500" size={24} />
                                <h2 className="text-xl font-black text-slate-800">Tracking & APIs</h2>
                            </div>
                            <div className="space-y-4">
                                {trSection.items?.map((item: any, idx: number) => (
                                    <div key={idx} className="border-l-2 border-rose-200 pl-4 py-1">
                                        <div className="font-bold text-slate-800 flex items-center justify-between">
                                            {item.name}
                                            {item.id && <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500">{item.id}</span>}
                                        </div>
                                        <div className="text-xs text-slate-500 mt-1">{item.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
