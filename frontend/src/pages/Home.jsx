
import { Link } from "react-router-dom";
import { FaArrowRight, FaBell, FaBolt, FaBookOpen, FaBookmark, FaBullhorn, FaCheck, FaGraduationCap, FaMagic, FaRobot, FaRocket, FaSearch } from "react-icons/fa";

function Home() {
  const features = [
    {
      icon: FaRobot,
      title: "AI-Powered Summaries",
      description:
        "Convert lengthy campus notices into short, easy-to-understand summaries.",
      color: "bg-blue-50",
    },
    {
      icon: FaBolt,
      title: "Smart Priority Detection",
      description:
        "Automatically identify high-priority announcements so important updates never get missed.",
      color: "bg-amber-50",
    },
    {
      icon: FaBell,
      title: "Instant Notifications",
      description:
        "Stay updated with notifications whenever new campus announcements are published.",
      color: "bg-purple-50",
    },
    {
      icon: FaBookOpen,
      title: "Centralized Notices",
      description:
        "Access academic, examination, placement and event announcements in one place.",
      color: "bg-emerald-50",
    },
    {
      icon: FaSearch,
      title: "Easy Search & Filters",
      description:
        "Find the exact announcement you need with simple search and category filters.",
      color: "bg-rose-50",
    },
    {
      icon: FaBookmark,
      title: "Save Important Notices",
      description:
        "Bookmark useful announcements and access them whenever you need.",
      color: "bg-indigo-50",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Publish Notices",
      description:
        "Administrators publish campus announcements through the admin dashboard.",
    },
    {
      number: "02",
      title: "AI Processes",
      description:
        "AI helps summarize notices and identify their priority level.",
    },
    {
      number: "03",
      title: "Stay Updated",
      description:
        "Students explore notices, receive updates and save important information.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white">

        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-32 -right-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-80 h-80 bg-indigo-600 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-14 items-center">

          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-200 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Intelligent Campus Notice Management
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mt-7">
              Your Campus.
              <br />
              Your Updates.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                One Smart Platform.
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mt-6 max-w-xl">
              Never miss an important campus announcement again.
              SmartNotice AI brings all your college updates together
              with intelligent summaries and smart priority detection.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-9">

              <Link
  to="/register"
  className="inline-block mt-8 bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl font-semibold transition"
>
  <span className="inline-flex items-center gap-2">Get Started <FaArrowRight /></span>
</Link>

              <Link
  to="/login"
  className="inline-block mt-8 bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl font-semibold transition"
>
  Login
</Link>

            </div>

            <div className="flex flex-wrap gap-6 mt-10 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2"><FaCheck className="text-emerald-400" /> AI-powered summaries</span>
              <span className="inline-flex items-center gap-2"><FaCheck className="text-emerald-400" /> Easy access</span>
              <span className="inline-flex items-center gap-2"><FaCheck className="text-emerald-400" /> Smart notifications</span>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">

            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />

            <div className="relative bg-white rounded-3xl p-5 sm:p-7 shadow-2xl shadow-black/30 text-slate-900 rotate-0 lg:rotate-2">

              <div className="flex justify-between items-center border-b border-slate-100 pb-5">
                <div>
                  <p className="text-xs text-slate-400">
                    SMARTNOTICE AI
                  </p>
                  <h3 className="font-bold text-xl mt-1">
                    Campus Overview
                  </h3>
                </div>

                <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center text-xl text-blue-600">
                  <FaRobot />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">

                <div className="bg-blue-50 rounded-2xl p-4">
                  <p className="text-xs text-slate-500">
                    Campus Notices
                  </p>
                  <h4 className="text-3xl font-bold text-blue-700 mt-2">
                    AI
                  </h4>
                  <p className="text-xs text-blue-600 mt-1">
                    Centralized updates
                  </p>
                </div>

                <div className="bg-red-50 rounded-2xl p-4">
                  <p className="text-xs text-slate-500">
                    Priority Alerts
                  </p>
                  <h4 className="text-3xl font-bold text-red-600 mt-2">
                    !
                  </h4>
                  <p className="text-xs text-red-500 mt-1">
                    Important first
                  </p>
                </div>

              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold">Latest Announcements</h4>
                  <span className="text-xs text-blue-600 font-semibold">
                    Smart Updates
                  </span>
                </div>

                <div className="space-y-3">

                  <div className="border border-slate-100 rounded-xl p-4 flex gap-3 items-start">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                      <FaBullhorn className="text-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">
                        Examination Announcement
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Important academic update
                      </p>
                      <span className="inline-block mt-2 text-[10px] bg-red-50 text-red-600 px-2 py-1 rounded-md font-bold">
                        HIGH PRIORITY
                      </span>
                    </div>
                  </div>

                  <div className="border border-slate-100 rounded-xl p-4 flex gap-3 items-start">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                      <FaGraduationCap className="text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">
                        Placement Updates
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        New campus opportunity
                      </p>
                      <span className="inline-block mt-2 text-[10px] bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md font-bold">
                        GENERAL UPDATE
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              <div className="mt-5 bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                <span className="text-xl text-blue-600"><FaMagic /></span>
                <p className="text-xs text-blue-800 font-medium">
                  AI makes campus communication smarter and simpler.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-50">

        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-2xl mx-auto">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">
              Powerful Features
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
              Everything Your Campus Needs
            </h2>

            <p className="text-slate-500 mt-4 leading-relaxed">
              A smarter way to manage, discover and stay informed
              about every important campus announcement.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition`}>
                  <feature.icon className="text-blue-600" />
                </div>

                <h3 className="font-bold text-lg mt-6">
                  {feature.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed mt-3">
                  {feature.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white">

        <div className="max-w-7xl mx-auto">

          <div className="text-center">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">
              Simple Process
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
              How SmartNotice AI Works
            </h2>

            <p className="text-slate-500 mt-4">
              Three simple steps to smarter campus communication.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-14">

            {steps.map((step) => (
              <div
                key={step.number}
                className="relative border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition"
              >
                <span className="text-5xl font-black text-blue-100">
                  {step.number}
                </span>

                <h3 className="text-xl font-bold mt-5">
                  {step.title}
                </h3>

                <p className="text-slate-500 leading-relaxed text-sm mt-3">
                  {step.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-slate-950 text-white">

        <div className="max-w-4xl mx-auto text-center">

          <div className="text-4xl flex justify-center"><FaRocket /></div>

          <h2 className="text-3xl sm:text-4xl font-extrabold mt-5">
            Make Campus Communication Smarter
          </h2>

          <p className="text-slate-400 mt-5 leading-relaxed">
            Join SmartNotice AI and experience a simpler,
            smarter way to stay connected with your campus.
          </p>

          <Link
            to="/register"
            className="inline-block mt-8 bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl font-semibold transition"
          >
            <span className="inline-flex items-center gap-2">Create Your Account <FaArrowRight /></span>
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/10 px-6 py-8 text-slate-400">

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-5">

          <div className="text-center sm:text-left">
            <h3 className="text-white font-bold text-lg">
              <span className="inline-flex items-center gap-2"><FaRobot /> SmartNotice AI</span>
            </h3>
            <p className="text-xs mt-1">
              Intelligent Campus Notice Management System
            </p>
          </div>

          <div className="flex gap-6 text-sm">
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>
            <Link to="/login" className="hover:text-white transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-white transition">
              Register
            </Link>
          </div>

          <p className="text-xs">
            © {new Date().getFullYear()} SmartNotice AI
          </p>

        </div>
      </footer>

    </div>
  );
}

export default Home;
