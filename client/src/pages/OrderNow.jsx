import { useMemo, useState, useEffect } from "react";
import { FaClock, FaMapMarkerAlt, FaStar, FaShoppingCart, FaTrash, FaUtensils, FaCreditCard } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../config/api.config.js";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

const OrderNow = () => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({ restaurantId: "", restaurantName: "", items: [] });
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all restaurants on mount
  useEffect(() => {
    const init = async () => {
      try {
        const res = await api.get("/restaurants");
        setRestaurants(res.data || []);
        if (res.data && res.data.length > 0) {
          // If navigated from home page with a specific restaurant selection
          const stateRest = location?.state?.restaurant;
          const found = stateRest ? res.data.find(r => r._id === stateRest._id) : null;
          setSelectedRestaurant(found || res.data[0]);
        }
      } catch (error) {
        toast.error("Failed to load restaurants.");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [location]);

  // Fetch menu when selected restaurant changes
  useEffect(() => {
    if (!selectedRestaurant) return;
    const fetchMenu = async () => {
      try {
        const res = await api.get(`/restaurants/${selectedRestaurant._id}/menu`);
        setMenuItems(res.data || []);
      } catch (error) {
        toast.error("Failed to load menu items.");
      }
    };
    fetchMenu();
  }, [selectedRestaurant]);

  // Fetch cart and addresses if logged in
  useEffect(() => {
    if (!isLogin) return;
    const fetchUserData = async () => {
      try {
        const cartRes = await api.get("/customer/cart");
        if (cartRes.data?.cart) {
          setCart(cartRes.data.cart);
        }
        const addrRes = await api.get("/customer/addresses");
        if (addrRes.data?.addressBook) {
          setAddresses(addrRes.data.addressBook);
          const defaultAddr = addrRes.data.addressBook.find(a => a.isDefault);
          if (defaultAddr) {
            setSelectedAddress(defaultAddr.address + ", " + defaultAddr.city);
          } else if (addrRes.data.addressBook.length > 0) {
            setSelectedAddress(addrRes.data.addressBook[0].address + ", " + addrRes.data.addressBook[0].city);
          }
        }
      } catch (error) {
        console.error("Failed to load cart/addresses", error);
      }
    };
    fetchUserData();
  }, [isLogin]);

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cart.items.reduce((sum, item) => sum + item.qty * item.price, 0);
  }, [cart.items]);

  const platformFee = cart.items.length > 0 ? 5 : 0;
  const convenienceFee = cart.items.length > 0 ? 2 : 0;
  const gst = cart.items.length > 0 ? Math.round(cartSubtotal * 0.05 * 100) / 100 : 0;
  const deliveryCharges = cart.items.length > 0 ? 30 : 0;
  const grandTotal = cartSubtotal + platformFee + convenienceFee + gst + deliveryCharges;

  // Add Item to Cart (calls backend API if logged in, otherwise redirects)
  const addToCart = async (item) => {
    if (!isLogin) {
      toast.error("Please login to add items to cart.");
      navigate("/login");
      return;
    }

    try {
      const res = await api.post("/customer/cart/add", {
        restaurantId: selectedRestaurant._id,
        restaurantName: selectedRestaurant.restaurantName,
        itemId: item._id,
        name: item.itemName,
        price: item.price,
        qty: 1,
        image: item.image,
      });

      if (res.data?.success) {
        setCart(res.data.cart);
        toast.success(`${item.itemName} added to cart!`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add item. Check if you have items from another restaurant.");
    }
  };

  // Modify quantity (+ or -)
  const updateQty = async (itemId, newQty) => {
    try {
      const res = await api.patch("/customer/cart/update", { itemId, qty: newQty });
      if (res.data?.success) {
        setCart(res.data.cart);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update quantity");
    }
  };

  // Remove single item
  const removeItem = async (itemId) => {
    try {
      const res = await api.delete(`/customer/cart/remove/${itemId}`);
      if (res.data?.success) {
        setCart(res.data.cart);
        toast.success("Item removed from cart");
      }
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      const res = await api.delete("/customer/cart/clear");
      if (res.data?.success) {
        setCart(res.data.cart);
        toast.success("Cart cleared");
      }
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  };

  // Place Order
  const handlePlaceOrder = async () => {
    if (!isLogin) {
      toast.error("Please login to place an order.");
      navigate("/login");
      return;
    }
    if (!cart.items.length) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!selectedAddress.trim()) {
      toast.error("Please select or enter a delivery address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.post("/customer/order/place", {
        restaurantId: cart.restaurantId,
        restaurantName: cart.restaurantName,
        items: cart.items,
        deliveryAddress: selectedAddress,
      });

      if (res.data?.success) {
        toast.success("Order placed successfully!");
        setCart({ restaurantId: "", restaurantName: "", items: [] });
        navigate("/user/dashboard/order");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to place order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-base-100 font-sans">
      {/* Header Cover Banner */}
      <section className="relative flex h-[35vh] items-center justify-center bg-cover bg-center text-center bg-warning" style={{ backgroundImage: `url('/commonBG.avif')` }}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs"></div>
        <div className="relative z-10 px-6">
          <h1 className="mb-2 text-4xl font-extrabold text-white md:text-5xl tracking-tight">Order Delicious Food</h1>
          <p className="mx-auto max-w-2xl text-base text-white/80">
            Browse the best local spots, customize your favorites, and enjoy express home delivery.
          </p>
        </div>
      </section>

      {/* Main Grid content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[2fr_1fr]">
          
          {/* Left panel - Restaurant & Menu Listings */}
          <div className="space-y-8">
            <div className="rounded-2xl bg-base-100 p-6 border border-base-200 shadow-xs">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-base-content flex items-center gap-2">
                    <FaUtensils className="text-primary" /> Active Restaurants
                  </h2>
                  <p className="text-sm text-secondary">Choose a restaurant to open their menu pipeline.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {restaurants.map((r) => (
                    <button
                      key={r._id}
                      onClick={() => setSelectedRestaurant(r)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold hover-lift transition ${
                        selectedRestaurant?._id === r._id
                          ? "bg-primary text-white shadow-md"
                          : "bg-base-200 text-base-content"
                      }`}
                    >
                      {r.restaurantName}
                    </button>
                  ))}
                </div>
              </div>

              {selectedRestaurant ? (
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Selected Restaurant Information Card */}
                  <article className="overflow-hidden rounded-2xl border border-base-200 bg-base-100 flex flex-col justify-between">
                    <div>
                      <img
                        src={selectedRestaurant.restaurantImage?.[0]?.url || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"}
                        alt={selectedRestaurant.restaurantName}
                        className="h-48 w-full object-cover"
                      />
                      <div className="p-5">
                        <div className="mb-3 flex items-center justify-between">
                          <h3 className="text-xl font-bold text-base-content">{selectedRestaurant.restaurantName}</h3>
                          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">
                            <FaStar /> {selectedRestaurant.averageRating || "4.5"}
                          </div>
                        </div>
                        <p className="text-sm text-secondary mb-4">{selectedRestaurant.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-secondary">
                          <span className="flex items-center gap-1"><FaClock /> {selectedRestaurant.servingHours?.openingTime || "9:00 AM"} - {selectedRestaurant.servingHours?.closingTime || "10:00 PM"}</span>
                          <span className="flex items-center gap-1"><FaMapMarkerAlt /> {selectedRestaurant.city}</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-5 pb-5 pt-2 border-t border-base-200 bg-base-50/50 flex flex-wrap gap-1">
                      {(selectedRestaurant.cuisineTypes || []).map((cuisine) => (
                        <span key={cuisine} className="rounded-full bg-base-200 px-3 py-1 text-[10px] uppercase font-semibold text-secondary">{cuisine}</span>
                      ))}
                    </div>
                  </article>

                  {/* Menu Items Listings */}
                  <article className="rounded-2xl border border-base-200 bg-base-100 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="mb-4 text-lg font-bold text-base-content border-b pb-2">Digital Menu</h3>
                      {menuItems.length > 0 ? (
                        <div className="space-y-3 max-h-[350px] overflow-y-auto trackless-scrollbar">
                          {menuItems.map((item) => (
                            <div key={item._id} className="flex items-center justify-between rounded-xl bg-base-50 p-3 hover-lift border border-base-100">
                              <div className="flex items-center gap-3">
                                <img src={item.image?.url || "https://placehold.co/100x100?text=Food"} alt={item.itemName} className="w-12 h-12 rounded-lg object-cover" />
                                <div>
                                  <p className="font-semibold text-sm text-base-content">{item.itemName}</p>
                                  <p className="text-xs text-secondary">₹{item.price}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => addToCart(item)}
                                disabled={!item.isAvailable}
                                className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white hover:opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed"
                              >
                                {item.isAvailable ? "Add" : "Sold Out"}
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-secondary py-10 text-center">No menu items added by this restaurant yet.</p>
                      )}
                    </div>
                  </article>
                </div>
              ) : (
                <p className="text-center text-secondary py-12">No active restaurants found.</p>
              )}
            </div>
          </div>

          {/* Right panel - Shopping Bag / Cart Summary */}
          <aside className="space-y-6">
            <div className="rounded-2xl bg-base-100 p-6 border border-base-200 shadow-xs">
              <div className="mb-4 flex items-center justify-between border-b pb-3">
                <div>
                  <h2 className="text-xl font-bold text-base-content flex items-center gap-2">
                    <FaShoppingCart className="text-primary" /> Shopping Bag
                  </h2>
                  {cart.restaurantName && (
                    <p className="text-xs text-primary font-medium mt-1">From: {cart.restaurantName}</p>
                  )}
                </div>
                {cart.items.length > 0 && (
                  <button onClick={clearCart} className="text-xs text-error font-semibold flex items-center gap-1 hover:underline">
                    <FaTrash size={10} /> Clear
                  </button>
                )}
              </div>

              {cart.items.length > 0 ? (
                <div className="space-y-4">
                  {/* Cart Items list */}
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {cart.items.map((item) => (
                      <div key={item.itemId} className="rounded-xl border border-base-100 bg-base-50 p-3">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-semibold text-sm text-base-content">{item.name}</p>
                            <p className="text-xs text-secondary">₹{item.price} each</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQty(item.itemId, item.qty - 1)}
                              className="rounded-full border w-6 h-6 flex items-center justify-center hover:bg-base-200 text-xs font-bold"
                            >
                              -
                            </button>
                            <span className="text-sm font-semibold">{item.qty}</span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.itemId, item.qty + 1)}
                              className="rounded-full border w-6 h-6 flex items-center justify-center hover:bg-base-200 text-xs font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-secondary pt-2 border-t border-dashed">
                          <button onClick={() => removeItem(item.itemId)} className="text-error hover:underline font-medium text-[10px]">Remove</button>
                          <span className="font-bold">Total: ₹{item.price * item.qty}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Billing breakdown */}
                  <div className="rounded-xl bg-base-50 p-4 space-y-2 text-xs border border-base-200">
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">Subtotal</span>
                      <span className="font-semibold text-base-content">₹{cartSubtotal}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">Platform Fee</span>
                      <span className="font-semibold text-base-content">₹{platformFee}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">Convenience Fee</span>
                      <span className="font-semibold text-base-content">₹{convenienceFee}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">GST (5%)</span>
                      <span className="font-semibold text-base-content">₹{gst}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-secondary">Delivery Charges</span>
                      <span className="font-semibold text-base-content">₹{deliveryCharges}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t font-bold text-sm text-base-content">
                      <span>Total Amount</span>
                      <span className="text-primary">₹{grandTotal}</span>
                    </div>
                  </div>

                  {/* Shipping Address Picker */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-bold text-base-content uppercase tracking-wider">Delivery Address</label>
                    {addresses.length > 0 ? (
                      <select
                        value={selectedAddress}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        className="select select-bordered select-sm w-full rounded-xl bg-base-100 text-xs"
                      >
                        {addresses.map((a, idx) => (
                          <option key={idx} value={a.address + ", " + a.city}>
                            [{a.type.toUpperCase()}] {a.name} - {a.address}, {a.city}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        value={selectedAddress}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        className="input input-bordered input-sm w-full rounded-xl bg-base-100 text-xs"
                        placeholder="Enter delivery address manually"
                      />
                    )}
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-bold text-base-content uppercase tracking-wider">Payment Method</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("COD")}
                        className={`flex items-center justify-center gap-2 py-2 px-3 border rounded-xl text-xs font-semibold transition ${
                          paymentMethod === "COD" ? "border-primary bg-primary/5 text-primary" : "border-base-200"
                        }`}
                      >
                        <FaUtensils size={12} /> Cash on Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("CARD")}
                        className={`flex items-center justify-center gap-2 py-2 px-3 border rounded-xl text-xs font-semibold transition ${
                          paymentMethod === "CARD" ? "border-primary bg-primary/5 text-primary" : "border-base-200"
                        }`}
                      >
                        <FaCreditCard size={12} /> Card / UPI
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="w-full btn btn-primary rounded-xl text-xs font-bold text-white shadow-md hover-lift transition py-3"
                  >
                    {isSubmitting ? "Placing Order..." : `Place Order (₹${grandTotal})`}
                  </button>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <FaShoppingCart className="mx-auto text-4xl text-base-300 mb-3" />
                  <p className="text-sm text-secondary">Your cart is empty.</p>
                  <p className="text-xs text-secondary mt-1">Select a restaurant and add some tasty meals to begin!</p>
                </div>
              )}
            </div>
          </aside>

        </div>
      </section>
    </main>
  );
};

export default OrderNow;
