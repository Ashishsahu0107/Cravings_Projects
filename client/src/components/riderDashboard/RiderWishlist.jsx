import React, { useEffect, useState } from "react";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { FaMotorcycle, FaMapMarkerAlt, FaUtensils } from "react-icons/fa";

const RiderWishlist = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAvailableJobs = async () => {
    try {
      const res = await api.get("/rider/orders/available");
      if (res.data?.success) {
        setJobs(res.data.data || []);
      }
    } catch (error) {
      toast.error("Failed to load available delivery runs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableJobs();
  }, []);

  const handleAcceptJob = async (orderId) => {
    try {
      const res = await api.patch(`/rider/orders/${orderId}/accept`);
      if (res.data?.success) {
        toast.success("Delivery run assigned successfully!");
        setJobs((prev) => prev.filter((j) => j._id !== orderId));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to accept job.");
    }
  };

  if (loading) {
    return <div className="text-center text-secondary py-12">Checking available runs...</div>;
  }

  return (
    <div className="space-y-6 bg-base-100 p-6 rounded-2xl">
      <div className="flex items-center justify-between border-b pb-3">
        <div>
          <h2 className="text-2xl font-bold text-base-content flex items-center gap-2">
            🚴 Available Delivery Jobs
          </h2>
          <p className="text-xs text-secondary mt-1">Accept open restaurant ready-to-ship orders in your locality.</p>
        </div>
        <span className="badge badge-primary">{jobs.length} runs ready</span>
      </div>

      {jobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {jobs.map((job) => (
            <div key={job._id} className="card bg-base-100 border border-base-200 p-5 rounded-2xl flex flex-col justify-between shadow-xs hover-lift">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b pb-2 mb-2">
                  <span className="text-[10px] uppercase font-bold text-primary flex items-center gap-1">
                    <FaUtensils /> {job.restaurantName}
                  </span>
                  <span className="text-[10px] text-secondary font-bold">₹{job.totalPrice} bill</span>
                </div>
                <div className="text-xs text-secondary space-y-1">
                  <p className="flex items-start gap-1"><FaMapMarkerAlt className="mt-0.5" /> <strong>Destination:</strong> {job.deliveryAddress}</p>
                  <p><strong>Order Items:</strong> {job.items.map(i => `${i.name} x${i.qty}`).join(", ")}</p>
                </div>
              </div>
              <button
                onClick={() => handleAcceptJob(job._id)}
                className="btn btn-primary btn-sm text-xs text-white rounded-lg w-full mt-4 flex items-center justify-center gap-2"
              >
                <FaMotorcycle /> Accept Delivery Run (Earn ₹40)
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-2xl border-base-300">
          <FaMotorcycle className="mx-auto text-4xl text-base-300 mb-3" />
          <p className="text-sm font-semibold text-secondary">No delivery jobs available right now.</p>
          <p className="text-xs text-secondary mt-1">Make sure you are "ONLINE" and that restaurant managers have marked prepared orders as Ready.</p>
        </div>
      )}
    </div>
  );
};

export default RiderWishlist;