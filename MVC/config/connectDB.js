/** @format */

const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`server running on ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
