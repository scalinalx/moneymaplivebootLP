import React from 'react';
import { Network, Server, BookOpen, Presentation, Sparkles, DollarSign, ArrowRight, ShieldCheck, Database, AppWindow, RefreshCcw, FileText, Key, Activity, Cpu } from 'lucide-react';
import Link from 'next/link';
import ecosystemData from '@/data/ecosystem.json';

// Helper to grab icons dynamically
const iconMap: { [key: string]: any } = {
    BookOpen: BookOpen,
    Sparkles: Sparkles,
    AppWindow: AppWindow,
    DollarSign: DollarSign,
    ShieldCheck: ShieldCheck,
    Presentation: Presentation,
    FileText: FileText,
    Database: Database,
    Key: Key,
    Activity: Activity,
    Cpu: Cpu
};

// Helper for Tailwind color mappings to ensure they aren't purged
const colorStyles: { [key: string]: string } = {
    blue: "text-blue-500 bg-blue-50 border-blue-100",
    purple: "text-purple-500 bg-purple-50 border-purple-100",
    "brand-neon": "text-brand-neon bg-[#CCFF00]/10 border-brand-neon/20",
    rose: "text-rose-500 bg-rose-50 border-rose-100",
    emerald: "text-emerald-500 bg-emerald-50 border-emerald-100",
    amber: "text-amber-500 bg-amber-50 border-amber-100",
    slate: "text-slate-500 bg-slate-50 border-slate-100",
};

