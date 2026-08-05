import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Utensils, Tag, Percent, MessageCircle } from 'lucide-react';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const actions = [
    { icon: <Utensils size={18} />, label: "Add Food", color: "bg-blue-500" },
    { icon: <Tag size={18} />, label: "Add Category", color: "bg-purple-500" },
    { icon: <Percent size={18} />, label: "Create Offer", color: "bg-green-500" },
    { icon: <MessageCircle size={18} />, label: "Support", color: "bg-rose-500" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-3"
          >
            {actions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-end gap-3"
              >
                <span className="bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-lg shadow-sm text-sm font-medium border border-gray-100 dark:border-slate-700">
                  {action.label}
                </span>
                <button className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform ${action.color}`}>
                  {action.icon}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleOpen}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-300 ${
          isOpen ? "bg-slate-800 rotate-45" : "bg-orange-500 hover:scale-105"
        }`}
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default FloatingActionButton;
