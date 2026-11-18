import { FaArrowRight } from "react-icons/fa";

function NoticePreview() {
  const notices = [
    {
      title: "Semester Examination Schedule",
      category: "Examination",
      priority: "HIGH",
      summary: "Semester examinations will begin from 15 August.",
    },
    {
      title: "Assignment Submission Deadline",
      category: "Academic",
      priority: "MEDIUM",
      summary: "Submit your pending assignments before 10 August.",
    },
    {
      title: "Campus Placement Drive",
      category: "Placement",
      priority: "LOW",
      summary: "A placement drive for final-year students will be held next week.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-gray-900">
          Latest Notices
        </h2>

        <p className="text-center text-gray-500 mt-4">
          Important campus updates, organized in one place.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">

          {notices.map((notice) => (
            <div
              key={notice.title}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >

              <div className="flex justify-between items-center">

                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                 {notice.category}
                </span>

                <span
                  className={`text-sm font-bold ${
                   notice.priority === "HIGH"
                      ? "text-red-500"
                      : notice.priority === "MEDIUM"
                      ? "text-orange-500"
                      : "text-green-500"
                  }`}
               >
                  {notice.priority}
               </span>

              </div>

              <h3 className="text-xl font-bold text-gray-800 mt-4">
                {notice.title}
              </h3>

              <p className="text-gray-500 mt-3 leading-7">
                {notice.summary}
              </p>

              <button className="text-blue-600 font-medium mt-5 hover:underline">
                <span className="inline-flex items-center gap-2">Read More <FaArrowRight /></span>
              </button>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default NoticePreview;