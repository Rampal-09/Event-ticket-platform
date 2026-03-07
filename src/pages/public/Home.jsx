import React, { useState } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import Button from '../../components/ui/Button';
import EventCard from '../../components/events/EventCard';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';

const MOCK_FEATURED_EVENTS = [
    {
        id: 1,
        title: "Summer Music Festival 2026",
        description: "Get ready for the biggest music event of the summer! Featuring top artists from around the globe across three stages.",
        location: "Central Park, New York",
        event_date: "2026-07-15T18:00:00",
        ticket_price: 120,
        total_tickets: 5000,
    },
    {
        id: 2,
        title: "Tech Innovators Conference",
        description: "Explore the future of AI, robotics, and biotechnology with industry leaders and visionaries.",
        location: "Convention Center, San Francisco",
        event_date: "2026-09-22T09:00:00",
        ticket_price: 250,
        total_tickets: 1200,
    },
    {
        id: 3,
        title: "Culinary Arts Expo",
        description: "A taste adventure featuring world-class chefs, wine tasting, and interactive cooking workshops.",
        location: "Bayside Hall, Miami",
        event_date: "2026-05-30T10:00:00",
        ticket_price: 75,
        total_tickets: 800,
    },
];

const STATS = [
    { value: '2,400+', label: 'Events Listed' },
    { value: '180K+', label: 'Tickets Sold' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '50+', label: 'Cities' },
];

const FEATURES = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
        title: 'Secure & Trusted',
        desc: 'Industry-standard encryption keeps your payments and personal data protected at all times.',
        color: 'bg-violet-100 text-violet-600',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: 'Instant E-Tickets',
        desc: 'Receive your QR-code ticket immediately via email — no waiting, no hassle.',
        color: 'bg-amber-100 text-amber-600',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        ),
        title: 'Easy Management',
        desc: "Organizers get a powerful dashboard to track sales, manage events, and scan entries.",
        color: 'bg-emerald-100 text-emerald-600',
    },
];

const Home = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`${ROUTES.EVENT_LIST}?q=${encodeURIComponent(searchQuery)}`);
    };

    const handleBuyTicket = (event) => {
        navigate(ROUTES.EVENT_DETAILS.replace(':id', event.id));
    };

    return (
        <PublicLayout>
            {/* ========== HERO ========== */}
            <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #EEF2FF 0%, #E0E7FF 60%, #F5F3FF 100%)' }}>
                {/* Background deco */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-200/40 blur-3xl" />
                    <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-violet-200/40 blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <div className="max-w-4xl text-center mx-auto space-y-8 animate-fade-in-up">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 text-indigo-700 text-xs font-bold px-4 py-2 rounded-full shadow-sm">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                            2,400+ events live right now
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight">
                            Discover events<br />
                            <span style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                you'll love.
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            From concerts and conferences to food festivals and workshops — find your next unforgettable experience and book tickets in seconds.
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                            <div className="flex items-center bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden p-2 gap-2">
                                <div className="flex-1 flex items-center gap-3 px-3">
                                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        placeholder="Search events, artists, venues…"
                                        className="flex-1 py-3 text-gray-800 placeholder:text-gray-400 outline-none text-base font-medium bg-transparent"
                                    />
                                </div>
                                <Button type="submit" size="lg" variant="primary" className="rounded-xl flex-shrink-0">
                                    Search
                                </Button>
                            </div>
                        </form>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                            <Button size="xl" variant="primary" onClick={() => navigate(ROUTES.EVENT_LIST)}
                                rightIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
                            >
                                Browse All Events
                            </Button>
                            <Button size="xl" variant="white" onClick={() => navigate(ROUTES.REGISTER)}>
                                Start Hosting for Free
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== STATS ========== */}
            <section className="bg-gray-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {STATS.map(stat => (
                            <div key={stat.label} className="text-center">
                                <p className="text-3xl sm:text-4xl font-black text-white">{stat.value}</p>
                                <p className="text-gray-400 text-sm font-medium mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== UPCOMING EVENTS ========== */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                        <div>
                            <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-2">Don't miss out</p>
                            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Upcoming Events</h2>
                            <p className="text-gray-500 mt-2">Hand-picked experiences happening near you</p>
                        </div>
                        <Button variant="outline" size="md" onClick={() => navigate(ROUTES.EVENT_LIST)}>
                            View All Events
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MOCK_FEATURED_EVENTS.map((event, i) => (
                            <EventCard key={event.id} event={event} onBuyClick={handleBuyTicket} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== FEATURES ========== */}
            <section className="py-20" style={{ background: 'linear-gradient(160deg, #F8F9FC 0%, #EEF2FF 100%)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-2">Why EventPass?</p>
                        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Built for event lovers</h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto">Everything you need to find, book, and enjoy events — all in one elegant platform.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {FEATURES.map(f => (
                            <div key={f.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                                <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== CTA BANNER ========== */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' }}>
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10" />
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5" />
                        </div>
                        <div className="relative px-8 py-16 text-center space-y-6">
                            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Ready to host your event?</h2>
                            <p className="text-indigo-200 text-lg max-w-xl mx-auto">Join thousands of organizers who use EventPass to sell tickets and manage events effortlessly.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                                <Button size="xl" variant="white" onClick={() => navigate(ROUTES.REGISTER)}>
                                    Get Started for Free
                                </Button>
                                <Button size="xl" variant="outline" className="border-white/40 text-white hover:bg-white/10" onClick={() => navigate(ROUTES.LOGIN)}>
                                    Sign In
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
};

export default Home;
