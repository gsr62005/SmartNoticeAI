import { FaBell, FaBrain, FaInbox, FaRobot } from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: FaInbox,
      title: "Collect Notices",
      description: "Notices are collected from websites, PDFs and other sources.",
    },
    {
      number: "02",
      icon: FaRobot,
      title: "AI Processing",
      description: "AI reads and processes the notice content automatically.",
    },
    {
      number: "03",
      icon: FaBrain,
      title: "Analyze & Summarize",
      description: "The system detects priority, category, duplicates and creates a summary.",
    },
    {
      number: "04",
      icon: FaBell,
      title: "Deliver Updates",
      description: "Students receive only relevant and important campus updates.",
    },
  ];

  return (
    <section className="bg-white py-20">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-gray-900">
          How SmartNotice AI Works
        </h2>

        <p className="text-center text-gray-500 mt-4">
          From scattered notices to smart, organized updates.
        </p>

        <div className="grid md:grid-cols-4 gap-8 mt-12">

          {steps.map((step) => (
            <div
              key={step.number}
              className="text-center"
            >

              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-3xl text-blue-600">
                <step.icon />
              </div>

              <p className="text-blue-600 font-bold mt-5">
                {step.number}
              </p>

              <h3 className="text-xl font-bold text-gray-800 mt-2">
                {step.title}
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;