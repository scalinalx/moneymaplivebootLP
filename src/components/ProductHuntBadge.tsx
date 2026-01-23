import React from 'react';

export const ProductHuntBadge = ({ className = '' }: { className?: string }) => {
    return (
        <a
            href="https://www.producthunt.com/products/offer-flow/reviews?utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-offer-flow"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 px-5 py-2.5 bg-white border border-[#FF6154] rounded-lg hover:bg-[#FFF8F7] transition-all group shadow-sm ${className}`}
        >
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <path d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20Z" fill="#FF6154" />
                <path d="M22.0003 12.0001H15.0003V28.0001H19.0003V21.6001H22.0003C24.6515 21.6001 26.8003 19.4513 26.8003 16.8001C26.8003 14.1489 24.6515 12.0001 22.0003 12.0001ZM22.0003 17.6001H19.0003V16.0001H22.0003C22.4421 16.0001 22.8003 16.3582 22.8003 16.8001C22.8003 17.2419 22.4421 17.6001 22.0003 17.6001Z" fill="white" />
            </svg>
            <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] uppercase font-bold text-[#FF6154] tracking-wider mb-0.5">REVIEW US ON</span>
                <span className="text-xl font-bold text-[#21293C]">Product Hunt</span>
            </div>
        </a>
    );
};
