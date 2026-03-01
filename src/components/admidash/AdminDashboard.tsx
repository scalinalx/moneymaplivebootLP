'use client';

import React, { useState, useCallback, useEffect } from 'react';

// ── Types ─────────────────────────────────────────────────────────
interface Sale {
    id: string; amount: number; currency: string;
    product: string; email: string; date: string;
    customerName: string;
    source: string; debugId: string;
    type: 'verified' | 'linked' | 'unlinked';
}
interface ProductBreakdown {
    name: string; revenue: number; count: number;
}
interface LeadRow {
    id: string; name: string; email: string;
    product: string; date: string; source: string;
    debugId: string;
}
interface AbandonedCart {
    id: string; email: string; name: string; product: string; date: string; reason: string; source: string;
}
interface DatabaseTable {
    name: string;
    description: string;
    columns: number;
    rowCount: number | string;
}
interface Metrics {
    totalRevenue: number;
    totalLeads: number;
    productBreakdown: ProductBreakdown[];
    recentSales: Sale[];
    recentLeads: LeadRow[];
    abandonedCarts: AbandonedCart[];
    range: string;
    limit: number;
    startDate?: string;
    endDate?: string;
}

// ── Helpers ───────────────────────────────────────────────────────
function fmt(cents: number, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency,
        minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(cents / 100);
}
function fmtDate(iso: string) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: '2-digit'
    });
}

// ── Password Gate ─────────────────────────────────────────────────
function LockScreen({ onUnlock }: { onUnlock: (pw: string) => void }) {
    const [pw, setPw] = useState('');
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);

    const attempt = async () => {
        if (!pw.trim()) return;
        setLoading(true);
        const res = await fetch('/api/admidash/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: pw }),
        });
        setLoading(false);
        if (res.ok) {
            onUnlock(pw);
        } else {
            setErr('Access denied. Check your password.');
            setPw('');
            setTimeout(() => setErr(''), 3000);
        }
    };

    return (
        <div className="ad-lock">
            <div className="ad-lock-card">
                <span className="ad-lock-icon">◈</span>
                <h1 className="ad-lock-title">Command Centre</h1>
                <p className="ad-lock-sub">Admin access required</p>
                <input
                    className="ad-lock-input"
                    type="password"
                    placeholder="Enter password"
                    value={pw}
                    onChange={e => setPw(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && attempt()}
                    autoFocus
                />
                {err && <p className="ad-lock-err">{err}</p>}
                <button className="ad-lock-btn" onClick={attempt} disabled={loading}>
                    {loading ? 'Verifying...' : 'Unlock →'}
                </button>
            </div>
        </div>
    );
}

