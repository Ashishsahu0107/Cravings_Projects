import React from 'react';
import LoadingSkeleton from './LoadingSkeleton';
import EmptyState from './EmptyState';
import { SearchX } from 'lucide-react';

const DataTable = ({ 
  columns, 
  data, 
  isLoading, 
  emptyTitle = "No data found",
  emptyDesc = "There is no data to display at this time.",
  onRowClick
}) => {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm p-6">
        <LoadingSkeleton rows={5} columns={columns.length} />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm">
        <EmptyState title={emptyTitle} description={emptyDesc} icon={SearchX} />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  className={`px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
            {data.map((row, rowIndex) => (
              <tr 
                key={row.id || rowIndex} 
                onClick={() => onRowClick && onRowClick(row)}
                className={`transition-colors ${onRowClick ? 'cursor-pointer hover:bg-orange-50/50 dark:hover:bg-slate-800' : 'hover:bg-gray-50 dark:hover:bg-slate-800/50'}`}
              >
                {columns.map((col, colIndex) => (
                  <td 
                    key={colIndex} 
                    className={`px-6 py-4 text-sm text-gray-700 dark:text-gray-300 ${col.cellClassName || ''}`}
                  >
                    {col.cell ? col.cell(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Basic Pagination Footer (can be expanded later) */}
      <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs text-gray-500">
        <span>Showing {data.length} entries</span>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border rounded-lg hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800 disabled:opacity-50" disabled>Previous</button>
          <button className="px-3 py-1.5 border rounded-lg hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800 disabled:opacity-50" disabled>Next</button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
