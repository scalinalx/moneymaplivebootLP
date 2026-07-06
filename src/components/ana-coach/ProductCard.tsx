'use client';

import React from 'react';
import { COACH_PRODUCTS } from '@/data/ana-coach/products';

// Renders a product recommendation card from a validated slug. Unknown slugs
// render nothing (defense-in-depth against invented markers).
export default function ProductCard({ slug }: { slug: string }) {
  const p = COACH_PRODUCTS[slug];
  if (!p) return null;
  return (
    <a href={p.url} target="_blank" rel="noopener noreferrer" className="ana-coach-product-card">
      <div className="ana-coach-product-name">{p.name}</div>
      {p.tagline && <div className="ana-coach-product-tagline">{p.tagline}</div>}
      <div className="ana-coach-product-foot">
        <span className="ana-coach-product-price">{p.price}</span>
        <span className="ana-coach-product-cta">View →</span>
      </div>
    </a>
  );
}
