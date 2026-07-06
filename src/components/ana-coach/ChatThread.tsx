'use client';

import React, { useEffect, useRef } from 'react';
import CoachMessage from './CoachMessage';
import type { UIMessage } from './useCoachChat';

interface Props {
  messages: UIMessage[];
  panelLabel: string;
  memberName: string;
}

export default function ChatThread({ messages, panelLabel, memberName }: Props) {
  const endRef = useRef<HTMLDivElement>(null);
  const atBottom = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Stick to bottom unless the user has scrolled up.
  useEffect(() => {
    if (atBottom.current) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, panelLabel]);

  const onScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    atBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  };

  return (
    <div className="ana-coach-thread" ref={containerRef} onScroll={onScroll}>
      {messages.length === 0 && (
        <div className="ana-coach-welcome">
          <div className="ana-coach-welcome-title">
            {memberName ? `Welcome, ${memberName}.` : 'Welcome.'}
          </div>
          <div className="ana-coach-welcome-sub">
            Tell me what you&apos;re working on, and we&apos;ll run a coaching session together.
            You can paste your writing, upload a file, or drop a link for me to look at.
          </div>
        </div>
      )}
      {messages.map((m, i) => (
        <CoachMessage key={i} message={m} />
      ))}
      {panelLabel && (
        <div className="ana-coach-panel-status">
          <span className="ana-coach-panel-dots"><i /><i /><i /></span>
          {panelLabel}
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}
