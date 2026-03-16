import { api } from './api';

export const adminService = {
    getStats: async () => {
        return api.get('/admin/stats');
    },
    getDashboardData: async () => {
        return api.get('/admin/dashboard');
    },
    getEvents: async () => {
        return api.get('/admin/events');
    },
    getModerationStats: async () => {
        return api.get('/admin/events/moderation-stats');
    },
    getReviewHistory: async () => {
        return api.get('/admin/events/history');
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
    },
    verifyUser: async (id, isVerified) => {
        return api.patch(`/admin/users/${id}/verify`, { isVerified });
    },
    getOrganizerRequests: async (status) => {
        const query = status ? `?status=${status}` : '';
        return api.get(`/admin/organizer-requests${query}`);
    },
    approveOrganizer: async (id) => {
        return api.patch(`/admin/organizers/${id}/approve`);
    },
    rejectOrganizer: async (id) => {
        return api.patch(`/admin/organizers/${id}/reject`);
    },
    getEventDetail: async (id) => {
        return api.get(`/admin/events/${id}`);
    }
};
