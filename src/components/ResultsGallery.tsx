"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type Item = {
  src: string;
  title: string;
  stats: { label: string; value: string }[];
  quote: string;
  alt: string;
};

const items: Item[] = [
  {
    src: '/imgs/revscreenshots/1.png',
    title: 'Gustavo A., 489 subscribers',
    stats: [
      { label: 'Subscriber Growth', value: '+9,755' },
      { label: 'Time Period', value: '3 months' },
    ],
    quote:
      '“$5,247 in my first launch. 17 customers at $297 each. I was terrified to hit send. Ana walked me through it live.”',
    alt: 'Growth Chart',
  },
  {
    src: '/imgs/revscreenshots/2.png',
    title: 'Maria L., 847 subscribers',
    stats: [
      { label: 'Monthly Revenue', value: '$2,500+' },
      { label: 'Time Period', value: '7 weeks' },
    ],
    quote:
      '“$2,800 in Week 1. Then $3,100 in Week 2. My list is only 847 people. You don’t need 10K subscribers.”',
    alt: 'Revenue Chart',
  },
  {
    src: '/imgs/revscreenshots/3.png',
    title: 'Kyle D., 1,230 subscribers',
    stats: [
      { label: 'Open Rate', value: '68%' },
      { label: 'Time Period', value: '2 months' },
    ],
    quote:
      '“$4,500 from my first cohort. 15 people at $300. Sold out in 4 days using Ana’s launch sequence.”',
    alt: 'Creator Economy Desk',
  },
];

const ResultsGallery = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Item | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const openModal = (item: Item) => {
    setSelected(item);
    setOpen(true);
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-white text-3xl font-bold mb-2">Real Results from Our Students</h2>
        <p className="text-gray-400">See the actual growth and revenue numbers from our community</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {items.map((it) => (
          <div key={it.src} className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/25 hover:border-white/40 transition-colors duration-200">
            <button
              type="button"
              onClick={() => openModal(it)}
              className="aspect-video mb-4 w-full relative group focus:outline-none focus:ring-2 focus:ring-yellow-400/70 rounded-lg overflow-hidden"
              aria-label={`Open larger view: ${it.alt}`}
            >
              <Image src={it.src} alt={it.alt} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </button>
            <h3 className="text-white font-semibold mb-2">{it.title}</h3>
            <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--color-green-400)' }}>{it.quote}</p>
          </div>
        ))}
      </div>

      {/* Emphasized subtitle */}
      <div className="mt-8 text-center">
        <div className="inline-block rounded-xl border border-yellow-400/40 bg-white/5 px-5 py-3 backdrop-blur">
          <div className="text-white text-lg font-semibold">
            Average first launch revenue for Build to Profit members: <span className="text-yellow-300">$3,847</span>
          </div>
          <div className="text-gray-300 text-xs mt-1">(Based on 127 members who launched within 30 days)</div>
        </div>
      </div>

      {open && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-3 -right-3 z-10 rounded-full bg-white/90 text-black w-8 h-8 font-bold shadow"
              aria-label="Close"
            >
              ×
            </button>
            <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
              {/* Use img for flexibility in modal */}
              <img
                src={selected.src}
                alt={selected.alt}
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>
            <div className="mt-3 text-center">
              <h4 className="text-white font-semibold">{selected.title}</h4>
              <p className="text-gray-300 text-sm mt-1">{selected.quote}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsGallery; 
