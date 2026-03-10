import React from 'react';

/**
 * EventFilters - Component for filtering event lists by category, date, etc.
 */
const EventFilters = ({ onFilterChange, activeCategory = 'All' }) => {
    const categories = ['All', 'Music', 'Tech', 'Food', 'Art', 'Networking'];

    return (
        <div className="flex flex-col gap-6 mb-10">
            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => onFilterChange?.({ category: cat })}
                        className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${activeCategory === cat
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100'
                                : 'bg-white border-gray-100 text-gray-500 hover:border-indigo-300'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Sub Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <select
                            className="appearance-none bg-white border border-gray-100 rounded-xl px-4 py-2.5 pr-10 text-sm font-bold text-gray-700 outline-none hover:border-indigo-300 transition-colors cursor-pointer shadow-sm"
                            onChange={(e) => onFilterChange?.({ dateRange: e.target.value })}
                        >
                            <option value="any">Any Date</option>
                            <option value="today">Today</option>
                            <option value="weekend">This Weekend</option>
                            <option value="month">This Month</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>

                    <div className="relative">
                        <select
                            className="appearance-none bg-white border border-gray-100 rounded-xl px-4 py-2.5 pr-10 text-sm font-bold text-gray-700 outline-none hover:border-indigo-300 transition-colors cursor-pointer shadow-sm"
                            onChange={(e) => onFilterChange?.({ priceOrder: e.target.value })}
                        >
                            <option value="default">Sort by</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="date-new">Soonest First</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>

                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Showing 24 events
                </p>
            </div>
        </div>
    );
};

export default EventFilters;
