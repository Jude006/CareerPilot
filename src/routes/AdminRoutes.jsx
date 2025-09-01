import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import JobManagement from '../pages/admin/JobManagement';
import SystemSettings from '../pages/admin/SystemSettings';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="admin" element={<AdminDashboard />} />
      <Route path="admin/users" element={<UserManagement />} />
      <Route path="admin/jobs" element={<JobManagement />} />
      <Route path="admin/settings" element={<SystemSettings />} />
      
      <Route path="*" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AdminRoutes;