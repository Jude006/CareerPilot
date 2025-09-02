import React, { useState, useEffect } from "react";
import {
  Download,
  FileText,
  Calendar,
  CheckSquare,
  Square,
  FileDown,
  CheckCircle2,
  Clock,
  X,
} from "lucide-react";
import api from "../../services/api";

const Export = () => {
  const [selectedFormat, setSelectedFormat] = useState("csv");
  const [dateRange, setDateRange] = useState("all");
  const [selectedData, setSelectedData] = useState({
    jobs: true,
    applications: true,
    notes: true,
  });
  const [exportHistory, setExportHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchExportHistory();
  }, []);

  const fetchExportHistory = async () => {
    try {
      const response = await api.get("/export/history");
      setExportHistory(response.data.data);
    } catch (err) {
      console.error("Failed to fetch export history:", err);
    }
  };

  const handleSelectAll = () => {
    const allSelected = Object.values(selectedData).every((value) => value);
    const newSelection = {};
    Object.keys(selectedData).forEach((key) => {
      newSelection[key] = !allSelected;
    });
    setSelectedData(newSelection);
  };

  const handleExport = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // Get selected data types
      const dataTypes = Object.entries(selectedData)
        .filter(([key, value]) => value)
        .map(([key]) => key);

      if (dataTypes.length === 0) {
        setError("Please select at least one data type to export");
        return;
      }

      const response = await api.post(
        "/export",
        {
          format: selectedFormat,
          dataTypes,
          dateRange,
        },
        {
          responseType: "blob", // Important for file downloads
        }
      );

      // Create download link
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Create filename with timestamp
      const timestamp = new Date().toISOString().split("T")[0];
      const fileName = `careerpilot_export_${timestamp}.${selectedFormat}`;

      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setSuccess("Export completed successfully!");

      // Refresh export history
      fetchExportHistory();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to export data");
      console.error("Export error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadAgain = async (exportItem) => {
    // This would trigger a re-export or download from storage
    // For now, we'll just show a message
    alert(`Downloading ${exportItem.name} again...`);
  };

  const isExportButtonDisabled =
    !Object.values(selectedData).some((value) => value) || loading;

  return (
    <div className="min-h-screen p-4 bg-gray-50 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="p-6 mb-6 bg-white shadow-sm rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Export Data</h1>
              <p className="mt-1 text-gray-600">
                Export your job search data for backup or analysis
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 mb-6 bg-red-100 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <X className="w-5 h-5 mr-2 text-red-600" />
              <span className="text-red-600">{error}</span>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="p-4 mb-6 bg-green-100 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />
              <span className="text-green-600">{success}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Export Options */}
          <div className="lg:col-span-2">
            <div className="p-6 mb-6 bg-white shadow-sm rounded-xl">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Export Options
              </h2>

              {/* Format Selection */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Export Format
                </label>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {["CSV", "Excel", "JSON", "PDF"].map((format) => (
                    <button
                      key={format}
                      onClick={() => setSelectedFormat(format.toLowerCase())}
                      className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-colors ${
                        selectedFormat === format.toLowerCase()
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <FileText className="w-5 h-5 mb-1" />
                      <span className="text-sm font-medium">{format}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Date Range
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Time</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                  <option value="ytd">Year to Date</option>
                </select>
              </div>

              {/* Data Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Data to Export
                  </label>
                  <button
                    onClick={handleSelectAll}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    {Object.values(selectedData).every((value) => value)
                      ? "Deselect All"
                      : "Select All"}
                  </button>
                </div>
               
                <div className="space-y-2">
                  {[
                    { key: "jobs", label: "Job Listings" },
                    { key: "applications", label: "Application History" },
                    { key: "notes", label: "Interview Notes" },
                  ].map(({ key, label }) => (
                    <label
                      key={key}
                      className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      {selectedData[key] ? (
                        <CheckSquare className="w-5 h-5 mr-3 text-blue-600" />
                      ) : (
                        <Square className="w-5 h-5 mr-3 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Export Button */}
              <button
                onClick={handleExport}
                disabled={isExportButtonDisabled}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-colors ${
                  isExportButtonDisabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Export Data
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Export History */}
          <div>
            <div className="sticky p-6 bg-white shadow-sm rounded-xl top-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Export History
              </h2>

              {exportHistory.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  <FileDown className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No export history yet</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {exportHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-xs text-gray-500">
                            {new Date(item.date).toLocaleDateString()} at{" "}
                            {new Date(item.date).toLocaleTimeString()}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            item.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : item.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>
                          {item.format} • {item.size}
                        </span>
                        <div className="flex items-center">
                          {item.status === "completed" ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 mr-1 text-green-600" />
                              <span>Ready</span>
                            </>
                          ) : item.status === "processing" ? (
                            <>
                              <Clock className="w-3 h-3 mr-1 text-blue-600" />
                              <span>Processing</span>
                            </>
                          ) : (
                            <span className="text-red-600">Failed</span>
                          )}
                        </div>
                      </div>

                      {item.status === "completed" && (
                        <button
                          onClick={() => handleDownloadAgain(item)}
                          className="w-full mt-3 py-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          Download Again
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="p-6 mt-6 border border-blue-200 bg-blue-50 rounded-xl">
          <h3 className="mb-3 text-lg font-semibold text-blue-900">
            About Data Export
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                <span className="text-xs text-blue-600">✓</span>
              </div>
              <span>
                Exports include all selected data in your preferred format
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                <span className="text-xs text-blue-600">✓</span>
              </div>
              <span>CSV and Excel formats are best for data analysis</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                <span className="text-xs text-blue-600">✓</span>
              </div>
              <span>JSON format preserves all data relationships</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                <span className="text-xs text-blue-600">✓</span>
              </div>
              <span>PDF format is ideal for printing and sharing reports</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Export;
