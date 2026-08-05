import React from 'react';
import { motion } from 'framer-motion';
import { PackageOpen, AlertOctagon } from 'lucide-react';

const inventory = [
  { item: "Pizza Base (Medium)", stock: 45, max: 200, status: "low", color: "bg-orange-500" },
  { item: "Mozzarella Cheese", stock: 12, max: 50, status: "critical", color: "bg-red-500" },
  { item: "Tomato Sauce", stock: 80, max: 100, status: "good", color: "bg-green-500" },
  { item: "Pizza Boxes", stock: 150, max: 500, status: "medium", color: "bg-blue-500" },
];

const InventoryStatus = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm p-5"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <PackageOpen size={20} className="text-indigo-500" /> Inventory Alerts
          </h2>
        </div>
        <button className="text-xs font-bold text-indigo-500 hover:underline">Manage</button>
      </div>

      <div className="space-y-5">
        {inventory.map((inv, idx) => {
          const percentage = (inv.stock / inv.max) * 100;
          return (
            <div key={idx}>
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{inv.item}</span>
                  {inv.status === 'critical' && <AlertOctagon size={14} className="text-red-500 animate-pulse" />}
                </div>
                <div className="text-xs text-gray-500">
                  <span className="font-bold text-gray-800 dark:text-gray-200">{inv.stock}</span> / {inv.max}
                </div>
              </div>
              <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`${inv.color} h-2.5 rounded-full`}
                ></motion.div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 rounded-xl p-3 flex items-start gap-3 text-orange-800 dark:text-orange-400">
        <AlertOctagon size={18} className="shrink-0 mt-0.5" />
        <p className="text-xs">
          <strong>Restock Needed:</strong> Mozzarella Cheese is expected to run out before weekend peak hours.
        </p>
      </div>
    </motion.div>
  );
};

export default InventoryStatus;
