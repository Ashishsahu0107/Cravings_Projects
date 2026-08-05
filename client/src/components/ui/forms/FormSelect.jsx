import React from 'react';

export const FormSelect = React.forwardRef(({ 
  label, 
  error, 
  id, 
  options = [], 
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
      <select
        ref={ref}
        id={id}
        className={`w-full px-4 py-2.5 text-sm rounded-xl border transition-all outline-none bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 appearance-none
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-red-500/50' 
            : 'border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700'
          } 
          ${className}
        `}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem'
        }}
        {...props}
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs font-semibold text-red-500">{error.message}</span>}
      {!error && helperText && <span className="text-xs text-gray-500">{helperText}</span>}
    </div>
  );
});

FormSelect.displayName = 'FormSelect';
