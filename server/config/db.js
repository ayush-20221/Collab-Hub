const mongoose = require("mongoose");
const DB_CONNECTION_URL="mongodb+srv://ayush:error@cluster1.zprhwk6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"

const connectDatabase = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_URL);
    console.log("Database connected..");
  } catch (err) {
    console.log("Database connection failed");
  }
};

module.exports = connectDatabase;
