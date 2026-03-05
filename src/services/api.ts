import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id: string) => api.get(`/products/${id}`),
  create: (data: unknown) => api.post('/products', data),
  update: (id: string, data: unknown) => api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

export const salesAPI = {
  create: (data: unknown) => api.post('/sales', data),
  getAll: () => api.get('/sales'),
};

export const aiAPI = {
  getAlerts: () => api.get('/ai/alerts'),
  getPrediction: (productId: string) => api.get(`/ai/predict/${productId}`),
};

export default api;
