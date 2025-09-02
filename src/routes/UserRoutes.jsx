import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/user/Dashboard";
import TaskCreate from "../pages/user/TaskCreate";
import TaskList from "../pages/user/TaskList";
import TaskDetail from "../pages/user/TaskDetail";
import LeaderBoard from "../pages/user/LeaderBoard";
import Learn from "../pages/user/Learn";
import Profile from "../pages/user/Profile";
import LearnDetail from "../pages/user/LearnDetail";
import DashboardLayout from "../components/user/DashboardLayout";
import Achievements from "../pages/user/Achievements";
import Settings from "../pages/user/Settings";
import Challenge from "../pages/user/Challenge";

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tasks" element={<TaskList />} />
        <Route path="tasks/create" element={<TaskCreate />} />
        <Route path="tasks/:id" element={<TaskDetail />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="challenge" element={<Challenge />} />
        <Route path="leaderboard" element={<LeaderBoard />} />
        <Route path="learn" element={<Learn />} />
        <Route path="learn/:id" element={<LearnDetail />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;