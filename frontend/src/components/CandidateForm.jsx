import { useState } from "react";

import API from "../services/api";

const CandidateForm = ({
  fetchCandidates,
}) => {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      skills: "",
      experience: "",
      bio: "",
      projects: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await API.post(
        "/candidates",
        {
          ...formData,

          skills:
            formData.skills
              .split(","),

          projects:
            formData.projects
              .split(","),
        }
      );

      alert(
        "Candidate Added Successfully"
      );

      setFormData({
        name: "",
        email: "",
        skills: "",
        experience: "",
        bio: "",
        projects: "",
      });

      fetchCandidates();

    } catch (error) {

      alert(
        error.response.data.message
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-700">

      <h2 className="text-3xl font-bold text-blue-400 mb-6">
        Add Candidate
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Candidate Name"
          onChange={handleChange}
          className="w-full bg-slate-800 p-4 rounded-xl"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          className="w-full bg-slate-800 p-4 rounded-xl"
          required
        />

        <input
          type="text"
          name="skills"
          value={formData.skills}
          placeholder="React, Node.js, MongoDB"
          onChange={handleChange}
          className="w-full bg-slate-800 p-4 rounded-xl"
          required
        />

        <input
          type="number"
          name="experience"
          value={formData.experience}
          placeholder="Experience"
          onChange={handleChange}
          className="w-full bg-slate-800 p-4 rounded-xl"
          required
        />

        <textarea
          name="bio"
          value={formData.bio}
          placeholder="Bio"
          onChange={handleChange}
          className="w-full bg-slate-800 p-4 rounded-xl"
        />

        <textarea
          name="projects"
          value={formData.projects}
          placeholder="Projects separated by commas"
          onChange={handleChange}
          className="w-full bg-slate-800 p-4 rounded-xl"
        />

        <button
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 transition-all px-6 py-4 rounded-xl w-full font-bold"
        >
          {
            loading
            ? "Adding..."
            : "Add Candidate"
          }
        </button>
      </form>
    </div>
  );
};

export default CandidateForm;