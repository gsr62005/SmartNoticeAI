
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaBell,
  FaChartLine,
  FaChevronDown,
  FaChevronUp,
  FaClipboardList,
  FaCog,
  FaExclamationCircle,
  FaHandPaper,
  FaHome,
  FaRegBookmark,
  FaRegStar,
  FaRobot,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";

import API_BASE_URL from "../api";

function Dashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const studentName =
    sessionStorage.getItem("studentName") || "Student";

  // Fetch Notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/notices`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }

        const data = await response.json();
        setNotices(data);
      } catch (err) {
        console.error("Notice Fetch Error:", err);
        setError("Unable to load notices. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Fetch Unread Notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/notifications`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          const unread = data.filter(
            (notification) => !notification.isRead
          );

          setUnreadCount(unread.length);
        }
      } catch (err) {
        console.error("Notification error:", err);
      }
    };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 10000);

    return () => clearInterval(interval);
  }, []);

  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem("studentToken");
    sessionStorage.removeItem("studentLoggedIn");
    sessionStorage.removeItem("studentName");
    sessionStorage.removeItem("studentEmail");

    window.dispatchEvent(new Event("authChanged"));
    navigate("/login", { replace: true });
  };

  const importantNotices = notices.filter(
    (notice) => notice.priority === "HIGH"
  );

  const categories = [
    "All",
    "Examination",
    "Academic",
    "Placement",
    "Events",
    "General",
  ];

  // Filter Notices
  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title?.toLowerCase().includes(search.toLowerCase()) ||
      notice.summary?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || notice.category === category;

    const matchesPriority =
      activeTab !== "Important" || notice.priority === "HIGH";

    return matchesSearch && matchesCategory && matchesPriority;
  });

  const sidebarItems = [
    { name: "Dashboard", icon: FaHome },
    { name: "Notices", icon: FaClipboardList },
    { name: "Important", icon: FaRegStar },
    { name: "Saved", icon: FaRegBookmark },
  ];

  // Sidebar Navigation
  const handleNavigation = (item) => {
    if (item === "Saved") {
      navigate("/saved");
      return;
    }

    setActiveTab(item);
    setSearch("");
    setCategory("All");
  };

  // Priority Styling
  const getPriorityStyle = (priority) => {
    if (priority === "HIGH") {
      return "bg-red-50 text-red-600 border-red-100";
    }

    if (priority === "MEDIUM") {
      return "bg-amber-50 text-amber-600 border-amber-100";
    }

    return "bg-emerald-50 text-emerald-600 border-emerald-100";
  };

  // Category Styling
  const getCategoryStyle = (categoryName) => {
    const styles = {
      Examination: "bg-violet-50 text-violet-700",
      Academic: "bg-blue-50 text-blue-700",
      Placement: "bg-emerald-50 text-emerald-700",
      Events: "bg-orange-50 text-orange-700",
      General: "bg-slate-100 text-slate-700",
    };

    return styles[categoryName] || "bg-blue-50 text-blue-700";
  };

  // Date Formatting
  const getDate = (date) => {
    if (!date) return "Recently published";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const upcomingCount = notices.filter(
    (notice) =>
      notice.createdAt &&
      new Date(notice.createdAt) >= new Date()
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">

      {/* SIDEBAR */}
      <aside className="w-full lg:w-64 lg:min-h-screen bg-slate-950 text-white flex flex-col shrink-0">

        {/* Clickable SmartNotice AI Branding */}
        <Link
          to="/"
          className="px-6 py-7 border-b border-white/10 flex items-center gap-3 group cursor-pointer"
          title="Go to Home Page"
        >
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-2xl shadow-lg shadow-blue-600/30 group-hover:scale-110 transition">
            <FaRobot />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition">
              SmartNotice AI
            </h1>

            <p className="text-xs text-slate-400">
              Intelligent Campus Portal
            </p>
          </div>
        </Link>

        {/* Sidebar Menu */}
        <div className="px-5 pt-7">

          <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-4">
            Main Menu
          </p>

          <nav className="flex flex-row lg:flex-col gap-2 flex-wrap">

            {sidebarItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.name)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === item.name
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                    : "text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="text-xl" />
                {item.name}
              </button>
            ))}

          </nav>
        </div>

        {/* Sidebar Bottom */}
        <div className="mt-auto p-5 hidden lg:block">

          <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
            <p className="text-sm font-semibold text-white">
              Stay Updated!
            </p>

            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Never miss important campus announcements.
            </p>
          </div>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-9">

        {/* TOP HEADER */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <p className="text-sm text-slate-500">
              Student Portal / {activeTab}
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {activeTab === "Dashboard"
                ? "Dashboard Overview"
                : activeTab === "Important"
                ? "Important Notices"
                : "Campus Notices"}
            </h2>
          </div>

          <div className="flex items-center gap-4">

            {/* NOTIFICATION BELL */}
            <Link
              to="/notifications"
              className="relative w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-xl hover:bg-blue-50 transition"
              title="Notifications"
            >
              <FaBell />

              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </Link>

            {/* STUDENT PROFILE */}
            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setShowProfileMenu((previous) => !previous)
                }
                className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-3 py-2 hover:border-blue-300 hover:shadow-sm transition cursor-pointer"
              >

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg">
                  {studentName.charAt(0).toUpperCase()}
                </div>

                {/* Name */}
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-slate-800">
                    {studentName}
                  </p>

                  <p className="text-xs text-slate-500">
                    Student Account
                  </p>
                </div>

                {/* Arrow */}
                <span className="text-slate-400 text-sm">
                  {showProfileMenu ? <FaChevronUp /> : <FaChevronDown />}
                </span>

              </button>

              {/* PROFILE DROPDOWN */}
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-3 w-60 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">

                  {/* Profile Information */}
                  <div className="px-4 py-4 bg-slate-50 border-b border-slate-100">

                    <p className="font-semibold text-sm text-slate-800">
                      {studentName}
                    </p>

                    <p className="text-xs text-slate-500 mt-1 break-all">
                      {sessionStorage.getItem("studentEmail") || ""}
                    </p>

                  </div>

                  {/* Settings */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate("/settings");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 transition"
                  >
                    <FaCog className="text-lg" />
                    Settings
                  </button>

                  <div className="border-t border-slate-100" />

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileMenu(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <FaSignOutAlt className="text-lg" />
                    Logout
                  </button>

                </div>
              )}

            </div>

          </div>
        </header>

        {/* WELCOME BANNER */}
        {activeTab === "Dashboard" && (
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 sm:p-9 text-white shadow-xl shadow-blue-900/10">

            <div className="relative z-10 max-w-xl">

              <p className="text-blue-100 text-sm font-medium">
                YOUR CAMPUS AT A GLANCE
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold mt-3">
                <span className="inline-flex items-center gap-2">
                  Welcome back, {studentName}!{" "}
                  <FaHandPaper className="text-amber-300" />
                </span>
              </h2>

              <p className="text-blue-100 mt-3 leading-relaxed">
                Stay informed with the latest campus announcements,
                academic updates and important notices.
              </p>

              <button
                onClick={() => handleNavigation("Notices")}
                className="mt-6 bg-white text-blue-700 px-5 py-3 rounded-xl font-semibold text-sm hover:bg-blue-50 transition shadow-lg"
              >
                <span className="inline-flex items-center gap-2">
                  Explore Notices <FaArrowRight />
                </span>
              </button>

            </div>

            <div className="absolute -right-12 -bottom-28 w-72 h-72 rounded-full border-[35px] border-white/10" />
            <div className="absolute right-20 -top-20 w-48 h-48 rounded-full bg-white/10" />

          </section>
        )}

        {/* STATISTICS */}
        {activeTab === "Dashboard" && (
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  Total Notices
                </p>

                <span className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                  <FaClipboardList />
                </span>
              </div>

              <h3 className="text-3xl font-bold text-slate-900 mt-4">
                {notices.length}
              </h3>

              <p className="text-xs text-slate-400 mt-2">
                Published campus announcements
              </p>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  High Priority
                </p>

                <span className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-xl">
                  <FaExclamationCircle />
                </span>
              </div>

              <h3 className="text-3xl font-bold text-slate-900 mt-4">
                {importantNotices.length}
              </h3>

              <p className="text-xs text-slate-400 mt-2">
                Notices requiring attention
              </p>

            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  Recent Updates
                </p>

                <span className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                  <FaChartLine />
                </span>
              </div>

              <h3 className="text-3xl font-bold text-slate-900 mt-4">
                {upcomingCount}
              </h3>

              <p className="text-xs text-slate-400 mt-2">
                Notices published today or later
              </p>

            </div>

          </section>
        )}

        {/* NOTICE SECTION */}
        <section className="mt-9">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {activeTab === "Important"
                  ? "High Priority Announcements"
                  : activeTab === "Notices"
                  ? "All Campus Notices"
                  : "Recent Announcements"}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Browse and explore the latest updates.
              </p>
            </div>

            <div className="relative w-full md:w-80">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <FaSearch />
              </span>

              <input
                type="text"
                placeholder="Search notices..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
              />

            </div>

          </div>

          {/* CATEGORY FILTERS */}
          {activeTab !== "Important" && (
            <div className="flex gap-2 mt-5 flex-wrap">

              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                    category === item
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {item}
                </button>
              ))}

            </div>
          )}

          {/* NOTICE LIST */}
          {loading ? (

            <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-12 text-center">
              <div className="w-9 h-9 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto" />

              <p className="text-slate-500 mt-4 text-sm">
                Loading campus notices...
              </p>
            </div>

          ) : error ? (

            <div className="mt-6 bg-white border border-red-100 rounded-2xl p-8 text-center">
              <p className="text-red-600 font-medium">
                {error}
              </p>
            </div>

          ) : (

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-6">

              {filteredNotices.length > 0 ? (

                filteredNotices.map((notice) => (

                  <article
                    key={notice._id}
                    className="group bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/60 transition-all duration-300"
                  >

                    <div className="flex flex-wrap items-center justify-between gap-3">

                      <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${getCategoryStyle(notice.category)}`}>
                        {notice.category}
                      </span>

                      <span className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${getPriorityStyle(notice.priority)}`}>
                        {notice.priority || "LOW"} PRIORITY
                      </span>

                    </div>

                    <h4 className="text-lg font-bold text-slate-900 mt-5 leading-snug group-hover:text-blue-700 transition">
                      {notice.title}
                    </h4>

                    <p className="text-sm text-slate-500 mt-3 leading-relaxed line-clamp-3">
                      {notice.summary}
                    </p>

                    <div className="flex items-center justify-between gap-3 border-t border-slate-100 mt-5 pt-4">

                      <span className="text-xs text-slate-400">
                        Published: {getDate(notice.createdAt)}
                      </span>

                      <Link
                        to={`/notice/${notice._id}`}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
                      >
                        <span className="inline-flex items-center gap-2">
                          Read Details <FaArrowRight />
                        </span>
                      </Link>

                    </div>

                  </article>

                ))

              ) : (

                <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-12 text-center">

                  <div className="text-5xl mb-4 flex justify-center text-slate-400">
                    <FaSearch />
                  </div>

                  <h4 className="text-lg font-bold text-slate-800">
                    No notices found
                  </h4>

                  <p className="text-sm text-slate-500 mt-2">
                    Try changing your search or category filter.
                  </p>

                  <button
                    onClick={() => {
                      setSearch("");
                      setCategory("All");
                    }}
                    className="mt-5 text-sm font-semibold text-blue-600 hover:underline"
                  >
                    Clear Filters
                  </button>

                </div>

              )}

            </div>
          )}

        </section>

        {/* FOOTER */}
        <footer className="mt-12 border-t border-slate-200 pt-5 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} SmartNotice AI. All rights reserved.
        </footer>

      </main>
    </div>
  );
}

export default Dashboard;
