import React, { useEffect, useState } from "react";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { FaPlus, FaTrash, FaEdit, FaCheckCircle, FaTimes, FaCamera } from "react-icons/fa";

const RestaurantWishlist = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    price: "",
    category: "",
    isTopRated: false,
    isRecommended: false,
  });

  const fetchMenu = async () => {
    try {
      const res = await api.get("/restaurant/menu");
      if (res.data?.success) {
        setMenuItems(res.data.data || []);
      }
    } catch (error) {
      toast.error("Failed to load menu items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("itemName", formData.itemName);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("category", formData.category);
    payload.append("isTopRated", formData.isTopRated);
    payload.append("isRecommended", formData.isRecommended);
    if (photoFile) {
      payload.append("image", photoFile);
    }

    try {
      const res = await api.post("/restaurant/menu/add-item", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.success) {
        setMenuItems(res.data.data);
        toast.success("Menu item added successfully!");
        setShowAddForm(false);
        setPhotoFile(null);
        setFormData({
          itemName: "",
          description: "",
          price: "",
          category: "",
          isTopRated: false,
          isRecommended: false,
        });
      }
    } catch (error) {
      toast.error("Failed to add menu item.");
    }
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setPhotoFile(null);
    setFormData({
      itemName: item.itemName,
      description: item.description,
      price: item.price,
      category: item.category,
      isTopRated: item.isTopRated,
      isRecommended: item.isRecommended,
    });
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("itemName", formData.itemName);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("category", formData.category);
    payload.append("isTopRated", formData.isTopRated);
    payload.append("isRecommended", formData.isRecommended);
    if (photoFile) {
      payload.append("image", photoFile);
    }

    try {
      const res = await api.put(`/restaurant/menu/update-item/${editingItem._id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.success) {
        toast.success("Menu item updated!");
        setMenuItems((prev) =>
          prev.map((item) => (item._id === editingItem._id ? res.data.data : item))
        );
        setEditingItem(null);
      }
    } catch (error) {
      toast.error("Failed to update menu item.");
    }
  };

  const handleToggleAvailable = async (itemId) => {
    try {
      const res = await api.patch(`/restaurant/menu/toggle/${itemId}`);
      if (res.data?.success) {
        setMenuItems((prev) =>
          prev.map((item) => (item._id === itemId ? { ...item, isAvailable: res.data.data.isAvailable } : item))
        );
        toast.success("Availability toggled");
      }
    } catch (error) {
      toast.error("Failed to toggle availability.");
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) return;
    try {
      const res = await api.delete(`/restaurant/menu/delete-item/${itemId}`);
      if (res.data?.success) {
        setMenuItems(res.data.data);
        toast.success("Menu item deleted.");
      }
    } catch (error) {
      toast.error("Failed to delete menu item.");
    }
  };

  if (loading) {
    return <div className="text-center text-secondary py-12">Loading menu items...</div>;
  }

  return (
    <div className="space-y-6 bg-base-100 p-6 rounded-2xl">
      <div className="flex items-center justify-between border-b pb-3">
        <div>
          <h2 className="text-2xl font-bold text-base-content flex items-center gap-2">
            👨‍🍳 Digital Menu Builder
          </h2>
          <p className="text-xs text-secondary mt-1">Onboard, edit, and toggle availability of your digital dishes.</p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingItem(null);
          }}
          className="btn btn-primary btn-sm flex items-center gap-2 text-xs text-white rounded-lg"
        >
          <FaPlus /> {showAddForm ? "Cancel" : "Add Item"}
        </button>
      </div>

      {/* Add / Edit Form */}
      {(showAddForm || editingItem) && (
        <form onSubmit={editingItem ? handleUpdateItem : handleAddItem} className="bg-base-50 p-6 rounded-2xl border border-base-200 shadow-xs max-w-xl space-y-4">
          <h3 className="font-bold text-lg text-base-content">{editingItem ? "Edit Menu Item" : "Create New Menu Item"}</h3>
          
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-secondary mb-1">Item Name</label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                placeholder="e.g. Butter Paneer"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-secondary mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                placeholder="e.g. Main Course, Starters"
                required
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-secondary mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                placeholder="e.g. 240"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-secondary mb-1">Upload Photo</label>
              <div className="flex items-center gap-2">
                <label htmlFor="foodPhoto" className="btn btn-sm btn-outline rounded-lg flex items-center gap-1 text-xs cursor-pointer">
                  <FaCamera /> Select Photo
                </label>
                <input
                  type="file"
                  id="foodPhoto"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {photoFile && <span className="text-[10px] text-primary truncate max-w-32">{photoFile.name}</span>}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-secondary mb-1">Item Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="textarea textarea-bordered textarea-sm w-full rounded-lg bg-base-100 text-xs h-16"
              placeholder="e.g. Creamy cottage cheese cubes in rich tomato-butter gravy."
            />
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <input
                type="checkbox"
                id="isTopRated"
                name="isTopRated"
                checked={formData.isTopRated}
                onChange={handleInputChange}
                className="checkbox checkbox-primary checkbox-xs"
              />
              <label htmlFor="isTopRated" className="text-xs font-semibold text-secondary cursor-pointer">Top Rated</label>
            </div>
            <div className="flex items-center gap-1.5">
              <input
                type="checkbox"
                id="isRecommended"
                name="isRecommended"
                checked={formData.isRecommended}
                onChange={handleInputChange}
                className="checkbox checkbox-primary checkbox-xs"
              />
              <label htmlFor="isRecommended" className="text-xs font-semibold text-secondary cursor-pointer">Recommended</label>
            </div>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary btn-sm text-xs text-white rounded-lg px-6">
              {editingItem ? "Save Changes" : "Create Item"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setEditingItem(null);
              }}
              className="btn btn-sm btn-outline rounded-lg text-xs"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Menu Grid */}
      {menuItems.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {menuItems.map((item) => (
            <div key={item._id} className="card bg-base-100 border border-base-200 rounded-2xl overflow-hidden hover-lift shadow-xs flex flex-col justify-between">
              <div>
                <div className="relative">
                  <img
                    src={item.image?.url || "https://placehold.co/200x200?text=Food"}
                    alt={item.itemName}
                    className="h-40 w-full object-cover"
                  />
                  {!item.isAvailable && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-bold tracking-widest text-xs uppercase px-3 py-1 border border-white/50 rounded">Sold Out</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-base-content text-sm">{item.itemName}</h4>
                    <span className="text-primary font-bold text-xs">₹{item.price}</span>
                  </div>
                  <p className="text-xs text-secondary line-clamp-2 h-8">{item.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="badge badge-neutral text-[9px] uppercase font-bold">{item.category}</span>
                    {item.isTopRated && <span className="badge badge-warning text-[9px] text-white font-bold">★ Top Rated</span>}
                    {item.isRecommended && <span className="badge badge-info text-[9px] text-white font-bold">Recommended</span>}
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-base-100 flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => handleToggleAvailable(item._id)}
                  className={`btn btn-xs rounded-lg ${item.isAvailable ? 'btn-outline btn-error' : 'btn-success text-white'}`}
                >
                  {item.isAvailable ? "Set Sold Out" : "Set Available"}
                </button>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenEdit(item)} className="text-primary font-bold hover:underline flex items-center gap-1">
                    <FaEdit size={12} /> Edit
                  </button>
                  <button onClick={() => handleDeleteItem(item._id)} className="text-error font-bold hover:underline flex items-center gap-1">
                    <FaTrash size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-2xl border-base-300">
          <p className="text-secondary text-sm font-semibold">Your digital menu is empty.</p>
          <p className="text-secondary text-xs mt-1">Tap the "Add Item" button above to populate your menu items.</p>
        </div>
      )}
    </div>
  );
};

export default RestaurantWishlist;