import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Target,
  Clock,
  DollarSign,
  Download,
  Filter,
  Building,
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import api from '../../services/api';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('30d');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/analytics?range=${timeRange}`);
      setAnalyticsData(response.data.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load analytics data');
      console.error('Analytics error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    try {
      setExporting(true);
      const response = await api.post('/analytics/export', { format });
      alert(response.data.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to export data');
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-3 text-red-600" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">Error Loading Analytics</h3>
          <p className="mb-4 text-gray-600">{error}</p>
          <button
            onClick={fetchAnalyticsData}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return null;
  }

  const { metrics, statusDistribution, monthlyData, topCompanies } = analyticsData;

  // Calculate max value for chart scaling
  const maxValue = Math.max(...monthlyData.map(d => Math.max(d.applications, d.interviews, d.offers)));

  return (
    <div className="min-h-screen p-4 bg-gray-50 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="p-6 mb-6 bg-white shadow-sm rounded-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="mt-1 text-gray-600">Track your job search performance</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="ytd">Year to Date</option>
                <option value="all">All Time</option>
              </select>
              <div className="flex gap-2">
                <button
                  onClick={() => handleExport('csv')}
                  disabled={exporting}
                  className="flex items-center px-3 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  <Download className="w-4 h-4 mr-1" />
                  {exporting ? 'Exporting...' : 'Export CSV'}
                </button>
                <button
                  onClick={() => handleExport('pdf')}
                  disabled={exporting}
                  className="flex items-center px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  <Download className="w-4 h-4 mr-1" />
                  {exporting ? 'Exporting...' : 'Export PDF'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-5">
          {/* Total Applications */}
          <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-600">Total Applications</h3>
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{metrics.totalApplications}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Applications submitted</p>
          </div>

          {/* Interview Rate */}
          <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-600">Interview Rate</h3>
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{metrics.interviewRate}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Of applications</p>
          </div>

          {/* Offer Rate */}
          <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-600">Offer Rate</h3>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{metrics.offerRate}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Of applications</p>
          </div>

          {/* Avg Response Time */}
          <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-600">Avg Response Time</h3>
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{metrics.averageResponseTime}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Days to response</p>
          </div>

          {/* Average Salary */}
          <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-600">Average Salary</h3>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{metrics.averageSalary}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">From offers</p>
          </div>
        </div>

        {/* Charts and Detailed Analytics */}
        <div className="grid grid-cols-1 gap-4 mb-6 lg:grid-cols-2">
          {/* Application Trend Chart */}
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Application Trend</h3>
            <div className="flex items-end h-64 pb-4 space-x-2 md:space-x-4">
              {monthlyData.map((month, index) => (
                <div key={month.month} className="flex flex-col items-center flex-1">
                  <div className="flex justify-center w-full mb-2 space-x-1">
                    <div
                      className="w-3 bg-blue-500 rounded-t md:w-6"
                      style={{ height: `${(month.applications / maxValue) * 180}px` }}
                      title={`${month.applications} applications`}
                    ></div>
                    <div
                      className="w-3 bg-purple-500 rounded-t md:w-6"
                      style={{ height: `${(month.interviews / maxValue) * 180}px` }}
                      title={`${month.interviews} interviews`}
                    ></div>
                    <div
                      className="w-3 bg-green-500 rounded-t md:w-6"
                      style={{ height: `${(month.offers / maxValue) * 180}px` }}
                      title={`${month.offers} offers`}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{month.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center pt-4 mt-4 space-x-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="w-3 h-3 mr-2 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-600">Applications</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 mr-2 bg-purple-500 rounded"></div>
                <span className="text-sm text-gray-600">Interviews</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 mr-2 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">Offers</span>
              </div>
            </div>
          </div>

          {/* Status Distribution */}
          <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Status Distribution</h3>
            <div className="flex flex-col items-center md:flex-row">
              <div className="relative w-40 h-40 mx-auto mb-4 md:mb-0 md:mr-6">
                {/* Pie chart using conic gradient */}
                <div className="w-full h-full overflow-hidden rounded-full">
                  <div className="w-full h-full" style={{
                    background: `conic-gradient(
                      #3B82F6 0% ${(statusDistribution.saved / metrics.totalApplications) * 100}%, 
                      #F59E0B ${(statusDistribution.saved / metrics.totalApplications) * 100}% ${((statusDistribution.saved + statusDistribution.applied) / metrics.totalApplications) * 100}%,
                      #8B5CF6 ${((statusDistribution.saved + statusDistribution.applied) / metrics.totalApplications) * 100}% ${((statusDistribution.saved + statusDistribution.applied + statusDistribution.interviewing) / metrics.totalApplications) * 100}%,
                      #10B981 ${((statusDistribution.saved + statusDistribution.applied + statusDistribution.interviewing) / metrics.totalApplications) * 100}% ${((statusDistribution.saved + statusDistribution.applied + statusDistribution.interviewing + statusDistribution.offer) / metrics.totalApplications) * 100}%,
                      #EF4444 ${((statusDistribution.saved + statusDistribution.applied + statusDistribution.interviewing + statusDistribution.offer) / metrics.totalApplications) * 100}% 100%
                    )`
                  }}></div>
                </div>
              </div>
              <div className="grid flex-1 grid-cols-1 gap-2">
                {[
                  { status: 'Saved', count: statusDistribution.saved, color: 'bg-blue-500' },
                  { status: 'Applied', count: statusDistribution.applied, color: 'bg-yellow-500' },
                  { status: 'Interviewing', count: statusDistribution.interviewing, color: 'bg-purple-500' },
                  { status: 'Offer', count: statusDistribution.offer, color: 'bg-green-500' },
                  { status: 'Rejected', count: statusDistribution.rejected, color: 'bg-red-500' }
                ].map((item) => (
                  <div key={item.status} className="flex items-center justify-between p-2 rounded bg-gray-50">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 ${item.color} rounded mr-2`}></div>
                      <span className="text-sm text-gray-600">{item.status}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {item.count} ({metrics.totalApplications > 0 ? Math.round((item.count / metrics.totalApplications) * 100) : 0}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Companies */}
        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Companies</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Company</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Applications</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Interviews</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Offers</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Success Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topCompanies.map((company) => (
                  <tr key={company.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="font-medium">{company.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{company.applications}</td>
                    <td className="px-6 py-4">{company.interviews}</td>
                    <td className="px-6 py-4">{company.offers}</td>
                    <td className="px-6 py-4">
                      {company.successRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;