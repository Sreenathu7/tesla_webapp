import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
};

export const carAPI = {
    getAll: (params) => api.get('/cars', { params }),
    getBySlug: (slug) => api.get(`/cars/${slug}`),
};

export const orderAPI = {
    create: (orderData) => api.post('/orders', orderData),
    getAll: () => api.get('/orders'),
    getByUser: (userId) => api.get(`/orders/user/${userId}`),
};

export default api;
