const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log(`The DB is connected with ${mongoose.connection.host}`);
  } catch (error) {
    console.log(error);

    await mongoose.disconnect();

    process.exit(1);
  }
};