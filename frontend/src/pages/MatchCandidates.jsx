import { useState } from "react";
import axios from "axios";

import MatchCard from "../components/MatchCard";
import Charts from "../components/Charts";

const MatchCandidates = () => {

  const [requiredSkills, setRequiredSkills] =
    useState("");

  const [preferredSkills, setPreferredSkills] =
    useState("");

  const [minExperience, setMinExperience] =
    useState("");

  const [matches, setMatches] =
    useState([]);

  const handleMatch = async () => {

    try {

      const response = await axios.post(

        "https://ats-backend-080t.onrender.com/api/match",

        {

          requiredSkills:
            requiredSkills
              .split(",")
              .map(skill => skill.trim())
              .filter(skill => skill !== ""),

          preferredSkills:
            preferredSkills
              .split(",")
              .map(skill => skill.trim())
              .filter(skill => skill !== ""),

          minExperience:
            Number(minExperience) || 0,

        }
      );

      setMatches(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen bg-[#020617] text-white p-10">

      <h1 className="text-6xl font-bold text-blue-400 mb-10">
        Match Candidates
      </h1>

      <div className="bg-slate-800 p-6 rounded-3xl mb-10">

        <input
          type="text"
          placeholder="Required Skills (react,nodejs)"
          value={requiredSkills}
          onChange={(e) =>
            setRequiredSkills(
              e.target.value
            )
          }
          className="w-full p-4 rounded-xl bg-slate-700 mb-5 outline-none"
        />

        <input
          type="text"
          placeholder="Preferred Skills"
          value={preferredSkills}
          onChange={(e) =>
            setPreferredSkills(
              e.target.value
            )
          }
          className="w-full p-4 rounded-xl bg-slate-700 mb-5 outline-none"
        />

        <input
          type="number"
          placeholder="Minimum Experience"
          value={minExperience}
          onChange={(e) =>
            setMinExperience(
              e.target.value
            )
          }
          className="w-full p-4 rounded-xl bg-slate-700 mb-5 outline-none"
        />

        <button
          onClick={handleMatch}
          className="bg-blue-500 hover:bg-blue-600 transition px-8 py-4 rounded-xl font-bold"
        >
          Match Candidates
        </button>

      </div>

      {

        matches.length > 0 && (

          <>

            <div className="grid md:grid-cols-2 gap-8">

              {

                matches.map(
                  (candidate, index) => (

                    <MatchCard
                      key={index}
                      candidate={candidate}
                    />
                  )
                )

              }

            </div>

            <Charts data={matches} />

          </>

        )
      }

    </div>
  );
};

export default MatchCandidates;