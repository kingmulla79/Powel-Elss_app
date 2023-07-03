const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceInvoiceSchema = new Schema(
  {
    invoice_code: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    time: {
      type: Date,
    },
    work_duration: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ServiceInvoice = mongoose.model("ServiceInvoice", ServiceInvoiceSchema);

module.exports = ServiceInvoice;
