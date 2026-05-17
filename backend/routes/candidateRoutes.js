const express = require("express");

const router = express.Router();

const {
  addCandidate,
  getCandidates,
  deleteCandidate,
} = require(
  "../controllers/candidateController"
);

router.post("/", addCandidate);

router.get("/", getCandidates);

router.delete("/:id", deleteCandidate);

module.exports = router;