'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQProps {
  items: FAQItem[];
}

export const FAQ: React.FC<FAQProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full space-y-0 divide-y divide-brand-800 border-y border-brand-800">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="bg-transparent transition-colors hover:bg-brand-800/30"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
          >
            <span className={`font-display font-medium text-lg ${openIndex === index ? 'text-brand-lime' : 'text-white group-hover:text-brand-lime transition-colors'}`}>
              {item.question}
            </span>
            {openIndex === index ? (
              <Minus className="w-5 h-5 text-brand-lime flex-shrink-0 ml-4" />
            ) : (
              <Plus className="w-5 h-5 text-brand-grey flex-shrink-0 ml-4" />
            )}
          </button>
          
          <div 
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="overflow-hidden">
              <p className="pb-6 text-brand-grey leading-relaxed max-w-2xl">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
