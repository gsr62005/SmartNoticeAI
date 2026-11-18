const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const Notice = require("../models/Notice");
const defaultNotices = require("../data/defaultNotices");

// Create default admin if not already registered
const seedAdmin = async () => {
  const existingAdmin = await Admin.findOne({
    email: process.env.ADMIN_EMAIL,
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);

    await Admin.create({
      name: process.env.ADMIN_NAME || "System Administrator",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin account created successfully! ✅");
  } else {
    console.log("Admin account already exists! ✅");
  }
};

// Insert default notices only if collection is empty
const seedNotices = async () => {
  const count = await Notice.countDocuments();

  if (count === 0) {
    await Notice.insertMany(defaultNotices);
    console.log("Default notices inserted successfully! ✅");
  }
};

module.exports = { seedAdmin, seedNotices };
