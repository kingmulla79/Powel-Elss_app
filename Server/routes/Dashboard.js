const express = require("express");
const router = express.Router();
const Dashboard_Controllers = require("../controllers/Dashboard_Controller");
const { isAuth, isAdmin, isVerified } = require("../middleware/Auth");
const {
  validateEmployeeEntry,
  employeeValidation,
} = require("../middleware/validation/StaffDetails");

const {
  validateCheckout,
  checkoutValidation,
} = require("../middleware/validation/Checkout");

const {
  validateProductDetails,
  productValidation,
} = require("../middleware/validation/Products");

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
  validateProductDetails,
  productValidation,
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_New_Item
);

router.delete(
  "/delete-item/:id",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Delete_Item
);

router.get(
  "/add-to-cart/:id",
  isAuth,
  isVerified,
  Dashboard_Controllers.Dashboard_Add_To_Cart
);

router.get(
  "/reduce-cart-items/:id",
  isAuth,
  isVerified,
  Dashboard_Controllers.Dashboard_Reduce_Cart_Items
);

router.get(
  "/remove-item/:id",
  isAuth,
  isVerified,
  Dashboard_Controllers.Dashboard_Remove_Items
);

router.get(
  "/shopping-cart",
  isAuth,
  isVerified,
  Dashboard_Controllers.Dashboard_Shopping_Cart_Details
);

router.post(
  "/checkout",
  validateCheckout,
  checkoutValidation,
  isAuth,
  isVerified,
  Dashboard_Controllers.Dashboard_Checkout
);

router.get(
  "/all-products",
  isAuth,
  isVerified,
  Dashboard_Controllers.Dashboard_All_Products
);

router.get(
  "/all-orders",
  isAuth,
  isVerified,
  Dashboard_Controllers.Dashboard_All_Orders
);

module.exports = router;
