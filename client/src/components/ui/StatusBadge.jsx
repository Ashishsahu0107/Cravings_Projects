import React from 'react';

const statusConfig = {
  // Order Statuses
  "New": "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30",
  "Accepted": "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30",
  "Preparing": "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400 border-orange-200 dark:border-orange-500/30",
  "Ready": "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-200 dark:border-green-500/30",
  "Picked Up": "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 border-purple-200 dark:border-purple-500/30",
  "Delivered": "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700",
  "Cancelled": "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30",
  
  // Stock Statuses
  "In Stock": "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-200 dark:border-green-500/30",
  "Low Stock": "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30",
  "Out of Stock": "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30",
};

const StatusBadge = ({ status, className = "" }) => {
  const config = statusConfig[status] || "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-300 border-gray-200 dark:border-slate-700";
  
  return (
    <span className={`px-2.5 py-1 text-xs font-bold rounded-md border whitespace-nowrap ${config} ${className}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
