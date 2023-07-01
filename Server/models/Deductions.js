const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeductionsSchema = new Schema(
  {
    id_no: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    nhif: {
      type: Number,
      required: true,
    },
    nssf: {
      type: Number,
      required: true,
    },
    advances: {
      type: Number,
      required: true,
    },
    taxes: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Deductions = mongoose.model("Deduction", DeductionsSchema);

module.exports = Deductions;
