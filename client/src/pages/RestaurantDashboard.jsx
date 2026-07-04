import { useEffect, useState } from "react";
import api from "../config/api.config.js";
import toast from "react-hot-toast";

const emptyForm = {
  name: "",
  description: "",
  image: "",
  cuisines: "",
  city: "",
  deliveryTime: "",
  price: "",
  rating: "4.5",
};

const RestaurantDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const loadRestaurants = async () => {
    setLoading(true);
    try {
      const res = await api.get("/restaurants");
      const data = res.data || [];
      setRestaurants(data);
      if (!selectedId && data[0]) setSelectedId(data[0].id);
    } catch (err) {
      toast.error("Could not load restaurants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    const loadMenu = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/restaurants/${selectedId}/menu`);
        setMenuItems(res.data || []);
      } catch (err) {
        const local = restaurants.find((r) => r.id === selectedId);
        setMenuItems(local?.menu || []);
      } finally {
        setLoading(false);
      }
    };
    loadMenu();
  }, [selectedId, restaurants]);

  const addItem = () => {
    if (!newItem.trim()) return;
    setMenuItems((m) => [...m, newItem.trim()]);
    setNewItem("");
  };

  const removeItem = (idx) => setMenuItems((m) => m.filter((_, i) => i !== idx));

  const saveMenu = async () => {
    if (!selectedId) return;
    setLoading(true);
    try {
      await api.post(`/restaurants/${selectedId}/menu`, { menu: menuItems });
      toast.success("Menu saved successfully");
    } catch (err) {
      toast.error("Failed to save menu");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRestaurant = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/restaurants", {
        ...form,
        cuisines: form.cuisines.split(",").map((item) => item.trim()).filter(Boolean),
      });
      toast.success("Restaurant card added");
      setForm(emptyForm);
      await loadRestaurants();
    } catch (err) {
      toast.error("Failed to add restaurant card");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-100 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">Restaurant Dashboard</h1>

        <section className="mb-8 rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Add Restaurant Card</h2>
          <form onSubmit={handleCreateRestaurant} className="grid gap-4 md:grid-cols-2">
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Restaurant name" className="rounded border px-3 py-2" />
            <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" className="rounded border px-3 py-2" />
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="Image URL" className="rounded border px-3 py-2" />
            <input value={form.deliveryTime} onChange={(e) => setForm({ ...form, deliveryTime: e.target.value })} placeholder="Delivery time" className="rounded border px-3 py-2" />
            <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price" className="rounded border px-3 py-2" />
            <input value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} placeholder="Rating" className="rounded border px-3 py-2" />
            <input value={form.cuisines} onChange={(e) => setForm({ ...form, cuisines: e.target.value })} placeholder="Cuisines (comma separated)" className="rounded border px-3 py-2 md:col-span-2" />
            <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="rounded border px-3 py-2 md:col-span-2" rows="3" />
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" disabled={loading} className="rounded bg-primary px-4 py-2 font-semibold text-white disabled:opacity-60">{loading ? "Saving..." : "Add Restaurant"}</button>
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Existing Restaurants</h2>
              <p className="text-sm text-secondary">Select a restaurant to manage its menu.</p>
            </div>
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} className="rounded border px-3 py-2">
              {restaurants.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="rounded-xl border border-base-200 p-4">
                <h3 className="font-semibold">{restaurant.name}</h3>
                <p className="mt-1 text-sm text-secondary">{restaurant.description}</p>
                <p className="mt-2 text-sm">{restaurant.city}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Edit Menu</h2>
          <div className="mb-3 flex gap-2">
            <input value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="New menu item" className="flex-1 rounded border px-3 py-2" />
            <button onClick={addItem} className="rounded bg-primary px-4 py-2 text-white">Add</button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-2">
              {menuItems.length ? (
                menuItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded border px-3 py-2">
                    <span>{item}</span>
                    <button onClick={() => removeItem(idx)} className="text-sm text-red-600">Remove</button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-secondary">No items yet</p>
              )}
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <button onClick={saveMenu} disabled={loading || !selectedId} className="rounded bg-primary px-4 py-2 font-semibold text-white disabled:opacity-60">{loading ? "Saving..." : "Save Menu"}</button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default RestaurantDashboard;
