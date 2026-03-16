import React from 'react';

const Input = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    hint,
    className = '',
    id,
    required,
    icon,
    ...props
}) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
        <div className={`flex flex-col gap-2 w-full ${className}`}>
            {label && (
                <label htmlFor={inputId} className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">
                    {label}
                    {required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}
            <div className="relative group">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors">
                        {icon}
                    </div>
                )}
                <input
                    id={inputId}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`
            w-full ${icon ? 'pl-12' : 'px-5'} py-3.5 rounded-2xl border text-sm bg-gray-50/50 text-gray-900
            transition-all duration-300 outline-none
            placeholder:text-gray-400 font-bold
            focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500
            hover:border-indigo-200 shadow-sm
            ${error
                            ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20 bg-red-50/30'
                            : 'border-gray-100'
                        }
          `}
                    {...props}
                />
                {error && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}
            </div>
            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
            {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
        </div>
    );
};

export default Input;
