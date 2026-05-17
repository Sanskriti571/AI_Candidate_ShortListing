const MatchCard = ({ candidate }) => {
  return (
    <div className="bg-slate-800 p-5 rounded-2xl shadow-lg border border-slate-700">
      <h2 className="text-2xl font-bold text-blue-400">
        {candidate.name}
      </h2>

      <p className="mt-3">
        Match Score:
      </p>

      <div className="w-full bg-slate-700 rounded-full h-4 mt-2">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{
            width: `${candidate.finalScore}%`,
          }}
        ></div>
      </div>

      <p className="mt-3 text-green-400 font-semibold">
        {candidate.finalScore.toFixed(0)}%
      </p>
    </div>
  );
};

export default MatchCard;