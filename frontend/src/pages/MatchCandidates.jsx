import { useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import MatchCard from "../components/MatchCard";
import Charts from "../components/Charts";

const MatchCandidates = () => {
  const [requiredSkills, setRequiredSkills] = useState("");
  const [minExperience, setMinExperience] = useState(0);

  const [results, setResults] = useState([]);

  const handleMatch = async () => {
    const res = await API.post("/match", {
      requiredSkills: requiredSkills.split(","),
      minExperience,
    });

    setResults(res.data);
  };
  return (
    <div>
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold text-blue-400 mb-8">
          Match Candidates
        </h1>

        <div className="bg-slate-800 p-6 rounded-2xl space-y-4">
          <input
            type="text"
            placeholder="React, Node.js"
            onChange={(e) => setRequiredSkills(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-700"
          />

          <input
            type="number"
            placeholder="Minimum Experience"
            onChange={(e) => setMinExperience(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-700"
          />
          <button
            onClick={handleMatch}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold"
          >
            Match Candidates
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-10">
          {results.map((candidate) => (
            <MatchCard
              key={candidate._id}
              candidate={candidate}
            />
          ))}
        </div>

        {results.length > 0 && <Charts data={results} />}
      </div>
    </div>
  );
};

export default MatchCandidates;