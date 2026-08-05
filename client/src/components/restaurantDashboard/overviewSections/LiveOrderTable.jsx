import React from 'react';
import { motion } from 'framer-motion';
import { Printer, Check, X, UserCog, ChevronRight } from 'lucide-react';

const orders = [
  { id: "#ORD-7281", customer: "Rahul Sharma", items: "2x Margherita, 1x Coke", amount: "₹850", status: "New", rider: "Unassigned", time: "2 mins ago" },
  { id: "#ORD-7280", customer: "Priya Singh", items: "1x Farmhouse Pizza", amount: "₹450", status: "Preparing", rider: "Rajeev K.", time: "12 mins ago" },
  { id: "#ORD-7279", customer: "Amit Patel", items: "1x Pasta, 2x Garlic Bread", amount: "₹620", status: "Ready", rider: "Suresh M.", time: "18 mins ago" },
  { id: "#ORD-7278", customer: "Neha Gupta", items: "3x Veg Burger, 1x Fries", amount: "₹550", status: "Picked Up", rider: "Vikram S.", time: "25 mins ago" },
];

const statusStyles = {
  "New": "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30",
  "Accepted": "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30",
  "Preparing": "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400 border-orange-200 dark:border-orange-500/30",
  "Ready": "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-200 dark:border-green-500/30",
  "Picked Up": "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 border-purple-200 dark:border-purple-500/30",
  "Delivered": "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700",
  "Cancelled": "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30",
};

const LiveOrderTable = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden"
    >
      <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-slate-800">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Live Orders</h2>
        <button className="text-sm font-semibold text-orange-500 hover:text-orange-600 flex items-center">
          View All <ChevronRight size={16} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-slate-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              <th className="p-4 font-medium">Order ID</th>
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Items</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Time</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800 text-sm">
            {orders.map((order, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-4 font-semibold text-gray-800 dark:text-gray-200">{order.id}</td>
                <td className="p-4 font-medium text-gray-600 dark:text-gray-300">{order.customer}</td>
                <td className="p-4 text-gray-500 dark:text-gray-400 max-w-xs truncate">{order.items}</td>
                <td className="p-4 font-bold text-gray-800 dark:text-gray-200">{order.amount}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-md border ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-gray-500 dark:text-gray-400 text-xs">{order.time}</td>
                <td className="p-4 text-right flex justify-end gap-2">
                  {order.status === "New" && (
                    <>
                      <button className="p-1.5 bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-500 rounded-lg hover:bg-green-100 dark:hover:bg-green-500/20 tooltip" data-tip="Accept">
                        <Check size={16} />
                      </button>
                      <button className="p-1.5 bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 tooltip" data-tip="Reject">
                        <X size={16} />
                      </button>
                    </>
                  )}
                  {order.status === "Ready" && (
                    <button className="p-1.5 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-500 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-500/20 tooltip" data-tip="Assign Rider">
                      <UserCog size={16} />
                    </button>
                  )}
                  <button className="p-1.5 bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 tooltip" data-tip="Print Invoice">
                    <Printer size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default LiveOrderTable;
