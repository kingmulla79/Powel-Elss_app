const { check, validationResult } = require("express-validator");

exports.validateServiceDetails = [
  check("invoice_code")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invoice_code is required"),
  check("date")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The service date is required"),
  check("time")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The service time is required"),
  check("work_duration")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The work duration is required")
    .isInt()
    .withMessage("Only uses numbers for the work duration"),
  check("cost")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The scope description is required")
    .isInt()
    .withMessage("Only uses numbers for the cost"),
];

exports.serviceValidation = (req, res, next) => {
  const result = validationResult(req).array();
  console.log(result);
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({
    success: false,
    message: error,
  });
};
