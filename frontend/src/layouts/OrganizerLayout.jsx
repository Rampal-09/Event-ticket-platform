import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet, Navigate } from 'react-router-dom';

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
        label: 'Reports',
        href: '/organizer/reports',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    // Auth Guard
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userRole = user?.role?.toUpperCase();

    if (!token || userRole !== 'ORGANIZER') {
        return <Navigate to="/" replace />;
    }

    useEffect(() => {
        if (mobileSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileSidebarOpen]);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const Sidebar = () => (
        <aside className="w-64 bg-slate-900 text-white flex flex-col h-dvh sticky top-0 z-50 overflow-y-auto md:overflow-y-hidden">
            <div className="flex-shrink-0 p-6 border-b border-white/5">
                <Link 
                    to="/" 
                    onClick={() => setMobileSidebarOpen(false)} 
                    className="flex items-center justify-center w-full h-20 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                    <img
                        src="/logo/eventhubix-logo.png"
                        alt="EventHubix Logo"
                        className="h-24 w-auto object-contain brightness-110 drop-shadow-md scale-[1.5]"
                    />
                </Link>
            </div>

            <nav className="flex-none md:flex-1 p-3 space-y-1.5 md:overflow-y-auto mt-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 h-4 mb-2">
                    Event Management
                </p>
                {NAV_ITEMS.map(item => (
                    <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${pathname === item.href
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <div className="flex-shrink-0 w-6 flex items-center justify-center">
                            {item.icon}
                        </div>
                        <span className="whitespace-nowrap">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="flex-shrink-0 p-3 border-t border-white/5 space-y-1.5 bg-slate-900/50 backdrop-blur-sm">
                <Link 
                    to="/" 
                    onClick={() => setMobileSidebarOpen(false)} 
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all duration-300"
                >
                    <div className="flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </div>
                    <span>Back to Site</span>
                </Link>
                <button 
                    onClick={handleSignOut} 
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 w-full transition-all duration-300 text-left"
                >
                    <div className="flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <div className="hidden md:block flex-shrink-0 w-64">
                <Sidebar />
            </div>

            {mobileSidebarOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
                    <div className="relative z-10 transition-transform duration-300 h-full">
                        <Sidebar />
                    </div>
                </div>
            )}

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 flex-shrink-0 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileSidebarOpen(true)}
                            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div className="flex flex-col">
                            <h2 className="text-lg font-bold text-gray-800 hidden sm:block">Organizer Dashboard</h2>
                            <p className="text-[10px] text-gray-400 font-semibold hidden sm:block">Event Management Console</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-green-50 text-green-700 text-[10px] font-bold px-3 py-1.5 rounded-full border border-green-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            Live
                        </div>
                        <div className="text-right hidden xs:block">
                            <p className="text-xs font-bold text-gray-900">{user?.name || 'Organizer'}</p>
                            <p className="text-[10px] text-gray-500 font-medium">{user?.email || 'organizer@event.com'}</p>
                        </div>
                        
                        <div className="relative profile-dropdown-container">
                            <button 
                                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-black border border-slate-200 shadow-sm hover:ring-4 hover:ring-slate-50 transition-all cursor-pointer"
                            >
                                {user?.name?.[0] || 'O'}
                            </button>

                            {profileMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setProfileMenuOpen(false)} />
                                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                        <div className="px-4 py-3 border-b border-gray-50">
                                            <p className="text-xs font-bold text-gray-900 truncate">{user?.name || 'Organizer'}</p>
                                            <p className="text-[10px] text-gray-500 truncate">{user?.email || 'organizer@eventhubix.com'}</p>
                                        </div>
                                        <Link 
                                            to="/organizer/settings" 
                                            onClick={() => setProfileMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                                        >
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Profile Settings
                                        </Link>
                                        <div className="border-t border-gray-50 mt-1">
                                            <button 
                                                onClick={handleSignOut}
                                                className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors font-medium"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto bg-gray-50/50">
                    <main className="p-4 sm:p-6 lg:p-8">
                        {children || <Outlet />}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default OrganizerLayout;
