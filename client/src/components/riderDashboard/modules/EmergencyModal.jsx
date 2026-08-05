import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Phone, ShieldAlert, Wrench, X, HeartPulse } from 'lucide-react';
import toast from 'react-hot-toast';

const EmergencyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleAction = (actionName) => {
    toast.error(`${actionName} alert triggered! Support has been notified.`);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          onClick={onClose}
        ></motion.div>

        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-red-100 dark:border-red-900/50"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition"
          >
            <X size={20} />
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-500 rounded-full mb-4 ring-8 ring-red-50 dark:ring-red-500/10">
              <AlertTriangle size={32} />
            </div>
            <h2 className="text-2xl font-black text-gray-800 dark:text-white">Emergency Assist</h2>
            <p className="text-sm font-medium text-gray-500 mt-2">Select the type of emergency below. We will immediately dispatch help to your live location.</p>
          </div>

          <div className="grid gap-3">
            <button onClick={() => handleAction("Medical Emergency")} className="flex items-center gap-4 p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 border border-red-200 dark:border-red-500/30 text-left transition group">
              <div className="p-2 bg-red-500 text-white rounded-xl group-hover:scale-110 transition"><HeartPulse size={20} /></div>
              <div>
                <h4 className="font-bold text-red-700 dark:text-red-400">Medical Emergency</h4>
                <p className="text-xs text-red-600/80 dark:text-red-400/80 font-medium">Request immediate ambulance</p>
              </div>
            </button>

            <button onClick={() => handleAction("Vehicle Breakdown")} className="flex items-center gap-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 border border-amber-200 dark:border-amber-500/30 text-left transition group">
              <div className="p-2 bg-amber-500 text-white rounded-xl group-hover:scale-110 transition"><Wrench size={20} /></div>
              <div>
                <h4 className="font-bold text-amber-700 dark:text-amber-400">Vehicle Breakdown</h4>
                <p className="text-xs text-amber-600/80 dark:text-amber-400/80 font-medium">Tow truck & mechanical assist</p>
              </div>
            </button>

            <button onClick={() => handleAction("Security Threat")} className="flex items-center gap-4 p-4 rounded-2xl bg-purple-50 dark:bg-purple-500/10 hover:bg-purple-100 dark:hover:bg-purple-500/20 border border-purple-200 dark:border-purple-500/30 text-left transition group">
              <div className="p-2 bg-purple-500 text-white rounded-xl group-hover:scale-110 transition"><ShieldAlert size={20} /></div>
              <div>
                <h4 className="font-bold text-purple-700 dark:text-purple-400">Security Threat</h4>
                <p className="text-xs text-purple-600/80 dark:text-purple-400/80 font-medium">Alert local authorities immediately</p>
              </div>
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
            <button className="w-full py-4 rounded-xl font-bold bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center gap-2 hover:opacity-90 transition shadow-xl">
              <Phone size={18} /> Call Rider Support (24/7)
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EmergencyModal;
