
const ai = require("../config/gemini");

// Reusable Gemini API retry function
const generateWithRetry = async (contents) => {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
      });

      return response;

    } catch (error) {
      console.error(`Gemini API attempt ${attempt} failed:`, {
        message: error.message,
        status: error.status,
      });

      // Retry only temporary errors
      if (
        error.status !== 503 &&
        error.status !== 429 &&
        error.status !== 500
      ) {
        throw error;
      }

      // Stop after the third attempt
      if (attempt === 3) {
        throw error;
      }

      // Wait 2 seconds, then 4 seconds
      const delay = attempt * 2000;

      console.log(
        `Retrying Gemini API in ${delay / 1000} seconds...`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

// AI Notice Summarization
const summarizeNotice = async (req, res) => {
  console.log("AI SUMMARY API HIT");

  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const response = await generateWithRetry(`
      Summarize this college notice in simple English.

      Keep important dates, deadlines and instructions.
      Give 3-5 short bullet points.

      Title: ${title}
      Notice: ${content}
    `);

    res.json({
      summary: response.text,
    });

  } catch (error) {
    console.error("AI Summary Error:", {
      message: error.message,
      status: error.status,
    });

    res.status(500).json({
      message: "AI summarization failed. Please try again later.",
    });
  }
};

// AI Priority Classification
const classifyPriority = async (req, res) => {
  console.log("AI PRIORITY API HIT");

  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const response = await generateWithRetry(`
      Classify this college notice into exactly one priority:
      HIGH, MEDIUM, or LOW.

      HIGH: Urgent deadlines, examinations, important alerts.
      MEDIUM: Assignments, academic activities, upcoming events.
      LOW: General information and non-urgent announcements.

      Return only one word: HIGH, MEDIUM, or LOW.

      Title: ${title}
      Content: ${content}
    `);

    const priority = response.text.trim().toUpperCase();

    if (!["HIGH", "MEDIUM", "LOW"].includes(priority)) {
      return res.status(500).json({
        message: "Invalid AI priority response",
      });
    }

    res.json({
      priority,
    });

  } catch (error) {
    console.error("AI Priority Error:", {
      message: error.message,
      status: error.status,
    });

    res.status(500).json({
      message: "AI priority classification failed. Please try again later.",
    });
  }
};

module.exports = {
  summarizeNotice,
  classifyPriority,
};
