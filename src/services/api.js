import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  updateDetails: (userData) => api.put('/auth/updatedetails', userData),
  updatePassword: (passwordData) => api.put('/auth/updatepassword', passwordData),
forgotPassword: (email) => api.post('/auth/forgotpassword', { email: email.toString().trim() }),
  resetPassword: (resetData) => api.put('/auth/resetpassword', resetData),
  verifyEmail: (token) => api.get(`/auth/verifyemail?token=${token}`),
  resendVerification: () => api.post('/auth/resendverification'),
};

export const applicationAPI = {
  create: (applicationData) => api.post('/applications', applicationData),
  getApplications: () => api.get('/applications'),
  update: (id, updateData) => api.put(`/applications/${id}`, updateData),
  delete: (id) => api.delete(`/applications/${id}`),
};

export default api; 