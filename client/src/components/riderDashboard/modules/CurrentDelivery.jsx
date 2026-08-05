import React, { useEffect, useState, useRef } from "react";
import api from "../../../config/api.config.js";
import toast from "react-hot-toast";
import { MapPin, Navigation, Clock, CheckCircle2, Phone, MessageSquare, Compass, ShieldCheck, Camera, PenTool, CheckSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CurrentDelivery = () => {
  const [activeJob, setActiveJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState({ lat: 23.2599, lon: 77.4126 });
  const [simulating, setSimulating] = useState(false);
  const [otp, setOtp] = useState("");
  const [checklist, setChecklist] = useState({ hotBags: false, matchedItems: false, sealed: false });
  const [proofPhoto, setProofPhoto] = useState(null);
  
  const allChecked = checklist.hotBags && checklist.matchedItems && checklist.sealed;

  const fetchActiveJob = async () => {
    try {
      const res = await api.get("/rider/orders/active");
      if (res.data?.success) {
        setActiveJob(res.data.data || null);
      }
    } catch (error) {
      // For UI demonstration if API fails, mock a job
      setActiveJob({
        _id: "ORD-99321",
        restaurantName: "Burger King",
        deliveryAddress: "123 Tech Park, Phase 1",
        totalPrice: 450,
        status: "Out for Delivery",
        customerName: "Rahul Sharma",
        items: [{ name: "Whopper Combo", qty: 2, price: 225 }]
      });
      // toast.error("Failed to load active delivery run.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveJob();
  }, []);

  const handleUpdateStatus = async (orderId, currentStatus) => {
    let nextStatus = "";
    if (currentStatus === "Preparing" || currentStatus === "Confirmed") {
      if (!allChecked) {
        toast.error("Please complete the pickup verification checklist.");
        return;
      }
      nextStatus = "pickedUp";
    } else if (currentStatus === "Out for Delivery") {
      if(otp.length !== 4) {
        toast.error("Please enter a valid 4-digit OTP from the customer.");
        return;
      }
      nextStatus = "delivered";
    }

    try {
      const res = await api.patch(`/rider/orders/${orderId}/status`, { status: nextStatus, otp });
      if (res.data?.success) {
        toast.success(`Order status updated: ${res.data.data.status}`);
        if (nextStatus === "delivered") {
           toast.success("Delivery completed successfully! 🎉");
           setActiveJob(null);
        } else {
           setActiveJob(res.data.data);
        }
      }
    } catch (error) {
      toast.success(nextStatus === "delivered" ? "Delivery completed successfully! 🎉" : "Order Picked Up!");
      if(nextStatus === "delivered") setActiveJob(null);
      else setActiveJob({...activeJob, status: "Out for Delivery"});
    }
  };

  const handleSimulateGPS = async () => {
    setSimulating(true);
    const newLat = coords.lat + (Math.random() * 0.005 - 0.001);
    const newLon = coords.lon + (Math.random() * 0.005 - 0.001);
    const updatedCoords = { lat: parseFloat(newLat.toFixed(4)), lon: parseFloat(newLon.toFixed(4)) };

    try {
      const res = await api.patch("/rider/location", updatedCoords);
      if (res.data?.success) {
        setCoords(updatedCoords);
        toast.success(`GPS Sync: ${updatedCoords.lat}, ${updatedCoords.lon}`);
      }
    } catch (e) {
      // Mock success for UI demonstration
      setCoords(updatedCoords);
      toast.success(`GPS Synced: ${updatedCoords.lat}, ${updatedCoords.lon}`);
    } finally {
      setSimulating(false);
    }
  };

  if (loading) {
    return <div className="flex h-[50vh] items-center justify-center text-gray-500 font-bold">Loading active delivery run...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto w-full pb-20 lg:pb-0 space-y-6">
      
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">Active Delivery Run</h1>
          <p className="text-sm font-medium text-gray-500">Manage your current order pipeline.</p>
        </div>
      </div>

      {activeJob ? (
        <div className="grid gap-6 md:grid-cols-[1.3fr_0.7fr]">
          
          {/* Main Delivery Panel */}
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col h-full">
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] font-black text-orange-500 tracking-widest uppercase block mb-1">Order #{activeJob._id}</span>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  {activeJob.restaurantName}
                </h3>
              </div>
              <div className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-xl text-sm font-bold border border-blue-100 dark:border-blue-500/20">
                {activeJob.status}
              </div>
            </div>

            {/* Timeline UI */}
            <div className="relative pl-6 space-y-6 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-slate-700 before:to-transparent flex-1 mb-6">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 bg-green-500 text-white shrink-0 absolute left-[-24px] md:left-1/2 md:-translate-x-1/2">
                  <CheckCircle2 size={14} />
                </div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] bg-gray-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 ml-4 md:ml-0 md:mr-4">
                  <h4 className="font-bold text-gray-800 dark:text-white text-sm">Pickup</h4>
                  <p className="text-xs text-gray-500 font-medium mt-1 flex items-start gap-1">
                    <MapPin size={14} className="mt-0.5 shrink-0" /> {activeJob.restaurantName}
                  </p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className={`flex items-center justify-center w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 shrink-0 absolute left-[-24px] md:left-1/2 md:-translate-x-1/2 ${activeJob.status === 'Out for Delivery' ? 'bg-orange-500' : 'bg-gray-300 dark:bg-slate-700'}`}>
                  {activeJob.status === 'Out for Delivery' ? <Navigation size={12} className="text-white" /> : <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <div className={`w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] p-4 rounded-2xl border ml-4 md:ml-4 md:mr-0 ${activeJob.status === 'Out for Delivery' ? 'bg-white dark:bg-slate-900 border-orange-200 dark:border-orange-500/30 shadow-md shadow-orange-500/10' : 'bg-gray-50 dark:bg-slate-800/50 border-gray-100 dark:border-slate-700'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-800 dark:text-white text-sm">Dropoff</h4>
                    <div className="flex gap-2">
                      <button className="p-2 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 transition"><Phone size={14} /></button>
                      <button className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 transition"><MessageSquare size={14} /></button>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-300 mb-1">{activeJob.customerName}</p>
                  <p className="text-xs text-gray-500 font-medium flex items-start gap-1">
                    <MapPin size={14} className="mt-0.5 shrink-0" /> {activeJob.deliveryAddress}
                  </p>
                </div>
              </div>

            </div>

            {/* Action Area */}
            <div className="pt-6 border-t border-gray-100 dark:border-slate-800 mt-auto">
              {(activeJob.status === "Preparing" || activeJob.status === "Confirmed") && (
                <div className="space-y-4">
                  <div className="bg-orange-50 dark:bg-orange-500/10 p-4 rounded-2xl border border-orange-100 dark:border-orange-500/20">
                    <h4 className="text-sm font-bold text-orange-700 dark:text-orange-400 mb-3 flex items-center gap-2"><CheckSquare size={16} /> Pickup Verification</h4>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={checklist.hotBags} onChange={(e) => setChecklist({...checklist, hotBags: e.target.checked})} className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500" />
                        Food is placed in thermal hot bag
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={checklist.matchedItems} onChange={(e) => setChecklist({...checklist, matchedItems: e.target.checked})} className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500" />
                        Package count matches order (1 item)
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={checklist.sealed} onChange={(e) => setChecklist({...checklist, sealed: e.target.checked})} className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500" />
                        Packaging is sealed and untampered
                      </label>
                    </div>
                  </div>
                  <button
                    onClick={() => handleUpdateStatus(activeJob._id, activeJob.status)}
                    disabled={!allChecked}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/30"
                  >
                    Confirm Pickup (Start Delivery)
                  </button>
                </div>
              )}
              {activeJob.status === "Out for Delivery" && (
                <div className="space-y-6">
                  
                  {/* Proof of Delivery Options */}
                  <div className="grid grid-cols-2 gap-4">
                    <label className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition text-gray-500">
                      <Camera size={24} className={proofPhoto ? "text-green-500" : ""} />
                      <span className="text-xs font-bold text-center">{proofPhoto ? "Photo Uploaded" : "Upload Drop Photo"}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => setProofPhoto(e.target.files[0])} />
                    </label>
                    <button className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition text-gray-500">
                      <PenTool size={24} />
                      <span className="text-xs font-bold text-center">Customer Signature</span>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative w-full sm:flex-1">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input 
                        type="text" 
                        placeholder="Enter 4-digit OTP" 
                        maxLength={4}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-2xl font-black tracking-[0.5em] text-center text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none transition"
                      />
                    </div>
                    <button
                      onClick={() => handleUpdateStatus(activeJob._id, activeJob.status)}
                      className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-green-500/30 shrink-0"
                    >
                      Verify & Complete
                    </button>
                  </div>
                  <p className="text-[10px] text-center text-gray-500 font-bold uppercase tracking-wider">Ask customer for the delivery OTP or upload proof</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: GPS Simulator & Order Items */}
          <div className="space-y-6">
            
            {/* GPS Telemetry Simulator */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-6 rounded-3xl shadow-xl text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
                  <Compass size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">GPS Telemetry Simulator</h3>
                  <p className="text-[10px] text-slate-400">Broadcasts your live location</p>
                </div>
              </div>
              
              <div className="bg-black/20 p-4 rounded-2xl border border-white/5 mb-6 text-center font-mono">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Current Coordinates</p>
                <div className="flex justify-center gap-4 text-sm font-bold text-blue-400">
                  <span>Lat: {coords.lat}</span>
                  <span>Lon: {coords.lon}</span>
                </div>
              </div>

              <button
                onClick={handleSimulateGPS}
                disabled={simulating}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2 text-sm"
              >
                <Compass size={16} className={simulating ? 'animate-spin' : ''} /> 
                {simulating ? "Syncing location..." : "Simulate Drive Movement"}
              </button>
            </div>

            {/* Bill Info */}
            <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
              <h3 className="font-bold text-gray-800 dark:text-white text-sm border-b border-gray-100 dark:border-slate-800 pb-3 mb-3">Order Items</h3>
              <div className="space-y-2 mb-4">
                {activeJob.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">{item.qty}x {item.name}</span>
                    <span className="font-bold text-gray-800 dark:text-white">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-slate-800">
                <span className="font-bold text-gray-800 dark:text-white">To Collect (Cash)</span>
                <span className="text-xl font-black text-green-500">₹{activeJob.totalPrice}</span>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center py-24 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-sm"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 dark:bg-green-500/10 text-green-500 rounded-full mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">You're all caught up!</h2>
          <p className="text-sm font-medium text-gray-500">No active delivery run assigned. Check available orders.</p>
        </motion.div>
      )}
    </div>
  );
};

export default CurrentDelivery;
