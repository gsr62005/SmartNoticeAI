const ai = require("../config/gemini");

// AI notice summarization
const summarizeNotice = async (req, res) => {
  console.log("AI SUMMARY API HIT ✅");

  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    console.log("AI Priority request received...");
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `
        Summarize this college notice in simple English.

        Keep important dates, deadlines and instructions.
        Give 3-5 short bullet points.

        Title: ${title}
        Notice: ${content}
      `,
    });

    res.json({
      summary: response.text,
    });
  } catch (error) {
    console.error("AI Summary Error:", error);

    res.status(500).json({
      message: "AI summarization failed",
    });
  }
};

// AI priority classification (HIGH / MEDIUM / LOW)
const classifyPriority = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `
        Classify this college notice into exactly one priority:
        HIGH, MEDIUM, or LOW.

        HIGH: Urgent deadlines, examinations, important alerts.
        MEDIUM: Assignments, academic activities, upcoming events.
        LOW: General information and non-urgent announcements.

        Return only one word: HIGH, MEDIUM, or LOW.

        Title: ${title}
        Content: ${content}
      `,
    });
    console.log("Gemini response received!");
    const priority = response.text.trim().toUpperCase();

    if (!["HIGH", "MEDIUM", "LOW"].includes(priority)) {
      return res.status(500).json({
        message: "Invalid AI priority response",
      });
    }

    res.json({ priority });
  } catch (error) {
    console.error("AI Priority Error:", error);

    res.status(500).json({
      message: "AI priority classification failed",
    });
  }
};

module.exports = { summarizeNotice, classifyPriority };
