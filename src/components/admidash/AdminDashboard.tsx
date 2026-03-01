'use client';

import React, { useState, useCallback, useEffect } from 'react';

// ── Types ─────────────────────────────────────────────────────────
interface Sale {
    id: string; amount: number; currency: string;
    product: string; email: string; date: string;
}
interface ProductBreakdown {
    name: string; revenue: number; count: number;
}
interface LeadRow {
    id: string; email: string; name: string;
    has_paid: boolean; amount_paid: number | null;
    product_name: string | null; payment_completed_at: string | null;
    created_at: string;
}
interface DatabaseTable {
    name: string;
    description: string;
    columns: number;
    rowCount: number | string;
}
interface Metrics {
    totalRevenue30d: number; allTimeRevenue: number;
    totalLeads: number; paidLeads: number; conversionRate: string;
    productBreakdown: ProductBreakdown[];
    recentSales: Sale[]; recentLeads: LeadRow[];
}

// ── Helpers ───────────────────────────────────────────────────────
function fmt(cents: number, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency,
        minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(cents / 100);
}
function fmtDate(iso: string) {
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

// ── Dashboard ─────────────────────────────────────────────────────
function Dashboard({ password }: { password: string }) {
    const [metrics, setMetrics] = useState<Metrics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastRefresh, setLastRefresh] = useState(new Date());
    const [activeTab, setActiveTab] = useState<'sales' | 'leads' | 'tables'>('sales');
    const [tables, setTables] = useState<DatabaseTable[]>([]);
    const [loadingTables, setLoadingTables] = useState(false);

    const load = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const res = await fetch('/api/admidash/metrics', {
                headers: { Authorization: `Bearer ${password}` },
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const data = await res.json();
            setMetrics(data);
            setLastRefresh(new Date());
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, [password]);

    const loadTables = useCallback(async () => {
        setLoadingTables(true);
        try {
            const res = await fetch('/api/admidash/tables', {
                headers: { Authorization: `Bearer ${password}` },
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const data = await res.json();
            setTables(data.tables || []);
        } catch (e: any) {
            console.error('Failed to load tables:', e);
        } finally {
            setLoadingTables(false);
        }
    }, [password]);

    useEffect(() => {
        load();
        loadTables();
    }, [load, loadTables]);

    if (loading && !metrics) {
        return (
            <div className="ad-loading">
                <div className="ad-spinner" />
                Loading metrics…
            </div>
        );
    }

    if (error && !metrics) {
        return <div className="ad-error">⚠ {error}</div>;
    }

    const m = metrics!;

    return (
        <>
            {/* Top bar */}
            <div className="ad-topbar">
                <div className="ad-brand">
                    <div className="ad-brand-dot" />
                    <span className="ad-brand-name">HWG Command Centre</span>
                </div>
                <div className="ad-topbar-right">
                    <span className="ad-ts">
                        Refreshed {lastRefresh.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button className="ad-refresh-btn" onClick={() => { load(); loadTables(); }} disabled={loading}>
                        {loading ? '↻ Loading' : '↻ Refresh'}
                    </button>
                </div>
            </div>

            {/* Hero metrics */}
            <div className="ad-hero">
                <div className="ad-hero-cell">
                    <div className="ad-metric-label">Revenue — Last 30 days</div>
                    <div className="ad-metric-value">{fmt(m.totalRevenue30d)}</div>
                    <div className="ad-metric-sub">{m.recentSales.length} transactions</div>
                </div>
                <div className="ad-hero-cell">
                    <div className="ad-metric-label">Total Leads</div>
                    <div className="ad-metric-value">{m.totalLeads.toLocaleString()}</div>
                    <div className="ad-metric-sub">{m.paidLeads} converted to paid</div>
                </div>
                <div className="ad-hero-cell">
                    <div className="ad-metric-label">Conversion Rate</div>
                    <div className="ad-metric-value">{m.conversionRate}%</div>
                    <div className="ad-metric-sub">leads → paid customers</div>
                </div>
            </div>

            {/* Product breakdown */}
            {m.productBreakdown.length > 0 && (
                <>
                    <div className="ad-section-head">
                        <span className="ad-section-title">Products — Last 30 Days</span>
                        <div className="ad-section-line" />
                    </div>
                    <div className="ad-product-grid">
                        {m.productBreakdown.map(p => (
                            <div key={p.name} className="ad-product-card">
                                <div className="ad-product-name">{p.name}</div>
                                <div className="ad-product-rev">{fmt(p.revenue)}</div>
                                <div className="ad-product-meta">{p.count} sale{p.count !== 1 ? 's' : ''}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Tabs */}
            <div className="ad-section-head" style={{ marginTop: 40 }}>
                <span
                    className="ad-section-title"
                    style={{ cursor: 'pointer', color: activeTab === 'sales' ? 'var(--amber)' : undefined }}
                    onClick={() => setActiveTab('sales')}
                >
                    Recent Sales ({m.recentSales.length})
                </span>
                <div className="ad-section-line" />
                <span
                    className="ad-section-title"
                    style={{ cursor: 'pointer', color: activeTab === 'leads' ? 'var(--amber)' : undefined }}
                    onClick={() => setActiveTab('leads')}
                >
                    Recent Leads ({m.recentLeads.length})
                </span>
                <div className="ad-section-line" />
                <span
                    className="ad-section-title"
                    style={{ cursor: 'pointer', color: activeTab === 'tables' ? 'var(--amber)' : undefined }}
                    onClick={() => setActiveTab('tables')}
                >
                    Databases ({tables.length})
                </span>
            </div>

            {/* Sales table */}
            {activeTab === 'sales' && (
                <div className="ad-table-wrap">
                    <table className="ad-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Product</th>
                                <th>Email</th>
                                <th>ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {m.recentSales.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="dim" style={{ textAlign: 'center', padding: '24px' }}>
                                        No sales in last 30 days
                                    </td>
                                </tr>
                            ) : m.recentSales.map(s => (
                                <tr key={s.id}>
                                    <td className="dim">{fmtDate(s.date)}</td>
                                    <td className="amber">{fmt(s.amount, s.currency)}</td>
                                    <td className="primary">{s.product}</td>
                                    <td className="dim">{s.email}</td>
                                    <td className="dim" style={{ fontSize: 10 }}>{s.id.slice(-8)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Leads table */}
            {activeTab === 'leads' && (
                <div className="ad-table-wrap">
                    <table className="ad-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Product</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {m.recentLeads.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="dim" style={{ textAlign: 'center', padding: '24px' }}>
                                        No leads found
                                    </td>
                                </tr>
                            ) : m.recentLeads.map(l => (
                                <tr key={l.id}>
                                    <td className="dim">{fmtDate(l.created_at)}</td>
                                    <td className="primary">{l.name || '—'}</td>
                                    <td className="dim">{l.email}</td>
                                    <td className="dim">{l.product_name || '—'}</td>
                                    <td className={l.has_paid ? 'amber' : 'dim'}>
                                        {l.amount_paid ? fmt(l.amount_paid) : '—'}
                                    </td>
                                    <td>
                                        <span className={`ad-badge ${l.has_paid ? 'paid' : 'unpaid'}`}>
                                            {l.has_paid ? 'Paid' : 'Lead'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* Tables Explorer */}
            {activeTab === 'tables' && (
                <div className="ad-table-wrap">
                    {loadingTables ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>
                            <div className="ad-spinner" style={{ margin: '0 auto 12px' }} />
                            Fetching table definitions…
                        </div>
                    ) : (
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
                                {tables.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="dim" style={{ textAlign: 'center', padding: '24px' }}>
                                            No public tables found
                                        </td>
                                    </tr>
                                ) : tables.map(t => (
                                    <tr key={t.name}>
                                        <td className="primary">{t.name}</td>
                                        <td className="dim" style={{ whiteSpace: 'normal', maxWidth: '300px' }}>
                                            {t.description}
                                        </td>
                                        <td className="dim">{t.columns}</td>
                                        <td className="amber">{t.rowCount.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </>
    );
}

// ── Main Export ───────────────────────────────────────────────────
export default function AdminDashboard() {
    const [password, setPassword] = useState<string | null>(null);

    return (
        <div className="ad-root">
            {!password && <LockScreen onUnlock={setPassword} />}
            {password && (
                <div className="ad-wrap">
                    <Dashboard password={password} />
                </div>
            )}
        </div>
    );
}
