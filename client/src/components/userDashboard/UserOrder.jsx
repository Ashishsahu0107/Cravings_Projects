import React, { useEffect, useState } from "react";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { FaMapMarkerAlt, FaStar, FaTimes, FaMotorcycle, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Review Modal state
  const [reviewOrder, setReviewOrder] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Track Modal state
  const [trackOrder, setTrackOrder] = useState(null);
  const [trackData, setTrackData] = useState(null);
  const [trackLoading, setTrackLoading] = useState(false);
  const [telemetryTimer, setTelemetryTimer] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/customer/orders");
      setOrders(res.data.data || []);
    } catch (error) {
      toast.error("Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      const res = await api.patch(`/customer/orders/${orderId}/cancel`);
      if (res.data?.success) {
        toast.success("Order cancelled.");
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: "Cancelled" } : o))
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order.");
    }
  };

  const handleOpenReview = (order) => {
    setReviewOrder(order);
    setRating(5);
    setComment("");
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/customer/orders/${reviewOrder._id}/review`, { rating, comment });
      if (res.data?.success) {
        toast.success("Thank you for your feedback!");
        setOrders((prev) =>
          prev.map((o) => (o._id === reviewOrder._id ? { ...o, review: { rating, comment } } : o))
        );
        setReviewOrder(null);
      }
    } catch (error) {
      toast.error("Failed to submit review.");
    }
  };

  const startTracking = async (orderId) => {
    setTrackLoading(true);
    try {
      const res = await api.get(`/customer/orders/${orderId}/track`);
      if (res.data?.success) {
        setTrackData(res.data);
        setTrackOrder(orderId);
      }
    } catch (error) {
      toast.error("Failed to fetch tracking data.");
    } finally {
      setTrackLoading(false);
    }
  };

  // Poll for rider location updates when tracking is active
  useEffect(() => {
    if (!trackOrder) return;
    const interval = setInterval(async () => {
      try {
        const res = await api.get(`/customer/orders/${trackOrder}/track`);
        if (res.data?.success) {
          setTrackData(res.data);
        }
      } catch (error) {
        console.error("Tracking update error", error);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [trackOrder]);

  const closeTracking = () => {
    setTrackOrder(null);
    setTrackData(null);
  };

  if (loading) {
    return <div className="text-center text-lg text-secondary py-12">Loading your orders...</div>;
  }

  if (!orders.length) {
    return (
      <div className="text-center text-lg text-secondary py-12 border border-dashed rounded-2xl border-base-300">
        No orders found. Place a new order from the Order Now page.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-base-content border-b pb-3">My Orders</h2>
      
      <div className="grid gap-6">
        {orders.map((order) => (
          <div key={order._id} className="rounded-2xl border border-base-200 bg-base-100 p-6 shadow-xs hover:border-primary/50 transition">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-base-content">{order.restaurantName}</h3>
                <p className="text-xs text-secondary">Ordered on {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`badge ${
                  order.status === "Delivered" ? "badge-success text-white" :
                  order.status === "Cancelled" ? "badge-error text-white" :
                  order.status === "Pending" ? "badge-warning" : "badge-info text-white"
                } font-semibold`}>
                  {order.status}
                </span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 text-xs text-secondary mb-4">
              <div>
                <p className="font-bold text-base-content">Delivery Address</p>
                <p className="mt-1">{order.deliveryAddress}</p>
              </div>
              <div>
                <p className="font-bold text-base-content">Total Price</p>
                <p className="mt-1 font-bold text-primary text-sm">₹{order.totalPrice}</p>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                {order.status === "Pending" && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="btn btn-error btn-xs rounded-lg text-white"
                  >
                    Cancel Order
                  </button>
                )}
                {(order.status === "Preparing" || order.status === "Out for Delivery") && (
                  <button
                    onClick={() => startTracking(order._id)}
                    className="btn btn-primary btn-xs rounded-lg text-white"
                  >
                    Track Order
                  </button>
                )}
                {order.status === "Delivered" && !order.review && (
                  <button
                    onClick={() => handleOpenReview(order)}
                    className="btn btn-warning btn-xs rounded-lg text-white"
                  >
                    Review Order
                  </button>
                )}
                {order.review && (
                  <div className="text-amber-500 font-bold flex items-center gap-1">
                    <FaStar /> {order.review.rating}/5
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl bg-base-50 p-4">
              <h4 className="mb-2 text-xs font-bold text-base-content uppercase tracking-wider">Ordered Items</h4>
              <div className="grid gap-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1">
                    <span className="text-secondary">{item.name} <span className="font-bold text-base-content">x {item.qty}</span></span>
                    <span className="font-semibold text-base-content">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {reviewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-xl border border-base-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-base-content">Review {reviewOrder.restaurantName}</h3>
              <button onClick={() => setReviewOrder(null)} className="text-secondary hover:text-base-content"><FaTimes /></button>
            </div>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-secondary mb-2">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-2xl text-amber-500 focus:outline-none"
                    >
                      {star <= rating ? "★" : "☆"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="textarea textarea-bordered w-full rounded-xl bg-base-100 text-xs h-24"
                  placeholder="Share your experience (food quality, packaging, delivery)..."
                />
              </div>
              <button type="submit" className="w-full btn btn-primary rounded-xl text-xs font-bold text-white py-2">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Live Track Modal */}
      {trackOrder && trackData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-base-100 p-6 shadow-xl border border-base-200">
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <div>
                <h3 className="text-lg font-bold text-base-content">Live Delivery Tracker</h3>
                <p className="text-xs text-secondary">Order ID: {trackOrder}</p>
              </div>
              <button onClick={closeTracking} className="text-secondary hover:text-base-content"><FaTimes /></button>
            </div>

            {/* Tracking Status indicator */}
            <div className="mb-6 grid grid-cols-3 gap-2 text-center text-[10px] uppercase font-bold tracking-wider text-secondary">
              <div className={`p-2 rounded-lg ${trackData.status === "Preparing" || trackData.status === "Confirmed" ? "bg-primary/10 text-primary" : ""}`}>
                Preparing Food
              </div>
              <div className={`p-2 rounded-lg ${trackData.status === "Out for Delivery" ? "bg-primary/10 text-primary" : ""}`}>
                Out for Delivery
              </div>
              <div className={`p-2 rounded-lg ${trackData.status === "Delivered" ? "bg-primary/10 text-primary" : ""}`}>
                Arrived / Delivered
              </div>
            </div>

            {/* Live GPS Telemetry Simulator Map */}
            <div className="relative h-48 bg-base-200 border rounded-2xl overflow-hidden flex flex-col justify-center items-center p-4">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>
              
              {/* Restaurant Dot */}
              <div className="absolute left-10 top-24 text-center">
                <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center mx-auto ring-4 ring-primary/20"></div>
                <p className="text-[10px] font-bold text-base-content mt-1">Restaurant</p>
              </div>

              {/* Customer Dot */}
              <div className="absolute right-10 top-24 text-center">
                <div className="w-4 h-4 rounded-full bg-success flex items-center justify-center mx-auto ring-4 ring-success/20"></div>
                <p className="text-[10px] font-bold text-base-content mt-1">Home</p>
              </div>

              {/* Simulated Rider */}
              {trackData.rider ? (
                <div className="absolute top-16 text-center transition-all duration-1000" style={{
                  left: trackData.status === "Preparing" ? "90px" :
                        trackData.status === "Out for Delivery" ? "240px" : "480px"
                }}>
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center mx-auto shadow-md text-white">
                    <FaMotorcycle size={14} className="animate-bounce" />
                  </div>
                  <p className="text-[10px] font-bold text-amber-600 mt-1">{trackData.rider.name}</p>
                </div>
              ) : (
                <p className="text-xs text-secondary z-10 bg-base-100 px-4 py-2 rounded-full border shadow-sm">
                  Waiting for delivery partner assignment...
                </p>
              )}
            </div>

            {/* Rider profile if assigned */}
            {trackData.rider && (
              <div className="mt-4 p-4 bg-base-50 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={trackData.rider.photo || "https://placehold.co/100x100?text=Rider"}
                    alt={trackData.rider.name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-base-content">{trackData.rider.name}</h4>
                    <p className="text-xs text-secondary">{trackData.rider.vehicleDetails.vehicleModel} ({trackData.rider.vehicleDetails.vehicleNumber})</p>
                    <p className="text-xs text-primary font-bold mt-0.5">📞 {trackData.rider.phone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="badge badge-warning text-xs font-bold text-white">GPS Simulator Active</span>
                  <p className="text-[10px] text-secondary mt-1">Rider location synced in real time</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrder;