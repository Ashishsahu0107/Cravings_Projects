import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({ title, value, trend, trendValue, icon: Icon, colorClass = "text-orange-500", bgClass = "bg-orange-50 dark:bg-orange-500/10" }) => {
  const isPositive = trend === 'up';

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${bgClass} ${colorClass}`}>
          <Icon size={24} />
        </div>
        {trendValue && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
            isPositive 
              ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400' 
              : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
          }`}>
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {trendValue}
          </div>
        )}
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">{title}</h4>
        <h2 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight">{value}</h2>
      </div>
    </motion.div>
  );
};
