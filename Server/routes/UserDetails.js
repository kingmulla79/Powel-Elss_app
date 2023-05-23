const express = require("express");
const router = express.Router();
const cors = require("cors");
const UserDetailsController = require("../controllers/UserDetails");
const {
  validateUserRegistration,
  validateUserSignIn,
  userValidation,
} = require("../middleware/validation/UserDetails");

router.get("/login", cors(), UserDetailsController.User_Login_Page);
router.get("/register", cors(), UserDetailsController.User_Register_Page);
router.post(
  "/register",
  validateUserRegistration,
  userValidation,
  UserDetailsController.User_Register_User
);
router.post(
  "/login",
  validateUserSignIn,
  userValidation,
  UserDetailsController.User_Login_User
);
router.get(
  "/verify/:userId/:uniqueString",
  UserDetailsController.User_Verify_User
);

router.get("/verified", UserDetailsController.User_Verified_User);

module.exports = router;
