'use client';

import React from 'react';
import { X } from 'lucide-react';
import { CheckoutForm } from './CheckoutCard';

interface MobileCheckoutSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileCheckoutSheet({ isOpen, onClose }: MobileCheckoutSheetProps) {
    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[1999] transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Bottom Sheet */}
            <div
                className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-2xl z-[2000] max-h-[90vh] overflow-y-auto transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-display font-bold text-2xl text-slate-900">
                        Complete Your Order
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Product Thumbnail */}
                <div className="relative w-full aspect-[16/10] mb-6">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-300 to-rose-300 rounded-2xl blur opacity-25"></div>
                    <div className="relative bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg h-full">
                        PDF GUIDE
                    </div>
                </div>

                {/* Pricing */}
                <div className="text-center pb-6 mb-6 border-b border-slate-100">
                    <span className="text-slate-400 line-through text-lg mr-3">$27</span>
                    <span className="font-display font-bold text-4xl bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
                        $9.97
                    </span>
                </div>

                {/* Note */}
                {/* Checkout Form (Reusing the Desktop Logic) */}
                <div className="max-w-md mx-auto">
                    <CheckoutForm />
                </div>
            </div>
        </>
    );
}
