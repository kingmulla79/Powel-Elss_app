const express = require("express");
const router = express.Router();
const UserDetailsController = require("../controllers/UserDetails");
const {
  validateUserRegistration,
  validateUserSignIn,
  userValidation,
} = require("../middleware/validation/UserDetails");
const { isAuth } = require("../middleware/Auth");

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
router.post("/logout", isAuth, UserDetailsController.User_Logout_User);

router.get(
  "/verify/:userId/:uniqueString",
  UserDetailsController.User_Verify_User
);

router.get("/verified", UserDetailsController.User_Verified_User);

module.exports = router;
