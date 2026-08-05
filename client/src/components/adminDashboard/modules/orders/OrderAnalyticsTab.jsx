import React from 'react';
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Download, Calendar } from 'lucide-react';

const hourlyData = [
  { time: '10 AM', orders: 120, delivered: 110 },
  { time: '12 PM', orders: 350, delivered: 310 },
  { time: '2 PM', orders: 480, delivered: 420 },
  { time: '4 PM', orders: 200, delivered: 190 },
  { time: '6 PM', orders: 550, delivered: 480 },
  { time: '8 PM', orders: 850, delivered: 790 },
  { time: '10 PM', orders: 600, delivered: 550 },
];

export const OrderAnalyticsTab = () => {
  return (
    <div className="space-y-6">
      
      {/* Header Controls */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <h2 className="text-lg font-black text-gray-800 dark:text-white">Order Analytics</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300">
            <Calendar size={16} /> Today
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md transition">
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Hourly Trend Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 dark:text-white">Hourly Order Volume</h3>
            <p className="text-xs text-gray-500 font-medium">Orders placed vs successfully delivered.</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorOrders)" />
                <Area type="monotone" dataKey="delivered" stroke="#10b981" strokeWidth={3} fill="none" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cancellation Reasons */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 dark:text-white">Cancellation Breakdown</h3>
            <p className="text-xs text-gray-500 font-medium">Primary reasons for order failures today.</p>
          </div>
          <div className="flex-1 space-y-4">
            {[
              { reason: 'Customer Cancelled', percent: 45, color: 'bg-blue-500' },
              { reason: 'Restaurant Unresponsive', percent: 30, color: 'bg-orange-500' },
              { reason: 'No Rider Available', percent: 15, color: 'bg-red-500' },
              { reason: 'Payment Failed', percent: 10, color: 'bg-gray-500' },
            ].map(item => (
              <div key={item.reason}>
                <div className="flex justify-between text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                  <span>{item.reason}</span>
                  <span>{item.percent}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
