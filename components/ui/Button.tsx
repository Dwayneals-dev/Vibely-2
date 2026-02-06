import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-pink/50 focus:ring-offset-2 focus:ring-offset-dark-900 cursor-pointer overflow-hidden group";

  const variants = {
    primary: "bg-gradient-to-r from-accent-pink to-accent-orange text-white rounded-xl shadow-lg shadow-accent-pink/20 hover:shadow-accent-pink/40 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border border-white/10",
    secondary: "bg-dark-700 text-white rounded-xl hover:bg-dark-600 border border-white/10 hover:border-white/20 hover:shadow-lg",
    outline: "border border-white/15 bg-transparent text-zinc-200 rounded-xl hover:bg-white/5 hover:border-accent-pink/30 hover:text-white",
    ghost: "bg-transparent text-zinc-400 rounded-xl hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const widthStyle = fullWidth ? "w-full" : "";
  const opacityStyle = disabled || isLoading ? "opacity-60 cursor-not-allowed pointer-events-none" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${opacityStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Shimmer sweep on hover (primary only) */}
      {variant === 'primary' && (
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      )}
      {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};
