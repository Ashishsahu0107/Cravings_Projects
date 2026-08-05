import React from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal } from 'lucide-react';

export const ChartCard = ({ title, subtitle, children, action, className = "" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col ${className}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
        <div>
          {action ? action : (
            <button className="p-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl text-gray-400 transition-colors">
              <MoreHorizontal size={20} />
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 w-full min-h-[300px]">
        {children}
      </div>
    </motion.div>
  );
};
