const express = require("express");
const router = express.Router();
const Dashboard_Controllers = require("../controllers/Dashboard_Controller");
const { isAuth, isAdmin, isVerified } = require("../middleware/Auth");
const {
  validateEmployeeEntry,
  employeeValidation,
} = require("../middleware/validation/StaffDetails");

const uploads = require("../multer");

router.post(
  "/upload-profile-pic",
  isAuth,
  isVerified,
  uploads.single("product_photo"),
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

router.post(
  "/new-item",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_New_Item
);

router.get(
  "/add-to-cart/:id",
  isAuth,
  isVerified,
  Dashboard_Controllers.Dashboard_Add_To_Cart
);
router.get(
  "/shopping-cart",
  isAuth,
  isVerified,
  Dashboard_Controllers.Dashboard_Shopping_Cart_Details
);
router.post(
  "/checkout",
  isAuth,
  isVerified,
  Dashboard_Controllers.Dashboard_Checkout
);
module.exports = router;
