const CandidateList = ({ candidates }) => {
  return (
    <div className="grid md:grid-cols-2 gap-5 mt-6">
      {candidates.map((candidate) => (
        <div
          key={candidate._id}
          className="bg-slate-800 p-5 rounded-2xl shadow-lg border border-slate-700 hover:scale-[1.02] transition-all duration-300"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-blue-400">
              {candidate.name}
            </h2>

            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
              {candidate.experience} yrs
            </span>
          </div>

          <p className="text-slate-300 mt-3">
            {candidate.email}
          </p>

          {candidate.bio && (
            <p className="text-slate-400 mt-4 leading-7">
              {candidate.bio}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-5">
            {candidate.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30"
              >
                {skill}
              </span>
            ))}
          </div>

          {candidate.projects?.length > 0 && (
            <div className="mt-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Projects
              </h3>

              <ul className="list-disc list-inside text-slate-400 space-y-1">
                {candidate.projects.map((project, index) => (
                  <li key={index}>{project}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CandidateList;