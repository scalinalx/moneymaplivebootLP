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
    name: string; revenue: number; count: number; leadCount: number;
}
interface LeadRow {
    id: string; name: string; email: string;
    product: string; date: string; source: string;
    debugId: string;
}
interface AbandonedCart {
    id: string; email: string; name: string; product: string; date: string; reason: string; source: string;
}
interface BestCustomer {
    email: string; name: string; totalSpent: number; products: string[]; lastPurchase: string; productCount: number;
}
interface DatabaseTable {
    name: string;
    description: string;
    columns: number;
    rowCount: number | string;
}
interface AbandonmentReportItem {
    name: string; count: number; potentialRevenue: number;
}
interface KitTag {
    id: string | number; name: string;
}
interface Metrics {
    totalRevenue: number;
    totalLeads: number;
    productBreakdown: ProductBreakdown[];
    recentSales: Sale[];
    recentLeads: LeadRow[];
    abandonedCarts: AbandonedCart[];
    abandonmentReport: AbandonmentReportItem[];
    bestCustomers: BestCustomer[];
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

// ── Loading Overlay ──────────────────────────────────────────────
function LoadingOverlay() {
    return (
        <div className="ad-overlay">
            <div className="ad-overlay-card">
                <div className="ad-spinner" style={{ width: '40px', height: '40px', borderWidth: '3px', margin: '0 auto' }} />
                <h2 className="ad-overlay-title">Synchronizing Data</h2>
                <p className="ad-overlay-sub">Fetching latest business metrics…</p>
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
    const [activeTab, setActiveTab] = useState<'sales' | 'leads' | 'databases' | 'abandoned' | 'best'>('sales');
    const [range, setRange] = useState('last30d');
    const [limit, setLimit] = useState(50);
    const [customStart, setCustomStart] = useState('');
    const [customEnd, setCustomEnd] = useState('');
    const [abandonmentProductFilter, setAbandonmentProductFilter] = useState<string | null>(null);
    const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
    const [syncingToKit, setSyncingToKit] = useState(false);
    const [kitTags, setKitTags] = useState<KitTag[]>([]);
    const [selectedTagIds, setSelectedTagIds] = useState<Set<string | number>>(new Set());
    const [newTagName, setNewTagName] = useState('');
    const [creatingTag, setCreatingTag] = useState(false);

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

    const loadKitTags = useCallback(async () => {
        try {
            const res = await fetch('/api/admidash/kit/tags', {
                headers: { 'Authorization': `Bearer ${password}` }
            });
            const data = await res.json();
            if (data.tags) setKitTags(data.tags);
        } catch (e) {
            console.error('Failed to load Kit tags:', e);
        }
    }, [password]);

    useEffect(() => {
        load();
        loadKitTags();
    }, [load, loadKitTags]);

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

    const exportSalesCSV = () => {
        if (!m?.recentSales.length) return;
        const headers = ["Date", "Amount", "Currency", "Product", "Customer", "Email", "Source", "ID"];
        const rows = m.recentSales.map(s => [
            fmtDate(s.date),
            s.amount / 100,
            s.currency,
            (s.product || '').replace(/,/g, ''),
            (s.customerName || '').replace(/,/g, ''),
            s.email,
            s.source,
            s.debugId
        ]);
        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `sales_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportAbandonedCSV = () => {
        if (!m?.abandonedCarts.length) return;
        const headers = ["Date", "Name", "Email", "Product", "Reason", "Source"];
        const rows = m.abandonedCarts.map(a => [
            fmtDate(a.date),
            (a.name || '').replace(/,/g, ''),
            a.email,
            (a.product || '').replace(/,/g, ''),
            a.reason,
            a.source
        ]);
        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `abandoned_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (error && !m) {
        return <div className="ad-error" style={{ margin: '40px' }}>⚠ {error}</div>;
    }

    if (!m) {
        return <LoadingOverlay />;
    }

    const toggleEmail = (email: string) => {
        const next = new Set(selectedEmails);
        if (next.has(email)) next.delete(email);
        else next.add(email);
        setSelectedEmails(next);
    };

    const toggleTag = (id: string | number) => {
        const next = new Set(selectedTagIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedTagIds(next);
    };

    const createTag = async () => {
        if (!newTagName.trim()) return;
        setCreatingTag(true);
        try {
            const res = await fetch('/api/admidash/kit/tags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${password}`
                },
                body: JSON.stringify({ name: newTagName.trim() })
            });
            const data = await res.json();
            if (data.success) {
                setKitTags(prev => [...prev, data.tag]);
                const next = new Set(selectedTagIds);
                next.add(data.tag.id);
                setSelectedTagIds(next);
                setNewTagName('');
            } else {
                alert(`Failed to create tag: ${data.error}`);
            }
        } catch (e: any) {
            alert(`Error: ${e.message}`);
        } finally {
            setCreatingTag(false);
        }
    };

    const syncToKit = async () => {
        const tagIds = Array.from(selectedTagIds);
        if (!selectedEmails.size || !m) return;
        setSyncingToKit(true);
        try {
            // Find full user objects for selected emails
            const usersToSync = Array.from(selectedEmails).map(email => {
                const sale = m.recentSales.find(s => s.email === email);
                const lead = m.recentLeads.find(l => l.email === email);
                const abandoned = m.abandonedCarts.find(a => a.email === email);
                const best = m.bestCustomers.find(b => b.email === email);
                return {
                    email,
                    name: best?.name || sale?.customerName || lead?.name || abandoned?.name || 'Customer',
                    source: best ? 'Customer' : sale ? 'Customer' : lead ? 'Lead' : 'Abandoned'
                };
            });

            const res = await fetch('/api/admidash/kit/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${password}`
                },
                body: JSON.stringify({ users: usersToSync, tagIds })
            });
            const result = await res.json();
            if (result.success) {
                alert(`Successfully synced ${result.synced} users to Kit!`);
                setSelectedEmails(new Set());
            } else {
                alert(`Sync failed: ${result.error}`);
            }
        } catch (e: any) {
            alert(`Error: ${e.message}`);
        } finally {
            setSyncingToKit(false);
        }
    };

