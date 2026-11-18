import { FaBell, FaFileAlt, FaRobot, FaSearch } from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: FaRobot,
      title: "AI Summary",
      description:
        "Automatically converts long college notices into short and easy summaries.",
    },
    {
      icon: FaBell,
      title: "Smart Notifications",
      description:
        "Get important notices and deadlines without checking multiple platforms.",
    },
    {
      icon: FaFileAlt,
      title: "PDF & OCR",
      description:
        "Extract notice information from PDFs and scanned images automatically.",
    },
    {
      icon: FaSearch,
      title: "Duplicate Detection",
      description:
        "Detect repeated or similar notices from different sources.",
    },
  ];

  return (
    <section className="bg-white py-20">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-gray-900">
          Smart Features
        </h2>

        <p className="text-center text-gray-500 mt-4">
          Everything you need to manage college notices smarter.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >

              <div className="text-5xl text-blue-600">
                <feature.icon />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mt-5">
                {feature.title}
              </h3>

              <p className="text-gray-500 mt-3 leading-7">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;