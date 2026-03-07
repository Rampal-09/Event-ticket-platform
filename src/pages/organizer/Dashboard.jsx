import React from 'react';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const STATS = [
    { label: 'Total Events', value: '12', change: '+2 this month', icon: '📅', bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100' },
    { label: 'Tickets Sold', value: '1,248', change: '+84 this week', icon: '🎟️', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
    { label: 'Total Revenue', value: '$45,200', change: '+$3,400 today', icon: '💰', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
    { label: 'Upcoming Events', value: '5', change: 'Next: Jul 15', icon: '⏳', bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-100' },
];

const QUICK_ACTIONS = [
    { label: 'New Event', icon: '➕', href: '/organizer/create-event', color: 'bg-indigo-600 text-white hover:bg-indigo-700' },
    { label: 'My Events', icon: '📂', href: '/organizer/my-events', color: 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200' },
    { label: 'QR Scanner', icon: '📷', href: '/scanner', color: 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200' },
    { label: 'Reports', icon: '📊', href: '#', color: 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200' },
];

const RECENT_SALES = [
    { name: 'John Smith', email: 'john@example.com', event: 'Summer Music Festival', qty: 2, amount: 240, time: '2 min ago' },
    { name: 'Sarah Kay', email: 'sarah@example.com', event: 'Tech Innovators Conf.', qty: 1, amount: 250, time: '18 min ago' },
    { name: 'Mike Chen', email: 'mike@example.com', event: 'Culinary Arts Expo', qty: 3, amount: 225, time: '45 min ago' },
    { name: 'Emma Davis', email: 'emma@example.com', event: 'Summer Music Festival', qty: 2, amount: 240, time: '1 hr ago' },
];

const TOP_EVENTS = [
    { name: 'Summer Music Festival 2026', sold: 4500, capacity: 5000, revenue: '$540,000' },
    { name: 'Tech Innovators Conference', sold: 800, capacity: 1200, revenue: '$200,000' },
    { name: 'Culinary Arts Expo', sold: 600, capacity: 800, revenue: '$45,000' },
];

const Dashboard = () => {
    return (
        <OrganizerLayout>
            <div className="space-y-8 max-w-screen-xl">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Overview</p>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight mt-1">Dashboard</h1>
                    </div>
                    <Link to="/organizer/create-event">
                        <Button variant="primary" leftIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>}>
                            Create Event
                        </Button>
                    </Link>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    {STATS.map(stat => (
                        <div key={stat.label} className={`bg-white rounded-2xl p-5 border ${stat.border} hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}>
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
                                    <p className="text-3xl font-black text-gray-900 mt-2">{stat.value}</p>
                                    <p className={`text-xs font-semibold mt-1.5 ${stat.text}`}>{stat.change}</p>
                                </div>
                                <div className={`${stat.bg} ${stat.text} w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {QUICK_ACTIONS.map(action => (
                        <Link key={action.label} to={action.href}>
                            <div className={`flex flex-col items-center gap-2 py-5 px-4 rounded-2xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer text-center ${action.color}`}>
                                <span className="text-2xl">{action.icon}</span>
                                {action.label}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Recent Sales */}
                    <Card title="Recent Sales" subtitle="Last 24 hours" headerAction={<Link to="/organizer/my-events" className="text-xs font-semibold text-indigo-600 hover:underline">View all</Link>}>
                        <div className="space-y-1 -mx-6 -mb-6">
                            {RECENT_SALES.map((sale, i) => (
                                <div key={i} className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                                            {sale.name[0]}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-sm text-gray-900 truncate">{sale.name}</p>
                                            <p className="text-xs text-gray-400 truncate">{sale.event} · {sale.qty} ticket{sale.qty > 1 ? 's' : ''}</p>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 text-right ml-4">
                                        <p className="text-sm font-bold text-emerald-600">+${sale.amount}</p>
                                        <p className="text-[10px] text-gray-400 font-medium">{sale.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Top Events */}
                    <Card title="Top Events" subtitle="By tickets sold" headerAction={<Link to="/organizer/my-events" className="text-xs font-semibold text-indigo-600 hover:underline">Manage</Link>}>
                        <div className="space-y-4">
                            {TOP_EVENTS.map((event, i) => {
                                const pct = Math.round((event.sold / event.capacity) * 100);
                                return (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="font-semibold text-gray-800 truncate">{event.name}</span>
                                            <span className="font-bold text-indigo-600 flex-shrink-0 ml-2">{event.revenue}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all ${pct >= 90 ? 'bg-red-500' : pct >= 60 ? 'bg-amber-500' : 'bg-indigo-600'}`}
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-gray-400 font-bold flex-shrink-0 w-14 text-right">
                                                {event.sold.toLocaleString()} / {event.capacity.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>
            </div>
        </OrganizerLayout>
    );
};

export default Dashboard;
