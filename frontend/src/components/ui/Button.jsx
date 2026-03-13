import React from 'react';

const SIZES = {
    sm: 'px-3.5 py-1.5 text-xs rounded-lg',
    md: 'px-5 py-2.5 text-sm rounded-xl',
    lg: 'px-7 py-3.5 text-base rounded-xl',
    xl: 'px-8 py-4 text-lg rounded-2xl',
};

const VARIANTS = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200 hover:shadow-md hover:shadow-indigo-200',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200',
    outline: 'bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-sm shadow-red-200',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-200',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
    dark: 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm',
    white: 'bg-white text-indigo-600 hover:bg-indigo-50 shadow-sm border border-gray-200',
};

const Button = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    isLoading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
}) => {
    const base = `
    inline-flex items-center justify-center gap-2 font-semibold
    transition-all duration-200 select-none
    active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
    focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
    ${fullWidth ? 'w-full' : ''}
  `;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${base} ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin h-4 w-4 text-current flex-shrink-0" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Loading…</span>
                </>
            ) : (
                <>
                    {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
                </>
            )}
        </button>
    );
};

export default Button;
