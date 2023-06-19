const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
  {
    invoice_code: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    total_cost: {
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

const InvoiceDetails = mongoose.model("invoice", invoiceSchema);

module.exports = InvoiceDetails;
