const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGODB_URI =
    "mongodb://root:QKU7LFJxOEFHbbLAQSmJzpFI@digital-menu:27017/my-app?authSource=admin"
    const compas = "mongodb://root:QKU7LFJxOEFHbbLAQSmJzpFI@digital-menu:27017/my-app?authSource=admin"
    mongoose.connect(compas || MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to db");
  } catch (err) {
    console.log("cant connect db", err);
  }
};

module.exports = connectDB;
