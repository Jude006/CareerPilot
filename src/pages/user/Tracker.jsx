import React, { useState, useEffect } from 'react';
import {
  ClipboardList,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  Calendar,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Edit3,
  Trash2,
  X,
  Check
} from 'lucide-react';
import api from '../../services/api';

const Tracker = () => {
  const [applications, setApplications] = useState({
    saved: [],
    applied: [],
    interviewing: [],
    offer: [],
    rejected: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newApplication, setNewApplication] = useState({
    jobId: '',
    status: 'saved'
  });
  const [editingApplication, setEditingApplication] = useState(null);
  const [userJobs, setUserJobs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  try {
    setLoading(true);
    const [applicationsResponse, jobsResponse] = await Promise.all([
      api.get('/applications'),
      api.get('/jobs')
    ]);
    
    // Backend returns array, but frontend expects object with status keys
    const applicationsArray = applicationsResponse.data.data;
    const applicationsByStatus = {
      saved: applicationsArray.filter(app => app.status === 'saved'),
      applied: applicationsArray.filter(app => app.status === 'applied'),
      interviewing: applicationsArray.filter(app => app.status === 'interviewing'),
      offer: applicationsArray.filter(app => app.status === 'offer'),
      rejected: applicationsArray.filter(app => app.status === 'rejected')
    };
    
    setApplications(applicationsByStatus);
    setUserJobs(jobsResponse.data.data);
    setError('');
  } catch (err) {
    setError(err.response?.data?.error || 'Failed to load data');
    console.error('Tracker error:', err);
  } finally {
    setLoading(false);
  }
};

  const handleStatusUpdate = async (applicationId, newStatus) => {
  try {
    const response = await api.put(`/applications/${applicationId}`, {
      status: newStatus
    });
    
    const updatedApplication = response.data.data;
    
    // Update local state
    setApplications(prev => {
      const updatedApps = { ...prev };
      
      // Remove from all status arrays
      Object.keys(updatedApps).forEach(status => {
        updatedApps[status] = updatedApps[status].filter(
          app => app._id !== applicationId
        );
      });
      
      // Add to new status array
      updatedApps[newStatus].push(updatedApplication);
      
      return updatedApps;
    });
  } catch (err) {
    setError(err.response?.data?.error || 'Failed to update status');
  }
};

const handleCreateApplication = async () => {
  try {
    if (!newApplication.jobId) {
      setError('Please select a job');
      return;
    }

    const response = await api.post('/applications', newApplication);
    const createdApplication = response.data.data;
    
    // Update local state
    setApplications(prev => ({
      ...prev,
      [newApplication.status]: [...prev[newApplication.status], createdApplication]
    }));
    
    setShowAddModal(false);
    setNewApplication({ jobId: '', status: 'saved' });
    setError('');
  } catch (err) {
    setError(err.response?.data?.error || 'Failed to create application');
  }
};
  const statusConfig = {
    saved: { title: 'Saved', color: 'bg-blue-100 text-blue-800', count: applications.saved.length },
    applied: { title: 'Applied', color: 'bg-yellow-100 text-yellow-800', count: applications.applied.length },
    interviewing: { title: 'Interviewing', color: 'bg-purple-100 text-purple-800', count: applications.interviewing.length },
    offer: { title: 'Offer', color: 'bg-green-100 text-green-800', count: applications.offer.length },
    rejected: { title: 'Rejected', color: 'bg-red-100 text-red-800', count: applications.rejected.length }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="p-6 mb-6 bg-white shadow-sm rounded-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">Application Tracker</h1>
              <p className="mt-1 text-gray-600">Manage your job applications</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 md:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Application
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
            <div className="flex items-center">
              <X className="w-5 h-5 mr-2 text-red-600" />
              <span className="text-red-600">{error}</span>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="p-6 mb-6 bg-white shadow-sm rounded-xl">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['all', ...Object.keys(statusConfig)].map(status => (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status)}
                  className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                    activeFilter === status
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {status === 'all' ? 'All Applications' : statusConfig[status].title}
                  {status !== 'all' && (
                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${statusConfig[status].color}`}>
                      {statusConfig[status].count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 min-w-max">
            {Object.entries(statusConfig).map(([status, config]) => (
              <div key={status} className="w-64 bg-white border border-gray-200 shadow-sm rounded-xl">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{config.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${config.color}`}>
                      {config.count}
                    </span>
                  </div>
                </div>
                
                <div className="p-3 space-y-3 min-h-[200px] max-h-[70vh] overflow-y-auto">
                  {applications[status].map((application) => (
                    <div key={application._id} className="p-3 transition-shadow border border-gray-200 rounded-lg bg-gray-50 hover:shadow-md">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {application.job?.title || 'Unknown Position'}
                          </h4>
                          <p className="text-sm text-gray-600 truncate">
                            {application.job?.company || 'Unknown Company'}
                          </p>
                        </div>
                        <div className="flex items-center ml-2 space-x-1">
                          <button
                            onClick={() => setEditingApplication(application)}
                            className="p-1 text-gray-400 hover:text-blue-600"
                            title="Edit application"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteApplication(application._id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                            title="Delete application"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="flex-shrink-0 w-3 h-3 mr-1" />
                          <span className="truncate">{application.job?.location || 'Unknown location'}</span>
                        </div>
                        {application.job?.salary && (
                          <div className="flex items-center">
                            <DollarSign className="flex-shrink-0 w-3 h-3 mr-1" />
                            <span className="truncate">{application.job.salary}</span>
                          </div>
                        )}
                        {application.job?.type && (
                          <div className="flex items-center">
                            <Briefcase className="flex-shrink-0 w-3 h-3 mr-1" />
                            <span className="truncate">{application.job.type}</span>
                          </div>
                        )}
                        {application.appliedDate && (
                          <div className="flex items-center">
                            <Calendar className="flex-shrink-0 w-3 h-3 mr-1" />
                            <span>{new Date(application.appliedDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="pt-2 mt-3 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-2">
                          {Object.keys(statusConfig).map(nextStatus => (
                            status !== nextStatus && (
                              <button
                                key={nextStatus}
                                onClick={() => handleStatusUpdate(application._id, nextStatus)}
                                className="px-2 py-1 text-xs text-center transition-colors bg-white border border-gray-300 rounded hover:bg-gray-50"
                                title={`Move to ${statusConfig[nextStatus].title}`}
                              >
                                {statusConfig[nextStatus].title}
                              </button>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {applications[status].length === 0 && (
                    <div className="py-8 text-center text-gray-500">
                      <ClipboardList className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No applications</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md bg-white shadow-lg rounded-xl">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Add Application</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Select Job</label>
                <select
                  value={newApplication.jobId}
                  onChange={(e) => setNewApplication({ ...newApplication, jobId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a job</option>
                  {userJobs.map(job => (
                    <option key={job._id} value={job._id}>
                      {job.title} - {job.company}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Initial Status</label>
                <select
                  value={newApplication.status}
                  onChange={(e) => setNewApplication({ ...newApplication, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.entries(statusConfig).map(([status, config]) => (
                    <option key={status} value={status}>{config.title}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end p-6 space-x-3 border-t border-gray-200">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateApplication}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Add Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracker;