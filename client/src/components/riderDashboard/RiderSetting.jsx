import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../config/api.config.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { MdOutlineAddAPhoto, MdOutlineBusiness, MdEdit } from "react-icons/md";
import { FaLock, FaMotorcycle, FaUniversity } from "react-icons/fa";
import PasswordChangeModal from "../commonModal/ChangePasswordModal.jsx";

const RiderSetting = () => {
  const { user, setUser } = useAuth();
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [userFormData, setUserFormData] = useState({
    fullName: "",
    phone: "",
  });
  const [userLoading, setUserLoading] = useState(false);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState(null);

  const [isEditingRider, setIsEditingRider] = useState(false);
  const [riderProfile, setRiderProfile] = useState(null);
  const [riderLoading, setRiderLoading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [riderFormData, setRiderFormData] = useState({
    vehicleType: "motorcycle",
    vehicleNumber: "",
    vehicleModel: "",
    vehicleColor: "",
    drivingLicense: "",
    vehicleRegistrationCertificate: "",
    insuranceCertificate: "",
    aadharCard: "",
    panCard: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "India",
  });

  const fetchRiderProfile = async () => {
    try {
      const res = await api.get("/rider/profile");
      if (res.data?.success) {
        setRiderProfile(res.data.data);
      }
    } catch (e) {
      console.log("Rider profile not found yet.");
    }
  };

  useEffect(() => {
    if (user) {
      setUserFormData({
        fullName: user.fullName || "",
        phone: user.phone || "",
      });
      fetchRiderProfile();
    }
  }, [user]);

  useEffect(() => {
    if (riderProfile) {
      setRiderFormData({
        vehicleType: riderProfile.vehicleDetails?.vehicleType || "motorcycle",
        vehicleNumber: riderProfile.vehicleDetails?.vehicleNumber || "",
        vehicleModel: riderProfile.vehicleDetails?.vehicleModel || "",
        vehicleColor: riderProfile.vehicleDetails?.vehicleColor || "",
        drivingLicense: riderProfile.documents?.drivingLicense || "",
        vehicleRegistrationCertificate: riderProfile.documents?.vehicleRegistrationCertificate || "",
        insuranceCertificate: riderProfile.documents?.insuranceCertificate || "",
        aadharCard: riderProfile.documents?.aadharCard || "",
        panCard: riderProfile.documents?.panCard || "",
        bankName: riderProfile.financialDetails?.bankName || "",
        accountNumber: riderProfile.financialDetails?.accountNumber || "",
        ifscCode: riderProfile.financialDetails?.ifscCode || "",
        address: riderProfile.currentAddress?.address || "",
        city: riderProfile.currentAddress?.city || "",
        state: riderProfile.currentAddress?.state || "",
        pinCode: riderProfile.currentAddress?.pinCode || "",
        country: riderProfile.currentAddress?.country || "India",
      });
    }
  }, [riderProfile]);

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

  const handleRiderSubmit = async (e) => {
    e.preventDefault();
    setRiderLoading(true);
    try {
      const payload = {
        vehicleDetails: {
          vehicleType: riderFormData.vehicleType,
          vehicleNumber: riderFormData.vehicleNumber,
          vehicleModel: riderFormData.vehicleModel,
          vehicleColor: riderFormData.vehicleColor,
        },
        documents: {
          drivingLicense: riderFormData.drivingLicense,
          vehicleRegistrationCertificate: riderFormData.vehicleRegistrationCertificate,
          insuranceCertificate: riderFormData.insuranceCertificate,
          aadharCard: riderFormData.aadharCard,
          panCard: riderFormData.panCard,
        },
        currentAddress: {
          address: riderFormData.address,
          city: riderFormData.city,
          state: riderFormData.state,
          pinCode: riderFormData.pinCode,
          country: riderFormData.country,
        },
        financialDetails: {
          bankName: riderFormData.bankName,
          accountNumber: riderFormData.accountNumber,
          ifscCode: riderFormData.ifscCode,
        },
      };

      const res = await api.put("/rider/profile", payload);
      if (res.data?.success) {
        toast.success("Rider details updated successfully!");
        setRiderProfile(res.data.data);
        setIsEditingRider(false);
      }
    } catch (error) {
      toast.error("Failed to update rider profile.");
    } finally {
      setRiderLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 p-6 space-y-8 max-w-4xl">
      <h2 className="text-2xl font-bold text-base-content border-b pb-2 flex items-center gap-2">
        ⚙️ Rider Settings & Documents
      </h2>

      {/* Rider Account Section */}
      <div className="card bg-base-100 border border-base-200 p-6 rounded-2xl shadow-xs">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <img
              src={user?.photo || "https://placehold.co/100x100?text=Rider"}
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
            <h3 className="text-lg font-bold text-base-content">Rider Account Details</h3>
            <p className="text-xs text-secondary">Manage your profile picture, name, and contact information.</p>
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
                  onChange={(e) => setUserFormData(p => ({ ...p, fullName: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Phone Number</label>
                <input
                  type="text"
                  value={userFormData.phone}
                  onChange={(e) => setUserFormData(p => ({ ...p, phone: e.target.value }))}
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

      {/* Vehicle and Settlement section */}
      <div className="card bg-base-100 border border-base-200 p-6 rounded-2xl shadow-xs">
        <h3 className="text-lg font-bold text-base-content border-b pb-2 mb-4 flex items-center gap-2">
          <FaMotorcycle className="text-primary" /> Vehicle & Settlement Details
        </h3>

        {isEditingRider ? (
          <form onSubmit={handleRiderSubmit} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-4">
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Vehicle Type</label>
                <select
                  value={riderFormData.vehicleType}
                  onChange={(e) => setRiderFormData(p => ({ ...p, vehicleType: e.target.value }))}
                  className="select select-bordered select-sm w-full rounded-lg bg-base-100 text-xs"
                >
                  <option value="bicycle">Bicycle</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="scooter">Scooter</option>
                  <option value="car">Car</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Vehicle Number</label>
                <input
                  type="text"
                  value={riderFormData.vehicleNumber}
                  onChange={(e) => setRiderFormData(p => ({ ...p, vehicleNumber: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  placeholder="e.g. MP-04-AB-1234"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Vehicle Model</label>
                <input
                  type="text"
                  value={riderFormData.vehicleModel}
                  onChange={(e) => setRiderFormData(p => ({ ...p, vehicleModel: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  placeholder="e.g. Pulsar 150"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Vehicle Color</label>
                <input
                  type="text"
                  value={riderFormData.vehicleColor}
                  onChange={(e) => setRiderFormData(p => ({ ...p, vehicleColor: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  placeholder="e.g. Black"
                  required
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Driving License No.</label>
                <input
                  type="text"
                  value={riderFormData.drivingLicense}
                  onChange={(e) => setRiderFormData(p => ({ ...p, drivingLicense: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Aadhar Card Number</label>
                <input
                  type="text"
                  value={riderFormData.aadharCard}
                  onChange={(e) => setRiderFormData(p => ({ ...p, aadharCard: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">RC Certificate ID</label>
                <input
                  type="text"
                  value={riderFormData.vehicleRegistrationCertificate}
                  onChange={(e) => setRiderFormData(p => ({ ...p, vehicleRegistrationCertificate: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">PAN Card Number</label>
                <input
                  type="text"
                  value={riderFormData.panCard}
                  onChange={(e) => setRiderFormData(p => ({ ...p, panCard: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  required
                />
              </div>
            </div>

            <div className="bg-blue-50/50 p-4 rounded-xl border border-dashed border-blue-200 space-y-3">
              <h4 className="font-bold text-sm text-blue-800 flex items-center gap-1"><FaUniversity /> Banking Account Details</h4>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-secondary mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={riderFormData.bankName}
                    onChange={(e) => setRiderFormData(p => ({ ...p, bankName: e.target.value }))}
                    className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-secondary mb-1">Account Number</label>
                  <input
                    type="text"
                    value={riderFormData.accountNumber}
                    onChange={(e) => setRiderFormData(p => ({ ...p, accountNumber: e.target.value }))}
                    className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-secondary mb-1">IFSC Code</label>
                  <input
                    type="text"
                    value={riderFormData.ifscCode}
                    onChange={(e) => setRiderFormData(p => ({ ...p, ifscCode: e.target.value }))}
                    className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Street Address</label>
                <input
                  type="text"
                  value={riderFormData.address}
                  onChange={(e) => setRiderFormData(p => ({ ...p, address: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">City</label>
                <input
                  type="text"
                  value={riderFormData.city}
                  onChange={(e) => setRiderFormData(p => ({ ...p, city: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">State</label>
                <input
                  type="text"
                  value={riderFormData.state}
                  onChange={(e) => setRiderFormData(p => ({ ...p, state: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary mb-1">Pin Code</label>
                <input
                  type="text"
                  value={riderFormData.pinCode}
                  onChange={(e) => setRiderFormData(p => ({ ...p, pinCode: e.target.value }))}
                  className="input input-bordered input-sm w-full rounded-lg bg-base-100 text-xs"
                  required
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button type="submit" disabled={riderLoading} className="btn btn-primary btn-sm text-xs text-white rounded-lg px-6">
                {riderLoading ? "Saving details..." : "Save Vehicle Setup"}
              </button>
              <button type="button" onClick={() => setIsEditingRider(false)} className="btn btn-sm btn-outline rounded-lg">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-xs text-secondary">
            <div className="grid gap-4 sm:grid-cols-2 bg-base-50 p-4 rounded-xl border">
              <div>
                <p className="font-bold text-base-content text-sm mb-2">Vehicle Details</p>
                <p><span className="font-bold text-base-content">Model:</span> {riderProfile?.vehicleDetails?.vehicleModel || "Unconfigured"}</p>
                <p><span className="font-bold text-base-content">Number:</span> {riderProfile?.vehicleDetails?.vehicleNumber || "Unconfigured"}</p>
                <p><span className="font-bold text-base-content">Vetting:</span> <span className="badge badge-neutral capitalize font-bold text-[9px]">{riderProfile?.status || "inactive"}</span></p>
              </div>
              <div>
                <p className="font-bold text-base-content text-sm mb-2">Banking Settlement Account</p>
                <p><span className="font-bold text-base-content">Bank:</span> {riderProfile?.financialDetails?.bankName || "Unconfigured"}</p>
                <p><span className="font-bold text-base-content">Account Number:</span> {riderProfile?.financialDetails?.accountNumber || "Unconfigured"}</p>
              </div>
            </div>

            <button onClick={() => setIsEditingRider(true)} className="btn btn-xs btn-primary text-white rounded-lg flex items-center gap-1 mt-4">
              <MdEdit /> Edit Onboarding Vehicle / Banking Data
            </button>
          </div>
        )}
      </div>

      <PasswordChangeModal open={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
    </div>
  );
};

export default RiderSetting;