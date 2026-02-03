import React from 'react';
import { Check } from 'lucide-react';

interface OrderBumpProps {
    isSelected: boolean;
    onToggle: () => void;
    title: string;
    description: React.ReactNode;
    price: number; // in cents
    originalPriceValue: number; // e.g. 197 for $197
    highlightText?: string;
}

export const OrderBump: React.FC<OrderBumpProps> = ({
    isSelected,
    onToggle,
    title,
    description,
    price,
    originalPriceValue,
    highlightText = "ONE-TIME OFFER:"
}) => {
    return (
        <div
            onClick={onToggle}
            className={`cursor-pointer border-2 rounded-xl p-5 mb-6 transition-all duration-300 relative overflow-hidden ${isSelected
                ? 'border-brand-neon bg-yellow-50 shadow-md'
                : 'border-dashed border-gray-300 hover:border-brand-neon/50 bg-white'
                }`}
        >
            {isSelected && (
                <div className="absolute top-0 right-0 bg-brand-neon text-black px-3 py-1 text-[10px] font-bold uppercase rounded-bl-lg border-b-2 border-l-2 border-black">
                    Selected
                </div>
            )}

            <div className="flex items-start gap-4 text-black">
                <div className={`flex-shrink-0 w-6 h-6 rounded border-2 border-black flex items-center justify-center mt-1 transition-colors ${isSelected ? 'bg-brand-neon' : 'bg-white'
                    }`}>
                    {isSelected && <Check size={16} className="text-black" strokeWidth={4} />}
                </div>

                <div className="flex-grow">
                    <h4 className="font-poppins font-bold text-black text-lg leading-tight mb-2">
                        {title}
                    </h4>
                    <p className="font-poppins text-gray-700 text-sm leading-relaxed mb-4 italic">
                        <span className="font-bold text-[#ff4d4d]">{highlightText}</span> {description}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-black text-xl">ONLY ${price / 100}</span>
                        <span className="text-gray-400 line-through text-sm">${originalPriceValue} Value</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
