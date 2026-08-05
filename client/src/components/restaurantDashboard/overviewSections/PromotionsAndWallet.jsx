import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Wallet, ArrowRight, ArrowUpRight } from 'lucide-react';

const PromotionsAndWallet = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {/* Promotions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-sm p-5 text-white relative overflow-hidden"
      >
        <div className="absolute -right-6 -top-6 text-white/10">
          <Ticket size={120} />
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Ticket size={20} /> Active Promotions
            </h2>
            <span className="bg-white/20 px-2 py-1 rounded-md text-xs font-bold">2 Running</span>
          </div>

          <div className="space-y-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm">BOGO Pizza</span>
                <span className="text-xs bg-green-500/80 px-2 py-0.5 rounded text-white font-bold">Active</span>
              </div>
              <p className="text-[10px] text-pink-100 mb-2">Buy 1 Get 1 Free on all Medium Pizzas</p>
              <div className="text-xs font-semibold flex justify-between">
                <span>Usage: 45/100</span>
                <span>Ends in 2 days</span>
              </div>
            </div>
          </div>

          <button className="mt-4 w-full flex items-center justify-center gap-2 bg-white text-rose-600 font-bold py-2 rounded-xl text-sm hover:bg-rose-50 transition-colors shadow-lg">
            Create New Offer <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>

      {/* Wallet */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-gray-900 rounded-2xl shadow-sm p-5 text-white relative overflow-hidden"
      >
        <div className="absolute -right-6 -bottom-6 text-white/5">
          <Wallet size={120} />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold flex items-center gap-2 text-gray-300">
                <Wallet size={20} /> Wallet Balance
              </h2>
            </div>
            <h1 className="text-4xl font-black mb-1">₹45,280</h1>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <ArrowUpRight size={14} /> +₹12,450 to be settled today
            </p>
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="bg-white/10 rounded-xl p-3 border border-white/5">
                <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Weekly</p>
                <p className="font-bold">₹82,400</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 border border-white/5">
                <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Monthly</p>
                <p className="font-bold">₹3,45,000</p>
              </div>
            </div>
            
            <button className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white font-bold py-2 rounded-xl text-sm hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
              Withdraw Funds
            </button>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default PromotionsAndWallet;
