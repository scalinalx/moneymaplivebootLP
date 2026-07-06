'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ProductCard from './ProductCard';
import type { UIMessage } from './useCoachChat';

const MONETISE_DOMAIN = 'monetisesubstack.com';

// Hardened markdown: NO raw HTML (no rehype-raw), links get rel-hardening +
// a click-confirm for non-monetisesubstack domains, images are never rendered
// (kills the markdown-image exfiltration-beacon channel) — alt text only.
const mdComponents = {
  a({ href, children }: { href?: string; children?: React.ReactNode }) {
    const url = href || '';
    const isExternal = !!url && !url.includes(MONETISE_DOMAIN) && /^https?:\/\//i.test(url);
    const onClick = (e: React.MouseEvent) => {
      if (isExternal && !window.confirm(`This link goes to an external site:\n${url}\n\nOpen it?`)) {
        e.preventDefault();
      }
    };
    return (
      <a href={url} target="_blank" rel="noopener noreferrer nofollow" onClick={onClick}>
        {children}
      </a>
    );
  },
  img({ alt }: { alt?: string }) {
    return <span className="ana-coach-img-alt">{alt ? `[image: ${alt}]` : '[image]'}</span>;
  },
};

const PRODUCT_RE = /\[\[product:([a-z0-9-]+)\]\]/gi;

// Split coach text into markdown segments and product-card markers.
function renderCoachText(text: string) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  PRODUCT_RE.lastIndex = 0;
  while ((m = PRODUCT_RE.exec(text))) {
    const before = text.slice(last, m.index);
    if (before.trim()) {
      parts.push(
        <ReactMarkdown key={key++} remarkPlugins={[remarkGfm]} components={mdComponents}>
          {before}
        </ReactMarkdown>,
      );
    }
    parts.push(<ProductCard key={key++} slug={m[1].toLowerCase()} />);
    last = m.index + m[0].length;
  }
  const rest = text.slice(last);
  if (rest.trim()) {
    parts.push(
      <ReactMarkdown key={key++} remarkPlugins={[remarkGfm]} components={mdComponents}>
        {rest}
      </ReactMarkdown>,
    );
  }
  return parts;
}

export default function CoachMessage({ message }: { message: UIMessage }) {
  if (message.role === 'user') {
    return (
      <div className="ana-coach-msg ana-coach-msg-user">
        <div className="ana-coach-bubble ana-coach-bubble-user">{message.text}</div>
        {message.attachments && message.attachments.length > 0 && (
          <div className="ana-coach-msg-attachments">
            {message.attachments.map((a) => (
              <span key={a.id} className="ana-coach-chip">
                {a.kind === 'url' ? '🔗' : '📄'} {a.name}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="ana-coach-msg ana-coach-msg-coach">
      <div className="ana-coach-bubble ana-coach-bubble-coach ana-coach-prose">
        {renderCoachText(message.text)}
        {message.streaming && <span className="ana-coach-caret" />}
      </div>
    </div>
  );
}
