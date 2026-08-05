import React, { useEffect, useState } from "react";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { FaHeart, FaStar, FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserWishlist = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const res = await api.get("/customer/favorites");
      if (res.data?.success) {
        setFavorites(res.data.favorites || []);
      }
    } catch (error) {
      toast.error("Failed to load favorite restaurants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const removeFav = async (id, name) => {
    try {
      const res = await api.delete(`/customer/favorites/${id}`);
      if (res.data?.success) {
        setFavorites((prev) => prev.filter((item) => item._id !== id));
        toast.success(`Removed ${name} from favorites.`);
      }
    } catch (error) {
      toast.error("Failed to remove from favorites.");
    }
  };

  if (loading) {
    return <div className="text-center text-secondary py-12">Loading your favorites...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-3">
        <h2 className="text-2xl font-bold text-base-content flex items-center gap-2">
          <FaHeart className="text-rose-500 animate-pulse" /> Favorite Restaurants
        </h2>
        <span className="badge badge-primary">{favorites.length} saved</span>
      </div>

      {favorites.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((r) => (
            <div key={r._id} className="card bg-base-100 border border-base-200 shadow-xs hover-lift overflow-hidden rounded-2xl flex flex-col justify-between">
              <div>
                <img
                  src={r.restaurantImage?.[0]?.url || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"}
                  alt={r.restaurantName}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-base-content text-lg truncate">{r.restaurantName}</h3>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-full">
                      <FaStar /> {r.averageRating || "4.5"}
                    </div>
                  </div>
                  <p className="text-xs text-secondary line-clamp-2 mb-3">{r.description}</p>
                  <div className="flex items-center gap-1 text-secondary text-xs">
                    <FaMapMarkerAlt /> {r.city}, {r.state}
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-base-100 flex gap-2">
                <Link
                  to="/order-now"
                  state={{ restaurant: r }}
                  className="btn btn-primary btn-sm flex-1 text-xs text-white rounded-lg"
                >
                  Order Menu
                </Link>
                <button
                  onClick={() => removeFav(r._id, r.restaurantName)}
                  className="btn btn-error btn-outline btn-sm px-3 rounded-lg hover:text-white"
                  title="Remove from favorites"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 rounded-2xl border border-dashed border-base-300">
          <FaHeart className="mx-auto text-4xl text-base-300 mb-3" />
          <p className="text-sm font-semibold text-secondary">No favorites saved yet.</p>
          <p className="text-xs text-secondary mt-1">Browse restaurants and tap the favorite icon to view them here.</p>
        </div>
      )}
    </div>
  );
};

export default UserWishlist;