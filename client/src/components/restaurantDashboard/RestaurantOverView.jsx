import { useEffect, useState } from "react";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";

const RestaurantOverView = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const getDashboard = async () => {
    try {
      const res = await api.get("/dashboard/overview");
      setDashboard(res.data?.data || null);
      setMessage(res.data?.message || "");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Unable to load dashboard.";
      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-100 p-8">
        <div className="rounded-xl bg-primary-content p-8 text-center shadow">
          <h2 className="text-2xl font-semibold text-base-content">No restaurant dashboard found</h2>
          <p className="mt-2 text-gray-600">{message || "Please complete your restaurant profile to view the overview."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-8">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl text-primary font-bold">{dashboard.restaurantName}</h1>

        <p className="text-content">Restaurant Dashboard</p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card title="Restaurant Status" value={dashboard.status || "Inactive"} />

        <Card
          title="Open Status"
          value={dashboard.isOpen ? "Open" : "Closed"}
        />

        <Card title="Average Rating" value={dashboard.averageRating ?? 0} />

        <Card title="Restaurant Type" value={dashboard.restaurantType || "Not set"} />

        <Card title="Total Cuisines" value={dashboard.totalCuisines ?? 0} />

        <Card title="City" value={dashboard.location?.city || "Not set"} />

        <Card title="Country" value={dashboard.location?.country || "Not set"} />

        <Card
          title="Created"
          value={dashboard.createdAt ? new Date(dashboard.createdAt).toLocaleDateString() : "Not available"}
        />
      </div>

      {/* Restaurant Details */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Contact Details</h2>

          <p>Email : {dashboard.contact?.email || "Not available"}</p>

          <p>Phone : {dashboard.contact?.phone || "Not available"}</p>

          <p>Address : {dashboard.location?.address || "Not available"}</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Serving Hours</h2>

          <p>Opening : {dashboard.servingHours?.openingTime || "Not available"}</p>

          <p>Closing : {dashboard.servingHours?.closingTime || "Not available"}</p>
        </div>
      </div>

      {/* Cuisine */}

      <div className="mt-10 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">Cuisine Types</h2>

        <div className="flex flex-wrap gap-3">
          {(dashboard.cuisines || []).length > 0 ? (
            dashboard.cuisines.map((item, index) => (
              <span
                key={index}
                className="rounded-full bg-orange-100 px-4 py-2 text-orange-700"
              >
                {item}
              </span>
            ))
          ) : (
            <p className="text-gray-500">No cuisines added yet.</p>
          )}
        </div>
      </div>

      {/* Images */}

      <div className="mt-10">
        <h2 className="mb-4 text-xl font-semibold">Restaurant Images</h2>

        <div className="grid gap-5 md:grid-cols-3">
          {(dashboard.images?.restaurantImages || []).length > 0 ? (
            dashboard.images.restaurantImages.map((image) => (
              <img
                key={image.publicId}
                src={image.url}
                alt=""
                className="h-60 w-full rounded-xl object-cover"
              />
            ))
          ) : (
            <p className="text-gray-500">No restaurant images uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value }) => {
  return (
    <div className="rounded-xl bg-primary/10 p-6 hover:-translate-y-1  hover:scale-102 shadow hover:shadow-lg duration-300 transition">
      <h3 className="text-gray-500">{title}</h3>

      <h1 className="mt-2 text-2xl font-bold">{value}</h1>
    </div>
  );
};

export default RestaurantOverView;
