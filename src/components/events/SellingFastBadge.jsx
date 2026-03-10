import React from 'react';

/**
 * SellingFastBadge - Appears when ticket threshold is reached
 */
const SellingFastBadge = ({ type = 'fast' }) => {
    const isAlmostSoldOut = type === 'almost';

    return (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-tight shadow-sm animate-pulse ${isAlmostSoldOut
                ? 'bg-red-500 text-white shadow-red-200'
                : 'bg-amber-500 text-white shadow-amber-200'
            }`}>
            {isAlmostSoldOut ? (
                <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Almost Sold Out
                </>
            ) : (
                <>
                    <span className="text-sm">🔥</span>
                    Selling Fast
                </>
            )}
        </div>
    );
};

export default SellingFastBadge;
