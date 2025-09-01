import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardNav from './DashboardNav';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="flex h-screen overflow-hidden bg-gray-50">
      <div className={`fixed inset-y-0 left-0 z-50 w-72 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 lg:relative lg:z-0`}>
        <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex flex-col flex-1 min-w-0">
        <DashboardNav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </main>
    </section>
  );
};

export default DashboardLayout;