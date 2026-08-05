import React from 'react';
import { Search, Bell, Menu, Activity, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-[70px] px-4 md:px-8 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-sm shrink-0">
      
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition lg:hidden"
        >
          <Menu size={24} />
        </button>
        
        {/* Global Search */}
        <div className="hidden md:flex items-center relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search across orders, restaurants, riders..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500 transition font-medium"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <span className="text-[10px] font-bold text-gray-400 bg-gray-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">Ctrl</span>
            <span className="text-[10px] font-bold text-gray-400 bg-gray-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">K</span>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 md:gap-6">
        
        {/* System Status */}
        <div className="hidden sm:flex items-center gap-2 bg-green-50 dark:bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-100 dark:border-green-500/20 text-green-700 dark:text-green-400 text-xs font-bold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          All Systems Operational
        </div>

        {/* Quick Actions & Notifications */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-800 dark:hover:text-white rounded-xl transition relative">
            <Activity size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-800 dark:hover:text-white rounded-xl transition relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
        </div>

        <div className="h-8 w-px bg-gray-200 dark:bg-slate-800 hidden sm:block"></div>

        {/* Admin Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-gray-800 dark:text-white">{user?.fullName || 'Super Admin'}</p>
            <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider flex items-center justify-end gap-1"><ShieldCheck size={10} /> Root Access</p>
          </div>
          <img 
            src={user?.photo || "https://api.dicebear.com/7.x/notionists/svg?seed=Admin"} 
            alt="Admin" 
            className="w-10 h-10 rounded-xl object-cover border-2 border-orange-500/20 p-0.5"
          />
        </div>

      </div>

    </header>
  );
};

export default AdminHeader;
