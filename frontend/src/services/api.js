const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const getAuthToken = () => localStorage.getItem('token');

// ngrok-skip-browser-warning bypasses the ngrok warning page for API calls
const getHeaders = (extra = {}) => ({
    'Authorization': `Bearer ${getAuthToken()}`,
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    ...extra
});

export const api = {
    get: async (endpoint) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: getHeaders()
        });
        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error(errorData.error || 'Request failed');
            error.response = { data: errorData };
            throw error;
        }
        return response.json();
    },
    post: async (endpoint, data) => {
        const url = `${BASE_URL}${endpoint}`;
        console.log(`[API POST] Fetching: ${url}`, { data });
        const response = await fetch(url, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error(errorData.error || 'Request failed');
            error.response = { data: errorData };
            throw error;
        }
        return response.json();
    },
    patch: async (endpoint, data) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error(errorData.error || 'Request failed');
            error.response = { data: errorData };
            throw error;
        }
        return response.json();
    },
    put: async (endpoint, data) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error(errorData.error || 'Request failed');
            error.response = { data: errorData };
            throw error;
        }
        return response.json();
    },
    delete: async (endpoint) => {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error(errorData.error || 'Request failed');
            error.response = { data: errorData };
            throw error;
        }
        return response.json();
    },
};
