// ===============================
// Express App Setup (middleware + routes)
// ===============================
const express = require("express");
const cors = require("cors");

const noticeRoutes = require("./routes/noticeRoutes");
const savedRoutes = require("./routes/savedRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Home API
app.get("/", (req, res) => {
  res.json({
    message: "SmartNotice AI Backend is working 🚀",
  });
});

app.use("/api/notices", noticeRoutes);
app.use("/api/saved", savedRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

module.exports = app;
