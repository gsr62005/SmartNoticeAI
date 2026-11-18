
import { useNavigate } from "react-router-dom";
import { FaCog } from "react-icons/fa";

function Settings() {
  const navigate = useNavigate();

  const studentEmail = sessionStorage.getItem("studentEmail") || "Not available";
  const studentName = sessionStorage.getItem("studentName") || "Student";

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">

        <h1 className="text-3xl font-bold text-gray-800">
          <span className="inline-flex items-center gap-2">Student Settings <FaCog /></span>
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your student account.
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="font-semibold text-gray-700">
              Student Name
            </label>
            <p className="bg-gray-100 p-3 rounded-lg mt-2">
              {studentName}
            </p>
          </div>

          <div>
            <label className="font-semibold text-gray-700">
              Email Address
            </label>
            <p className="bg-gray-100 p-3 rounded-lg mt-2">
              {studentEmail}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Back to Dashboard
        </button>

      </div>
    </div>
  );
}

export default Settings;
