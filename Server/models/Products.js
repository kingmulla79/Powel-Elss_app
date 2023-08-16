const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ProductsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    product_photo: {
      type: String,
    },
    purpose: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductsSchema);

module.exports = Product;
