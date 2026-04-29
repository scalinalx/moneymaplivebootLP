'use client';

import React from 'react';

interface CTAProps {
  children: React.ReactNode;
  variant?: 'gold' | 'dark';
  size?: 'md' | 'lg';
  className?: string;
}

export function CTA({ children, variant = 'gold', size = 'md', className = '' }: CTAProps) {
  const base =
    'inline-block rounded-md font-extrabold uppercase tracking-wide text-center transition-all hover:-translate-y-1 shadow-lg cursor-pointer';
  const colors =
    variant === 'gold'
      ? 'bg-[#9E8B52] hover:bg-[#8a7a47] text-white'
      : 'bg-black hover:bg-[#1a1a1a] text-white';
  const padding =
    size === 'lg' ? 'px-12 py-5 text-xl md:text-2xl' : 'px-8 py-4 text-base md:text-lg';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('checkout-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <a
        href="#checkout-section"
        onClick={handleClick}
        className={`${base} ${colors} ${padding}`}
        style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
      >
        {children}
      </a>
    </div>
  );
}
