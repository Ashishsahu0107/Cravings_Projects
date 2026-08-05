import React from 'react';

export const FormToggle = React.forwardRef(({ 
  label, 
  description,
  id, 
  className = "", 
  containerClassName = "",
  ...props 
}, ref) => {
  return (
    <div className={`flex items-start justify-between gap-4 p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 ${containerClassName}`}>
      <div className="flex-1">
        {label && (
          <label htmlFor={id} className="text-sm font-bold text-gray-800 dark:text-gray-200 cursor-pointer">
            {label}
          </label>
        )}
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
      
      <div className="relative inline-flex items-center cursor-pointer shrink-0">
        <input 
          type="checkbox" 
          id={id}
          ref={ref} 
          className={`sr-only peer ${className}`} 
          {...props} 
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-500/20 dark:peer-focus:ring-orange-500/30 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
      </div>
    </div>
  );
});

FormToggle.displayName = 'FormToggle';
