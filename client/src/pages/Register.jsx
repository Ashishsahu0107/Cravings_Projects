import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const userTypes = ["customer", "restaurant", "rider"];

const Register = () => {
  const { userType = "customer" } = useParams();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(
    userTypes.includes(userType) ? userType : "customer"
  );
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="relative flex min-h-[90vh] items-center justify-end bg-[url('/commonBG.avif')] bg-cover bg-center p-6 md:p-10 md:pe-30">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-8 shadow-md md:p-10">
        <h1 className="text-center text-4xl font-semibold text-(--color-primary)">
          Create Account
        </h1>
        <p className="mb-5 text-center text-(--color-secondary)">
          Join us as a Customer, Restaurant, or Rider
        </p>
        {submitted && (
          <p className="mb-4 rounded-md bg-(--color-success) px-3 py-2 text-sm font-semibold text-white">
            Registration form submitted.
          </p>
        )}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <span className="mb-2 block font-medium">Register as:</span>
            <div className="flex flex-wrap gap-3">
              {userTypes.map((type) => (
                <label key={type} className="flex items-center gap-2 capitalize">
                  <input
                    type="radio"
                    name="userType"
                    value={type}
                    checked={selectedType === type}
                    onChange={(event) => setSelectedType(event.target.value)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
          <input className="rounded border border-(--color-primary) p-2 outline-none focus:outline-2 focus:outline-(--color-primary)" placeholder="Enter your full name" required />
          <input type="email" className="rounded border border-(--color-primary) p-2 outline-none focus:outline-2 focus:outline-(--color-primary)" placeholder="Enter your email" required />
          <input type="tel" className="rounded border border-(--color-primary) p-2 outline-none focus:outline-2 focus:outline-(--color-primary)" placeholder="Enter your mobile" required />
          <input type="password" className="rounded border border-(--color-primary) p-2 outline-none focus:outline-2 focus:outline-(--color-primary)" placeholder="Enter your password" required />
          <input type="password" className="rounded border border-(--color-primary) p-2 outline-none focus:outline-2 focus:outline-(--color-primary)" placeholder="Confirm your password" required />
          <label className="flex gap-2 text-sm">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
              required
            />
            <span>
              I agree to the{" "}
              <Link to="/terms-of-service" className="text-(--color-primary) hover:underline">
                terms and conditions.
              </Link>
            </span>
          </label>
          <button
            type="submit"
            disabled={!accepted}
            className="w-full rounded-md bg-(--color-primary) py-2 text-lg text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            Register
          </button>
          <p className="text-center">
            Already registered?{" "}
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
