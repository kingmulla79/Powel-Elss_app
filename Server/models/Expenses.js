const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpensesSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    service_item_name: {
      type: String,
      required: true,
    },
    total_cost: {
      type: Number,
      required: true,
    },
    recorded_by: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Expenses = mongoose.model("Expense", ExpensesSchema);

module.exports = Expenses;
