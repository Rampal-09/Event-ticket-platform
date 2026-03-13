import { api } from './api';

export const eventService = {
    getPublicEvents: async () => {
        return api.get('/public/events');
    },
    getPublicEventById: async (id, params = {}) => {
        const query = new URLSearchParams(params).toString();
        const endpoint = `/public/events/${id}${query ? `?${query}` : ''}`;
        return api.get(endpoint);
    },
    validatePromo: async (eventId, code) => {
        return api.get(`/public/promo/${eventId}/${code}`);
    },
    getPublicStats: async () => {
        return api.get('/public/stats');
    },
    createEvent: async (eventData) => {
        return api.post('/organizer/events', eventData);
    },
    getOrganizerEvents: async () => {
        return api.get('/organizer/events');
    },
    getOrganizerEventById: async (id) => {
        return api.get(`/organizer/events/${id}`);
    },
    updateEvent: async (id, eventData) => {
        return api.patch(`/organizer/events/${id}`, eventData);
    },
    getReports: async () => {
        return api.get('/organizer/reports');
    },
    getScannerStats: async (id) => {
        return api.get(`/organizer/events/${id}/scanner-stats`);
    },
    getEventAttendees: async (id) => {
        return api.get(`/organizer/events/${id}/attendees`);
    }
};
