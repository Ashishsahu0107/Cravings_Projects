import React from 'react';
import { ShoppingBag, MapPin, Clock, FileText, CheckCircle2, User, Phone, Mail, FileDown, Printer, UserCog, Ban } from 'lucide-react';
import StatusBadge from '../../../ui/StatusBadge';
import Drawer from '../../../ui/Drawer';

const OrderDetailsDrawer = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  const handleAction = (action) => {
    alert(`Action triggered: ${action}`);
    onClose();
  };

  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Order ${order.id}`}
      width="max-w-md md:max-w-lg lg:max-w-xl"
      footer={
        <div className="flex gap-3 justify-end">
          <button 
            onClick={() => handleAction('Print Invoice')}
            className="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-200 dark:hover:bg-slate-700 transition flex items-center gap-2"
          >
            <Printer size={16} /> Print
          </button>
          
          {order.status === 'New' && (
            <button 
              onClick={() => handleAction('Accept Order')}
              className="px-6 py-2 bg-green-500 text-white rounded-xl font-bold text-sm hover:bg-green-600 transition flex items-center gap-2 shadow-lg shadow-green-500/30"
            >
              <CheckCircle2 size={16} /> Accept Order
            </button>
          )}

          {order.status === 'Ready' && (
            <button 
              onClick={() => handleAction('Assign Rider')}
              className="px-6 py-2 bg-blue-500 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition flex items-center gap-2 shadow-lg shadow-blue-500/30"
            >
              <UserCog size={16} /> Assign Rider
            </button>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        
        {/* Status & Summary */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-2">{order.amount}</h3>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
              <Clock size={14} /> Placed at {order.time}
            </div>
          </div>
          <StatusBadge status={order.status} className="text-sm px-3 py-1.5" />
        </div>

        {/* Customer Information */}
        <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-800">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <User size={14} /> Customer Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">{order.customer}</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Phone size={12}/> +91 98765 43210</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-1">
                <MapPin size={16} className="shrink-0 mt-0.5 text-gray-400" />
                <span>123, Maple Street, Apartment 4B, New Delhi - 110001</span>
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <ShoppingBag size={14} /> Items Ordered
          </h4>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex justify-between items-center p-3 border border-gray-100 dark:border-slate-800 rounded-xl">
                <div className="flex gap-3 items-center">
                  <div className="bg-orange-100 text-orange-600 dark:bg-orange-500/20 px-2 py-1 rounded text-xs font-bold">2x</div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">Farmhouse Pizza</p>
                    <p className="text-xs text-gray-500">Medium, Cheese Burst</p>
                  </div>
                </div>
                <p className="font-bold text-gray-800 dark:text-gray-200">₹450</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 border border-dashed border-gray-200 dark:border-slate-700 rounded-xl bg-orange-50/50 dark:bg-orange-500/5">
            <p className="text-xs font-semibold text-orange-800 dark:text-orange-400 flex items-start gap-2">
              <FileText size={14} className="shrink-0 mt-0.5" />
              <span><strong>Special Instructions:</strong> Please send extra oregano packets and don't ring the bell.</span>
            </p>
          </div>
        </div>

        {/* Bill Details */}
        <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-800">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <FileText size={14} /> Bill Details
          </h4>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex justify-between"><span>Item Total</span><span>₹900</span></div>
            <div className="flex justify-between"><span>Taxes & Charges</span><span>₹45</span></div>
            <div className="flex justify-between text-green-600 dark:text-green-400"><span>Restaurant Promo (BOGO)</span><span>-₹200</span></div>
            <div className="border-t border-gray-200 dark:border-slate-700 pt-2 mt-2 flex justify-between font-black text-gray-800 dark:text-white text-lg">
              <span>Grand Total</span><span>₹745</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs">Payment Mode</span>
              <span className="text-xs font-bold bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 px-2 py-1 rounded">PAID (UPI)</span>
            </div>
          </div>
        </div>

      </div>
    </Drawer>
  );
};

export default OrderDetailsDrawer;
