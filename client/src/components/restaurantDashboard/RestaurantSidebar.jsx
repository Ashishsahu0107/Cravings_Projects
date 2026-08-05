import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, UtensilsCrossed, Grid, 
  Package, Users, Star, Ticket, BarChart3, Wallet, 
  FileText, Settings, HelpCircle, Store
} from 'lucide-react';
import { motion } from 'framer-motion';

const MenuItems = [
  { name: "Dashboard", path: "overview", icon: <LayoutDashboard size={20} /> },
  { name: "Orders", path: "order", icon: <ShoppingBag size={20} /> },
  { name: "Menu Management", path: "menu", icon: <UtensilsCrossed size={20} /> },
  { name: "Categories", path: "categories", icon: <Grid size={20} /> },
  { name: "Inventory", path: "inventory", icon: <Package size={20} /> },
  { name: "Customers", path: "customers", icon: <Users size={20} /> },
  { name: "Reviews", path: "reviews", icon: <Star size={20} /> },
  { name: "Promotions", path: "promotions", icon: <Ticket size={20} /> },
  { name: "Analytics", path: "analytics", icon: <BarChart3 size={20} /> },
  { name: "Wallet", path: "wallet", icon: <Wallet size={20} /> },
  { name: "Reports", path: "reports", icon: <FileText size={20} /> },
  { name: "Settings", path: "setting", icon: <Settings size={20} /> },
  { name: "Help Center", path: "help", icon: <HelpCircle size={20} /> },
];

const RestaurantSidebar = ({ isOpen, toggleSidebar, isStoreOpen, toggleStoreStatus }) => {
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
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-gray-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo Section */}
        <div className="h-[65px] flex items-center px-6 border-b border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 text-white p-1.5 rounded-xl shadow-lg shadow-orange-500/30">
              <Store size={22} />
            </div>
            <span className="text-xl font-black text-gray-800 dark:text-white tracking-tight">
              Cravings<span className="text-orange-500">.</span>
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4 space-y-1">
          {MenuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={`/restaurant-dashboard/${item.path}`}
              onClick={() => { if(window.innerWidth < 1024) toggleSidebar() }}
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 font-medium text-sm ${
                  isActive 
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-slate-800 dark:hover:text-gray-200'
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Bottom Status Toggle */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/30">
          <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-3 text-center">
              Restaurant Status
            </p>
            <button 
              onClick={toggleStoreStatus}
              className={`w-full relative flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold transition-all ${
                isStoreOpen 
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isStoreOpen ? 'bg-white animate-pulse' : 'bg-gray-400'}`}></div>
              {isStoreOpen ? 'Accepting Orders' : 'Store Closed'}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default RestaurantSidebar;