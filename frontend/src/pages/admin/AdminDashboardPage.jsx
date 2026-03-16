import React from 'react';
import AdminStatsCard from '../../components/admin/AdminStatsCard';
import { adminService } from '../../services/adminService';

const AdminDashboardPage = () => {
    const [realStats, setRealStats] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await adminService.getDashboardData();
                setRealStats(data);
            } catch (err) {
                console.error('Fetch admin dashboard error:', err);
                setError('Failed to load dashboard metrics. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const stats = [
        {
            label: 'Gross Volume', value: `$${(realStats?.totalGrossRevenue || 0).toLocaleString()}`, trend: 0, color: 'indigo', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            )
        },
        {
            label: 'Total Events', value: realStats?.totalEvents?.toLocaleString() || '0', trend: 0, color: 'emerald', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            label: 'Tickets Sold', value: realStats?.totalTicketsSold?.toLocaleString() || '0', trend: 0, color: 'amber', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            )
        },
        {
            label: 'Platform Revenue', value: `$${(realStats?.totalPlatformRevenue || 0).toLocaleString()}`, trend: 0, color: 'rose', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
    ];

    if (isLoading) {
        return (
            <div className="py-32 flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-gray-400 font-black uppercase tracking-widest text-xs animate-pulse">Syncing Dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-20 text-center space-y-6">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p className="text-gray-600 font-bold">{error}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-1">Operational Overview</h1>
                    <p className="text-gray-500 font-medium text-sm sm:text-base">System-wide performance and moderation health.</p>
                </div>
                {realStats?.pendingEvents > 0 && (
                    <div className="px-4 py-2 bg-amber-50 border border-amber-100 rounded-2xl flex items-center gap-3">
                        <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                        <span className="text-amber-700 text-sm font-black uppercase tracking-wider">{realStats.pendingEvents} Pending Reviews</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <AdminStatsCard key={i} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-8">
                {/* System Health Section */}
                <div className="bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm transition-all hover:shadow-md">
                    <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-indigo-600 rounded-full" />
                        Real-time Metrics
                    </h2>
                    <div className="space-y-6">
                        {[
                            { label: 'Active Organizers', value: realStats?.totalOrganizers || '0', status: 'Verified' },
                            { label: 'User Onboarding', value: realStats?.userGrowth || '0', status: 'Stable' },
                            { label: 'Pending Reviews', value: realStats?.pendingEvents || '0', status: 'Action Required' },
                            { label: 'Event Creation', value: realStats?.eventGrowth || '0', status: 'Optimal' },
                        ].map((m, i) => (
                            <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-gray-50 last:border-0">
                                <span className="text-gray-500 font-medium text-sm">{m.label}</span>
                                <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
                                    <span className="font-bold text-gray-900 text-sm">{m.value}</span>
                                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                        m.status === 'Optimal' || m.status === 'Verified' || m.status === 'Stable' 
                                            ? 'bg-emerald-50 text-emerald-600' 
                                            : 'bg-amber-50 text-amber-600'
                                    }`}>
                                        {m.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm transition-all hover:shadow-md">
                    <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-emerald-500 rounded-full" />
                        Recent Events
                    </h2>
                    <div className="space-y-6">
                        {realStats?.recentEvents?.length > 0 ? (
                            realStats.recentEvents.map((event, i) => (
                                <div key={i} className="flex items-center justify-between gap-4 group">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[12px] font-black text-indigo-600 overflow-hidden group-hover:bg-indigo-50 transition-colors">
                                            {event.image ? (
                                                <img src={event.image} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                event.title.charAt(0)
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-bold text-gray-900 text-sm truncate">{event.title}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{event.organizerName}</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-[10px] text-gray-400 font-medium">{new Date(event.createdAt).toLocaleDateString()}</p>
                                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter ${
                                            event.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' : 
                                            event.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                                        }`}>
                                            {event.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-10 text-center text-gray-400 text-sm font-medium italic">No recent events found.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
