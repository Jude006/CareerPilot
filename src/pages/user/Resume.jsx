import React, { useState, useEffect } from 'react';
import { FileText, Download, Trash2, AlertCircle } from 'lucide-react';
import api from '../services/api';

const Resume = () => {
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/resume');
      setResume(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load resume');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResume = async () => {
    if (!confirm('Are you sure you want to delete your resume?')) return;
    try {
      setLoading(true);
      setError('');
      await api.delete('/resume');
      setResume(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl p-6 mx-auto animate-fade-in">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Resume Management</h1>
      {error && (
        <div className="flex items-center p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}
      {loading && (
        <div className="p-4 mb-4 text-blue-700 bg-blue-100 rounded-lg">Loading...</div>
      )}

      {resume ? (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Your Resume
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">File Name: {resume.fileName}</p>
              <p className="text-sm text-gray-600">
                Uploaded: {new Date(resume.uploadedAt).toLocaleDateString()}
              </p>
              {resume.lastAnalyzed && (
                <p className="text-sm text-gray-600">
                  Last Analyzed: {new Date(resume.lastAnalyzed).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="flex space-x-3">
              <a
                href={resume.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </a>
              <button
                onClick={handleDeleteResume}
                className="flex items-center px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
            {resume.textContent && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Extracted Content Preview:</h4>
                <p className="text-sm text-gray-600 line-clamp-3">{resume.textContent}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">No resume uploaded. Visit the AI Dashboard to upload one.</p>
        </div>
      )}
    </div>
  );
};

export default Resume;