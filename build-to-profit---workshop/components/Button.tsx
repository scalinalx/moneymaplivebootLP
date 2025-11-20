import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  fullWidth, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold font-display transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const variants = {
    primary: "bg-brand-lime text-brand-950 hover:bg-white hover:scale-[1.02] shadow-[0_0_30px_-5px_rgba(204,255,0,0.4)]",
    secondary: "bg-white text-brand-950 hover:bg-brand-lime border border-transparent",
    outline: "bg-transparent text-white border border-white/20 hover:border-brand-lime hover:text-brand-lime"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};