const MatchCard = ({
  candidate,
}) => {

  return (

    <div className="bg-slate-800 p-6 rounded-2xl">

      <h2 className="text-3xl font-bold text-blue-400">
        {candidate.name}
      </h2>

      <p className="mt-4 text-white">
        Match Score
      </p>

      <div className="w-full bg-slate-600 rounded-full h-4 mt-3">

        <div
          className="bg-green-500 h-4 rounded-full"
          style={{
            width:
            `${candidate.finalScore}%`
          }}
        ></div>

      </div>

      <p className="mt-3 text-green-400 text-2xl font-bold">
        {candidate.finalScore}%
      </p>

      <p className="mt-2 text-slate-300">
        {candidate.category}
      </p>

    </div>
  );
};

export default MatchCard;