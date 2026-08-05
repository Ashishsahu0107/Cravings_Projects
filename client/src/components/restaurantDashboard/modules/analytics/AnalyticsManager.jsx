import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { ChartCard } from '../../../ui/finance/ChartCard';
import { motion } from 'framer-motion';

const revenueData = [
  { name: 'Mon', revenue: 4000, orders: 240 },
  { name: 'Tue', revenue: 3000, orders: 139 },
  { name: 'Wed', revenue: 2000, orders: 980 },
  { name: 'Thu', revenue: 2780, orders: 390 },
  { name: 'Fri', revenue: 8900, orders: 480 },
  { name: 'Sat', revenue: 12390, orders: 880 },
  { name: 'Sun', revenue: 14490, orders: 930 },
];

const categoryData = [
  { name: 'Pizza', value: 400, color: '#f97316' },
  { name: 'Burger', value: 300, color: '#3b82f6' },
  { name: 'Pasta', value: 300, color: '#10b981' },
  { name: 'Beverages', value: 200, color: '#8b5cf6' },
];

const AnalyticsManager = () => {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Business Intelligence</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Advanced analytics, sales forecasting, and customer insights.</p>
        </div>
        <select className="select select-bordered select-sm rounded-lg bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700">
          <option>Last 7 Days</option>
          <option>This Month</option>
          <option>Last Month</option>
          <option>Year to Date</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Revenue Chart */}
        <div className="lg:col-span-2">
          <ChartCard title="Revenue Trend" subtitle="Gross sales vs Orders over the selected period.">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--tw-prose-bg)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Top Categories Pie */}
        <div className="lg:col-span-1">
          <ChartCard title="Top Categories" subtitle="Sales volume by food category.">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-4 justify-center mt-4">
              {categoryData.map(cat => (
                <div key={cat.name} className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-300">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                  {cat.name}
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Customer Growth Bar */}
        <div className="lg:col-span-3">
          <ChartCard title="Order Volume by Day" subtitle="Daily breakdown of total orders completed.">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-slate-800" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dx={-10} />
                <RechartsTooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsManager;
