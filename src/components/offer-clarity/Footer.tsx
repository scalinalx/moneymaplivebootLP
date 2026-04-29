'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-gray-400 py-10">
      <div className="max-w-4xl mx-auto px-6 text-center text-xs md:text-sm space-y-3 leading-relaxed">
        <p>
          <a href="/privacy" className="underline hover:text-white">
            Privacy Policy
          </a>{' '}
          |{' '}
          <a href="/terms" className="underline hover:text-white">
            Terms
          </a>{' '}
          |{' '}
          <a href="https://howwegrowtoday.substack.com" className="underline hover:text-white">
            Substack
          </a>
        </p>
        <p>© Ana Calin — How We Grow 2026, All Rights Reserved.</p>
        <p>
          <a href="https://howwegrowtoday.substack.com" className="hover:text-white">
            howwegrowtoday.substack.com
          </a>{' '}
          |{' '}
          <a href="https://monetisesubstack.com" className="hover:text-white">
            monetisesubstack.com
          </a>
        </p>
      </div>
    </footer>
  );
}
