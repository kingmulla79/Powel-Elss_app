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

const {
  validateDeductionDetails,
  deductionValidation,
} = require("../middleware/validation/Deductions");

const {
  validateExpensesDetails,
  expensesValidation,
} = require("../middleware/validation/Expenses");

const {
  validateAllowancesDetails,
  allowancesValidation,
} = require("../middleware/validation/Allowances");

const {
  validateServiceDetails,
  serviceValidation,
} = require("../middleware/validation/ServiceForm");

const {
  validatePayrollDetails,
  payrollValidation,
} = require("../middleware/validation/Payroll");

const uploads = require("../multer");

router.post(
  "/upload-profile-pic",
  isAuth,
  isVerified,
  uploads.single("product_photo"),
  isAdmin,
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
router.patch(
  "/update-employee-data/:id",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Update_Employee
);
router.get(
  "/single-employee/:id",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Single_Employee
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
router.patch(
  "/update-product-data/:id",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Update_Item
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
  isAdmin,
  Dashboard_Controllers.Dashboard_Add_To_Cart
);

router.get(
  "/reduce-cart-items/:id",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Reduce_Cart_Items
);

router.get(
  "/remove-item/:id",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Remove_Items
);

router.get(
  "/shopping-cart",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Shopping_Cart_Details
);

router.post(
  "/checkout",
  validateCheckout,
  checkoutValidation,
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Checkout
);

router.get(
  "/all-products",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_All_Products
);

router.get(
  "/orders/:id",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Order_Details
);

router.get(
  "/all-orders",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_All_Orders
);

router.get(
  "/deduction-data",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Deductions_Data
);
router.get(
  "/deduction-data/:id",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Single_Deductions_Data
);
router.post(
  "/deduction-entry",
  validateDeductionDetails,
  deductionValidation,
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Deductions_Entry
);
router.patch(
  "/update-deduction/:id",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Deductions_Update
);
router.get(
  "/expenses-records",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Expenses
);
router.get(
  "/expenses-record/:id",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Single_Expenses
);
router.post(
  "/expenses",
  validateExpensesDetails,
  expensesValidation,
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Expenses_Entry
);
router.patch(
  "/update-expenses/:id",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Expenses_Update
);
router.get(
  "/allowances",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Allowance
);
router.get(
  "/allowance/:id",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Single_Allowance
);
router.post(
  "/allowances-entry",
  validateAllowancesDetails,
  allowancesValidation,
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Allowances_Entry
);
router.patch(
  "/update-allowances/:id",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Allowances_Update
);
router.post(
  "/service-form",
  validateServiceDetails,
  serviceValidation,
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Service_Details
);
router.post(
  "/payroll-entry",
  validatePayrollDetails,
  payrollValidation,
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Payroll_Entry
);
router.patch(
  "/update-payroll/:id",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Payroll_Update
);
router.get(
  "/service-form-data",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Service_Form
);
router.get(
  "/service-invoice",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Service_Invoice
);
router.get(
  "/service-form-data/:id",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Single_Service_Form
);
router.get(
  "/service-invoice/:id",
  isAuth,
  isVerified,
  isAdmin,
  Dashboard_Controllers.Dashboard_Single_Service_Invoice
);
module.exports = router;
