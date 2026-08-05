import React, { useState } from 'react';
import { IndianRupee, ArrowRight, Building2, Smartphone, History, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export const WalletTab = () => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("upi");

  const availableBalance = 4250.50;
  const pendingSettlement = 1200.00;

  const handleWithdraw = () => {
    if (!withdrawAmount) return toast.error("Please enter an amount");
    if (parseFloat(withdrawAmount) > availableBalance) return toast.error("Insufficient balance");
    if (parseFloat(withdrawAmount) < 100) return toast.error("Minimum withdrawal is ₹100");
    
    toast.success(`Withdrawal of ₹${withdrawAmount} initiated to ${withdrawMethod.toUpperCase()}`);
    setWithdrawAmount("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden flex flex-col justify-between min-h-[300px]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 pointer-events-none"></div>
        
        <div className="relative z-10">
          <p className="text-green-100 font-bold uppercase tracking-wider text-sm mb-2">Available to Withdraw</p>
          <h2 className="text-5xl font-black flex items-center gap-1">
            <IndianRupee size={40} /> {availableBalance.toFixed(2)}
          </h2>
        </div>

        <div className="relative z-10 bg-black/20 rounded-2xl p-4 mt-8 flex justify-between items-center border border-white/10">
          <div>
            <p className="text-xs text-green-200 font-bold uppercase mb-1">Pending Settlement</p>
            <h3 className="text-xl font-bold flex items-center gap-1">
              <IndianRupee size={16} /> {pendingSettlement.toFixed(2)}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold bg-white/10 px-3 py-1.5 rounded-xl">
            <Clock size={14} /> Clears in 24h
          </div>
        </div>
      </div>

      {/* Withdrawal Action */}
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Withdraw Funds</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Amount to withdraw (₹)</label>
            <div className="relative">
              <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="number" 
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder={`Max: ${availableBalance}`}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-2xl font-black text-xl text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-3 uppercase">Withdrawal Method</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setWithdrawMethod('upi')}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition ${withdrawMethod === 'upi' ? 'border-green-500 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400' : 'border-gray-200 dark:border-slate-700 text-gray-500'}`}
              >
                <Smartphone size={24} />
                <span className="font-bold text-sm">UPI ID</span>
              </button>
              <button 
                onClick={() => setWithdrawMethod('bank')}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition ${withdrawMethod === 'bank' ? 'border-green-500 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400' : 'border-gray-200 dark:border-slate-700 text-gray-500'}`}
              >
                <Building2 size={24} />
                <span className="font-bold text-sm">Bank Transfer</span>
              </button>
            </div>
          </div>

          <button 
            onClick={handleWithdraw}
            className="w-full bg-gray-900 dark:bg-white hover:opacity-90 text-white dark:text-gray-900 font-bold py-4 rounded-2xl transition shadow-xl flex items-center justify-center gap-2"
          >
            Initiate Withdrawal <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Recent History */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm mt-4">
        <h3 className="font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"><History size={20} /> Recent Withdrawals</h3>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                  {i % 2 === 0 ? <Building2 size={20} className="text-blue-500" /> : <Smartphone size={20} className="text-purple-500" />}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-800 dark:text-white">{i % 2 === 0 ? 'Bank Transfer ending in 9482' : 'UPI Transfer to rohit@okaxis'}</h4>
                  <p className="text-xs text-gray-500 font-medium">Oct {15 - i}, 2026 • 14:30 PM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-gray-800 dark:text-white">-₹{(i * 1500).toFixed(2)}</p>
                <span className="text-[10px] font-bold text-green-500 uppercase">Completed</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
