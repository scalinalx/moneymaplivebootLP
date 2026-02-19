'use client';

import React, { useState, useEffect } from 'react';
import { BadgeCheck } from 'lucide-react';

const NAMES = [
    'Michael', 'Emily', 'Jacob', 'Sarah', 'Noah', 'Ava', 'William', 'Isabella', // American
    'Justin', 'Liam', 'Sophie', 'Chloe', 'Oliver', 'Charlotte', 'James', 'Amelia', // Canadian-ish
    'Jack', 'Matilda', 'Isla', 'Lucas', 'Mia', 'Henry', 'Grace', 'Ethan', // Australian-ish
    'Luca', 'Claire', 'Hans', 'Elena', 'Marco', 'Ines', 'Lukas', 'Sofia' // Western European
];

const LOCATIONS = [
    'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Austin, TX', // USA
    'Toronto, ON', 'Vancouver, BC', 'Montreal, QC', 'Calgary, AB', // Canada
    'Sydney, NSW', 'Melbourne, VIC', 'Brisbane, QLD', 'Perth, WA', // Australia
    'London, UK', 'Paris, France', 'Berlin, Germany', 'Madrid, Spain', 'Rome, Italy', 'Amsterdam, Netherlands' // Europe
];

const PRODUCTS = [
    '10K Launch Lab',
    'How To Hit 10K Training',
    '100 Genius Offers That Sell in 2026'
];

interface PurchaseData {
    type: 'activity' | 'watching';
    name?: string;
    location?: string;
    product?: string;
    time?: string;
    count?: number;
}

export const PurchaseNotification: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState<PurchaseData | null>(null);

    const generateRandomData = (): PurchaseData => {
        const isWatching = Math.random() < 0.3; // 30% chance for watching notification

        if (isWatching) {
            return {
                type: 'watching',
                count: Math.floor(Math.random() * (17 - 5 + 1)) + 5 // 5 to 17
            };
        }

        const name = NAMES[Math.floor(Math.random() * NAMES.length)];
        const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
        const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];

        // Random time in last 8 hours
        const minutesTotal = Math.floor(Math.random() * 480) + 1; // 1 to 480 minutes
        let time = '';
        if (minutesTotal < 60) {
            time = `${minutesTotal} minutes ago`;
        } else {
            const hours = Math.floor(minutesTotal / 60);
            time = `${hours} hour${hours > 1 ? 's' : ''} ago`;
        }

        return { type: 'activity', name, location, product, time };
    };

    useEffect(() => {
        const showNotification = () => {
            setData(generateRandomData());
            setIsVisible(true);

            // Hide after 6 seconds
            setTimeout(() => {
                setIsVisible(false);

                // Schedule next one between 15 and 45 seconds later
                const nextInterval = Math.floor(Math.random() * 30000) + 15000;
                setTimeout(showNotification, nextInterval);
            }, 6000);
        };

        // Initial delay
        const initialDelay = Math.floor(Math.random() * 10000) + 5000;
        const timer = setTimeout(showNotification, initialDelay);

        return () => clearTimeout(timer);
    }, []);

    if (!data) return null;

    const isSignUpProduct = data.product === '10K Launch Lab' || data.product === 'How To Hit 10K Training';
    const verb = isSignUpProduct ? 'signed up for' : 'just purchased';

    return (
        <div
            className={`fixed bottom-4 left-4 z-50 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95 pointer-events-none'
                }`}
        >
            <div className="bg-white border-2 border-black rounded-[0.75rem] py-2 pl-2 pr-4 flex items-center gap-3 max-w-[280px]">
                {/* Visual Icon Area */}
                <div className="w-9 h-9 bg-[#E8F0FE] rounded-md border border-gray-100 overflow-hidden flex-shrink-0 relative">
                    {data.type === 'watching' ? (
                        <div className="absolute inset-0 flex items-center justify-center text-blue-500">
                            <span className="text-[14px] font-bold animate-pulse">👁️</span>
                        </div>
                    ) : (
                        <>
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4285F4 0.5px, transparent 0.5px)', backgroundSize: '3px 3px' }}></div>
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white transform -rotate-15"></div>
                            <div className="absolute top-0 left-1/3 w-[1px] h-full bg-white transform rotate-10"></div>
                            <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-[#EA4335] rounded-full"></div>
                        </>
                    )}
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                    {data.type === 'watching' ? (
                        <>
                            <p className="text-black font-medium text-[12px] leading-tight">
                                <span className="font-bold">{data.count} people</span> are watching this page right now
                            </p>
                            <div className="flex items-center gap-1 mt-1 border-t border-gray-50 pt-1 justify-end">
                                <BadgeCheck className="w-3 h-3 text-blue-500 fill-blue-500/10" />
                                <a
                                    href="https://useproof.com/verified"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 text-[9px] font-bold tracking-widest hover:underline whitespace-nowrap"
                                >
                                    verified by Proof
                                </a>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-black font-medium text-[12px] leading-tight truncate">
                                <span className="font-bold">{data.name}</span> from {data.location}
                            </p>
                            <p className="text-gray-600 text-[11px] leading-tight mt-0.5 truncate">
                                {verb} <span className="font-semibold">{data.product}</span>
                            </p>
                            <div className="flex items-center gap-1.5 mt-1 border-t border-gray-50 pt-1">
                                <span className="text-gray-400 text-[9px] font-medium uppercase tracking-tight">{data.time}</span>
                                <div className="flex items-center gap-1 ml-auto">
                                    <BadgeCheck className="w-3 h-3 text-blue-500 fill-blue-500/10" />
                                    <a
                                        href="https://useproof.com/verified"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 text-[9px] font-bold tracking-widest hover:underline whitespace-nowrap"
                                    >
                                        verified by Proof
                                    </a>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
