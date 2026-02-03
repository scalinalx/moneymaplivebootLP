import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    ...props
}) => {
    const baseStyles = "relative font-bold text-sm md:text-base transition-transform active:translate-y-1 active:translate-x-1 border-2 border-black flex items-center justify-center gap-2 px-8 py-3 uppercase tracking-wider";

    const variants = {
        primary: "bg-brand-neon text-black shadow-hard hover:bg-[#e6e200]",
        secondary: "bg-black text-white shadow-hard hover:bg-gray-800",
        outline: "bg-transparent text-black shadow-hard hover:bg-gray-50"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
