import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    PieChart, Pie, Cell,
    RadialBarChart, RadialBar,
    AreaChart, Area,
} from 'recharts';
import { eventService } from '../../services/eventService';
import DashboardLoader from '../../components/ui/DashboardLoader';

// ─── Custom Tooltip ────────────────────────────────────────────────────────
const CustomBarTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl px-4 py-3 text-sm">
            <p className="font-black text-gray-900 mb-2">{label}</p>
            {payload.map(p => (
                <div key={p.name} className="flex items-center gap-2 text-xs font-bold" style={{ color: p.color }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                    {p.name}: <span className="text-gray-700 ml-1">{p.value?.toLocaleString()}</span>
                </div>
            ))}
        </div>
    );
};

const CustomPieTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl px-4 py-3 text-sm">
            <p className="font-black text-gray-900">{payload[0].name}</p>
            <p className="text-xs font-bold text-emerald-600 mt-1">${payload[0].value?.toLocaleString()}</p>
        </div>
    );
};

// ─── StatCard ─────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, bg, text, icon }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
            <span className={text}>{icon}</span>
        </div>
        <div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">{label}</p>
            <p className={`text-2xl font-black ${text}`}>{value}</p>
            {sub && <p className="text-xs text-gray-400 font-medium mt-0.5">{sub}</p>}
        </div>
    </div>
);

// ─── Section Header ───────────────────────────────────────────────────────
const SectionTitle = ({ title, sub }) => (
    <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-widest text-gray-400">{title}</p>
        {sub && <p className="text-sm text-gray-500 font-medium mt-0.5">{sub}</p>}
    </div>
);

const PALETTE = ['#6366f1', '#8b5cf6', '#f59e0b', '#10b981', '#f43f5e'];

// ─── Main Page ─────────────────────────────────────────────────────────────
const OrganizerReports = () => {
    const [reportData, setReportData] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            setIsLoading(true);
            try {
                const data = await eventService.getReports();
                setReportData(data);
                if (data.events.length > 0) {
                    setSelectedId(data.events[0].id);
                }
            } catch (err) {
                console.error('Error fetching report:', err);
                setError('Unable to load report data. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchReport();
    }, []);

    if (isLoading) {
        return <DashboardLoader message="Fetching your performance data..." />;
    }

    if (error) {
        return (
            <div className="py-24 text-center max-w-md mx-auto space-y-6 animate-in fade-in duration-700">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <div>
                   <h2 className="text-2xl font-black text-gray-900 tracking-tight">Report Failure</h2>
                   <p className="text-gray-500 mt-2 font-medium">{error}</p>
                </div>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
                >
                    Retry Fetch
                </button>
            </div>
        );
    }

    if (!reportData) return null;

    const { totalGross = 0, totalNet = 0, totalFees = 0, ticketsSold = 0, totalEvents = 0, totalCheckedIn = 0, events = [] } = reportData;

    // Derived fill rate from events
    const fillRate = events.length > 0
        ? (events.reduce((s, e) => s + e.ticketsSold, 0) / events.reduce((s, e) => s + e.totalTickets, 0)) * 100
        : 0;

    const salesData = events.map(e => ({
        name: e.title.split(' ').slice(0, 2).join(' '),
        fullName: e.title,
        sold: e.ticketsSold,
        revenue: e.netPayout,
    }));

    const pieData = events.map((e, i) => ({
        name: e.title.split(' ').slice(0, 2).join(' '),
        value: e.netPayout,
        color: PALETTE[i % PALETTE.length],
    }));

    const selectedDetail = events.find(e => e.id === selectedId) || events[0];

    return (
        <div className="max-w-6xl space-y-10">
            {/* Page Header */}
            <div>
                <p className="text-sm text-indigo-500 font-bold uppercase tracking-wider">Analytics</p>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight mt-1">Reports</h1>
                <p className="text-gray-500 mt-1">Platform-wide performance and individual event analytics.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <StatCard label="Net Payout" value={`$${totalNet.toLocaleString()}`} sub="After platform fees"
                    bg="bg-emerald-50" text="text-emerald-600"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
                />
                <StatCard label="Platform Fees" value={`$${totalFees.toLocaleString()}`} sub="Service charges"
                    bg="bg-indigo-50" text="text-indigo-600"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>}
                />
                <StatCard label="Avg Fill Rate" value={`${Math.round(fillRate)}%`} sub="Capacity reached"
                    bg="bg-amber-50" text="text-amber-600"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>}
                />
                <StatCard label="Total Events" value={totalEvents} sub="Active portfolio"
                    bg="bg-violet-50" text="text-violet-600"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>}
                />
                <StatCard label="Total Attendees" value={totalCheckedIn.toLocaleString()} sub="Checked-in count"
                    bg="bg-rose-50" text="text-rose-600"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>}
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Bar Chart */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <SectionTitle title="Revenue per Event" sub="Historical earnings" />
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#9ca3af' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} tickFormatter={v => `$${v}`} />
                            <Tooltip content={<CustomBarTooltip />} />
                            <Bar dataKey="revenue" fill="#6366f1" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Revenue Share Pie */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <SectionTitle title="Revenue Distribution" sub="Portfolio mix" />
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                                {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                            </Pie>
                            <Tooltip content={<CustomPieTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Event Drilldown */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <SectionTitle title="Event Detail" sub="Select an event for deep dive" />
                    <select
                        value={selectedId}
                        onChange={e => setSelectedId(Number(e.target.value))}
                        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    >
                        {events.map(ev => <option key={ev.id} value={ev.id}>{ev.title}</option>)}
                    </select>
                </div>

                {selectedDetail && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-1 space-y-4">
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                <h3 className="text-xl font-black text-slate-900">{selectedDetail.title}</h3>
                                <div className="mt-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 font-medium">Status</span>
                                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${selectedDetail.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>{selectedDetail.status}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-slate-500">Net Payout</span>
                                        <span className="text-emerald-600 font-black">${(selectedDetail.netPayout || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-slate-500">Platform Fee</span>
                                        <span className="text-rose-500">${(selectedDetail.platformFee || 0).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-slate-500">Fee Type</span>
                                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                            selectedDetail.feeType === 'ORGANIZER' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                                        }`}>{selectedDetail.feeType === 'ORGANIZER' ? 'You Pay Fee' : 'Buyer Pays Fee'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-slate-500">Tickets Sold</span>
                                        <span className="text-slate-900">{selectedDetail.ticketsSold.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-2 flex items-center justify-center">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-indigo-100 border-t-indigo-600 rotate-[45deg]">
                                    <div className="-rotate-[45deg] flex flex-col items-center">
                                        <span className="text-2xl font-black text-indigo-600">{selectedDetail.ticketsSold}</span>
                                        <span className="text-[10px] font-black text-gray-400 uppercase">sold</span>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm font-bold text-gray-400">Inventory Heatmap Placeholder</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrganizerReports;
