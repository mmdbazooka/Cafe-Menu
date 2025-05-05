const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  name: { type: String },
  qty: { type: Number, required: true },
  img: { type: String },
});

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    table: { type: String },
    description: { type: String, default: "" },
    order: [orderItemSchema],
    date: {
      type: String,
      default: () => new Date().toLocaleString("fa-IR", { timeZone: "Asia/Tehran" }),
    },
    status: { type: Boolean, default: false },
    totalPrice: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
