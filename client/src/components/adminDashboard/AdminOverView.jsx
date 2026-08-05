import { useEffect, useState } from "react";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { FaUsers, FaStore, FaMotorcycle, FaRupeeSign, FaShoppingCart, FaUtensils } from "react-icons/fa";

const AdminOverView = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/overview");
      if (res.data?.success) {
        setStats(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load admin overview statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-base-content tracking-tight">System Overview</h1>
        <p className="text-sm text-secondary">Real-time network operational metrics and performance audit logs.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Cumulative Revenue */}
        <div className="card border border-base-200 bg-base-100 p-5 rounded-2xl flex flex-row items-center justify-between shadow-xs hover-lift">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Network Revenue Audits</span>
            <h2 className="text-2xl font-bold text-base-content mt-1 flex items-center">
              <FaRupeeSign size={18} /> {stats?.totalRevenue || 0}
            </h2>
          </div>
          <div className="p-3 rounded-xl bg-success/15 text-success">
            <FaRupeeSign size={20} />
          </div>
        </div>

        {/* Total Users */}
        <div className="card border border-base-200 bg-base-100 p-5 rounded-2xl flex flex-row items-center justify-between shadow-xs hover-lift">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Registered Accounts</span>
            <h2 className="text-2xl font-bold text-base-content mt-1">{stats?.totalUsers || 0}</h2>
          </div>
          <div className="p-3 rounded-xl bg-primary/15 text-primary">
            <FaUsers size={20} />
          </div>
        </div>

        {/* Total Orders */}
        <div className="card border border-base-200 bg-base-100 p-5 rounded-2xl flex flex-row items-center justify-between shadow-xs hover-lift">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Network Orders</span>
            <h2 className="text-2xl font-bold text-base-content mt-1">{stats?.totalOrders || 0}</h2>
          </div>
          <div className="p-3 rounded-xl bg-info/15 text-info">
            <FaShoppingCart size={20} />
          </div>
        </div>

        {/* Restaurants Count */}
        <div className="card border border-base-200 bg-base-100 p-5 rounded-2xl flex flex-row items-center justify-between shadow-xs hover-lift">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Partner Outlets</span>
            <h2 className="text-2xl font-bold text-base-content mt-1">
              {stats?.totalRestaurants || 0} <span className="text-xs text-success font-medium">({stats?.activeRestaurants || 0} Active)</span>
            </h2>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/15 text-amber-500">
            <FaStore size={20} />
          </div>
        </div>

        {/* Riders Count */}
        <div className="card border border-base-200 bg-base-100 p-5 rounded-2xl flex flex-row items-center justify-between shadow-xs hover-lift">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Delivery Fleet</span>
            <h2 className="text-2xl font-bold text-base-content mt-1">{stats?.totalRiders || 0}</h2>
          </div>
          <div className="p-3 rounded-xl bg-success/15 text-success">
            <FaMotorcycle size={20} />
          </div>
        </div>

        {/* Menu Items Count */}
        <div className="card border border-base-200 bg-base-100 p-5 rounded-2xl flex flex-row items-center justify-between shadow-xs hover-lift">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Global Dishes Listings</span>
            <h2 className="text-2xl font-bold text-base-content mt-1">{stats?.totalMenuItems || 0}</h2>
          </div>
          <div className="p-3 rounded-xl bg-secondary/15 text-secondary">
            <FaUtensils size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverView;