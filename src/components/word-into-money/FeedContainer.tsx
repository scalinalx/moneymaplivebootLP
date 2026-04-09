'use client';

import React from 'react';

interface FeedContainerProps {
    children: React.ReactNode;
}

export const FeedContainer: React.FC<FeedContainerProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-brand-950 feed-no-scrollbar">
            <div className="max-w-[620px] mx-auto px-4 py-6 space-y-3">
                {children}
            </div>
        </div>
    );
};
