import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OverviewTab } from './OverviewTab';
import { WalletTab } from './WalletTab';
import { TransactionsTab } from './TransactionsTab';
import { AnalyticsTab } from './AnalyticsTab';
import { LayoutDashboard, Wallet, Receipt, TrendingUp } from 'lucide-react';

const EarningsManager = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview & Insights', icon: LayoutDashboard, component: OverviewTab },
    { id: 'wallet', label: 'Wallet & Withdrawals', icon: Wallet, component: WalletTab },
    { id: 'transactions', label: 'Taxes & Reports', icon: Receipt, component: TransactionsTab },
    { id: 'analytics', label: 'Analytics & Bonuses', icon: TrendingUp, component: AnalyticsTab }
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
    <div className="max-w-6xl mx-auto w-full pb-20 lg:pb-0 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">Earnings & Wallet</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Manage your finances, withdraw funds, and view tax reports.</p>
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

export default EarningsManager;
