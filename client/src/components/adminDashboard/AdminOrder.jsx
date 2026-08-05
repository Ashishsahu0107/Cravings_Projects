import React, { useEffect, useState } from "react";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { FaSearch, FaUserSlash, FaUserCheck, FaShoppingCart, FaUsers } from "react-icons/fa";

const AdminOrder = () => {
  // Users Moderator states
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState("");
  const [usersLoading, setUsersLoading] = useState(true);

  // Orders Log states
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await api.get(`/admin/users?search=${search}&userType=${userTypeFilter}`);
      if (res.data?.success) {
        setUsers(res.data.data || []);
      }
    } catch (e) {
      toast.error("Failed to load user accounts database.");
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const res = await api.get("/admin/orders");
      if (res.data?.success) {
        setOrders(res.data.data || []);
      }
    } catch (e) {
      toast.error("Failed to load global order logs.");
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, userTypeFilter]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleToggleBlock = async (userId, currentBlocked) => {
    try {
      const res = await api.patch(`/admin/users/${userId}/status`, { isBlocked: !currentBlocked });
      if (res.data?.success) {
        toast.success(res.data.message);
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, isBlocked: !currentBlocked } : u))
        );
      }
    } catch (error) {
      toast.error("Failed to modify block status.");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 p-6 space-y-10">
      
      {/* SECTION 1: Users Moderator Center */}
      <div className="card border border-base-200 bg-base-100 p-6 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-3">
          <div>
            <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
              <FaUsers className="text-primary" /> Moderator Center
            </h2>
            <p className="text-xs text-secondary mt-1">Manage user access permissions and apply soft blocks.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={userTypeFilter}
              onChange={(e) => setUserTypeFilter(e.target.value)}
              className="select select-bordered select-sm rounded-xl text-xs bg-base-100"
            >
              <option value="">All Roles</option>
              <option value="customer">Customers</option>
              <option value="restaurant">Managers</option>
              <option value="rider">Riders</option>
              <option value="admin">Administrators</option>
            </select>
            <div className="relative">
              <input
                type="text"
                placeholder="Search name / email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered input-sm rounded-xl pl-8 text-xs bg-base-100"
              />
              <FaSearch className="absolute left-3 top-2.5 text-secondary text-[10px]" />
            </div>
          </div>
        </div>

        {usersLoading ? (
          <div className="text-center text-xs text-secondary py-6">Querying user logs...</div>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-sm w-full text-xs text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">User details</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Phone</th>
                  <th className="py-2">Status</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b hover:bg-base-50/50">
                    <td className="py-3">
                      <div className="font-bold text-base-content">{u.fullName}</div>
                      <div className="text-[10px] text-secondary">{u.email}</div>
                    </td>
                    <td className="py-3 capitalize">{u.userType}</td>
                    <td className="py-3">{u.phone}</td>
                    <td className="py-3">
                      <span className={`badge text-[9px] font-bold ${u.isBlocked ? 'badge-error text-white' : 'badge-success text-white'}`}>
                        {u.isBlocked ? 'Suspended' : 'Active'}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleToggleBlock(u._id, u.isBlocked)}
                        className={`btn btn-xs rounded-lg ${u.isBlocked ? 'btn-success text-white' : 'btn-error text-white'}`}
                      >
                        {u.isBlocked ? <FaUserCheck /> : <FaUserSlash />}
                        {u.isBlocked ? 'Unsuspend' : 'Suspend'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-secondary py-6">No users found matching query filters.</p>
        )}
      </div>

      {/* SECTION 2: Global Orders Tracking */}
      <div className="card border border-base-200 bg-base-100 p-6 rounded-2xl shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-base-content border-b pb-3 flex items-center gap-2">
          <FaShoppingCart className="text-primary" /> Global Orders Log
        </h2>

        {ordersLoading ? (
          <div className="text-center text-xs text-secondary py-6">Querying global order runs...</div>
        ) : orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-sm w-full text-xs text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Order ID</th>
                  <th className="py-2">Outlet</th>
                  <th className="py-2">Customer details</th>
                  <th className="py-2">Bill total</th>
                  <th className="py-2">Run status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id} className="border-b hover:bg-base-50/50">
                    <td className="py-3 font-semibold text-secondary">{o._id}</td>
                    <td className="py-3 font-bold text-base-content">{o.restaurantName}</td>
                    <td className="py-3">
                      <div>{o.user?.fullName || "Guest"}</div>
                      <div className="text-[10px] text-secondary">{o.user?.email || "N/A"}</div>
                    </td>
                    <td className="py-3 font-bold text-primary">₹{o.totalPrice}</td>
                    <td className="py-3">
                      <span className={`badge text-[9px] font-bold ${
                        o.status === "Delivered" ? "badge-success text-white" :
                        o.status === "Cancelled" ? "badge-error text-white" :
                        o.status === "Pending" ? "badge-warning" : "badge-info text-white"
                      }`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-secondary py-6">No network orders placed yet.</p>
        )}
      </div>

    </div>
  );
};

export default AdminOrder;