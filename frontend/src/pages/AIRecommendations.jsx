import { useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";

const AIRecommendations = () => {
  const [response, setResponse] = useState("");

  const getRecommendation = async () => {
    const res = await API.post("/ai/shortlist", {
      requiredSkills: ["React", "Node.js"],
      minExperience: 2,
    });

    setResponse(res.data.recommendation);
  };
return (
    <div>
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold text-blue-400 mb-8">
          AI Recommendation
        </h1>

        <button
          onClick={getRecommendation}
          className="bg-blue-500 px-6 py-3 rounded-lg font-semibold"
        >
          Generate AI Recommendation
        </button>

        {response && (
          <div className="bg-slate-800 p-6 rounded-2xl mt-8 whitespace-pre-wrap leading-8">
            {response}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendations;