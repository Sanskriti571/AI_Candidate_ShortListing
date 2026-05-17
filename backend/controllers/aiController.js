const axios = require("axios");

const Candidate =
require("../models/Candidate");

exports.aiShortlist =
async (req, res) => {

  try {

    const candidates =
      await Candidate.find();

    const prompt = `

You are an AI recruitment assistant.

Analyze candidates intelligently for a software development role.

Do NOT rely only on exact keyword matching.

Consider:
- related technologies
- transferable skills
- project relevance
- candidate bio
- overall suitability
- semantic understanding of skills

Examples:
- MERN implies React + Node.js
- Next.js belongs to React ecosystem
- Express.js indicates backend development
- MongoDB indicates NoSQL backend knowledge

Candidates:

${candidates.map((c) => `

Name: ${c.name}

Skills:
${c.skills.join(", ")}

Experience:
${c.experience} years

Bio:
${c.bio}

Projects:
${c.projects.join(", ")}

`).join("\n")}

Tasks:
1. Rank the top candidates
2. Explain why each candidate is suitable
3. Mention strengths and weaknesses
4. Recommend the best fit candidate

`;


    const response =
      await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",

        {
          model:
            "openai/gpt-3.5-turbo",

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

    res.json({
      recommendation:
        response.data
        .choices[0]
        .message.content,
    });

  } catch (error) {

    console.log(error.response?.data || error.message);

    res.status(500).json({
      message:
        "AI recommendation failed",
    });
  }
};