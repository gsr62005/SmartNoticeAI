
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMagic } from "react-icons/fa";

function CreateNotice() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "LOW",
    summary: "",
  });

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [priorityLoading, setPriorityLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // AI Summary Generator
  const handleGenerateSummary = async () => {
    if (!formData.title.trim() || !formData.summary.trim()) {
      setMessage("Please enter notice title and description first.");
      setMessageType("error");
      return;
    }

    setAiLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/ai/summarize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({
            title: formData.title,
            content: formData.summary,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "AI summary generation failed");
      }

      setFormData((prev) => ({
        ...prev,
        summary: data.summary,
      }));

      setMessage("AI summary generated successfully!");
      setMessageType("success");

    } catch (error) {
      setMessage(error.message || "AI generation failed");
      setMessageType("error");
    } finally {
      setAiLoading(false);
    }
  };

  // AI Priority Detection
  const handleDetectPriority = async () => {
    if (!formData.title.trim() || !formData.summary.trim()) {
      setMessage("Please enter notice title and description first.");
      setMessageType("error");
      return;
    }

    setPriorityLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/ai/classify-priority",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({
            title: formData.title,
            content: formData.summary,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Priority detection failed");
      }

      setFormData((prev) => ({
        ...prev,
        priority: data.priority,
      }));

      setMessage(`AI detected priority: ${data.priority}`);
      setMessageType("success");

    } catch (error) {
      setMessage(error.message || "AI priority detection failed");
      setMessageType("error");
    } finally {
      setPriorityLoading(false);
    }
  };

  // Publish Notice
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/notices",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create notice");
      }

      setMessage("Notice published successfully!");
      setMessageType("success");

      setFormData({
        title: "",
        category: "",
        priority: "LOW",
        summary: "",
      });

      setTimeout(() => {
        navigate("/admin");
      }, 1500);

    } catch (error) {
      setMessage(error.message || "Something went wrong");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => navigate("/admin")}
          className="text-blue-600 font-semibold mb-6"
        >
          <span className="inline-flex items-center gap-2"><FaArrowLeft /> Back to Admin Dashboard</span>
        </button>

        <div className="bg-white p-8 rounded-xl shadow-sm">

          <h1 className="text-3xl font-bold text-gray-800">
            Create New Notice
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Publish a new notice for students.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Notice Title */}
            <div>
              <label className="block font-semibold mb-2">
                Notice Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter notice title"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block font-semibold mb-2">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                <option value="Examination">Examination</option>
                <option value="Academic">Academic</option>
                <option value="Placement">Placement</option>
                <option value="Events">Events</option>
                <option value="General">General</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block font-semibold mb-2">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>

              <button
                type="button"
                onClick={handleDetectPriority}
                disabled={
                  priorityLoading ||
                  aiLoading ||
                  !formData.title.trim() ||
                  !formData.summary.trim()
                }
                className="mt-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-3 rounded-lg disabled:opacity-50"
              >
                {priorityLoading
                  ? "Detecting Priority..."
                  : <span className="inline-flex items-center gap-2"><FaMagic /> AI Detect Priority</span>}
              </button>

              <p className="text-sm text-gray-500 mt-2">
                AI will automatically identify the notice priority.
              </p>
            </div>

            {/* Notice Description */}
            <div>
              <label className="block font-semibold mb-2">
                Notice Description
              </label>

              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Enter complete notice description"
                rows="6"
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="button"
                onClick={handleGenerateSummary}
                disabled={
                  aiLoading ||
                  priorityLoading ||
                  !formData.summary.trim()
                }
                className="mt-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-3 rounded-lg disabled:opacity-50"
              >
                {aiLoading
                  ? "Generating AI Summary..."
                  : <span className="inline-flex items-center gap-2"><FaMagic /> Generate AI Summary</span>}
              </button>

              <p className="text-sm text-gray-500 mt-2">
                AI will convert your notice description into a short summary.
              </p>
            </div>

            {/* Message */}
            {message && (
              <p
                className={`font-semibold ${
                  messageType === "error"
                    ? "text-red-600"
                    : messageType === "success"
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                {message}
              </p>
            )}

            {/* Publish Button */}
            <button
              type="submit"
              disabled={loading || aiLoading || priorityLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Notice"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNotice;