// ── Table Explorer ────────────────────────────────────────────────
function DatabaseExplorer({ password }: { password: string }) {
    const [tables, setTables] = useState<DatabaseTable[]>([]);
    const [loading, setLoading] = useState(true);

    const loadTables = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admidash/tables', {
                headers: { 'Authorization': `Bearer ${password}` },
            });
            const data = await res.json();
            setTables(data.tables || []);
        } catch (e) {
            console.error('Failed to load tables:', e);
        } finally {
            setLoading(false);
        }
    }, [password]);

    useEffect(() => { loadTables(); }, [loadTables]);

    if (loading) return (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>
            <div className="ad-spinner" style={{ margin: '0 auto 12px' }} />
            Fetching table definitions…
        </div>
    );

    return (
        <table className="ad-table">
            <thead>
                <tr>
                    <th>Table Name</th>
                    <th>Description</th>
                    <th>Columns</th>
                    <th>Rows</th>
                </tr>
            </thead>
            <tbody>
                {tables.map(t => (
                    <tr key={t.name}>
                        <td className="primary">{t.name}</td>
                        <td className="dim" style={{ whiteSpace: 'normal', maxWidth: '300px' }}>{t.description}</td>
                        <td className="dim">{t.columns}</td>
                        <td className="amber">{typeof t.rowCount === 'number' ? t.rowCount.toLocaleString() : t.rowCount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

// ── Dashboard Component ───────────────────────────────────────────
function DashboardContent({ password }: { password: string }) {
    const [m, setM] = useState<Metrics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastRefresh, setLastRefresh] = useState(new Date());
    const [activeTab, setActiveTab] = useState<'sales' | 'leads' | 'databases' | 'abandoned'>('sales');
    const [range, setRange] = useState('last30d');
    const [limit, setLimit] = useState(50);
    const [customStart, setCustomStart] = useState('');
    const [customEnd, setCustomEnd] = useState('');

    const load = useCallback(async () => {
        try {
            setLoading(true); setError(null);
            let url = `/api/admidash/metrics?range=${range}&limit=${limit}`;
            if (range === 'custom' && customStart && customEnd) {
                url = `/api/admidash/metrics?startDate=${customStart}&endDate=${customEnd}&limit=${limit}`;
            }
            const res = await fetch(url, {
                headers: { 'Authorization': `Bearer ${password}` },
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const data = await res.json();
            setM(data);
            setLastRefresh(new Date());
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, [password, range, limit, customStart, customEnd]);

    useEffect(() => { load(); }, [range, limit, password]); // Auto-load on preset change

    const exportLeadsCSV = () => {
        if (!m?.recentLeads.length) return;
        const headers = ["Date", "Name", "Email", "Product", "Source", "ID"];
        const rows = m.recentLeads.map(l => [
            fmtDate(l.date),
            (l.name || '').replace(/,/g, ''),
            l.email,
            (l.product || '').replace(/,/g, ''),
            l.source,
            l.id
        ]);
        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading && !m) {
        return (
            <div className="ad-loading">
                <div className="ad-spinner" />
                Loading Command Centre…
            </div>
        );
    }

    if (error && !m) {
        return <div className="ad-error">⚠ {error}</div>;
    }

    const metrics = m!;

    return (
        <div className="ad-wrap">
            {/* Top Bar */}
            <div className="ad-topbar">
                <div className="ad-brand">
                    <div className="ad-brand-dot" />
                    <span className="ad-brand-name">HWG Command Centre</span>
                </div>
                <div className="ad-topbar-right">
                    <span className="ad-ts">
                        Refreshed {lastRefresh.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button className="ad-refresh-btn" onClick={load} disabled={loading}>
                        {loading ? '↻ Loading' : '↻ Refresh'}
                    </button>
                </div>
            </div>

            {/* Hero Metrics */}
            <div className="ad-hero">
                <div className="ad-hero-cell">
                    <div className="ad-metric-label">Revenue ({range})</div>
                    <div className="ad-metric-value">{fmt(metrics.totalRevenue)}</div>
                    <div className="ad-metric-sub">{metrics.recentSales.length} transactions</div>
                </div>
                <div className="ad-hero-cell">
                    <div className="ad-metric-label">Leads ({range})</div>
                    <div className="ad-metric-value">{metrics.totalLeads.toLocaleString()}</div>
                    <div className="ad-metric-sub">Across all database tables</div>
                </div>
                <div className="ad-hero-cell">
                    <div className="ad-metric-label">Filters</div>
                    <div className="ad-filters">
                        <select className="ad-select" value={range} onChange={e => setRange(e.target.value)}>
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="last7d">Last 7 Days</option>
                            <option value="last30d">Last 30 Days</option>
                            <option value="custom">Custom Range</option>
                            <option value="all">All Time</option>
                        </select>

                        {range === 'custom' && (
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <input type="date" className="ad-select" style={{ width: '130px' }} value={customStart} onChange={e => setCustomStart(e.target.value)} />
                                <span style={{ color: 'var(--text-dim)' }}>to</span>
                                <input type="date" className="ad-select" style={{ width: '130px' }} value={customEnd} onChange={e => setCustomEnd(e.target.value)} />
                                <button onClick={load} className="ad-btn" style={{ padding: '6px 12px', fontSize: '11px' }}>Apply</button>
                            </div>
                        )}

                        <select className="ad-select" value={limit} onChange={e => setLimit(parseInt(e.target.value))}>
                            <option value="20">Show 20</option>
                            <option value="50">Show 50</option>
                            <option value="100">Show 100</option>
                            <option value="500">Show 500</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Product breakdown */}
            {metrics.productBreakdown && metrics.productBreakdown.length > 0 && (
                <>
                    <div className="ad-section-head">
                        <span className="ad-section-title">Product Distribution ({range})</span>
                        <div className="ad-section-line" />
                    </div>
                    <div className="ad-product-grid">
                        {metrics.productBreakdown.map(p => (
                            <div key={p.name} className="ad-product-card">
                                <div className="ad-product-name">{p.name}</div>
                                <div className="ad-product-rev">{fmt(p.revenue)}</div>
                                <div className="ad-product-meta">{p.count} sale{p.count !== 1 ? 's' : ''}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Tabs Navigation */}
            <div className="ad-section-head" style={{ marginTop: 40 }}>
                <div className="ad-tabs">
                    <button className={`ad-tab ${activeTab === 'sales' ? 'active' : ''}`} onClick={() => setActiveTab('sales')}>Recent Sales ({metrics.recentSales.length})</button>
                    <button className={`ad-tab ${activeTab === 'leads' ? 'active' : ''}`} onClick={() => setActiveTab('leads')}>All Leads ({metrics.recentLeads.length})</button>
                    <button className={`ad-tab ${activeTab === 'abandoned' ? 'active' : ''}`} onClick={() => setActiveTab('abandoned')}>Abandoned Carts ({metrics.abandonedCarts.length})</button>
                    <button className={`ad-tab ${activeTab === 'databases' ? 'active' : ''}`} onClick={() => setActiveTab('databases')}>Databases</button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="ad-table-wrap">
                {activeTab === 'sales' && (
                    <>
                        <div style={{ padding: '12px 16px', background: 'var(--bg3)', borderBottom: '1px solid var(--border)', fontSize: '11px', color: 'var(--text-dim)' }}>
                            📝 <b>Sales Logic</b>: Showing all Stripe charges &gt; $0. Cross-referenced with DB for name/product context.
                        </div>
                        <table className="ad-table">
                            <thead>
                                <tr><th>Date</th><th>Amount</th><th>Product</th><th>Customer / Email</th><th>Source / Audit</th></tr>
                            </thead>
                            <tbody>
                                {metrics.recentSales.map(s => (
                                    <tr key={s.id}>
                                        <td className="dim">{fmtDate(s.date)}</td>
                                        <td className="amber">{fmt(s.amount, s.currency)}</td>
                                        <td className="primary">{s.product}</td>
                                        <td>
                                            <div className="primary">{s.customerName}</div>
                                            <div className="dim" style={{ fontSize: '10px' }}>{s.email}</div>
                                        </td>
                                        <td>
                                            <div style={{ fontSize: '10px', color: s.type === 'verified' ? 'var(--green)' : 'var(--text-mid)' }}>{s.source}</div>
                                            <div style={{ fontSize: '9px', color: 'var(--text-dim)' }}>ID: {s.debugId}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}

                {activeTab === 'leads' && (
                    <>
                        <div style={{ padding: '12px 16px', background: 'var(--bg3)', borderBottom: '1px solid var(--border)', fontSize: '11px', color: 'var(--text-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>👥 <b>Leads Logic</b>: Showing all database records with <b>NO</b> Stripe payment.</div>
                            <button onClick={exportLeadsCSV} className="ad-btn" style={{ padding: '4px 8px', fontSize: '10px', background: 'var(--bg4)' }}>Export CSV</button>
                        </div>
                        <table className="ad-table">
                            <thead>
                                <tr><th>Date</th><th>Name</th><th>Email</th><th>Product</th><th>Source / Audit</th></tr>
                            </thead>
                            <tbody>
                                {metrics.recentLeads.map(l => (
                                    <tr key={l.id + l.source}>
                                        <td className="dim">{fmtDate(l.date)}</td>
                                        <td className="primary">{l.name || '—'}</td>
                                        <td className="dim">{l.email}</td>
                                        <td className="dim">{l.product}</td>
                                        <td>
                                            <div style={{ fontSize: '10px', color: 'var(--text-mid)' }}>{l.source}</div>
                                            <div style={{ fontSize: '9px', color: 'var(--text-dim)' }}>ID: {l.debugId}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}

                {activeTab === 'abandoned' && (
                    <>
                        <div style={{ padding: '12px 16px', background: 'var(--bg3)', borderBottom: '1px solid var(--border)', fontSize: '11px', color: 'var(--text-mid)' }}>
                            🛒 <b>Abandoned Carts Logic</b>: Tracking $0 sessions and started checkouts with no sale.
                        </div>
                        <table className="ad-table">
                            <thead>
                                <tr><th>Date</th><th>Name / Email</th><th>Product</th><th>Reason</th><th>Source</th></tr>
                            </thead>
                            <tbody>
                                {metrics.abandonedCarts.map(a => (
                                    <tr key={a.id}>
                                        <td className="dim">{fmtDate(a.date)}</td>
                                        <td>
                                            <div className="primary">{a.name}</div>
                                            <div className="dim" style={{ fontSize: '10px' }}>{a.email}</div>
                                        </td>
                                        <td className="amber">{a.product}</td>
                                        <td>
                                            <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(245, 166, 35, 0.1)', color: 'var(--amber)' }}>
                                                {a.reason}
                                            </span>
                                        </td>
                                        <td className="dim" style={{ fontSize: '10px' }}>{a.source}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}

                {activeTab === 'databases' && (
                    <DatabaseExplorer password={password} />
                )}
            </div>
        </div>
    );
}

// ── Main Page Component ───────────────────────────────────────────
export default function AdminDashboardPage() {
    const [password, setPassword] = useState<string | null>(null);

    return (
        <div className="ad-root">
            {!password ? (
                <LockScreen onUnlock={setPassword} />
            ) : (
                <DashboardContent password={password} />
            )}
        </div>
    );
}
