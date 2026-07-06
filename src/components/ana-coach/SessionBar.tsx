'use client';

import React from 'react';
import { RotateCcw, LogOut } from 'lucide-react';
import type { SessionPhase } from '@/lib/ana-coach/types';

const PHASE_LABEL: Record<SessionPhase, string> = {
  INTAKE: 'Getting to know you',
  DIAGNOSIS: 'Diagnosing',
  COACHING: 'Coaching',
  WRAP_UP: 'Action plan',
  CLOSED: 'Session complete',
};

interface Props {
  memberName: string;
  phase: SessionPhase;
  messageCount: number;
  messageLimit: number;
  onReset: () => void;
  onLogout: () => void;
}

export default function SessionBar({ memberName, phase, messageCount, messageLimit, onReset, onLogout }: Props) {
  // messageCount counts both roles; show member turns used out of the cap.
  const used = Math.ceil(messageCount / 2);
  const total = Math.floor(messageLimit / 2);
  const near = messageCount >= messageLimit - 6;

  return (
    <div className="ana-coach-bar">
      <div className="ana-coach-bar-left">
        <span className="ana-coach-bar-title">Ana AI Coach</span>
        <span className="ana-coach-bar-phase">{PHASE_LABEL[phase]}</span>
      </div>
      <div className="ana-coach-bar-right">
        <span className={`ana-coach-bar-count ${near ? 'near' : ''}`}>{used} / {total}</span>
        <button className="ana-coach-bar-reset" onClick={onReset} title="Start a new session">
          <RotateCcw size={14} /> New session
        </button>
        <button className="ana-coach-bar-reset" onClick={onLogout} title="Log out">
          <LogOut size={14} /> Log out
        </button>
      </div>
    </div>
  );
}
