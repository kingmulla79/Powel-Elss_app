const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema(
  {
    client_name: {
      type: String,
      required: true,
    },
    work_location: {
      type: String,
      required: true,
    },
    requested_by: {
      type: String,
      required: true,
    },
    scope: {
      type: String,
      required: true,
    },
    scope_description: {
      type: String,
      required: true,
    },
    payment_details: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceInvoice",
    },
    employee_details: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;
