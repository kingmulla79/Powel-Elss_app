require("dotenv").config();
const UserDetails = require("../models/UserDetails");
const jwt = require("jsonwebtoken");

const User_Login_Page = (req, res) => {
  res.status(200).json({
    success: true,
    redirect: "/api/auth/login",
  });
};

const User_Register_Page = (req, res) => {
  res.status(200).json({
    success: true,
    redirect: "/api/auth/register",
  });
};

const User_Register_User = async (req, res) => {
  try {
    const isNewEmail = await UserDetails.isThisEmailInUse(req.body.email);
    if (!isNewEmail)
      return res.status(400).json({
        success: false,
        message: "A user with this email already exists",
      });

    const userDetails = new UserDetails({
      username: req.body.username,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    });
    userDetails
      .save()
      .then((result) => {
        console.log("Successfully registered");
        res.status(201).json({
          success: true,
          message: "Successfully registered",
          redirect: "/api/auth/login",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          success: false,
          message: "Error in registration.Try again",
        });
      });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "The signup attempt failed",
      error: e,
    });
  }
};

const User_Login_User = async (req, res) => {
  try {
    const saved_user = await UserDetails.findOne({
      email: req.body.email,
    });
    const result = await saved_user.comparePassword(req.body.password);
    if (result) {
      const token = jwt.sign(
        { user_id: saved_user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
      );
      console.log("success");
      res.status(200).json({
        success: true,
        message: "Login successful",
        authorization: token,
        user: saved_user,
      });
    } else {
      console.log("Error");
      res.status(403).json({
        success: false,
        message: "The username or password is invalid",
        redirect: "/api/auth/login",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "The login attempt failed",
      error: e,
    });
  }
};

module.exports = {
  User_Login_Page,
  User_Register_Page,
  User_Register_User,
  User_Login_User,
};
