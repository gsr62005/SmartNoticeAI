const dns = require("dns");
const mongoose = require("mongoose");

// Use public DNS servers so MongoDB Atlas (SRV) URLs resolve properly
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected Successfully! ✅");
};

module.exports = connectDB;