export default function EcosystemPage() {
    // Extract sections directly from JSON
    const cpSection = ecosystemData.sections.find((s) => s.id === "core-programs");
    const mwSection = ecosystemData.sections.find((s) => s.id === "mini-workshops");
    const aiSection = ecosystemData.sections.find((s) => s.id === "ai-software");
    const ioSection = ecosystemData.sections.find((s) => s.id === "internal-ops");
    const buSection = ecosystemData.sections.find((s) => s.id === "bumps-upsells");
    const spSection = ecosystemData.sections.find((s) => s.id === "success-pages");
    const upSection = ecosystemData.sections.find((s) => s.id === "utility-pages");
    const inSection = ecosystemData.sections.find((s) => s.id === "backend-infrastructure");
    const trSection = ecosystemData.sections.find((s) => s.id === "integrations-tracking");
    const evSection = ecosystemData.sections.find((s) => s.id === "env-vars");

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-32">
            {/* Header */}
            <div className="bg-slate-900 text-white pt-20 pb-40 px-6 md:px-12 relative overflow-hidden">
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
                        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                            {ecosystemData.description}
                        </p>
                    </div>
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl md:min-w-[320px] shadow-2xl">
                        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                            <span className="text-slate-400 font-medium">Status</span>
                            <span className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                Live & Operational
                            </span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span className="text-slate-500">Core Runtime</span>
                                <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">Next.js 15+</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span className="text-slate-500">Database</span>
                                <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">PostgreSQL</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span className="text-slate-500">AI Model</span>
                                <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">Gemini 2.5 Flash</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span className="text-slate-500">Email Infrastructure</span>
                                <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">Kit V4</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-24 relative z-20 space-y-12">

                {/* Core & Mini Workshops Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Core Programs */}
                    {cpSection && (
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col">
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`p-4 rounded-2xl ${colorStyles[cpSection?.color || "blue"]}`}>
                                    {React.createElement(iconMap[cpSection?.icon || "BookOpen"] || BookOpen, { size: 28 })}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">{cpSection.title}</h2>
                                    <p className="text-slate-500 font-medium text-sm">Main high-ticket funnels</p>
                                </div>
                            </div>
                            <div className="space-y-6 flex-grow">
                                {cpSection?.items?.map((item: any, idx: number) => (
                                    <div key={idx} className="group border border-slate-100 p-5 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                                            <div className="text-right shrink-0 ml-4">
                                                <span className="inline-block bg-emerald-50 text-emerald-600 font-black text-sm px-3 py-1 rounded-full shadow-sm border border-emerald-100">{item.price}</span>
                                            </div>
                                        </div>
                                        <p className="text-slate-500 text-sm mb-4 leading-relaxed">{item.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {item.links.map((link: any, i: number) => (
                                                <Link key={i} href={link.url} className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 border border-blue-100/50">
                                                    {link.label} <ArrowRight size={12} />
                                                </Link>
                                            ))}
                                        </div>
                                        {item.callout && (
                                            <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 inline-block px-2 py-1 rounded border border-amber-100">Note: {item.callout}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Mini Workshops & Internal Ops */}
                    <div className="space-y-8">
                        {mwSection && (
                            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className={`p-4 rounded-2xl ${colorStyles[mwSection?.color || "purple"]}`}>
                                        {React.createElement(iconMap[mwSection?.icon || "Sparkles"] || Sparkles, { size: 28 })}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">{mwSection.title}</h2>
                                        <p className="text-slate-500 font-medium text-sm">Low barrier-to-entry products</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    {mwSection?.items?.map((item: any, idx: number) => (
                                        <div key={idx} className="group border border-slate-100 p-5 rounded-2xl hover:border-purple-200 hover:shadow-lg transition-all duration-300">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-bold text-lg text-slate-900 group-hover:text-purple-600 transition-colors">{item.name}</h3>
                                                <span className="inline-block bg-emerald-50 text-emerald-600 font-black text-sm px-3 py-1 rounded-full shadow-sm border border-emerald-100">{item.price}</span>
                                            </div>
                                            <p className="text-slate-500 text-sm mb-4 leading-relaxed">{item.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {item.links.map((link: any, i: number) => (
                                                    <Link key={i} href={link.url} className="text-xs font-bold text-purple-600 bg-purple-50 hover:bg-purple-600 hover:text-white px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 border border-purple-100/50">
                                                        {link.label} <ArrowRight size={12} />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {ioSection && (
                            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl border border-white/10 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`p-4 rounded-2xl ${colorStyles[ioSection?.color || "rose"]}`}>
                                            {React.createElement(iconMap[ioSection?.icon || "ShieldCheck"] || ShieldCheck, { size: 28 })}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-white tracking-tight">{ioSection.title}</h2>
                                            <p className="text-slate-400 font-medium text-sm">Internal management systems</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {ioSection.items?.map((item: any, idx: number) => (
                                            <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-all">
                                                <h3 className="font-bold text-lg text-white mb-2">{item.name}</h3>
                                                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{item.description}</p>
                                                <div className="flex items-center justify-between">
                                                    <Link href={item.url} className="text-xs font-black uppercase tracking-widest text-brand-neon bg-brand-neon/10 px-4 py-2 rounded-lg hover:bg-brand-neon hover:text-black transition-all flex items-center gap-2">
                                                        Access Vault <ArrowRight size={14} />
                                                    </Link>
                                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter italic">{item.access}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* AI Software Tools */}
                {aiSection && (
                    <div className="bg-slate-900 rounded-3xl p-1 shadow-2xl overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-neon/20 via-purple-500/20 to-blue-500/20 opacity-40 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        <div className="bg-slate-900 rounded-[23px] p-8 md:p-12 relative z-10">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                <div className="flex items-center gap-5">
                                    <div className={`p-4 rounded-2xl ${colorStyles[aiSection?.color || "brand-neon"]}`}>
                                        {React.createElement(iconMap[aiSection?.icon || "AppWindow"] || AppWindow, { size: 32 })}
                                    </div>
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">{aiSection.title}</h2>
                                        <p className="text-slate-400 font-medium text-lg">Programmatic Custom Software</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black tracking-widest uppercase text-slate-500 border border-white/10 px-3 py-1 rounded-full">AI Stack: Gemini 2.5 + Nano Banana</span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {aiSection.apps?.map((app: any, idx: number) => (
                                    <div key={idx} className={`p-6 rounded-2xl border flex flex-col transition-all duration-300 ${app.packages ? 'border-brand-neon/30 bg-black/50 shadow-[0_0_40px_rgba(204,255,0,0.05)] md:col-span-1 lg:col-span-1' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="font-bold text-xl text-white group-hover:text-brand-neon transition-colors">{app.name}</h3>
                                            {app.type && <span className="text-[10px] font-black uppercase tracking-widest text-brand-neon bg-brand-neon/10 px-2.5 py-1 rounded-md border border-brand-neon/20">{app.type}</span>}
                                        </div>
                                        <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-grow">
                                            {app.description}
                                        </p>

                                        {/* Handle Packages if they exist */}
                                        {app.packages && (
                                            <div className="grid grid-cols-2 gap-3 mb-6">
                                                {app.packages.map((pkg: any, i: number) => (
                                                    <div key={i} className={`p-3 rounded-lg border ${pkg.badge ? 'bg-brand-neon/5 border-brand-neon/40 shadow-inner' : 'bg-white/5 border-white/10'}`}>
                                                        <span className={`block text-[10px] font-bold uppercase tracking-tight mb-1 ${pkg.badge ? 'text-brand-neon' : 'text-slate-500'}`}>{pkg.name.replace(' Package', '')}</span>
                                                        <span className="font-black text-white text-lg">{pkg.price}</span>
                                                        <div className="text-[10px] text-slate-500 font-bold mt-1 uppercase italic">{pkg.details.split('Grants ')[1].split(' Image')[0]} Tokens</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Links or URL */}
                                        {app.links ? (
                                            <div className="flex flex-wrap gap-2">
                                                {app.links.map((link: any, i: number) => (
                                                    <Link key={i} href={link.url} className={`text-xs font-bold px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 ${i === 0 ? 'bg-brand-neon text-black hover:bg-white border-2 border-brand-neon shadow-lg shadow-brand-neon/10' : 'text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10'}`}>
                                                        {link.label} {i === 0 && <ArrowRight size={14} />}
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between">
                                                <Link href={app.url} className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-brand-neon transition-colors group">
                                                    Launch App <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                                {app.access && <span className="text-[10px] font-bold text-slate-600 uppercase italic">{app.access.split('(')[0]}</span>}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Content & Fulfillment Flow */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Success Pages */}
                    {spSection && (
                        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`p-4 rounded-2xl ${colorStyles[spSection?.color || "blue"]}`}>
                                    {React.createElement(iconMap[spSection?.icon || "Presentation"] || Presentation, { size: 28 })}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">{spSection.title}</h2>
                                    <p className="text-slate-500 font-medium text-sm">Post-purchase fulfillment experiences</p>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                {spSection.items?.map((page: any, idx: number) => (
                                    <div key={idx} className="border border-slate-100 p-4 rounded-2xl hover:border-blue-100 transition-all group">
                                        <div className="flex items-center justify-between mb-3 font-mono text-[10px] font-bold text-slate-400">
                                            <span>ROUTE: {page.path}</span>
                                            {page.redirect && <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded border border-amber-100">AUTO-REDIRECT</span>}
                                        </div>
                                        <h3 className="font-bold text-slate-900 mb-2 truncate group-hover:text-blue-600 transition-colors uppercase tracking-tight">{page.name}</h3>
                                        <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2 italic">"{page.content || page.redirect}"</p>
                                        <Link href={page.path} className="text-[10px] font-black uppercase text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                            Preview fulfillment <ArrowRight size={10} />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Utility Pages */}
                    {upSection && (
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col">
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`p-4 rounded-2xl ${colorStyles[upSection?.color || "slate"]}`}>
                                    {React.createElement(iconMap[upSection?.icon || "FileText"] || FileText, { size: 28 })}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">{upSection.title}</h2>
                                    <p className="text-slate-500 font-medium text-sm">Vital site utilities</p>
                                </div>
                            </div>
                            <div className="space-y-3 flex-grow">
                                {upSection.links?.map((link: any, idx: number) => (
                                    <Link key={idx} href={link.url} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all group">
                                        <span className="font-bold text-slate-700 text-sm group-hover:text-slate-900 transition-colors">{link.name}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-[10px] text-slate-400">{link.url}</span>
                                            <ArrowRight size={14} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Order Bumps Database View */}
                {buSection && (
                    <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className={`p-4 rounded-2xl ${colorStyles[buSection?.color || "emerald"]}`}>
                                    {React.createElement(iconMap[buSection?.icon || "DollarSign"] || DollarSign, { size: 28 })}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">{buSection.title}</h2>
                                    <p className="text-slate-500 font-medium text-sm">{buSection.subtitle}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                                Global Revenue Boosters
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black">
                                        <th className="p-5 pl-8">Product Name</th>
                                        <th className="p-5">Price</th>
                                        <th className="p-5">Type</th>
                                        <th className="p-5 max-w-[200px]">Connected Funnels</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {buSection.table?.map((row: any, idx: number) => (
                                        <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors group">
                                            <td className="p-5 pl-8">
                                                <div className="font-black text-slate-900 text-base">{row.name}</div>
                                                <div className="text-xs text-slate-500 mt-1.5 max-w-lg leading-relaxed">{row.details}</div>
                                            </td>
                                            <td className="p-5">
                                                <span className="inline-block bg-emerald-50 text-emerald-700 font-black px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm">{row.price}</span>
                                            </td>
                                            <td className="p-5">
                                                <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${row.type.includes('Upsell') ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                                    {row.type}
                                                </span>
                                            </td>
                                            <td className="p-5 text-slate-600 font-bold text-xs uppercase tracking-tight">
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
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Database & APIs */}
                    {inSection && (
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-blue-500">
                                    <Database size={28} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">{inSection.title}</h2>
                                    <p className="text-slate-500 font-medium text-sm">Database & Server Infrastructure</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                        <Server size={14} /> Supabase Tables
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {inSection.tables?.map((table: any, idx: number) => (
                                            <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
                                                <div className="mt-1"><Server size={14} className="text-blue-400" /></div>
                                                <div>
                                                    <div className="font-mono text-xs font-black text-slate-800 tracking-tight">{table.name}</div>
                                                    <div className="text-[10px] text-slate-500 mt-1 leading-tight font-medium uppercase tracking-tighter">{table.description}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-8">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                        <Activity size={14} /> Active Server Routes (APIs)
                                    </h3>
                                    <div className="space-y-3">
                                        {inSection.apis?.map((api: any, idx: number) => (
                                            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group">
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className="font-mono text-xs font-black text-blue-600 group-hover:bg-blue-600 group-hover:text-white px-2 py-0.5 rounded transition-all">{api.path}</span>
                                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Active</span>
                                                </div>
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter italic leading-relaxed">{api.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-8">
                        {/* Tracking */}
                        {trSection && (
                            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                                <div className="flex items-center gap-3 mb-8">
                                    <ShieldCheck className="text-rose-500" size={28} />
                                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">{trSection.title}</h2>
                                </div>
                                <div className="space-y-4">
                                    {trSection.items?.map((item: any, idx: number) => (
                                        <div key={idx} className="bg-slate-50 border-l-4 border-rose-500 p-5 rounded-r-2xl border-y border-r border-slate-100">
                                            <div className="font-black text-slate-900 flex items-center justify-between mb-2 uppercase tracking-tight">
                                                {item.name}
                                                {item.id && <span className="font-mono text-[10px] bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-500 shadow-sm">{item.id}</span>}
                                            </div>
                                            <div className="text-xs text-slate-500 leading-relaxed font-medium uppercase tracking-tight">{item.description}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Environment Registry */}
                        {evSection && (
                            <div className="bg-slate-900 text-slate-300 rounded-3xl p-8 shadow-2xl border border-white/5 font-mono overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Cpu size={120} />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
                                        <Key className="text-brand-neon" size={24} />
                                        <h2 className="text-xl font-black text-white tracking-widest uppercase">{evSection.title}</h2>
                                    </div>
                                    <div className="space-y-6">
                                        {evSection.services?.map((service: any, idx: number) => (
                                            <div key={idx}>
                                                <h3 className="text-[10px] font-black text-brand-neon/60 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-brand-neon rounded-full"></div>
                                                    {service.name}
                                                </h3>
                                                <div className="space-y-2">
                                                    {service.vars.map((v: any, i: number) => (
                                                        <div key={i} className="flex flex-col md:flex-row md:items-start gap-1 p-2 rounded hover:bg-white/5 transition-colors border-l border-white/10 hover:border-brand-neon/50 pl-3">
                                                            <span className="text-white text-xs font-bold shrink-0">{v.key}</span>
                                                            <span className="text-[9px] text-slate-500 md:ml-2 uppercase tracking-tighter truncate">{v.description}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
