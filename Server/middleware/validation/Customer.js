const { check, validationResult } = require("express-validator");

exports.validateCustomerRegistration = [
  check("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Enter a valid email address"),
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage(
      "The customer's name is required to complete the checkout process"
    ),
  check("address")
    .trim()
    .not()
    .isEmpty()
    .withMessage(
      "The customer's address is required to complete the invoice process"
    ),
  check("contact_person")
    .trim()
    .not()
    .isEmpty()
    .withMessage(
      "The contact_person is required to complete the checkout process"
    ),
];

exports.customerValidation = (req, res, next) => {
  const result = validationResult(req).array();
  console.log(result);
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({
    success: false,
    message: error,
  });
};
