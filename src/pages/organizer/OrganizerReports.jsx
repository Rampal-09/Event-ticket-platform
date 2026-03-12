import React, { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    PieChart, Pie, Cell,
    RadialBarChart, RadialBar,
    AreaChart, Area,
} from 'recharts';
import { MOCK_EVENTS } from '../../data/mockEvents';

// ─── Data derivation ──────────────────────────────────────────────────────
const events = Object.values(MOCK_EVENTS);

const totalRevenue  = events.reduce((s, e) => s + e.tickets_sold * e.ticket_price, 0);
const totalSold     = events.reduce((s, e) => s + e.tickets_sold, 0);
const totalCapacity = events.reduce((s, e) => s + e.total_tickets, 0);
const avgFill       = Math.round((totalSold / totalCapacity) * 100);

// Chart-ready datasets
const salesData = events.map(e => ({
    name: e.title.split(' ').slice(0, 2).join(' '),   // short label
    fullName: e.title,
    sold: e.tickets_sold,
    remaining: e.total_tickets - e.tickets_sold,
    capacity: e.total_tickets,
    revenue: e.tickets_sold * e.ticket_price,
    fill: Math.round((e.tickets_sold / e.total_tickets) * 100),
}));

const pieData = events.map(e => ({
    name: e.title.split(' ').slice(0, 2).join(' '),
    value: e.tickets_sold * e.ticket_price,
    color: e.accentColor,
}));

const PALETTE = ['#6366f1', '#8b5cf6', '#f59e0b', '#10b981', '#f43f5e'];

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

