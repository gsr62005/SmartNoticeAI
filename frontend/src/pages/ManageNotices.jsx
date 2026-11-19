
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import API_BASE_URL from "../api";

function ManageNotices() {
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "LOW",
    summary: "",
  });

  const fetchNotices = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/notices`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch notices");
      }

      setNotices(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleEdit = (notice) => {
    setEditingId(notice._id);

    setFormData({
      title: notice.title,
      category: notice.category,
      priority: notice.priority,
      summary: notice.summary,
    });

    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/notices/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update notice");
      }

      setMessage("Notice updated successfully!");
      setEditingId(null);

      setFormData({
        title: "",
        category: "",
        priority: "LOW",
        summary: "",
      });

      await fetchNotices();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/notices/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete notice");
      }

      setMessage("Notice deleted successfully!");
      await fetchNotices();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);

    setFormData({
      title: "",
      category: "",
      priority: "LOW",
      summary: "",
    });

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => navigate("/admin")}
          className="text-blue-600 font-semibold mb-6"
        >
          <span className="inline-flex items-center gap-2">
            <FaArrowLeft /> Back to Admin Dashboard
          </span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Notices
          </h1>

          <p className="text-gray-500 mt-2">
            View, edit and delete published notices.
          </p>
        </div>

        {message && (
          <div className="bg-blue-100 text-blue-700 p-4 rounded-lg mb-6">
            {message}
          </div>
        )}

        {editingId && (
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-xl shadow-sm mb-8 space-y-4"
          >
            <h2 className="text-xl font-bold text-gray-800">
              Edit Notice
            </h2>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Notice Title"
              className="w-full border rounded-lg p-3"
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">Select Category</option>
              <option value="Examination">Examination</option>
              <option value="Academic">Academic</option>
              <option value="Placement">Placement</option>
              <option value="Events">Events</option>
              <option value="General">General</option>
            </select>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>

            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Notice Description"
              rows="4"
              className="w-full border rounded-lg p-3"
              required
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Update Notice
              </button>

              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-200 px-6 py-3 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6">
            All Notices ({notices.length})
          </h2>

          {loading ? (
            <p>Loading notices...</p>
          ) : notices.length === 0 ? (
            <p className="text-gray-500">No notices found.</p>
          ) : (
            <div className="space-y-4">
              {notices.map((notice) => (
                <div
                  key={notice._id}
                  className="border rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">
                      {notice.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {notice.category}
                    </p>

                    <p className="text-sm text-gray-600 mt-2">
                      {notice.summary}
                    </p>

                    <span className="inline-block mt-3 text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">
                      {notice.priority}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(notice)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(notice._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageNotices;
