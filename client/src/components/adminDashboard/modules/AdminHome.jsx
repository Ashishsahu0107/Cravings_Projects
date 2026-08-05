import React from 'react';
import { IndianRupee, ShoppingBag, Store, Motorbike, Users, TrendingUp, AlertCircle, Clock, Zap, Target, Star, MoreVertical } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const miniChartData = [{v: 10}, {v: 15}, {v: 12}, {v: 25}, {v: 18}, {v: 30}, {v: 24}];

const StatCard = ({ title, value, trend, icon: Icon, colorClass, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
    className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm relative overflow-hidden group hover:border-orange-500/30 transition-colors"
  >
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div>
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{title}</h4>
        <h2 className="text-2xl font-black text-gray-800 dark:text-white">{value}</h2>
      </div>
      <div className={`p-2.5 rounded-xl ${colorClass} bg-opacity-10 dark:bg-opacity-20 text-${colorClass.split('-')[1]}-600 dark:text-${colorClass.split('-')[1]}-400`}>
        <Icon size={20} />
      </div>
    </div>
    
    <div className="flex items-center justify-between relative z-10">
      <div className={`text-xs font-bold flex items-center gap-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
        <TrendingUp size={14} className={trend < 0 ? 'rotate-180' : ''} />
        {Math.abs(trend)}% vs last week
      </div>
      <div className="w-16 h-8 opacity-50 group-hover:opacity-100 transition-opacity">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={miniChartData}>
            <Area type="monotone" dataKey="v" stroke={trend > 0 ? '#22c55e' : '#ef4444'} fill="none" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  </motion.div>
);

const AdminHome = () => {
  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight">Executive Overview</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Platform performance metrics and live system status.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="select select-bordered select-sm bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 rounded-xl font-bold text-xs">
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last 7 Days</option>
            <option>This Month</option>
          </select>
          <button className="btn btn-sm btn-primary text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/20">
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Grid (12 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value="₹12.4L" trend={14.5} icon={IndianRupee} colorClass="bg-green-500" delay={0.0} />
        <StatCard title="Platform Commission" value="₹2.1L" trend={15.2} icon={Zap} colorClass="bg-blue-500" delay={0.05} />
        <StatCard title="Active Orders" value="1,432" trend={8.4} icon={ShoppingBag} colorClass="bg-orange-500" delay={0.1} />
        <StatCard title="Completed Orders" value="8,942" trend={12.1} icon={Target} colorClass="bg-indigo-500" delay={0.15} />
        
        <StatCard title="Active Restaurants" value="845" trend={2.4} icon={Store} colorClass="bg-rose-500" delay={0.2} />
        <StatCard title="Active Riders" value="1,204" trend={5.8} icon={Motorbike} colorClass="bg-cyan-500" delay={0.25} />
        <StatCard title="Total Customers" value="45.2K" trend={18.2} icon={Users} colorClass="bg-purple-500" delay={0.3} />
        <StatCard title="New Registrations" value="842" trend={-4.1} icon={UserPlus} colorClass="bg-emerald-500" delay={0.35} />
        
        <StatCard title="Refund Requests" value="24" trend={-12.5} icon={AlertCircle} colorClass="bg-red-500" delay={0.4} />
        <StatCard title="Open Tickets" value="156" trend={2.4} icon={HeadphonesIcon} colorClass="bg-amber-500" delay={0.45} />
        <StatCard title="Platform Rating" value="4.8/5" trend={1.2} icon={Star} colorClass="bg-yellow-500" delay={0.5} />
        <StatCard title="Avg Delivery Time" value="24m" trend={-8.5} icon={Clock} colorClass="bg-teal-500" delay={0.55} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 dark:text-white text-lg">Live Platform Activity</h3>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><MoreVertical size={18} /></button>
          </div>
          
          <div className="space-y-4">
            {[
              { type: 'restaurant', msg: 'Burger King (Indiranagar) just came online.', time: '2 mins ago', icon: Store, color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { type: 'alert', msg: 'High refund rate detected for "Pizza Paradise".', time: '14 mins ago', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
              { type: 'rider', msg: '145 riders active in Koramangala Zone.', time: '28 mins ago', icon: Motorbike, color: 'text-orange-500', bg: 'bg-orange-500/10' },
              { type: 'payment', msg: 'Bulk settlement of ₹4.2L completed successfully.', time: '1 hour ago', icon: IndianRupee, color: 'text-green-500', bg: 'bg-green-500/10' },
              { type: 'customer', msg: 'Customer support ticket #8942 escalated to Level 2.', time: '2 hours ago', icon: HeadphonesIcon, color: 'text-amber-500', bg: 'bg-amber-500/10' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition border border-transparent hover:border-gray-100 dark:hover:border-slate-700">
                <div className={`p-2 rounded-xl ${activity.bg} ${activity.color} shrink-0 mt-1`}>
                  <activity.icon size={16} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{activity.msg}</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-500/20 transition">
            View All Activity
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-6">Quick Actions</h3>
          <div className="grid gap-3">
            {[
              { label: 'Approve Pending Restaurants', icon: Store, count: 12, color: 'indigo' },
              { label: 'Review Rider Applications', icon: Motorbike, count: 45, color: 'cyan' },
              { label: 'Manage Active Coupons', icon: Zap, count: 8, color: 'amber' },
              { label: 'Broadcast Push Notification', icon: Megaphone, count: null, color: 'rose' },
              { label: 'Export Financial Report', icon: FileText, count: null, color: 'emerald' },
            ].map((action, i) => (
              <button key={i} className={`flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-${action.color}-500/50 hover:bg-${action.color}-50 dark:hover:bg-${action.color}-500/10 transition group text-left`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-500 group-hover:text-${action.color}-600 dark:group-hover:text-${action.color}-400 group-hover:bg-${action.color}-100 dark:group-hover:bg-${action.color}-500/20 transition`}>
                    <action.icon size={18} />
                  </div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition">{action.label}</span>
                </div>
                {action.count && (
                  <span className={`bg-${action.color}-100 dark:bg-${action.color}-500/20 text-${action.color}-700 dark:text-${action.color}-400 text-xs font-black px-2 py-1 rounded-lg`}>
                    {action.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminHome;

// Helper icons for the file scope
const UserPlus = ({size, className}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>;
const HeadphonesIcon = ({size, className}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>;
const Megaphone = ({size, className}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>;
