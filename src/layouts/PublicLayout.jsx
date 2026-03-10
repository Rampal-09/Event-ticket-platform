import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../router/routes';

const NAV_LINKS = [
    { label: 'Events', href: '/events' },
    { label: 'FAQ', href: '/faq' },
    { label: 'About', href: '#' },
];

const PublicLayout = ({ children }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleAdminLogin = () => {
        sessionStorage.setItem('ep_auth', 'true');
        sessionStorage.setItem('ep_role', 'admin');
        navigate(ROUTES.ADMIN_EVENTS);
    };

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
                        <Link to="/" className="flex items-center py-1 group">
                            <img
                                src="/logo/eventhubix-logo.png"
                                alt="EventHubix Logo"
                                className="h-32 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
                            />
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {NAV_LINKS.map(link => (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                >
                                    {link.label}
                                </Link>
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
                            <button
                                onClick={handleAdminLogin}
                                className="text-sm font-semibold text-white bg-slate-800 hover:bg-slate-900 px-4 py-2 rounded-lg shadow-sm transition-all hover:shadow-md"
                            >
                                Login as Admin
                            </button>
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
                            <Link key={link.label} to={link.href} className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                            <Link to="/login" className="block text-center px-4 py-2.5 text-sm font-semibold border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">Sign In</Link>
                            <Link to="/register" className="block text-center px-4 py-2.5 text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Host an Event</Link>
                            <button
                                onClick={handleAdminLogin}
                                className="block text-center px-4 py-2.5 text-sm font-semibold bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors"
                            >
                                Login as Admin
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Spacer for fixed navbar */}
            <div className="h-16" />

            {/* Main Content */}
            <main className="flex-grow">
                {children || <Outlet />}
            </main>

            {/* ====== FOOTER ====== */}
            <div className="border-t border-gray-200" />
            <footer style={{ background: '#F8F9FC' }} className="text-gray-500 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-12">

                        {/* Brand column */}
                        <div className="col-span-2 lg:col-span-1">
                            <Link to="/" className="flex items-center mb-1 group">
                                <img
                                    src="/logo/eventhubix-logo.png"
                                    alt="EventHubix Logo"
                                    className="h-20 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-200"
                                />
                            </Link>
                            <p className="text-sm leading-relaxed text-gray-500 max-w-[220px]">
                                Discover and book tickets to the best events near you — all in one place.
                            </p>
                        </div>

                        {/* Explore */}
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-5">Explore</p>
                            <ul className="space-y-3 text-sm">
                                <li><Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</Link></li>
                                <li><Link to="/events" className="text-gray-600 hover:text-indigo-600 transition-colors">Browse Events</Link></li>
                            </ul>
                        </div>

                        {/* Organizers */}
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-5">Organizers</p>
                            <ul className="space-y-3 text-sm">
                                <li><Link to="/register" className="text-gray-600 hover:text-indigo-600 transition-colors">Get Started</Link></li>
                                <li><Link to="/login" className="text-gray-600 hover:text-indigo-600 transition-colors">Sign In</Link></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-5">Support</p>
                            <ul className="space-y-3 text-sm">
                                <li><Link to="/faq" className="text-gray-600 hover:text-indigo-600 transition-colors">FAQ</Link></li>
                                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Help Center</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-gray-400 font-medium">
                            &copy; {new Date().getFullYear()} EventHubix. All rights reserved.
                        </p>
                        <p className="text-xs text-gray-400">Built for event lovers everywhere.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
