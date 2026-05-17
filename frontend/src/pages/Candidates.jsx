import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";

import CandidateForm from "../components/CandidateForm";

import CandidateList from "../components/CandidateList";

const Candidates = () => {

  const [candidates, setCandidates] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const fetchCandidates =
    async () => {

      const res =
        await API.get(
          "/candidates"
        );

      setCandidates(res.data);
    };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const filteredCandidates =
    candidates.filter(
      (candidate) =>
        candidate.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div>

      <Navbar />

      <div className="p-10">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-5xl font-bold text-blue-400">
            Candidates
          </h1>

          <input
            type="text"
            placeholder="Search Candidate"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="bg-slate-800 p-4 rounded-xl w-80"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          <div>
            <CandidateForm
              fetchCandidates={
                fetchCandidates
              }
            />
          </div>

          <div className="lg:col-span-2">

            <CandidateList
              candidates={
                filteredCandidates
              }
              fetchCandidates={
                fetchCandidates
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candidates;