import React, { useState } from 'react';
import UserTable from '../../components/admin/UserTable';
import AdminStatsCard from '../../components/admin/AdminStatsCard';
import { adminService } from '../../services/adminService';

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const data = await adminService.getUsers();
            setUsers(data);
        } catch (err) {
            console.error('Failed to fetch users:', err);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchUsers();
    }, []);

    const handleSuspend = async (id) => {
        try {
            await adminService.updateUserStatus(id, 'SUSPENDED');
            setUsers(users.map(u => u.id === id ? { ...u, status: 'SUSPENDED' } : u));
        } catch (err) {
            alert('Failed to suspend user');
        }
    };

    const handleActivate = async (id) => {
        try {
            await adminService.updateUserStatus(id, 'ACTIVE');
            setUsers(users.map(u => u.id === id ? { ...u, status: 'ACTIVE' } : u));
        } catch (err) {
            alert('Failed to activate user');
        }
    };

    const handleChangeRole = async (id) => {
        const currentUser = users.find(u => u.id === id);
        if (!currentUser) return;

        const roles = ['TENANT', 'STAFF', 'ORGANIZER', 'ADMIN'];
        const currentIndex = roles.indexOf(currentUser.role);
        const nextRole = roles[(currentIndex + 1) % roles.length];

        try {
            await adminService.updateUserRole(id, nextRole);
            setUsers(users.map(u => u.id === id ? { ...u, role: nextRole } : u));
        } catch (err) {
            alert('Failed to update role');
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-1">User Management</h1>
                    <p className="text-gray-500 font-medium text-sm sm:text-base">Manage platform access, roles, and user status.</p>
                </div>

                <div className="relative w-full sm:w-80">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 pr-6 py-2.5 bg-white border border-gray-100 rounded-2xl w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-sm"
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <AdminStatsCard label="Total Users" value={users.length} icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                } color="indigo" />
                <AdminStatsCard label="Admins" value={users.filter(u => u.role === 'ADMIN').length} icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                } color="emerald" />
                <AdminStatsCard label="Organizers" value={users.filter(u => u.role === 'ORGANIZER').length} icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                } color="amber" />
                <AdminStatsCard label="Suspended" value={users.filter(u => u.status === 'SUSPENDED').length} icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminUsersPage;

