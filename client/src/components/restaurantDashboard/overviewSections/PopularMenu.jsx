import React from 'react';
import { motion } from 'framer-motion';
import { Star, Edit3, Heart } from 'lucide-react';

const popularItems = [
  { id: 1, name: "Farmhouse Pizza", category: "Pizza", price: "₹450", orders: 245, revenue: "₹1,10,250", rating: 4.8, available: true, img: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=300&q=80" },
  { id: 2, name: "White Sauce Pasta", category: "Pasta", price: "₹280", orders: 180, revenue: "₹50,400", rating: 4.6, available: true, img: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=300&q=80" },
  { id: 3, name: "Garlic Bread", category: "Sides", price: "₹150", orders: 320, revenue: "₹48,000", rating: 4.9, available: false, img: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=300&q=80" },
  { id: 4, name: "Choco Lava Cake", category: "Dessert", price: "₹120", orders: 150, revenue: "₹18,000", rating: 4.7, available: true, img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=300&q=80" },
];

const PopularMenu = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm p-5"
    >
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Heart size={20} className="text-red-500" /> Top Selling Items
          </h2>
          <p className="text-xs text-gray-500 mt-1">Your most popular menu items this week</p>
        </div>
        <button className="btn btn-sm btn-outline btn-primary rounded-xl text-xs">View All</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {popularItems.map((item, idx) => (
          <div key={idx} className={`relative border rounded-xl overflow-hidden transition-all hover:shadow-md ${!item.available ? 'opacity-70 border-red-200 dark:border-red-900 grayscale-[0.3]' : 'border-gray-100 dark:border-slate-800'}`}>
            <div className="h-32 w-full relative">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-800 dark:text-white shadow-sm flex items-center gap-1">
                <Star size={12} className="text-amber-500 fill-amber-500" /> {item.rating}
              </div>
              {!item.available && (
                <div className="absolute inset-0 bg-red-900/40 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">Out of Stock</span>
                </div>
              )}
            </div>
            <div className="p-4 bg-white dark:bg-slate-800">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm truncate pr-2">{item.name}</h3>
                <span className="font-bold text-orange-500">{item.price}</span>
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-3">{item.category}</p>
              
              <div className="flex justify-between items-center text-xs pt-3 border-t border-gray-100 dark:border-slate-700">
                <div className="flex flex-col">
                  <span className="text-gray-400 font-medium">Orders</span>
                  <span className="font-bold text-gray-700 dark:text-gray-300">{item.orders}</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-gray-400 font-medium">Revenue</span>
                  <span className="font-bold text-green-600 dark:text-green-400">{item.revenue}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <label className="flex items-center cursor-pointer gap-2">
                  <input type="checkbox" className="toggle toggle-success toggle-sm" defaultChecked={item.available} />
                  <span className="text-[10px] font-semibold text-gray-500">{item.available ? 'In Stock' : 'Out'}</span>
                </label>
                <button className="text-gray-400 hover:text-orange-500 transition-colors">
                  <Edit3 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PopularMenu;
