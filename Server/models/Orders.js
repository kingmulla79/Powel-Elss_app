const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const OrdersSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    invoice_code: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    contact_person: {
      type: String,
      required: true,
    },
    terms: {
      type: String,
    },
    purchase_type: {
      type: String,
      required: true,
    },
    product_details: {
      type: Object,
      required: true,
    },
    discount: {
      type: Number,
    },
    tax: {
      type: Number,
    },
    purchase_status: {
      type: String,
      default: "paid",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrdersSchema);

module.exports = Order;
