import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/user/Dashboard";
import Jobs from "../pages/user/Jobs";
import AddJob from "../pages/user/AddJob";
import Tracker from "../pages/user/Tracker";
import Analytics from "../pages/user/Analytics";
import Export from "../pages/user/Export";
import Profile from "../pages/user/Profile";
import DashboardLayout from "../components/user/DashboardLayout";
import AIDashboard from "../pages/user/AiDashboard";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path='/user/*' element={<DashboardLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="add-job" element={<AddJob />} />
        <Route path="tracker" element={<Tracker />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="aiDashboard" element={<AIDashboard />} />
        <Route path="export" element={<Export />} />
        <Route path="profile" element={<Profile />} />

        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
