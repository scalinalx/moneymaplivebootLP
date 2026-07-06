'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { RefreshCw, Download } from 'lucide-react';
import CoachTranscripts from './CoachTranscripts';

interface CoachMemberRow {
  id: string;
  member_name: string;
  member_email: string | null;
  status: 'active' | 'revoked';
  notes: string | null;
  total_messages: number;
  total_conversations: number;
  tokens_in: number;
  tokens_out: number;
  tokens_total: number;
  cost_in: number;
  cost_out: number;
  cost_total: number;
  created_at: string;
  revoked_at: string | null;
  last_used_at: string | null;
}

function fmtDate(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' });
}

function fmtTok(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

function fmtUsd(n: number) {
  if (n > 0 && n < 0.01) return '<$0.01';
  return `$${n.toFixed(2)}`;
}

// "in / out / total" stacked cell.
function SplitCell({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <div style={{ lineHeight: 1.35, fontVariantNumeric: 'tabular-nums' }}>
      <div>{a} <span style={{ color: 'var(--text-mid)', fontSize: 10 }}>in</span></div>
      <div>{b} <span style={{ color: 'var(--text-mid)', fontSize: 10 }}>out</span></div>
      <div style={{ fontWeight: 700 }}>{c}</div>
    </div>
  );
}

// VIP Accelerator member management for the Ana AI Coach. Create members (code
// shown once), revoke/reactivate, and see per-member usage counters.
export default function CoachMembersPanel({ password }: { password: string }) {
  const [members, setMembers] = useState<CoachMemberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [creating, setCreating] = useState(false);
  const [freshCode, setFreshCode] = useState<{ name: string; code: string } | null>(null);
  const [error, setError] = useState('');
  const [viewing, setViewing] = useState<{ id: string; name: string } | null>(null);
  const [pricing, setPricing] = useState<{ in_per_1m: number; out_per_1m: number } | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  // Export controls
  const [expMember, setExpMember] = useState('');     // '' = all members
  const [expRange, setExpRange] = useState('all');    // all | 1 | 3 | 5 | 7 | custom
  const [expStart, setExpStart] = useState('');
  const [expEnd, setExpEnd] = useState('');
  const [exporting, setExporting] = useState(false);

  const authHeaders = { 'Content-Type': 'application/json', Authorization: `Bearer ${password}` };

  const doExport = async () => {
    setExporting(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (expMember) params.set('memberId', expMember);
      if (expRange === 'custom') {
        if (expStart) params.set('startDate', expStart);
        if (expEnd) params.set('endDate', expEnd);
      } else if (expRange !== 'all') {
        params.set('days', expRange);
      }
      const res = await fetch(`/api/admidash/ana-coach/export?${params.toString()}`, {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!res.ok) { setError('Export failed'); return; }
      const json = await res.json();
      const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const who = expMember ? (members.find((m) => m.id === expMember)?.member_name || 'member').replace(/\W+/g, '-') : 'all';
      const when = expRange === 'all' ? 'all-time' : expRange === 'custom' ? `${expStart || 'start'}_${expEnd || 'end'}` : `last-${expRange}d`;
      a.href = url;
      a.download = `ana-coach-transcripts_${who}_${when}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError('Export failed');
    } finally {
      setExporting(false);
    }
  };

  // silent = refresh in place (button spinner) without blanking the table.
  const load = useCallback(async (silent = false) => {
    if (silent) setRefreshing(true); else setLoading(true);
    try {
      const res = await fetch('/api/admidash/ana-coach/members', { headers: { Authorization: `Bearer ${password}` } });
      const json = await res.json();
      setMembers(json.members ?? []);
      setPricing(json.pricing ?? null);
    } catch {
      setError('Failed to load members');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [password]);

  useEffect(() => { load(); }, [load]);

  const create = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    setError('');
    try {
      const res = await fetch('/api/admidash/ana-coach/members', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ memberName: newName.trim(), memberEmail: newEmail.trim() || undefined }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error || 'Failed'); return; }
      setFreshCode({ name: json.member.member_name, code: json.code });
      setNewName('');
      setNewEmail('');
      await load();
    } finally {
      setCreating(false);
    }
  };

  const toggleStatus = async (m: CoachMemberRow) => {
    const next = m.status === 'active' ? 'revoked' : 'active';
    await fetch(`/api/admidash/ana-coach/members/${m.id}`, {
      method: 'PATCH',
      headers: authHeaders,
      body: JSON.stringify({ status: next }),
    });
    await load();
  };

  const regenerate = async (m: CoachMemberRow) => {
    if (!window.confirm(`Issue a NEW code for ${m.member_name}? Their old code stops working immediately. Their coaching history is kept.`)) return;
    setError('');
    const res = await fetch(`/api/admidash/ana-coach/members/${m.id}`, {
      method: 'PATCH',
      headers: authHeaders,
      body: JSON.stringify({ regenerateCode: true }),
    });
    const json = await res.json();
    if (!res.ok) { setError(json.error || 'Failed to regenerate'); return; }
    setFreshCode({ name: m.member_name, code: json.code });
    await load();
  };

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
        <h3 style={{ margin: 0 }}>Ana AI Coach — VIP Members</h3>
        <button className="ad-btn" onClick={() => load(true)} disabled={refreshing || loading}
          title="Reload coach data (members, usage, cost) without a full page refresh">
          <RefreshCw size={13} style={{ verticalAlign: '-2px', marginRight: 4, animation: refreshing ? 'spin 1s linear infinite' : undefined }} />
          {refreshing ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
      {pricing && (
        <div style={{ fontSize: 11, color: 'var(--text-mid)', marginBottom: 12 }}>
          Tokens &amp; cost shown as <b>input / output / total</b>. Cost is an estimate at
          ${pricing.in_per_1m.toFixed(2)}/1M in, ${pricing.out_per_1m.toFixed(2)}/1M out
          (set via <code>ANA_COACH_PRICE_IN_PER_1M</code> / <code>_OUT_PER_1M</code>).
        </div>
      )}

      {/* Transcript export */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 14, padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700 }}>Export transcripts:</span>
        <select className="ad-select" value={expMember} onChange={(e) => setExpMember(e.target.value)}>
          <option value="">All members</option>
          {members.map((m) => <option key={m.id} value={m.id}>{m.member_name}</option>)}
        </select>
        <select className="ad-select" value={expRange} onChange={(e) => setExpRange(e.target.value)}>
          <option value="all">All time</option>
          <option value="1">Last 1 day</option>
          <option value="3">Last 3 days</option>
          <option value="5">Last 5 days</option>
          <option value="7">Last 7 days</option>
          <option value="custom">Custom range…</option>
        </select>
        {expRange === 'custom' && (
          <>
            <input type="date" className="ad-select" value={expStart} onChange={(e) => setExpStart(e.target.value)} title="Start date" />
            <span style={{ color: 'var(--text-mid)' }}>→</span>
            <input type="date" className="ad-select" value={expEnd} onChange={(e) => setExpEnd(e.target.value)} title="End date" />
          </>
        )}
        <button className="ad-btn amber" onClick={doExport} disabled={exporting}>
          <Download size={13} style={{ verticalAlign: '-2px', marginRight: 4 }} />
          {exporting ? 'Exporting…' : 'Download JSON'}
        </button>
      </div>

      {/* Create */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' }}>
        <input className="ad-select" placeholder="Member name" value={newName}
          onChange={(e) => setNewName(e.target.value)} style={{ minWidth: 180 }} />
        <input className="ad-select" placeholder="Email (optional)" value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)} style={{ minWidth: 200 }} />
        <button className="ad-btn amber" onClick={create} disabled={creating || !newName.trim()}>
          {creating ? 'Creating…' : 'Create member + code'}
        </button>
      </div>

      {error && <div style={{ color: '#f87171', marginBottom: 12 }}>{error}</div>}

      {/* Fresh code — shown ONCE */}
      {freshCode && (
        <div style={{ border: '1px solid #f59e0b', borderRadius: 8, padding: 12, marginBottom: 16, background: 'rgba(245,158,11,0.08)' }}>
          <div style={{ fontSize: 12, color: 'var(--text-mid)', marginBottom: 4 }}>
            Access code for <b>{freshCode.name}</b> — copy it now, it will not be shown again:
          </div>
          <code style={{ fontSize: 18, letterSpacing: 1, userSelect: 'all' }}>{freshCode.code}</code>
          <button className="ad-btn" style={{ marginLeft: 12 }} onClick={() => setFreshCode(null)}>Dismiss</button>
        </div>
      )}

      {/* Roster */}
      {loading ? (
        <div>Loading…</div>
      ) : (
        <table className="ad-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Status</th><th>Msgs</th><th>Sessions</th>
              <th>Tokens</th><th>Est. cost</th>
              <th>Last used</th><th>Created</th><th></th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} style={{ opacity: m.status === 'revoked' ? 0.5 : 1 }}>
                <td>{m.member_name}</td>
                <td>{m.member_email || '—'}</td>
                <td>
                  <span style={{ color: m.status === 'active' ? '#34d399' : '#f87171' }}>{m.status}</span>
                </td>
                <td>{m.total_messages}</td>
                <td>{m.total_conversations}</td>
                <td><SplitCell a={fmtTok(m.tokens_in)} b={fmtTok(m.tokens_out)} c={fmtTok(m.tokens_total)} /></td>
                <td><SplitCell a={fmtUsd(m.cost_in)} b={fmtUsd(m.cost_out)} c={fmtUsd(m.cost_total)} /></td>
                <td>{fmtDate(m.last_used_at)}</td>
                <td>{fmtDate(m.created_at)}</td>
                <td style={{ display: 'flex', gap: 6 }}>
                  <button className="ad-btn" onClick={() => setViewing({ id: m.id, name: m.member_name })}>
                    Transcripts
                  </button>
                  <button className="ad-btn" onClick={() => regenerate(m)} title="Issue a new code (keeps their history)">
                    New code
                  </button>
                  <button className="ad-btn" onClick={() => toggleStatus(m)}>
                    {m.status === 'active' ? 'Revoke' : 'Reactivate'}
                  </button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr><td colSpan={10} style={{ textAlign: 'center', color: 'var(--text-mid)' }}>No members yet.</td></tr>
            )}
          </tbody>
        </table>
      )}

      {viewing && (
        <CoachTranscripts
          password={password}
          memberId={viewing.id}
          memberName={viewing.name}
          onClose={() => setViewing(null)}
        />
      )}
    </div>
  );
}
