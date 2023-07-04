const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const OrdersSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    cart: {
      type: Object,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrdersSchema);

module.exports = Order;
