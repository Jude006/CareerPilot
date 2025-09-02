import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/AdminDashboard";
import UserManagement from "../pages/admin/UserManagement";
import JobManagement from "../pages/admin/JobManagement";
import Settings from "../pages/admin/SystemSettings";
import AdminLayout from "../components/admin/AdminLayout";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="content" element={<JobManagement />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;