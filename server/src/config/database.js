const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    console.log("\n🔧 SOLUTION: Go to MongoDB Atlas → Network Access → Add IP Address → Allow Access From Anywhere\n");
    // Don't exit process - let server continue running
  }
};

module.exports = connectDB;
