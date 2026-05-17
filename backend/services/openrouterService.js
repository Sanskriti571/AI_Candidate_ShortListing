const axios = require("axios");

const getAIShortlist = async (job, candidates) => {
  const prompt = `
  Job Requirements:
  Skills: ${job.requiredSkills.join(", ")}
  Minimum Experience: ${job.minExperience} years

  Candidates:
  ${JSON.stringify(candidates)}

  Rank the best candidates and explain why.
  `;

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openai/gpt-5.2",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
};

module.exports = getAIShortlist;