    const metrics = m;

    return (
        <div className="ad-wrap">
            {loading && <LoadingOverlay />}
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
                        <span className="ad-section-title">Revenue by Product ({range})</span>
                        <div className="ad-section-line" />
                    </div>
                    <div className="ad-product-grid">
                        {metrics.productBreakdown.map(p => {
                            const conv = p.leadCount > 0 ? (p.count / (p.count + p.leadCount) * 100).toFixed(1) : '0.0';
                            return (
                                <div key={p.name} className="ad-product-card">
                                    <div className="ad-product-name">{p.name}</div>
                                    <div className="ad-product-rev">{fmt(p.revenue)}</div>
                                    <div className="ad-product-meta" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span>{p.count} sale{p.count !== 1 ? 's' : ''}</span>
                                        <span style={{ color: 'var(--amber)', fontSize: '10px' }}>CVR: {conv}%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* Abandonment Report */}
            {metrics.abandonmentReport && metrics.abandonmentReport.length > 0 && (
                <>
                    <div className="ad-section-head">
                        <span className="ad-section-title">Abandonment Analysis ({range})</span>
                        <div className="ad-section-line" />
                    </div>
                    <div className="ad-report-grid">
                        {metrics.abandonmentReport.map(r => (
                            <div
                                key={r.name}
                                className={`ad-report-card ${abandonmentProductFilter === r.name ? 'active' : ''}`}
                                onClick={() => setAbandonmentProductFilter(abandonmentProductFilter === r.name ? null : r.name)}
                                style={{ cursor: 'pointer', border: abandonmentProductFilter === r.name ? '1px solid var(--amber)' : '' }}
                            >
                                <div className="ad-report-name">{r.name}</div>
                                <div className="ad-report-stats">
                                    <div className="ad-report-count">{r.count}</div>
                                    <div className="ad-report-rev">Potential: {fmt(r.potentialRevenue)}</div>
                                </div>
                                <div style={{ fontSize: '9px', color: 'var(--text-dim)', marginTop: '8px' }}>
                                    {abandonmentProductFilter === r.name ? 'Showing only this product' : 'Click to filter table ↓'}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Tabs Navigation */}
            <div className="ad-tabs" style={{ marginTop: 40 }}>
                <button className={`ad-tab ${activeTab === 'sales' ? 'active' : ''}`} onClick={() => setActiveTab('sales')}>
                    Recent Sales <span className="ad-tab-count">({metrics.recentSales.length})</span>
                </button>
                <button className={`ad-tab ${activeTab === 'leads' ? 'active' : ''}`} onClick={() => setActiveTab('leads')}>
                    All Leads <span className="ad-tab-count">({metrics.totalLeads})</span>
                </button>
                <button className={`ad-tab ${activeTab === 'abandoned' ? 'active' : ''}`} onClick={() => setActiveTab('abandoned')}>
                    Abandoned Carts <span className="ad-tab-count">({metrics.abandonedCarts.length})</span>
                </button>
                <button className={`ad-tab ${activeTab === 'best' ? 'active' : ''}`} onClick={() => setActiveTab('best')}>
                    Best Customers <span className="ad-tab-count">({metrics.bestCustomers.length})</span>
                </button>
                <button className={`ad-tab ${activeTab === 'databases' ? 'active' : ''}`} onClick={() => setActiveTab('databases')}>
                    Databases
                </button>
            </div>

            {selectedEmails.size > 0 && (
                <div className="ad-action-bar" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="ad-action-info">
                            <b>{selectedEmails.size}</b> users selected
                        </div>
                        <div className="ad-action-btns" style={{ gap: '8px' }}>
                            <button className="ad-btn amber" onClick={syncToKit} disabled={syncingToKit || selectedTagIds.size === 0}>
                                {syncingToKit ? 'Syncing...' : 'Sync to Kit'}
                            </button>
                            <button className="ad-btn" onClick={() => {
                                setSelectedEmails(new Set());
                                setSelectedTagIds(new Set());
                            }}>Cancel</button>
                        </div>
                    </div>

                    <div className="ad-tag-section" style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                            <label style={{ fontSize: '11px', color: 'var(--text-mid)', fontWeight: 'bold' }}>SELECT TAGS:</label>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <input
                                    type="text"
                                    placeholder="New tag..."
                                    className="ad-select"
                                    style={{ width: '100px', height: '24px', fontSize: '10px' }}
                                    value={newTagName}
                                    onChange={e => setNewTagName(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && createTag()}
                                />
                                <button className="ad-btn" style={{ padding: '2px 8px', fontSize: '10px' }} onClick={createTag} disabled={creatingTag}>
                                    {creatingTag ? '...' : '+'}
                                </button>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxHeight: '100px', overflowY: 'auto' }}>
                            {kitTags.length === 0 && <span style={{ fontSize: '10px', color: 'var(--text-dim)' }}>No tags found in Kit. Create one above!</span>}
                            {kitTags.map(t => (
                                <div
                                    key={t.id}
                                    onClick={() => toggleTag(t.id)}
                                    style={{
                                        fontSize: '10px',
                                        padding: '4px 10px',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        background: selectedTagIds.has(t.id) ? 'var(--amber)' : 'var(--bg3)',
                                        color: selectedTagIds.has(t.id) ? '#000' : 'var(--text-mid)',
                                        border: '1px solid ' + (selectedTagIds.has(t.id) ? 'var(--amber)' : 'var(--border)'),
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {t.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Tab Content */}
            <div className="ad-table-wrap">
                {activeTab === 'sales' && (
                    <>
                        <div style={{ padding: '12px 16px', background: 'var(--bg3)', borderBottom: '1px solid var(--border)', fontSize: '11px', color: 'var(--text-mid)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>📝 <b>Sales Logic</b>: Showing all Stripe charges &gt; $0. Cross-referenced with DB for name/product context.</div>
                            <button onClick={exportSalesCSV} className="ad-btn" style={{ padding: '4px 8px', fontSize: '10px', background: 'var(--bg4)' }}>Export CSV</button>
                        </div>
                        <table className="ad-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '40px' }}>
                                        <input type="checkbox" onChange={(e) => {
                                            if (e.target.checked) setSelectedEmails(new Set(metrics.recentSales.map(s => s.email)));
                                            else setSelectedEmails(new Set());
                                        }} />
                                    </th>
                                    <th>Date</th><th>Amount</th><th>Product</th><th>Customer / Email</th><th>Source / Audit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {metrics.recentSales.map(s => (
                                    <tr key={s.id} className={selectedEmails.has(s.email) ? 'selected' : ''}>
                                        <td>
                                            <input type="checkbox" checked={selectedEmails.has(s.email)} onChange={() => toggleEmail(s.email)} />
                                        </td>
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
                                <tr>
                                    <th style={{ width: '40px' }}>
                                        <input type="checkbox" onChange={(e) => {
                                            if (e.target.checked) setSelectedEmails(new Set(metrics.recentLeads.map(l => l.email)));
                                            else setSelectedEmails(new Set());
                                        }} />
                                    </th>
                                    <th>Date</th><th>Name</th><th>Email</th><th>Product</th><th>Source / Audit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {metrics.recentLeads.map(l => (
                                    <tr key={l.id + l.source} className={selectedEmails.has(l.email) ? 'selected' : ''}>
                                        <td>
                                            <input type="checkbox" checked={selectedEmails.has(l.email)} onChange={() => toggleEmail(l.email)} />
                                        </td>
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
                        <div style={{ padding: '12px 16px', background: 'var(--bg3)', borderBottom: '1px solid var(--border)', fontSize: '11px', color: 'var(--text-mid)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                🛒 <b>Abandoned Carts Logic</b>: Tracking $0 sessions and started checkouts with no sale.
                                {abandonmentProductFilter && (
                                    <span style={{ marginLeft: '12px', background: 'var(--amber-dim)', color: 'var(--amber)', padding: '2px 8px', borderRadius: '4px' }}>
                                        Filtering by: {abandonmentProductFilter}
                                        <button onClick={() => setAbandonmentProductFilter(null)} style={{ marginLeft: '6px', opacity: 0.6 }}>×</button>
                                    </span>
                                )}
                            </div>
                            <button onClick={exportAbandonedCSV} className="ad-btn" style={{ padding: '4px 8px', fontSize: '10px', background: 'var(--bg4)' }}>Export CSV</button>
                        </div>
                        <table className="ad-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '40px' }}>
                                        <input type="checkbox" onChange={(e) => {
                                            const filtered = metrics.abandonedCarts.filter(a => !abandonmentProductFilter || a.product === abandonmentProductFilter);
                                            if (e.target.checked) setSelectedEmails(new Set(filtered.map(a => a.email)));
                                            else setSelectedEmails(new Set());
                                        }} />
                                    </th>
                                    <th>Date</th><th>Name / Email</th><th>Product</th><th>Reason</th><th>Source</th>
                                </tr>
                            </thead>
                            <tbody>
                                {metrics.abandonedCarts
                                    .filter(a => !abandonmentProductFilter || a.product === abandonmentProductFilter)
                                    .map(a => (
                                        <tr key={a.id} className={selectedEmails.has(a.email) ? 'selected' : ''}>
                                            <td>
                                                <input type="checkbox" checked={selectedEmails.has(a.email)} onChange={() => toggleEmail(a.email)} />
                                            </td>
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

                {activeTab === 'best' && (
                    <>
                        <div style={{ padding: '12px 16px', background: 'var(--bg3)', borderBottom: '1px solid var(--border)', fontSize: '11px', color: 'var(--text-mid)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>💎 <b>Best Customers Logic</b>: Ranked by total spend and product variety.</div>
                        </div>
                        <table className="ad-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '40px' }}>
                                        <input type="checkbox" onChange={(e) => {
                                            if (e.target.checked) setSelectedEmails(new Set(metrics.bestCustomers.map(b => b.email)));
                                            else setSelectedEmails(new Set());
                                        }} />
                                    </th>
                                    <th>Customer</th><th>Total Spent</th><th>Products</th><th>Last Purchase</th>
                                </tr>
                            </thead>
                            <tbody>
                                {metrics.bestCustomers.map(b => (
                                    <tr key={b.email} className={selectedEmails.has(b.email) ? 'selected' : ''}>
                                        <td>
                                            <input type="checkbox" checked={selectedEmails.has(b.email)} onChange={() => toggleEmail(b.email)} />
                                        </td>
                                        <td>
                                            <div className="primary">{b.name}</div>
                                            <div className="dim" style={{ fontSize: '10px' }}>{b.email}</div>
                                        </td>
                                        <td className="amber" style={{ fontSize: '16px', fontWeight: 'bold' }}>{fmt(b.totalSpent)}</td>
                                        <td>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                                {b.products.map(p => (
                                                    <span key={p} style={{ fontSize: '9px', padding: '2px 4px', background: 'var(--bg4)', borderRadius: '3px', color: 'var(--text-mid)' }}>{p}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="dim">{fmtDate(b.lastPurchase)}</td>
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
