import React, { useEffect, useState } from "react";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { FaMapMarkerAlt, FaPlus, FaTrash, FaCheckCircle, FaHome, FaBriefcase, FaCompass } from "react-icons/fa";

const UserAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "India",
    type: "home",
    isDefault: false,
  });

  const fetchAddresses = async () => {
    try {
      const res = await api.get("/customer/addresses");
      if (res.data?.success) {
        setAddresses(res.data.addressBook || []);
      }
    } catch (error) {
      toast.error("Failed to load address book.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/customer/address", formData);
      if (res.data?.success) {
        setAddresses(res.data.addressBook);
        toast.success("Address added successfully!");
        setShowAddForm(false);
        setFormData({
          name: "",
          address: "",
          city: "",
          state: "",
          pinCode: "",
          country: "India",
          type: "home",
          isDefault: false,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add address.");
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      const res = await api.patch(`/customer/address/${addressId}/default`);
      if (res.data?.success) {
        setAddresses(res.data.addressBook);
        toast.success("Default address updated.");
      }
    } catch (error) {
      toast.error("Failed to update default address.");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const res = await api.delete(`/customer/address/${addressId}`);
      if (res.data?.success) {
        setAddresses(res.data.addressBook);
        toast.success("Address deleted.");
      }
    } catch (error) {
      toast.error("Failed to delete address.");
    }
  };

  const getAddressIcon = (type) => {
    if (type === "home") return <FaHome className="text-primary" />;
    if (type === "work") return <FaBriefcase className="text-warning" />;
    return <FaCompass className="text-secondary" />;
  };

  if (loading) {
    return <div className="text-center text-secondary py-12">Loading address book...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-3">
        <h2 className="text-2xl font-bold text-base-content flex items-center gap-2">
          <FaMapMarkerAlt className="text-primary" /> Address Book
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-primary btn-sm flex items-center gap-2 text-xs text-white rounded-lg"
        >
          <FaPlus /> {showAddForm ? "Cancel" : "Add Address"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddAddress} className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-xs max-w-xl space-y-4">
          <h3 className="font-bold text-lg text-base-content">Add New Delivery Location</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-secondary mb-1">Receiver Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                placeholder="e.g. John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-secondary mb-1">Address Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="select select-bordered select-sm w-full rounded-lg bg-base-100 text-xs"
              >
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-secondary mb-1">Street Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
              placeholder="e.g. 123 Street Name"
              required
            />
          </div>
          <div className="grid gap-3 grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-secondary mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-secondary mb-1">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-secondary mb-1">Pin Code</label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
                className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isDefault"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleInputChange}
              className="checkbox checkbox-primary"
            />
            <label htmlFor="isDefault" className="text-xs text-secondary font-semibold cursor-pointer">
              Set as default shipping address
            </label>
          </div>
          <button type="submit" className="btn btn-primary btn-sm text-xs text-white rounded-lg px-6">
            Save Address
          </button>
        </form>
      )}

      {addresses.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {addresses.map((a) => (
            <div key={a._id} className="card bg-base-100 border border-base-200 p-5 rounded-2xl flex flex-col justify-between shadow-xs hover-lift">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="p-3 bg-base-100 border border-base-200 rounded-xl flex items-center justify-center h-10 w-10">
                    {getAddressIcon(a.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base-content flex items-center gap-2 text-sm uppercase">
                      {a.name} 
                      {a.isDefault && <span className="badge badge-primary text-[9px] lowercase flex items-center gap-1 font-bold"><FaCheckCircle size={8} /> default</span>}
                    </h3>
                    <p className="text-xs text-secondary mt-1">{a.address}</p>
                    <p className="text-xs text-secondary">{a.city}, {a.state} - {a.pinCode}</p>
                    <p className="text-xs text-secondary font-medium mt-1">{a.country}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-base-100 flex justify-end gap-2 text-xs">
                {!a.isDefault && (
                  <button
                    onClick={() => handleSetDefault(a._id)}
                    className="text-primary font-semibold hover:underline"
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => handleDeleteAddress(a._id)}
                  className="text-error font-semibold hover:underline flex items-center gap-1 ml-4"
                >
                  <FaTrash size={10} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 rounded-2xl border border-dashed border-base-300">
          <FaMapMarkerAlt className="mx-auto text-4xl text-base-300 mb-3" />
          <p className="text-sm font-semibold text-secondary">No addresses onboarded yet.</p>
          <p className="text-xs text-secondary mt-1">Add shipping addresses to speed up checkout when ordering.</p>
        </div>
      )}
    </div>
  );
};

export default UserAddress;
