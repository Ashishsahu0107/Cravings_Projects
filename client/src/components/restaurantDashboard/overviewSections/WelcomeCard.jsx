import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Eye, Tag, Package } from 'lucide-react';

const WelcomeCard = ({ restaurantName = "Pizza Palace" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg shadow-orange-500/30 flex flex-col md:flex-row justify-between items-center gap-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Good Morning, {restaurantName} 🍕</h1>
        <p className="text-orange-100 text-sm opacity-90 max-w-md">
          Here's what's happening with your store today. You have 12 pending orders and your revenue is up by 15% from yesterday.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-semibold transition-colors border border-white/20">
          <Plus size={16} /> Add Food
        </button>
        <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-semibold transition-colors border border-white/20">
          <Eye size={16} /> View Orders
        </button>
        <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-semibold transition-colors border border-white/20">
          <Tag size={16} /> Create Offer
        </button>
        <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-semibold transition-colors border border-white/20">
          <Package size={16} /> Inventory
        </button>
      </div>
    </motion.div>
  );
};

export default WelcomeCard;
