const { check, validationResult } = require("express-validator");

exports.validateCheckout = [
  check("address")
    .trim()
    .not()
    .isEmpty()
    .withMessage("address is required to complete the checkout process"),
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Your name is required to complete the checkout process"),
];

exports.checkoutValidation = (req, res, next) => {
  const result = validationResult(req).array();
  console.log(result);
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({
    success: false,
    message: error,
  });
};
