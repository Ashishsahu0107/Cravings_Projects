import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { AlertCircle, Clock, Zap, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock icons
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

export const LiveOperationsTab = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)] min-h-[600px]">
      
      {/* Alert Center Panel (Left) */}
      <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm overflow-y-auto custom-scrollbar flex flex-col gap-4">
        <div>
          <h3 className="font-bold text-gray-800 dark:text-white text-lg">Alert Center</h3>
          <p className="text-xs text-gray-500 font-medium mb-4">Real-time system alerts</p>
        </div>

        <div className="space-y-3">
          {[
            { type: 'delay', title: 'Late Delivery', msg: 'Order #ORD-9821 is delayed by 15 mins. Rider stuck in traffic.', time: 'Just now', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
            { type: 'emergency', title: 'Payment Failed', msg: 'Bulk settlement failed for 12 restaurants.', time: '5m ago', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
            { type: 'system', title: 'Surge Pricing Active', msg: 'Surge multiplier 1.5x active in Downtown.', time: '12m ago', icon: Zap, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
          ].map((alert, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-2xl border ${alert.bg} ${alert.border}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <alert.icon size={16} className={alert.color} />
                <h4 className={`text-sm font-bold ${alert.color}`}>{alert.title}</h4>
                <span className="text-[10px] font-bold text-gray-400 ml-auto">{alert.time}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-relaxed">{alert.msg}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Map Dashboard (Right) */}
      <div className="lg:col-span-3 bg-slate-100 dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden relative shadow-sm">
        
        {/* KPI Overlay */}
        <div className="absolute top-4 left-4 z-[400] flex gap-3">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 shadow-lg flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Active Orders</p>
              <p className="text-lg font-black text-gray-800 dark:text-white leading-none mt-0.5">1,245</p>
            </div>
          </div>
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 shadow-lg flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Active Riders</p>
              <p className="text-lg font-black text-gray-800 dark:text-white leading-none mt-0.5">842</p>
            </div>
          </div>
        </div>

        <MapContainer 
          center={[12.9716, 77.5946]} 
          zoom={12} 
          style={{ height: '100%', width: '100%', zIndex: 10 }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">Carto</a>'
          />
          <Marker position={[12.9716, 77.5946]}>
            <Popup>
              <div className="text-center font-bold">Central Hub</div>
            </Popup>
          </Marker>
          <Polyline 
            positions={[[12.9716, 77.5946], [12.9352, 77.6245]]} 
            color="#f97316" 
            weight={4} 
            dashArray="10, 10" 
          />
        </MapContainer>
      </div>

    </div>
  );
};
