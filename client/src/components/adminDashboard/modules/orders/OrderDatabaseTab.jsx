import React, { useState } from 'react';
import DataTable from '../../../ui/DataTable';
import { Search, Filter, Download, MoreHorizontal, Eye, X, Check, MapPin } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const mockOrders = [
  { id: "ORD-9821", customer: "Amit Sharma", restaurant: "Burger King", rider: "Rakesh", amount: 450, status: "Delivered", priority: "High", time: "10:30 AM" },
  { id: "ORD-7729", customer: "Sneha Patel", restaurant: "Punjabi Rasoi", rider: "Waiting...", amount: 850, status: "Preparing", priority: "Normal", time: "11:15 AM" },
  { id: "ORD-6612", customer: "Vikram Singh", restaurant: "Pizza Hut", rider: "Suresh", amount: 1200, status: "On the Way", priority: "Normal", time: "11:45 AM" },
  { id: "ORD-5591", customer: "Pooja Mehta", restaurant: "Subway", rider: "-", amount: 350, status: "Cancelled", priority: "Low", time: "09:20 AM" },
];

export const OrderDatabaseTab = () => {
  const [activeStatus, setActiveStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statuses = ['All', 'New', 'Preparing', 'On the Way', 'Delivered', 'Cancelled'];

  const columns = [
    { key: "id", label: "Order ID", render: (val) => <span className="font-bold text-gray-800 dark:text-gray-200">{val}</span> },
    { key: "customer", label: "Customer" },
    { key: "restaurant", label: "Restaurant" },
    { key: "rider", label: "Rider" },
    { key: "amount", label: "Amount", render: (val) => <span className="font-bold">₹{val}</span> },
    { 
      key: "status", 
      label: "Status", 
      render: (val) => (
        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
          val === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 
          val === 'Preparing' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
          val === 'On the Way' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
          'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300'
        }`}>
          {val}
        </span>
      ) 
    },
    { 
      key: "actions", 
      label: "Actions", 
      render: (_, row) => (
        <button 
          onClick={() => setSelectedOrder(row)}
          className="p-1.5 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition text-gray-600 dark:text-gray-300"
        >
          <Eye size={16} />
        </button>
      ) 
    },
  ];

  return (
    <div className="space-y-6 relative">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Status Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 w-full sm:w-auto pb-2 sm:pb-0">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setActiveStatus(s)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeStatus === s 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-white dark:bg-slate-900 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-800'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search ID, Name..." 
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
        <DataTable data={mockOrders} columns={columns} pagination selectable />
      </div>

      {/* Order Details Drawer */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100] flex justify-end"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-black text-gray-800 dark:text-white">{selectedOrder.id}</h2>
                  <span className="text-xs font-bold text-green-500">{selectedOrder.status}</span>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition"><X size={20} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Customer & Venue</h3>
                  <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-800">
                    <p className="font-bold text-gray-800 dark:text-white">{selectedOrder.customer}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><MapPin size={14} /> {selectedOrder.restaurant}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Delivery Timeline</h3>
                  <div className="relative pl-4 space-y-4 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-slate-700">
                    <div className="relative z-10">
                      <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-green-500 ring-4 ring-white dark:ring-slate-900"></div>
                      <p className="text-sm font-bold text-gray-800 dark:text-white">Order Placed</p>
                      <p className="text-xs text-gray-500">{selectedOrder.time}</p>
                    </div>
                    <div className="relative z-10">
                      <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-900"></div>
                      <p className="text-sm font-bold text-gray-800 dark:text-white">Preparing</p>
                      <p className="text-xs text-gray-500">10:35 AM</p>
                    </div>
                    <div className="relative z-10 opacity-50">
                      <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-gray-300 dark:bg-slate-600 ring-4 ring-white dark:ring-slate-900"></div>
                      <p className="text-sm font-bold text-gray-800 dark:text-white">Out for Delivery</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900">
                <button className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl shadow-md hover:opacity-90 transition">
                  Contact Customer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
