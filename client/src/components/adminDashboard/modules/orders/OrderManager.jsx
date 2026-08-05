import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiveOperationsTab } from './LiveOperationsTab';
import { OrderDatabaseTab } from './OrderDatabaseTab';
import { RefundsDisputesTab } from './RefundsDisputesTab';
import { OrderAnalyticsTab } from './OrderAnalyticsTab';
import { Map, Database, AlertCircle, PieChart } from 'lucide-react';

const OrderManager = () => {
  const [activeTab, setActiveTab] = useState('database');

  const tabs = [
    { id: 'live', label: 'Live Operations', icon: Map, component: LiveOperationsTab },
    { id: 'database', label: 'Order Database', icon: Database, component: OrderDatabaseTab },
    { id: 'refunds', label: 'Refunds & Disputes', icon: AlertCircle, component: RefundsDisputesTab },
    { id: 'analytics', label: 'Analytics', icon: PieChart, component: OrderAnalyticsTab },
  ];

  const renderActiveTab = () => {
    const active = tabs.find(t => t.id === activeTab);
    if (!active) return null;
    const Component = active.component;
    return (
      <motion.div
        key={active.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <Component />
      </motion.div>
    );
  };

  return (
    <div className="w-full space-y-6 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">Order & Delivery Management</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Global command center for tracking, resolving, and analyzing all orders.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md' 
                : 'bg-white dark:bg-slate-900 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800 border border-gray-100 dark:border-slate-800'
            }`}
          >
            <tab.icon size={18} className={activeTab === tab.id ? 'opacity-100' : 'opacity-70'} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        <AnimatePresence mode="wait">
          {renderActiveTab()}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default OrderManager;
