import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
    { label: 'Events', href: '/events' },
    { label: 'About', href: '#' },
];

const PublicLayout = ({ children }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => { setMobileOpen(false); }, [pathname]);

    return (
        <div className="min-h-screen flex flex-col" style={{ background: '#F8F9FC' }}>
            {/* ====== NAVBAR ====== */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100'
                    : 'bg-white border-b border-gray-100'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a1 1 0 01-1 1H3a1 1 0 01-1-1V6zm0 5a1 1 0 011-1h14a1 1 0 011 1v3a2 2 0 01-2 2H4a2 2 0 01-2-2v-3z" />
                                </svg>
                            </div>
                            <span className="text-xl font-extrabold text-gray-900 tracking-tight">Event<span className="text-indigo-600">Pass</span></span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {NAV_LINKS.map(link => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* Auth Buttons */}
                        <div className="hidden md:flex items-center gap-3">
                            <Link to="/login" className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
                                Sign In
                            </Link>
                            <Link to="/register" className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg shadow-sm shadow-indigo-200 transition-all hover:shadow-md">
                                Host an Event
                            </Link>
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setMobileOpen(o => !o)}
                            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileOpen
                                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                }
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-lg">
                        {NAV_LINKS.map(link => (
                            <a key={link.label} href={link.href} className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                                {link.label}
                            </a>
                        ))}
                        <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                            <Link to="/login" className="block text-center px-4 py-2.5 text-sm font-semibold border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">Sign In</Link>
                            <Link to="/register" className="block text-center px-4 py-2.5 text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Host an Event</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Spacer for fixed navbar */}
            <div className="h-16" />

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* ====== FOOTER ====== */}
            <footer className="bg-gray-900 text-gray-400 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a1 1 0 01-1 1H3a1 1 0 01-1-1V6zm0 5a1 1 0 011-1h14a1 1 0 011 1v3a2 2 0 01-2 2H4a2 2 0 01-2-2v-3z" />
                                    </svg>
                                </div>
                                <span className="text-white font-bold text-lg">EventPass</span>
                            </div>
                            <p className="text-sm leading-relaxed">Discover and book tickets to the best events near you — all in one place.</p>
                        </div>
                        <div>
                            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Explore</p>
                            <ul className="space-y-2.5 text-sm">
                                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                                <li><a href="/events" className="hover:text-white transition-colors">Browse Events</a></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Organizers</p>
                            <ul className="space-y-2.5 text-sm">
                                <li><a href="/register" className="hover:text-white transition-colors">Get Started</a></li>
                                <li><a href="/login" className="hover:text-white transition-colors">Sign In</a></li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</p>
                            <ul className="space-y-2.5 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-sm">&copy; {new Date().getFullYear()} EventPass. All rights reserved.</p>
                        <p className="text-xs">Built for event lovers everywhere.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
