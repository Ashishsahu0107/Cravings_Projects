import React from 'react';
import { motion } from 'framer-motion';
import { Bell, ShoppingBag, CreditCard, Star, AlertTriangle, Bike } from 'lucide-react';

const activities = [
  { icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-500/20", title: "New Order #ORD-7281", time: "2 mins ago", desc: "₹850 - Paid via UPI" },
  { icon: CreditCard, color: "text-green-500", bg: "bg-green-100 dark:bg-green-500/20", title: "Payment Received", time: "15 mins ago", desc: "Settlement of ₹12,450 successful" },
  { icon: Star, color: "text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-500/20", title: "New 5-Star Review", time: "1 hour ago", desc: "Neha G. loved the Farmhouse Pizza!" },
  { icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-500/20", title: "Low Stock Alert", time: "2 hours ago", desc: "Only 5 Pizza Bases remaining" },
  { icon: Bike, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-500/20", title: "Rider Arrived", time: "3 hours ago", desc: "Rajeev K. arrived for pickup" },
];

const ActivityPanel = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm p-5 h-full"
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Bell size={20} className="text-orange-500" /> Live Activity
        </h2>
      </div>

      <div className="space-y-5 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-slate-700 before:to-transparent">
        {activities.map((item, idx) => (
          <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Icon */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 ${item.bg} ${item.color} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
              <item.icon size={16} />
            </div>
            
            {/* Content */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/30 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm">{item.title}</h4>
                <time className="text-[10px] font-medium text-gray-400">{item.time}</time>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ActivityPanel;
