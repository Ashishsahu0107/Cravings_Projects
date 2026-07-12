import { useEffect, useState } from "react";
import { Users, Store, ShoppingBag, IndianRupee, UserCog, UtensilsCrossed, Star, Ban } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../config/api.config";

const AdminOverview = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOverview = async () => {
    try {
      const res = await api.get("/dashboard/overview");
      setOverview(res.data.data);
    } catch (error) {
      toast.error("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg">
        Loading Dashboard...
      </div>
    );
  }

  const cards = [
    {
      title: "Total Users",
      value: overview.totalUsers,
      icon: Users,
    },
    {
      title: "Restaurants",
      value: overview.totalRestaurants,
      icon: Store,
    },
    {
      title: "Managers",
      value: overview.totalManagers,
      icon: UserCog,
    },
    {
      title: "Orders",
      value: overview.totalOrders,
      icon: ShoppingBag,
    },
    {
      title: "Revenue",
      value: `₹${overview.totalRevenue}`,
      icon: IndianRupee,
    },
    {
      title: "Menu Items",
      value: overview.totalMenuItems,
      icon: UtensilsCrossed,
    },
    {
      title: "Reviews",
      value: overview.totalReviews,
      icon: Star,
    },
    {
      title: "Blocked Restaurants",
      value: overview.blockedRestaurants,
      icon: Ban,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-8 text-3xl font-bold">
        Admin Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl bg-white p-6 shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">{card.title}</p>

                <h2 className="mt-2 text-3xl font-bold">
                  {card.value}
                </h2>
              </div>

              <card.icon
                size={38}
                className="text-orange-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;