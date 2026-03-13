import { api } from './api';

export const ticketService = {
    purchaseTickets: async (purchaseData) => {
        return api.post('/tickets/purchase', purchaseData);
    },
    validateTicket: async (qrPayload) => {
        return api.post('/tickets/validate', { qrPayload });
    },
    getTicketById: async (id) => {
        return api.get(`/public/tickets/${id}`);
    }
};
