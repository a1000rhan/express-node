const mongoose = require("mongoose");
// const mongooseSlugPlugin = require("mongoose-slug-plugin");

const OrderSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Order", OrderSchema);
