import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../config/api.config.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { MdOutlineAddAPhoto, MdOutlineBusiness, MdEdit } from "react-icons/md";
import { FaFileAlt, FaLock } from "react-icons/fa";
import PasswordChangeModal from "../commonModal/ChangePasswordModal.jsx";

const RestaurantSetting = () => {
  const { user, setUser } = useAuth();
  
  // User Profile States
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState(null);
  const [userFormData, setUserFormData] = useState({
    fullName: "",
    phone: "",
  });
  const [userLoading, setUserLoading] = useState(false);

  // Restaurant Business Profile States
  const [isEditingRest, setIsEditingRest] = useState(false);
  const [restProfile, setRestProfile] = useState(null);
  const [restLoading, setRestLoading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Files for Restaurant profile uploads
  const [restImageFile, setRestImageFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [gstFile, setGstFile] = useState(null);
  const [fssaiFile, setFssaiFile] = useState(null);
  const [panFile, setPanFile] = useState(null);

  const [restFormData, setRestFormData] = useState({
    restaurantName: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "India",
    cuisineTypes: "",
    description: "",
    restaurantType: "both",
    openingTime: "09:00",
    closingTime: "22:00",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    legalName: "",
    companyType: "Proprietorship",
  });

  const fetchRestProfile = async () => {
    try {
      const res = await api.get("/dashboard/overview");
      if (res.data?.success) {
        setRestProfile(res.data.data);
      }
    } catch (e) {
      console.log("Restaurant profile not created yet.");
    }
  };

  useEffect(() => {
    if (user) {
      setUserFormData({
        fullName: user.fullName || "",
        phone: user.phone || "",
      });
      fetchRestProfile();
    }
  }, [user]);

  useEffect(() => {
    if (restProfile) {
      setRestFormData({
        restaurantName: restProfile.restaurantName || "",
        address: restProfile.location?.address || "",
        city: restProfile.location?.city || "",
        state: restProfile.location?.state || "",
        pinCode: restProfile.location?.pinCode || "",
        country: restProfile.location?.country || "India",
        cuisineTypes: restProfile.cuisines?.join(", ") || "",
        description: restProfile.description || "",
        restaurantType: restProfile.restaurantType || "both",
        openingTime: restProfile.servingHours?.openingTime || "09:00",
        closingTime: restProfile.servingHours?.closingTime || "22:00",
        bankName: restProfile.bankDetails?.bankName || "",
        accountNumber: restProfile.bankDetails?.accountNumber || "",
        ifscCode: restProfile.bankDetails?.ifscCode || "",
        legalName: restProfile.documents?.legalName || "",
        companyType: restProfile.documents?.companyType || "Proprietorship",
      });
    }
  }, [restProfile]);

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setUserLoading(true);
    try {
      const payload = new FormData();
      payload.append("userId", user._id);
      payload.append("fullName", userFormData.fullName.trim());
      payload.append("phone", userFormData.phone.trim());
      if (selectedPhotoFile) {
        payload.append("photo", selectedPhotoFile);
      }

      const res = await api.put("/auth/profile", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message);
      sessionStorage.setItem("UserData", JSON.stringify(res.data.data));
      setUser(res.data.data);
      setSelectedPhotoFile(null);
      setIsEditingUser(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setUserLoading(false);
    }
  };

  const handleRestSubmit = async (e) => {
    e.preventDefault();
    setRestLoading(true);
    try {
      const payload = new FormData();
      payload.append("restaurantName", restFormData.restaurantName);
      payload.append("address", restFormData.address);
      payload.append("city", restFormData.city);
      payload.append("state", restFormData.state);
      payload.append("pinCode", restFormData.pinCode);
      payload.append("country", restFormData.country);
      payload.append("description", restFormData.description);
      payload.append("restaurantType", restFormData.restaurantType);

      const parsedCuisines = restFormData.cuisineTypes
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);
      payload.append("cuisineTypes", JSON.stringify(parsedCuisines));

      payload.append("contactDetails[email]", user.email);
      payload.append("contactDetails[phone]", user.phone);
      payload.append("servingHours[openingTime]", restFormData.openingTime);
      payload.append("servingHours[closingTime]", restFormData.closingTime);
      payload.append("financialDetails[bankName]", restFormData.bankName);
      payload.append("financialDetails[accountNumber]", restFormData.accountNumber);
      payload.append("financialDetails[ifscCode]", restFormData.ifscCode);
      payload.append("documents[legalName]", restFormData.legalName);
      payload.append("documents[companyType]", restFormData.companyType);

      // File attachments
      if (restImageFile) payload.append("restaurantImage", restImageFile);
      if (coverImageFile) payload.append("coverImage", coverImageFile);
      if (gstFile) payload.append("gstCertificate", gstFile);
      if (fssaiFile) payload.append("fssaiCertificate", fssaiFile);
      if (panFile) payload.append("panCard", panFile);

      const res = await api.post("/restaurants", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        toast.success("Restaurant business profile updated successfully!");
        setRestProfile(res.data.data);
        setIsEditingRest(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save business details.");
    } finally {
      setRestLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 p-6 space-y-8 max-w-4xl">
      <h2 className="text-2xl font-bold text-base-content border-b pb-2 flex items-center gap-2">
        ⚙️ Settings & Configuration
      </h2>

      {/* manager Profile settings */}
      <div className="card bg-base-100 border border-base-200 p-6 rounded-2xl shadow-xs">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <img
              src={user?.photo || "https://placehold.co/100x100?text=Manager"}
              alt={user?.fullName}
              className="h-full w-full object-cover bg-warning"
            />
            {isEditingUser && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white cursor-pointer">
                <label htmlFor="profilePic" className="cursor-pointer text-lg"><MdOutlineAddAPhoto /></label>
                <input
                  type="file"
                  id="profilePic"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setSelectedPhotoFile(e.target.files?.[0])}
                />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-base-content">Manager Account Details</h3>
            <p className="text-xs text-secondary">Manage your personal credentials, contact number, and avatar.</p>
          </div>
        </div>

        {isEditingUser ? (
          <form onSubmit={handleUserSubmit} className="space-y-4 max-w-md">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Full Name</label>
                <input
                  type="text"
                  value={userFormData.fullName}
                  onChange={(e) => setUserFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Phone Number</label>
                <input
                  type="text"
                  value={userFormData.phone}
                  onChange={(e) => setUserFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  required
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={userLoading} className="btn btn-primary btn-sm text-xs text-white rounded-lg">
                {userLoading ? "Saving..." : "Save Profile"}
              </button>
              <button type="button" onClick={() => setIsEditingUser(false)} className="btn btn-sm btn-outline rounded-lg">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-2 text-xs text-secondary mb-4">
            <p><span className="font-bold text-base-content">Name:</span> {user?.fullName}</p>
            <p><span className="font-bold text-base-content">Phone:</span> {user?.phone}</p>
            <p><span className="font-bold text-base-content">Email:</span> {user?.email}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              <button onClick={() => setIsEditingUser(true)} className="btn btn-xs btn-primary rounded-lg text-white flex items-center gap-1">
                <MdEdit /> Edit Profile
              </button>
              <button onClick={() => setIsPasswordModalOpen(true)} className="btn btn-xs btn-outline rounded-lg flex items-center gap-1">
                <FaLock /> Change Password
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Restaurant business setup */}
      <div className="card bg-base-100 border border-base-200 p-6 rounded-2xl shadow-xs">
        <h3 className="text-lg font-bold text-base-content border-b pb-2 mb-4 flex items-center gap-2">
          <MdOutlineBusiness className="text-primary" /> Restaurant Business Details
        </h3>

        {isEditingRest ? (
          <form onSubmit={handleRestSubmit} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Restaurant Name</label>
                <input
                  type="text"
                  value={restFormData.restaurantName}
                  onChange={(e) => setRestFormData(p => ({ ...p, restaurantName: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Cuisines (comma-separated)</label>
                <input
                  type="text"
                  value={restFormData.cuisineTypes}
                  onChange={(e) => setRestFormData(p => ({ ...p, cuisineTypes: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  placeholder="Indian, Chinese, Italian"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Restaurant Type</label>
                <select
                  value={restFormData.restaurantType}
                  onChange={(e) => setRestFormData(p => ({ ...p, restaurantType: e.target.value }))}
                  className="select select-bordered select-sm w-full rounded-lg bg-base-100 text-xs"
                >
                  <option value="veg">Veg Only</option>
                  <option value="non-veg">Non-Veg Only</option>
                  <option value="jain">Jain Only</option>
                  <option value="vegan">Vegan Only</option>
                  <option value="both">Both Veg / Non-Veg</option>
                </select>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Street Address</label>
                <input
                  type="text"
                  value={restFormData.address}
                  onChange={(e) => setRestFormData(p => ({ ...p, address: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">City</label>
                <input
                  type="text"
                  value={restFormData.city}
                  onChange={(e) => setRestFormData(p => ({ ...p, city: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">State</label>
                <input
                  type="text"
                  value={restFormData.state}
                  onChange={(e) => setRestFormData(p => ({ ...p, state: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Pin Code</label>
                <input
                  type="text"
                  value={restFormData.pinCode}
                  onChange={(e) => setRestFormData(p => ({ ...p, pinCode: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  required
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Outlet Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setRestImageFile(e.target.files?.[0])}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs py-1"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverImageFile(e.target.files?.[0])}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs py-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1">Open Time</label>
                  <input
                    type="time"
                    value={restFormData.openingTime}
                    onChange={(e) => setRestFormData(p => ({ ...p, openingTime: e.target.value }))}
                    className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-secondary mb-1">Close Time</label>
                  <input
                    type="time"
                    value={restFormData.closingTime}
                    onChange={(e) => setRestFormData(p => ({ ...p, closingTime: e.target.value }))}
                    className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-orange-50/50 p-4 rounded-xl border border-dashed border-orange-200 space-y-3">
              <h4 className="font-bold text-sm text-amber-800">Legal Documents Vetting (Required for Verification)</h4>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-secondary mb-1">Legal Company Name</label>
                  <input
                    type="text"
                    value={restFormData.legalName}
                    onChange={(e) => setRestFormData(p => ({ ...p, legalName: e.target.value }))}
                    className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-secondary mb-1">Company Type</label>
                  <select
                    value={restFormData.companyType}
                    onChange={(e) => setRestFormData(p => ({ ...p, companyType: e.target.value }))}
                    className="select select-bordered select-sm w-full rounded-lg bg-base-100 text-xs"
                  >
                    <option value="Proprietorship">Proprietorship</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Private Limited">Private Limited</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-secondary mb-1">GST Certificate File</label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => setGstFile(e.target.files?.[0])}
                    className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs py-1"
                  />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-secondary mb-1">FSSAI License Certificate</label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => setFssaiFile(e.target.files?.[0])}
                    className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs py-1"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-secondary mb-1">PAN Card Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPanFile(e.target.files?.[0])}
                    className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs py-1"
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50/50 p-4 rounded-xl border border-dashed border-blue-200 space-y-3">
              <h4 className="font-bold text-sm text-blue-800">Settlement Banking Account Details</h4>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-secondary mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={restFormData.bankName}
                    onChange={(e) => setRestFormData(p => ({ ...p, bankName: e.target.value }))}
                    className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-secondary mb-1">Account Number</label>
                  <input
                    type="text"
                    value={restFormData.accountNumber}
                    onChange={(e) => setRestFormData(p => ({ ...p, accountNumber: e.target.value }))}
                    className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-secondary mb-1">IFSC Code</label>
                  <input
                    type="text"
                    value={restFormData.ifscCode}
                    onChange={(e) => setRestFormData(p => ({ ...p, ifscCode: e.target.value }))}
                    className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary mb-1">Store Description</label>
              <textarea
                value={restFormData.description}
                onChange={(e) => setRestFormData(p => ({ ...p, description: e.target.value }))}
                className="textarea textarea-bordered textarea-sm w-full rounded-lg bg-base-100 text-xs h-16"
                required
              />
            </div>

            <div className="flex gap-2">
              <button type="submit" disabled={restLoading} className="btn btn-primary btn-sm text-xs text-white rounded-lg px-6">
                {restLoading ? "Saving details..." : "Save Business Setup"}
              </button>
              <button type="button" onClick={() => setIsEditingRest(false)} className="btn btn-sm btn-outline rounded-lg">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-xs text-secondary">
            <div className="grid gap-4 sm:grid-cols-2 bg-base-50 p-4 rounded-xl border">
              <div>
                <p className="font-bold text-base-content text-sm mb-2">Registration Status</p>
                <p><span className="font-bold text-base-content">Name:</span> {restProfile?.restaurantName || "Unconfigured"}</p>
                <p><span className="font-bold text-base-content">Open Status:</span> {restProfile?.isOpen ? "Open" : "Closed"}</p>
                <p><span className="font-bold text-base-content">Vetting Status:</span> <span className="badge badge-neutral capitalize font-bold text-[9px]">{restProfile?.status || "inactive"}</span></p>
              </div>
              <div>
                <p className="font-bold text-base-content text-sm mb-2">Location & Timings</p>
                <p><span className="font-bold text-base-content">Address:</span> {restProfile?.location?.address || "N/A"}, {restProfile?.location?.city || "N/A"}</p>
                <p><span className="font-bold text-base-content">Serving Hours:</span> {restProfile?.servingHours?.openingTime || "N/A"} - {restProfile?.servingHours?.closingTime || "N/A"}</p>
              </div>
            </div>

            <button onClick={() => setIsEditingRest(true)} className="btn btn-xs btn-primary text-white rounded-lg flex items-center gap-1 mt-4">
              <MdEdit /> Edit Business Profile / Onboard documents
            </button>
          </div>
        )}
      </div>

      <PasswordChangeModal open={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
    </div>
  );
};

export default RestaurantSetting;