import React from 'react';
import { AlertTriangle, CheckCircle, Clock, Search, Filter } from 'lucide-react';

const disputes = [
  { id: 'REF-1092', type: 'Full Refund', order: 'ORD-9821', customer: 'Amit Sharma', amount: 450, reason: 'Food spilled completely', status: 'Pending Review', time: '10 mins ago', risk: 'High' },
  { id: 'REF-1088', type: 'Partial Refund', order: 'ORD-8812', customer: 'Neha Singh', amount: 120, reason: 'Missing item (Coke)', status: 'Approved', time: '2 hours ago', risk: 'Low' },
  { id: 'REF-1085', type: 'Full Refund', order: 'ORD-7654', customer: 'Vikram Joshi', amount: 950, reason: 'Order never delivered', status: 'Investigating', time: '4 hours ago', risk: 'Critical' },
];

export const RefundsDisputesTab = () => {
  return (
    <div className="space-y-6">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-4 rounded-3xl shadow-sm">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <h2 className="text-lg font-black text-gray-800 dark:text-white border-r border-gray-200 dark:border-slate-700 pr-4">Dispute Center</h2>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 text-xs font-bold rounded-lg">12 Pending</span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-lg">4 Escalated</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search Refund ID..." className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none" />
          </div>
          <button className="p-2 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition"><Filter size={18} /></button>
        </div>
      </div>

      {/* Grid Layout for Disputes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {disputes.map((dispute) => (
          <div key={dispute.id} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-md transition flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg mb-2 inline-block ${
                  dispute.type === 'Full Refund' ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400' : 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400'
                }`}>{dispute.type}</span>
                <h3 className="font-black text-gray-800 dark:text-white text-lg">{dispute.id}</h3>
                <p className="text-xs text-gray-500 font-medium">{dispute.order} • {dispute.time}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-gray-800 dark:text-white">₹{dispute.amount}</p>
                <p className={`text-[10px] font-bold uppercase mt-1 ${dispute.risk === 'Critical' ? 'text-red-500' : 'text-gray-400'}`}>{dispute.risk} Risk</p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800/50 p-3 rounded-xl border border-gray-100 dark:border-slate-700 mb-4 flex-1">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Customer Claim</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">"{dispute.reason}"</p>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-800 pt-4 mt-auto">
              <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                {dispute.status === 'Approved' ? <CheckCircle size={14} className="text-green-500"/> : <Clock size={14} className="text-amber-500"/>}
                {dispute.status}
              </span>
              <button className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold rounded-lg hover:opacity-90 transition shadow-sm">
                Review Case
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
