const { check, validationResult } = require("express-validator");

exports.validateQuotationDetails = [
  check("invoice_code")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The invoice_code is required"),
  check("date").trim().not().isEmpty().withMessage("The date is required"),
  check("due_date")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The due_date is required"),
  check("terms").trim().not().isEmpty().withMessage("The term is required"),
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

exports.quotationValidation = (req, res, next) => {
  const result = validationResult(req).array();
  console.log(result);
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({
    success: false,
    message: error,
  });
};
