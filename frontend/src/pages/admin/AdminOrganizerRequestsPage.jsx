import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import AdminStatsCard from '../../components/admin/AdminStatsCard';
import StatusBadge from '../../components/admin/StatusBadge';
import Button from '../../components/ui/Button';

const AdminOrganizerRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('PENDING');
    const [actionLoading, setActionLoading] = useState(null);

    const fetchRequests = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await adminService.getOrganizerRequests(activeTab === 'ALL' ? '' : activeTab);
            setRequests(data);
        } catch (err) {
            console.error('Failed to fetch organizer requests:', err);
            setError('System error: Unable to retrieve organizer application log.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [activeTab]);

    const handleApprove = async (id) => {
        if (!confirm('Are you sure you want to approve this organizer? They will gain full access to the platform.')) return;
        
        setActionLoading(id);
        try {
            await adminService.approveOrganizer(id);
            await fetchRequests();
        } catch (err) {
            console.error('Approve failed:', err);
            setError('Transaction failed: Could not authorize organizer.');
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (id) => {
        const reason = prompt('Please enter a reason for rejection (optional):');
        if (reason === null) return; // Cancelled
        
        setActionLoading(id);
        try {
            await adminService.rejectOrganizer(id);
            await fetchRequests();
        } catch (err) {
            console.error('Reject failed:', err);
            setError('Transaction failed: Could not process rejection.');
        } finally {
            setActionLoading(null);
        }
    };

    const tabs = [
        { id: 'PENDING', label: 'Pending', count: requests.filter(r => r.organizerStatus === 'PENDING').length },
        { id: 'APPROVED', label: 'Approved', count: requests.filter(r => r.organizerStatus === 'APPROVED').length },
        { id: 'REJECTED', label: 'Rejected', count: requests.filter(r => r.organizerStatus === 'REJECTED').length },
        { id: 'ALL', label: 'All Log', count: requests.length }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-1">Organizer Requests</h1>
                    <p className="text-gray-500 font-medium text-sm sm:text-base leading-relaxed">Verifying and onboarding new event creators onto the platform.</p>
                </div>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center justify-between animate-in slide-in-from-top-4">
                    <div className="flex items-center gap-3 text-rose-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="font-bold text-sm tracking-tight">{error}</p>
                    </div>
                    <button onClick={fetchRequests} className="text-[10px] font-black uppercase tracking-widest text-rose-500 hover:text-rose-700 underline">Dismiss & Retry</button>
                </div>
            )}

            {/* Tabs */}
            <div className="flex p-1.5 bg-gray-100/50 border border-gray-100 rounded-2xl w-fit gap-1">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                            activeTab === tab.id 
                            ? 'bg-white text-indigo-600 shadow-md border border-gray-100' 
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        {tab.label}
                        <span className={`px-1.5 py-0.5 rounded-md text-[8px] ${activeTab === tab.id ? 'bg-indigo-50 text-indigo-500' : 'bg-gray-200 text-gray-500'}`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Content Table */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Organizer</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Applied On</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest animate-pulse">Analyzing Registry...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : requests.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20 text-center">
                                        <div className="max-w-xs mx-auto space-y-3 opacity-40">
                                            <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                            <p className="text-sm font-bold text-gray-500">No organizational records found matching this filter.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                requests.map((req, idx) => (
                                    <tr key={req.id} className="hover:bg-gray-50/30 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                                    {req.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-black text-gray-900 tracking-tight">{req.name}</div>
                                                    <div className="text-xs font-bold text-gray-400">{req.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-bold text-gray-500">
                                            {new Date(req.createdAt).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-8 py-6">
                                            <StatusBadge status={req.organizerStatus} />
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            {req.organizerStatus === 'PENDING' ? (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleReject(req.id)}
                                                        disabled={actionLoading === req.id}
                                                        className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all duration-300 disabled:opacity-50"
                                                    >
                                                        Reject
                                                    </button>
                                                    <button
                                                        onClick={() => handleApprove(req.id)}
                                                        disabled={actionLoading === req.id}
                                                        className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300 disabled:opacity-50"
                                                    >
                                                        Approve
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No Actions Available</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrganizerRequestsPage;
