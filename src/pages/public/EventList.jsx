import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import EventCard from '../../components/events/EventCard';
import EventFilters from '../../components/events/EventFilters';
import { ROUTES } from '../../router/routes';
import { MOCK_EVENTS } from '../../data/mockEvents';

const EventList = () => {
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeFilters, setActiveFilters] = useState({ dateRange: 'any', priceOrder: 'default' });
    const navigate = useNavigate();

    // Convert MOCK_EVENTS object to array for listing
    const eventsArray = Object.values(MOCK_EVENTS);

    const handleFilterChange = (newFilters) => {
        if (newFilters.category) {
            setActiveCategory(newFilters.category);
        } else {
            setActiveFilters(prev => ({ ...prev, ...newFilters }));
        }
    };

    const filteredEvents = useMemo(() => {
        let result = eventsArray.filter(event => {
            const matchesSearch =
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
            return matchesSearch && matchesCategory;
        });

        // Apply additional sorting
        if (activeFilters.priceOrder === 'price-low') {
            result.sort((a, b) => a.ticket_price - b.ticket_price);
        } else if (activeFilters.priceOrder === 'price-high') {
            result.sort((a, b) => b.ticket_price - a.ticket_price);
        } else if (activeFilters.priceOrder === 'date-new') {
            result.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
        }

        return result;
    }, [searchTerm, activeCategory, activeFilters, eventsArray]);

    return (
        <div className="bg-white min-h-screen">
            {/* Header Band */}
            <div style={{ background: 'linear-gradient(160deg, #F8FAFC 0%, #F1F5F9 100%)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                    <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-center sm:text-left">Discovery Hub</p>
                    <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight mb-4 text-center sm:text-left">Find your next <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">great experience</span></h1>

                    {/* Search Field */}
                    <div className="mt-10 max-w-2xl mx-auto sm:mx-0">
                        <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-xl shadow-indigo-100/50 border border-gray-100 transition-all hover:border-indigo-200">
                            <svg className="w-6 h-6 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by event name, genre, or location..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="flex-1 outline-none text-gray-800 placeholder:text-gray-400 text-base font-bold bg-transparent"
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="text-gray-400 hover:text-gray-600 p-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Advanced Filters */}
                <EventFilters
                    activeCategory={activeCategory}
                    onFilterChange={handleFilterChange}
                />

                {/* Grid */}
                {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                        {filteredEvents.map((event, i) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                index={i}
                                onBuyClick={() => navigate(ROUTES.EVENT_DETAILS.replace(':id', event.id))}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-28 flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-5xl mb-6 grayscale">🔍</div>
                        <h3 className="text-3xl font-black text-gray-900 mb-2">No events found</h3>
                        <p className="text-gray-500 max-w-xs font-medium">We couldn't find anything matching your current filters. Try a broader search!</p>
                        <button
                            onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                            className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg"
                        >
                            Reset all filters
                        </button>
                    </div>
                )}

                {/* Bottom Pagination / Load More Simulation */}
                {filteredEvents.length > 0 && (
                    <div className="mt-20 flex flex-col items-center border-t border-gray-100 pt-12">
                        <p className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-widest">End of results</p>
                        <button className="px-8 py-3 border-2 border-gray-900 rounded-2xl font-black text-gray-900 hover:bg-gray-900 hover:text-white transition-all">
                            Load 20 More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventList;
