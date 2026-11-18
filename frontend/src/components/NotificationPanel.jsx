
import { useEffect, useState } from "react";
import { FaBell, FaCheck } from "react-icons/fa";

function NotificationPanel() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch notifications from MongoDB
  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/notifications"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
      setNotifications(data);
    } catch (err) {
      console.error("Notification Error:", err);
      setError("Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Mark notification as read
  const handleRead = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notifications/${id}/read`,
        { method: "PATCH" }
      );

      if (!response.ok) {
        throw new Error("Unable to mark as read");
      }

      const updatedNotification = await response.json();

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id ? updatedNotification : item
        )
      );
    } catch (err) {
      console.error("Read Notification Error:", err);
      setError(err.message);
    }
  };

  // Delete notification
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notifications/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Unable to delete notification");
      }

      setNotifications((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.error("Delete Notification Error:", err);
      setError(err.message);
    }
  };

  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        Loading notifications...
      </div>
    );
  }

  return (
    <section className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900">
          <span className="inline-flex items-center gap-2"><FaBell className="text-blue-600" /> Notifications</span>
        </h1>

        <p className="text-gray-500 mt-2">
          Stay updated with important campus activities.
        </p>

        <div className="mt-4 bg-blue-50 text-blue-700 p-4 rounded-xl">
          Unread Notifications: <strong>{unreadCount}</strong>
        </div>

        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}

        <div className="mt-8 space-y-4">

          {notifications.length > 0 ? (
            notifications.map((notification) => (

              <div
                key={notification._id}
                className={`p-5 rounded-2xl shadow-sm hover:shadow-md transition ${
                  notification.isRead
                    ? "bg-gray-50"
                    : "bg-white"
                }`}
              >
                <div className="flex justify-between items-start gap-4">

                  <div>
                    <h2 className="font-bold text-gray-800 text-lg">
                      {notification.title}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {notification.message}
                    </p>

                    <p className="text-gray-400 text-sm mt-3">
                      {new Date(
                        notification.createdAt
                      ).toLocaleString("en-IN")}
                    </p>

                    {notification.isRead && (
                      <p className="text-green-600 text-sm mt-2 font-medium">
                        <span className="inline-flex items-center gap-2"><FaCheck /> Read</span>
                      </p>
                    )}

                    {!notification.isRead && (
                      <button
                        onClick={() => handleRead(notification._id)}
                        className="text-blue-600 text-sm font-medium mt-3 hover:underline"
                      >
                        Mark as Read
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(notification._id)}
                      className="text-red-500 text-sm font-medium mt-3 ml-4 hover:underline"
                    >
                      Delete
                    </button>
                  </div>

                  <span
                    className={
                      notification.type === "HIGH"
                        ? "text-red-500 font-bold"
                        : notification.type === "MEDIUM"
                        ? "text-orange-500 font-bold"
                        : "text-green-500 font-bold"
                    }
                  >
                    {notification.type}
                  </span>

                </div>
              </div>

            ))
          ) : (
            <div className="bg-white p-10 rounded-2xl text-center">
              <div className="text-5xl text-blue-600 flex justify-center"><FaBell /></div>

              <h2 className="text-xl font-bold mt-4">
                No Notifications
              </h2>

              <p className="text-gray-500 mt-2">
                You are all caught up!
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

export default NotificationPanel;
