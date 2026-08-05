import React, { useState } from 'react';
import { FormToggle } from '../../../ui/forms/FormToggle';
import { motion } from 'framer-motion';
import { Save, Clock } from 'lucide-react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const BusinessHours = () => {
  const [schedule, setSchedule] = useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = {
        isOpen: day !== 'Sunday', // Closed on Sundays by default
        openTime: '09:00',
        closeTime: '22:00'
      };
      return acc;
    }, {})
  );

  const [vacationMode, setVacationMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggleDay = (day) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], isOpen: !prev[day].isOpen }
    }));
  };

  const handleTimeChange = (day, type, value) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], [type]: value }
    }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    console.log("Schedule:", schedule, "Vacation Mode:", vacationMode);
    setIsSubmitting(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Business Hours</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Configure your daily operating hours and temporary closures.</p>
      </div>

      <div className="space-y-8">
        
        {/* Temporary Overrides */}
        <div className="bg-amber-50 dark:bg-amber-500/10 p-6 rounded-2xl border border-amber-200 dark:border-amber-500/30">
          <FormToggle 
            id="vacationMode"
            label="Vacation Mode (Temporarily Closed)"
            description="Enable this to temporarily pause all incoming orders without deleting your schedule. Customers will see your restaurant as closed."
            checked={vacationMode}
            onChange={(e) => setVacationMode(e.target.checked)}
            containerClassName="border-none bg-transparent dark:bg-transparent p-0"
          />
        </div>

        {/* Regular Schedule */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 dark:border-slate-800 pb-3">
            <Clock className="text-orange-500" size={18} />
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">Weekly Schedule</h3>
          </div>
          
          <div className="space-y-4">
            {daysOfWeek.map((day) => (
              <div key={day} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border transition-colors ${
                schedule[day].isOpen ? 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800/50' : 'border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/50 opacity-70'
              }`}>
                
                <div className="flex items-center gap-4 w-40">
                  <input 
                    type="checkbox" 
                    checked={schedule[day].isOpen} 
                    onChange={() => handleToggleDay(day)}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 dark:bg-slate-700 dark:border-slate-600 cursor-pointer"
                  />
                  <span className={`font-bold ${schedule[day].isOpen ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400'}`}>{day}</span>
                </div>

                {schedule[day].isOpen ? (
                  <div className="flex items-center gap-3">
                    <input 
                      type="time" 
                      value={schedule[day].openTime}
                      onChange={(e) => handleTimeChange(day, 'openTime', e.target.value)}
                      className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-200 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                    <span className="text-gray-400 text-sm font-medium">to</span>
                    <input 
                      type="time" 
                      value={schedule[day].closeTime}
                      onChange={(e) => handleTimeChange(day, 'closeTime', e.target.value)}
                      className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-200 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                ) : (
                  <div className="text-sm font-bold text-red-500 bg-red-50 dark:bg-red-500/10 px-4 py-2 rounded-lg inline-block text-center sm:text-left">
                    Closed
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-100 dark:border-slate-800">
          <button 
            onClick={handleSave} 
            disabled={isSubmitting}
            className="btn bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-8 shadow-lg shadow-orange-500/30 flex items-center gap-2 border-none"
          >
            {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : <><Save size={18} /> Save Schedule</>}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessHours;
