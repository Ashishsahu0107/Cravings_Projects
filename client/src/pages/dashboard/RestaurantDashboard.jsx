import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import RestaurantSidebar from '../../components/restaurantDashboard/RestaurantSidebar.jsx';
import TopNavbar from '../../components/restaurantDashboard/layout/TopNavbar.jsx';
import RightSidebar from '../../components/restaurantDashboard/layout/RightSidebar.jsx';
import FloatingActionButton from '../../components/restaurantDashboard/layout/FloatingActionButton.jsx';
import DashboardFooter from '../../components/restaurantDashboard/layout/DashboardFooter.jsx';

const RestaurantDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isStoreOpen, setIsStoreOpen] = useState(true);

  // Toggle Theme
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleStoreStatus = () => setIsStoreOpen(!isStoreOpen);

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-slate-950 font-sans transition-colors duration-200 ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex">
        {/* Left Sidebar */}
        <RestaurantSidebar 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
          isStoreOpen={isStoreOpen}
          toggleStoreStatus={toggleStoreStatus}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <TopNavbar 
            toggleSidebar={toggleSidebar} 
            isDarkMode={isDarkMode} 
            toggleDarkMode={toggleDarkMode} 
          />
          
          <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
            {/* The Outlet renders the current child route component */}
            <div className="max-w-7xl mx-auto w-full">
              <Outlet context={{ isStoreOpen, toggleStoreStatus }} />
            </div>
            <DashboardFooter />
          </main>
        </div>

        {/* Right Sidebar (Analytics & Goals) */}
        <RightSidebar />
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default RestaurantDashboard;