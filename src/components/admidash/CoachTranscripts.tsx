'use client';

import React, { useCallback, useEffect, useState } from 'react';

interface Conversation {
  id: string; status: string; session_phase: string; message_count: number; created_at: string; ended_at: string | null;
}
interface Message { id: number; role: string; content: string; created_at: string; }
interface SpecialistTrace { id: string; status: string; ms: number; notes?: string }
interface Trace {
  turn_index: number; phase_before: string; phase_after: string;
  triage: unknown; specialists: SpecialistTrace[] | null; synthesis: unknown; total_ms: number;
}

function fmt(iso: string) { return new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }); }

// Transcript + panel-trace review for one member. Expandable per conversation;
// each model turn shows the panel trace (which specialists ran, their notes).
export default function CoachTranscripts({ password, memberId, memberName, onClose }: {
  password: string; memberId: string; memberName: string; onClose: () => void;
}) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [openConv, setOpenConv] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [traces, setTraces] = useState<Trace[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTrace, setShowTrace] = useState<number | null>(null);

  const headers = { Authorization: `Bearer ${password}` };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(`/api/admidash/ana-coach/transcripts?memberId=${memberId}`, { headers });
      const json = await res.json();
      setConversations(json.conversations ?? []);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId]);

  const openConversation = useCallback(async (id: string) => {
    if (openConv === id) { setOpenConv(null); return; }
    setOpenConv(id);
    const res = await fetch(`/api/admidash/ana-coach/transcripts?conversationId=${id}`, { headers });
    const json = await res.json();
    setMessages(json.messages ?? []);
    setTraces(json.traces ?? []);
    setShowTrace(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openConv, password]);

  return (
    <div style={{ marginTop: 16, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <b>Transcripts — {memberName}</b>
        <button className="ad-btn" onClick={onClose}>Close</button>
      </div>

      {loading ? <div>Loading…</div> : conversations.length === 0 ? (
        <div style={{ color: 'var(--text-mid)' }}>No sessions yet.</div>
      ) : conversations.map((c) => (
        <div key={c.id} style={{ border: '1px solid var(--border)', borderRadius: 8, marginBottom: 8 }}>
          <button
            onClick={() => openConversation(c.id)}
            style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: 'inherit', padding: 10, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
          >
            <span>{fmt(c.created_at)} · {c.session_phase} · {Math.ceil(c.message_count / 2)} turns</span>
            <span>{openConv === c.id ? '▲' : '▼'}</span>
          </button>

          {openConv === c.id && (
            <div style={{ padding: '0 12px 12px' }}>
              {messages.map((m, idx) => {
                const trace = m.role === 'model' ? traces.find((t) => t.turn_index === Math.ceil((idx + 1) / 2)) : null;
                return (
                  <div key={m.id} style={{ margin: '8px 0' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-mid)', textTransform: 'uppercase' }}>{m.role === 'user' ? 'Member' : 'Ana'}</div>
                    <div style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>{m.content}</div>
                    {trace && (
                      <>
                        <button className="ad-btn" style={{ marginTop: 4, fontSize: 11 }}
                          onClick={() => setShowTrace(showTrace === trace.turn_index ? null : trace.turn_index)}>
                          {showTrace === trace.turn_index ? 'Hide' : 'Show'} panel trace
                          {trace.specialists?.length ? ` (${trace.specialists.map((s) => s.id).join(', ')})` : ' (no panel)'}
                        </button>
                        {showTrace === trace.turn_index && (
                          <pre style={{ fontSize: 11, background: 'rgba(0,0,0,0.25)', padding: 10, borderRadius: 6, overflow: 'auto', marginTop: 4 }}>
                            {`phase ${trace.phase_before} → ${trace.phase_after} · ${trace.total_ms}ms\n\n`}
                            {(trace.specialists ?? []).map((s) => `[${s.id} · ${s.status} · ${s.ms}ms]\n${s.notes || '(no notes)'}\n\n`).join('')}
                          </pre>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
