import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../../config/api.config.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { Camera, User, Phone, Edit2, Lock, Bike, FileText, Building2, MapPin, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const RiderSettings = () => {
  const { user, setUser } = useAuth();
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [userFormData, setUserFormData] = useState({ fullName: "", phone: "" });
  const [userLoading, setUserLoading] = useState(false);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState(null);

  const [isEditingRider, setIsEditingRider] = useState(false);
  const [riderProfile, setRiderProfile] = useState(null);
  const [riderLoading, setRiderLoading] = useState(false);

  const [riderFormData, setRiderFormData] = useState({
    vehicleType: "motorcycle", vehicleNumber: "", vehicleModel: "", vehicleColor: "",
    drivingLicense: "", vehicleRegistrationCertificate: "", insuranceCertificate: "", aadharCard: "", panCard: "",
    bankName: "", accountNumber: "", ifscCode: "",
    address: "", city: "", state: "", pinCode: "", country: "India",
  });

  const fetchRiderProfile = async () => {
    try {
      const res = await api.get("/rider/profile");
      if (res.data?.success) setRiderProfile(res.data.data);
    } catch (e) {
      console.log("Rider profile not found yet.");
    }
  };

  useEffect(() => {
    if (user) {
      setUserFormData({ fullName: user.fullName || "", phone: user.phone || "" });
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
      if (selectedPhotoFile) payload.append("photo", selectedPhotoFile);

      const res = await api.put("/auth/profile", payload, { headers: { "Content-Type": "multipart/form-data" } });
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
        vehicleDetails: { vehicleType: riderFormData.vehicleType, vehicleNumber: riderFormData.vehicleNumber, vehicleModel: riderFormData.vehicleModel, vehicleColor: riderFormData.vehicleColor },
        documents: { drivingLicense: riderFormData.drivingLicense, vehicleRegistrationCertificate: riderFormData.vehicleRegistrationCertificate, insuranceCertificate: riderFormData.insuranceCertificate, aadharCard: riderFormData.aadharCard, panCard: riderFormData.panCard },
        currentAddress: { address: riderFormData.address, city: riderFormData.city, state: riderFormData.state, pinCode: riderFormData.pinCode, country: riderFormData.country },
        financialDetails: { bankName: riderFormData.bankName, accountNumber: riderFormData.accountNumber, ifscCode: riderFormData.ifscCode },
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

  const InputField = ({ label, icon: Icon, type = "text", value, onChange, disabled }) => (
    <div>
      <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />}
        <input
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full ${Icon ? 'pl-9' : 'pl-3'} pr-3 py-2.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-medium text-gray-800 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition disabled:opacity-50`}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto w-full pb-20 lg:pb-0 space-y-6">
      
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">Rider Settings</h1>
          <p className="text-sm font-medium text-gray-500">Manage your profile, vehicle, and documents.</p>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <img 
                src={selectedPhotoFile ? URL.createObjectURL(selectedPhotoFile) : (user?.photo || "https://api.dicebear.com/7.x/notionists/svg?seed=Rakesh")} 
                className="w-20 h-20 rounded-2xl object-cover bg-orange-100 border border-gray-200 dark:border-slate-700"
                alt="Profile"
              />
              {isEditingUser && (
                <label className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={24} />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => setSelectedPhotoFile(e.target.files?.[0])} />
                </label>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">Personal Information</h2>
              <p className="text-sm font-medium text-gray-500">Update your basic profile details.</p>
            </div>
          </div>
          {!isEditingUser && (
            <button onClick={() => setIsEditingUser(true)} className="p-2.5 bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:text-orange-500 rounded-xl transition border border-gray-200 dark:border-slate-700">
              <Edit2 size={18} />
            </button>
          )}
        </div>

        <form onSubmit={handleUserSubmit} className="grid sm:grid-cols-2 gap-6">
          <InputField label="Full Name" icon={User} value={isEditingUser ? userFormData.fullName : (user?.fullName || '')} onChange={(e) => setUserFormData({...userFormData, fullName: e.target.value})} disabled={!isEditingUser} />
          <InputField label="Phone Number" icon={Phone} value={isEditingUser ? userFormData.phone : (user?.phone || '')} onChange={(e) => setUserFormData({...userFormData, phone: e.target.value})} disabled={!isEditingUser} />
          
          {isEditingUser && (
            <div className="sm:col-span-2 flex gap-3 pt-4 border-t border-gray-100 dark:border-slate-800 mt-2">
              <button type="submit" disabled={userLoading} className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition shadow-lg shadow-orange-500/30">
                {userLoading ? "Saving..." : "Save Changes"}
              </button>
              <button type="button" onClick={() => setIsEditingUser(false)} className="px-6 py-2.5 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 transition">
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Vehicle & KYC */}
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2"><Bike size={20} className="text-orange-500" /> Vehicle & Settlement</h2>
            <p className="text-sm font-medium text-gray-500 mt-1">Manage your registered vehicle, documents, and banking.</p>
          </div>
          {!isEditingRider && (
            <button onClick={() => setIsEditingRider(true)} className="p-2.5 bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:text-orange-500 rounded-xl transition border border-gray-200 dark:border-slate-700">
              <Edit2 size={18} />
            </button>
          )}
        </div>

        <form onSubmit={handleRiderSubmit} className="space-y-8">
          
          {/* Vehicle */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-300 border-b border-gray-100 dark:border-slate-800 pb-2">Vehicle Details</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <InputField label="Vehicle Number" value={isEditingRider ? riderFormData.vehicleNumber : (riderProfile?.vehicleDetails?.vehicleNumber || '')} onChange={(e) => setRiderFormData({...riderFormData, vehicleNumber: e.target.value})} disabled={!isEditingRider} />
              <InputField label="Vehicle Model" value={isEditingRider ? riderFormData.vehicleModel : (riderProfile?.vehicleDetails?.vehicleModel || '')} onChange={(e) => setRiderFormData({...riderFormData, vehicleModel: e.target.value})} disabled={!isEditingRider} />
              <InputField label="Vehicle Color" value={isEditingRider ? riderFormData.vehicleColor : (riderProfile?.vehicleDetails?.vehicleColor || '')} onChange={(e) => setRiderFormData({...riderFormData, vehicleColor: e.target.value})} disabled={!isEditingRider} />
            </div>
          </div>

          {/* Docs */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-300 border-b border-gray-100 dark:border-slate-800 pb-2 flex items-center gap-2"><FileText size={16} className="text-blue-500" /> Documents & KYC</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <InputField label="Driving License" value={isEditingRider ? riderFormData.drivingLicense : (riderProfile?.documents?.drivingLicense || '')} onChange={(e) => setRiderFormData({...riderFormData, drivingLicense: e.target.value})} disabled={!isEditingRider} />
              <InputField label="Aadhar Card" value={isEditingRider ? riderFormData.aadharCard : (riderProfile?.documents?.aadharCard || '')} onChange={(e) => setRiderFormData({...riderFormData, aadharCard: e.target.value})} disabled={!isEditingRider} />
              <InputField label="PAN Card" value={isEditingRider ? riderFormData.panCard : (riderProfile?.documents?.panCard || '')} onChange={(e) => setRiderFormData({...riderFormData, panCard: e.target.value})} disabled={!isEditingRider} />
              <InputField label="RC Book" value={isEditingRider ? riderFormData.vehicleRegistrationCertificate : (riderProfile?.documents?.vehicleRegistrationCertificate || '')} onChange={(e) => setRiderFormData({...riderFormData, vehicleRegistrationCertificate: e.target.value})} disabled={!isEditingRider} />
            </div>
          </div>

          {/* Banking */}
          <div className="p-5 bg-green-50 dark:bg-green-500/5 border border-green-100 dark:border-green-500/20 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-green-700 dark:text-green-500 flex items-center gap-2"><Building2 size={16} /> Settlement Bank Account</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <InputField label="Bank Name" value={isEditingRider ? riderFormData.bankName : (riderProfile?.financialDetails?.bankName || '')} onChange={(e) => setRiderFormData({...riderFormData, bankName: e.target.value})} disabled={!isEditingRider} />
              <InputField label="Account Number" value={isEditingRider ? riderFormData.accountNumber : (riderProfile?.financialDetails?.accountNumber || '')} onChange={(e) => setRiderFormData({...riderFormData, accountNumber: e.target.value})} disabled={!isEditingRider} />
              <InputField label="IFSC Code" value={isEditingRider ? riderFormData.ifscCode : (riderProfile?.financialDetails?.ifscCode || '')} onChange={(e) => setRiderFormData({...riderFormData, ifscCode: e.target.value})} disabled={!isEditingRider} />
            </div>
          </div>

          {isEditingRider && (
            <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
              <button type="submit" disabled={riderLoading} className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition shadow-lg shadow-orange-500/30">
                {riderLoading ? "Saving..." : "Save Vehicle & KYC"}
              </button>
              <button type="button" onClick={() => setIsEditingRider(false)} className="px-6 py-2.5 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 transition">
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

    </div>
  );
};

export default RiderSettings;
