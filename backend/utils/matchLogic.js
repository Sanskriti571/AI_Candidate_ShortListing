const skillRelations = {

  react: [
    "nextjs",
    "redux",
    "frontend",
    "javascript",
    "mern",
  ],

  nodejs: [
    "express",
    "backend",
    "api",
    "mern",
  ],

  mongodb: [
    "mongoose",
    "nosql",
    "mern",
  ],

  express: [
    "nodejs",
    "backend",
    "api",
  ],

  nextjs: [
    "react",
    "frontend",
  ],

  mern: [
    "react",
    "nodejs",
    "mongodb",
    "express",
  ],
};


// Normalize Skills

function normalize(skill) {

  return skill
    .toLowerCase()
    .replace(/\s/g, "")
    .replace(/\./g, "");
}


// Check semantic relation

function isRelated(
  candidateSkill,
  requiredSkill
) {

  candidateSkill =
    normalize(candidateSkill);

  requiredSkill =
    normalize(requiredSkill);

  // Exact Match

  if (
    candidateSkill ===
    requiredSkill
  ) {
    return true;
  }

  // Related Skill Match

  if (
    skillRelations[
      requiredSkill
    ]?.includes(
      candidateSkill
    )
  ) {
    return true;
  }

  if (
    skillRelations[
      candidateSkill
    ]?.includes(
      requiredSkill
    )
  ) {
    return true;
  }

  return false;
}


function calculateMatch(
  candidate,
  job
) {

  const requiredSkills =
    job.requiredSkills.map(
      normalize
    );

  const preferredSkills =
    (job.preferredSkills || [])
    .map(normalize);

  const candidateSkills =
    candidate.skills.map(
      normalize
    );

  let matchedSkills = [];

  let score = 0;


  // REQUIRED SKILLS

  requiredSkills.forEach(
    (requiredSkill) => {

      const found =
        candidateSkills.find(
          (candidateSkill) =>
            isRelated(
              candidateSkill,
              requiredSkill
            )
        );

      if (found) {

        matchedSkills.push(
          found
        );

        score += 25;
      }
    }
  );


  // PREFERRED SKILLS BONUS

  preferredSkills.forEach(
    (preferredSkill) => {

      const found =
        candidateSkills.find(
          (candidateSkill) =>
            isRelated(
              candidateSkill,
              preferredSkill
            )
        );

      if (found) {

        score += 10;
      }
    }
  );


  // EXPERIENCE BONUS

  if (
    candidate.experience >=
    job.minExperience
  ) {

    score += 20;
  }


  // PROJECT ANALYSIS BONUS

  const projectText =
    (
      candidate.projects || []
    )
    .join(" ")
    .toLowerCase();

  if (
    projectText.includes(
      "ecommerce"
    )
  ) {
    score += 10;
  }

  if (
    projectText.includes(
      "dashboard"
    )
  ) {
    score += 10;
  }

  if (
    projectText.includes(
      "ai"
    )
  ) {
    score += 15;
  }


  // BIO ANALYSIS BONUS

  const bio =
    (
      candidate.bio || ""
    ).toLowerCase();

  if (
    bio.includes(
      "full stack"
    )
  ) {
    score += 15;
  }

  if (
    bio.includes(
      "frontend"
    )
  ) {
    score += 10;
  }

  if (
    bio.includes(
      "backend"
    )
  ) {
    score += 10;
  }


  // LIMIT SCORE

  if (score > 100) {
    score = 100;
  }


  // CATEGORY

  let category =
    "Low Match";

  if (score >= 80) {
    category =
      "High Match";
  }

  else if (
    score >= 50
  ) {
    category =
      "Medium Match";
  }


  return {

    ...candidate._doc,

    matchedSkills,

    finalScore: score,

    category,
  };
}

module.exports =
  calculateMatch;