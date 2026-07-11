import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../config/api.config.js";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { setUser, setIsLogin } = useAuth();
  const navigate = useNavigate("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleForgotPasswordChange = (e) => {
    const { name, value } = e.target;
    setForgotPasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: loginData.email.toLowerCase(),
      password: loginData.password,
    };

    try {
      const res = await api.post("/auth/login", payload);

      toast.success(res.data.message);
      sessionStorage.setItem("UserData", JSON.stringify(res.data.data));
      setUser(res.data.data);
      setIsLogin(true);
      navigate("/user/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/forgot-password", {
        email: forgotPasswordData.email.toLowerCase(),
      });

      toast.success(res.data.message);
      setForgotPasswordStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not send OTP");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/reset-password", {
        email: forgotPasswordData.email.toLowerCase(),
        otp: forgotPasswordData.otp,
        newPassword: forgotPasswordData.newPassword,
        confirmNewPassword: forgotPasswordData.confirmPassword,
      });

      toast.success(res.data.message);
      setForgotPasswordOpen(false);
      setForgotPasswordStep(1);
      setForgotPasswordData({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not reset password");
    }
  };

  return (
    <>
      <div className='h-[90vh] bg-[url("/foodTable.webp")] bg-yellow-400 grid items-center justify-start bg-cover bg-center md:ps-30 '>
        <div className="bg-base-100 p-10 grid gap-8 rounded-md w-100">
          <div className="grid gap-3">
            <h1 className="text-4xl text-center font-semibold text-primary ">
              Welcome Back
            </h1>
            <p className="text-center">Login to your Cravings account</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid mb-4">
              <label htmlFor="email" className="mb-2 text-1xl">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleChange}
                className="border text-primary focus:outline-none focus:border-primary p-1 rounded"
              />
            </div>
            <div className="grid mb-4">
              <label htmlFor="password" className="mb-2 text-1xl">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleChange}
                className="border border-primary focus:outline-none focus:border-primary p-1 rounded"
              />
            </div>
            <div className="text-right">
              <div>
                <input type="radio" id="remeberme" name="rememberme2" /> <label htmlFor="remeberme">remember</label>
              </div>
              <button
                type="button"
                onClick={() => {
                  setForgotPasswordOpen(true);
                  setForgotPasswordStep(1);
                }}
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 mb-2 rounded-md bg-primary text-white text-lg"
            >
              Login
            </button>
            
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-17 border" />
              <p className="">Don't have an account?</p>
              <div className="w-17 border" />
            </div>
            <p className="text-center ">
              <Link to="/register" className="text-primary cursor-pointer">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>

      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-primary">
                {forgotPasswordStep === 1
                  ? "Forgot Password"
                  : "Reset Password"}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setForgotPasswordOpen(false);
                  setForgotPasswordStep(1);
                  setForgotPasswordData({
                    email: "",
                    otp: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {forgotPasswordStep === 1 ? (
              <form onSubmit={handleSendOtp} className="grid gap-4">
                <p className="text-sm text-gray-600">
                  Enter your email and we will send an OTP to reset your
                  password.
                </p>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={forgotPasswordData.email}
                  onChange={handleForgotPasswordChange}
                  className="border border-primary p-2 rounded"
                  required
                />
                <button
                  type="submit"
                  className="rounded bg-primary py-2 text-white"
                >
                  Send OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="grid gap-4">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={forgotPasswordData.otp}
                  onChange={handleForgotPasswordChange}
                  className="border border-primary p-2 rounded"
                  required
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New password"
                  value={forgotPasswordData.newPassword}
                  onChange={handleForgotPasswordChange}
                  className="border border-primary p-2 rounded"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={forgotPasswordData.confirmPassword}
                  onChange={handleForgotPasswordChange}
                  className="border border-primary p-2 rounded"
                  required
                />
                <button
                  type="submit"
                  className="rounded bg-primary py-2 text-white"
                >
                  Change Password
                </button>
                <button
                  type="button"
                  onClick={() => setForgotPasswordStep(1)}
                  className="text-sm text-primary"
                >
                  Back
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
