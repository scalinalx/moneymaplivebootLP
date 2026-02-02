'use client';

import React, { useState } from 'react';
import { LaunchFormData } from '../types';
import { Sparkles, ArrowRight, Calendar, Users, Gift, PlusCircle } from 'lucide-react';

interface InputFormProps {
    onSubmit: (data: LaunchFormData) => void;
    isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState<LaunchFormData>({
        leadMagnetName: '',
        leadMagnetDescription: '',
        coreProductName: '',
        coreProductDescription: '',
        audience: '',
        launchDate: '',
        extraOfferDetails: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-rose-100 p-8 md:p-10">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 font-sans tracking-tight">
                    Design Your Launch
                </h2>
                <p className="text-gray-500 font-light">
                    Tell us about your offer, and we'll craft the perfect psychological journey for your audience.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section 1: The Audience & Timing */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-rose-500 border-b border-rose-100 pb-2">
                        <Users size={20} />
                        <h3 className="font-semibold text-lg uppercase tracking-wider text-rose-900">Audience & Timing</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Target Audience (ICP)</label>
                            <input
                                type="text"
                                name="audience"
                                required
                                placeholder="e.g. Overwhelmed moms looking for fitness routines..."
                                className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-white text-[#191918]"
                                value={formData.audience}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Lead Magnet Launch Date</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    name="launchDate"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-white text-[#191918]"
                                    value={formData.launchDate}
                                    onChange={handleChange}
                                />
                                <Calendar className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" size={18} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: The Offers */}
                <div className="space-y-6">
                    <div className="flex items-center space-x-2 text-rose-500 border-b border-rose-100 pb-2">
                        <Gift size={20} />
                        <h3 className="font-semibold text-lg uppercase tracking-wider text-rose-900">The Offer Stack</h3>
                    </div>

                    {/* Lead Magnet */}
                    <div className="bg-rose-50/50 p-6 rounded-2xl space-y-4 border border-rose-100">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-sm">1</div>
                            <h4 className="font-medium text-gray-800">The Lead Magnet (Free/Low Ticket)</h4>
                        </div>
                        <div className="space-y-4 pl-10">
                            <div>
                                <input
                                    type="text"
                                    name="leadMagnetName"
                                    required
                                    placeholder="Name (e.g., The 5-Day Keto Kickstart Guide)"
                                    className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-white text-[#191918]"
                                    value={formData.leadMagnetName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <textarea
                                    name="leadMagnetDescription"
                                    required
                                    rows={2}
                                    placeholder="What is it? What big problem does it solve quickly?"
                                    className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-white resize-none text-[#191918]"
                                    value={formData.leadMagnetDescription}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Core Product */}
                    <div className="bg-white p-6 rounded-2xl space-y-4 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-sm">2</div>
                            <h4 className="font-medium text-gray-800">The Core Product (Upsell)</h4>
                        </div>
                        <div className="space-y-4 pl-10">
                            <div>
                                <input
                                    type="text"
                                    name="coreProductName"
                                    required
                                    placeholder="Name (e.g., The Metabolic Reset Academy)"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-gray-50 text-[#191918]"
                                    value={formData.coreProductName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <textarea
                                    name="coreProductDescription"
                                    required
                                    rows={3}
                                    placeholder="What's the promise? What's the guarantee? Why is it scarce?"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all bg-gray-50 resize-none text-[#191918]"
                                    value={formData.coreProductDescription}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Extra Details */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                            <PlusCircle size={16} />
                            <label className="text-sm font-medium">Upsells, Downsells, or Extra Notes (Optional)</label>
                        </div>
                        <textarea
                            name="extraOfferDetails"
                            rows={2}
                            placeholder="Any special bonuses, a VIP tier, or a downsell option..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 outline-none transition-all bg-white text-[#191918]"
                            value={formData.extraOfferDetails}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`
              w-full py-4 px-6 rounded-xl font-bold text-lg text-white shadow-lg shadow-rose-200
              flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1
              ${isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700'
                            }
            `}
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span>Analyzing & Crafting...</span>
                            </>
                        ) : (
                            <>
                                <Sparkles size={20} />
                                <span>Generate Launch Sequence</span>
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InputForm;
