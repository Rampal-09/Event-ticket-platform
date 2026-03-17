import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';

const Dashboard = () => {
    const { formatPrice } = useCurrency();
    const [stats, setStats] = React.useState([]);
    const [topEvents, setTopEvents] = React.useState([]);
    const [recentSales, setRecentSales] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const loadDashboardData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const report = await eventService.getReports();
            
            setStats([
                { label: 'Total Events', value: report.totalEvents || 0, change: 'Lifetime Hosting', icon: '📅', bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100' },
                { label: 'Tickets Sold', value: (report.ticketsSold || 0).toLocaleString(), change: 'Global Audience', icon: '🎟️', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
                { label: 'Net Payout', value: formatPrice(report.totalNet || 0), change: 'Actual Earnings', icon: '💰', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
                { label: 'Platform Fees', value: formatPrice(report.totalFees || 0), change: 'Service Charges', icon: '🏦', bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' },
            ]);

            setTopEvents(report.events ? report.events.slice(0, 3) : []);
            setRecentSales(report.recentSales || []);
        } catch (err) {
            console.error('Dashboard load error:', err);
            setError('Failed to load dashboard data. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        loadDashboardData();
    }, []);

    const QUICK_ACTIONS = [
        { label: 'New Event', icon: '➕', href: '/organizer/create-event', color: 'bg-indigo-600 text-white hover:bg-indigo-700' },
        { label: 'My Events', icon: '📂', href: '/organizer/my-events', color: 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200' },
        { label: 'QR Scanner', icon: '📷', href: '/scanner', color: 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200' },
        { label: 'Reports', icon: '📊', href: '/organizer/reports', color: 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-200' },
    ];

    if (isLoading) {
        return <div className="p-10 text-center font-bold text-gray-400">Loading Dashboard...</div>;
    }

    return (
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

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl font-bold">
                    {error}
                </div>
            )}

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {stats.map(stat => (
                    <div key={stat.label} className={`bg-white rounded-2xl p-4 sm:p-5 border ${stat.border} hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group`}>
                        <div className="flex items-start justify-between">
                            <div className="min-w-0">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 truncate">{stat.label}</p>
                                <p className="text-2xl sm:text-3xl font-black text-gray-900 mt-2 truncate">{stat.value}</p>
                                <p className={`text-[10px] sm:text-xs font-semibold mt-1.5 ${stat.text} truncate`}>{stat.change}</p>
                            </div>
                            <div className={`${stat.bg} ${stat.text} w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 transition-transform group-hover:scale-110`}>
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
                <Card title="Recent Sales" subtitle="Latest tickets sold" headerAction={<Link to="/organizer/my-events" className="text-xs font-semibold text-indigo-600 hover:underline">View all</Link>}>
                    <div className="space-y-4">
                        {recentSales.length > 0 ? recentSales.map((sale, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xs">
                                        {sale.buyerName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{sale.buyerName}</p>
                                        <p className="text-[10px] font-medium text-gray-500 truncate max-w-[150px]">{sale.event.title}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Admitted</p>
                                    <p className="text-[9px] font-medium text-gray-400 mt-0.5">
                                        {new Date(sale.purchasedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        )) : (
                            <div className="p-8 text-center text-gray-400 font-medium italic">No recent sales data available.</div>
                        )}
                    </div>
                </Card>

                {/* Top Events */}
                <Card title="Top Events" subtitle="By tickets sold" headerAction={<Link to="/organizer/my-events" className="text-xs font-semibold text-indigo-600 hover:underline">Manage</Link>}>
                    <div className="space-y-4">
                        {topEvents.length > 0 ? topEvents.map((event, i) => {
                            const pct = Math.round((event.ticketsSold / (event.totalTickets || 1)) * 100);
                            return (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-semibold text-gray-800 truncate">{event.title}</span>
                                        <div className="flex flex-col items-end">
                                            <span className="font-bold text-indigo-600 flex-shrink-0 ml-2">{formatPrice(event.netPayout || 0)}</span>
                                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Net Payout</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all ${pct >= 90 ? 'bg-red-500' : pct >= 60 ? 'bg-amber-500' : 'bg-indigo-600'}`}
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-gray-400 font-bold flex-shrink-0 w-14 text-right">
                                            {event.ticketsSold.toLocaleString()} sold
                                        </span>
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="text-center text-gray-400 py-4 italic">No events found.</div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
