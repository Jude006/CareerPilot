import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Target,
  Clock,
  DollarSign,
  Download,
  Building,
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import api from '../../services/api';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('30d');
  const [exporting, setExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

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
      setShowExportMenu(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to export data');
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <p className="mt-3 text-sm text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 mx-auto mb-3 text-red-600" />
          <h3 className="mb-2 text-base font-medium text-gray-900">Error Loading Analytics</h3>
          <p className="mb-4 text-sm text-gray-600">{error}</p>
          <button
            onClick={fetchAnalyticsData}
            className="px-3 py-1.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
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
  const maxValue = Math.max(...monthlyData.map(d => Math.max(d.applications, d.interviews, d.offers)));

  return (
    <div className="min-h-screen p-3 bg-gray-50 sm:p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="p-4 mb-4 bg-white shadow-sm rounded-xl sm:p-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Analytics Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">Track your job search performance</p>
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 sm:items-center">
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
              
              {/* Export Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  disabled={exporting}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 sm:w-auto"
                >
                  <Download className="w-4 h-4 mr-1" />
                  {exporting ? 'Exporting...' : 'Export'}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                
                {showExportMenu && (
                  <div className="absolute right-0 z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg sm:w-32">
                    <button
                      onClick={() => handleExport('csv')}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      CSV
                    </button>
                    <button
                      onClick={() => handleExport('pdf')}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      PDF
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics - Mobile first grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 sm:grid-cols-3 md:grid-cols-5 md:gap-4 md:mb-6">
          {[
            { 
              title: 'Total Applications', 
              value: metrics.totalApplications, 
              icon: BarChart3, 
              color: 'text-blue-600',
              desc: 'Applications submitted'
            },
            { 
              title: 'Interview Rate', 
              value: metrics.interviewRate, 
              icon: Target, 
              color: 'text-purple-600',
              desc: 'Of applications'
            },
            { 
              title: 'Offer Rate', 
              value: metrics.offerRate, 
              icon: TrendingUp, 
              color: 'text-green-600',
              desc: 'Of applications'
            },
            { 
              title: 'Avg Response Time', 
              value: metrics.averageResponseTime, 
              icon: Clock, 
              color: 'text-yellow-600',
              desc: 'Days to response'
            },
            { 
              title: 'Average Salary', 
              value: metrics.averageSalary, 
              icon: DollarSign, 
              color: 'text-green-600',
              desc: 'From offers'
            }
          ].map((metric, index) => (
            <div key={index} className="p-3 bg-white border border-gray-200 shadow-sm rounded-xl sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-medium text-gray-600 sm:text-sm">{metric.title}</h3>
                <metric.icon className={`w-4 h-4 ${metric.color} sm:w-5 sm:h-5`} />
              </div>
              <div className="flex items-baseline">
                <span className="text-lg font-bold text-gray-900 sm:text-xl">{metric.value}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">{metric.desc}</p>
            </div>
          ))}
        </div>

        {/* Charts and Detailed Analytics */}
        <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2 md:mb-6">
          {/* Application Trend Chart */}
          <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl sm:p-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-900 sm:mb-4">Application Trend</h3>
            <div className="flex items-end h-48 pb-4 space-x-1 sm:space-x-2 md:space-x-3">
              {monthlyData.map((month, index) => (
                <div key={month.month} className="flex flex-col items-center flex-1">
                  <div className="flex justify-center w-full mb-1 space-x-0.5 sm:space-x-1 sm:mb-2">
                    <div
                      className="w-2 bg-blue-500 rounded-t sm:w-3 md:w-4"
                      style={{ height: `${(month.applications / maxValue) * 120}px` }}
                      title={`${month.applications} applications`}
                    ></div>
                    <div
                      className="w-2 bg-purple-500 rounded-t sm:w-3 md:w-4"
                      style={{ height: `${(month.interviews / maxValue) * 120}px` }}
                      title={`${month.interviews} interviews`}
                    ></div>
                    <div
                      className="w-2 bg-green-500 rounded-t sm:w-3 md:w-4"
                      style={{ height: `${(month.offers / maxValue) * 120}px` }}
                      title={`${month.offers} offers`}
                    ></div>
                  </div>
                  <span className="text-[10px] text-gray-600 sm:text-xs">{month.month}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3 pt-3 mt-3 border-t border-gray-200 sm:gap-4 sm:pt-4">
              {[
                { label: 'Applications', color: 'bg-blue-500' },
                { label: 'Interviews', color: 'bg-purple-500' },
                { label: 'Offers', color: 'bg-green-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-3 h-3 mr-1.5 rounded ${item.color}`}></div>
                  <span className="text-xs text-gray-600 sm:text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status Distribution */}
          <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl sm:p-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-900 sm:mb-4">Status Distribution</h3>
            <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40">
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
              <div className="grid flex-1 grid-cols-1 gap-1.5 sm:gap-2">
                {[
                  { status: 'Saved', count: statusDistribution.saved, color: 'bg-blue-500' },
                  { status: 'Applied', count: statusDistribution.applied, color: 'bg-yellow-500' },
                  { status: 'Interviewing', count: statusDistribution.interviewing, color: 'bg-purple-500' },
                  { status: 'Offer', count: statusDistribution.offer, color: 'bg-green-500' },
                  { status: 'Rejected', count: statusDistribution.rejected, color: 'bg-red-500' }
                ].map((item) => (
                  <div key={item.status} className="flex items-center justify-between p-1.5 rounded bg-gray-50 sm:p-2">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 ${item.color} rounded mr-1.5 sm:w-3 sm:h-3 sm:mr-2`}></div>
                      <span className="text-xs text-gray-600 sm:text-sm">{item.status}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-900 sm:text-sm">
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
          <div className="p-4 border-b border-gray-200 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Companies</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-3">Company</th>
                  <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-3">Apps</th>
                  <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-3">Interviews</th>
                  <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-3">Offers</th>
                  <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6 sm:py-3">Success</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topCompanies.map((company) => (
                  <tr key={company.name} className="hover:bg-gray-50">
                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <div className="flex items-center">
                        <Building className="w-3 h-3 mr-1.5 text-gray-400 sm:w-4 sm:h-4 sm:mr-2" />
                        <span className="text-sm font-medium sm:text-base">{company.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm sm:px-6 sm:py-4">{company.applications}</td>
                    <td className="px-4 py-3 text-sm sm:px-6 sm:py-4">{company.interviews}</td>
                    <td className="px-4 py-3 text-sm sm:px-6 sm:py-4">{company.offers}</td>
                    <td className="px-4 py-3 text-sm font-medium sm:px-6 sm:py-4">
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