const { check, validationResult } = require("express-validator");

exports.validateUserRegistration = [
  check("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Enter a valid email address"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password is required")
    .matches(/^[A-Za-z0-9 .,'!&]+$/)
    .withMessage(
      "Password must contains numbers, letters and special characters('[A-Za-z0-9 .,'!&]+$')"
    )
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters long"),
  check("confirmpassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("A password confirmation is required")
    .matches(/^[A-Za-z0-9 .,'!&]+$/)
    .withMessage(
      "Password must contains numbers, letters and special characters('^[A-Za-z0-9 .,'!&]+$')"
    )
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Both passwords must be the same");
      }
      return true;
    }),
];
exports.validateUserSignIn = [
  check("email").trim().not().isEmpty().withMessage("email is required"),
  check("password").trim().not().isEmpty().withMessage("password is required"),
];

exports.userValidation = (req, res, next) => {
  const result = validationResult(req).array();
  console.log(result);
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({
    success: false,
    message: error,
  });
};
