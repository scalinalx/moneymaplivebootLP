'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface OrderBumpProps {
  isSelected: boolean;
  disabled?: boolean;
  onToggle: () => void;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  highlight?: boolean;
  badge?: string;
}

export const OrderBump: React.FC<OrderBumpProps> = ({
  isSelected,
  disabled,
  onToggle,
  title,
  description,
  price,
  originalPrice,
  highlight,
  badge,
}) => {
  return (
    <div
      onClick={disabled ? undefined : onToggle}
      className={`relative rounded-xl p-5 transition-all duration-200 ${
        disabled
          ? 'opacity-60 cursor-not-allowed'
          : 'cursor-pointer'
      } ${
        isSelected
          ? 'border-2 border-[#9E8B52] bg-[#FFFBEB] shadow-md'
          : highlight
            ? 'border-2 border-[#9E8B52]/60 bg-gradient-to-br from-[#FFFBEB] to-white hover:border-[#9E8B52]'
            : 'border-2 border-dashed border-gray-300 hover:border-[#9E8B52]/60 bg-white'
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-4 bg-[#9E8B52] text-white px-3 py-0.5 text-[10px] font-extrabold uppercase rounded-full tracking-widest">
          {badge}
        </div>
      )}
      {isSelected && (
        <div className="absolute top-0 right-0 bg-[#9E8B52] text-white px-3 py-1 text-[10px] font-bold uppercase rounded-bl-lg tracking-wider">
          Added
        </div>
      )}

      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center mt-1 transition-colors ${
            isSelected ? 'bg-[#9E8B52] border-[#9E8B52]' : 'bg-white border-gray-300'
          }`}
        >
          {isSelected && <Check size={16} className="text-white" strokeWidth={4} />}
        </div>

        <div className="flex-grow">
          <h4
            className="font-extrabold text-[#1a1a1a] text-base md:text-lg leading-tight mb-1"
            style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
          >
            {title}
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            <span className="font-bold text-[#9E8B52] uppercase tracking-wide text-xs">
              Add it on:
            </span>{' '}
            {description}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="text-xl font-extrabold text-[#9E8B52]"
              style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}
            >
              ${price / 100}
            </span>
            {originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                ${originalPrice / 100}
              </span>
            )}
            {originalPrice && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Save ${(originalPrice - price) / 100}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
