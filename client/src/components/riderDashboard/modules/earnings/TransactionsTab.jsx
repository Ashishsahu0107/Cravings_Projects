import React, { useState } from 'react';
import DataTable from '../../../ui/DataTable';
import { Download, Filter, Search, FileText } from 'lucide-react';

const mockTransactions = [
  { id: "TXN-9821A", orderId: "ORD-9482A", date: "2026-10-15 14:30", customer: "Amit Sharma", restaurant: "Burger King", fee: 90, tip: 30, bonus: 0, deduction: 5, tax: 2.5, net: 112.5, status: "completed" },
  { id: "TXN-7729B", orderId: "ORD-7729B", date: "2026-10-15 12:15", customer: "Sneha Patel", restaurant: "Punjabi Rasoi", fee: 85, tip: 0, bonus: 20, deduction: 5, tax: 2.5, net: 97.5, status: "completed" },
  { id: "TXN-6612C", orderId: "ORD-6612C", date: "2026-10-14 19:45", customer: "Vikram Singh", restaurant: "Pizza Hut", fee: 120, tip: 50, bonus: 0, deduction: 10, tax: 5, net: 155.0, status: "completed" },
  { id: "TXN-5591D", orderId: "ORD-5591D", date: "2026-10-14 16:20", customer: "Pooja Mehta", restaurant: "Subway", fee: 65, tip: 0, bonus: 0, deduction: 3.5, tax: 1.5, net: 60.0, status: "processing" },
];

export const TransactionsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    { key: "id", label: "Txn ID" },
    { key: "date", label: "Date & Time" },
    { key: "restaurant", label: "Restaurant" },
    { key: "net", label: "Net Earnings", render: (val) => <span className="font-bold text-green-600 dark:text-green-400">₹{val.toFixed(2)}</span> },
    { 
      key: "status", 
      label: "Status", 
      render: (val) => (
        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
          val === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
        }`}>
          {val}
        </span>
      ) 
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-4 rounded-3xl shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search transactions, orders..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition">
            <Filter size={16} /> Filters
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-bold shadow-md hover:opacity-90 transition">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Tax Center Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-blue-800 dark:text-blue-400 flex items-center gap-2"><FileText size={16} /> Estimated Tax Deducted (TDS)</h4>
            <p className="text-xs text-blue-600 dark:text-blue-500 font-medium mt-1">Current Financial Year (FY26-27)</p>
          </div>
          <span className="text-xl font-black text-blue-900 dark:text-blue-300">₹4,250.00</span>
        </div>
        <div className="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">Download Form 16A</h4>
            <p className="text-xs text-gray-500 font-medium mt-1">Available for Q1 & Q2</p>
          </div>
          <button className="p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:text-blue-500 transition shadow-sm">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-slate-800">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">Transaction History</h3>
        </div>
        <DataTable data={mockTransactions} columns={columns} pagination />
      </div>

    </div>
  );
};
