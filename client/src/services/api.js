import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authService = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me'),
};

export const repoService = {
    addRepo: (data) => api.post('/repo', data),
    getRepos: () => api.get('/repo'),
    getRepoStatus: (id) => api.get(`/repo/${id}/status`),
};

export const queryService = {
    askQuestion: (data) => api.post('/query', data),
    saveQuery: (data) => api.post('/query/save', data),
    getQueries: () => api.get('/query'),
};

export default api;
