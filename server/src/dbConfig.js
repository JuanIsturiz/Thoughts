const mongoose = require("mongoose");

const { MONGO_URI } = require("./config");

mongoose.set("strictQuery", false);

module.exports = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
