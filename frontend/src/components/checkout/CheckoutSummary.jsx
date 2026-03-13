import React from 'react';

/**
 * CheckoutSummary - Component for displaying event summary in checkout
 */
const CheckoutSummary = ({ title, date, location, image, quantity }) => {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex gap-4 items-center">
            {image && (
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                </div>
            )}
            <div className="flex-1 min-w-0">
                <h3 className="text-lg font-black text-gray-900 truncate">{title}</h3>
                <div className="flex flex-col text-sm text-gray-500 mt-1">
                    <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {location}
                    </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">
                        {quantity} {quantity > 1 ? 'Tickets' : 'Ticket'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSummary;
