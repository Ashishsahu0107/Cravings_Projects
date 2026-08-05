import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Reply, Flag } from 'lucide-react';

const reviews = [
  { id: 1, customer: "Anjali M.", rating: 5, date: "2 days ago", comment: "The crust was perfectly baked and the toppings were generous. Definitely ordering again!", order: "Farmhouse Pizza" },
  { id: 2, customer: "Rohan K.", rating: 4, date: "4 days ago", comment: "Taste was good but delivery took a bit longer than expected.", order: "White Sauce Pasta" },
];

const InsightsAndReviews = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm p-5"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <MessageSquare size={20} className="text-teal-500" /> Recent Reviews
          </h2>
        </div>
        <div className="flex items-center gap-1 bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 px-2 py-1 rounded-lg text-xs font-bold">
          <Star size={14} className="fill-amber-500 stroke-amber-500" /> 4.8 Avg
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 rounded-xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="avatar placeholder">
                  <div className="bg-teal-500 text-white rounded-full w-8 h-8">
                    <span className="text-xs">{review.customer.charAt(0)}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200">{review.customer}</h4>
                  <p className="text-[10px] text-gray-500">{review.date}</p>
                </div>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300 dark:text-slate-700"} />
                ))}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-3">"{review.comment}"</p>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 bg-white dark:bg-slate-900 px-2 py-1 rounded-md border border-gray-200 dark:border-slate-700">
                Ord: {review.order}
              </span>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 text-teal-600 hover:text-teal-700 font-medium bg-teal-50 dark:bg-teal-500/10 dark:text-teal-400 px-2 py-1 rounded-lg">
                  <Reply size={14} /> Reply
                </button>
                <button className="text-gray-400 hover:text-red-500 transition-colors p-1">
                  <Flag size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors border border-dashed border-gray-300 dark:border-slate-700 rounded-xl">
        View All Reviews
      </button>
    </motion.div>
  );
};

export default InsightsAndReviews;
