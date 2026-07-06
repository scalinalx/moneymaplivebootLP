'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CoachEvent } from '@/lib/ana-coach/events';
import type { SessionPhase } from '@/lib/ana-coach/types';

export interface UIAttachment { id: string; name: string; kind: 'file' | 'url' }
export interface UIMessage {
  role: 'user' | 'coach';
  text: string;
  attachments?: UIAttachment[];
  streaming?: boolean;
}

export type ChatStatus = 'loading' | 'gate' | 'authing' | 'idle' | 'sending' | 'streaming' | 'limit' | 'error';

const TOKEN_KEY = 'ana_coach_token';

const PANEL_LABELS: Record<string, string> = {
  triage: 'Ana is reading your message…',
  copy_critic: 'Ana is reviewing your copy…',
  strategy_coach: 'Ana is thinking through your offer…',
  growth_auditor: 'Ana is auditing your growth setup…',
  product_matcher: 'Ana is checking her resource library…',
  synthesis: 'Ana is writing back…',
};

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

// Fire a first-party analytics event (counts/slugs only — never message content,
// filenames, or URLs).
function track(type: string, fields?: Record<string, unknown>) {
  try {
    (window as unknown as { __track?: { event?: (t: string, f?: unknown) => void } }).__track?.event?.(type, fields);
  } catch { /* analytics is best-effort */ }
}

const PRODUCT_MARKER_RE = /\[\[product:([a-z0-9-]+)\]\]/gi;

