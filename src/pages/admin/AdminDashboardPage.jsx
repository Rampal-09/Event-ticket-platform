import React from 'react';
import AdminStatsCard from '../../components/admin/AdminStatsCard';
import { MOCK_EVENTS } from '../../data/mockEvents';

const AdminDashboardPage = () => {
    // Mock data for dashboard
    const stats = [
        {
            label: 'Total Users', value: '1,284', trend: 12, color: 'indigo', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        {
            label: 'Total Events', value: Object.keys(MOCK_EVENTS).length, trend: 8, color: 'emerald', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            label: 'Pending Reviews', value: '3', trend: -15, color: 'amber', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            )
        },
        {
            label: 'Approved Tickets', value: '45.2K', trend: 24, color: 'rose', icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
            )
        },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-1">Operational Overview</h1>
                    <p className="text-gray-500 font-medium text-sm sm:text-base">System-wide performance and moderation health.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <AdminStatsCard key={i} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-8">
                {/* Recent Activity Mockup */}
                <div className="bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                        System Health
                    </h2>
                    <div className="space-y-6">
                        {[
                            { label: 'API Response', value: '42ms', status: 'Optimal' },
                            { label: 'DB Load', value: '18%', status: 'Optimal' },
                            { label: 'Storage', value: '64%', status: 'Normal' },
                            { label: 'Error Rate', value: '0.02%', status: 'Optimal' },
                        ].map((m, i) => (
                            <div key={i} className="flex items-center justify-between gap-4">
                                <span className="text-gray-500 font-medium text-sm">{m.label}</span>
                                <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
                                    <span className="font-bold text-gray-900 text-sm whitespace-nowrap">{m.value}</span>
                                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">{m.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                        Recent Activity
                    </h2>
                    <div className="space-y-6">
                        {[
                            { user: 'Liam Wilson', role: 'Admin', time: '2 mins ago' },
                            { user: 'Emma Davis', role: 'Organizer', time: '12 mins ago' },
                            { user: 'Noah Smith', role: 'Staff', time: '45 mins ago' },
                            { user: 'Olivia Brown', role: 'Attendee', time: '1 hour ago' },
                        ].map((l, i) => (
                            <div key={i} className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black flex-shrink-0">{l.user.charAt(0)}</div>
                                    <span className="font-bold text-gray-900 text-sm truncate">{l.user}</span>
                                </div>
                                <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{l.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
