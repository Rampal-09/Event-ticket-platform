import { api } from './api';

export const adminService = {
    getStats: async () => {
        return api.get('/admin/stats');
    },
    getEvents: async () => {
        return api.get('/admin/events');
    },
    updateEventStatus: async (id, status, reason) => {
        return api.patch(`/admin/events/${id}/status`, { status, reason });
    },
    getUsers: async () => {
        return api.get('/admin/users');
    },
    updateUserRole: async (id, role) => {
        return api.patch(`/admin/users/${id}/role`, { role });
    },
    updateUserStatus: async (id, status) => {
        return api.patch(`/admin/users/${id}/status`, { status });
    }
};
