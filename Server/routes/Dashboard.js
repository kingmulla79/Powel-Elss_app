const express = require("express");
const router = express.Router();
const Dashboard_Controllers = require("../controllers/Dashboard_Controller");
const { isAuth, isAdmin, isVerified } = require("../middleware/Auth");
const {
  validateEmployeeEntry,
  employeeValidation,
} = require("../middleware/validation/StaffDetails");

const uploads = require("../multer");

router.get(
  "/",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Load_Page
);
router.post(
  "/upload-profile-pic",
  isAuth,
  isVerified,
  uploads.single("profile"),
  Dashboard_Controllers.Dashboard_Upload_Profile_Pic
);
router.post(
  "/new-employee",
  validateEmployeeEntry,
  employeeValidation,
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Staff_Entry
);
router.get(
  "/employee-data",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Staff_Data
);
router.delete(
  "/delete_user/:id",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Delete_Employee
);
router.get(
  "/new-item",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_New_Item_Page
);
router.post(
  "/new-item",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_New_Item
);
router.get(
  "/new-sale",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_New_Sale_Page
);
router.post(
  "/new-sale",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_New_Sale
);
router.get(
  "/new-invoice",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_New_Invoice_Page
);
router.post(
  "/new-invoice",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_New_Invoice
);
module.exports = router;
