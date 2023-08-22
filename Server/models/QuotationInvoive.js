const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuotationInvoiceSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    ref_code: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    due_date: {
      type: String,
      required: true,
    },
    terms: {
      type: String,
      required: true,
    },
    quotation_type: {
      type: String,
      required: true,
    },
    quotations_details: {
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
      default: "quotation",
    },
  },
  { timestamps: true }
);

const Quotation = mongoose.model("Quotation", QuotationInvoiceSchema);

module.exports = Quotation;
