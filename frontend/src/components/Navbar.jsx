
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBell, FaRobot } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("studentLoggedIn") === "true" &&
    !!sessionStorage.getItem("studentToken")
  );

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const updateAuth = () => {
      const loggedIn =
        sessionStorage.getItem("studentLoggedIn") === "true" &&
        !!sessionStorage.getItem("studentToken");

      setIsLoggedIn(loggedIn);
    };

    window.addEventListener("authChanged", updateAuth);
    window.addEventListener("storage", updateAuth);

    return () => {
      window.removeEventListener("authChanged", updateAuth);
      window.removeEventListener("storage", updateAuth);
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setUnreadCount(0);
      return;
    }

    const fetchUnreadCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/notifications"
        );

        const data = await response.json();

        if (response.ok && Array.isArray(data)) {
          setUnreadCount(
            data.filter((notification) => !notification.isRead).length
          );
        }
      } catch (error) {
        console.error("Notification count error:", error);
      }
    };

    fetchUnreadCount();

    const interval = setInterval(fetchUnreadCount, 10000);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleLogout = () => {
    sessionStorage.removeItem("studentToken");
    sessionStorage.removeItem("studentLoggedIn");
    sessionStorage.removeItem("studentName");
    sessionStorage.removeItem("studentEmail");

    setIsLoggedIn(false);
    setUnreadCount(0);

    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4">
      <div className="flex items-center justify-between">

        <Link to="/" className="text-2xl font-bold text-blue-600">
          <span className="inline-flex items-center gap-2"><FaRobot /> SmartNotice AI</span>
        </Link>

        <div className="flex gap-6 items-center">

          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Link>

              <Link
                to="/notifications"
                className="relative text-xl hover:text-blue-600"
              >
                <FaBell />

                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </Link>

              <Link
                to="/settings"
                className="text-gray-700 hover:text-blue-600"
              >
                Settings
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-600"
              >
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
