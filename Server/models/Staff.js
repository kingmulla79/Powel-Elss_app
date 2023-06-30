const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const employeeSchema = new Schema({
  id_no: {
    type: String,
    require: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_no: {
    type: String,
    required: true,
  },
  job_title: {
    type: String,
    required: true,
  },
  P_no: {
    type: String,
    required: true,
  },
});
employeeSchema.statics.isThisIdInUse = async function (id_no) {
  if (!id_no) throw new Error("Invalid id number: No id provided");
  try {
    const user = await this.findOne({ id_no });
    if (user) return false;

    return true;
  } catch (error) {
    console.log("Error inside isThisIdInUse method", error.message);
    return false;
  }
};

const EmployeeDetails = mongoose.model("Employee", employeeSchema);

module.exports = EmployeeDetails;
