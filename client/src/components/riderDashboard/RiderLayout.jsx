import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import RiderSidebar from './RiderSidebar';
import RiderHeader from './RiderHeader';
import { Toaster } from 'react-hot-toast';

const RiderLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleOnlineStatus = () => setIsOnline(!isOnline);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#0B1120] overflow-hidden">
      <Toaster />
      
      {/* Sidebar */}
      <RiderSidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        isOnline={isOnline}
        toggleOnlineStatus={toggleOnlineStatus}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <RiderHeader 
          toggleSidebar={toggleSidebar} 
          isOnline={isOnline} 
        />
        
        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
          <Outlet context={{ isOnline }} />
        </main>
      </div>
    </div>
  );
};

export default RiderLayout;
