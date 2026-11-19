
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  FaArrowLeft,
  FaBookmark,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

import API_BASE_URL from "../api";

function NoticeDetails() {
  const { id } = useParams();

  const [notice, setNotice] = useState(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch Notice Details
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/notices`
        );

        if (!response.ok) {
          throw new Error("Unable to fetch notices");
        }

        const data = await response.json();

        const foundNotice = data.find(
          (item) => String(item._id) === String(id)
        );

        if (!foundNotice) {
          setError("Notice not found!");
          return;
        }

        setNotice(foundNotice);

        // Check Saved Status
        try {
          const savedResponse = await fetch(
            `${API_BASE_URL}/api/saved`
          );

          if (savedResponse.ok) {
            const savedData = await savedResponse.json();

            const isSaved = savedData.some(
              (item) =>
                String(item.noticeId?._id || item.noticeId) ===
                String(foundNotice._id)
            );

            setSaved(isSaved);
          }
        } catch (savedError) {
          console.error("Saved Status Error:", savedError);
        }
      } catch (err) {
        console.error("Notice Details Error:", err);
        setError("Unable to load notice. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [id]);

  // Save / Remove Notice
  const handleSave = async () => {
    if (!notice || saving) return;

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        saved
          ? `${API_BASE_URL}/api/saved/${notice._id}`
          : `${API_BASE_URL}/api/saved`,
        {
          method: saved ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          ...(saved
            ? {}
            : {
                body: JSON.stringify({
                  noticeId: notice._id,
                }),
              }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Operation failed");
      }

      setSaved(!saved);

      setMessage(
        saved
          ? "Notice removed from saved list!"
          : "Notice saved successfully!"
      );
    } catch (err) {
      console.error("Save Notice Error:", err);
      setMessage(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">
          Loading notice...
        </p>
      </div>
    );
  }

  // Error Screen
  if (error || !notice) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {error || "Notice Not Found"}
          </h1>

          <Link
            to="/dashboard"
            className="text-blue-600 mt-4 inline-block hover:underline"
          >
            <span className="inline-flex items-center gap-2">
              <FaArrowLeft /> Back to Dashboard
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">

        <Link
          to="/dashboard"
          className="text-blue-600 hover:underline"
        >
          <span className="inline-flex items-center gap-2">
            <FaArrowLeft /> Back to Dashboard
          </span>
        </Link>

        <div className="bg-white rounded-2xl shadow-md p-8 mt-6">

          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            {notice.category}
          </span>

          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {notice.title}
            </h1>

            <span
              className={
                notice.priority === "HIGH"
                  ? "text-red-500 font-bold"
                  : notice.priority === "MEDIUM"
                  ? "text-orange-500 font-bold"
                  : "text-green-500 font-bold"
              }
            >
              {notice.priority}
            </span>
          </div>

          <p className="text-gray-500 mt-4">
            <FaCalendarAlt className="inline mr-2 -mt-1" />
            Published:{" "}
            {notice.date
              ? notice.date
              : notice.createdAt
              ? new Date(notice.createdAt).toLocaleDateString("en-IN")
              : "Date not available"}
          </p>

          {/* Markdown-rendered AI Summary */}
          <div className="border-t border-gray-200 mt-6 pt-6">
            <h2 className="text-xl font-bold text-gray-800">
              Notice Summary
            </h2>

            <div className="mt-4 text-gray-700 leading-7 break-words">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold mt-5 mb-3">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-bold mt-5 mb-3">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-bold mt-4 mb-2">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-3">{children}</p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-gray-900">
                      {children}
                    </strong>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 mb-4 space-y-2">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="pl-1">{children}</li>
                  ),
                }}
              >
                {notice.summary || "No summary available."}
              </ReactMarkdown>
            </div>
          </div>

          {/* Save Notice Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className={`mt-8 px-6 py-3 rounded-xl transition ${
              saved
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            } ${saving ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {saving
              ? "Please wait..."
              : saved
              ? (
                <span className="inline-flex items-center gap-2">
                  <FaCheckCircle /> Notice Saved
                </span>
              )
              : (
                <span className="inline-flex items-center gap-2">
                  <FaBookmark /> Save Notice
                </span>
              )}
          </button>

          {message && (
            <p className="mt-3 text-sm text-gray-600">
              {message}
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default NoticeDetails;
