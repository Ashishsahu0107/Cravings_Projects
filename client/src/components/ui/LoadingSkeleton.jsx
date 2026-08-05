import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingSkeleton = ({ rows = 5, columns = 4, className = "" }) => {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="animate-pulse space-y-4">
        {/* Header Skeleton */}
        <div className="flex gap-4 mb-6">
          {[...Array(columns)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
          ))}
        </div>
        
        {/* Rows Skeleton */}
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="flex gap-4 items-center">
            {[...Array(columns)].map((_, j) => (
              <div 
                key={j} 
                className={`h-10 bg-gray-100 dark:bg-slate-800 rounded ${
                  j === 0 ? 'w-1/6' : j === columns - 1 ? 'w-1/12 ml-auto' : 'w-1/4'
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Spinner = ({ size = 24, className = "" }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    className={`inline-flex items-center justify-center text-orange-500 ${className}`}
  >
    <Loader2 size={size} />
  </motion.div>
);

export default LoadingSkeleton;
