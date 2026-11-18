
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight, FaBullhorn, FaChevronDown, FaChevronUp, FaCircle, FaExclamationTriangle, FaGlobe, FaHandPaper, FaHourglassHalf, FaInbox, FaPlus, FaRobot, FaSignOutAlt, FaSyncAlt, FaThLarge } from "react-icons/fa";

function AdminDashboard() {
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [showAdminProfile, setShowAdminProfile] = useState(false);

  // Admin Information
  const adminName =
    sessionStorage.getItem("adminName") || "Administrator";

  const adminEmail =
    sessionStorage.getItem("adminEmail") || "Email not available";

  const adminRole =
    sessionStorage.getItem("adminRole") || "admin";

  const adminInitial = adminName.charAt(0).toUpperCase();

  // Fetch Dashboard Data
  const fetchData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(
        "http://localhost:5000/api/notices"
      );

      if (!response.ok) {
        throw new Error("Unable to load dashboard data.");
      }

      const data = await response.json();

      setNotices(Array.isArray(data) ? data : []);

    } catch (err) {
      console.error("Dashboard error:", err);
      setError("Unable to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Admin Logout
  const handleLogout = async () => {
    const token = sessionStorage.getItem("adminToken");

    try {
      if (token) {
        const response = await fetch(
          "http://localhost:5000/api/admin/logout",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Server logout could not be confirmed.");
        }
      }
    } catch (err) {
      console.error("Logout API error:", err);
    } finally {
      sessionStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminLoggedIn");
      sessionStorage.removeItem("adminName");
      sessionStorage.removeItem("adminEmail");
      sessionStorage.removeItem("adminRole");

      navigate("/admin-login", { replace: true });
    }
  };

  // Statistics
  const highPriority = notices.filter(
    (notice) => notice.priority === "HIGH"
  ).length;

  const stats = [
    {
      title: "Total Notices",
      value: notices.length,
      icon: FaBullhorn,
      color: "bg-blue-500",
      light: "bg-blue-50",
      description: "All published notices",
    },
    {
      title: "High Priority",
      value: highPriority,
      icon: FaExclamationTriangle,
      color: "bg-red-500",
      light: "bg-red-50",
      description: "Urgent announcements",
    },
  ];

  // Recent Notices
  const recentNotices = [...notices]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 5);

  // Priority Badge
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-50 text-red-600 border-red-100";

      case "MEDIUM":
        return "bg-amber-50 text-amber-600 border-amber-100";

      default:
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
    }
  };

  // Date Formatting
  const formatDate = (date) => {
    if (!date) return "Recently";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Recently";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] md:flex">

      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-[#101a35] text-white md:min-h-screen md:fixed md:inset-y-0 flex flex-col">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 px-6 py-7 border-b border-white/10"
        >
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-2xl shadow-lg shadow-blue-900/40">
            <FaRobot />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-wide">
              SmartNotice AI
            </h1>

            <p className="text-xs text-slate-400">
              Administration Portal
            </p>
          </div>
        </Link>

        {/* Navigation Heading */}
        <div className="px-5 pt-8 pb-3">
          <p className="text-[11px] font-bold tracking-[2px] text-slate-500">
            MAIN MENU
          </p>
        </div>

        {/* Navigation */}
        <nav className="px-3 space-y-2 flex-1">

          <Link
            to="/admin"
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-950/30"
          >
            <FaThLarge />
            Dashboard
          </Link>

          <Link
            to="/admin/notices"
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition"
          >
            <FaBullhorn />
            Manage Notices
          </Link>

          <Link
            to="/admin/create-notice"
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition"
          >
            <FaPlus />
            Create Notice
          </Link>

          {/* Other */}
          <div className="pt-5">
            <p className="text-[11px] font-bold tracking-[2px] text-slate-500 px-2 pb-3">
              OTHER
            </p>

            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition"
            >
              <FaGlobe />
              Visit Website
            </Link>
          </div>

        </nav>

        {/* Sidebar Footer */}
        <div className="p-5 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-4">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                {adminInitial}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">
                  {adminName}
                </p>

                <p className="text-xs text-slate-400">
                  System Admin
                </p>
              </div>

            </div>
          </div>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 md:ml-64 p-5 md:p-8 lg:p-10">

        {/* TOP HEADER */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-9">

          <div>
            <p className="text-sm text-blue-600 font-semibold mb-2">
              OVERVIEW / DASHBOARD
            </p>

            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Admin Dashboard
            </h2>

            <p className="text-slate-500 mt-2">
              Manage your campus announcements and activities.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">

            {/* Refresh */}
            <button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl font-semibold hover:bg-slate-50 transition disabled:opacity-50"
            >
              <span>{refreshing ? <FaHourglassHalf /> : <FaSyncAlt />}</span>

              {refreshing ? "Refreshing..." : "Refresh"}
            </button>

            {/* CLICKABLE ADMIN PROFILE */}
            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setShowAdminProfile((prev) => !prev)
                }
                aria-expanded={showAdminProfile}
                className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-3 sm:px-4 py-2.5 hover:bg-blue-50 hover:border-blue-200 transition"
              >

                <div className="w-10 h-10 shrink-0 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  {adminInitial}
                </div>

                <div className="text-left max-w-[120px] sm:max-w-[150px]">
                  <p className="text-sm font-bold text-slate-800 truncate">
                    {adminName}
                  </p>

                  <p className="text-xs text-slate-500">
                    Administrator
                  </p>
                </div>

                <span className="text-slate-400 text-xs">
                  {showAdminProfile ? <FaChevronUp /> : <FaChevronDown />}
                </span>

              </button>

              {/* PROFILE DROPDOWN */}
              {showAdminProfile && (
                <>
                  {/* Close on outside click */}
                  <button
                    type="button"
                    aria-label="Close profile menu"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setShowAdminProfile(false)}
                  />

                  <div className="absolute right-0 top-full mt-3 w-[min(288px,calc(100vw-40px))] bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden">

                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-slate-900 to-blue-700 p-5 text-white">

                      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold mb-3">
                        {adminInitial}
                      </div>

                      <h3 className="font-bold text-lg break-words">
                        {adminName}
                      </h3>

                      <p className="text-blue-100 text-xs mt-1 break-all">
                        {adminEmail}
                      </p>

                    </div>

                    {/* Account Information */}
                    <div className="p-5 space-y-4">

                      <div>
                        <p className="text-xs font-semibold text-slate-400 tracking-wide">
                          FULL NAME
                        </p>

                        <p className="text-sm font-semibold text-slate-800 mt-1">
                          {adminName}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-400 tracking-wide">
                          EMAIL ADDRESS
                        </p>

                        <p className="text-sm font-semibold text-slate-800 mt-1 break-all">
                          {adminEmail}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-400 tracking-wide">
                          ACCOUNT ROLE
                        </p>

                        <p className="text-sm font-semibold text-slate-800 mt-1 capitalize">
                          {adminRole}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-400 tracking-wide">
                          ACCOUNT STATUS
                        </p>

                        <p className="text-sm font-semibold text-emerald-600 mt-1">
                          <span className="inline-flex items-center gap-2"><FaCircle className="text-[8px]" /> Logged In</span>
                        </p>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-slate-100 pt-4">

                        <button
                          type="button"
                          onClick={() => {
                            setShowAdminProfile(false);
                            handleLogout();
                          }}
                          className="w-full bg-red-50 text-red-600 hover:bg-red-100 rounded-xl py-3 font-semibold transition"
                        >
                          <span className="inline-flex items-center gap-2"><FaSignOutAlt /> Logout</span>
                        </button>

                      </div>

                    </div>
                  </div>
                </>
              )}

            </div>

            {/* Separate Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-50 text-red-600 border border-red-100 px-4 py-3 rounded-xl font-semibold hover:bg-red-100 transition"
            >
              Logout
            </button>

          </div>
        </header>

        {/* WELCOME BANNER */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#172c58] via-[#1d4ed8] to-[#2563eb] p-7 md:p-9 mb-8 shadow-xl shadow-blue-900/10">

          <div className="relative z-10 max-w-2xl">

            <p className="text-blue-100 text-sm font-semibold mb-3">
              SMARTNOTICE AI ADMIN PANEL
            </p>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              <span className="inline-flex items-center gap-2">Welcome back, {adminName}! <FaHandPaper className="text-amber-300" /></span>
            </h2>

            <p className="text-blue-100 mt-3 leading-relaxed">
              Your campus communication is in one place.
              Monitor notices, manage announcements and
              stay updated with important activities.
            </p>

            <Link
              to="/admin/create-notice"
              className="inline-flex items-center gap-2 mt-6 bg-white text-blue-700 px-5 py-3 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg"
            >
              + Create New Notice
            </Link>

          </div>

          <div className="absolute -right-10 -top-20 w-72 h-72 rounded-full bg-white/10" />

          <div className="absolute right-20 -bottom-36 w-72 h-72 rounded-full bg-white/10" />

          <div className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 text-8xl opacity-20 text-white">
            <FaRobot />
          </div>

        </section>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex flex-wrap justify-between items-center gap-3">

            <span>{error}</span>

            <button
              onClick={() => fetchData(true)}
              className="font-bold underline"
            >
              Try Again
            </button>

          </div>
        )}

        {/* STATISTICS */}
        <section className="mb-9">

          <div className="flex items-center justify-between mb-5">

            <div>
              <h3 className="text-xl font-bold text-slate-800">
                Dashboard Overview
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Your platform statistics at a glance
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {stats.map((stat) => (
              <div
                key={stat.title}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300"
              >

                <div className="flex items-center justify-between mb-5">

                  <div className={`w-12 h-12 ${stat.light} rounded-xl flex items-center justify-center text-2xl`}>
                    <stat.icon className="text-slate-700" />
                  </div>

                  <div className={`w-2 h-2 rounded-full ${stat.color}`} />

                </div>

                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h3 className="text-3xl font-extrabold text-slate-800 mt-2">
                  {loading ? "—" : stat.value}
                </h3>

                <p className="text-xs text-slate-400 mt-2">
                  {stat.description}
                </p>

              </div>
            ))}

          </div>
        </section>

        {/* RECENT NOTICES */}
        <section className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 mb-8">

          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">

            <div>
              <h3 className="text-xl font-bold text-slate-800">
                Recent Notices
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Latest announcements published on the platform
              </p>
            </div>

            <Link
              to="/admin/notices"
              className="text-sm font-bold text-blue-600 hover:text-blue-800"
            >
              <span className="inline-flex items-center gap-2">View All <FaArrowRight /></span>
            </Link>

          </div>

          {loading ? (
            <p className="text-slate-500 py-8 text-center">
              Loading notices...
            </p>
          ) : recentNotices.length === 0 ? (

            <div className="text-center py-12">

              <div className="text-4xl mb-3 flex justify-center text-slate-400">
                <FaInbox />
              </div>

              <p className="font-semibold text-slate-700">
                No notices available
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Create your first campus announcement.
              </p>

              <Link
                to="/admin/create-notice"
                className="inline-block mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700"
              >
                Create Notice
              </Link>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead>
                  <tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100">

                    <th className="py-4 pr-4 font-semibold">
                      Notice
                    </th>

                    <th className="py-4 px-4 font-semibold">
                      Category
                    </th>

                    <th className="py-4 px-4 font-semibold">
                      Priority
                    </th>

                    <th className="py-4 pl-4 font-semibold">
                      Published
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {recentNotices.map((notice) => (
                    <tr
                      key={notice._id || notice.id}
                      className="border-b border-slate-50 last:border-0 hover:bg-slate-50/80 transition"
                    >

                      <td className="py-5 pr-4">
                        <p className="font-semibold text-slate-800">
                          {notice.title}
                        </p>
                      </td>

                      <td className="py-5 px-4 text-sm text-slate-500">
                        {notice.category}
                      </td>

                      <td className="py-5 px-4">

                        <span className={`inline-flex items-center border px-3 py-1.5 rounded-full text-xs font-bold ${getPriorityStyle(notice.priority)}`}>
                          {notice.priority || "LOW"}
                        </span>

                      </td>

                      <td className="py-5 pl-4 text-sm text-slate-500 whitespace-nowrap">
                        {formatDate(notice.createdAt)}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </section>

        {/* FOOTER */}
        <footer className="text-center text-xs text-slate-400 mt-9 pb-4">
          © {new Date().getFullYear()} SmartNotice AI. All rights reserved.
        </footer>

      </main>
    </div>
  );
}

export default AdminDashboard;
