import React from 'react';
import { SearchX } from 'lucide-react';
import { motion } from 'framer-motion';

const EmptyState = ({ 
  icon: Icon = SearchX, 
  title = "No results found", 
  description = "Try adjusting your filters or search terms.",
  actionButton = null 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-full mb-4 border border-gray-100 dark:border-slate-700">
        <Icon size={48} className="text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
        {description}
      </p>
      {actionButton && (
        <div>{actionButton}</div>
      )}
    </motion.div>
  );
};

export default EmptyState;
