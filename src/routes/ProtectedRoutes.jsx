import React from 'react';
import { Navigate } from 'react-router-dom';
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

  // For admin users, render AdminRoutes
  if (user.role === 'admin') {
    return <AdminRoutes />;
  }
  
  // For regular users, render UserRoutes
  if (user.role === 'user') {
    return <UserRoutes />;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoutes;