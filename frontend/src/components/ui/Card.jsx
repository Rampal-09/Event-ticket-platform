import React from 'react';

const Card = ({ children, title, subtitle, footer, headerAction, className = '', noPadding = false, variant = 'default' }) => {
    const surfaces = {
        default: 'bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300',
        flat: 'bg-white border border-gray-100',
        raised: 'bg-white shadow-xl border border-gray-100',
        colored: 'border-0',
    };

    return (
        <div className={`rounded-2xl overflow-hidden ${surfaces[variant]} ${className}`}>
            {(title || headerAction) && (
                <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                    <div>
                        <h3 className="text-base font-bold text-gray-800">{title}</h3>
                        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
                    </div>
                    {headerAction && <div>{headerAction}</div>}
                </div>
            )}
            <div className={noPadding ? '' : 'p-6'}>
                {children}
            </div>
            {footer && (
                <div className="px-6 py-4 bg-gray-50/60 border-t border-gray-100">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;
