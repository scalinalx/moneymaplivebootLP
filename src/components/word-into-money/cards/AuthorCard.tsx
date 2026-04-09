'use client';

import React from 'react';
import { FeedCard } from '../FeedCard';

interface AuthorCardProps {
    animation?: string;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ animation = 'fade' }) => {
    return (
        <FeedCard animation={animation as any}>
            <div className="flex items-center gap-4 mb-4">
                <img
                    src="/imgs/ana-calin.jpg"
                    alt="Ana Calin"
                    className="w-16 h-16 rounded-full object-cover border-2 border-brand-lime"
                />
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-anton text-xl text-brand-white uppercase">Ana Calin</h3>
                        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <p className="text-brand-grey text-sm font-lora">Copywriter. Newsletter Monetisation Expert.</p>
                </div>
            </div>
            <div className="flex gap-6 pt-4 border-t border-brand-800">
                <div>
                    <p className="font-anton text-2xl text-brand-lime">2.3K+</p>
                    <p className="text-brand-grey text-xs">Students</p>
                </div>
                <div>
                    <p className="font-anton text-2xl text-brand-lime">$1.2M</p>
                    <p className="text-brand-grey text-xs">Generated</p>
                </div>
                <div>
                    <p className="font-anton text-2xl text-brand-lime">4.9</p>
                    <p className="text-brand-grey text-xs">Rating</p>
                </div>
            </div>
        </FeedCard>
    );
};
