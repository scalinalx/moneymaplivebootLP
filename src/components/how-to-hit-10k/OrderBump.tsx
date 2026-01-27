import React from 'react';
import { Check } from 'lucide-react';
import { HIT10K_BUMP_PRICE } from '@/lib/stripe';

interface OrderBumpProps {
    isSelected: boolean;
    onToggle: () => void;
}

export const OrderBump: React.FC<OrderBumpProps> = ({ isSelected, onToggle }) => {
    return (
        <div
            onClick={onToggle}
            className={`cursor-pointer border-2 rounded-xl p-5 mb-8 transition-all duration-300 relative overflow-hidden ${isSelected
                ? 'border-[#ffc300] bg-[#FFFBEB] shadow-md'
                : 'border-dashed border-gray-300 hover:border-[#ffc300]/50 bg-white'
                }`}
        >
            {isSelected && (
                <div className="absolute top-0 right-0 bg-[#ffc300] text-white px-3 py-1 text-[10px] font-bold uppercase rounded-bl-lg">
                    Selected
                </div>
            )}

            <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center mt-1 transition-colors ${isSelected ? 'bg-[#ffc300] border-[#ffc300]' : 'bg-white border-gray-300'
                    }`}>
                    {isSelected && <Check size={16} className="text-white" strokeWidth={4} />}
                </div>

                <div className="flex-grow">
                    <h4 className="font-montserrat font-bold text-[#333333] text-lg leading-tight mb-2">
                        Wait! Do you want "Hooks That Stop the Scroll"?
                    </h4>
                    <p className="font-lato text-gray-700 text-sm leading-relaxed mb-4 italic">
                        <span className="font-bold text-[#d81159]">ONE-TIME OFFER:</span> Stop being ignored. Get my vault of high-converting headline frameworks and opening loops that force readers to stop scrolling and click your content instantly. (Regularly $197 — Save 86% off today).
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="font-anton text-[#ffc300] text-xl">ONLY ${HIT10K_BUMP_PRICE / 100}</span>
                        <span className="text-gray-400 line-through text-sm">$197 Value</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
