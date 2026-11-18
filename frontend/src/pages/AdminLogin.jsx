
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid admin credentials"
        );
      }

      // Save JWT token
      sessionStorage.setItem("adminToken", data.token);
      sessionStorage.setItem("adminLoggedIn", "true");
      sessionStorage.setItem(
  "adminName",
  data.admin?.name || "Administrator"
);

sessionStorage.setItem(
  "adminEmail",
  data.admin?.email || ""
);

sessionStorage.setItem(
  "adminRole",
  data.admin?.role || "admin"
);

      navigate("/admin");

    } catch (error) {
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

        <div className="text-center mb-8">
          <div className="text-5xl mb-4 flex justify-center text-blue-600"><FaRobot /></div>

          <h1 className="text-3xl font-bold text-gray-800">
            Admin Login
          </h1>

          <p className="text-gray-500 mt-2">
            SmartNotice AI Administration
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block font-semibold mb-2">
              Admin Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>

        </form>

        <button
          onClick={() => navigate("/login")}
          className="w-full text-blue-600 mt-6 hover:underline"
        >
          Student Login
        </button>

      </div>
    </div>
  );
}

export default AdminLogin;
