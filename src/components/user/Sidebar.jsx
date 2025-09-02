import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  BarChart3, 
  FileText, 
  Download, 
  User,
  Settings,
  LogOut,
  X,Bot
} from 'lucide-react';

const Sidebar = ({ setSidebarOpen, sidebarOpen }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/user/dashboard', icon: Home },
    { name: 'Job Board', href: '/user/jobs', icon: Briefcase },
    { name: 'Tracker', href: '/user/tracker', icon: BarChart3 },
    { name: 'Analytics', href: '/user/analytics', icon: FileText },
    { name: 'Export Data', href: '/user/export', icon: Download },
    { name: 'AI Assistant', href: '/user/aiDashboard', icon: Bot },
    { name: 'Profile', href: '/user/profile', icon: User },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 rounded-lg h-11 bg-gradient-to-br from-blue-600 to-cyan-600">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">CareerPilot</span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-1 rounded-md lg:hidden hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center w-full px-4 py-3 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-900 hover:bg-gray-50">
          <Settings className="w-5 h-5 mr-3" />
          <span className="font-medium">Settings</span>
        </button>
        <button className="flex items-center w-full px-4 py-3 text-red-600 transition-colors duration-200 rounded-lg hover:text-red-700 hover:bg-red-50">
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;