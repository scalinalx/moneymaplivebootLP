'use client';

import React from 'react';
import { useCoachChat } from './useCoachChat';
import AccessCodeGate from './AccessCodeGate';
import ChatThread from './ChatThread';
import Composer from './Composer';
import SessionBar from './SessionBar';

export default function CoachApp() {
  const chat = useCoachChat();

  // Stable first render (matches SSR) until the mount effect resolves auth.
  if (chat.status === 'loading') {
    return (
      <div className="ana-coach-root ana-coach-shell">
        <div className="ana-coach-thread" style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div className="ana-coach-panel-status"><span className="ana-coach-panel-dots"><i /><i /><i /></span> Loading…</div>
        </div>
      </div>
    );
  }

  if (chat.status === 'gate' || chat.status === 'authing') {
    return (
      <div className="ana-coach-root">
        <AccessCodeGate onSubmit={chat.authenticate} loading={chat.status === 'authing'} error={chat.error} />
      </div>
    );
  }

  const busy = chat.status === 'sending' || chat.status === 'streaming';
  const atLimit = chat.status === 'limit';

  return (
    <div className="ana-coach-root ana-coach-shell">
      <SessionBar
        memberName={chat.memberName}
        phase={chat.phase}
        messageCount={chat.messageCount}
        messageLimit={chat.messageLimit}
        onReset={chat.startConversation}
        onLogout={chat.logout}
      />

      <ChatThread messages={chat.messages} panelLabel={chat.panelLabel} memberName={chat.memberName} />

      {chat.error && (
        <div className="ana-coach-inline-error">{chat.error}</div>
      )}

      {atLimit ? (
        <div className="ana-coach-limit">
          <div className="ana-coach-limit-title">This session is complete.</div>
          <div className="ana-coach-limit-sub">You&apos;ve reached the message limit for this session.</div>
          <button className="ana-coach-limit-btn" onClick={chat.startConversation}>Start a new session</button>
        </div>
      ) : (
        <Composer
          disabled={busy}
          pending={chat.pending}
          onSend={chat.sendMessage}
          onUploadFile={chat.uploadFile}
          onAddUrl={chat.addUrl}
          onRemovePending={chat.removePending}
        />
      )}

      <div className="ana-coach-disclosure">
        Conversations may be reviewed by Ana to improve coaching. One session at a time — starting a new session clears the current one.
      </div>
    </div>
  );
}
