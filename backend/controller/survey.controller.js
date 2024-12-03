const sendResponse = require("../utilities/sendResponse");
const HTTP_STATUS = require("../constants/statusCodes");
const OpenAI = require("openai");

// const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

// Helper to format questions and answers into the required string
const formatQuestionsToString = (questionsArray) => {
  const formattedString = questionsArray
    .map(({ question, answer }) => `question: ${question} answer: ${answer}`)
    .join(", ");

  return `${formattedString}. Based on these, what approximate overall average percentage of the population do I fall in according to global standards? Please provide just the estimated percentage and also provide an approximate on how many people do i fall in. Also suggest what can be done to improve the percentage based on the answers of social media usage, travelling. The answer should be: "You are approximately top n% of the population globally and n% of the USA & you're approximately n in n people on earth. if you do improve n, you would be at the top n% of the population globally."`;
};

const createSurvey = async (req, res) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });
    const { questions } = req.body;
    if (!Array.isArray(questions) || questions.length === 0) {
      return sendResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        "No questions provided"
      );
    }
    // console.log("questions", questions);
    // Convert array of objects into formatted string
    const formattedContent = formatQuestionsToString(questions);

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: formattedContent }],
      model: "gpt-3.5-turbo",
    });

    if (!completion) {
      sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal server error"
      );
    }

    const { content } = completion.choices[0].message;
    const percentage = content.match(
      /\b\d+(?=% of the population globally)/
    )[0];
    const response = completion.choices[0];
    sendResponse(res, HTTP_STATUS.OK, "Successfully created survey", {
      response,
      percentage,
    });
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      "Internal server error",
      error.message
    );
  }
};

module.exports = { createSurvey };
