const Candidate = require("../models/Candidate");

exports.addCandidate = async (req, res) => {
  try {

    const {
      name,
      email,
      skills,
      experience,
      bio,
      projects,
    } = req.body;

    const existingCandidate =
      await Candidate.findOne({ email });

    if (existingCandidate) {
      return res.status(400).json({
        message: "Candidate already exists",
      });
    }

    const candidate =
      await Candidate.create({
        name,
        email,
        skills,
        experience,
        bio,
        projects,
      });

    res.status(201).json(candidate);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getCandidates = async (req, res) => {
  try {

    const candidates =
      await Candidate.find().sort({
        createdAt: -1,
      });

    res.json(candidates);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteCandidate = async (req, res) => {
  try {

    await Candidate.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Candidate deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};