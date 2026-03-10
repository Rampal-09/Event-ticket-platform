import React, { useState } from 'react';
import ReviewHistoryTable from '../../components/admin/ReviewHistoryTable';
import AdminStatsCard from '../../components/admin/AdminStatsCard';

const MOCK_HISTORY = [
    { id: 'RV-901', eventName: 'Neon Nights Festival', organizer: 'Electra Events', decision: 'Approved', reviewedBy: 'Platform Admin', date: '2026-03-05' },
    { id: 'RV-902', eventName: 'Tech Summit 2026', organizer: 'Global Innovate', decision: 'Approved', reviewedBy: 'Moderator Sarah', date: '2026-03-04' },
    { id: 'RV-903', eventName: 'Underground Jazz', organizer: 'Soul Sessions', decision: 'Rejected', reviewedBy: 'Platform Admin', date: '2026-03-04' },
    { id: 'RV-904', eventName: 'Mountain Yoga Retreat', organizer: 'Zen Life', decision: 'Approved', reviewedBy: 'Moderator Sarah', date: '2026-03-03' },
    { id: 'RV-905', eventName: 'Street Food Gala', organizer: 'City Bites', decision: 'Rejected', reviewedBy: 'Platform Admin', date: '2026-03-02' },
];

const ReviewHistoryPage = () => {
    const [history, setHistory] = useState(MOCK_HISTORY);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-1">Review History</h1>
                    <p className="text-gray-500 font-medium text-sm sm:text-base">Audit log of all event approval decisions.</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <AdminStatsCard label="Total Reviews" value={history.length} icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                } color="indigo" />
                <AdminStatsCard label="Approved" value={history.filter(h => h.decision === 'Approved').length} icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                } color="emerald" />
                <AdminStatsCard label="Rejected" value={history.filter(h => h.decision === 'Rejected').length} icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                } color="rose" />
            </div>

            {/* Table */}
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden mt-8">
                <div className="overflow-x-auto">
                    <ReviewHistoryTable history={history} />
                </div>
            </div>
        </div>
    );
};

export default ReviewHistoryPage;

