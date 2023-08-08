require("dotenv").config();
const UserDetails = require("../models/UserDetails");
const jwt = require("jsonwebtoken");
const { sendEmail, sendVerificationEmail } = require("../utils/Auto_Email");
const bcrypt = require("bcrypt");
const UserVerification = require("../models/UserVerification");

const User_Register_User = async (req, res) => {
  try {
    const isNewEmail = await UserDetails.isThisEmailInUse(req.body.email);
    if (!isNewEmail)
      return res.status(409).json({
        success: false,
        message: "A user with this email already exists",
      });
    const user_email = req.body.email;

    const userDetails = await new UserDetails({
      email: req.body.email,
      password: req.body.password,
    })
      .save()
      .then((result) => {
        console.log("User successfully registered");
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          success: false,
          message: "Error in registration.Try again",
        });
      });

    const newuser_id = await UserDetails.find({}).sort({ _id: -1 }).limit(1);

    console.log(newuser_id);

    sendVerificationEmail(newuser_id[0]._id, user_email, res)
      .then((result) => {
        res.status(201).json({
          success: true,
          message: `Successfully registered. ${result.message}`,
          redirect: "/api/auth/login",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(401).json({
          success: false,
          message: error.message,
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

const User_Verify_User = async (req, res) => {
  let { userId, uniqueString } = req.params;
  UserVerification.find({ userId })
    .then((result) => {
      if (result.length > 0) {
        // user verification details exist

        const { expiresAt } = result[0];
        const hashedUniqueString = result[0].uniqueString;
        // check for expired verification details
        if (expiresAt < Date.now()) {
          // Expired record
          UserVerification.deleteOne({ userId })
            .then((result) => {
              UserDetails.deleteOne({ _id: userId })
                .then(() => {
                  res.json({
                    message: `The verification link has expired. Please sign in again`,
                  });
                })
                .catch((error) => {
                  console.log(error);
                  res.status(400).json({
                    success: false,
                    message:
                      "An error occured while deleting verified user details",
                    error,
                  });
                });
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({
                success: false,
                message:
                  "An error occured while deleting expired verification details",
                error,
              });
            });
        } else {
          // valid verification record
          //compare unique string
          bcrypt
            .compare(uniqueString, hashedUniqueString)
            .then((result) => {
              if (result) {
                // string match
                UserDetails.updateOne({ _id: userId }, { verified: true })
                  .then(() => {
                    UserVerification.deleteOne({ userId })
                      .then(() => {
                        res.status(201).json({
                          success: true,
                          message: `Successfully verified. You can now login`,
                          redirect: "/api/auth/login",
                        });
                      })
                      .catch((error) => {
                        console.log(error);
                        res.status(400).json({
                          success: false,
                          message:
                            "An error occured while deleting verification credentials",
                          error,
                        });
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                    res.status(400).json({
                      success: false,
                      message:
                        "An error occured while updating verification status",
                      error,
                    });
                  });
              } else {
                // record exists but incorrect verification details passed
                res.status(400).json({
                  success: false,
                  message:
                    "record exists but incorrect verification details passed",
                  error,
                });
              }
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({
                success: false,
                message: "An error occured while comparing hashed values",
                error,
              });
            });
        }
      } else {
        // user verification details don't exist
        res.status(400).json({
          success: false,
          message:
            "The account record doesn't exist or has already been verified",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "The verification attempt failed",
        error,
      });
    });
};

const User_Verified_User = (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `User is successfully verified` });
};

const User_Login_User = async (req, res) => {
  try {
    const saved_user = await UserDetails.findOne({
      email: req.body.email,
    });
    if (saved_user) {
      if (saved_user.verified === true) {
        const result = await saved_user.comparePassword(req.body.password);
        if (result) {
          console.log(saved_user);
          req.session.authenticated = true;
          const token = jwt.sign(
            { user_id: saved_user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
          );

          let oldTokens = saved_user.tokens || [];

          if (oldTokens.length) {
            oldTokens = oldTokens.filter((t) => {
              const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
              if (timeDiff < 86400) {
                return t;
              }
            });
          }

          await UserDetails.findByIdAndUpdate(saved_user._id, {
            tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
          });
          console.log("success");
          res.status(200).json({
            success: true,
            message: "Login successful",
            authorization: token,
            user: saved_user.email,
            session: req.session,
          });
        } else {
          console.log("Error");
          res.status(403).json({
            success: false,
            message: "The email or password is invalid",
            redirect: "/api/auth/login",
          });
        }
      } else {
        res.status(403).json({
          success: false,
          message: "Your email has not been verified",
          redirect: "/api/auth/login",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "The email or password is invalid",
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

const User_Logout_User = async (req, res) => {
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Authorization failed",
        });
      }
      const tokens = req.user.tokens;

      const newTokens = tokens.filter((t) => t.token !== token);
      await UserDetails.findByIdAndUpdate(req.user._id, { tokens: newTokens });
      res.status(200).json({
        success: true,
        message: "Signed out successfully",
        redirect: "/api/auth/login",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Sign out attempt failed",
    });
  }
};

module.exports = {
  User_Verify_User,
  User_Verified_User,
  User_Register_User,
  User_Login_User,
  User_Logout_User,
};
