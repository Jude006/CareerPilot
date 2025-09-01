import React, { useState, useEffect } from "react";
import api from "../../services/api";
import {
  Search,
  Filter,
  Plus,
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Bookmark,
  Share2,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    jobType: "",
    location: "",
    salary: "",
    experience: "",
  });
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    experience: "",
    description: "",
    skills: "",
  });

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to view jobs");
        setJobs([]);
        return;
      }

      const params = {
        search: searchTerm,
        jobType: filters.jobType,
        location: filters.location,
        salary: filters.salary,
        experience: filters.experience,
      };

      const res = await api.get("/jobs", { params });

      if (res.data.success && Array.isArray(res.data.data)) {
        setJobs(res.data.data);
      } else {
        setJobs([]);
        setError("No jobs found");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load jobs");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleSaveJob = async (jobId) => {
    try {
      setError("");
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to save jobs");
        return;
      }

      await api.put(`/jobs/${jobId}/save`, {});
      fetchJobs(); // Refresh jobs list
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save job");
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleNewJobChange = (field, value) => {
    setNewJob((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddJob = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // Validate required fields
      if (
        !newJob.title ||
        !newJob.company ||
        !newJob.location ||
        !newJob.type ||
        !newJob.experience ||
        !newJob.description
      ) {
        setError("Please fill all required fields");
        return;
      }

      const res = await api.post("/jobs", {
        ...newJob,
        skills: newJob.skills
          ? newJob.skills.split(",").map((skill) => skill.trim())
          : [],
      });

      if (res.data.success) {
        setSuccess("Job created successfully!");
        setShowAddModal(false);
        setNewJob({
          title: "",
          company: "",
          location: "",
          salary: "",
          type: "",
          experience: "",
          description: "",
          skills: "",
        });
        fetchJobs();
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add job");
    } finally {
      setLoading(false);
    }
  };

  const createApplication = async (jobId) => {
  try {
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to apply for jobs');
      return;
    }
    
    await api.post('/applications', { jobId, status: 'applied' });
    setSuccess('Application submitted successfully!');
    fetchJobs(); // Refresh to update UI
  } catch (err) {
    setError(err.response?.data?.error || 'Failed to apply for job');
  }
};

  return (
    <div className="px-4 mx-auto max-w-7xl animate-fade-in sm:px-6 lg:px-8">
      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
          {success}
        </div>
      )}
      {loading && (
        <div className="p-4 mb-4 text-blue-700 bg-blue-100 rounded-lg">
          Loading...
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Board</h1>
          <p className="text-gray-600">Discover your next career opportunity</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 mt-4 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 sm:mt-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Job
        </button>
      </div>

      {/* Search and Filters */}
      <div className="p-6 mb-6 bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search jobs, companies, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-5 h-5 mr-2 text-gray-600" />
            Filters
            {showFilters ? (
              <ChevronUp className="w-4 h-4 ml-2" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-2" />
            )}
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 gap-4 p-4 mt-4 rounded-lg md:grid-cols-2 lg:grid-cols-4 bg-gray-50">
            <select
              value={filters.jobType}
              onChange={(e) => handleFilterChange("jobType", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            <select
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Location</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            <select
              value={filters.salary}
              onChange={(e) => handleFilterChange("salary", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Salary Range</option>
              <option value="50-100">$50k - $100k</option>
              <option value="100-150">$100k - $150k</option>
              <option value="150+">$150k+</option>
            </select>

            <select
              value={filters.experience}
              onChange={(e) => handleFilterChange("experience", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Experience Level</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior Level">Senior Level</option>
            </select>
          </div>
        )}
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job._id}
              className="p-6 transition-shadow duration-300 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                    {job.company ? job.company.charAt(0).toUpperCase() : "J"}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
                      {job.title || "Untitled Job"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {job.company || "Unknown Company"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSaveJob(job._id)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    job.isSaved
                      ? "text-yellow-500 bg-yellow-50 hover:bg-yellow-100"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Bookmark
                    className={`w-5 h-5 ${job.isSaved ? "fill-current" : ""}`}
                  />
                </button>
              </div>

              <div className="mb-4 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {job.location || "Unknown Location"}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {job.salary || "Not specified"}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {job.type || "Unknown Type"} •{" "}
                  {job.experience || "Unknown Level"}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {new Date(job.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills?.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
                {job.skills?.length > 3 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">
                    +{job.skills.length - 3} more
                  </span>
                )}
              </div>

              <p className="mb-4 text-sm text-gray-700 line-clamp-2">
                {job.description || "No description available"}
              </p>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => createApplication(job._id)}
                  className="flex items-center px-4 py-2 text-sm text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Apply Now
                </button>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 transition-colors duration-200 hover:text-gray-600">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 transition-colors duration-200 hover:text-gray-600">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center col-span-full">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No jobs found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>

      {/* Load More */}
      {jobs.length > 0 && (
        <div className="mt-8 text-center">
          <button className="px-6 py-2 text-gray-700 transition-colors duration-200 border border-gray-300 rounded-lg hover:bg-gray-50">
            Load More Jobs
          </button>
        </div>
      )}

      {/* Add Job Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-xl">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Add New Job
            </h2>

            {error && (
              <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}
            {loading && (
              <div className="p-4 mb-4 text-blue-700 bg-blue-100 rounded-lg">
                Adding job...
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Job Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Senior Frontend Developer"
                  value={newJob.title}
                  onChange={(e) => handleNewJobChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Company *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Google"
                  value={newJob.company}
                  onChange={(e) =>
                    handleNewJobChange("company", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Location *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Remote, New York, NY"
                  value={newJob.location}
                  onChange={(e) =>
                    handleNewJobChange("location", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Salary
                </label>
                <input
                  type="text"
                  placeholder="e.g., $120,000 - $150,000"
                  value={newJob.salary}
                  onChange={(e) => handleNewJobChange("salary", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Job Type *
                </label>
                <select
                  value={newJob.type}
                  onChange={(e) => handleNewJobChange("type", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                >
                  <option value="">Select Job Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Experience Level *
                </label>
                <select
                  value={newJob.experience}
                  onChange={(e) =>
                    handleNewJobChange("experience", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                >
                  <option value="">Select Experience Level</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                placeholder="Describe the job responsibilities and requirements..."
                value={newJob.description}
                onChange={(e) =>
                  handleNewJobChange("description", e.target.value)
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            <div className="mt-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g., React, Node.js, JavaScript"
                value={newJob.skills}
                onChange={(e) => handleNewJobChange("skills", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleAddJob}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Job"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
