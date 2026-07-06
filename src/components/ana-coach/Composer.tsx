'use client';

import React, { useRef, useState } from 'react';
import { Paperclip, Link2, Send, X } from 'lucide-react';
import type { UIAttachment } from './useCoachChat';

interface Props {
  disabled: boolean;
  pending: UIAttachment[];
  onSend: (text: string) => void;
  onUploadFile: (file: File) => void;
  onAddUrl: (url: string) => void;
  onRemovePending: (id: string) => void;
}

export default function Composer({ disabled, pending, onSend, onUploadFile, onAddUrl, onRemovePending }: Props) {
  const [text, setText] = useState('');
  const [urlOpen, setUrlOpen] = useState(false);
  const [url, setUrl] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    const t = text.trim();
    if (!t || disabled) return;
    onSend(t);
    setText('');
  };

  const submitUrl = () => {
    const u = url.trim();
    if (!u) return;
    onAddUrl(u);
    setUrl('');
    setUrlOpen(false);
  };

  return (
    <div className="ana-coach-composer">
      {pending.length > 0 && (
        <div className="ana-coach-pending">
          {pending.map((a) => (
            <span key={a.id} className="ana-coach-chip">
              {a.kind === 'url' ? '🔗' : '📄'} {a.name}
              <button className="ana-coach-chip-x" onClick={() => onRemovePending(a.id)} aria-label="Remove">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {urlOpen && (
        <div className="ana-coach-url-row">
          <input
            className="ana-coach-url-input"
            placeholder="Paste a link (your Substack, a competitor…)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submitUrl()}
            autoFocus
          />
          <button className="ana-coach-url-add" onClick={submitUrl}>Add</button>
        </div>
      )}

      <div className="ana-coach-input-row">
        <button className="ana-coach-icon-btn" onClick={() => fileRef.current?.click()} disabled={disabled} title="Attach a file">
          <Paperclip size={18} />
        </button>
        <button className="ana-coach-icon-btn" onClick={() => setUrlOpen((v) => !v)} disabled={disabled} title="Add a link">
          <Link2 size={18} />
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".txt,.md,.pdf,.docx"
          hidden
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onUploadFile(f); e.target.value = ''; }}
        />
        <textarea
          className="ana-coach-textarea"
          placeholder={disabled ? 'Ana is responding…' : 'Message Ana…'}
          value={text}
          rows={1}
          disabled={disabled}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } }}
        />
        <button className="ana-coach-send" onClick={submit} disabled={disabled || !text.trim()} aria-label="Send">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
