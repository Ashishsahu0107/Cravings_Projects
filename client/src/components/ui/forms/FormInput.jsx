import React from 'react';

export const FormInput = React.forwardRef(({ 
  label, 
  error, 
  id, 
  className = "", 
  containerClassName = "",
  helperText,
  ...props 
}, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`w-full px-4 py-2.5 text-sm rounded-xl border transition-all outline-none bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-red-500/50' 
            : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700'
          } 
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-xs font-semibold text-red-500">{error.message}</span>}
      {!error && helperText && <span className="text-xs text-gray-500">{helperText}</span>}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export const FormTextarea = React.forwardRef(({ 
  label, 
  error, 
  id, 
  className = "", 
  containerClassName = "",
  helperText,
  ...props 
}, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        className={`w-full px-4 py-2.5 text-sm rounded-xl border transition-all outline-none bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 resize-y min-h-[100px]
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-red-500/50' 
            : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700'
          } 
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-xs font-semibold text-red-500">{error.message}</span>}
      {!error && helperText && <span className="text-xs text-gray-500">{helperText}</span>}
    </div>
  );
});

FormTextarea.displayName = 'FormTextarea';
