
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaRobot } from "react-icons/fa";
import API_BASE_URL from "../api";

function AdminRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    registrationKey: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.registrationKey.trim()) {
      setError("Admin registration key is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
            registrationKey: formData.registrationKey.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setSuccess("Admin account created successfully!");

      setTimeout(() => {
        navigate("/admin-login");
      }, 1200);

    } catch (err) {
      console.error("Admin Registration Error:", err);

      setError(
        err.message || "Unable to connect to the server."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl shadow-blue-900/10 overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-800 text-white text-center px-8 py-9">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-4xl mb-4 text-white">
            <FaRobot />
          </div>

          <h1 className="text-3xl font-extrabold">
            Admin Registration
          </h1>

          <p className="text-blue-100 mt-2 text-sm">
            Create your SmartNotice AI administrator account
          </p>
        </div>

        {/* Form */}
        <div className="p-7 md:p-9">

          <form onSubmit={handleRegister} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                required
                minLength={2}
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Admin Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 pr-20 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  required
                  minLength={8}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                required
                autoComplete="new-password"
              />
            </div>

            {/* Registration Key */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Admin Registration Key
              </label>

              <input
                type="password"
                name="registrationKey"
                value={formData.registrationKey}
                onChange={handleChange}
                placeholder="Enter authorized registration key"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                required
                autoComplete="off"
              />

              <p className="text-xs text-slate-400 mt-2">
                This key is provided by the system owner.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-xl">
                {success}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Admin Account"}
            </button>

          </form>

          {/* Login Link */}
          <div className="text-center mt-7 pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Already have an admin account?
            </p>

            <Link
              to="/admin-login"
              className="inline-block mt-2 font-bold text-blue-600 hover:text-blue-800"
            >
              <span className="inline-flex items-center gap-2">
                Login as Admin <FaArrowRight />
              </span>
            </Link>
          </div>

          {/* Back Home */}
          <div className="text-center mt-5">
            <Link
              to="/"
              className="text-sm text-slate-400 hover:text-blue-600"
            >
              <span className="inline-flex items-center gap-2">
                <FaArrowLeft /> Back to Home
              </span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
