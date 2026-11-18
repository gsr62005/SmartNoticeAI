
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBookmark, FaTrashAlt } from "react-icons/fa";

function Saved() {
  const [savedNotices, setSavedNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);

  // Fetch saved notices from MongoDB
  const fetchSavedNotices = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/saved"
      );

      if (!response.ok) {
        throw new Error("Unable to fetch saved notices");
      }

      const data = await response.json();

      setSavedNotices(data);
    } catch (err) {
      console.error("Saved Notices Error:", err);
      setError("Unable to load saved notices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedNotices();
  }, []);

  // Remove saved notice
  const handleRemove = async (noticeId) => {
    try {
      setRemovingId(noticeId);

      const response = await fetch(
        `http://localhost:5000/api/saved/${noticeId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove notice");
      }

      // Update UI without refreshing
      setSavedNotices((prev) =>
        prev.filter(
          (item) =>
            String(item.noticeId?._id) !== String(noticeId)
        )
      );

    } catch (err) {
      console.error("Remove Notice Error:", err);
      setError(err.message || "Unable to remove notice.");
    } finally {
      setRemovingId(null);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">
          Loading saved notices...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900">
          <span className="inline-flex items-center gap-2"><FaBookmark className="text-blue-600" /> Saved Notices</span>
        </h1>

        <p className="text-gray-500 mt-2">
          Notices you saved for later.
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mt-6">
            {error}
          </div>
        )}

        {/* Saved Notices */}
        {savedNotices.length > 0 ? (

          <div className="mt-8 space-y-5">

            {savedNotices.map((item) => {
              const notice = item.noticeId;

              if (!notice) return null;

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
                >

                  {/* Category and Priority */}
                  <div className="flex justify-between items-center gap-3">

                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {notice.category}
                    </span>

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

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-800 mt-4">
                    {notice.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-gray-500 mt-2">
                    {notice.summary}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-4 mt-5">

                    <Link
                      to={`/notice/${notice._id}`}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      <span className="inline-flex items-center gap-2">View Notice <FaArrowRight /></span>
                    </Link>

                    <button
                      onClick={() => handleRemove(notice._id)}
                      disabled={removingId === notice._id}
                      className="text-red-500 font-medium hover:underline disabled:opacity-50"
                    >
                      {removingId === notice._id
                        ? "Removing..."
                        : <span className="inline-flex items-center gap-2"><FaTrashAlt /> Remove</span>}
                    </button>

                  </div>

                </div>
              );
            })}

          </div>

        ) : (

          /* Empty State */
          <div className="bg-white rounded-2xl shadow-md p-10 mt-8 text-center">

            <div className="text-6xl flex justify-center text-blue-600">
              <FaBookmark />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              No Saved Notices
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't saved any notices yet.
            </p>

            <Link
              to="/dashboard"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl mt-6 hover:bg-blue-700 transition"
            >
              Explore Notices
            </Link>

          </div>

        )}

      </div>

    </div>
  );
}

export default Saved;
