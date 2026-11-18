// ===============================
// SmartNotice AI - Server Entry Point
// ===============================
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const { seedAdmin, seedNotices } = require("./utils/seed");

const startServer = async () => {
  try {
    await connectDB();

    await seedAdmin();
    await seedNotices();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

startServer();
