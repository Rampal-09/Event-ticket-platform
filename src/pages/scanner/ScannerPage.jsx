import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventStatsCard from '../../components/scanner/EventStatsCard';
import TicketSalesChart from '../../components/scanner/TicketSalesChart';
import AttendeeList from '../../components/scanner/AttendeeList';
import TicketScanner from '../../components/scanner/TicketScanner';
import { MOCK_EVENTS } from '../../data/mockEvents';

const ScannerPage = () => {
    const navigate = useNavigate();
    const [scannedAttendees, setScannedAttendees] = useState([
        { id: 101, name: 'Alex Thompson', ticketId: 'TCK-882291', time: '2 mins ago', status: 'Verified' },
        { id: 102, name: 'Sarah Jenkins', ticketId: 'TCK-291102', time: '5 mins ago', status: 'Verified' },
        { id: 103, name: 'Michael Chen', ticketId: 'TCK-110293', time: '12 mins ago', status: 'Invalid' },
    ]);

    const handleNewScan = (result) => {
        setScannedAttendees(prev => [
            {
                id: Date.now(),
                name: result.buyer.split('@')[0].replace('.', ' '),
                ticketId: result.ticketId,
                time: 'Just now',
                status: 'Verified'
            },
            ...prev.slice(0, 9) // Keep last 10
        ]);
    };

    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white">
            {/* Header */}
            <header className="border-b border-white/5 bg-[#0A0A0F]/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/organizer')}
                            className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-xl font-black tracking-tight">Gate Control</h1>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Summer Music Festival 2026</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">Status</p>
                                <p className="text-sm font-bold text-emerald-500 mt-1">Live Connection</p>
                            </div>
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        </div>
                        <div className="w-px h-8 bg-white/10 hidden sm:block" />
                        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-all border border-white/5 text-sm font-bold">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            Share Link
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT: Scanner Core (Static but important) */}
                    <div className="lg:col-span-12 xl:col-span-4 space-y-8">
                        <div className="bg-white/5 border border-white/5 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden group">
                            {/* Decorative background flare */}
                            <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-all duration-1000" />

                            <div className="relative z-10">
                                <div className="text-center mb-6">
                                    <h3 className="text-lg font-bold">Smart Validator</h3>
                                    <p className="text-xs text-gray-500 mt-1">Position QR code within the frame</p>
                                </div>

                                <TicketScanner onScanSuccess={handleNewScan} />

                                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Device</p>
                                            <p className="text-xs font-bold">iPhone 15 Pro</p>
                                        </div>
                                    </div>
                                    <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Switch Camera</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Stats & Activity (Dynamic look) */}
                    <div className="lg:col-span-12 xl:col-span-8 space-y-8">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <EventStatsCard
                                label="Total Admitted"
                                value="3,241"
                                trend={12.5}
                                color="emerald"
                                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                            />
                            <EventStatsCard
                                label="Current Capacity"
                                value="82%"
                                trend={4.2}
                                color="amber"
                                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                            />
                            <EventStatsCard
                                label="Invalid Scans"
                                value="14"
                                trend={-8.1}
                                color="rose"
                                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Analytics Visual */}
                            <div className="h-full">
                                <TicketSalesChart />
                            </div>

                            {/* Activity Log - Dark themed override */}
                            <div className="h-full [&_div]:bg-white/5 [&_div]:border-white/5 [&_tr]:border-white/5 [&_td]:text-gray-300 [&_p]:text-gray-300 [&_th]:bg-transparent">
                                <AttendeeList attendees={scannedAttendees} />
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ScannerPage;
