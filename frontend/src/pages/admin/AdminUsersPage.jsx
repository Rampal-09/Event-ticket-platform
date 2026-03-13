import React, { useState } from 'react';
import UserTable from '../../components/admin/UserTable';
import AdminStatsCard from '../../components/admin/AdminStatsCard';
import { adminService } from '../../services/adminService';

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await adminService.getUsers();
            setUsers(data);
        } catch (err) {
            console.error('Failed to fetch users:', err);
            setError('Could not balance the user directory. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchUsers();
    }, []);

    const handleAction = async (id, actionFn, successMsg) => {
        setUpdatingId(id);
        setError(null);
        try {
            await actionFn();
            // We refresh the whole list to ensure UI is in sync with server state
            const freshData = await adminService.getUsers();
            setUsers(freshData);
        } catch (err) {
            console.error('Action failed:', err);
            const msg = err.response?.data?.error || 'System failed to update user profile.';
            setError(msg);
        } finally {
            setUpdatingId(null);
        }
    };

    const handleSuspend = (id) => {
        handleAction(id, () => adminService.updateUserStatus(id, 'SUSPENDED'));
    };

    const handleActivate = (id) => {
        handleAction(id, () => adminService.updateUserStatus(id, 'ACTIVE'));
    };

    const handleChangeRole = (id) => {
        const currentUser = users.find(u => u.id === id);
        if (!currentUser) return;

        const roles = ['TENANT', 'STAFF', 'ORGANIZER', 'ADMIN'];
        const currentIndex = roles.indexOf(currentUser.role);
        const nextRole = roles[(currentIndex + 1) % roles.length];

        handleAction(id, () => adminService.updateUserRole(id, nextRole));
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="py-32 flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-gray-400 font-black uppercase tracking-widest text-xs animate-pulse">Scanning Platform Directory...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Error Banner */}
            {error && (
                <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center justify-between animate-in slide-in-from-top-4">
                    <div className="flex items-center gap-3 text-rose-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="font-bold text-sm tracking-tight">{error}</p>
                    </div>
                    <button 
                        onClick={fetchUsers}
                        className="text-[10px] font-black uppercase tracking-widest text-rose-500 hover:text-rose-700 underline"
                    >
                        Dismiss & Retry
                    </button>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-1">User Management</h1>
                    <p className="text-gray-500 font-medium text-sm sm:text-base leading-relaxed">Manage platform access, roles, and user status with precision.</p>
                </div>

                <div className="relative w-full sm:w-80 group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl w-full shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-sm"
                    />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <AdminStatsCard label="Platform Total" value={users.length} icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                } color="indigo" />
                <AdminStatsCard label="Verified Admins" value={users.filter(u => u.role === 'ADMIN').length} icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                } color="emerald" />
                <AdminStatsCard label="Event Organizers" value={users.filter(u => u.role === 'ORGANIZER').length} icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                } color="amber" />
                <AdminStatsCard label="Suspended" value={users.filter(u => u.status === 'SUSPENDED').length} icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                } color="rose" />
            </div>

            {/* Table */}
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden mt-8">
                <div className="overflow-x-auto">
                    <UserTable
                        users={filteredUsers}
                        onSuspend={handleSuspend}
                        onActivate={handleActivate}
                        onChangeRole={handleChangeRole}
                        updatingId={updatingId}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminUsersPage;

