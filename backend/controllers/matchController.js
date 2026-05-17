const axios = require("axios");

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

    // Rule-based scoring

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
      );

    // AI Prompt

    const prompt = `

You are an expert AI recruiter.

Analyze candidates intelligently.

Do NOT rely only on exact keyword matching.

Understand:
- related technologies
- transferable skills
- frontend/backend ecosystem
- project relevance
- overall suitability

Job Requirements:

Required Skills:
${requiredSkills.join(", ")}

Preferred Skills:
${preferredSkills.join(", ")}

Minimum Experience:
${minExperience} years

Candidates:

${rankedCandidates.map((c) => `

Name:
${c.name}

Skills:
${c.skills.join(", ")}

Experience:
${c.experience}

Projects:
${(c.projects || []).join(", ")}

Bio:
${c.bio}

Rule Based Score:
${c.finalScore}

`).join("\n")}

IMPORTANT:
Return ONLY raw JSON.
Do not add markdown.
Do not add explanation text.
Do not use \`\`\`json
Format:

[
  {
    "name": "candidate name",
    "aiScore": 90,
    "reason":
    "short explanation"
  }
]

`;

    // OpenRouter Call

    const response =
      await axios.post(

        "https://openrouter.ai/api/v1/chat/completions",

        {

          model:
          "openai/gpt-4o-mini",

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],

        },

        {

          headers: {

            Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

            "Content-Type":
            "application/json",

          },

        }
      );

    let aiData = [];

try {

  const content =
    response.data
    .choices[0]
    .message.content;

  aiData =
    JSON.parse(content);

} catch (error) {

  console.log(
    "AI JSON Parse Failed"
  );

  aiData = [];
}

    // Combine Scores

    const finalResults =
      rankedCandidates.map(
        (candidate) => {

          const aiMatch =
            aiData.find(
              (a) =>
                a.name ===
                candidate.name
            );

          const aiScore =
            aiMatch?.aiScore || 0;

          // Final Hybrid Score

          const combinedScore =
            (
              candidate.finalScore * 0.6
            ) +
            (
              aiScore * 0.4
            );

          let category =
            "Low Match";

          if (
            combinedScore >= 80
          ) {
            category =
              "High Match";
          }

          else if (
            combinedScore >= 50
          ) {
            category =
              "Medium Match";
          }

          return {

            ...candidate,

            aiScore,

            finalScore:
            Math.round(
              combinedScore
            ),

            aiReason:
            aiMatch?.reason,

            category,
          };
        }
      )

      .sort(
        (a, b) =>
          b.finalScore -
          a.finalScore
      );

    res.json(
      finalResults
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
      "Matching failed",

    });
  }
};