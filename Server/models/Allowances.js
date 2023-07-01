const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AllowancesSchema = new Schema(
  {
    id_no: {
      type: String,
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
    arrears: {
      type: Number,
      required: true,
    },
    house: {
      type: String,
      required: true,
    },
    imprest_amount: {
      type: Number,
      required: true,
    },
    transport: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Allowances = mongoose.model("Allowances", AllowancesSchema);

module.exports = Allowances;
