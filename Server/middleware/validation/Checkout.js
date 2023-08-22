const { check, validationResult } = require("express-validator");

exports.validateCheckout = [
  check("invoice_code")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The invoice_code is required"),
  check("date").trim().not().isEmpty().withMessage("The date is required"),
  check("terms").trim().not().isEmpty().withMessage("The term is required"),
  check("contact_person")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The contact person is required"),
  check("purchase_type")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The purchase type is required"),
  check("discount")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The discount is empty")
    .isInt()
    .withMessage("Only uses numbers for the discount"),
  check("tax")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The tax is empty")
    .isInt()
    .withMessage("Only uses numbers for the tax"),
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
