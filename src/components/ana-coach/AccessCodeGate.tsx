'use client';

import React, { useState } from 'react';

interface Props {
  onSubmit: (code: string) => void;
  loading: boolean;
  error: string;
}

export default function AccessCodeGate({ onSubmit, loading, error }: Props) {
  const [code, setCode] = useState('');
  return (
    <div className="ana-coach-gate">
      <div className="ana-coach-gate-card">
        <h1 className="ana-coach-gate-title">
          Ana AI <span className="ana-coach-accent">Coach</span>
        </h1>
        <p className="ana-coach-gate-sub">
          Your 24/7 coach, included with the VIP Accelerator. Enter your access code to begin a session.
        </p>
        <input
          className="ana-coach-gate-input"
          placeholder="ANA-XXXX-XXXX-XXXX"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && code.trim() && onSubmit(code.trim())}
          autoFocus
        />
        {error && <div className="ana-coach-gate-error">{error}</div>}
        <button
          className="ana-coach-gate-btn"
          disabled={loading || !code.trim()}
          onClick={() => onSubmit(code.trim())}
        >
          {loading ? 'Checking…' : 'Enter'}
        </button>
      </div>
    </div>
  );
}
