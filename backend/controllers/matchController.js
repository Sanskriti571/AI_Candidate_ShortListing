const Candidate =
require("../models/Candidate");

const calculateMatch =
require("../utils/matchLogic");

exports.matchCandidates =
async (req, res) => {

  try {

    const {
      requiredSkills,
      preferredSkills,
      minExperience,
    } = req.body;

    const candidates =
      await Candidate.find();

    const rankedCandidates =
      candidates.map(
        (candidate) =>
          calculateMatch(
            candidate,
            {
              requiredSkills,
              preferredSkills,
              minExperience,
            }
          )
      )

      .sort(
        (a, b) =>
          b.finalScore -
          a.finalScore
      );

    res.json(
      rankedCandidates
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
      "Matching failed",

    });
  }
};