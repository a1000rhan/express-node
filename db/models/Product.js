const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, require: true },
  slug: { type: String },
  image: { type: String },
  description: { type: String },
  color: { type: String },
  quantity: { type: Number, default: 1 },
  price: { type: Number },
});
module.exports = mongoose.model("Product", ProductSchema);
