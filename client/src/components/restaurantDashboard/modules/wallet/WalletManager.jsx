import React, { useState } from 'react';
import { Wallet, DollarSign, ArrowDownRight, ArrowUpRight, CheckCircle2, AlertCircle, FileText, Download } from 'lucide-react';
import { StatCard } from '../../../ui/finance/StatCard';
import DataTable from '../../../ui/DataTable';
import StatusBadge from '../../../ui/StatusBadge';
import { motion } from 'framer-motion';

const fetchTransactions = async () => {
  await new Promise(r => setTimeout(r, 600));
  return [
    { id: "TXN-001", orderId: "#ORD-7281", amount: "₹850", commission: "₹85", tax: "₹42", net: "₹723", status: "Completed", date: "Today, 2:30 PM" },
    { id: "TXN-002", orderId: "#ORD-7280", amount: "₹450", commission: "₹45", tax: "₹22", net: "₹383", status: "Completed", date: "Today, 1:15 PM" },
    { id: "TXN-003", orderId: "#ORD-7279", amount: "₹620", commission: "₹62", tax: "₹31", net: "₹527", status: "Pending", date: "Today, 12:45 PM" },
    { id: "TXN-004", orderId: "#ORD-7278", amount: "₹550", commission: "₹55", tax: "₹27", net: "₹468", status: "Refunded", date: "Yesterday" },
    { id: "TXN-005", orderId: "#ORD-7277", amount: "₹350", commission: "₹35", tax: "₹17", net: "₹298", status: "Completed", date: "Yesterday" },
  ];
};

const WalletManager = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load transactions lazily
  React.useEffect(() => {
    if (activeTab === 'transactions') {
      setIsLoading(true);
      fetchTransactions().then(data => {
        setTransactions(data);
        setIsLoading(false);
      });
    }
  }, [activeTab]);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Withdrawable Balance" 
          value="₹45,250" 
          trend="up" 
          trendValue="+12% this week"
          icon={Wallet} 
          colorClass="text-green-500" 
          bgClass="bg-green-50 dark:bg-green-500/10" 
        />
        <StatCard 
          title="Today's Earnings (Net)" 
          value="₹3,420" 
          trend="up" 
          trendValue="+5% vs yesterday"
          icon={DollarSign} 
        />
        <StatCard 
          title="Pending Settlement" 
          value="₹12,400" 
          icon={AlertCircle} 
          colorClass="text-amber-500" 
          bgClass="bg-amber-50 dark:bg-amber-500/10" 
        />
        <StatCard 
          title="Refunds & Deductions" 
          value="₹840" 
          trend="down" 
          trendValue="-2% this week"
          icon={ArrowDownRight} 
          colorClass="text-red-500" 
          bgClass="bg-red-50 dark:bg-red-500/10" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Next Settlement Card */}
        <div className="lg:col-span-2 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-xs">Upcoming Settlement</p>
              <h2 className="text-4xl font-black mb-2">₹12,400.00</h2>
              <p className="text-slate-300 text-sm flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-400" /> Expected by Tomorrow, 11:00 AM
              </p>
            </div>
            <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition shadow-lg w-full md:w-auto text-center">
              View Breakdown
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"><ArrowUpRight size={16} className="text-green-500"/> Request Early Payout</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"><FileText size={16} className="text-blue-500"/> Download Tax Report</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"><Download size={16} className="text-orange-500"/> Export Ledger (CSV)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );

  const renderTransactions = () => {
    const columns = [
      { header: "TXN ID", accessor: "id", cellClassName: "font-bold text-xs" },
      { header: "Order ID", accessor: "orderId", cellClassName: "text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline text-xs" },
      { header: "Gross Amount", accessor: "amount" },
      { header: "Comm. (-10%)", accessor: "commission", cellClassName: "text-red-500" },
      { header: "Tax (5%)", accessor: "tax", cellClassName: "text-red-500" },
      { header: "Net Earnings", accessor: "net", cellClassName: "font-black text-green-600 dark:text-green-400" },
      { header: "Status", accessor: "status", cell: (row) => <StatusBadge status={row.status} /> },
      { header: "Date", accessor: "date", cellClassName: "text-gray-500 text-xs" }
    ];

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-gray-800 dark:text-white">Transaction History</h3>
          <button className="btn btn-sm btn-outline border-gray-200 dark:border-slate-700 rounded-lg flex items-center gap-2 text-xs">
            <Download size={14} /> Export CSV
          </button>
        </div>
        <DataTable 
          columns={columns} 
          data={transactions} 
          isLoading={isLoading} 
          emptyTitle="No Transactions Found"
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Financial Wallet</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Track your earnings, settlements, and platform commissions in real-time.</p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto custom-scrollbar gap-2 border-b border-gray-200 dark:border-slate-800 pb-px">
        {['overview', 'transactions', 'settlements', 'earnings'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-bold capitalize transition-all border-b-2 ${
              activeTab === tab
                ? 'border-orange-500 text-orange-600 dark:text-orange-500 bg-orange-50/50 dark:bg-orange-500/10'
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 dark:hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'transactions' && renderTransactions()}
        {activeTab === 'settlements' && (
          <div className="bg-white dark:bg-slate-900 p-12 text-center rounded-2xl border border-gray-100 dark:border-slate-800 text-gray-500">
            Settlement History module is under construction.
          </div>
        )}
        {activeTab === 'earnings' && (
          <div className="bg-white dark:bg-slate-900 p-12 text-center rounded-2xl border border-gray-100 dark:border-slate-800 text-gray-500">
            Earnings Breakdown module is under construction.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default WalletManager;