export function useCoachChat() {
  // Start from a stable value the SERVER and CLIENT both render (no sessionStorage
  // read during render) — otherwise SSR shows the gate while a logged-in client
  // shows the shell, causing a hydration mismatch. Auth is resolved after mount.
  const [status, setStatus] = useState<ChatStatus>('loading');
  const [memberName, setMemberName] = useState('');
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [panelLabel, setPanelLabel] = useState('');
  const [pending, setPending] = useState<UIAttachment[]>([]);
  const [messageCount, setMessageCount] = useState(0);
  const [messageLimit, setMessageLimit] = useState(30);
  const [phase, setPhase] = useState<SessionPhase>('INTAKE');
  const [error, setError] = useState('');
  const convId = useRef<string | null>(null);

  const authHeaders = useCallback((): HeadersInit => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
  }, []);

  const startConversation = useCallback(async () => {
    setError('');
    const res = await fetch('/api/ana-coach/conversation', { method: 'POST', headers: authHeaders() });
    if (res.status === 401) { sessionStorage.removeItem(TOKEN_KEY); setStatus('gate'); return; }
    const json = await res.json();
    if (!res.ok) { setError(json.error || 'Could not start a session'); setStatus('error'); return; }
    convId.current = json.conversationId;
    setMessageLimit(json.messageLimit);
    setMessageCount(0);
    setPhase(json.sessionPhase || 'INTAKE');
    setMessages([]);
    setPending([]);
    setStatus('idle');
    track('coach_conversation_started');
  }, [authHeaders]);

  // After mount (client only), resolve auth: a stored token → start a fresh
  // session; otherwise show the gate. Runs once, never during SSR. The ref guard
  // prevents React's dev double-invoke from starting two sessions.
  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    if (getToken()) startConversation();
    else setStatus('gate');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    convId.current = null;
    setMessages([]);
    setPending([]);
    setPanelLabel('');
    setError('');
    setMemberName('');
    setStatus('gate');
  }, []);

  const authenticate = useCallback(async (code: string) => {
    setStatus('authing');
    setError('');
    try {
      const res = await fetch('/api/ana-coach/auth', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error || 'Invalid code'); setStatus('gate'); return; }
      sessionStorage.setItem(TOKEN_KEY, json.token);
      setMemberName(json.memberName || '');
      if (json.quotas?.messageLimit) setMessageLimit(json.quotas.messageLimit);
      await startConversation();
    } catch {
      setError('Something went wrong. Try again.');
      setStatus('gate');
    }
  }, [startConversation]);

  const uploadFile = useCallback(async (file: File) => {
    if (!convId.current) return;
    setError('');
    const fd = new FormData();
    fd.append('conversationId', convId.current);
    fd.append('file', file);
    const token = getToken();
    const res = await fetch('/api/ana-coach/attachment', {
      method: 'POST', headers: token ? { Authorization: `Bearer ${token}` } : undefined, body: fd,
    });
    const json = await res.json();
    if (!res.ok) { setError(json.error || 'Upload failed'); return; }
    setPending((p) => [...p, { id: json.attachmentId, name: json.name, kind: 'file' }]);
    track('coach_file_uploaded');
  }, []);

  const addUrl = useCallback(async (url: string) => {
    if (!convId.current) return;
    setError('');
    const res = await fetch('/api/ana-coach/url', {
      method: 'POST', headers: authHeaders(), body: JSON.stringify({ conversationId: convId.current, url }),
    });
    const json = await res.json();
    if (!res.ok) { setError(json.error || 'Could not fetch that link'); return; }
    setPending((p) => [...p, { id: json.attachmentId, name: json.name, kind: 'url' }]);
    track('coach_url_analyzed');
  }, [authHeaders]);

  const sendMessage = useCallback(async (text: string) => {
    if (!convId.current || status === 'streaming' || status === 'sending') return;
    const attached = pending;
    setPending([]);
    setMessages((m) => [...m, { role: 'user', text, attachments: attached.length ? attached : undefined }]);
    setStatus('sending');
    setPanelLabel(PANEL_LABELS.triage);
    setError('');
    track('coach_message_sent', { meta: { phase } });

    try {
      const res = await fetch('/api/ana-coach/message', {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({ conversationId: convId.current, message: text }),
      });

      // Pre-stream failures arrive as plain JSON.
      const ctype = res.headers.get('content-type') || '';
      if (!res.ok || ctype.includes('application/json')) {
        if (res.status === 401) { sessionStorage.removeItem(TOKEN_KEY); setStatus('gate'); return; }
        const json = await res.json().catch(() => ({}));
        if (json.code === 'conversation_cap') { setStatus('limit'); return; }
        setError(json.error || 'Something went wrong'); setStatus('idle'); return;
      }

      // Stream SSE.
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let coachText = '';
      let sawTerminal = false; // saw a done/error event
      setStatus('streaming');

      const handle = (ev: CoachEvent) => {
        if (ev.type === 'status') {
          if (ev.stage === 'panel') {
            setPanelLabel(PANEL_LABELS[ev.specialists[0]] || PANEL_LABELS.synthesis);
            track('coach_panel_turn', { meta: { specialists: ev.specialists.length } });
          }
          else if (ev.stage === 'synthesis') setPanelLabel(PANEL_LABELS.synthesis);
          else if (ev.stage === 'triage') setPanelLabel(PANEL_LABELS.triage);
        } else if (ev.type === 'delta') {
          coachText += ev.text;
          // Pure updater: the streaming coach bubble is always the last message
          // once it exists. coachText is the full accumulated reply.
          const fullText = coachText;
          setMessages((m) => {
            const last = m[m.length - 1];
            if (last && last.role === 'coach' && last.streaming) {
              return [...m.slice(0, -1), { ...last, text: fullText }];
            }
            return [...m, { role: 'coach', text: fullText, streaming: true }];
          });
        } else if (ev.type === 'done') {
          sawTerminal = true;
          setMessageCount(ev.message_count);
          setMessageLimit(ev.message_limit);
          setPhase(ev.session_phase);
          setMessages((m) => m.map((msg) => (msg.streaming ? { ...msg, streaming: false } : msg)));
          setPanelLabel('');
          const hitLimit = ev.message_count + 2 > ev.message_limit;
          setStatus(hitLimit ? 'limit' : 'idle');
          if (hitLimit) track('coach_limit_reached');
          // Fire a recommendation event per product marker (slug only).
          let mm: RegExpExecArray | null;
          PRODUCT_MARKER_RE.lastIndex = 0;
          const seen = new Set<string>();
          while ((mm = PRODUCT_MARKER_RE.exec(coachText))) {
            const slug = mm[1].toLowerCase();
            if (!seen.has(slug)) { seen.add(slug); track('coach_product_recommended', { event_name: slug }); }
          }
        } else if (ev.type === 'error') {
          sawTerminal = true;
          setError('Ana had trouble responding. Please send that again.');
          setStatus('idle');
          setPanelLabel('');
          setMessages((m) => m.filter((msg) => !msg.streaming));
        }
      };

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split('\n\n');
        buffer = chunks.pop() || '';
        for (const chunk of chunks) {
          const line = chunk.split('\n').find((l) => l.startsWith('data:'));
          if (!line) continue;
          try { handle(JSON.parse(line.slice(5).trim())); } catch { /* ignore malformed */ }
        }
      }
      if (!sawTerminal) { setStatus('idle'); setPanelLabel(''); }
    } catch {
      setError('Connection lost. Please try again.');
      setStatus('idle');
      setPanelLabel('');
    }
  }, [authHeaders, pending, status, phase]);

  const removePending = useCallback((id: string) => setPending((p) => p.filter((a) => a.id !== id)), []);

  return {
    status, memberName, messages, panelLabel, pending, messageCount, messageLimit, phase, error,
    authenticate, startConversation, sendMessage, uploadFile, addUrl, removePending, logout,
  };
}
