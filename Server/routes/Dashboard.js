const express = require("express");
const router = express.Router();
const Dashboard_Controllers = require("../controllers/Dashboard_Controller");
const { isAuth, isAdmin } = require("../middleware/Auth");
const {
  validateEmployeeEntry,
  employeeValidation,
} = require("../middleware/validation/StaffDetails");

const uploads = require("../multer");

router.get("/", isAuth, isAdmin, Dashboard_Controllers.Dashboard_Load_Page);
router.post(
  "/upload-profile-pic",
  isAuth,
  uploads.single("profile"),
  Dashboard_Controllers.Dashboard_Upload_Profile_Pic
);
router.post(
  "/new-employee",
  validateEmployeeEntry,
  employeeValidation,
  isAuth,
  isAdmin,
  Dashboard_Controllers.Dashboard_Staff_Entry
);
module.exports = router;
