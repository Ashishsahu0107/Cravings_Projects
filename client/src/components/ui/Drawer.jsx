import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Drawer = ({ isOpen, onClose, title, children, width = "max-w-md", footer = null }) => {
  
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className={`fixed inset-y-0 right-0 z-[70] w-full ${width} bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-gray-200 dark:border-slate-800`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white truncate pr-4">{title}</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-800 text-gray-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="p-4 border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/80">
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
