// src/pages/admin/SystemSettings.jsx
import React from 'react';
import { Settings, Save } from 'lucide-react';

const SystemSettings = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">System Settings</h1>
          <p className="text-gray-600">Configure system preferences and options</p>
        </div>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-12 text-center rounded-lg bg-gray-50">
          <Settings className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">System Settings</h3>
          <p className="text-gray-600">Configuration options and settings will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;