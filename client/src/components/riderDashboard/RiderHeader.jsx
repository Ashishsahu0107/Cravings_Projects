import React, { useState } from 'react';
import { Search, Bell, Menu, AlertTriangle } from 'lucide-react';
import EmergencyModal from './modules/EmergencyModal';

const RiderHeader = ({ toggleSidebar, isOnline }) => {
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-[70px] px-4 md:px-8 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-sm shrink-0">
      
      {/* Mobile Menu & Search */}
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition"
        >
          <Menu size={24} />
        </button>

        <div className="hidden md:flex items-center gap-2 bg-gray-50 dark:bg-slate-800/50 px-4 py-2.5 rounded-xl border border-gray-100 dark:border-slate-700 w-full max-w-sm transition-all focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search orders, customers..." 
            className="bg-transparent border-none outline-none text-sm w-full text-gray-700 dark:text-gray-200"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 md:gap-6">
        
        {/* SOS Emergency Button */}
        <button 
          onClick={() => setIsEmergencyOpen(true)}
          className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-500 px-3 py-1.5 md:px-4 md:py-2 rounded-xl transition font-black text-xs uppercase tracking-wider border border-red-100 dark:border-red-500/20 shadow-sm"
        >
          <AlertTriangle size={16} /> <span className="hidden sm:inline">SOS</span>
        </button>
        
        {/* Current Earnings Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-green-50 dark:bg-green-500/10 px-4 py-2 rounded-xl border border-green-100 dark:border-green-500/20">
          <span className="text-xs font-bold text-green-600 dark:text-green-500 uppercase tracking-wider">Today</span>
          <span className="text-sm font-black text-green-700 dark:text-green-400">₹850.00</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition">
          <Bell size={22} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>

        {/* Profile Avatar */}
        <button className="flex items-center gap-3 p-1 pl-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition border border-transparent dark:hover:border-slate-700">
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-gray-800 dark:text-white leading-tight">Rakesh Kumar</p>
            <p className={`text-xs font-bold ${isOnline ? 'text-green-500' : 'text-red-500'}`}>{isOnline ? 'Online' : 'Offline'}</p>
          </div>
          <img 
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Rakesh" 
            alt="Profile" 
            className="w-10 h-10 rounded-lg bg-orange-100 border border-gray-200 dark:border-slate-700 object-cover"
          />
        </button>
      </div>

      <EmergencyModal isOpen={isEmergencyOpen} onClose={() => setIsEmergencyOpen(false)} />
    </header>
  );
};

export default RiderHeader;
