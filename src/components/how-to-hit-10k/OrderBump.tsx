import React from 'react';
import { Check } from 'lucide-react';

interface OrderBumpProps {
    isSelected: boolean;
    onToggle: () => void;
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
}

export const OrderBump: React.FC<OrderBumpProps> = ({
    isSelected,
    onToggle,
    title,
    description,
    price,
    originalPrice
}) => {
    return (
        <div
            onClick={onToggle}
            className={`cursor-pointer border-2 rounded-xl p-5 mb-6 transition-all duration-300 relative overflow-hidden ${isSelected
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
                        {title}
                    </h4>
                    <p className="font-lato text-gray-700 text-sm leading-relaxed mb-4 italic">
                        <span className="font-bold text-[#d81159]">ONE-TIME OFFER:</span> {description}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="font-anton text-[#ffc300] text-xl">ONLY ${price / 100}</span>
                        {originalPrice && (
                            <span className="text-gray-400 line-through text-sm">${originalPrice / 100} Value</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
