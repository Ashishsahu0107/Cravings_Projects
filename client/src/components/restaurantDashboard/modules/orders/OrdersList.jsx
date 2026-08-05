import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, Calendar } from 'lucide-react';
import DataTable from '../../../ui/DataTable';
import StatusBadge from '../../../ui/StatusBadge';
import OrderDetailsDrawer from './OrderDetailsDrawer';

// Mock Data Fetcher
const fetchOrders = async (statusFilter) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const allOrders = [
    { id: "#ORD-7281", customer: "Rahul Sharma", items: "2x Margherita, 1x Coke", amount: "₹850", status: "New", time: "2 mins ago" },
    { id: "#ORD-7280", customer: "Priya Singh", items: "1x Farmhouse Pizza", amount: "₹450", status: "Preparing", time: "12 mins ago" },
    { id: "#ORD-7279", customer: "Amit Patel", items: "1x Pasta, 2x Garlic Bread", amount: "₹620", status: "Ready", time: "18 mins ago" },
    { id: "#ORD-7278", customer: "Neha Gupta", items: "3x Veg Burger, 1x Fries", amount: "₹550", status: "Picked Up", time: "25 mins ago" },
    { id: "#ORD-7277", customer: "Suresh Kumar", items: "1x Tandoori Paneer Pizza", amount: "₹350", status: "Delivered", time: "1 hour ago" },
    { id: "#ORD-7276", customer: "Vikas L.", items: "2x Choco Lava Cake", amount: "₹240", status: "Cancelled", time: "2 hours ago" },
  ];

  if (statusFilter === 'All') return allOrders;
  return allOrders.filter(o => o.status === statusFilter);
};

const tabs = ["All", "New", "Accepted", "Preparing", "Ready", "Picked Up", "Delivered", "Cancelled"];

const OrdersList = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // React Query for data fetching
  const { data: orders, isLoading } = useQuery({
    queryKey: ['restaurantOrders', activeTab],
    queryFn: () => fetchOrders(activeTab)
  });

  const columns = [
    { header: "Order ID", accessor: "id", cellClassName: "font-bold" },
    { header: "Customer", accessor: "customer" },
    { header: "Items", accessor: "items", cellClassName: "max-w-xs truncate text-gray-500" },
    { header: "Amount", accessor: "amount", cellClassName: "font-semibold" },
    { 
      header: "Status", 
      accessor: "status",
      cell: (row) => <StatusBadge status={row.status} /> 
    },
    { header: "Time", accessor: "time", cellClassName: "text-gray-500 text-xs" }
  ];

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Orders Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">View, manage, and process customer orders.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm font-semibold rounded-xl border-gray-200 dark:border-slate-700">
            <Calendar size={16} className="mr-2" /> Today
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Tabs */}
        <div className="flex overflow-x-auto w-full md:w-auto custom-scrollbar gap-2 pb-2 md:pb-0">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
                activeTab === tab 
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search Order ID, Customer..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-800 dark:text-white"
            />
          </div>
          <button className="p-2 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-500">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable 
        columns={columns}
        data={orders}
        isLoading={isLoading}
        onRowClick={handleRowClick}
        emptyTitle="No Orders Found"
        emptyDesc={`There are currently no orders in the '${activeTab}' status.`}
      />

      {/* Order Details Drawer */}
      <OrderDetailsDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrdersList;
