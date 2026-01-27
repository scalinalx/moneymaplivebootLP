import React from 'react';

export const SectionDivider: React.FC = () => {
    return (
        <div className="w-full bg-[#E0F7FA] flex justify-center items-center h-[3px] overflow-hidden">
            {/* Decorative divider scaled to fit 3px height */}
            <div className="flex items-center gap-4 opacity-40">
                <div className="h-[1px] w-12 md:w-24 bg-[#333333]"></div>
                <div className="w-[3px] h-[3px] rounded-full bg-[#333333]"></div>
                <div className="h-[1px] w-12 md:w-24 bg-[#333333]"></div>
            </div>
        </div>
    );
};
