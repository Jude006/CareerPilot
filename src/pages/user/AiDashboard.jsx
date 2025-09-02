import React, { useState, useEffect } from 'react';
import { 
  Upload, FileText, BarChart, Briefcase, Target, TrendingUp, 
  Clock, Zap, ChevronRight, Sparkles, Brain, Star, Download,
  AlertCircle, CheckCircle, X, Lightbulb, Users, Award, Rocket,
  MessageSquare, BookOpen, Shield, Heart, ThumbsUp, Calendar
} from 'lucide-react';
import api from '../../services/api';

const AIDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/ai/dashboard');
      setDashboardData(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load dashboard data');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file) => {
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF, DOC, DOCX, or TXT file');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('resume', file);

    try {
      await api.post('/resume/upload', formData);
      
      setSuccess('Resume uploaded successfully!');
      await fetchDashboardData();
      
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  const analyzeResume = async () => {
    setAnalyzing(true);
    setError('');
    try {
      await api.post('/ai/analyze-resume');
      setSuccess('Resume analyzed successfully!');
      await fetchDashboardData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze resume');
    } finally {
      setAnalyzing(false);
    }
  };

  const getJobMatches = async () => {
    setAnalyzing(true);
    setError('');
    try {
      await api.get('/ai/job-matches');
      setSuccess('Job matches generated successfully!');
      await fetchDashboardData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate job matches');
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getResumeFileName = () => {
    return dashboardData?.user?.resume?.fileName || 'Unknown file';
  };

  const getResumeUploadDate = () => {
    return dashboardData?.user?.resume?.uploadedAt 
      ? new Date(dashboardData.user.resume.uploadedAt).toLocaleDateString()
      : 'Unknown date';
  };

  const downloadResume = () => {
    if (dashboardData?.user?.resume?.fileUrl) {
      window.open(dashboardData.user.resume.fileUrl, '_blank');
    }
  };

  const getUniqueRecommendations = (insights) => {
    const allRecommendations = insights.flatMap(insight => 
      insight.recommendations || []
    );
    return [...new Set(allRecommendations)].slice(0, 5);
  };

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-b-2 border-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const uniqueRecommendations = getUniqueRecommendations(dashboardData.insights);

  return (
    <div className="p-6 mx-auto max-w-7xl animate-fade-in">
      {/* Header */}
      <div className="flex flex-col mb-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-4 lg:mb-0">
          <div className="flex items-center">
            <Brain className="w-10 h-10 mr-3 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Career Assistant</h1>
              <p className="text-gray-600">Powered by advanced AI to supercharge your job search</p>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={() => document.getElementById('resume-upload').click()}
            className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Resume
          </button>
          <button 
            onClick={analyzeResume}
            disabled={!dashboardData.user.hasResume || analyzing}
            className="flex items-center px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {analyzing ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center p-4 mb-6 text-red-700 bg-red-100 rounded-lg">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}
      
      {success && (
        <div className="flex items-center p-4 mb-6 text-green-700 bg-green-100 rounded-lg">
          <CheckCircle className="w-5 h-5 mr-2" />
          {success}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="flex space-x-8">
          {['overview', 'matches', 'insights', 'actions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Resume Score</h3>
                <BarChart className="w-6 h-6 text-blue-600" />
              </div>
              {dashboardData.resumeScore > 0 ? (
                <div className="flex items-end">
                  <div className={`text-4xl font-bold ${getScoreColor(dashboardData.resumeScore)}`}>
                    {dashboardData.resumeScore}
                    <span className="text-lg">/100</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">AI Assessment</p>
                    {dashboardData.user.lastAnalysis && (
                      <p className="text-xs text-gray-500">
                        Updated: {new Date(dashboardData.user.lastAnalysis).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600">Upload resume to get started</p>
                  <button 
                    onClick={() => document.getElementById('resume-upload').click()}
                    className="px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Upload Resume
                  </button>
                </div>
              )}
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Job Matches</h3>
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900">{dashboardData.jobMatches.length}</div>
              <p className="text-sm text-gray-600">Quality opportunities</p>
              <button 
                onClick={getJobMatches}
                disabled={!dashboardData.user.hasResume || analyzing}
                className="px-4 py-2 mt-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {analyzing ? 'Finding...' : 'Find Matches'}
              </button>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900">{dashboardData.insights.length}</div>
              <p className="text-sm text-gray-600">Personalized recommendations</p>
              <div className="mt-2">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 transition-all duration-300 bg-purple-600 rounded-full" 
                    style={{ width: `${Math.min(dashboardData.insights.length * 20, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Profile Strength</h3>
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900">
                {dashboardData.user.hasResume ? '85%' : '45%'}
              </div>
              <p className="text-sm text-gray-600">Completion score</p>
              <div className="mt-2">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 transition-all duration-300 bg-yellow-600 rounded-full" 
                    style={{ width: dashboardData.user.hasResume ? '85%' : '45%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Resume Section */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Your Resume
              </h3>
              
              {dashboardData.user.hasResume ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div>
                      <p className="font-medium text-gray-900">{getResumeFileName()}</p>
                      <p className="text-sm text-gray-600">
                        Uploaded: {getResumeUploadDate()}
                      </p>
                      {dashboardData.user.lastAnalysis && (
                        <p className="mt-1 text-xs text-gray-500">
                          Last analyzed: {new Date(dashboardData.user.lastAnalysis).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={downloadResume}
                        className="p-2 text-blue-600 bg-white rounded-lg shadow-sm hover:text-blue-800"
                        title="Download Resume"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => document.getElementById('resume-upload').click()}
                        className="p-2 text-gray-600 bg-white rounded-lg shadow-sm hover:text-gray-800"
                        title="Replace Resume"
                      >
                        <Upload className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-green-50">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Resume successfully analyzed</span>
                    </div>
                    <p className="mt-1 text-xs text-green-600">
                      Your resume is ready for AI-powered insights and job matching
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="p-6 text-center rounded-lg bg-gradient-to-r from-gray-50 to-blue-50">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h4 className="mb-2 text-lg font-medium text-gray-900">No Resume Uploaded</h4>
                    <p className="mb-4 text-gray-600">
                      Upload your resume to unlock AI-powered career insights and personalized job recommendations
                    </p>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <Upload className="w-12 h-12 text-gray-400" />
                        <div className="text-sm text-gray-600">
                          <p className="font-medium">Drag & drop your resume here</p>
                          <p>or</p>
                        </div>
                        <label className="cursor-pointer">
                          <span className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                            Browse Files
                          </span>
                          <input
                            id="resume-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileSelect}
                            accept=".pdf,.doc,.docx,.txt"
                            disabled={uploading}
                          />
                        </label>
                        <p className="text-xs text-gray-500">
                          Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
                        </p>
                      </div>
                    </div>
                    {uploading && (
                      <div className="flex items-center p-3 mt-4 border border-blue-200 rounded-lg bg-blue-50">
                        <div className="w-5 h-5 mr-2 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                        <span className="text-sm text-blue-600">Uploading resume...</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 mt-6 rounded-lg bg-yellow-50">
                    <div className="flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">Why upload your resume?</span>
                    </div>
                    <ul className="mt-2 space-y-1 text-xs text-yellow-700">
                      <li>• Get personalized job recommendations</li>
                      <li>• Receive AI-powered resume feedback</li>
                      <li>• Discover skill gaps and improvement areas</li>
                      <li>• Track your career progress over time</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
                <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <button 
                  onClick={analyzeResume}
                  disabled={!dashboardData.user.hasResume || analyzing}
                  className="flex items-center justify-between w-full p-4 text-left transition-all duration-200 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  <div className="flex items-center">
                    <div className="p-2 mr-3 bg-blue-100 rounded-lg">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Analyze Resume</p>
                      <p className="text-sm text-gray-600">Get AI-powered feedback and insights</p>
                    </div>
                  </div>
                  {analyzing ? (
                    <div className="w-5 h-5 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                <button 
                  onClick={getJobMatches}
                  disabled={!dashboardData.user.hasResume || analyzing}
                  className="flex items-center justify-between w-full p-4 text-left transition-all duration-200 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  <div className="flex items-center">
                    <div className="p-2 mr-3 bg-green-100 rounded-lg">
                      <Briefcase className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Find Job Matches</p>
                      <p className="text-sm text-gray-600">Discover perfect opportunities</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                
                <button className="flex items-center justify-between w-full p-4 text-left transition-all duration-200 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="p-2 mr-3 bg-purple-100 rounded-lg">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Skill Analysis</p>
                      <p className="text-sm text-gray-600">Identify gaps and strengths</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                
                <button className="flex items-center justify-between w-full p-4 text-left transition-all duration-200 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="p-2 mr-3 bg-red-100 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Interview Prep</p>
                      <p className="text-sm text-gray-600">Practice with AI-generated questions</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Top Recommendations */}
          {uniqueRecommendations.length > 0 && (
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
                <Star className="w-5 h-5 mr-2 text-yellow-600" />
                Top Recommendations
              </h3>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {uniqueRecommendations.map((recommendation, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-start mb-2">
                      <div className="flex-shrink-0">
                        <div className="p-1 bg-blue-100 rounded-lg">
                          <Lightbulb className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{recommendation}</p>
                    </div>
                    <div className="flex items-center mt-2">
                      <ThumbsUp className="w-3 h-3 mr-1 text-blue-500" />
                      <span className="text-xs text-blue-600">AI Suggested</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Job Matches Tab */}
      {activeTab === 'matches' && dashboardData.jobMatches.length > 0 && (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recommended Job Matches</h2>
            <span className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
              {dashboardData.jobMatches.length} matches found
            </span>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {dashboardData.jobMatches.map((match, index) => (
              <div key={index} className="p-6 transition-all duration-300 border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{match.jobTitle}</h3>
                    <p className="text-gray-600">{match.company}</p>
                  </div>
                  <div className={`px-3 py-1 text-sm font-medium rounded-full ${getScoreBgColor(match.matchScore)} ${getScoreColor(match.matchScore)}`}>
                    {match.matchScore}% match
                  </div>
                </div>
                
                {match.matchingSkills && match.matchingSkills.length > 0 && (
                  <div className="mb-4">
                    <p className="mb-2 text-sm font-medium text-gray-700">Your Matching Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {match.matchingSkills.slice(0, 5).map((skill, i) => (
                        <span key={i} className="px-3 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                          {skill}
                        </span>
                      ))}
                      {match.matchingSkills.length > 5 && (
                        <span className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                          +{match.matchingSkills.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Posted 2 days ago</span>
                  </div>
                  <button className="flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                    Apply Now
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && dashboardData.insights.length > 0 && (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">AI-Powered Insights</h2>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {dashboardData.insights.map((insight, index) => (
              <div key={index} className="p-6 transition-shadow border border-gray-200 rounded-lg hover:shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 capitalize">
                    {insight.type.replace(/_/g, ' ')}
                  </h3>
                  <div className={`px-3 py-1 text-sm font-medium rounded-full ${getScoreBgColor(insight.score)} ${getScoreColor(insight.score)}`}>
                    {insight.score}%
                  </div>
                </div>
                
                <div className="flex items-center mb-4 text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  Generated {new Date(insight.generatedAt).toLocaleDateString()}
                </div>
                
                {insight.recommendations && insight.recommendations.length > 0 && (
                  <div>
                    <h4 className="mb-3 font-medium text-gray-700">Recommendations:</h4>
                    <ul className="space-y-2">
                      {insight.recommendations.slice(0, 4).map((rec, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <Rocket className="w-4 h-4 mr-2 text-green-500" />
                          </div>
                          <span className="text-sm text-gray-600">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIDashboard;