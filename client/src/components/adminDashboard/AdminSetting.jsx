import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../config/api.config.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { MdOutlineAddAPhoto, MdEdit } from "react-icons/md";
import { FaLock, FaTrash, FaCommentAlt } from "react-icons/fa";
import PasswordChangeModal from "../commonModal/ChangePasswordModal.jsx";

const AdminSetting = () => {
  const { user, setUser } = useAuth();
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState(null);
  const [userFormData, setUserFormData] = useState({
    fullName: "",
    phone: "",
  });
  const [userLoading, setUserLoading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Contacts / Feedbacks states
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get("/admin/contacts");
      if (res.data?.success) {
        setFeedbacks(res.data.data || []);
      }
    } catch (e) {
      toast.error("Failed to load feedback messages.");
    } finally {
      setFeedbackLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setUserFormData({
        fullName: user.fullName || "",
        phone: user.phone || "",
      });
      fetchFeedbacks();
    }
  }, [user]);

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

  const handleDeleteFeedback = async (id) => {
    if (!window.confirm("Clear this feedback message?")) return;
    try {
      const res = await api.delete(`/admin/contacts/${id}`);
      if (res.data?.success) {
        toast.success("Feedback cleared.");
        setFeedbacks((prev) => prev.filter((f) => f._id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete feedback.");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 p-6 space-y-8 max-w-4xl">
      <h2 className="text-2xl font-bold text-base-content border-b pb-2 flex items-center gap-2">
        ⚙️ Settings & Feedback Submissions
      </h2>

      {/* Admin Profile Section */}
      <div className="card bg-base-100 border border-base-200 p-6 rounded-2xl shadow-xs">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <img
              src={user?.photo || "https://placehold.co/100x100?text=Admin"}
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
            <h3 className="text-lg font-bold text-base-content">Admin Profile Details</h3>
            <p className="text-xs text-secondary">Manage your avatar, name, and admin configurations.</p>
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

      {/* Public Contact Feedback submissions */}
      <div className="card bg-base-100 border border-base-200 p-6 rounded-2xl shadow-xs space-y-4">
        <h3 className="text-lg font-bold text-base-content border-b pb-2 flex items-center gap-2">
          <FaCommentAlt className="text-primary" /> Public Feedback Submissions
        </h3>

        {feedbackLoading ? (
          <div className="text-center text-xs text-secondary py-6">Loading submissions...</div>
        ) : feedbacks.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {feedbacks.map((f) => (
              <div key={f._id} className="card bg-base-100 border border-base-200 p-5 rounded-2xl flex flex-col justify-between shadow-xs hover-lift">
                <div>
                  <div className="flex items-center justify-between border-b pb-2 mb-2 text-xs">
                    <span className="font-bold text-base-content">{f.fullName}</span>
                    <span className="text-[10px] text-secondary">{new Date(f.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-[10px] text-primary font-bold">Subject: {f.subject}</p>
                  <p className="text-xs text-secondary mt-2 leading-relaxed italic bg-base-50 p-3 rounded-lg border border-dashed">
                    "{f.message}"
                  </p>
                  <div className="text-[10px] text-secondary mt-3">
                    <p>📧 Email: {f.email}</p>
                    <p>📞 Phone: {f.phone}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteFeedback(f._id)}
                  className="btn btn-error btn-outline btn-xs rounded-lg mt-4 text-[10px] self-end flex items-center gap-1 hover:text-white"
                >
                  <FaTrash size={10} /> Clear Message
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-secondary py-8 border border-dashed rounded-xl">No public feedback submissions registered.</p>
        )}
      </div>

      <PasswordChangeModal open={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
    </div>
  );
};

export default AdminSetting;