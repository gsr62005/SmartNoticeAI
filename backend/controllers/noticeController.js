const Notice = require("../models/Notice");
const SavedNotice = require("../models/SavedNotice");
const Notification = require("../models/Notification");
const normalizeTitle = require("../utils/normalizeTitle");

// Get notices from MongoDB
const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ id: 1 });
    res.json(notices);
  } catch (error) {
    console.error("FETCH NOTICES ERROR:", error);

    res.status(500).json({
      message: error.message || "Failed to fetch notices",
    });
  }
};

// Add new notice + automatically create notification
const createNotice = async (req, res) => {
  try {
    const { title, category, priority, summary } = req.body;

    if (!title || !category || !summary) {
      return res.status(400).json({
        message: "Title, category and summary are required",
      });
    }

    // Duplicate check using normalized titles
    const normalizedTitle = normalizeTitle(title);

    const existingNotices = await Notice.find({
      title: { $exists: true },
    }).select("title");

    const duplicate = existingNotices.find(
      (notice) => normalizeTitle(notice.title) === normalizedTitle
    );

    if (duplicate) {
      return res.status(409).json({
        message: "Duplicate notice detected! This notice already exists.",
      });
    }

    const lastNotice = await Notice.findOne().sort({ id: -1 });

    const newNotice = await Notice.create({
      id: lastNotice ? lastNotice.id + 1 : 1,
      title: title.trim(),
      category,
      priority: priority || "LOW",
      summary,
    });

    // Automatically create notification
    await Notification.create({
      title: "New Notice Published",
      message: `${newNotice.title} has been published.`,
      type: newNotice.priority,
    });

    res.status(201).json({
      message: "Notice and notification created successfully",
      notice: newNotice,
    });
  } catch (error) {
    console.error("Create notice error:", error);

    res.status(500).json({
      message: error.message || "Failed to create notice",
    });
  }
};

// Update notice
const updateNotice = async (req, res) => {
  try {
    const { title, category, priority, summary } = req.body;

    const updatedNotice = await Notice.findByIdAndUpdate(
      req.params.id,
      { title, category, priority, summary },
      { new: true, runValidators: true }
    );

    if (!updatedNotice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    res.json({
      message: "Notice updated successfully",
      notice: updatedNotice,
    });
  } catch (error) {
    console.error("Update notice error:", error);

    res.status(400).json({
      message: error.message || "Failed to update notice",
    });
  }
};

// Delete notice
const deleteNotice = async (req, res) => {
  try {
    const deletedNotice = await Notice.findByIdAndDelete(req.params.id);

    if (!deletedNotice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    // Also remove saved reference of this notice
    await SavedNotice.deleteMany({
      noticeId: req.params.id,
    });

    res.json({
      message: "Notice deleted successfully",
    });
  } catch (error) {
    console.error("Delete notice error:", error);

    res.status(400).json({
      message: error.message || "Failed to delete notice",
    });
  }
};

module.exports = { getNotices, createNotice, updateNotice, deleteNotice };
