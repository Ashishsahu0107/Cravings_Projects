import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Clock, Play, CheckCircle2, Truck, BellRing } from 'lucide-react';

const mockLiveOrders = [
  { id: "#1028", items: 3, value: "₹450", status: "Incoming", time: "Just now", priority: "High" },
  { id: "#1027", items: 2, value: "₹320", status: "Preparing", time: "2 min ago", priority: "Normal" },
  { id: "#1026", items: 5, value: "₹1200", status: "Preparing", time: "5 min ago", priority: "Normal" },
  { id: "#1025", items: 1, value: "₹150", status: "Ready", time: "8 min ago", priority: "Normal" },
  { id: "#1024", items: 4, value: "₹850", status: "Picked Up", time: "12 min ago", priority: "Normal" },
];

const mockAlerts = [
  { id: 1, text: "Kitchen delay reported on Order #1026", time: "1 min ago", type: "warning" },
  { id: 2, text: "Rider assigned for Order #1025", time: "2 min ago", type: "info" },
  { id: 3, text: "Low stock: Pizza Dough", time: "5 min ago", type: "critical" },
];

const LiveOperations = () => {
  const [orders, setOrders] = useState(mockLiveOrders);
  const [alerts, setAlerts] = useState(mockAlerts);
  
  // Simulate live incoming order
  useEffect(() => {
    const interval = setInterval(() => {
      const newOrder = {
        id: `#${Math.floor(1000 + Math.random() * 9000)}`,
        items: Math.floor(1 + Math.random() * 5),
        value: `₹${Math.floor(200 + Math.random() * 1000)}`,
        status: "Incoming",
        time: "Just now",
        priority: Math.random() > 0.8 ? "High" : "Normal"
      };
      
      setOrders(prev => {
        const updated = [newOrder, ...prev];
        if (updated.length > 8) updated.pop();
        return updated;
      });

      // Show toast alert
      const newAlert = {
        id: Date.now(),
        text: `New Order ${newOrder.id} received!`,
        time: "Just now",
        type: "success"
      };
      setAlerts(prev => [newAlert, ...prev].slice(0, 5));

    }, 15000); // New order every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Incoming': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400';
      case 'Preparing': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400';
      case 'Ready': return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400';
      case 'Picked Up': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Header with Live Indicator */}
      <div className="flex justify-between items-center bg-gray-900 dark:bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
        <div>
          <h1 className="text-2xl font-black mb-1">Live Operations Center</h1>
          <p className="text-sm text-gray-400 font-medium flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            Real-time feed active
          </p>
        </div>
        <div className="flex gap-4">
          <div className="text-center px-4 border-r border-gray-700">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Active</p>
            <p className="text-2xl font-black">{orders.filter(o => o.status !== 'Picked Up').length}</p>
          </div>
          <div className="text-center px-4">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Queue Time</p>
            <p className="text-2xl font-black text-amber-400">14m</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Order Feed */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col h-[600px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Active Order Stream</h3>
            <button className="text-sm font-bold text-orange-500 hover:text-orange-600 transition">View All</button>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
            <AnimatePresence>
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    order.status === 'Incoming' ? 'bg-blue-50/50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-500/20 shadow-sm' : 'bg-white border-gray-100 dark:bg-slate-800/50 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="font-black text-lg text-gray-800 dark:text-white flex items-center gap-2">
                        {order.id}
                        {order.priority === 'High' && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider">Priority</span>}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{order.items} Items • {order.value}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block mb-1 ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <p className="text-xs text-gray-400 font-medium">{order.time}</p>
                    </div>
                    
                    {/* Action Buttons based on status */}
                    <div className="w-24 flex justify-end">
                      {order.status === 'Incoming' && (
                        <button className="btn btn-sm bg-blue-600 hover:bg-blue-700 border-none text-white rounded-lg px-4"><Play size={14} className="mr-1"/> Start</button>
                      )}
                      {order.status === 'Preparing' && (
                        <button className="btn btn-sm bg-amber-500 hover:bg-amber-600 border-none text-white rounded-lg px-4"><CheckCircle2 size={14} className="mr-1"/> Ready</button>
                      )}
                      {order.status === 'Ready' && (
                        <button className="btn btn-sm btn-outline border-gray-200 dark:border-slate-700 rounded-lg px-4 text-xs"><Truck size={14} className="mr-1"/> Assign</button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* System Alerts & Rider Coordination */}
        <div className="space-y-6">
          {/* Timeline / Alerts */}
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm h-[290px] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <BellRing className="text-orange-500" size={18} />
              <h3 className="font-bold text-gray-800 dark:text-white">System Alerts</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
              <AnimatePresence>
                {alerts.map((alert) => (
                  <motion.div 
                    key={alert.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex gap-3 relative before:absolute before:left-[11px] before:top-6 before:bottom-[-16px] before:w-[2px] before:bg-gray-100 dark:before:bg-slate-800 last:before:hidden"
                  >
                    <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center z-10 ${
                      alert.type === 'warning' ? 'bg-amber-100 text-amber-500' :
                      alert.type === 'critical' ? 'bg-red-100 text-red-500' :
                      'bg-blue-100 text-blue-500'
                    }`}>
                      {alert.type === 'warning' ? <AlertTriangle size={12} /> :
                       alert.type === 'critical' ? <AlertTriangle size={12} /> :
                       <Clock size={12} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{alert.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{alert.time}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Map/Rider Widget Mockup */}
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-0 shadow-sm h-[286px] overflow-hidden relative">
            <div className="absolute inset-0 bg-gray-200 dark:bg-slate-800 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Truck size={32} className="mx-auto mb-2 opacity-50" />
                <p className="font-bold text-sm">Live Map Integration</p>
                <p className="text-xs">3 Riders Nearby</p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-slate-900 p-3 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center font-bold text-xs">R1</div>
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-white leading-none">Rahul K.</p>
                  <p className="text-xs text-gray-500">2 mins away</p>
                </div>
              </div>
              <button className="bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded text-xs font-bold hover:bg-gray-200 transition">Contact</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LiveOperations;
