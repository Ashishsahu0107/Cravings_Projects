import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Clock, IndianRupee, Check, X, Store, User, AlertTriangle, CreditCard, PackageOpen, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const mockOrders = [
  {
    id: "ORD-9482A",
    restaurant: "Burger King",
    customer: "Amit Sharma",
    pickupDistance: "1.2 km",
    dropDistance: "4.5 km",
    earnings: 120,
    tipAmount: 30,
    deliveryFee: 90,
    expectedTime: "25 mins",
    itemCount: 3,
    priority: "high",
    paymentType: "Prepaid",
    status: "pending"
  },
  {
    id: "ORD-7729B",
    restaurant: "Punjabi Rasoi",
    customer: "Sneha Patel",
    pickupDistance: "0.8 km",
    dropDistance: "2.1 km",
    earnings: 85,
    tipAmount: 0,
    deliveryFee: 85,
    expectedTime: "15 mins",
    itemCount: 1,
    priority: "normal",
    paymentType: "Cash on Delivery",
    status: "pending"
  }
];

const AvailableOrders = () => {
  const [orders, setOrders] = useState(mockOrders);

  const handleAccept = (id) => {
    toast.success(`Accepted order ${id}! Redirecting to current delivery...`);
    setOrders(orders.filter(o => o.id !== id));
  };

  const handleReject = (id) => {
    toast.error(`Order ${id} rejected.`);
    setOrders(orders.filter(o => o.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto w-full pb-20 lg:pb-0 space-y-6">
      
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">Available Orders</h1>
          <p className="text-sm font-medium text-gray-500">Orders near your current location.</p>
        </div>
        <div className="bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          Live Feed
        </div>
      </div>

      <div className="grid gap-6">
        <AnimatePresence>
          {orders.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20 bg-gray-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800"
            >
              <Navigation className="mx-auto text-gray-300 dark:text-slate-700 mb-4" size={48} />
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">No active pings</h3>
              <p className="text-sm text-gray-500">Stay online. New orders will appear here automatically.</p>
            </motion.div>
          ) : (
            orders.map(order => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col gap-6"
              >
                {/* Header Row */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex gap-2 items-center mb-2">
                      {order.priority === 'high' && (
                        <span className="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md flex items-center gap-1"><AlertTriangle size={12} /> High Priority</span>
                      )}
                      <span className="text-[10px] font-black text-gray-500 tracking-widest uppercase block">Order #{order.id}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                      <Store size={20} className="text-gray-400" /> {order.restaurant}
                    </h3>
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-2 mt-1">
                      <User size={16} /> Deliver to {order.customer}
                    </p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-3xl font-black text-green-500 flex items-center justify-end">
                      <IndianRupee size={24} /> {order.earnings}
                    </h4>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1">Est. Earnings</p>
                  </div>
                </div>

                {/* Earnings Breakdown */}
                {order.tipAmount > 0 && (
                  <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-500/10 p-3 rounded-xl border border-amber-100 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 text-sm font-bold">
                    <Star size={16} /> Customer included a ₹{order.tipAmount} tip!
                  </div>
                )}

                {/* Logistics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg"><MapPin size={18} /></div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Pickup</p>
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{order.pickupDistance}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg"><Navigation size={18} /></div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Dropoff</p>
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{order.dropDistance}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg"><Clock size={18} /></div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Est. Time</p>
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{order.expectedTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg"><PackageOpen size={18} /></div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Items</p>
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{order.itemCount} items</p>
                    </div>
                  </div>
                </div>

                {/* Footer Details & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-2 border-t border-gray-100 dark:border-slate-800 pt-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg w-full md:w-auto justify-center">
                    <CreditCard size={16} /> Payment: <strong className={order.paymentType === 'Prepaid' ? 'text-green-500' : 'text-orange-500'}>{order.paymentType}</strong>
                  </div>

                  <div className="flex gap-3 w-full md:w-auto">
                    <button 
                      onClick={() => handleReject(order.id)}
                      className="flex-1 md:flex-none px-6 py-3 bg-gray-100 dark:bg-slate-800 hover:bg-red-100 dark:hover:bg-red-500/20 text-gray-600 dark:text-gray-300 hover:text-red-500 font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                      <X size={18} /> Reject
                    </button>
                    <button 
                      onClick={() => handleAccept(order.id)}
                      className="flex-1 md:flex-none px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/30"
                    >
                      <Check size={18} /> Accept Order
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default AvailableOrders;
