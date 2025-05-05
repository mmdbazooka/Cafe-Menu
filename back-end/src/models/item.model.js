const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  category: { type: String },
  recipe: { type: String, default: "" },
  img: { type: String },
});

module.exports = mongoose.model("Item", itemSchema);
