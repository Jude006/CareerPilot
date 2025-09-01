import api from './api';

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Get current user
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Update user details
  updateDetails: async (userData) => {
    const response = await api.put('/auth/updatedetails', userData);
    return response.data;
  },

  // Update password
  updatePassword: async (passwordData) => {
    const response = await api.put('/auth/updatepassword', passwordData);
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgotpassword', { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (resetData) => {
    const response = await api.put('/auth/resetpassword', resetData);
    return response.data;
  },

  // Verify email
  verifyEmail: async (token) => {
    const response = await api.get(`/auth/verifyemail?token=${token}`);
    return response.data;
  },

  // Resend verification email
  resendVerification: async () => {
    const response = await api.post('/auth/resendverification');
    return response.data;
  },

  // Logout (client-side only)
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
};