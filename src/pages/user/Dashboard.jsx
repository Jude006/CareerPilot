import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Briefcase, 
  CheckCircle, 
  Clock, 
  Plus,
  FileText,
  Download,
  Calendar,
  ArrowUpRight,
  Search,
  Filter,
  Bell,
  AlertCircle
} from 'lucide-react';
import api from '../../services/api';

// Icon mapping object
const iconComponents = {
  Briefcase,
  TrendingUp,
  CheckCircle,
  Clock
};

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await api.get('/dashboard');
      const { stats: dashboardStats, recentApplications: apps, upcomingInterviews: interviews } = response.data.data;
      
      setStats(dashboardStats);
      setRecentApplications(apps);
      setUpcomingInterviews(interviews);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'interviewing': return 'bg-blue-100 text-blue-800';
      case 'applied': return 'bg-gray-100 text-gray-800';
      case 'offer': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'saved': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'interviewing': return 'Interviewing';
      case 'applied': return 'Applied';
      case 'offer': return 'Offer';
      case 'rejected': return 'Rejected';
      case 'saved': return 'Saved';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-3 text-red-600" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">Error Loading Dashboard</h3>
          <p className="mb-4 text-gray-600">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50 md:p-6">
      <div className="mx-auto space-y-6 max-w-7xl animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your job search overview.</p>
          </div>
          <div className="flex mt-4 space-x-3 sm:mt-0">
            <button className="flex items-center px-4 py-2 text-gray-700 transition-colors duration-200 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <Link
              to="/user/add-job"
              className="flex items-center px-4 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Job
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const IconComponent = iconComponents[stat.icon] || Briefcase;
            return (
              <div 
                key={index} 
                className="p-6 transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${
                    stat.color === 'blue' ? 'bg-blue-100' :
                    stat.color === 'green' ? 'bg-green-100' :
                    stat.color === 'purple' ? 'bg-purple-100' :
                    'bg-orange-100'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-6 h-6 ${
                      stat.color === 'blue' ? 'text-blue-600' :
                      stat.color === 'green' ? 'text-green-600' :
                      stat.color === 'purple' ? 'text-purple-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.change > 0 ? 'text-green-600' : stat.change < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change > 0 ? '+' : ''}{stat.change}%
                  </span>
                </div>
                <h3 className="mb-1 text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Applications */}
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
              <Link to="/user/tracker" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div 
                  key={application.id} 
                  className="flex items-center p-4 transition-all duration-200 border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50 group"
                >
                  <div className="flex items-center justify-center w-10 h-10 mr-4 font-semibold text-white rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                    {application.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{application.company}</h4>
                    <p className="text-sm text-gray-600 truncate">{application.position}</p>
                  </div>
                  <div className="ml-4 text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                      {getStatusText(application.status)}
                    </span>
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(application.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {recentApplications.length === 0 && (
                <div className="py-8 text-center">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">No applications yet</p>
                  <p className="mt-1 text-sm text-gray-500">Start by adding your first job application</p>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Interviews */}
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Interviews</h2>
              <Link to="/user/tracker" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div 
                  key={interview.id} 
                  className="flex items-center p-4 transition-all duration-200 border border-gray-200 rounded-lg hover:border-green-200 hover:bg-green-50 group"
                >
                  <div className="flex items-center justify-center w-12 h-12 mr-4 bg-green-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{interview.company}</h4>
                    <p className="text-sm text-gray-600">{interview.position}</p>
                    <p className="mt-1 text-xs text-gray-500">{interview.type}</p>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-medium text-gray-900">{interview.time}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(interview.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {upcomingInterviews.length === 0 && (
                <div className="py-8 text-center">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">No upcoming interviews</p>
                  <p className="mt-1 text-sm text-gray-500">Schedule interviews to see them here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
          <h2 className="mb-6 text-lg font-semibold text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Link 
              to="/user/jobs" 
              className="p-4 text-center transition-colors duration-200 rounded-lg bg-blue-50 hover:bg-blue-100 group"
            >
              <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 transition-transform duration-300 bg-blue-600 rounded-lg group-hover:scale-110">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">Add Job</span>
            </Link>
            
            <Link 
              to="/user/analytics" 
              className="p-4 text-center transition-colors duration-200 rounded-lg bg-green-50 hover:bg-green-100 group"
            >
              <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 transition-transform duration-300 bg-green-600 rounded-lg group-hover:scale-110">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">Analytics</span>
            </Link>
            
            <Link 
              to="/user/export" 
              className="p-4 text-center transition-colors duration-200 rounded-lg bg-purple-50 hover:bg-purple-100 group"
            >
              <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 transition-transform duration-300 bg-purple-600 rounded-lg group-hover:scale-110">
                <Download className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">Export Data</span>
            </Link>
            
            <Link 
              to="/user/profile" 
              className="p-4 text-center transition-colors duration-200 rounded-lg bg-orange-50 hover:bg-orange-100 group"
            >
              <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 transition-transform duration-300 bg-orange-600 rounded-lg group-hover:scale-110">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;