// ─── Main Page ─────────────────────────────────────────────────────────────
const OrganizerReports = () => {
    const [selectedId, setSelectedId] = useState(events[0].id);
    const selected = MOCK_EVENTS[selectedId];

    const revenue   = selected.tickets_sold * selected.ticket_price;
    const fillPct   = Math.round((selected.tickets_sold / selected.total_tickets) * 100);
    const remaining = selected.total_tickets - selected.tickets_sold;
    const isSoldOut = remaining === 0;
    const isFast    = !isSoldOut && remaining <= selected.total_tickets * 0.2;

    // Area chart — simulated weekly ticket sales for selected event
    const weeks = ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8'];
    const totalForArea = selected.tickets_sold;
    const areaData = weeks.map((w, i) => {
        const raw = Math.round(totalForArea * (0.05 + i * 0.13 + Math.sin(i) * 0.04));
        return { week: w, tickets: Math.max(0, Math.min(raw, totalForArea)) };
    });

    // Radial fill data for individual event
    const radialData = [{ name: 'Fill', value: fillPct, fill: selected.accentColor }];

    return (
        <div className="max-w-6xl space-y-10">

            {/* ── Page Header ─────────────────── */}
            <div>
                <p className="text-sm text-indigo-500 font-bold uppercase tracking-wider">Analytics</p>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight mt-1">Reports</h1>
                <p className="text-gray-500 mt-1">Platform-wide performance and individual event analytics — visualised.</p>
            </div>

            {/* ── KPI Cards ─────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <StatCard label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} sub="All events combined"
                    bg="bg-emerald-50" text="text-emerald-600"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
                />
                <StatCard label="Tickets Sold" value={totalSold.toLocaleString()} sub={`of ${totalCapacity.toLocaleString()} capacity`}
                    bg="bg-indigo-50" text="text-indigo-600"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>}
                />
                <StatCard label="Avg Fill Rate" value={`${avgFill}%`} sub="Across all events"
                    bg="bg-amber-50" text="text-amber-600"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>}
                />
                <StatCard label="Total Events" value={events.length} sub="In your portfolio"
                    bg="bg-violet-50" text="text-violet-600"
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>}
                />
            </div>

            {/* ── Row 1: Stacked Bar + Pie ─────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Stacked Bar — Tickets sold vs remaining */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <SectionTitle title="Ticket Sales per Event" sub="Sold vs remaining capacity" />
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={salesData} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                            <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 700, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomBarTooltip />} />
                            <Legend wrapperStyle={{ fontSize: 11, fontWeight: 700, paddingTop: 12 }} />
                            <Bar dataKey="sold" name="Sold" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
                            <Bar dataKey="remaining" name="Remaining" stackId="a" fill="#e0e7ff" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie — Revenue share */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <SectionTitle title="Revenue Share" sub="By event" />
                    <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                                paddingAngle={3} dataKey="value">
                                {pieData.map((entry, i) => (
                                    <Cell key={`cell-${i}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomPieTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Legend */}
                    <div className="mt-2 space-y-1.5">
                        {pieData.map(d => (
                            <div key={d.name} className="flex items-center justify-between text-xs font-bold">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                                    <span className="text-gray-600">{d.name}</span>
                                </div>
                                <span className="text-gray-900">${d.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Row 2: Revenue Bar ─────────────────── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <SectionTitle title="Revenue per Event" sub="Total revenue generated by each event" />
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={salesData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 700, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false}
                            tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                        <Tooltip content={<CustomBarTooltip />} />
                        <Bar dataKey="revenue" name="Revenue ($)" radius={[8, 8, 0, 0]}>
                            {salesData.map((_, i) => (
                                <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* ── Individual Event Drilldown ─────────────────── */}
            <div>
                {/* Selector */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                    <SectionTitle title="Individual Event Report" sub="Select an event to see detailed analytics" />
                    <select
                        value={selectedId}
                        onChange={e => setSelectedId(Number(e.target.value))}
                        className="text-sm font-semibold text-gray-700 border border-gray-200 rounded-xl px-4 py-2 bg-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
                    >
                        {events.map(ev => (
                            <option key={ev.id} value={ev.id}>{ev.title}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left: Info + radial gauge */}
                    <div className="space-y-5">
                        {/* Event details card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${selected.accentColor}, ${selected.accentColor}80)` }} />
                            <div className="p-5 space-y-3">
                                <span className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                                    style={{ background: selected.accentColor + '20', color: selected.accentColor }}>
                                    {selected.category}
                                </span>
                                <h3 className="text-lg font-black text-gray-900 leading-snug">{selected.title}</h3>
                                <p className="text-sm text-gray-500">by {selected.organizer}</p>
                                <div className="pt-2 space-y-2 text-sm text-gray-600">
                                    <p className="font-medium">📍 {selected.location}</p>
                                    <p className="font-medium">🗓 {new Date(selected.event_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                    <p className="font-medium">🎟 ${selected.ticket_price} per ticket</p>
                                </div>
                                <div className="pt-1">
                                    {isSoldOut ? <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-100 text-red-600 text-xs font-black rounded-full">🔴 Sold Out</span>
                                        : isFast  ? <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-100 text-amber-600 text-xs font-black rounded-full">🔥 Selling Fast</span>
                                        : <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-black rounded-full">🟢 On Sale</span>}
                                </div>
                            </div>
                        </div>

                        {/* Radial fill-rate gauge */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Fill Rate</p>
                            <div className="flex items-center justify-center">
                                <div className="relative">
                                    <ResponsiveContainer width={160} height={160}>
                                        <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%"
                                            startAngle={90} endAngle={-270} data={radialData}>
                                            <RadialBar background={{ fill: '#f3f4f6' }} dataKey="value" cornerRadius={8} />
                                        </RadialBarChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <p className="text-3xl font-black" style={{ color: selected.accentColor }}>{fillPct}%</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">filled</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-gray-500 mt-1">
                                <span>{selected.tickets_sold.toLocaleString()} sold</span>
                                <span>{remaining.toLocaleString()} left</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Area chart + metric tiles */}
                    <div className="lg:col-span-2 space-y-5">

                        {/* Area Chart — simulated weekly sales */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Weekly Ticket Sales</p>
                            <p className="text-sm text-gray-500 font-medium mb-5">Simulated sales distribution over 8 weeks</p>
                            <ResponsiveContainer width="100%" height={180}>
                                <AreaChart data={areaData} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={selected.accentColor} stopOpacity={0.2} />
                                            <stop offset="95%" stopColor={selected.accentColor} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                    <XAxis dataKey="week" tick={{ fontSize: 11, fontWeight: 700, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #f3f4f6', fontSize: 12 }} />
                                    <Area type="monotone" dataKey="tickets" name="Tickets"
                                        stroke={selected.accentColor} strokeWidth={2.5}
                                        fill="url(#areaGrad)" dot={{ fill: selected.accentColor, r: 4 }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* 4 metric tiles */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Revenue</p>
                                <p className="text-2xl font-black text-emerald-700 mt-1">${revenue.toLocaleString()}</p>
                                <p className="text-xs text-emerald-600/70 font-medium mt-0.5">{selected.tickets_sold.toLocaleString()} × ${selected.ticket_price}</p>
                            </div>
                            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
                                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Tickets Sold</p>
                                <p className="text-2xl font-black text-indigo-700 mt-1">{selected.tickets_sold.toLocaleString()}</p>
                                <p className="text-xs text-indigo-600/70 font-medium mt-0.5">{remaining.toLocaleString()} remaining</p>
                            </div>
                            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                                <p className="text-[10px] font-black uppercase tracking-widest text-amber-600">Capacity</p>
                                <p className="text-2xl font-black text-amber-700 mt-1">{selected.total_tickets.toLocaleString()}</p>
                                <p className="text-xs text-amber-600/70 font-medium mt-0.5">Total seats</p>
                            </div>
                            <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5">
                                <p className="text-[10px] font-black uppercase tracking-widest text-violet-600">Ticket Price</p>
                                <p className="text-2xl font-black text-violet-700 mt-1">${selected.ticket_price}</p>
                                <p className="text-xs text-violet-600/70 font-medium mt-0.5">Per attendee</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizerReports;
