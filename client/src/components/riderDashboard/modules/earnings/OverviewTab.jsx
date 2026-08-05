import React from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, Wallet, Gift, Award, Clock } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

const mockData = [
  { time: '10AM', value: 400 },
  { time: '12PM', value: 800 },
  { time: '2PM', value: 600 },
  { time: '4PM', value: 1200 },
  { time: '6PM', value: 900 },
  { time: '8PM', value: 1500 },
];

const StatCard = ({ title, amount, subtitle, icon: Icon, trend, colorClass }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm relative overflow-hidden"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-full ${colorClass} -mr-10 -mt-10 pointer-events-none`}></div>
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div>
        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{title}</h4>
        <h2 className="text-3xl font-black text-gray-800 dark:text-white mt-2 flex items-center gap-1">
          <IndianRupee size={24} /> {amount}
        </h2>
      </div>
      <div className={`p-3 rounded-2xl bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300`}>
        <Icon size={24} />
      </div>
    </div>
    <div className="flex items-center gap-2 text-sm relative z-10">
      <span className={`font-bold flex items-center gap-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
        <TrendingUp size={16} className={trend < 0 ? 'rotate-180' : ''} />
        {Math.abs(trend)}%
      </span>
      <span className="text-gray-500 font-medium">{subtitle}</span>
    </div>
  </motion.div>
);

export const OverviewTab = () => {
  return (
    <div className="space-y-6">
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today's Earnings" amount="2,450" subtitle="vs yesterday" icon={IndianRupee} trend={12.5} colorClass="bg-green-500" />
        <StatCard title="Weekly Earnings" amount="14,200" subtitle="vs last week" icon={Wallet} trend={5.2} colorClass="bg-blue-500" />
        <StatCard title="Total Tips" amount="1,850" subtitle="this week" icon={Gift} trend={22.4} colorClass="bg-amber-500" />
        <StatCard title="Bonuses" amount="3,000" subtitle="this month" icon={Award} trend={-2.1} colorClass="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white text-lg">Today's Revenue Trend</h3>
              <p className="text-sm text-gray-500 font-medium">Hourly breakdown of earnings</p>
            </div>
            <select className="select select-bordered select-sm bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 rounded-xl font-bold">
              <option>Today</option>
              <option>Yesterday</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`₹${value}`, 'Earnings']}
                />
                <Area type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights Panel */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-6 shadow-xl text-white flex flex-col">
          <h3 className="font-bold text-lg mb-2">Financial Insights</h3>
          <p className="text-xs text-slate-400 font-medium mb-6">AI-driven suggestions to maximize earnings.</p>
          
          <div className="space-y-4 flex-1">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl"><Clock size={18} /></div>
                <h4 className="font-bold text-sm">Best Time to Work</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                You earn <strong className="text-green-400">24% more</strong> between 7PM - 10PM on weekends. Consider adjusting your schedule.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl"><Gift size={18} /></div>
                <h4 className="font-bold text-sm">Average Tip Optimization</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Orders delivered under 25 mins yield a <strong className="text-green-400">3x higher</strong> tip probability in the Tech Park zone.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
