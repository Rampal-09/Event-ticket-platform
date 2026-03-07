import React, { useState, useMemo } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import EventCard from '../../components/events/EventCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import imgMusic from '../../assets/images/event-music.png';
import imgTech from '../../assets/images/event-tech.png';
import imgFood from '../../assets/images/event-food.png';
import imgArt from '../../assets/images/event-art.png';
import imgJazz from '../../assets/images/event-jazz.png';
import imgStartup from '../../assets/images/event-startup.png';

const MOCK_EVENTS = [
    { id: 1, title: "Summer Music Festival 2026", description: "Get ready for the biggest music event of the summer! Featuring top artists from around the globe across three stages.", location: "Central Park, NY", event_date: "2026-07-15", ticket_price: 120, category: "Music", image: imgMusic },
    { id: 2, title: "Tech Innovators Conference", description: "Explore the future of AI, robotics, and biotechnology with industry leaders and visionaries.", location: "San Francisco, CA", event_date: "2026-09-22", ticket_price: 250, category: "Tech", image: imgTech },
    { id: 3, title: "Culinary Arts Expo", description: "A taste adventure featuring world-class chefs, wine tasting, and interactive cooking workshops.", location: "Miami, FL", event_date: "2026-05-30", ticket_price: 75, category: "Food", image: imgFood },
    { id: 4, title: "Street Art Workshop", description: "Learn the basics of graffiti and mural techniques from renowned urban artists in an open-air studio.", location: "Brooklyn, NY", event_date: "2026-06-10", ticket_price: 45, category: "Art", image: imgArt },
    { id: 5, title: "Jazz under the Stars", description: "An enchanting evening of smooth jazz performed under the open sky. Bring a blanket and a friend.", location: "New Orleans, LA", event_date: "2026-10-05", ticket_price: 60, category: "Music", image: imgJazz },
    { id: 6, title: "Startup Networking Mixer", description: "Meet founders, investors, and future co-founders at the most vibrant startup mixer in Austin.", location: "Austin, TX", event_date: "2026-08-12", ticket_price: 30, category: "Tech", image: imgStartup },
];

const CATEGORIES = ['All', 'Music', 'Tech', 'Food', 'Art'];

const EventList = () => {
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
    const [activeCategory, setActiveCategory] = useState('All');
    const navigate = useNavigate();

    const filteredEvents = useMemo(() => {
        return MOCK_EVENTS.filter(event => {
            const matchesSearch =
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory]);

    return (
        <PublicLayout>
            {/* Header Band */}
            <div style={{ background: 'linear-gradient(160deg, #EEF2FF 0%, #E0E7FF 100%)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                    <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-2">All Events</p>
                    <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">Browse Events</h1>
                    <p className="text-gray-500 text-lg max-w-lg">Discover experiences happening all around you.</p>

                    {/* Search + Filters Row */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
                            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search events or locations…"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="flex-1 outline-none text-gray-800 placeholder:text-gray-400 text-sm font-medium bg-transparent"
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Category Tabs & Results Count */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`flex-shrink-0 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${activeCategory === cat
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="text-sm text-gray-400 font-medium whitespace-nowrap px-1">
                        {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
                    </div>
                </div>

                {/* Grid */}
                {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    <div className="py-28 flex flex-col items-center text-center space-y-5">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-700">No events found</h3>
                        <p className="text-gray-400 max-w-xs">Try adjusting your search or category filter to find what you're looking for.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                            className="text-indigo-600 font-semibold text-sm hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
};

export default EventList;
