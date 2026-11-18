
const mongoose = require("mongoose");

const savedNoticeSchema = new mongoose.Schema(
  {
    noticeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notice",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavedNotice", savedNoticeSchema);
