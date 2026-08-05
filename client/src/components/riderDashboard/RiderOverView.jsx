import { useEffect, useState } from "react";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { FaMotorcycle, FaRupeeSign, FaStar, FaToggleOn, FaToggleOff } from "react-icons/fa";

const RiderOverView = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  const fetchRiderData = async () => {
    try {
      const res = await api.get("/rider/dashboard");
      if (res.data?.success) {
        setDashboard(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load rider dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiderData();
  }, []);

  const handleToggleOnline = async () => {
    setToggling(true);
    try {
      const res = await api.patch("/rider/toggle-availability");
      if (res.data?.success) {
        toast.success(res.data.message);
        setDashboard((prev) => ({ ...prev, isAvailable: res.data.isAvailable }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change status.");
    } finally {
      setToggling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 p-6 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-base-content tracking-tight">Rider Dashboard</h1>
          <p className="text-sm text-secondary">Monitor your earnings, ratings, and toggle shift status.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleOnline}
            disabled={toggling || dashboard?.status !== "active"}
            className={`btn btn-sm text-xs font-bold rounded-xl text-white flex items-center gap-2 ${
              dashboard?.isAvailable ? "btn-success" : "btn-error"
            }`}
          >
            {dashboard?.isAvailable ? <FaToggleOn size={16} /> : <FaToggleOff size={16} />}
            {toggling ? "Saving..." : dashboard?.isAvailable ? "Duty: ONLINE" : "Duty: OFFLINE"}
          </button>
          {dashboard?.status !== "active" && (
            <span className="badge badge-warning text-[10px] uppercase font-bold py-2">Verification Pending</span>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        
        {/* Earnings */}
        <div className="card border border-base-200 bg-base-100 p-5 rounded-2xl flex flex-row items-center justify-between shadow-xs hover-lift">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Total Earnings</span>
            <h2 className="text-2xl font-bold text-base-content mt-1 flex items-center">
              <FaRupeeSign size={18} /> {dashboard?.earnings || 0}
            </h2>
          </div>
          <div className="p-3 rounded-xl bg-success/15 text-success">
            <FaRupeeSign size={20} />
          </div>
        </div>

        {/* Deliveries Count */}
        <div className="card border border-base-200 bg-base-100 p-5 rounded-2xl flex flex-row items-center justify-between shadow-xs hover-lift">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Completed Deliveries</span>
            <h2 className="text-2xl font-bold text-base-content mt-1">{dashboard?.jobCounts || 0}</h2>
          </div>
          <div className="p-3 rounded-xl bg-primary/15 text-primary">
            <FaMotorcycle size={20} />
          </div>
        </div>

        {/* Rating */}
        <div className="card border border-base-200 bg-base-100 p-5 rounded-2xl flex flex-row items-center justify-between shadow-xs hover-lift">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Average Rating</span>
            <h2 className="text-2xl font-bold text-base-content mt-1 flex items-center gap-1">
              <FaStar size={18} className="text-amber-500" /> {dashboard?.rating || "5.0"}
            </h2>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/15 text-amber-500">
            <FaStar size={20} />
          </div>
        </div>

      </div>

      <div className="rounded-2xl border bg-base-50 p-6 max-w-xl text-xs text-secondary space-y-2">
        <h3 className="font-bold text-base-content text-sm mb-2">Delivery Shift Info</h3>
        <p>• Make sure to turn on your <strong className="text-success">Duty switch</strong> to accept ready orders from the "Available Jobs" list.</p>
        <p>• Earn ₹40 for every successfully completed job run.</p>
        <p>• You can inspect your active job, update delivery status, and simulate GPS telemetry movements in the "Active Job" tab.</p>
      </div>

    </div>
  );
};

export default RiderOverView;