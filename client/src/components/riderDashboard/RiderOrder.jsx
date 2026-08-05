import React, { useEffect, useState } from "react";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { FaMapMarkerAlt, FaUtensils, FaMotorcycle, FaCheckCircle, FaCompass } from "react-icons/fa";

const RiderOrder = () => {
  const [activeJob, setActiveJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState({ lat: 23.2599, lon: 77.4126 }); // starting coords Bhopal
  const [simulating, setSimulating] = useState(false);

  const fetchActiveJob = async () => {
    try {
      const res = await api.get("/rider/orders/active");
      if (res.data?.success) {
        setActiveJob(res.data.data || null);
      }
    } catch (error) {
      toast.error("Failed to load active delivery run.");
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
      nextStatus = "pickedUp";
    } else if (currentStatus === "Out for Delivery") {
      nextStatus = "delivered";
    }

    try {
      const res = await api.patch(`/rider/orders/${orderId}/status`, { status: nextStatus });
      if (res.data?.success) {
        toast.success(`Order status updated: ${res.data.data.status}`);
        if (nextStatus === "delivered") {
          setActiveJob(null);
        } else {
          setActiveJob(res.data.data);
        }
      }
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const handleSimulateGPS = async () => {
    setSimulating(true);
    // Simulate incremental location changes heading closer to standard customer location
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
      toast.error("Failed to sync GPS telemetry.");
    } finally {
      setSimulating(false);
    }
  };

  if (loading) {
    return <div className="text-center text-secondary py-12">Loading active delivery run...</div>;
  }

  return (
    <div className="space-y-6 bg-base-100 p-6 rounded-2xl">
      <h2 className="text-2xl font-bold text-base-content border-b pb-3 flex items-center gap-2">
        🏍️ Active Delivery Run
      </h2>

      {activeJob ? (
        <div className="grid gap-6 md:grid-cols-[1.3fr_0.7fr]">
          {/* Active Job Details */}
          <div className="card bg-base-50 border border-base-200 p-6 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3 mb-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-secondary">Active Order ID: {activeJob._id}</span>
                  <h3 className="font-extrabold text-base-content text-lg mt-1 flex items-center gap-1.5">
                    <FaUtensils className="text-primary" /> {activeJob.restaurantName}
                  </h3>
                </div>
                <span className="badge badge-info text-white font-bold">{activeJob.status}</span>
              </div>

              <div className="text-xs text-secondary space-y-2">
                <p className="flex items-start gap-1"><FaMapMarkerAlt className="mt-0.5 text-primary" /> <strong>Deliver to:</strong> {activeJob.deliveryAddress}</p>
                <p><strong>Customer Bill:</strong> ₹{activeJob.totalPrice}</p>
              </div>

              <div className="rounded-xl bg-base-100 border border-base-200 p-4">
                <h4 className="mb-2 text-xs font-bold text-base-content uppercase tracking-wider">Dishes List</h4>
                <div className="grid gap-1 text-xs">
                  {activeJob.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-0.5">
                      <span>{item.name} <span className="font-bold text-base-content">x {item.qty}</span></span>
                      <span className="font-bold">₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t mt-6 flex gap-2">
              {(activeJob.status === "Preparing" || activeJob.status === "Confirmed") && (
                <button
                  onClick={() => handleUpdateStatus(activeJob._id, activeJob.status)}
                  className="btn btn-primary btn-sm text-xs text-white rounded-lg flex-1"
                >
                  Confirm Pickup (Out for Delivery)
                </button>
              )}
              {activeJob.status === "Out for Delivery" && (
                <button
                  onClick={() => handleUpdateStatus(activeJob._id, activeJob.status)}
                  className="btn btn-success btn-sm text-xs text-white rounded-lg flex-1"
                >
                  Mark Delivered (Complete Job)
                </button>
              )}
            </div>
          </div>

          {/* GPS Telemetry Simulator Card */}
          <div className="card bg-base-50 border border-base-200 p-6 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-bold text-base-content text-sm border-b pb-2 flex items-center gap-1.5">
                <FaCompass className="text-primary" /> GPS Telemetry Simulator
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                Clicking the sync button increments coordinates to simulate driving telemetry. Customers will track this movement on their tracking map.
              </p>
              <div className="rounded-xl bg-base-100 p-4 text-center border">
                <p className="text-[10px] text-secondary uppercase font-bold tracking-wider">Telemetry Coords</p>
                <h4 className="text-sm font-extrabold text-base-content mt-1">Lat: {coords.lat}</h4>
                <h4 className="text-sm font-extrabold text-base-content">Lon: {coords.lon}</h4>
              </div>
            </div>

            <button
              onClick={handleSimulateGPS}
              disabled={simulating}
              className="btn btn-warning btn-sm text-xs text-white rounded-lg w-full mt-6 flex items-center justify-center gap-1"
            >
              <FaCompass /> {simulating ? "Syncing..." : "Simulate Drive Movement"}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-2xl border-base-300">
          <FaCheckCircle className="mx-auto text-4xl text-success mb-3 animate-bounce" />
          <p className="text-sm font-semibold text-secondary">You are all caught up!</p>
          <p className="text-xs text-secondary mt-1">No active delivery runs assigned. Check the "Available Jobs" tab to accept a delivery job.</p>
        </div>
      )}
    </div>
  );
};

export default RiderOrder;