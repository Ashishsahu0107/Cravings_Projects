import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, CartesianGrid } from 'recharts';
import { Zap, CloudRain, Star, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const weeklyData = [
  { day: 'Mon', earnings: 1200 },
  { day: 'Tue', earnings: 1450 },
  { day: 'Wed', earnings: 900 },
  { day: 'Thu', earnings: 1800 },
  { day: 'Fri', earnings: 2400 },
  { day: 'Sat', earnings: 3200 },
  { day: 'Sun', earnings: 3500 },
];

export const AnalyticsTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Main Bar Chart */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 dark:text-white text-lg">Weekly Earnings Analysis</h3>
          <p className="text-sm text-gray-500 font-medium">Your earnings breakdown for this week vs last week.</p>
        </div>
        
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                formatter={(value) => [`₹${value}`, 'Earnings']}
              />
              <Bar dataKey="earnings" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bonuses & Incentives */}
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
        <div>
          <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-1">Active Incentives</h3>
          <p className="text-xs text-gray-500 font-medium">Complete these to earn extra bonuses.</p>
        </div>

        {/* Incentive Card 1 */}
        <div className="border border-purple-100 dark:border-purple-500/20 bg-purple-50 dark:bg-purple-500/5 rounded-2xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10 text-purple-500"><Zap size={64} /></div>
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="p-2 bg-purple-500 text-white rounded-lg shadow-md shadow-purple-500/20"><Zap size={16} /></div>
            <div>
              <h4 className="font-bold text-sm text-purple-900 dark:text-purple-300">Peak Hour Surge</h4>
              <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Earn extra ₹20/delivery</p>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between text-xs font-bold text-purple-800 dark:text-purple-300 mb-1">
              <span>8 / 10 Deliveries</span>
              <span>80%</span>
            </div>
            <div className="w-full h-2 bg-purple-200 dark:bg-purple-900/50 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} className="h-full bg-purple-500 rounded-full"></motion.div>
            </div>
          </div>
        </div>

        {/* Incentive Card 2 */}
        <div className="border border-blue-100 dark:border-blue-500/20 bg-blue-50 dark:bg-blue-500/5 rounded-2xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10 text-blue-500"><CloudRain size={64} /></div>
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="p-2 bg-blue-500 text-white rounded-lg shadow-md shadow-blue-500/20"><CloudRain size={16} /></div>
            <div>
              <h4 className="font-bold text-sm text-blue-900 dark:text-blue-300">Rain Bonus Active</h4>
              <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">1.5x Multiplier on base fare</p>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between text-xs font-bold text-blue-800 dark:text-blue-300 mb-1">
              <span>Time Remaining</span>
              <span>2h 15m</span>
            </div>
            <div className="w-full h-2 bg-blue-200 dark:bg-blue-900/50 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '40%' }} className="h-full bg-blue-500 rounded-full"></motion.div>
            </div>
          </div>
        </div>
        
        {/* Weekly Quest */}
        <div className="border border-amber-100 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/5 rounded-2xl p-4 relative overflow-hidden">
          <div className="flex justify-between items-start mb-2 relative z-10">
            <div>
              <h4 className="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-1"><Star size={14} className="fill-amber-500 text-amber-500" /> Weekly Quest</h4>
              <p className="text-xs text-amber-700 dark:text-amber-500 font-medium mt-1">Complete 50 trips to earn ₹1500</p>
            </div>
            <span className="text-lg font-black text-amber-600 dark:text-amber-400">42/50</span>
          </div>
        </div>

      </div>

    </div>
  );
};
