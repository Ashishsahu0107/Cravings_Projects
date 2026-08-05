import { useEffect, useState } from "react";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { FaStore, FaStoreSlash, FaRupeeSign, FaStar, FaUtensils, FaClock } from "react-icons/fa";

const RestaurantOverView = () => {
  const [profile, setProfile] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const profileRes = await api.get("/dashboard/overview");
      setProfile(profileRes.data?.data || null);

      const analyticsRes = await api.get("/restaurant/dashboard");
      setAnalytics(analyticsRes.data?.data || null);
    } catch (error) {
      toast.error("Failed to load dashboard data. Please complete restaurant setup in Settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleToggleStatus = async () => {
    setToggling(true);
    try {
      const res = await api.patch("/restaurant/toggle-status");
      if (res.data?.success) {
        toast.success(res.data.message);
        setAnalytics(prev => ({ ...prev, isOpen: res.data.isOpen }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to toggle status.");
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

  if (!profile || profile.status === "inactive" && !profile.createdAt) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-8 bg-base-100">
        <div className="card max-w-md bg-base-100 border border-base-200 p-8 text-center shadow-lg rounded-2xl">
          <h2 className="text-2xl font-bold text-base-content mb-2">Setup Your Restaurant Profile</h2>
          <p className="text-sm text-secondary mb-6">
            Please fill in your restaurant address, FSSAI/GST certificates, and banking details in the Settings tab to start selling.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 p-6 space-y-6">
      
      {/* Top Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-base-content tracking-tight">{profile.restaurantName}</h1>
          <p className="text-sm text-secondary">Manage your food outlet dashboard, menu, and live order pipeline.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleStatus}
            disabled={toggling || analytics?.status !== "active"}
            className={`btn btn-sm text-xs font-bold rounded-xl text-white ${
              analytics?.isOpen ? "btn-success" : "btn-error"
            }`}
          >
            {toggling ? "Saving..." : analytics?.isOpen ? "Store: OPEN" : "Store: CLOSED"}
          </button>
          {analytics?.status !== "active" && (
            <span className="badge badge-warning text-[10px] uppercase font-bold py-2">Pending Vetting Approval</span>
          )}
        </div>
      </div>

      {/* Analytics Card Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Total Revenue */}
        <div className="card border border-base-200 bg-base-100 p-5 rounded-2xl flex flex-row items-center justify-between shadow-xs hover-lift">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Total Revenue</span>
            <h2 className="text-2xl font-bold text-base-content mt-1 flex items-center">
              <FaRupeeSign size={18} /> {analytics?.revenue || 0}
            </h2>
          </div>
          <div className="p-3 rounded-xl bg-success/15 text-success">
            <FaRupeeSign size={20} />
          </div>
        </div>

        {/* Total Orders */}
        <div className="card border border-base-200 bg-base-100 p-5 rounded-2xl flex flex-row items-center justify-between shadow-xs hover-lift">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Total Orders</span>
            <h2 className="text-2xl font-bold text-base-content mt-1">{analytics?.totalOrders || 0}</h2>
          </div>
          <div className="p-3 rounded-xl bg-primary/15 text-primary">
            <FaUtensils size={20} />
          </div>
        </div>

        {/* Rating */}
        <div className="card border border-base-200 bg-base-100 p-5 rounded-2xl flex flex-row items-center justify-between shadow-xs hover-lift">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Average Rating</span>
            <h2 className="text-2xl font-bold text-base-content mt-1 flex items-center gap-1">
              <FaStar size={18} className="text-amber-500" /> {analytics?.averageRating || "N/A"}
            </h2>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/15 text-amber-500">
            <FaStar size={20} />
          </div>
        </div>

        {/* Operating status */}
        <div className="card border border-base-200 bg-base-100 p-5 rounded-2xl flex flex-row items-center justify-between shadow-xs hover-lift">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Store Status</span>
            <h2 className="text-xl font-bold text-base-content mt-1 uppercase flex items-center gap-1">
              {analytics?.isOpen ? "Active Online" : "Offline"}
            </h2>
          </div>
          <div className={`p-3 rounded-xl ${analytics?.isOpen ? 'bg-success/15 text-success' : 'bg-error/15 text-error'}`}>
            {analytics?.isOpen ? <FaStore size={20} /> : <FaStoreSlash size={20} />}
          </div>
        </div>

      </div>

      {/* Operational details & cuisines */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card border border-base-200 bg-base-100 p-6 rounded-2xl shadow-xs">
          <h3 className="text-lg font-bold text-base-content border-b pb-2 mb-4 flex items-center gap-2">
            <FaClock className="text-primary" /> Serving Information
          </h3>
          <div className="space-y-3 text-xs text-secondary">
            <p><span className="font-bold text-base-content">Hours:</span> {profile.servingHours?.openingTime || "N/A"} to {profile.servingHours?.closingTime || "N/A"}</p>
            <p><span className="font-bold text-base-content">Cuisine Types:</span></p>
            <div className="flex flex-wrap gap-2 pt-1">
              {(profile.cuisines || []).map((c, i) => (
                <span key={i} className="badge badge-primary">{c}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="card border border-base-200 bg-base-100 p-6 rounded-2xl shadow-xs">
          <h3 className="text-lg font-bold text-base-content border-b pb-2 mb-4 flex items-center gap-2">
            <FaStore className="text-primary" /> Outlet Information
          </h3>
          <div className="space-y-3 text-xs text-secondary">
            <p><span className="font-bold text-base-content">Address:</span> {profile.location?.address || "N/A"}, {profile.location?.city || "N/A"}</p>
            <p><span className="font-bold text-base-content">Pin Code:</span> {profile.location?.pinCode || "N/A"}</p>
            <p><span className="font-bold text-base-content">Registration Status:</span> <span className="capitalize badge badge-neutral text-[10px] font-bold">{profile.status}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantOverView;
