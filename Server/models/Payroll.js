const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PayrollSchema = new Schema(
  {
    id_no: {
      type: String,
      required: true,
    },
    net_salary: {
      type: Number,
      required: true,
    },
    remitted_amount: {
      type: Number,
    },
    outstanding_amount: {
      type: Number,
    },
    date_of_payment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Payroll = mongoose.model("Payroll", PayrollSchema);

module.exports = Payroll;
