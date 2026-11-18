const Notice = require("../models/Notice");
const SavedNotice = require("../models/SavedNotice");

// Save notice
const saveNotice = async (req, res) => {
  try {
    const { noticeId } = req.body;

    const notice = await Notice.findById(noticeId);

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    const existing = await SavedNotice.findOne({ noticeId });

    if (existing) {
      return res.status(409).json({
        message: "Notice already saved",
      });
    }

    const saved = await SavedNotice.create({ noticeId });

    res.status(201).json({
      message: "Notice saved successfully",
      saved,
    });
  } catch (error) {
    console.error("SAVE NOTICE ERROR:", error);

    res.status(500).json({
      message: error.message || "Failed to save notice",
    });
  }
};

// Get saved notices
const getSavedNotices = async (req, res) => {
  try {
    const saved = await SavedNotice.find()
      .populate("noticeId")
      .sort({ createdAt: -1 });

    res.json(saved);
  } catch (error) {
    console.error("FETCH SAVED ERROR:", error);

    res.status(500).json({
      message: error.message || "Failed to fetch saved notices",
    });
  }
};

// Remove saved notice
const removeSavedNotice = async (req, res) => {
  try {
    const deleted = await SavedNotice.findOneAndDelete({
      noticeId: req.params.noticeId,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Saved notice not found",
      });
    }

    res.json({
      message: "Notice removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove notice",
    });
  }
};

module.exports = { saveNotice, getSavedNotices, removeSavedNotice };
