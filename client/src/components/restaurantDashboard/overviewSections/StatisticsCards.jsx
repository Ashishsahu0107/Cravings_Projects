import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { 
  ShoppingBag, IndianRupee, Clock, ChefHat, 
  CheckCircle2, XCircle, Star, Users, Utensils
} from 'lucide-react';

const sparklineData = [
  { value: 10 }, { value: 25 }, { value: 15 }, { value: 30 }, 
  { value: 20 }, { value: 45 }, { value: 35 }
];

const StatCard = ({ title, value, icon: Icon, color, trend, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-transform group-hover:scale-110 ${color}`}></div>
    
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl text-white shadow-md ${color}`}>
        <Icon size={20} />
      </div>
      <div className={`text-xs font-bold px-2 py-1 rounded-md ${
        trend > 0 ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' 
        : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
      }`}>
        {trend > 0 ? '+' : ''}{trend}%
      </div>
    </div>
    
    <div>
      <h3 className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">{title}</h3>
      <div className="flex justify-between items-end">
        <h2 className="text-2xl font-black text-gray-800 dark:text-white">{value}</h2>
        
        <div className="w-16 h-8 opacity-70">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={trend > 0 ? "#22c55e" : "#ef4444"} 
                strokeWidth={2} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </motion.div>
);

const StatisticsCards = () => {
  const stats = [
    { title: "Total Orders", value: "248", icon: ShoppingBag, color: "bg-blue-500", trend: 12.5 },
    { title: "Revenue", value: "₹24,500", icon: IndianRupee, color: "bg-green-500", trend: 18.2 },
    { title: "Pending", value: "12", icon: Clock, color: "bg-amber-500", trend: -5.4 },
    { title: "Preparing", value: "8", icon: ChefHat, color: "bg-orange-500", trend: 2.1 },
    { title: "Ready Pickup", value: "5", icon: CheckCircle2, color: "bg-purple-500", trend: 15.0 },
    { title: "Cancelled", value: "2", icon: XCircle, color: "bg-red-500", trend: -1.2 },
    { title: "Avg Rating", value: "4.8", icon: Star, color: "bg-yellow-400", trend: 4.5 },
    { title: "Customers", value: "1.2k", icon: Users, color: "bg-indigo-500", trend: 8.9 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} delay={idx * 0.05} />
      ))}
    </div>
  );
};

export default StatisticsCards;
