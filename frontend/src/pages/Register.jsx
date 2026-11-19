
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaGraduationCap,
  FaRobot,
  FaRocket,
  FaUserShield,
} from "react-icons/fa";

import API_BASE_URL from "../api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setIsError(false);

    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      setIsError(true);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage(
        "Registration successful! Redirecting to login..."
      );

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);

    } catch (error) {
      console.error("Registration Error:", error);

      setMessage(
        error.message || "Unable to connect to the server."
      );

      setIsError(true);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">

      <div className="bg-white w-full max-w-md p-7 sm:p-8 rounded-3xl shadow-xl">

        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 flex items-center justify-center text-4xl mb-4 text-blue-600">
            <FaRobot />
          </div>

          <h1 className="text-3xl font-extrabold text-slate-800">
            <span className="inline-flex items-center gap-2">
              Create Account
              <FaRocket className="text-blue-600" />
            </span>
          </h1>

          <p className="text-slate-500 mt-2">
            Join SmartNotice AI today
          </p>
        </div>

        {/* Account Type Selection */}
        <div className="mt-8">
          <p className="text-sm font-bold text-slate-700 mb-3">
            Choose your account type
          </p>

          <div className="grid grid-cols-2 gap-3">

            <div className="border-2 border-blue-600 bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2 flex justify-center text-blue-600">
                <FaGraduationCap />
              </div>

              <p className="font-bold text-blue-700">
                Student
              </p>

              <p className="text-xs text-blue-600 mt-1">
                Student Registration
              </p>
            </div>

            <Link
              to="/admin-register"
              className="border-2 border-slate-200 rounded-xl p-4 text-center hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <div className="text-3xl mb-2 flex justify-center text-slate-600">
                <FaUserShield />
              </div>

              <p className="font-bold text-slate-700">
                Admin
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Admin Registration
              </p>
            </Link>

          </div>
        </div>

        {/* Student Registration Form */}
        <form onSubmit={handleSubmit} className="mt-8">

          <div>
            <label className="block text-slate-700 font-semibold mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
              autoComplete="name"
              required
            />
          </div>

          <div className="mt-5">
            <label className="block text-slate-700 font-semibold mb-2">
              Student Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
              autoComplete="email"
              required
            />
          </div>

          <div className="mt-5">
            <label className="block text-slate-700 font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
              minLength={6}
              autoComplete="new-password"
              required
            />
          </div>

          {message && (
            <p
              className={`text-sm font-semibold mt-4 text-center ${
                isError ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl mt-7 hover:bg-blue-700 transition font-bold shadow-lg shadow-blue-600/20 disabled:opacity-50"
          >
            {loading ? (
              "Creating Account..."
            ) : (
              <span className="inline-flex items-center gap-2">
                Register as Student
                <FaArrowRight />
              </span>
            )}
          </button>

        </form>

        {/* Login Link */}
        <div className="text-center text-slate-500 mt-7">
          <p>Already have a student account?</p>

          <Link
            to="/login"
            className="inline-block mt-2 text-blue-600 font-bold hover:underline"
          >
            <span className="inline-flex items-center gap-2">
              Login as Student
              <FaArrowRight />
            </span>
          </Link>
        </div>

        <div className="text-center mt-6 pt-5 border-t border-slate-100">
          <Link
            to="/"
            className="text-sm text-slate-400 hover:text-blue-600 transition"
          >
            <span className="inline-flex items-center gap-2">
              <FaArrowLeft />
              Back to Home
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Register;
