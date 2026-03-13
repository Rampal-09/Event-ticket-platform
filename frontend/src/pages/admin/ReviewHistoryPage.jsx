import React, { useState } from 'react';
import ReviewHistoryTable from '../../components/admin/ReviewHistoryTable';
import AdminStatsCard from '../../components/admin/AdminStatsCard';
import { adminService } from '../../services/adminService';

const ReviewHistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHistory = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await adminService.getReviewHistory();
            setHistory(data);
        } catch (err) {
            console.error('Failed to load history:', err);
            setError('System failed to retrieve audit logs. Please check your admin privileges.');
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchHistory();
    }, []);

    if (isLoading) {
        return (
            <div className="py-32 flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-gray-400 font-black uppercase tracking-widest text-xs animate-pulse">Syncing Review Logs...</p>
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
                    onClick={fetchHistory}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors"
                >
                    Retry Sync
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-1">Review History</h1>
                    <p className="text-gray-500 font-medium text-sm sm:text-base leading-relaxed">Platform audit logs for every administrative decision made.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <AdminStatsCard label="Total Reviews" value={history.length} icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                } color="indigo" />
                <AdminStatsCard label="Approved" value={history.filter(h => h.decision === 'Approved').length} icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                } color="emerald" />
                <AdminStatsCard label="Rejected" value={history.filter(h => h.decision === 'Rejected').length} icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                } color="rose" />
            </div>

            {/* History Table */}
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden mt-8">
                {history.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">No historical data found in records.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <ReviewHistoryTable history={history} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewHistoryPage;

