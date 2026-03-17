import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import EventCard from '../../components/events/EventCard';
import heroBg from '../../assets/images/hero-bg.png';
import { ROUTES } from '../../router/routes';
import { MOCK_EVENTS } from '../../data/mockEvents';
import PlatformFeatures from '../../components/home/PlatformFeatures';

import PricingSection from '../../components/home/PricingSection';
import TrustBanner from '../../components/home/TrustBanner';
import EventCategories from '../../components/home/EventCategories';
import HowPlatformWorks from '../../components/home/HowPlatformWorks';
import { eventService } from '../../services/eventService';

const FEATURES = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
        title: 'Secure & Trusted',
        desc: 'Industry-standard encryption keeps your payments and personal data protected at all times.',
        color: 'bg-indigo-100 text-indigo-600',
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
    const [featuredEvents, setFeaturedEvents] = useState([]);
    const [stats, setStats] = useState({ totalEvents: 0, totalTicketsSold: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const [eventsData, statsData] = await Promise.all([
                    eventService.getPublicEvents(),
                    eventService.getPublicStats()
                ]);
                setFeaturedEvents(eventsData.slice(0, 3));
                setStats(statsData);
            } catch (err) {
                console.error('Home data load error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHomeData();
    }, []);

    const STAT_ITEMS = [
        { value: `${(stats.totalEvents || 0).toLocaleString()}+`, label: 'Events Listed' },
        { value: `${(stats.totalTicketsSold || 0).toLocaleString()}+`, label: 'Tickets Sold' },
        { value: '98%', label: 'Satisfaction Rate' },
        { value: '50+', label: 'Cities' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`${ROUTES.EVENT_LIST}?q=${encodeURIComponent(searchQuery)}`);
    };

    const handleBuyTicket = (event) => {
        navigate(ROUTES.EVENT_DETAILS.replace(':id', event.id));
    };

    return (
        <div className="bg-white">
            {/* ========== HERO ========== */}
            <section
                className="relative overflow-hidden bg-gray-900"
                style={{ minHeight: '65vh' }}
            >
                {/* Image background with specialized styling */}
                <div className="absolute inset-0 z-0">
                    <img src={heroBg} className="w-full h-full object-cover opacity-50" alt="Concert Crowd" />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/80 to-gray-900" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                    <div className="max-w-4xl space-y-10 animate-fade-in">
                        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                            {/* <span className="text-[10px] font-black uppercase tracking-widest text-white/90">{(stats.totalEvents || 0).toLocaleString()}+ Live Experiences</span> */}
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/90">An Australian-owned ticketing platform built for local events and communities</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
                            Discover and Host <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">unforgettable</span> events.
                        </h1>

                        <p className="text-base sm:text-lg md:text-2xl text-gray-400 max-w-2xl leading-relaxed font-medium">
                            Join millions of people finding concerts, workshops, and festivals. Secure your spot in seconds.
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="max-w-2xl">
                            <div className="flex flex-col sm:flex-row bg-white rounded-3xl p-2 gap-2 shadow-2xl shadow-indigo-500/10">
                                <div className="flex-1 flex items-center gap-4 px-5">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        placeholder="Search by event, artist or city..."
                                        className="flex-1 py-4 text-gray-800 placeholder:text-gray-400 outline-none text-base font-bold bg-transparent"
                                    />
                                </div>
                                <Button type="submit" size="xl" variant="primary" className="rounded-2xl px-10 bg-indigo-600 hover:bg-indigo-700">
                                    Browse Events
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* ========== STATS STRIP ========== */}
            <div className="bg-gray-900 border-t border-white/5 py-12 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {STAT_ITEMS.map(stat => (
                            <div key={stat.label} className="flex flex-col items-center sm:items-start">
                                <p className="text-4xl font-black text-white leading-none">{stat.value}</p>
                                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ========== UPCOMING SECTION ========== */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                        <div className="space-y-3">
                            <p className="text-indigo-600 text-xs font-black uppercase tracking-widest">Handmade Selection</p>
                            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-none">Happening Soon</h2>
                        </div>
                        <Button variant="outline" size="lg" onClick={() => navigate(ROUTES.EVENT_LIST)} className="px-8 border-2">
                            Explore All
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredEvents.map((event, i) => (
                            <EventCard key={event.id} event={event} onBuyClick={handleBuyTicket} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== EVENT CATEGORIES ========== */}
            <EventCategories />

            {/* ========== FEATURES SECTION ========== */}
            <section className="py-24 bg-gray-50/50 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {FEATURES.map(f => (
                            <div key={f.title} className="bg-white rounded-[2rem] p-10 shadow-sm border border-gray-100 group hover:shadow-2xl transition-all duration-500">
                                <div className={`w-16 h-16 ${f.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                    {f.icon}
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4">{f.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-medium">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== CTA SECTION ========== */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-[3rem] overflow-hidden bg-indigo-600 p-12 sm:p-20 text-center shadow-2xl shadow-indigo-100">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/50 to-transparent pointer-events-none" />
                        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                            <h2 className="text-4xl sm:text-6xl font-black text-white leading-tight">Ready to host your next event?</h2>
                            <p className="text-indigo-100 text-lg font-medium leading-relaxed">
                                Join thousands of organizers using EventPass to sell tickets, manage entries, and scale their experiences.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="xl" variant="white" onClick={() => navigate(ROUTES.REGISTER)} className="font-black text-indigo-600">
                                    Start Hosting Now
                                </Button>
                                <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold" onClick={() => navigate(ROUTES.LOGIN)}>
                                    Sign In to Dashboard
                                </Button>
                            </div>
                        </div>
                        {/* Decorative background shapes */}
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl" />
                    </div>
                </div>
            </section>

            {/* ========== PLATFORM FEATURES ========== */}
            <PlatformFeatures />

            {/* ========== HOW IT WORKS ========== */}
            <HowPlatformWorks />



            {/* ========== PRICING ========== */}
            <PricingSection />

            {/* ========== TRUST BANNER ========== */}
            <TrustBanner />

            {/* ========== SUPPORT STAFF SECTION ========== */}
            <section className="py-12 bg-gray-900 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative">
                     <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 pointer-events-none rounded-3xl" />
                    <div className="relative z-10 text-center sm:text-left space-y-2">
                        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Need extra hands?</h3>
                        <p className="text-indigo-200 font-medium max-w-lg leading-relaxed">Want to hire supportive staff for your upcoming event? We've got you covered with trained professionals.</p>
                    </div>
                    <div className="relative z-10 whitespace-nowrap">
                         <a 
                             href="mailto:support@eventticketplatform.com.au" 
                             className="inline-block bg-indigo-600 text-white font-black px-8 py-3 rounded-2xl transition-all duration-300 hover:bg-indigo-500 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(99,102,241,0.3)]"
                         >
                            Contact Us
                         </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
