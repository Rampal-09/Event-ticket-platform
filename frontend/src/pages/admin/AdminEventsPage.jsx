import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventApprovalTable from '../../components/admin/EventApprovalTable';
import EventReviewModal from '../../components/admin/EventReviewModal';
import AdminStatsCard from '../../components/admin/AdminStatsCard';
import { ROUTES } from '../../router/routes';
import { adminService } from '../../services/adminService';
import { useToast } from '../../components/ui/Toast';
const AdminEventsPage = () => {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const initPage = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [eventsData, statsData] = await Promise.all([
                adminService.getEvents(),
                adminService.getModerationStats()
            ]);
            // Filter only pending events for the moderation queue
            setEvents(eventsData.filter(e => e.status === 'PENDING'));
            setStats(statsData);
        } catch (err) {
            console.error('Failed to load moderation data:', err);
            setError('Could not sync with moderation server. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        initPage();
    }, []);

    const handleOpenReview = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleStatusUpdate = async (id, status, reason) => {
        try {
            await adminService.updateEventStatus(id, status, reason);
            setEvents(prev => prev.filter(e => e.id !== id));
            // Optionally refresh stats after update
            const newStats = await adminService.getModerationStats();
            setStats(newStats);
            setIsModalOpen(false);
        } catch (err) {
            console.error(`Failed to ${status} event:`, err);
            addToast(`System error: Failed to ${status} event. Please try again.`, 'error');
        }
    };

    if (isLoading) {
        return (
            <div className="py-32 flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-gray-400 font-black uppercase tracking-widest text-xs animate-pulse">Syncing Moderation Queue...</p>
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
                    onClick={initPage}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors"
                >
                    Retry Sync
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Admin Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-1">Platform Moderation</h1>
                    <p className="text-gray-500 font-medium text-sm sm:text-base leading-relaxed">You have <span className="text-indigo-600 font-bold">{events.length} pending submissions</span> to review today.</p>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-2xl border border-gray-100 w-fit">
                    <button className="px-4 sm:px-6 py-2 bg-white shadow-sm border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-indigo-600">Pending Queue</button>
                    <button
                        onClick={() => navigate(ROUTES.ADMIN_REVIEW_HISTORY)}
                        className="px-4 sm:px-6 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        History
                    </button>
                </div>
            </div>

            {/* Admin Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <AdminStatsCard label="Pending Volume" value={stats?.pendingCount || '0'} icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                } color="indigo" />
                <AdminStatsCard label="Approval Rate" value={`${stats?.approvalRate || 0}%`} icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                } color="emerald" />
                <AdminStatsCard label="Flagged Reports" value={stats?.flaggedReports || '0'} icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                } color="amber" />
                <AdminStatsCard label="Suspended Users" value={stats?.suspendedUsers || '0'} icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                } color="rose" />
            </div>

            {/* Moderation Table Section */}
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden mt-8">
                <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-5 sm:w-1.5 sm:h-6 bg-indigo-600 rounded-full" />
                        <h2 className="text-[10px] sm:text-sm font-black uppercase tracking-widest text-gray-900">Incoming Events</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Live Queue</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <EventApprovalTable
                        events={events}
                        onApprove={(id) => handleStatusUpdate(id, 'APPROVED')}
                        onReject={(id, reason) => handleStatusUpdate(id, 'REJECTED', reason)}
                        onReview={handleOpenReview}
                    />
                </div>
            </div>

            {/* Event Review Modal Container */}
            <EventReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                event={selectedEvent}
                onApprove={(id) => handleStatusUpdate(id, 'APPROVED')}
                onReject={(id, reason) => handleStatusUpdate(id, 'REJECTED', reason)}
            />
        </div>
    );
};

export default AdminEventsPage;

