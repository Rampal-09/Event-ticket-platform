import React, { useState } from 'react';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const EVENTS = [
    { id: 1, title: 'Summer Music Festival 2026', date: '2026-07-15', sold: 4500, capacity: 5000, status: 'active', revenue: '$540,000' },
    { id: 2, title: 'Tech Innovators Conference', date: '2026-09-22', sold: 800, capacity: 1200, status: 'active', revenue: '$200,000' },
    { id: 3, title: 'Jazz under the Stars', date: '2025-10-05', sold: 600, capacity: 600, status: 'sold_out', revenue: '$36,000' },
    { id: 4, title: 'Startup Networking Mixer', date: '2026-08-12', sold: 25, capacity: 100, status: 'active', revenue: '$750' },
    { id: 5, title: 'Culinary Arts Expo', date: '2026-05-30', sold: 0, capacity: 800, status: 'draft', revenue: '$0' },
];

const STATUS_STYLES = {
    active: { label: 'Active', dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    sold_out: { label: 'Sold Out', dot: 'bg-red-500', badge: 'bg-red-50 text-red-700 border-red-200' },
    draft: { label: 'Draft', dot: 'bg-gray-400', badge: 'bg-gray-50 text-gray-600 border-gray-200' },
};

const MyEvents = () => {
    const [search, setSearch] = useState('');

    const filtered = EVENTS.filter(e =>
        e.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <OrganizerLayout>
            <div className="space-y-8 max-w-screen-xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Events</p>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight mt-1">My Events</h1>
                        <p className="text-gray-500 mt-1">{EVENTS.length} events total · {EVENTS.filter(e => e.status === 'active').length} active</p>
                    </div>
                    <Link to="/organizer/create-event">
                        <Button variant="primary" leftIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>}>
                            Create Event
                        </Button>
                    </Link>
                </div>

                {/* Search */}
                <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 max-w-sm">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search events…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="flex-1 outline-none text-sm text-gray-800 placeholder:text-gray-400 bg-transparent"
                    />
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Desktop Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[700px]">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Event</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Sales</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Revenue</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map(event => {
                                    const pct = Math.round((event.sold / event.capacity) * 100);
                                    const st = STATUS_STYLES[event.status];
                                    return (
                                        <tr key={event.id} className="hover:bg-gray-50/80 transition-colors group">
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-sm text-gray-900 group-hover:text-indigo-700 transition-colors">{event.title}</p>
                                                <p className="text-[10px] font-mono text-gray-400 mt-0.5">ID #{event.id}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 font-medium whitespace-nowrap">
                                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1.5 w-40">
                                                    <div className="flex justify-between text-[10px] font-bold">
                                                        <span className="text-indigo-600">{event.sold.toLocaleString()} sold</span>
                                                        <span className="text-gray-400">{event.capacity.toLocaleString()}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all ${event.status === 'sold_out' ? 'bg-red-500' : pct > 75 ? 'bg-amber-500' : 'bg-indigo-500'}`}
                                                            style={{ width: `${pct}%` }}
                                                        />
                                                    </div>
                                                    <p className="text-[10px] text-gray-400 font-medium">{pct}% capacity</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-bold text-gray-900">{event.revenue}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${st.badge}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                                                    {st.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="sm">Edit</Button>
                                                    <Button variant="outline" size="sm">Scan</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {filtered.length === 0 && (
                            <div className="py-20 text-center text-gray-400 space-y-3">
                                <p className="text-4xl">🔍</p>
                                <p className="font-semibold">No events matched your search.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </OrganizerLayout>
    );
};

export default MyEvents;
