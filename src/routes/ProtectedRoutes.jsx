import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserRoutes from './UserRoutes';
import AdminRoutes from './AdminRoutes';

const ProtectedRoutes = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-b-2 border-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      {/* User routes */}
      {user.role === 'user' && <Route path="/user/*" element={<UserRoutes />} />}
      
      {/* Admin routes */}
      {user.role === 'admin' && <Route path="/admin/*" element={<AdminRoutes />} />}
      
      {/* Redirect based on role */}
      <Route path="*" element={<Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />} />
    </Routes>
  );
};

export default ProtectedRoutes;