const express = require("express");
const router = express.Router();
const Homepage_Controllers = require("../controllers/Homepage_Controller");
const { isAuth } = require("../middleware/Auth");

const uploads = require("../multer");

router.get("/", isAuth, Homepage_Controllers.HomePage_Load_Page);
router.post(
  "/upload-profile-pic",
  isAuth,
  uploads.single("profile"),
  Homepage_Controllers.Homepage_Upload_Profile_Pic
);
module.exports = router;
