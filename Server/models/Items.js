const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemsSchema = new Schema(
  {
    item_name: {
      type: String,
      required: true,
    },
    item_category: {
      type: String,
      required: true,
    },
    unit_price: {
      type: Number,
      required: true,
    },
    unit_size: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ItemDetails = mongoose.model("item", itemsSchema);

module.exports = ItemDetails;
