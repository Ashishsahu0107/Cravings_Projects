import React, { useEffect, useState } from "react";
import api from "../../config/api.config.js";
import toast from "react-hot-toast";
import { FaFileAlt, FaCheckCircle, FaTimesCircle, FaTimes, FaStore, FaMotorcycle } from "react-icons/fa";

const AdminWishlist = () => {
  // Restaurant Vetting states
  const [restaurants, setRestaurants] = useState([]);
  const [restLoading, setRestLoading] = useState(true);
  const [selectedRest, setSelectedRest] = useState(null);

  // Rider Vetting states
  const [riders, setRiders] = useState([]);
  const [ridersLoading, setRidersLoading] = useState(true);
  const [selectedRider, setSelectedRider] = useState(null);

  const fetchData = async () => {
    try {
      const restRes = await api.get("/admin/restaurants");
      if (restRes.data?.success) setRestaurants(restRes.data.data || []);

      const ridersRes = await api.get("/admin/riders");
      if (ridersRes.data?.success) setRiders(ridersRes.data.data || []);
    } catch (e) {
      toast.error("Failed to load vetting queues.");
    } finally {
      setRestLoading(false);
      setRidersLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateRestStatus = async (restaurantId, newStatus) => {
    try {
      const res = await api.patch(`/admin/restaurants/${restaurantId}/status`, { status: newStatus });
      if (res.data?.success) {
        toast.success(`Restaurant is now ${newStatus}`);
        setRestaurants((prev) =>
          prev.map((r) => (r._id === restaurantId ? { ...r, status: newStatus } : r))
        );
        setSelectedRest(null);
      }
    } catch (e) {
      toast.error("Failed to update status.");
    }
  };

  const handleUpdateRiderStatus = async (riderId, newStatus) => {
    try {
      const res = await api.patch(`/admin/riders/${riderId}/status`, { status: newStatus });
      if (res.data?.success) {
        toast.success(`Rider status updated to ${newStatus}`);
        setRiders((prev) =>
          prev.map((r) => (r._id === riderId ? { ...r, status: newStatus } : r))
        );
        setSelectedRider(null);
      }
    } catch (e) {
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 p-6 space-y-10">
      
      {/* RESTAURANT VETTING QUEUE */}
      <div className="card border border-base-200 bg-base-100 p-6 rounded-2xl shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-base-content border-b pb-3 flex items-center gap-2">
          <FaStore className="text-primary" /> Vendor Vetting Queue
        </h2>

        {restLoading ? (
          <div className="text-center text-xs text-secondary py-6">Loading vendors list...</div>
        ) : restaurants.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-sm w-full text-xs text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Outlet</th>
                  <th className="py-2">Manager details</th>
                  <th className="py-2">City</th>
                  <th className="py-2">Verification</th>
                  <th className="py-2 text-right">Documents</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((r) => (
                  <tr key={r._id} className="border-b hover:bg-base-50/50">
                    <td className="py-3 font-bold text-base-content">{r.restaurantName}</td>
                    <td className="py-3">
                      <div>{r.managerId?.fullName || "Unassigned"}</div>
                      <div className="text-[10px] text-secondary">{r.managerId?.email || ""}</div>
                    </td>
                    <td className="py-3">{r.city}</td>
                    <td className="py-3">
                      <span className={`badge text-[9px] font-bold ${
                        r.status === "active" ? "badge-success text-white" :
                        r.status === "blocked" ? "badge-error text-white" : "badge-warning"
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button onClick={() => setSelectedRest(r)} className="btn btn-xs btn-outline rounded-lg flex items-center gap-1">
                        <FaFileAlt /> Inspect Docs
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-secondary py-6">No restaurants onboarded yet.</p>
        )}
      </div>

      {/* RIDER VETTING QUEUE */}
      <div className="card border border-base-200 bg-base-100 p-6 rounded-2xl shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-base-content border-b pb-3 flex items-center gap-2">
          <FaMotorcycle className="text-primary" /> Delivery Rider Vetting Queue
        </h2>

        {ridersLoading ? (
          <div className="text-center text-xs text-secondary py-6">Loading riders list...</div>
        ) : riders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-sm w-full text-xs text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Rider details</th>
                  <th className="py-2">Vehicle</th>
                  <th className="py-2">Address</th>
                  <th className="py-2">Vetting Status</th>
                  <th className="py-2 text-right">Documents</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((r) => (
                  <tr key={r._id} className="border-b hover:bg-base-50/50">
                    <td className="py-3 font-bold text-base-content">
                      <div>{r.riderId?.fullName || "Unassigned"}</div>
                      <div className="text-[10px] text-secondary font-medium">{r.riderId?.email || ""}</div>
                    </td>
                    <td className="py-3 capitalize">
                      {r.vehicleDetails?.vehicleType} ({r.vehicleDetails?.vehicleNumber})
                    </td>
                    <td className="py-3">{r.currentAddress?.city || "N/A"}</td>
                    <td className="py-3">
                      <span className={`badge text-[9px] font-bold ${
                        r.status === "active" ? "badge-success text-white" :
                        r.status === "blocked" ? "badge-error text-white" : "badge-warning"
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button onClick={() => setSelectedRider(r)} className="btn btn-xs btn-outline rounded-lg flex items-center gap-1">
                        <FaFileAlt /> Inspect Docs
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-secondary py-6">No delivery riders registered yet.</p>
        )}
      </div>

      {/* Restaurant Document Inspection Modal */}
      {selectedRest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-base-100 p-6 shadow-xl border max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h3 className="text-lg font-bold text-base-content">Inspect Documents: {selectedRest.restaurantName}</h3>
              <button onClick={() => setSelectedRest(null)} className="text-secondary hover:text-base-content"><FaTimes /></button>
            </div>
            
            <div className="space-y-4 text-xs text-secondary mb-6">
              <p><strong className="text-base-content text-sm">Business Identity Details:</strong></p>
              <p>• <strong>Legal Name:</strong> {selectedRest.documents?.legalName || "N/A"}</p>
              <p>• <strong>Company Type:</strong> {selectedRest.documents?.companyType || "N/A"}</p>
              
              <p className="border-t pt-2"><strong className="text-base-content text-sm">Settlement Bank Account:</strong></p>
              <p>• <strong>Bank:</strong> {selectedRest.financialDetails?.bankName || "N/A"}</p>
              <p>• <strong>Account Number:</strong> {selectedRest.financialDetails?.accountNumber || "N/A"}</p>
              <p>• <strong>IFSC Code:</strong> {selectedRest.financialDetails?.ifscCode || "N/A"}</p>

              <p className="border-t pt-2"><strong className="text-base-content text-sm">Compliance Certificates:</strong></p>
              <div className="grid grid-cols-2 gap-2 text-center">
                {selectedRest.documents?.gstCertificate ? (
                  <a href={selectedRest.documents.gstCertificate} target="_blank" rel="noreferrer" className="btn btn-outline btn-xs rounded">GST Certificate</a>
                ) : <span className="p-2 border bg-base-50 rounded">GST Missing</span>}

                {selectedRest.documents?.fssaiCertificate ? (
                  <a href={selectedRest.documents.fssaiCertificate} target="_blank" rel="noreferrer" className="btn btn-outline btn-xs rounded">FSSAI License</a>
                ) : <span className="p-2 border bg-base-50 rounded">FSSAI Missing</span>}

                {selectedRest.documents?.panCard ? (
                  <a href={selectedRest.documents.panCard} target="_blank" rel="noreferrer" className="btn btn-outline btn-xs rounded col-span-2 mt-1">PAN Card Image</a>
                ) : null}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => handleUpdateRestStatus(selectedRest._id, "active")} className="btn btn-success btn-sm text-white rounded-lg flex-1">
                Approve Vendor (Active)
              </button>
              <button onClick={() => handleUpdateRestStatus(selectedRest._id, "blocked")} className="btn btn-error btn-sm text-white rounded-lg flex-1">
                Reject / Suspend
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rider Document Inspection Modal */}
      {selectedRider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-base-100 p-6 shadow-xl border max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h3 className="text-lg font-bold text-base-content">Inspect Rider Docs: {selectedRider.riderId?.fullName}</h3>
              <button onClick={() => setSelectedRider(null)} className="text-secondary hover:text-base-content"><FaTimes /></button>
            </div>
            
            <div className="space-y-4 text-xs text-secondary mb-6">
              <p><strong className="text-base-content text-sm">Vehicle & License Details:</strong></p>
              <p>• <strong>Model:</strong> {selectedRider.vehicleDetails?.vehicleModel} ({selectedRider.vehicleDetails?.vehicleColor})</p>
              <p>• <strong>Plate Number:</strong> {selectedRider.vehicleDetails?.vehicleNumber}</p>
              <p>• <strong>License ID:</strong> {selectedRider.documents?.drivingLicense || "N/A"}</p>

              <p className="border-t pt-2"><strong className="text-base-content text-sm">Settlement Bank Account:</strong></p>
              <p>• <strong>Bank:</strong> {selectedRider.financialDetails?.bankName || "N/A"}</p>
              <p>• <strong>Account Number:</strong> {selectedRider.financialDetails?.accountNumber || "N/A"}</p>
              <p>• <strong>IFSC Code:</strong> {selectedRider.financialDetails?.ifscCode || "N/A"}</p>

              <p className="border-t pt-2"><strong className="text-base-content text-sm">National Identity Documents:</strong></p>
              <p>• <strong>Aadhar Card Number:</strong> {selectedRider.documents?.aadharCard || "N/A"}</p>
              <p>• <strong>PAN Card Number:</strong> {selectedRider.documents?.panCard || "N/A"}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => handleUpdateRiderStatus(selectedRider._id, "active")} className="btn btn-success btn-sm text-white rounded-lg flex-1">
                Approve Rider (Active)
              </button>
              <button onClick={() => handleUpdateRiderStatus(selectedRider._id, "blocked")} className="btn btn-error btn-sm text-white rounded-lg flex-1">
                Reject / Suspend
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminWishlist;