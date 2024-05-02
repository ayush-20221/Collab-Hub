require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
// const DB_CONNECTION_URL="mongodb+srv://ayush:error@cluster1.zprhwk6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
const DB = process.env.DB_CONNECTION_URL

const connectDatabase = async () => {
  try {
    // await mongoose.connect(DB_CONNECTION_URL);
    await mongoose.connect(DB);
    console.log("Database connected..");
  } catch (err) {
    console.log("Database connection failed");
  }
};

module.exports = connectDatabase;
