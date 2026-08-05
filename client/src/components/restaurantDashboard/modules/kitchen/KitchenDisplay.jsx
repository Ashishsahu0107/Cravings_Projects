import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertCircle, ChefHat } from 'lucide-react';

// KDS specific high-contrast data
const initialKdsOrders = [
  { id: "#1027", items: ["1x Margherita Pizza (L)", "2x Garlic Bread", "1x Coke (500ml)"], status: "Queue", timeElapsed: 2, limit: 15 },
  { id: "#1026", items: ["2x Paneer Tikka Masala", "4x Butter Naan"], status: "Cooking", timeElapsed: 12, limit: 15, chef: "Chef Alex" },
  { id: "#1023", items: ["1x Veg Burger Combo"], status: "Cooking", timeElapsed: 18, limit: 15, chef: "Chef Sarah", isDelayed: true },
];

const KitchenDisplay = () => {
  const [orders, setOrders] = useState(initialKdsOrders);

  // Simulate timers ticking
  useEffect(() => {
    const timer = setInterval(() => {
      setOrders(prev => prev.map(o => {
        const newTime = o.timeElapsed + 1;
        return { ...o, timeElapsed: newTime, isDelayed: newTime > o.limit };
      }));
    }, 60000); // Update every minute (fast-forwarded for simulation)
    return () => clearInterval(timer);
  }, []);

  const moveStatus = (id, newStatus) => {
    if (newStatus === 'Done') {
      setOrders(prev => prev.filter(o => o.id !== id));
    } else {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus, chef: "Chef Alex" } : o));
    }
  };

  const renderColumn = (title, status, bgColor, textColor, borderColor) => {
    const columnOrders = orders.filter(o => o.status === status);
    
    return (
      <div className={`flex flex-col h-full rounded-2xl border-2 ${borderColor} ${bgColor} overflow-hidden`}>
        <div className={`p-4 border-b-2 ${borderColor} flex justify-between items-center`}>
          <h2 className={`text-xl font-black uppercase tracking-wider ${textColor}`}>{title}</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-bold bg-white/50 dark:bg-black/20 ${textColor}`}>
            {columnOrders.length}
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          <AnimatePresence>
            {columnOrders.map(order => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`p-4 rounded-xl shadow-lg border-l-8 ${
                  order.isDelayed ? 'bg-red-50 dark:bg-red-900/30 border-red-500' : 'bg-white dark:bg-slate-800 border-gray-800 dark:border-gray-400'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">{order.id}</h3>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded text-sm font-bold ${
                    order.isDelayed ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {order.isDelayed ? <AlertCircle size={16} /> : <Clock size={16} />}
                    {order.timeElapsed}m / {order.limit}m
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {order.items.map((item, i) => (
                    <li key={i} className="text-lg font-bold text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-slate-700 pb-2 last:border-0">{item}</li>
                  ))}
                </ul>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                    {order.chef ? <><ChefHat size={16}/> {order.chef}</> : 'Unassigned'}
                  </div>
                  
                  {status === 'Queue' && (
                    <button 
                      onClick={() => moveStatus(order.id, 'Cooking')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow-md transition"
                    >
                      Start Cooking
                    </button>
                  )}
                  {status === 'Cooking' && (
                    <button 
                      onClick={() => moveStatus(order.id, 'Done')}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-bold shadow-md transition"
                    >
                      Mark Ready
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-[1600px] mx-auto w-full gap-6">
      {/* KDS Header */}
      <div className="flex justify-between items-center bg-gray-900 rounded-2xl p-4 text-white shadow-xl shrink-0">
        <div className="flex items-center gap-4">
          <ChefHat size={32} className="text-orange-500" />
          <div>
            <h1 className="text-xl font-black uppercase tracking-wider">Kitchen Display System</h1>
            <p className="text-sm text-gray-400 font-bold">Main Kitchen Station</p>
          </div>
        </div>
        <div className="text-2xl font-black text-amber-400 font-mono tracking-widest">
          {new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric", second: "numeric" })}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0">
        {renderColumn("To Do (Queue)", "Queue", "bg-gray-50 dark:bg-slate-900/50", "text-gray-700 dark:text-gray-300", "border-gray-200 dark:border-slate-700")}
        {renderColumn("In Progress", "Cooking", "bg-blue-50 dark:bg-blue-900/10", "text-blue-700 dark:text-blue-400", "border-blue-200 dark:border-blue-800")}
      </div>
    </div>
  );
};

export default KitchenDisplay;
