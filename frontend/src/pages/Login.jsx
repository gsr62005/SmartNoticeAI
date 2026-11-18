
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaGraduationCap, FaHandPaper, FaRobot, FaUserShield } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
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
        throw new Error(data.message || "Login failed");
      }

      sessionStorage.setItem("studentToken", data.token);
      sessionStorage.setItem("studentLoggedIn", "true");
      sessionStorage.setItem("studentName", data.student.name);
      sessionStorage.setItem("studentEmail", data.student.email);

      window.dispatchEvent(new Event("authChanged"));

      setMessage("Student Login Successful!");

      navigate("/dashboard", { replace: true });

    } catch (error) {
      setMessage(error.message || "Something went wrong");
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
            <span className="inline-flex items-center gap-2">Welcome Back <FaHandPaper className="text-amber-500" /></span>
          </h1>

          <p className="text-slate-500 mt-2">
            Login to SmartNotice AI
          </p>
        </div>

        {/* Account Type Selection */}
        <div className="mt-8">
          <p className="text-sm font-bold text-slate-700 mb-3">
            Choose your account type
          </p>

          <div className="grid grid-cols-2 gap-3">

            <div className="border-2 border-blue-600 bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-3xl mb-2 flex justify-center text-blue-600"><FaGraduationCap /></div>
              <p className="font-bold text-blue-700">
                Student
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Student Login
              </p>
            </div>

            <Link
              to="/admin-login"
              className="border-2 border-slate-200 rounded-xl p-4 text-center hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <div className="text-3xl mb-2 flex justify-center text-slate-600"><FaUserShield /></div>
              <p className="font-bold text-slate-700">
                Admin
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Admin Login
              </p>
            </Link>

          </div>
        </div>

        {/* Student Login Form */}
        <form onSubmit={handleSubmit} className="mt-8">

          <div>
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
              placeholder="Enter your password"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition"
              autoComplete="current-password"
              required
            />
          </div>

          {message && (
            <p className="text-sm font-semibold mt-4 text-center text-red-600">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl mt-7 hover:bg-blue-700 transition font-bold shadow-lg shadow-blue-600/20 disabled:opacity-50"
          >
            {loading ? "Logging in..." : <span className="inline-flex items-center gap-2">Login as Student <FaArrowRight /></span>}
          </button>

        </form>

        {/* Registration Link */}
        <div className="text-center text-slate-500 mt-7">
          <p>
            Don't have a student account?{" "}
          </p>

          <Link
            to="/register"
            className="inline-block mt-2 text-blue-600 font-bold hover:underline"
          >
            <span className="inline-flex items-center gap-2">Register as Student <FaArrowRight /></span>
          </Link>
        </div>

        <div className="text-center mt-6 pt-5 border-t border-slate-100">
          <Link
            to="/"
            className="text-sm text-slate-400 hover:text-blue-600 transition"
          >
            <span className="inline-flex items-center gap-2"><FaArrowLeft /> Back to Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
