import React from 'react';
import { Search, Bell, MessageSquare, Plus, Moon, Sun, Menu } from 'lucide-react';

const TopNavbar = ({ toggleSidebar, isDarkMode, toggleDarkMode }) => {
  return (
    <nav className="sticky top-0 z-40 flex w-full items-center justify-between bg-white/70 backdrop-blur-md dark:bg-slate-900/70 border-b border-gray-200 dark:border-slate-700 px-6 py-3 shadow-sm transition-colors duration-200">
      
      {/* Left side: Mobile menu & Search */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 lg:hidden text-gray-600 dark:text-gray-300"
        >
          <Menu size={20} />
        </button>
        
        <div className="relative hidden sm:block w-64 md:w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-200 rounded-xl bg-gray-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-slate-800 dark:border-slate-700 dark:placeholder-gray-400 dark:text-white transition-all focus:w-full focus:shadow-md outline-none" 
            placeholder="Search orders, menu, customers..." 
          />
        </div>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="hidden sm:flex items-center gap-2 mr-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs font-semibold text-green-600 dark:text-green-400">Accepting Orders</span>
        </div>

        <button className="hidden sm:flex items-center justify-center gap-1 bg-orange-50 hover:bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-500 dark:hover:bg-orange-500/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} />
          <span>Quick Add</span>
        </button>

        <button 
          onClick={toggleDarkMode} 
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800 transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800 transition-colors">
          <MessageSquare size={20} />
          <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-orange-500"></span>
        </button>

        <button className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white dark:border-slate-900">3</span>
        </button>

        <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 mx-1"></div>

        <button className="flex items-center gap-2 pl-2 cursor-pointer">
          <div className="avatar">
            <div className="w-9 h-9 rounded-full ring ring-orange-500 ring-offset-base-100 ring-offset-2">
              <img src="https://ui-avatars.com/api/?name=Pizza+Palace&background=F97316&color=fff" alt="Restaurant Profile" />
            </div>
          </div>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Pizza Palace</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Owner</span>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;
