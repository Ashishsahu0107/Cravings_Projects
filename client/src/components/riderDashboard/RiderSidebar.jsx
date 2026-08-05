import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Map, Navigation, History, Wallet, 
  BarChart3, MessageSquare, Bell, FileText, Bike, 
  User, LifeBuoy, Settings, Power
} from 'lucide-react';

const MenuItems = [
  { name: "Dashboard", path: "home", icon: <LayoutDashboard size={20} /> },
  { name: "Available Orders", path: "available", icon: <Map size={20} /> },
  { name: "Current Delivery", path: "current", icon: <Navigation size={20} /> },
  { name: "Delivery History", path: "history", icon: <History size={20} /> },
  { name: "Earnings", path: "earnings", icon: <Wallet size={20} /> },
  { name: "Performance", path: "performance", icon: <BarChart3 size={20} /> },
  { name: "Messages", path: "messages", icon: <MessageSquare size={20} /> },
  { name: "Notifications", path: "notifications", icon: <Bell size={20} /> },
  { name: "Documents", path: "documents", icon: <FileText size={20} /> },
  { name: "Vehicle", path: "vehicle", icon: <Bike size={20} /> },
  { name: "Profile", path: "profile", icon: <User size={20} /> },
  { name: "Support", path: "support", icon: <LifeBuoy size={20} /> },
  { name: "Settings", path: "settings", icon: <Settings size={20} /> },
];

const RiderSidebar = ({ isOpen, toggleSidebar, isOnline, toggleOnlineStatus }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar Content */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo Section */}
        <div className="h-[70px] flex items-center px-6 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 text-white p-2 rounded-xl shadow-lg shadow-orange-500/30">
              <Bike size={22} />
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              Rider<span className="text-orange-500">App</span>
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4 space-y-1">
          {MenuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={`/rider-dashboard/${item.path}`}
              onClick={() => { if(window.innerWidth < 1024) toggleSidebar() }}
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 font-medium text-sm ${
                  isActive 
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Bottom Status Toggle */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 shrink-0">
          <button 
            onClick={toggleOnlineStatus}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all shadow-lg ${
              isOnline 
              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-red-500/30' 
              : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-green-500/30'
            }`}
          >
            <Power size={18} />
            {isOnline ? 'Go Offline' : 'Go Online'}
          </button>
        </div>
      </aside>
    </>
  );
};

export default RiderSidebar;