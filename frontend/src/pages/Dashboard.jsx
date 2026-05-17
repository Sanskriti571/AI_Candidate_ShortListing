import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

const Dashboard = () => {

  const stats = [
    {
      title: "Total Candidates",
      value: "120",
      color: "text-blue-400",
    },

    {
      title: "AI Matches",
      value: "85",
      color: "text-green-400",
    },

    {
      title: "Shortlisted",
      value: "40",
      color: "text-pink-400",
    },

    {
      title: "Open Jobs",
      value: "12",
      color: "text-yellow-400",
    },
  ];

  const actions = [
    {
      title: "Add Candidates",
      desc: "Store and manage candidate profiles",
      path: "/candidates",
      color: "from-blue-500 to-cyan-500",
    },

    {
      title: "Match Candidates",
      desc: "Rank candidates based on skills",
      path: "/match",
      color: "from-green-500 to-emerald-500",
    },

    {
      title: "AI Recommendations",
      desc: "Get AI-powered candidate suggestions",
      path: "/ai",
      color: "from-pink-500 to-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="p-10">

        {/* HERO */}

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-10 shadow-2xl">

          <h1 className="text-6xl font-bold">
            SmartHire AI
          </h1>

          <p className="mt-5 text-lg max-w-3xl leading-8 text-blue-100">
            AI-powered candidate shortlisting system
            that helps recruiters intelligently rank
            candidates based on skills, experience,
            and AI recommendations.
          </p>
        </div>

        {/* QUICK ACTIONS */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold mb-8">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {actions.map((action, index) => (

              <Link
                key={index}
                to={action.path}
                className={`bg-gradient-to-r ${action.color} rounded-3xl p-8 shadow-xl hover:scale-105 transition-all duration-300`}
              >

                <h3 className="text-3xl font-bold">
                  {action.title}
                </h3>

                <p className="mt-4 text-lg text-white/90 leading-7">
                  {action.desc}
                </p>

              </Link>
            ))}
          </div>
        </div>

        {/* STATS */}

        <div className="mt-14">

          <h2 className="text-3xl font-bold mb-8">
            Recruitment Analytics
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {stats.map((item, index) => (

              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-lg hover:scale-105 transition-all duration-300"
              >

                <h3 className="text-slate-400 text-lg">
                  {item.title}
                </h3>

                <p className={`text-5xl font-bold mt-5 ${item.color}`}>
                  {item.value}
                </p>

              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}

        <div className="grid md:grid-cols-2 gap-10 mt-14">

          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

            <h2 className="text-3xl font-bold text-blue-400">
              Core Features
            </h2>

            <ul className="mt-8 space-y-5 text-lg text-slate-300">

              <li>
                ✔ Candidate Management
              </li>

              <li>
                ✔ Skill Matching Algorithm
              </li>

              <li>
                ✔ AI-based Shortlisting
              </li>

              <li>
                ✔ Match Score Analytics
              </li>

              <li>
                ✔ Recruiter Dashboard
              </li>

            </ul>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

            <h2 className="text-3xl font-bold text-green-400">
              AI Capabilities
            </h2>

            <ul className="mt-8 space-y-5 text-lg text-slate-300">

              <li>
                ✔ Intelligent candidate ranking
              </li>

              <li>
                ✔ AI recommendation explanations
              </li>

              <li>
                ✔ Semantic skill analysis
              </li>

              <li>
                ✔ Resume-based suggestions
              </li>

              <li>
                ✔ Experience evaluation
              </li>

            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;