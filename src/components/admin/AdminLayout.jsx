// src/components/layout/AdminLayout.jsx
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Settings,
  Menu,
  X,
  LogOut,
  User,
  Bell,
  Search,
  ChevronDown,
  BarChart3,
  Shield,
  Database
} from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();

// Update the navigation array in AdminLayout.jsx
const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    current: location.pathname === '/admin'
  },
  {
    name: 'User Management',
    href: '/admin/users',
    icon: Users,
    current: location.pathname === '/admin/users'
  },
  {
    name: 'Job Management',
    href: '/admin/jobs',
    icon: Briefcase,
    current: location.pathname === '/admin/jobs'
  },
  {
    name: 'System Settings',
    href: '/admin/settings',
    icon: Settings,
    current: location.pathname === 'admin/settings'
  }
];

  const stats = [
    { label: 'Total Users', value: '2,842', change: '+12%', icon: Users },
    { label: 'Active Jobs', value: '156', change: '+8%', icon: Briefcase },
    { label: 'Applications', value: '1,234', change: '+23%', icon: BarChart3 },
    { label: 'System Health', value: '100%', change: 'Stable', icon: Shield }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-600">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900 font-heading">CareerPilot Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 text-gray-400 rounded-md lg:hidden hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-4 mt-8">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  item.current
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100">
              <User className="w-4 h-4 text-primary-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-sm text-gray-500 truncate">admin@careerpilot.com</p>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 lg:ml-64">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1 mr-4 text-gray-400 lg:hidden hover:text-gray-600"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative w-full max-w-xs">
              <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center p-2 space-x-2 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100">
                  <User className="w-4 h-4 text-primary-600" />
                </div>
                <span className="hidden text-sm font-medium text-gray-700 md:block">
                  Admin User
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 z-50 w-48 py-1 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">Admin User</p>
                    <p className="text-sm text-gray-500">admin@careerpilot.com</p>
                  </div>
                  <button className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100">
                    Profile Settings
                  </button>
                  <button className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;