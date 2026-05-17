import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <div className="bg-slate-950 border-b border-slate-800 px-10 py-5 flex justify-between items-center">

      <Link to="/">

        <h1 className="text-3xl font-bold text-blue-400">
          SmartHire AI
        </h1>

      </Link>

      <div className="flex gap-8 text-lg">

        <Link
          to="/"
          className="hover:text-blue-400 transition-all"
        >
          Dashboard
        </Link>

        <Link
          to="/candidates"
          className="hover:text-blue-400 transition-all"
        >
          Candidates
        </Link>

        <Link
          to="/match"
          className="hover:text-blue-400 transition-all"
        >
          Match
        </Link>

        <Link
          to="/ai"
          className="hover:text-blue-400 transition-all"
        >
          AI Recommendation
        </Link>

      </div>
    </div>
  );
};

export default Navbar;