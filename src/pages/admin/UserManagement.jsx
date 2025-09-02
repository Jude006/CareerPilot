// src/pages/admin/UserManagement.jsx
import React from 'react';
import { Users, Search, Filter, Plus } from 'lucide-react';

const UserManagement = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">User Management</h1>
          <p className="text-gray-600">Manage all user accounts and permissions</p>
        </div>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search users..."
              className="py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>

        <div className="p-12 text-center rounded-lg bg-gray-50">
          <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">User Management Interface</h3>
          <p className="text-gray-600">User table and management features will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;