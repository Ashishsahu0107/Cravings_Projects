import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, Plus, LayoutGrid, List, MoreVertical, Edit3, Trash2, Copy } from 'lucide-react';
import DataTable from '../../../ui/DataTable';
import StatusBadge from '../../../ui/StatusBadge';
import { motion, AnimatePresence } from 'framer-motion';

const fetchMenuItems = async (category) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const allItems = [
    { id: "ITM-01", name: "Farmhouse Pizza", category: "Pizza", price: "₹450", stock: 45, status: "In Stock", img: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=150&q=80" },
    { id: "ITM-02", name: "White Sauce Pasta", category: "Pasta", price: "₹280", stock: 12, status: "Low Stock", img: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=150&q=80" },
    { id: "ITM-03", name: "Garlic Bread", category: "Sides", price: "₹150", stock: 0, status: "Out of Stock", img: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=150&q=80" },
    { id: "ITM-04", name: "Choco Lava Cake", category: "Dessert", price: "₹120", stock: 150, status: "In Stock", img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=150&q=80" },
    { id: "ITM-05", name: "Paneer Tikka Pizza", category: "Pizza", price: "₹490", stock: 25, status: "In Stock", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=150&q=80" },
  ];

  if (category === 'All') return allItems;
  return allItems.filter(i => i.category === category);
};

const categories = ["All", "Pizza", "Pasta", "Sides", "Dessert", "Beverages"];

const MenuManager = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const { data: menuItems, isLoading } = useQuery({
    queryKey: ['restaurantMenu', activeCategory],
    queryFn: () => fetchMenuItems(activeCategory)
  });

  const columns = [
    { 
      header: "Item", 
      accessor: "name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <img src={row.img} alt={row.name} className="w-10 h-10 rounded-lg object-cover" />
          <div className="font-bold text-gray-800 dark:text-gray-200">{row.name}</div>
        </div>
      )
    },
    { header: "Category", accessor: "category", cellClassName: "text-gray-500 uppercase text-[10px] tracking-wider font-bold" },
    { header: "Price", accessor: "price", cellClassName: "font-bold text-gray-800 dark:text-gray-200" },
    { header: "Stock", accessor: "stock", cellClassName: "text-gray-500 font-medium" },
    { 
      header: "Status", 
      accessor: "status",
      cell: (row) => <StatusBadge status={row.status} /> 
    },
    {
      header: "Actions",
      accessor: "actions",
      cell: () => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded text-gray-500 transition tooltip" data-tip="Edit"><Edit3 size={16} /></button>
          <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded text-gray-500 transition tooltip" data-tip="Duplicate"><Copy size={16} /></button>
          <button className="p-1.5 hover:bg-red-50 dark:hover:bg-red-500/10 rounded text-red-500 transition tooltip" data-tip="Delete"><Trash2 size={16} /></button>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Menu Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your dishes, categories, and inventory stock.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm font-semibold rounded-xl border-gray-200 dark:border-slate-700 hidden sm:flex">
            Bulk Actions
          </button>
          <button className="btn btn-primary btn-sm font-bold rounded-xl text-white shadow-lg shadow-orange-500/30">
            <Plus size={16} className="mr-1" /> Add Food
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Categories */}
        <div className="flex overflow-x-auto w-full md:w-auto custom-scrollbar gap-2 pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
                activeCategory === cat 
                ? 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View Toggle & Search */}
        <div className="flex gap-3 w-full md:w-auto items-center">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search dishes..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-gray-800 dark:text-white"
            />
          </div>
          
          <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-gray-800 dark:text-white' : 'text-gray-500'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-gray-800 dark:text-white' : 'text-gray-500'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {viewMode === 'list' ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <DataTable 
              columns={columns}
              data={menuItems}
              isLoading={isLoading}
              emptyTitle="No Menu Items"
              emptyDesc={`You haven't added any dishes to the '${activeCategory}' category.`}
            />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {isLoading ? (
              [...Array(10)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-3 animate-pulse h-64">
                  <div className="w-full h-32 bg-gray-200 dark:bg-slate-700 rounded-xl mb-3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
                </div>
              ))
            ) : (
              menuItems?.map((item) => (
                <div key={item.id} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="h-36 relative overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-2 right-2">
                      <button className="p-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-lg text-gray-500 hover:text-orange-500 shadow-sm">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm truncate pr-2">{item.name}</h3>
                    </div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-3">{item.category}</p>
                    
                    <div className="flex justify-between items-end">
                      <span className="font-black text-orange-500 text-lg">{item.price}</span>
                      <StatusBadge status={item.status} className="!text-[10px]" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default MenuManager;
