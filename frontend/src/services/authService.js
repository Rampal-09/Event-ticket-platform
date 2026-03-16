import { api } from './api';

export const authService = {
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
        }
        return response;
    },
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        // If registration is pending approval, don't store token/user
        if (response.token && !response.pending) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
        }
        return response;
    },
    logout: async () => {
        try {
            await api.post('/auth/logout');
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },
    updateProfile: async (data) => {
        const response = await api.put('/auth/profile', data);
        if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
        }
        return response;
    },
    updatePassword: async (data) => {
        return await api.put('/auth/update-password', data);
    },
};
