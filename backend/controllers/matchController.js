const Candidate = require("../models/Candidate");
const calculateMatch = require("../utils/matchLogic");

exports.matchCandidates = async (req, res) => {
  try {
    const { requiredSkills, minExperience } = req.body;

    const candidates = await Candidate.find();

    const ranked = candidates
      .map((candidate) =>
        calculateMatch(candidate, {
          requiredSkills,
          minExperience,
        })
      )
      .sort((a, b) => b.finalScore - a.finalScore);

    res.json(ranked);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};