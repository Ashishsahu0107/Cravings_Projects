import React, { useEffect, useState } from "react";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";

const RestaurantOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/restaurants/orders");
      if (res.data?.success) {
        setOrders(res.data.data || []);
      }
    } catch (error) {
      toast.error("Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAccept = async (orderId) => {
    try {
      const res = await api.patch(`/restaurants/orders/${orderId}/accept`);
      if (res.data?.success) {
        toast.success("Order accepted!");
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: "Confirmed" } : o))
        );
      }
    } catch (error) {
      toast.error("Failed to accept order.");
    }
  };

  const handleReject = async (orderId) => {
    const reason = prompt("Enter reason for rejecting this order:");
    if (reason === null) return; // cancel prompt
    try {
      const res = await api.patch(`/restaurants/orders/${orderId}/reject`, { reason });
      if (res.data?.success) {
        toast.success("Order rejected.");
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: "Cancelled" } : o))
        );
      }
    } catch (error) {
      toast.error("Failed to reject order.");
    }
  };

  const handleUpdateStatus = async (orderId, currentStatus) => {
    let nextStatus = "";
    if (currentStatus === "Confirmed") nextStatus = "Preparing";
    else if (currentStatus === "Preparing") nextStatus = "Out for Delivery"; // maps to ready

    try {
      const res = await api.patch(`/restaurants/orders/${orderId}/status`, { status: nextStatus });
      if (res.data?.success) {
        toast.success(`Order status updated to ${nextStatus}`);
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: nextStatus } : o))
        );
      }
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  if (loading) {
    return <div className="text-center text-secondary py-12">Loading orders pipeline...</div>;
  }

  if (!orders.length) {
    return (
      <div className="text-center py-12 rounded-2xl border border-dashed border-base-300 text-secondary">
        No orders received yet. Once customers place orders, they will show up here.
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-base-100 p-6 rounded-2xl">
      <h2 className="text-2xl font-bold text-base-content border-b pb-3">📦 Incoming Orders Pipeline</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="rounded-2xl border border-base-200 bg-base-50 p-6 shadow-xs flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-3">
              <div>
                <span className="text-xs text-secondary font-semibold">Order ID: {order._id}</span>
                <p className="text-xs text-secondary mt-1">Received on {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`badge ${
                  order.status === "Delivered" ? "badge-success text-white" :
                  order.status === "Cancelled" ? "badge-error text-white" :
                  order.status === "Pending" ? "badge-warning" : "badge-info text-white"
                } font-bold`}>
                  {order.status}
                </span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3 text-xs text-secondary">
              <div>
                <p className="font-bold text-base-content uppercase tracking-wider mb-1">Customer Address</p>
                <p>{order.deliveryAddress}</p>
              </div>
              <div>
                <p className="font-bold text-base-content uppercase tracking-wider mb-1">Total Bill</p>
                <p className="font-bold text-sm text-primary">₹{order.totalPrice}</p>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                {order.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleAccept(order._id)}
                      className="btn btn-success btn-xs text-white rounded-lg px-3"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(order._id)}
                      className="btn btn-error btn-xs text-white rounded-lg px-3"
                    >
                      Reject
                    </button>
                  </>
                )}
                {order.status === "Confirmed" && (
                  <button
                    onClick={() => handleUpdateStatus(order._id, order.status)}
                    className="btn btn-primary btn-xs text-white rounded-lg"
                  >
                    Start Preparing
                  </button>
                )}
                {order.status === "Preparing" && (
                  <button
                    onClick={() => handleUpdateStatus(order._id, order.status)}
                    className="btn btn-warning btn-xs text-white rounded-lg"
                  >
                    Mark Ready (Alert Rider)
                  </button>
                )}
              </div>
            </div>

            <div className="rounded-xl bg-base-100 border border-base-200 p-4">
              <h4 className="mb-2 text-xs font-bold text-base-content uppercase tracking-wider">Dishes ordered</h4>
              <div className="grid gap-1 text-xs">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-0.5">
                    <span className="text-secondary">{item.name} <span className="font-bold text-base-content">x {item.qty}</span></span>
                    <span className="font-bold text-base-content">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantOrder;