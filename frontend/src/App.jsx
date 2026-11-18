
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NoticeDetails from "./pages/NoticeDetails";
import Saved from "./pages/Saved";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

import AdminDashboard from "./pages/AdminDashboard";
import CreateNotice from "./pages/CreateNotice";
import ManageNotices from "./pages/ManageNotices";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRegister from "./pages/AdminRegister";

function StudentRoute({ children }) {
  const isStudentLoggedIn =
    sessionStorage.getItem("studentLoggedIn") === "true" &&
    !!sessionStorage.getItem("studentToken");

  if (!isStudentLoggedIn) {
    return <Login />;
  }

  return children;
}

function AppLayout() {
  const location = useLocation();

  const hideNavbar = [
  "/dashboard",
  "/saved",
  "/notifications",
  "/settings",
  "/admin",
  "/admin/create-notice",
  "/admin/notices",
  "/admin-login",
  "/admin-register"
].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-register" element={<AdminRegister />} />

        <Route
          path="/dashboard"
          element={
            <StudentRoute>
              <Dashboard />
            </StudentRoute>
          }
        />

        <Route
          path="/notice/:id"
          element={
            <StudentRoute>
              <NoticeDetails />
            </StudentRoute>
          }
        />

        <Route
          path="/saved"
          element={
            <StudentRoute>
              <Saved />
            </StudentRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <StudentRoute>
              <Notifications />
            </StudentRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <StudentRoute>
              <Settings />
            </StudentRoute>
          }
        />

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-notice"
          element={
            <ProtectedRoute>
              <CreateNotice />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/notices"
          element={
            <ProtectedRoute>
              <ManageNotices />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
