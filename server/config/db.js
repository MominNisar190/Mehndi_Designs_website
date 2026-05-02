const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    console.error('⚠️  Server will keep running — update MONGO_URI in server/.env to connect.');
    // Don't exit — let the server run so frontend can still be tested
  }
};

module.exports = connectDB;
