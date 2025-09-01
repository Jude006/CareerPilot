import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserRoutes from './UserRoutes';
import AdminRoutes from './AdminRoutes';

const ProtectedRoutes = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      {/* User routes */}
      {user.role === 'user' && <Route path="/*" element={<UserRoutes />} />}
      
      {/* Admin routes */}
      {user.role === 'admin' && <Route path="/*" element={<AdminRoutes />} />}
      
      {/* Redirect based on role */}
      <Route path="*" element={<Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />} />
    </Routes>
  );
};

export default ProtectedRoutes;