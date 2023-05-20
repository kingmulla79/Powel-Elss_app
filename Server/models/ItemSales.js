const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemsSalesSchema = new Schema(
  {
    invoice_code: {
      type: Schema.Types.ObjectId,
      ref: "invoice",
    },
    item: {
      type: Schema.Types.ObjectId,
      ref: "item",
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit_price: {
      type: Number,
      required: true,
    },
    sub_total: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

const ItemSalesDetails = mongoose.model("item_sale", itemsSalesSchema);

module.exports = ItemSalesDetails;
