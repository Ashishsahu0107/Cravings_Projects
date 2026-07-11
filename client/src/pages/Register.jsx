import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../config/api.config.js";
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    userType: "",
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
    restaurantName: "",
    restaurantAddress: "",
    riderLicense: "",
    riderVehicleType: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role) => {
    setRegisterData((prev) => ({ ...prev, userType: role }));
    setError("");
  };

  const validateForm = () => {
    if (!registerData.userType) {
      setError("Please select a role");
      return false;
    }
    if (!registerData.fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!registerData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!registerData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!registerData.gender) {
      setError("Gender is required");
      return false;
    }
    if (!registerData.dob) {
      setError("Date of birth is required");
      return false;
    }
    if (!registerData.password) {
      setError("Password is required");
      return false;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (registerData.userType === "restaurant" && !registerData.restaurantName.trim()) {
      setError("Restaurant name is required");
      return false;
    }
    if (registerData.userType === "rider" && !registerData.riderVehicleType) {
      setError("Vehicle type is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      userType: registerData.userType,
      fullName: registerData.fullName.trim(),
      email: registerData.email.toLowerCase().trim(),
      phone: registerData.phone.trim(),
      gender: registerData.gender,
      dob: registerData.dob,
      password: registerData.password,
    };

    try {
      const res = await api.post("/auth/register", payload);

      toast.success('Registration Successful!');

      setRegisterData({
        userType: "",
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        password: "",
        confirmPassword: "",
        restaurantName: "",
        restaurantAddress: "",
        riderLicense: "",
        riderVehicleType: "",
      });

      navigate("/login");
    } catch (err) {
      toast.error("Registration Failed!");
      setError(err.response?.data?.message || "Registration Failed");
    }
  };

  const inputClass =
    "border border-primary p-2 rounded outline-none focus:ring-2 focus:ring-primary";

  const roleDescription = {
    customer: "Order food from restaurants near you",
    restaurant: "Start selling your food online",
    rider: "Earn money by delivering orders",
  };

  const roles = [
    { id: "customer", label: "Customer", icon: "🍽️" },
    { id: "restaurant", label: "Restaurant", icon: "🏪" },
    { id: "rider", label: "Rider", icon: "🚴" },
  ];

  return (
    <main className="min-h-[90vh] flex items-center justify-center bg-[url('/commonBG.avif')] bg-cover bg-center p-6">
      <div className="w-full max-w-2xl bg-base-100 rounded-lg shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-primary mb-2">
          Create Account
        </h1>

        <p className="text-center mb-8 text-secondary">
          Join us as a Customer, Restaurant, or Rider
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Role Selection */}
          <div>
            <label className="block font-semibold mb-3 text-gray-700">
              Register as:
            </label>
            <div className="grid grid-cols-3 gap-4">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleRoleSelect(role.id)}
                  className={`p-4 rounded-lg w-40 border-2 transition-all ${
                    registerData.userType === role.id
                      ? "border-primary bg-primary bg-opacity-10"
                      : "border-gray-300 hover:border-primary"
                  }`}
                >
                  <div className="text-3xl mb-2">{role.icon}</div>
                  <p className="font-semibold text-gray-800">{role.label}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {roleDescription[role.id]}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Common Fields */}
          {registerData.userType && (
            <>
              <div className="grid grid-cols-1 gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={registerData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={inputClass}
                    required
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={inputClass}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={registerData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={inputClass}
                    required
                  />
                </div>

                {/* Gender & DOB */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-gray-700">Gender</label>
                    <select
                      name="gender"
                      value={registerData.gender}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={registerData.dob}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Restaurant-Specific Fields */}
              {registerData.userType === "restaurant" && (
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Restaurant Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex flex-col gap-1">
                      <label className="font-semibold text-gray-700">Restaurant Name</label>
                      <input
                        type="text"
                        name="restaurantName"
                        value={registerData.restaurantName}
                        onChange={handleChange}
                        placeholder="Enter restaurant name"
                        className={inputClass}
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-semibold text-gray-700">
                        Restaurant Address
                      </label>
                      <input
                        type="text"
                        name="restaurantAddress"
                        value={registerData.restaurantAddress}
                        onChange={handleChange}
                        placeholder="Enter restaurant address"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Rider-Specific Fields */}
              {registerData.userType === "rider" && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Delivery Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex flex-col gap-1">
                      <label className="font-semibold text-gray-700">Vehicle Type</label>
                      <select
                        name="riderVehicleType"
                        value={registerData.riderVehicleType}
                        onChange={handleChange}
                        className={inputClass}
                        required
                      >
                        <option value="">Select Vehicle Type</option>
                        <option value="bicycle">Bicycle</option>
                        <option value="motorcycle">Motorcycle</option>
                        <option value="scooter">Scooter</option>
                        <option value="car">Car</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-semibold text-gray-700">License Number</label>
                      <input
                        type="text"
                        name="riderLicense"
                        value={registerData.riderLicense}
                        onChange={handleChange}
                        placeholder="Enter license number (optional)"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Password Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className={inputClass}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" required />
                <span className="text-sm text-gray-700">
                  I agree to the{" "}
                  <Link
                    to="/terms-of-service"
                    className="text-primary font-semibold hover:underline"
                  >
                    Terms & Conditions
                  </Link>
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Create Account
              </button>
            </>
          )}

          {/* Login Link */}
          <div className="text-center pt-4 border-t">
            <p className="text-gray-700">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>

        </form>

      </div>
    </main>
  );
};

export default Register;