'use client';

import React, { useState } from 'react';

interface Props {
  onSubmit: (code: string, name?: string) => void;
  loading: boolean;
  error: string;
}

export default function AccessCodeGate({ onSubmit, loading, error }: Props) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const submit = () => code.trim() && onSubmit(code.trim(), name.trim() || undefined);
  return (
    <div className="ana-coach-gate">
      <div className="ana-coach-gate-card">
        <h1 className="ana-coach-gate-title">
          Ana AI <span className="ana-coach-accent">Coach</span>
        </h1>
        <p className="ana-coach-gate-sub">
          Your 24/7 coach. Enter your access code to begin a session.
        </p>
        <input
          className="ana-coach-gate-input"
          placeholder="ANA-XXXX-XXXX-XXXX"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          autoFocus
        />
        <input
          className="ana-coach-gate-input"
          placeholder="Your first name (optional)"
          value={name}
          maxLength={60}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
        />
        {error && <div className="ana-coach-gate-error">{error}</div>}
        <button
          className="ana-coach-gate-btn"
          disabled={loading || !code.trim()}
          onClick={submit}
        >
          {loading ? 'Checking…' : 'Enter'}
        </button>
      </div>
    </div>
  );
}
