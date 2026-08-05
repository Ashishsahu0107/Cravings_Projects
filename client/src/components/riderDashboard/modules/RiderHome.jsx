import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Map, Navigation, History, Star, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const MetricRing = ({ percentage, label, color }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-full h-full -rotate-90 transform absolute">
          <circle 
            cx="40" cy="40" r={radius} 
            stroke="currentColor" strokeWidth="6" fill="transparent" 
            className="text-gray-100 dark:text-slate-800"
          />
          {/* Progress Circle */}
          <motion.circle 
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="40" cy="40" r={radius} 
            stroke={color} strokeWidth="6" fill="transparent" 
            strokeDasharray={circumference}
            strokeLinecap="round"
          />
        </svg>
        <span className="text-sm font-black text-gray-800 dark:text-white">{percentage}%</span>
      </div>
      <span className="text-xs font-bold text-gray-500 text-center leading-tight">{label}</span>
    </div>
  );
};

const QuickAction = ({ icon: Icon, title, subtitle, colorClass, bgClass }) => (
  <motion.button 
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm w-full text-left transition-all hover:border-gray-300 dark:hover:border-slate-600"
  >
    <div className={`p-3 rounded-xl ${bgClass} ${colorClass}`}>
      <Icon size={24} />
    </div>
    <div>
      <h3 className="font-bold text-gray-800 dark:text-white">{title}</h3>
      <p className="text-xs font-medium text-gray-500">{subtitle}</p>
    </div>
  </motion.button>
);

const RiderHome = () => {
  const { isOnline } = useOutletContext();

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-20 lg:pb-0">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-20"></div>
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black mb-1">Hi, Rakesh! 👋</h1>
            <p className="text-slate-400 font-medium text-sm flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
              </span>
              {isOnline ? "You are online and receiving orders." : "You are currently offline."}
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl w-full sm:w-auto text-center sm:text-right">
            <p className="text-xs text-slate-300 font-bold uppercase tracking-wider mb-1">Today's Earnings</p>
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-500">₹850.00</h2>
          </div>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Deliveries", value: "12", icon: CheckCircle2, color: "text-blue-500" },
          { title: "Active Hours", value: "4.5h", icon: Clock, color: "text-amber-500" },
          { title: "Distance", value: "45 km", icon: Navigation, color: "text-purple-500" },
          { title: "Avg. Time", value: "18m", icon: TrendingUp, color: "text-emerald-500" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
            <stat.icon size={24} className={`mb-2 ${stat.color}`} />
            <h4 className="text-2xl font-black text-gray-800 dark:text-white">{stat.value}</h4>
            <p className="text-xs font-bold text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Performance Rings */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm md:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Performance Metrics</h3>
          <div className="flex justify-around items-center">
            <MetricRing percentage={98} label="Acceptance Rate" color="#3b82f6" />
            <MetricRing percentage={100} label="Completion Rate" color="#10b981" />
            <MetricRing percentage={96} label="Customer Rating" color="#f59e0b" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <QuickAction 
            title="Available Orders" 
            subtitle="3 orders nearby" 
            icon={Map} 
            colorClass="text-orange-500" 
            bgClass="bg-orange-50 dark:bg-orange-500/10" 
          />
          <QuickAction 
            title="Wallet & Payouts" 
            subtitle="Next payout in 2 days" 
            icon={Wallet} 
            colorClass="text-green-500" 
            bgClass="bg-green-50 dark:bg-green-500/10" 
          />
          <QuickAction 
            title="Delivery History" 
            subtitle="View past earnings" 
            icon={History} 
            colorClass="text-blue-500" 
            bgClass="bg-blue-50 dark:bg-blue-500/10" 
          />
        </div>

      </div>

    </div>
  );
};

export default RiderHome;
