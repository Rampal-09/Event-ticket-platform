import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';

const ADMIN_NAV = [
    {
        label: 'Dashboard',
        href: '/admin',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a1 1 0 01-1 1H5a1 1 0 01-1-1V6zM16 6a2 2 0 012-2h2a2 2 0 012 2v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zM16 16a2 2 0 012-2h2a2 2 0 012 2v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z" />
            </svg>
        ),
    },
    {
        label: 'Event Moderation',
        href: '/admin/events',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        ),
    },
    {
        label: 'User Management',
        href: '/admin/users',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
    },
    {
        label: 'Review History',
        href: '/admin/review-history',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

const AdminLayout = ({ children }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
        <aside className="w-64 bg-slate-900 text-white flex flex-col h-dvh overflow-y-auto md:overflow-y-hidden sticky top-0">
            <div className="flex-shrink-0 p-6 border-b border-white/5">
                <Link to="/" onClick={() => setMobileSidebarOpen(false)} className="flex items-center justify-center w-full bg-white/5 px-3 py-2 rounded-xl hover:bg-white/10 transition-colors">
                    <img
                        src="/logo/eventhubix-logo.png"
                        alt="EventHubix Logo"
                        className="h-20 w-auto object-contain brightness-110 drop-shadow-md"
                    />
                </Link>
            </div>

            <nav className="flex-none md:flex-1 p-4 space-y-1 md:overflow-y-auto">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-4 mb-3">Admin Control</p>
                {ADMIN_NAV.map(item => (
                    <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${pathname === item.href
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="flex-shrink-0 p-4 border-t border-white/5 space-y-2">
                <Link to="/" onClick={() => setMobileSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Site
                </Link>
                <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 w-full transition-colors text-left">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </div>
        </aside>
    );

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden md:block flex-shrink-0">
                <Sidebar />
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileSidebarOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
                    <div className="relative z-10 transition-transform duration-300">
                        <Sidebar />
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-auto">
                {/* Header */}
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
                        <h2 className="text-lg font-bold text-gray-800 hidden sm:block">Operational Overview</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden xs:block">
                            <p className="text-xs font-bold text-gray-900">Platform Admin</p>
                            <p className="text-[10px] text-gray-500 font-medium">Superuser Access</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-black border border-slate-200 shadow-sm">A</div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {children || <Outlet />}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;

