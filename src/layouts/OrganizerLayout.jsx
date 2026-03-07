import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
    {
        label: 'Dashboard',
        href: '/organizer',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        label: 'Create Event',
        href: '/organizer/create-event',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
        ),
    },
    {
        label: 'My Events',
        href: '/organizer/my-events',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        label: 'QR Scanner',
        href: '/scanner',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
];

const OrganizerLayout = ({ children }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleSignOut = () => {
        sessionStorage.removeItem('ep_auth');
        sessionStorage.removeItem('ep_role');
        navigate('/login');
    };
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const Sidebar = () => (
        <aside className="w-64 bg-gray-950 text-white flex flex-col h-screen sticky top-0">
            {/* Brand */}
            <div className="px-6 py-5 border-b border-white/10">
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900 group-hover:scale-105 transition-transform">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a1 1 0 01-1 1H3a1 1 0 01-1-1V6zm0 5a1 1 0 011-1h14a1 1 0 011 1v3a2 2 0 01-2 2H4a2 2 0 01-2-2v-3z" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-extrabold text-white text-base leading-tight">EventPass</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Organizer</p>
                    </div>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 px-3 mb-3">Navigation</p>
                {NAV_ITEMS.map(item => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${isActive
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="px-3 py-4 border-t border-white/10 space-y-1">
                <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-white/5 hover:text-gray-300 text-sm font-medium transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Site
                </Link>
                <button onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-900/20 hover:text-red-300 text-sm font-medium transition-all w-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                </button>
                <div className="mt-3 mx-2 p-3 rounded-xl bg-white/5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">O</div>
                    <div className="min-w-0">
                        <p className="text-white text-sm font-semibold truncate">Organizer</p>
                        <p className="text-gray-500 text-xs truncate">organizer@event.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Desktop Sidebar */}
            <div className="hidden md:block flex-shrink-0">
                <Sidebar />
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileSidebarOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
                    <div className="relative z-10">
                        <Sidebar />
                    </div>
                </div>
            )}

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0 overflow-auto">
                {/* Top Header */}
                <header className="flex-shrink-0 bg-white border-b border-gray-100 px-6 lg:px-8 h-16 flex items-center justify-between sticky top-0 z-30 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileSidebarOpen(true)}
                            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full border border-green-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            Live
                        </div>
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">O</div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default OrganizerLayout;
