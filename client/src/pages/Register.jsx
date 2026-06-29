import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/api.config.js";

const Register = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    dob: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    console.log(event);
    // const name = event.target.name
   const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      phone: formData.phone.trim(),
      gender: formData.gender,
      dob: formData.dob,
    };

    console.log(payload)

      try {
        
        const response = await api.post("/auth/register", payload);
        
      } catch (err) {
        console.log(error.message);
        
      }
  };

  return (
    <main className="relative flex min-h-[90vh] items-center justify-end bg-[url('/commonBG.avif')] bg-cover bg-center p-6 md:p-10 md:pe-30">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-8 shadow-md md:p-10">
        <h1 className="text-center text-4xl font-semibold text-(--color-primary)">
          Create Account
        </h1>
        <p className="mb-5 text-center text-(--color-secondary)">
          Register to start ordering your cravings.
        </p>

        {message && (
          <p className="mb-4 rounded-md bg-(--color-success) px-3 py-2 text-sm font-semibold text-white">
            {message}
          </p>
        )}

        {error && (
          <p className="mb-4 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="rounded border border-(--color-primary) p-2 outline-none focus:outline-2 focus:outline-(--color-primary)"
            placeholder="Enter your full name"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="rounded border border-(--color-primary) p-2 outline-none focus:outline-2 focus:outline-(--color-primary)"
            placeholder="Enter your email"
            required
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="rounded border border-(--color-primary) p-2 outline-none focus:outline-2 focus:outline-(--color-primary)"
            placeholder="Enter your phone number"
            required
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="rounded border border-(--color-primary) p-2 outline-none focus:outline-2 focus:outline-(--color-primary)"
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="rounded border border-(--color-primary) p-2 outline-none focus:outline-2 focus:outline-(--color-primary)"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="rounded border border-(--color-primary) p-2 outline-none focus:outline-2 focus:outline-(--color-primary)"
            placeholder="Enter your password"
            required
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="rounded border border-(--color-primary) p-2 outline-none focus:outline-2 focus:outline-(--color-primary)"
            placeholder="Confirm your password"
            required
          />

          <label className="flex gap-2 text-sm">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
              required
            />
            <span>
              I agree to the{" "}
              <Link
                to="/terms-of-service"
                className="text-(--color-primary) hover:underline"
              >
                terms and conditions.
              </Link>
            </span>
          </label>

          <button
            type="submit"
            className="w-full rounded-md bg-(--color-primary) py-2 text-lg text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
          </button>

          <p className="text-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-(--color-primary)"
            >
              Login here
            </button>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
