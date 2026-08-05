import React from 'react';
import { Target, TrendingUp, Trophy, Star, CloudSun } from 'lucide-react';
import { motion } from 'framer-motion';

const RightSidebar = () => {
  return (
    <aside className="hidden xl:flex w-72 flex-col gap-6 bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-slate-800 p-5 h-[calc(100vh-65px)] overflow-y-auto sticky top-[65px] custom-scrollbar">
      
      {/* Today's Goal */}
      <div className="bg-orange-50 dark:bg-orange-500/10 rounded-2xl p-4 border border-orange-100 dark:border-orange-500/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm">
            <Target size={16} className="text-orange-500" /> Today's Goal
          </h3>
          <span className="text-xs font-semibold text-orange-600 bg-orange-100 dark:bg-orange-500/20 px-2 py-1 rounded-md">
            ₹15,000
          </span>
        </div>
        <div className="mb-2 flex justify-between text-xs font-medium text-gray-600 dark:text-gray-400">
          <span>₹12,450 achieved</span>
          <span>83%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mb-1 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '83%' }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-orange-500 h-2 rounded-full"
          ></motion.div>
        </div>
        <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center mt-2">
          ₹2,550 more to reach your daily goal!
        </p>
      </div>

      {/* Top Selling Item */}
      <div>
        <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 text-sm flex items-center gap-2">
          <TrendingUp size={16} className="text-green-500" /> Trending Now
        </h3>
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800 p-3 rounded-xl border border-gray-100 dark:border-slate-700">
          <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=100&h=100" alt="Margherita Pizza" className="w-12 h-12 rounded-lg object-cover shadow-sm" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">Margherita Pizza</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">42 orders today</p>
          </div>
          <div className="text-green-500 bg-green-50 dark:bg-green-500/10 p-1.5 rounded-lg">
            <TrendingUp size={14} />
          </div>
        </div>
      </div>

      {/* Health Score */}
      <div>
        <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 text-sm flex items-center gap-2">
          <Star size={16} className="text-amber-500" /> Restaurant Health
        </h3>
        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 border border-gray-100 dark:border-slate-700 text-center">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-slate-700" strokeWidth="4" />
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-green-500" strokeWidth="4" strokeDasharray="100" strokeDashoffset="4" strokeLinecap="round" />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">96</span>
              <span className="text-[10px] text-gray-500">/ 100</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Excellent Performance</p>
          <div className="flex justify-between items-center mt-3 text-[10px]">
            <div className="flex flex-col">
              <span className="text-gray-500">Prep Time</span>
              <span className="font-bold text-green-500">12 mins</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500">Accept Rate</span>
              <span className="font-bold text-green-500">99%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Widget (Impacts Orders) */}
      <div>
        <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 text-sm flex items-center gap-2">
          <CloudSun size={16} className="text-blue-500" /> Weather Forecast
        </h3>
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 text-white shadow-md">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-xs font-medium opacity-80">Evening</p>
              <h4 className="text-2xl font-bold">Rainy, 22°C</h4>
            </div>
            <CloudSun size={32} className="opacity-90" />
          </div>
          <p className="text-xs opacity-90 mt-2 bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            Expect 20% more delivery orders tonight due to rain. Ensure adequate packaging stock.
          </p>
        </div>
      </div>

    </aside>
  );
};

export default RightSidebar;
